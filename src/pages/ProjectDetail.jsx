import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import {
    ArrowLeft,
    CheckCircle2,
    MapPin,
    Calendar,
    ShieldCheck,
    Zap,
    Smartphone,
    Maximize2
} from 'lucide-react';

export const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const found = projects.find(p => p.id === id);
        if (found) {
            setProject(found);
        }
    }, [id]);

    if (!project) return (
        <div className="h-screen flex items-center justify-center bg-[#09090b]">
            <div className="text-white text-2xl font-display italic animate-pulse">Loading Project...</div>
        </div>
    );

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
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-[#121214] shadow-2xl"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={project.gallery[activeImage]}
                                    alt={project.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            <div className="absolute top-6 right-6">
                                <button className="bg-black/50 backdrop-blur-md p-3 rounded-full text-white/70 hover:text-white transition-colors">
                                    <Maximize2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-5 gap-4">
                            {project.gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-blue-600 ring-4 ring-blue-600/20' : 'border-zinc-800 opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
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
                                <span className="bg-zinc-800/50 text-zinc-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    Series-W223
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-white mb-8 leading-tight">
                                {project.name}
                            </h1>

                            <div className="flex flex-wrap gap-8 mb-10 pb-10 border-b border-zinc-800">
                                <div className="flex items-center text-zinc-400">
                                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium">Metropolitan Hub</span>
                                </div>
                                <div className="flex items-center text-zinc-400">
                                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium">Completed 2023</span>
                                </div>
                            </div>

                            <div className="prose prose-invert mb-12">
                                <h3 className="text-xl text-white mb-4">Vision & Objective</h3>
                                <p className="text-zinc-400 leading-relaxed text-lg">
                                    {project.description}
                                </p>
                            </div>

                            {/* High-Tech Feature Grid */}
                            <div className="mb-12">
                                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-blue-500 mb-6">Project Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start p-4 rounded-xl bg-[#121214] border border-zinc-800 hover:border-blue-600/30 transition-colors group"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-zinc-200 text-sm font-medium group-hover:text-white transition-colors">{feature}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)]">
                                    Request Documentation
                                </button>
                                <button className="flex-1 bg-transparent border border-zinc-800 hover:bg-zinc-900 text-white font-bold py-5 rounded-2xl transition-all">
                                    Contact Project Lead
                                </button>
                            </div>

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
        </div>
    );
};
