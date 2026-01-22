import { createClient } from '@supabase/supabase-js';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * Invoke the rapid-action Edge Function
 */
const invokeAssetFunction = async (action, payload, file = null) => {
    let body;
    if (file) {
        // Use FormData for file uploads
        body = new FormData();
        body.append('action', action);
        body.append('payload', JSON.stringify(payload));
        body.append('file', file);
    } else {
        // Use JSON for metadata actions
        body = { action, payload };
    }
    console.log(body);
    const { data, error } = await supabase.functions.invoke('rapid-action', {
        body
    });
    return { data, error };
};

// Auth helpers
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Projects CRUD
export const getProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
    return { data, error };
};

export const getProjectById = async (id) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
    return { data, error };
};

export const createProject = async (project) => {
    const user = await getUser();
    const { data, error } = await supabase
        .from('projects')
        .insert([{ ...project, user_id: user?.id }])
        .select()
        .single();
    return { data, error };
};

export const updateProject = async (id, updates) => {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    return { data, error };
};

export const deleteProject = async (id) => {
    // Shifting to Edge Function for atomic deletion (Cloudinary + DB)
    const { data, error } = await invokeAssetFunction('delete-project', { projectId: id });
    return { error };
};

// Project Files CRUD (stores Cloudinary URLs)
export const getProjectFiles = async (projectId) => {
    const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
    return { data, error };
};

export const getProjectFilesByType = async (projectId, fileType) => {
    const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .eq('file_type', fileType)
        .order('created_at', { ascending: true });
    return { data, error };
};

/**
 * Upload a file and create a record in project_files
 * Entire logic is handled by the Edge Function
 */
export const uploadProjectFile = async (projectId, fileType, file) => {
    const user = await getUser();
    const { data, error } = await invokeAssetFunction('upload-file', {
        projectId,
        fileType,
        userId: user?.id
    }, file);
    return { data, error };
};

export const deleteProjectFile = async (fileId) => {
    // Shifting to Edge Function for secure Cloudinary deletion
    const { data, error } = await invokeAssetFunction('delete-file', { fileId });
    return { error };
};

/**
 * Asset URL Helpers (Cloudinary focused)
 * These are kept here so components only need to import from 'lib/supabase'
 */
export const getCloudinaryUrl = (path, resourceType = null) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const cleanPath = path.split('/upload/').pop().replace(/^v\d+\//, '').replace(/^\//, '');
    let type = resourceType;
    if (!type) {
        if (cleanPath.includes('/documents/')) type = 'raw';
        else if (cleanPath.includes('/videos/')) type = 'video';
        else type = 'image';
    }
    const typeMap = { 'photo': 'image', 'image': 'image', 'video': 'video', 'document': 'raw', 'raw': 'raw' };
    const finalType = typeMap[type] || 'image';
    return `https://res.cloudinary.com/${CLOUD_NAME}/${finalType}/upload/${cleanPath}`;
};

export const getOptimizedImageUrl = (url, options = {}) => {
    const fullUrl = getCloudinaryUrl(url);
    if (!fullUrl || !fullUrl.includes('cloudinary.com')) return fullUrl;
    const { width, height, quality = 'auto', format = 'auto' } = options;
    let transforms = [`f_${format}`, `q_${quality}`];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    const parts = fullUrl.split('/upload/');
    if (parts.length === 2) return `${parts[0]}/upload/${transforms.join(',')}/${parts[1]}`;
    return fullUrl;
};

export const getVideoThumbnail = (url) => {
    const fullUrl = getCloudinaryUrl(url);
    if (!fullUrl || !fullUrl.includes('cloudinary.com')) return fullUrl;
    return fullUrl
        .replace('/video/upload/', '/video/upload/so_0,w_400,h_300,c_fill/')
        .replace(/\.[^.]+$/, '.jpg');
};
