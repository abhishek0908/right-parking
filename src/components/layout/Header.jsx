import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { preloadExperienceComponents } from '../../utils/preloadExperience';
import { Menu, X, ChevronRight } from 'lucide-react';

export const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/experience", label: "Experience" },
        { path: "/projects", label: "Projects" },
        { path: "/about", label: "About" },
        { path: "/technology", label: "Technology" },
        { path: "/contact", label: "Contact" }
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[9999] px-4 md:px-12 py-4 md:py-6 flex justify-center pointer-events-none">
            <nav className="w-full max-w-7xl glass rounded-2xl md:rounded-full px-5 py-3 md:px-10 flex justify-between items-center pointer-events-auto shadow-2xl transition-all duration-500">
                <Link to="/" className="flex items-center group relative z-[10001] w-20 md:w-44 h-10 md:h-12">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <img src="/logo.svg" alt="RightParking Logo" className="h-16 w-auto md:h-52 rounded-lg object-contain transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => {
                                if (item.path === '/experience') {
                                    preloadExperienceComponents();
                                }
                            }}
                            className={({ isActive }) =>
                                `text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:text-blue-400 relative py-1 ${isActive ? 'text-blue-500' : 'text-[var(--text-muted)]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-2 md:gap-6 relative z-[10001]">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center theme-toggle hover:scale-110 transition-transform bg-zinc-800/20 backdrop-blur-sm border border-zinc-700/30"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed inset-0 top-[72px] left-4 right-4 bottom-4 z-[10000] pointer-events-auto"
                    >
                        <div className="w-full h-full bg-[#09090b]/90 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                            {/* Decorative Background Glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="space-y-4">
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-500 mb-8 border-l-2 border-blue-600 pl-4">Navigation Menu</p>
                                <div className="flex flex-col gap-2">
                                    {navItems.map((item, idx) => (
                                        <motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${isActive
                                                        ? 'bg-blue-600/10 border-blue-600/30 text-white'
                                                        : 'bg-zinc-900/40 border-zinc-800/50 text-zinc-400 group hover:border-zinc-700 hover:text-white'
                                                    }`
                                                }
                                            >
                                                <span className="text-xl font-display italic leading-none">{item.label}</span>
                                                <ChevronRight size={18} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="pt-8 border-t border-zinc-800/50"
                            >
                                <div className="flex justify-center gap-6 mt-6">
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Privacy Policy</span>
                                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Terms of Service</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
