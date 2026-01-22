import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const CLOUD_NAME = Deno.env.get('CLOUDINARY_CLOUD_NAME')
const API_KEY = Deno.env.get('CLOUDINARY_API_KEY')
const API_SECRET = Deno.env.get('CLOUDINARY_API_SECRET')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Determine if we're dealing with JSON or FormData
        const contentType = req.headers.get('content-type') || ''
        let action, payload

        if (contentType.includes('application/json')) {
            const body = await req.json()
            action = body.action
            payload = body.payload
        } else {
            // Assume FormData for uploads
            const formData = await req.formData()
            action = formData.get('action')
            payload = JSON.parse(formData.get('payload') as string)
            // Add the file to payload if it exists
            const file = formData.get('file')
            if (file) payload.file = file
        }

        // --- HELPER: GENERATE CLOUDINARY SIGNATURE ---
        const generateSignature = async (params: any, secret: string) => {
            const sortedParams = Object.keys(params)
                .sort()
                .map(key => `${key}=${params[key]}`)
                .join('&')
            const stringToSign = sortedParams + secret

            const encoder = new TextEncoder()
            const data = encoder.encode(stringToSign)
            const hashBuffer = await crypto.subtle.digest('SHA-1', data)
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        }

        // --- HELPER: UPLOAD TO CLOUDINARY ---
        const uploadToCloudinary = async (file: File, projectId: string, folderType: string, resourceType: string = 'auto') => {
            const timestamp = Math.floor(Date.now() / 1000)
            const folder = `right-parking/${projectId}/${folderType}`

            // Signature parameters (Cloudinary requires these to be sorted for signing)
            const signatureParams = {
                folder: folder,
                timestamp: timestamp.toString(),
            }

            const signature = await generateSignature(signatureParams, API_SECRET!)

            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', folder)
            formData.append('timestamp', timestamp.toString())
            formData.append('api_key', API_KEY!)
            formData.append('signature', signature)

            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error?.message || 'Cloudinary upload failed')

            return data
        }

        // --- HELPER: DELETE FROM CLOUDINARY ---
        const deleteFromCloudinary = async (publicId: string, resourceType: string = 'image') => {
            const timestamp = Math.floor(Date.now() / 1000)
            const signature = await generateSignature({ public_id: publicId, timestamp }, API_SECRET!)

            const formData = new FormData()
            formData.append('public_id', publicId)
            formData.append('timestamp', timestamp.toString())
            formData.append('api_key', API_KEY!)
            formData.append('signature', signature)

            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/destroy`, {
                method: 'POST',
                body: formData,
            })
            return await response.json()
        }

        const extractPublicId = (path: string, resourceType: string = 'image') => {
            if (!path) return null
            let relativePath = path
            if (path.includes('cloudinary.com')) {
                const parts = path.split('/upload/')
                relativePath = parts.length > 1 ? parts[1].replace(/^v\d+\//, '') : path
            } else {
                relativePath = path.replace(/^v\d+\//, '').replace(/^\//, '')
            }
            if (resourceType === 'raw') return relativePath
            return relativePath.replace(/\.[^.]+$/, '')
        }

        // --- ACTIONS ---

        // 1. UPLOAD FILE & CREATE RECORD
        if (action === 'upload-file') {
            const { file, projectId, fileType, userId } = payload

            const folderType = fileType === 'photo' ? 'photos' : (fileType === 'video' ? 'videos' : 'documents')
            const resourceType = fileType === 'video' ? 'video' : (fileType === 'document' ? 'raw' : 'image')

            // Upload to Cloudinary
            const cloudRes = await uploadToCloudinary(file, projectId, folderType, resourceType)

            // Extract relative path
            const filePath = cloudRes.secure_url.split('/upload/').pop().replace(/^v\d+\//, '')

            // Create DB record
            const { data, error } = await supabaseClient
                .from('project_files')
                .insert([{
                    project_id: projectId,
                    user_id: userId,
                    file_type: fileType,
                    file_path: filePath
                }])
                .select()
                .single()

            if (error) throw error

            return new Response(JSON.stringify({ data }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // 2. DELETE SINGLE FILE
        if (action === 'delete-file') {
            const { fileId } = payload

            const { data: fileRecord, error: fetchError } = await supabaseClient
                .from('project_files')
                .select('file_path, file_type')
                .eq('id', fileId)
                .single()

            if (fetchError || !fileRecord) throw new Error('File not found')

            const resourceType = fileRecord.file_type === 'video' ? 'video' :
                (fileRecord.file_type === 'document' ? 'raw' : 'image')

            const publicId = extractPublicId(fileRecord.file_path, resourceType)

            if (publicId) {
                await deleteFromCloudinary(publicId, resourceType)
            }

            const { error: deleteError } = await supabaseClient
                .from('project_files')
                .delete()
                .eq('id', fileId)

            if (deleteError) throw deleteError

            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        // 3. DELETE PROJECT
        if (action === 'delete-project') {
            const { projectId } = payload

            const { data: files, error: fetchFilesError } = await supabaseClient
                .from('project_files')
                .select('id, file_path, file_type')
                .eq('project_id', projectId)

            if (fetchFilesError) throw fetchFilesError

            if (files && files.length > 0) {
                for (const file of files) {
                    const resourceType = file.file_type === 'video' ? 'video' :
                        (file.file_type === 'document' ? 'raw' : 'image')
                    const publicId = extractPublicId(file.file_path, resourceType)
                    if (publicId) {
                        await deleteFromCloudinary(publicId, resourceType)
                    }
                }
            }

            await supabaseClient.from('project_files').delete().eq('project_id', projectId)
            const { error: deleteProjectError } = await supabaseClient
                .from('projects')
                .delete()
                .eq('id', projectId)

            if (deleteProjectError) throw deleteProjectError

            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        return new Response(JSON.stringify({ error: 'Unknown action' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
