import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header = () => {
    return (
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 md:py-8 flex justify-between items-center z-[9999] pointer-events-auto bg-black/40 backdrop-blur-md border-b border-white/5">
            <Link to="/" className="flex items-center gap-3 group">
                <img src="/logo.jpeg" alt="RightParking Logo" className="h-8 w-auto md:h-10 rounded-md object-contain border border-white/10" />
                <span className="text-xl md:text-2xl font-serif italic font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors">RightParking</span>
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.8)]"></span>
            </Link>

            <div className="hidden md:flex gap-10 text-[10px] font-mono tracking-[0.3em] uppercase items-center text-white/50">
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
                            `transition-all hover:text-blue-400 hover:tracking-[0.4em] ${isActive ? 'text-blue-500 tracking-[0.4em]' : ''}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>

            <div className="flex items-center gap-6">
                <button className="hidden md:block bg-blue-600 text-white px-7 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] font-bold text-[10px] uppercase tracking-widest border-none cursor-pointer">
                    Join Waitlist
                </button>
                {/* Mobile Waitlist */}
                <div className="md:hidden">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        Waitlist
                    </button>
                </div>
            </div>
        </nav>
    );
};
