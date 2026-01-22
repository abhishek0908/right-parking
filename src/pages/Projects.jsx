import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Car, Loader2 } from 'lucide-react';
import { getProjects, getProjectFiles, getCloudinaryUrl } from '../lib/supabase';

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
            // Fetch first photo as main image for each project
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
            <div className="min-h-screen bg-[#09090b] pt-32 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] pt-36 md:pt-44 pb-20 px-6 md:px-12 relative z-10">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-blue-500 text-xs md:text-base uppercase tracking-[0.3em] font-bold mb-4">
                        Our Portfolio
                    </h2>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-display italic text-white mb-6">
                        Pioneering <span className="text-blue-600">Smart Mobility</span>
                    </h1>
                    <p className="text-zinc-400 text-base md:text-lg max-w-2xl">
                        Explore our flagship parking infrastructure projects across the globe, where cutting-edge technology meets urban architectural excellence.
                    </p>
                </motion.div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto w-full">
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                            <Car className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h3 className="text-xl text-white font-display italic mb-2">No Projects to Display</h3>
                        <p className="text-zinc-500 max-w-md mb-6">
                            Check back later to see our latest parking infrastructure projects.
                        </p>
                        {errorMsg && (
                            <div className="max-w-lg w-full bg-red-900/20 border border-red-500/30 p-4 rounded-lg text-left">
                                <p className="text-red-400 text-xs font-mono mb-2">DEBUG ERROR:</p>
                                <pre className="text-red-300 text-[10px] whitespace-pre-wrap font-mono overflow-auto max-h-40">
                                    {errorMsg}
                                </pre>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="group block bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-600/50 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(37,99,235,0.3)]"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={project.mainImage || '/project_1_main_parking_1768682799033.png'}
                                            alt={project.project_name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-60" />

                                        {/* Badge */}
                                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Featured
                                        </div>

                                        {/* Project Number */}
                                        <div className="absolute bottom-4 left-4 text-white/20 font-display italic text-4xl font-bold">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-display italic text-white mb-3 group-hover:text-blue-500 transition-colors">
                                            {project.project_name}
                                        </h3>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-4 mb-4 text-zinc-500 text-xs">
                                            {project.map_url && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-blue-500" />
                                                    Active Location
                                                </span>
                                            )}
                                            {project.project_date && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(project.project_date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short'
                                                    })}
                                                </span>
                                            )}
                                            {project.total_parking_spots && (
                                                <span className="flex items-center gap-1">
                                                    <Car className="w-3 h-3" />
                                                    {project.total_parking_spots} spots
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-zinc-400 text-sm line-clamp-2 mb-6">
                                            {project.project_description}
                                        </p>

                                        {/* Action */}
                                        <div className="flex items-center text-white text-sm font-bold group-hover:translate-x-2 transition-transform">
                                            View Project <ArrowRight className="ml-2 w-4 h-4 text-blue-600" />
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
