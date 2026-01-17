import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Projects = () => {
    return (
        <div className="min-h-screen bg-[#09090b] pt-32 pb-20 px-6 md:px-12">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-blue-500 text-sm md:text-base uppercase tracking-[0.3em] font-bold mb-4">
                        Our Portfolio
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-display italic text-white mb-6">
                        Pioneering <span className="text-blue-600">Smart Mobility</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Explore our flagship parking infrastructure projects across the globe, where cutting-edge technology meets urban architectural excellence.
                    </p>
                </motion.div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                                    src={project.mainImage}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-60" />

                                {/* Badge */}
                                <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Featured
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-display italic text-white mb-3 group-hover:text-blue-500 transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-zinc-400 text-sm line-clamp-2 mb-6">
                                    {project.summary}
                                </p>

                                {/* Features (Mini List) */}
                                <div className="space-y-2 mb-8">
                                    {project.features.slice(0, 3).map((feature, i) => (
                                        <div key={i} className="flex items-center text-zinc-500 text-xs text-nowrap overflow-hidden">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 flex-shrink-0" />
                                            <span className="truncate">{feature}</span>
                                        </div>
                                    ))}
                                    <div className="text-blue-500/60 text-[10px] font-medium pt-1">
                                        + {project.features.length - 3} more exclusive features
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="flex items-center text-white text-sm font-bold group-hover:translate-x-2 transition-transform">
                                    View Case Study <ArrowRight className="ml-2 w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
