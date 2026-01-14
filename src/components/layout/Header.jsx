import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-[9999] px-6 md:px-12 py-4 md:py-6 flex justify-center pointer-events-none">
            <nav className="w-full max-w-7xl glass rounded-2xl md:rounded-full px-6 py-3 md:px-10 flex justify-between items-center pointer-events-auto shadow-2xl">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <img src="/logo.svg" alt="RightParking Logo" className="h-8 w-auto md:h-10 rounded-lg object-contain transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg md:text-xl font-serif italic font-bold tracking-tighter text-white leading-none">RightParking</span>
                        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-blue-500 opacity-70">Infrastructure v2.0</span>
                    </div>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    {[
                        { path: "/", label: "Home" },
                        { path: "/services", label: "Services" },
                        { path: "/about", label: "About" },
                        { path: "/technology", label: "Technology" },
                        { path: "/contact", label: "Contact" }
                    ].map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:text-blue-400 relative py-1 ${isActive ? 'text-blue-500' : 'text-zinc-400'
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

                <div className="flex items-center gap-4">
                    <button className="hidden md:flex bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all blue-glow font-bold text-[10px] uppercase tracking-widest border-none cursor-pointer items-center gap-2 group">
                        Join Waitlist
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
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
