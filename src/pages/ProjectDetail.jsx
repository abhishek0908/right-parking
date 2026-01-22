import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectById, getProjectFiles, getCloudinaryUrl, getVideoThumbnail } from '../lib/supabase';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    ShieldCheck,
    Zap,
    Smartphone,
    Maximize2,
    Car,
    ExternalLink,
    FileText,
    Play,
    Download,
    Loader2,
    Shield,
    Activity,
    X
} from 'lucide-react';

export const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeDoc, setActiveDoc] = useState(null);

    const media = [...photos, ...videos.map(v => ({ ...v, file_type: 'video' }))];
    const activeMedia = media[activeMediaIndex];

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);

        // Try Supabase first
        const { data, error } = await getProjectById(id);

        if (data) {
            setProject(data);

            // Fetch files
            const { data: files } = await getProjectFiles(id);
            if (files) {
                setPhotos(files.filter(f => f.file_type === 'photo'));
                setVideos(files.filter(f => f.file_type === 'video'));
                setDocuments(files.filter(f => f.file_type === 'document'));
            }

        }
        setLoading(false);
    };

    const getImageUrl = (photo) => {
        // Use helper to construct full URL from stored path
        return getCloudinaryUrl(photo.file_path, photo.file_type);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#09090b]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#09090b]">
                <h1 className="text-2xl font-display italic text-white mb-4">Project Not Found</h1>
                <Link to="/projects" className="text-blue-500 hover:text-blue-400">
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/projects"
                    className="inline-flex items-center text-zinc-500 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Gallery Section */}
                    <div className="space-y-6">
                        {media.length > 0 && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-[#121214] shadow-2xl"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeMediaIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-full"
                                        >
                                            {activeMedia.file_type === 'video' ? (
                                                <video
                                                    src={getCloudinaryUrl(activeMedia.file_path, 'video')}
                                                    controls
                                                    autoPlay
                                                    muted
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={getImageUrl(activeMedia)}
                                                    alt={project.project_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="absolute top-6 right-6">
                                        <button
                                            onClick={() => setLightboxOpen(true)}
                                            className="bg-black/50 backdrop-blur-md p-3 rounded-full text-white/70 hover:text-white transition-colors"
                                        >
                                            <Maximize2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Thumbnails */}
                                {media.length > 1 && (
                                    <div className="grid grid-cols-5 gap-4">
                                        {media.map((item, idx) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveMediaIndex(idx)}
                                                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeMediaIndex === idx ? 'border-blue-600 ring-4 ring-blue-600/20' : 'border-zinc-800 opacity-50 hover:opacity-100'}`}
                                            >
                                                <img
                                                    src={item.file_type === 'video' ? getVideoThumbnail(item.file_path) : getImageUrl(item)}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                                {item.file_type === 'video' && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                        <Play className="w-5 h-5 text-white fill-white shadow-lg" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}



                        {/* Documents Section */}
                        {documents.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-blue-500 mb-4">Documents</h3>
                                <div className="space-y-3">
                                    {documents.map((doc, idx) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-blue-600/50 transition-colors group cursor-pointer"
                                            onClick={() => setActiveDoc(getCloudinaryUrl(doc.file_path, 'document'))}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-blue-500" />
                                                <div className="flex flex-col">
                                                    <span className="text-zinc-300 text-sm font-medium">Project Document</span>
                                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Review Specifications</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveDoc(getCloudinaryUrl(doc.file_path, 'document'));
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border border-blue-600/20"
                                                >
                                                    <Maximize2 className="w-3.5 h-3.5" />
                                                    View
                                                </button>
                                                <a
                                                    href={getCloudinaryUrl(doc.file_path, 'document')}
                                                    download
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-2.5 bg-zinc-800 hover:bg-green-600 text-zinc-400 hover:text-white rounded-lg transition-all border border-zinc-700"
                                                    title="Download File"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Detailed Content */}
                    <div className="flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center space-x-3 mb-6">
                                <span className="bg-blue-600/10 text-blue-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-600/20">
                                    Infrastructure
                                </span>
                                {project.total_parking_spots && (
                                    <span className="bg-green-600/10 text-green-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-green-600/20 flex items-center gap-1">
                                        <Car className="w-3 h-3" />
                                        {project.total_parking_spots} Spots
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-white mb-8 leading-tight">
                                {project.project_name}
                            </h1>

                            <div className="flex flex-wrap gap-8 mb-10 pb-10 border-b border-zinc-800">
                                {project.map_url && (
                                    <div className="flex items-center text-zinc-400">
                                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                                        <a
                                            href={project.map_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium hover:text-blue-500 transition-colors"
                                        >
                                            View in Map
                                        </a>
                                    </div>
                                )}
                                {project.project_date && (
                                    <div className="flex items-center text-zinc-400">
                                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                                        <span className="text-sm font-medium">
                                            {new Date(project.project_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long'
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {project.total_parking_spots && (
                                <div className="mb-8 inline-block bg-yellow-500/10 border border-yellow-500/20 px-5 py-4 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 blur-[30px] group-hover:bg-yellow-500/20 transition-all duration-500" />

                                    <span className="block text-3xl md:text-5xl font-display italic text-yellow-500 font-black tracking-tighter mb-1 relative z-10 shadow-yellow-500/50 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                                        {project.total_parking_spots}
                                    </span>
                                    <span className="text-yellow-600/80 uppercase tracking-[0.2em] text-[9px] font-mono font-bold flex items-center gap-1.5 relative z-10">
                                        <Car className="w-3 h-3" />
                                        Total Capacity
                                    </span>
                                </div>
                            )}



                            {project.project_description && (
                                <div className="prose prose-invert mb-12">
                                    <h3 className="text-xl text-white mb-4">About This Project</h3>
                                    <p className="text-zinc-400 leading-relaxed text-lg">
                                        {project.project_description}
                                    </p>
                                </div>
                            )}

                            {/* Technology Section */}
                            {(project.technologies?.length > 0 || project.technology_description) && (
                                <div className="mb-12">
                                    <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-blue-500 mb-6">Technical Infrastructure</h3>

                                    {/* Tech Tags */}
                                    {project.technologies?.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            {project.technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-blue-600/10 text-blue-500 border border-blue-600/20 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Tech Description */}
                                    {project.technology_description && (
                                        <p className="text-zinc-400 leading-relaxed">
                                            {project.technology_description}
                                        </p>
                                    )}
                                </div>
                            )}
                            {/* Security & Reliability Badges */}
                            <div className="mt-10 pt-10 border-t border-zinc-800 grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center">
                                    <ShieldCheck className="w-6 h-6 text-zinc-500 mb-2" />
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Secure CCTV</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Zap className="w-6 h-6 text-zinc-500 mb-2" />
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">EV Optimized</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Smartphone className="w-6 h-6 text-zinc-500 mb-2" />
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">App Control</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && activeMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-8 right-8 p-3 bg-zinc-900 rounded-full text-white/70 hover:text-white transition-colors border border-zinc-800"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="max-w-6xl w-full max-h-full flex items-center justify-center rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            {activeMedia.file_type === 'video' ? (
                                <video
                                    src={getCloudinaryUrl(activeMedia.file_path, 'video')}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
                                />
                            ) : (
                                <img
                                    src={getImageUrl(activeMedia)}
                                    alt=""
                                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Document Modal */}
            <AnimatePresence>
                {activeDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex flex-col p-4 md:p-8"
                        onClick={() => setActiveDoc(null)}
                    >
                        <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-display italic text-xl">Document Preview</h3>
                                        <p className="text-zinc-500 text-xs uppercase tracking-widest">Powered by Google Viewer</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveDoc(null)}
                                    className="p-3 bg-zinc-900 rounded-full text-white/70 hover:text-white transition-colors border border-zinc-800"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 bg-[#f8f9fa] rounded-3xl overflow-hidden shadow-2xl border border-zinc-800" onClick={(e) => e.stopPropagation()}>
                                <iframe
                                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(activeDoc)}&embedded=true`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    title="Document Viewer"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
