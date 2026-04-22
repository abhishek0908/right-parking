import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Car, Loader2 } from 'lucide-react';
import { getProjects, getProjectFiles, getCloudinaryUrl } from '../lib/supabase';

const DotPattern = () => (
    <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '30px 30px'
        }}
    />
);

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await getProjects();

        if (error) {
            console.error("Error fetching projects:", error);
            setErrorMsg(JSON.stringify(error, null, 2));
            setProjects([]);
        } else if (!data || data.length === 0) {
            setProjects([]);
        } else {
            const projectsWithImages = await Promise.all(
                data.map(async (project) => {
                    const { data: files } = await getProjectFiles(project.id);
                    const photo = files?.find(f => f.file_type === 'photo');
                    return {
                        ...project,
                        mainImage: photo ? getCloudinaryUrl(photo.file_path) : null
                    };
                })
            );
            setProjects(projectsWithImages);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#06070d] pt-32 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#06070d] relative overflow-x-hidden">
            <DotPattern />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full -z-10" />

            <div className="relative z-10 pt-20 md:pt-28 pb-20 px-5 md:px-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-blue-500 font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-6">
                            Our Portfolio
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display italic tracking-tighter-premium text-white mb-6 leading-tight">
                            Pioneering <span className="text-blue-500">Smart Mobility</span>
                        </h1>
                        <p className="text-zinc-400 text-sm md:text-lg max-w-2xl font-light leading-relaxed border-l-2 border-blue-500/30 pl-6">
                            Explore our flagship parking infrastructure projects across the globe, where cutting-edge technology meets urban architectural excellence.
                        </p>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                            <Car className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h3 className="text-xl text-white font-display italic mb-2">No Projects to Display</h3>
                        <p className="text-zinc-500 max-w-md mb-6 text-sm">
                            Check back later to see our latest parking infrastructure projects.
                        </p>
                        {errorMsg && (
                            <div className="max-w-lg w-full bg-red-900/10 border border-red-500/20 p-4 rounded-xl text-left">
                                <p className="text-red-400 text-[10px] font-mono mb-2 uppercase tracking-widest opacity-60">System Log:</p>
                                <pre className="text-red-300 text-[10px] whitespace-pre-wrap font-mono overflow-auto max-h-40 scrollbar-hide">
                                    {errorMsg}
                                </pre>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="group block bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_-20px_rgba(37,99,235,0.15)] relative"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={project.mainImage || '/project_1_main_parking_1768682799033.png'}
                                            alt={project.project_name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/20 to-transparent" />

                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                                            Scale Ready
                                        </div>

                                        {/* Index Number */}
                                        <div className="absolute bottom-4 left-6 text-white/10 font-display italic text-5xl font-bold tracking-tight">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-xl md:text-2xl font-display italic text-white mb-3 group-hover:text-blue-500 transition-colors">
                                            {project.project_name}
                                        </h3>

                                        {/* Meta Tags */}
                                        <div className="flex flex-wrap items-center gap-3 mb-6">
                                            {project.map_url && (
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-400 font-mono uppercase tracking-wider">
                                                    <MapPin className="w-2.5 h-2.5" /> Site Active
                                                </div>
                                            )}
                                            {project.total_parking_spots && (
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/50 border border-white/5 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                                    <Car className="w-2.5 h-2.5" /> {project.total_parking_spots} Units
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-zinc-400 text-xs md:text-sm line-clamp-2 mb-8 font-light leading-relaxed">
                                            {project.project_description || "Pioneering smart mobility through intelligent infrastructure and seamless user experiences."}
                                        </p>

                                        {/* Footer Action */}
                                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Case Study</span>
                                            <div className="flex items-center text-white text-xs font-bold group-hover:text-blue-500 transition-all">
                                                DETAILS <ArrowRight className="ml-2 w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
