import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getProjects, deleteProject, getProjectFiles, getOptimizedImageUrl } from '../../lib/supabase';
import {
    Plus,
    Edit2,
    Trash2,
    LogOut,
    MapPin,
    Calendar,
    Car,
    Search,
    LayoutDashboard,
    FolderOpen,
    AlertCircle,
    Image as ImageIcon
} from 'lucide-react';

export const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await getProjects();
        if (!error && data) {
            // Fetch first photo for each project as thumbnail
            const projectsWithThumbnails = await Promise.all(
                data.map(async (project) => {
                    const { data: files } = await getProjectFiles(project.id);
                    const photo = files?.find(f => f.file_type === 'photo');
                    return {
                        ...project,
                        thumbnail: photo ? getOptimizedImageUrl(photo.file_path, { width: 200, height: 150 }) : null
                    };
                })
            );
            setProjects(projectsWithThumbnails);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setIsDeleting(true);
        const { error } = await deleteProject(id);
        if (!error) {
            setProjects(projects.filter(p => p.id !== id));
            setDeleteConfirm(null);
        } else {
            alert('Failed to delete project: ' + error.message);
        }
        setIsDeleting(false);
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/admin');
    };

    const filteredProjects = projects.filter(p =>
        p.project_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.project_description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#09090b]">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-[#0c0c0e] border-r border-zinc-800/50 p-6 hidden lg:block">
                <div className="mb-10">
                    <h1 className="text-xl font-display italic text-white">
                        Right<span className="text-blue-500">Parking</span>
                    </h1>
                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-1">Admin Panel</p>
                </div>

                <nav className="space-y-2">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-500 font-medium text-sm"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/projects/new"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Link>
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-zinc-900/50 rounded-xl p-4 mb-4">
                        <p className="text-zinc-500 text-xs truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-zinc-500 hover:text-red-400 transition-colors text-sm w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 p-6 md:p-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-display italic text-white mb-2">Dashboard</h1>
                        <p className="text-zinc-500 text-sm">Manage your parking projects</p>
                    </div>
                    <Link
                        to="/admin/projects/new"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Project
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center">
                                <FolderOpen className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">{projects.length}</p>
                                <p className="text-zinc-500 text-sm">Total Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center">
                                <Car className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">
                                    {projects.reduce((sum, p) => sum + (p.total_parking_spots || 0), 0)}
                                </p>
                                <p className="text-zinc-500 text-sm">Total Parking Spots</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">
                                    {projects.filter(p => p.latitude && p.longitude).length}
                                </p>
                                <p className="text-zinc-500 text-sm">With Location</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full bg-[#121214] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                </div>

                {/* Projects List */}
                <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-zinc-800">
                        <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="p-12 text-center">
                            <FolderOpen className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                            <p className="text-zinc-500">No projects found</p>
                            <Link
                                to="/admin/projects/new"
                                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mt-4 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Create your first project
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-800">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-6 flex items-center gap-6 hover:bg-zinc-900/30 transition-colors"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-20 h-16 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                                        {project.thumbnail ? (
                                            <img
                                                src={project.thumbnail}
                                                alt={project.project_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                                <ImageIcon className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-medium truncate">{project.project_name}</h3>
                                        <div className="flex items-center gap-4 mt-1 text-zinc-500 text-xs">
                                            {project.latitude && project.longitude && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}
                                                </span>
                                            )}
                                            {project.project_date && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(project.project_date).toLocaleDateString()}
                                                </span>
                                            )}
                                            {project.total_parking_spots && (
                                                <span className="flex items-center gap-1">
                                                    <Car className="w-3 h-3" />
                                                    {project.total_parking_spots} spots
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/admin/projects/${project.id}/edit`}
                                            className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteConfirm(project.id)}
                                            className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#121214] border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl backdrop-blur-xl"
                        >
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-display italic text-white mb-2 uppercase tracking-tight">Delete Project?</h3>
                            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                                This action is permanent. All project data and media files (photos, videos, documents) will be removed from both the database and Cloudinary storage.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 border border-zinc-700 text-white rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
};
