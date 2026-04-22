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
    FileText,
    Play,
    Download,
    Loader2,
    Activity,
    X
} from 'lucide-react';

const DotPattern = () => (
    <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '30px 30px'
        }}
    />
);

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
        const { data, error } = await getProjectById(id);
        if (data) {
            setProject(data);
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
        return getCloudinaryUrl(photo.file_path, photo.file_type);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#06070d]">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#06070d]">
                <h1 className="text-2xl font-display italic text-white mb-4">Project Not Found</h1>
                <Link to="/projects" className="text-blue-500 hover:text-blue-400">
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#06070d] relative overflow-x-hidden">
            <DotPattern />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full -z-10" />

            <div className="relative z-10 pt-20 md:pt-28 pb-24 px-5 md:px-10">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to="/projects"
                        className="inline-flex items-center text-zinc-500 hover:text-white transition-colors mb-12 group text-xs md:text-sm uppercase tracking-widest font-mono"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        {/* Left: Gallery Section */}
                        <div className="space-y-6">
                            {media.length > 0 && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-[#0c0c0e] shadow-2xl"
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
                                                className="bg-black/50 backdrop-blur-md p-3 rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
                                            >
                                                <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                                            </button>
                                        </div>
                                    </motion.div>

                                    {/* Thumbnails */}
                                    {media.length > 1 && (
                                        <div className="grid grid-cols-5 gap-3 md:gap-4 font-mono">
                                            {media.map((item, idx) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setActiveMediaIndex(idx)}
                                                    className={`relative aspect-square rounded-2xl overflow-hidden border transition-all duration-300 ${activeMediaIndex === idx ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'}`}
                                                >
                                                    <img
                                                        src={item.file_type === 'video' ? getVideoThumbnail(item.file_path) : getImageUrl(item)}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {item.file_type === 'video' && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
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
                                <div className="mt-12">
                                    <h3 className="text-[10px] md:text-sm uppercase tracking-[0.3em] font-mono font-bold text-blue-500 mb-6">Related Documentation</h3>
                                    <div className="space-y-4">
                                        {documents.map((doc, idx) => (
                                            <div
                                                key={doc.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-[#0c0c0e]/50 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer"
                                                onClick={() => setActiveDoc(getCloudinaryUrl(doc.file_path, 'document'))}
                                            >
                                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                                                        <FileText className="w-5 h-5 text-blue-500" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-zinc-200 text-sm font-medium">Project Specifications</span>
                                                        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Technical Documentation</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setActiveDoc(getCloudinaryUrl(doc.file_path, 'document')); }}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all border border-blue-600/20"
                                                    >
                                                        <Maximize2 className="w-3 h-3" />
                                                        Preview
                                                    </button>
                                                    <a
                                                        href={getCloudinaryUrl(doc.file_path, 'document')}
                                                        download
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white rounded-xl transition-all border border-white/5"
                                                        title="Download File"
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
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
                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <span className="bg-blue-600/10 text-blue-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-600/20 font-mono">
                                        Active Site
                                    </span>
                                    {project.total_parking_spots && (
                                        <span className="bg-zinc-800/50 text-zinc-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/5 flex items-center gap-1.5 font-mono">
                                            <Car className="w-3 h-3" />
                                            {project.total_parking_spots} Units
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-display italic tracking-tighter-premium text-white mb-8 leading-tight">
                                    {project.project_name}
                                </h1>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10">
                                    {project.map_url && (
                                        <div className="flex items-center p-4 rounded-2xl bg-zinc-900/30 border border-white/5">
                                            <MapPin className="w-5 h-5 text-blue-500 mr-4 shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1">Location</span>
                                                <a href={project.map_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-blue-500 transition-colors">Digital Site Access</a>
                                            </div>
                                        </div>
                                    )}
                                    {project.project_date && (
                                        <div className="flex items-center p-4 rounded-2xl bg-zinc-900/30 border border-white/5">
                                            <Calendar className="w-5 h-5 text-blue-500 mr-4 shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1">Commissioned</span>
                                                <span className="text-sm font-medium text-white">
                                                    {new Date(project.project_date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="prose prose-invert max-w-none mb-12">
                                    <h3 className="text-[10px] md:text-sm uppercase tracking-[0.3em] font-mono font-bold text-blue-500 mb-6">Executive Summary</h3>
                                    <p className="text-zinc-400 leading-relaxed text-sm md:text-lg font-light">
                                        {project.project_description || "Pioneering smart mobility through intelligent infrastructure and seamless user experiences at our flagship sites."}
                                    </p>
                                </div>

                                {/* Technology Highlights */}
                                <div className="mb-12">
                                    <h3 className="text-[10px] md:text-sm uppercase tracking-[0.3em] font-mono font-bold text-blue-500 mb-8">System Architecture</h3>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {[
                                            { label: "CCTV", icon: ShieldCheck, desc: "24/7 Security" },
                                            { label: "EV Ready", icon: Zap, desc: "Charging Dock" },
                                            { label: "Mobile Control", icon: Smartphone, desc: "Remote Access" },
                                            { label: "Real-time", icon: Activity, desc: "Data Stream" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-[#0c0c0e] border border-white/5">
                                                <item.icon className="w-5 h-5 text-blue-500/50" strokeWidth={1.5} />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-white uppercase tracking-wider">{item.label}</span>
                                                    <span className="text-[9px] text-zinc-600 uppercase font-mono">{item.desc}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox - Keep original logic but refine styling */}
            <AnimatePresence>
                {lightboxOpen && activeMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/98 z-[9999] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-8 right-8 p-3 bg-zinc-900/50 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="max-w-6xl w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                            {activeMedia.file_type === 'video' ? (
                                <video
                                    src={getCloudinaryUrl(activeMedia.file_path, 'video')}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-full rounded-3xl shadow-[0_0_100px_rgba(37,99,235,0.1)] border border-white/5"
                                />
                            ) : (
                                <img
                                    src={getImageUrl(activeMedia)}
                                    alt=""
                                    className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_100px_rgba(37,99,235,0.1)] border border-white/5"
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
                        className="fixed inset-0 bg-black/98 z-[9999] flex flex-col p-4 md:p-10"
                        onClick={() => setActiveDoc(null)}
                    >
                        <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                                        <FileText className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-display italic text-2xl tracking-tight">System Specification</h3>
                                        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-mono">Digital Asset Management</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveDoc(null)}
                                    className="p-3 bg-zinc-900/50 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 bg-white rounded-[2rem] overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                                <iframe
                                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(activeDoc)}&embedded=true`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    title="Document Viewer"
                                    className="w-full h-full grayscale-0"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
