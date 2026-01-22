import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Upload,
    X,
    MapPin,
    Calendar,
    Car,
    FileText,
    Image as ImageIcon,
    Video,
    File,
    Loader2,
    Check,
    Plus,
    Trash2,
    Cloud
} from 'lucide-react';
import {
    createProject,
    updateProject,
    getProjectById,
    getProjectFiles,
    uploadProjectFile,
    deleteProjectFile,
    getCloudinaryUrl
} from '../../lib/supabase';

export const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deletingFileId, setDeletingFileId] = useState(null);
    const [filesToDelete, setFilesToDelete] = useState([]);
    const [error, setError] = useState('');

    // Form State - matching your database schema
    const [formData, setFormData] = useState({
        project_name: '',
        project_description: '',
        project_date: '',
        total_parking_spots: '',
        map_url: '',
        technology_description: '',
        technologies: [],
    });
    const [techInput, setTechInput] = useState('');

    // Files State
    const [existingPhotos, setExistingPhotos] = useState([]);
    const [existingVideos, setExistingVideos] = useState([]);
    const [existingDocuments, setExistingDocuments] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);
    const [newVideos, setNewVideos] = useState([]);
    const [newDocuments, setNewDocuments] = useState([]);

    // File input refs
    const photosRef = useRef(null);
    const videosRef = useRef(null);
    const documentsRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);
        const { data, error } = await getProjectById(id);
        if (data) {
            setFormData({
                project_name: data.project_name || '',
                project_description: data.project_description || '',
                project_date: data.project_date || '',
                total_parking_spots: data.total_parking_spots || '',
                map_url: data.map_url || '',
                technology_description: data.technology_description || '',
                technologies: data.technologies || [],
            });

            // Fetch existing files
            const { data: files } = await getProjectFiles(id);
            if (files) {
                setExistingPhotos(files.filter(f => f.file_type === 'photo'));
                setExistingVideos(files.filter(f => f.file_type === 'video'));
                setExistingDocuments(files.filter(f => f.file_type === 'document'));
            }
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (files, type) => {
        const fileList = Array.from(files);
        let maxSize = 0;
        let maxCount = 0;
        let setter, currentNew, existingCount;

        if (type === 'photo') {
            maxSize = 10 * 1024 * 1024; // 10MB
            maxCount = 10;
            setter = setNewPhotos;
            currentNew = newPhotos;
            existingCount = existingPhotos.filter(p => !filesToDelete.some(f => f.id === p.id)).length;
        } else if (type === 'video') {
            maxSize = 100 * 1024 * 1024; // 100MB
            maxCount = 2;
            setter = setNewVideos;
            currentNew = newVideos;
            existingCount = existingVideos.filter(v => !filesToDelete.some(f => f.id === v.id)).length;
        } else if (type === 'document') {
            maxSize = 5 * 1024 * 1024; // 5MB
            maxCount = 1;
            setter = setNewDocuments;
            currentNew = newDocuments;
            existingCount = existingDocuments.filter(d => !filesToDelete.some(f => f.id === d.id)).length;
        }

        const remainingSlots = maxCount - (existingCount + currentNew.length);

        if (remainingSlots <= 0) {
            alert(`Restriction: Maximum ${maxCount} ${type}(s) allowed per project. You have already reached this limit.`);
            return;
        }

        const validFiles = [];
        const oversizedFiles = [];

        fileList.forEach(file => {
            if (file.size > maxSize) {
                oversizedFiles.push(file.name);
            } else if (validFiles.length < remainingSlots) {
                validFiles.push(file);
            }
        });

        if (oversizedFiles.length > 0) {
            alert(`The following files were skipped as they exceed the ${maxSize / (1024 * 1024)}MB size limit:\n- ${oversizedFiles.join('\n- ')}`);
        }

        if (fileList.length - oversizedFiles.length > remainingSlots) {
            alert(`Only the first ${remainingSlots} valid ${type}(s) were added because the maximum limit is ${maxCount}.`);
        }

        if (validFiles.length > 0) {
            const newFiles = validFiles.map(file => ({
                file,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                name: file.name,
            }));
            setter([...currentNew, ...newFiles]);
        }
    };

    const removeNewFile = (index, setter, files) => {
        const newFiles = [...files];
        if (newFiles[index].preview) {
            URL.revokeObjectURL(newFiles[index].preview);
        }
        newFiles.splice(index, 1);
        setter(newFiles);
    };

    const removeExistingFile = (file) => {
        setFilesToDelete(prev => [...prev, file]);
    };

    const undoDelete = (fileId) => {
        setFilesToDelete(prev => prev.filter(f => f.id !== fileId));
    };

    const addTechnology = () => {
        if (techInput.trim()) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, techInput.trim()]
            }));
            setTechInput('');
        }
    };

    const removeTechnology = (index) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter((_, i) => i !== index)
        }));
    };

    const handleTechKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTechnology();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            // Prepare project data
            const projectData = {
                project_name: formData.project_name,
                project_description: formData.project_description || null,
                project_date: formData.project_date || null,
                total_parking_spots: parseInt(formData.total_parking_spots) || null,
                map_url: formData.map_url || null,
                technology_description: formData.technology_description || null,
                technologies: formData.technologies || [],
            };

            let projectId = id;

            if (isEditing) {
                const { error } = await updateProject(id, projectData);
                if (error) throw error;
            } else {
                const { data, error } = await createProject(projectData);
                if (error) throw error;
                projectId = data.id;
            }

            // Upload new photos to Supabase Edge Function
            setUploading(true);
            for (const photo of newPhotos) {
                const { error } = await uploadProjectFile(projectId, 'photo', photo.file);
                if (error) throw error;
            }

            // Upload new videos
            for (const video of newVideos) {
                const { error } = await uploadProjectFile(projectId, 'video', video.file);
                if (error) throw error;
            }

            // Upload new documents
            for (const doc of newDocuments) {
                const { error } = await uploadProjectFile(projectId, 'document', doc.file);
                if (error) throw error;
            }

            // Upload new progress...
            // ... (keep upload loops) ...

            // Delete files marked for deletion
            for (const file of filesToDelete) {
                const { error } = await deleteProjectFile(file.id);
                if (error) {
                    console.error('Failed to delete file from Cloudinary in batch:', error);
                    // We continue anyway so we don't break the whole save for one file cleanup failure
                }
            }

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to save project');
        } finally {
            setSaving(false);
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] pb-20">
            {/* Header */}
            <div className="bg-[#0c0c0e] border-b border-zinc-800/50 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-semibold text-white">
                                {isEditing ? 'Edit Project' : 'New Project'}
                            </h1>
                            <p className="text-zinc-500 text-xs flex items-center gap-1">
                                <Cloud className="w-3 h-3" />
                                Files uploaded to Cloudinary
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Check className="w-4 h-4" />
                        )}
                        {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-5xl mx-auto px-6 pt-10">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Basic Info */}
                    <section className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                    Project Name *
                                </label>
                                <input
                                    type="text"
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., SkyLine Plaza Smart Hub"
                                    className="w-full bg-[#0a0a0b] border border-zinc-800 rounded-xl py-3.5 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                    Project Description
                                </label>
                                <textarea
                                    name="project_description"
                                    value={formData.project_description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe the project..."
                                    className="w-full bg-[#0a0a0b] border border-zinc-800 rounded-xl py-3.5 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    Project Date
                                </label>
                                <input
                                    type="date"
                                    name="project_date"
                                    value={formData.project_date}
                                    onChange={handleChange}
                                    className="w-full bg-[#0a0a0b] border border-zinc-800 rounded-xl py-3.5 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                    <Car className="w-3 h-3 inline mr-1" />
                                    Total Parking Spots
                                </label>
                                <input
                                    type="number"
                                    name="total_parking_spots"
                                    value={formData.total_parking_spots}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="e.g., 500"
                                    className="w-full bg-[#0a0a0b] border border-zinc-800 rounded-xl py-3.5 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Location (Map URL) */}
                    <section className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            Location
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                    Google Maps URL / Embed Link
                                </label>
                                <input
                                    type="text"
                                    name="map_url"
                                    value={formData.map_url}
                                    onChange={handleChange}
                                    placeholder="e.g., https://www.google.com/maps/embed?pb=..."
                                    className="w-full bg-[#0a0a0b] border border-zinc-800 rounded-xl py-3.5 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                                />
                                <p className="text-[10px] text-zinc-500 mt-2 italic">
                                    Pro-tip: For best results, use the "Embed a map" URL from Google Maps sharing options.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Technology Stack */}
                    <section className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                            <Plus className="w-5 h-5 text-blue-500" />
                            Technologies Used
                        </h2>

                        <div className="space-y-6">
                            {/* Tags Input */}
                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                    Add Technology (Press Enter)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        onKeyDown={handleTechKeyDown}
                                        placeholder="e.g., AI Powered ANPR, FASTag Integration"
                                        className="flex-1 bg-[#0a0a0b] border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTechnology}
                                        className="px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Tags List */}
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-600/10 text-blue-500 border border-blue-600/20 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2"
                                    >
                                        {tech}
                                        <button
                                            type="button"
                                            onClick={() => removeTechnology(index)}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                                {formData.technologies.length === 0 && (
                                    <p className="text-zinc-600 text-xs italic">No technologies added yet.</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">
                                    Detailed Tech Description
                                </label>
                                <textarea
                                    name="technology_description"
                                    value={formData.technology_description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe the overall technical implementation..."
                                    className="w-full bg-[#0a0a0b] border border-zinc-800 rounded-xl py-3.5 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Photos */}
                    <section className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-3">
                            <ImageIcon className="w-5 h-5 text-blue-500" />
                            Photos
                        </h2>
                        <p className="text-zinc-500 text-[10px] mb-6 flex flex-wrap gap-x-4 gap-y-1 items-center">
                            <span className="flex items-center gap-1"><Cloud className="w-3 h-3" /> Cloudinary CDN</span>
                            <span className="text-blue-500 font-mono tracking-tighter uppercase whitespace-nowrap">Max 10 Images • 10MB each</span>
                        </p>
                        <input
                            type="file"
                            ref={photosRef}
                            onChange={(e) => handleFileSelect(e.target.files, 'photo')}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Existing Photos */}
                            {existingPhotos.filter(p => !filesToDelete.some(f => f.id === p.id)).map((photo) => (
                                <div key={photo.id} className="relative group">
                                    <img
                                        src={getCloudinaryUrl(photo.file_path, 'photo')}
                                        alt="Photo"
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingFile(photo)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {/* Deleted photos (undo) */}
                            {filesToDelete.filter(f => f.file_type === 'photo').map((photo) => (
                                <div key={photo.id} className="relative group opacity-40">
                                    <img
                                        src={getCloudinaryUrl(photo.file_path, 'photo')}
                                        alt="Photo"
                                        className="w-full h-24 object-cover rounded-lg grayscale"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => undoDelete(photo.id)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg"
                                    >
                                        <span className="text-[10px] text-white bg-blue-600 px-2 py-1 rounded-md font-bold uppercase tracking-wider">Undo</span>
                                    </button>
                                </div>
                            ))}
                            {/* New Photos */}
                            {newPhotos.map((photo, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={photo.preview}
                                        alt={photo.name}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                        <span className="text-[10px] text-white bg-blue-600 px-2 py-0.5 rounded">New</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeNewFile(index, setNewPhotos, newPhotos)}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => photosRef.current?.click()}
                                className="h-24 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 hover:border-blue-600 hover:text-blue-500 transition-colors"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>
                    </section>

                    {/* Videos */}
                    <section className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-3">
                            <Video className="w-5 h-5 text-blue-500" />
                            Videos
                        </h2>
                        <p className="text-zinc-500 text-[10px] mb-6 flex flex-wrap gap-x-4 gap-y-1 items-center">
                            <span className="flex items-center gap-1"><Cloud className="w-3 h-3" /> Cloudinary CDN</span>
                            <span className="text-blue-500 font-mono tracking-tighter uppercase whitespace-nowrap">Max 2 Videos • 100MB each</span>
                        </p>
                        <input
                            type="file"
                            ref={videosRef}
                            onChange={(e) => handleFileSelect(e.target.files, 'video')}
                            accept="video/*"
                            multiple
                            className="hidden"
                        />
                        <div className="space-y-3">
                            {/* Existing Videos */}
                            {existingVideos.filter(v => !filesToDelete.some(f => f.id === v.id)).map((video) => (
                                <div key={video.id} className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Video className="w-4 h-4 text-blue-500" />
                                        <a href={getCloudinaryUrl(video.file_path, 'video')} target="_blank" rel="noopener noreferrer" className="text-zinc-300 text-sm truncate hover:text-blue-400">
                                            {video.file_path.split('/').pop()}
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeExistingFile(video)}
                                        className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {/* Deleted Videos (Undo) */}
                            {filesToDelete.filter(f => f.file_type === 'video').map((video) => (
                                <div key={video.id} className="flex items-center justify-between bg-zinc-900/20 p-3 rounded-lg border border-dashed border-zinc-800">
                                    <div className="flex items-center gap-3 opacity-40">
                                        <Video className="w-4 h-4 text-zinc-600" />
                                        <span className="text-zinc-500 text-sm italic">Deleting: {video.file_path.split('/').pop()}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => undoDelete(video.id)}
                                        className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded"
                                    >
                                        Undo
                                    </button>
                                </div>
                            ))}
                            {/* New Videos */}
                            {newVideos.map((video, index) => (
                                <div key={index} className="flex items-center justify-between bg-blue-900/20 border border-blue-600/30 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Video className="w-4 h-4 text-blue-500" />
                                        <span className="text-zinc-300 text-sm truncate">{video.name}</span>
                                        <span className="text-[10px] text-blue-400 bg-blue-600/20 px-2 py-0.5 rounded">New</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeNewFile(index, setNewVideos, newVideos)}
                                        className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => videosRef.current?.click()}
                                className="w-full py-3 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center gap-2 text-zinc-500 hover:border-blue-600 hover:text-blue-500 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Videos
                            </button>
                        </div>
                    </section>

                    {/* Documents */}
                    <section className="bg-[#121214] border border-zinc-800 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-3">
                            <File className="w-5 h-5 text-blue-500" />
                            Documents
                        </h2>
                        <p className="text-zinc-500 text-[10px] mb-6 flex flex-wrap gap-x-4 gap-y-1 items-center">
                            <span className="flex items-center gap-1"><Cloud className="w-3 h-3" /> Cloudinary CDN</span>
                            <span className="text-blue-500 font-mono tracking-tighter uppercase whitespace-nowrap">1 Document Only • 5MB max</span>
                        </p>
                        <input
                            type="file"
                            ref={documentsRef}
                            onChange={(e) => handleFileSelect(e.target.files, 'document')}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                            className="hidden"
                        />
                        <div className="space-y-3">
                            {/* Existing Documents */}
                            {existingDocuments.filter(d => !filesToDelete.some(f => f.id === d.id)).map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <File className="w-4 h-4 text-blue-500" />
                                        <a href={getCloudinaryUrl(doc.file_path, 'document')} download target="_blank" rel="noopener noreferrer" className="text-zinc-300 text-sm truncate hover:text-blue-400">
                                            {doc.file_path.split('/').pop()}
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeExistingFile(doc)}
                                        className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {/* Deleted Documents (Undo) */}
                            {filesToDelete.filter(f => f.file_type === 'document').map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between bg-zinc-900/20 p-3 rounded-lg border border-dashed border-zinc-800">
                                    <div className="flex items-center gap-3 opacity-40">
                                        <File className="w-4 h-4 text-zinc-600" />
                                        <span className="text-zinc-500 text-sm italic">Deleting: {doc.file_path.split('/').pop()}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => undoDelete(doc.id)}
                                        className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded"
                                    >
                                        Undo
                                    </button>
                                </div>
                            ))}
                            {/* New Documents */}
                            {newDocuments.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between bg-blue-900/20 border border-blue-600/30 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <File className="w-4 h-4 text-blue-500" />
                                        <span className="text-zinc-300 text-sm truncate">{doc.name}</span>
                                        <span className="text-[10px] text-blue-400 bg-blue-600/20 px-2 py-0.5 rounded">New</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeNewFile(index, setNewDocuments, newDocuments)}
                                        className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => documentsRef.current?.click()}
                                className="w-full py-3 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center gap-2 text-zinc-500 hover:border-blue-600 hover:text-blue-500 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Documents
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
};
