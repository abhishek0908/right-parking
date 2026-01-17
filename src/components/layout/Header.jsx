import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { preloadServicesComponents } from '../../utils/preloadServices';

export const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 w-full z-[9999] px-6 md:px-12 py-4 md:py-6 flex justify-center pointer-events-none">
            <nav className="w-full max-w-7xl glass rounded-2xl md:rounded-full px-6 py-3 md:px-10 flex justify-between items-center pointer-events-auto shadow-2xl">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <img src="/logo.svg" alt="RightParking Logo" className="h-8 w-auto md:h-10 rounded-lg object-contain transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg md:text-xl font-display italic font-bold tracking-tighter text-[var(--text-main)] leading-tight py-1 block">RightParking</span>
                        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-blue-500 opacity-70">Infrastructure v2.0</span>
                    </div>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    {[
                        { path: "/", label: "Home" },
                        { path: "/services", label: "Services" },
                        { path: "/projects", label: "Projects" },
                        { path: "/about", label: "About" },
                        { path: "/technology", label: "Technology" },
                        { path: "/contact", label: "Contact" }
                    ].map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => {
                                // Preload Services page on hover
                                if (item.path === '/services') {
                                    preloadServicesComponents();
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

                <div className="flex items-center gap-3 md:gap-6">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center theme-toggle hover:scale-110 transition-transform"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Mobile Menu Icon Placeholder or Simple Waitlist */}
                    <div className="md:hidden">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                            Join
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};
