import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-zinc-950 text-white px-6 md:px-12 py-16 md:py-24 relative z-50 border-t border-white/5 overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
                    <div className="md:col-span-5">
                        <Link to="/" className="flex items-center gap-3 mb-8 group w-fit">
                            <img src="/logo.svg" alt="RightParking Logo" className="h-10 w-auto rounded-lg object-contain" />
                            <span className="text-2xl font-serif italic font-bold tracking-tighter-premium">RightParking</span>
                        </Link>
                        <p className="text-zinc-400 max-w-sm leading-relaxed font-light text-base md:text-lg mb-8">
                            Redefining urban mobility through invisible, automated infrastructure.
                            Our systems operate at the intersection of precision engineering and seamless UX.
                        </p>
                        <div className="flex gap-4">
                            {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-xs font-mono">
                                    {social[0]}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-blue-500 mb-8">Platform</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><NavLink path="/" label="Overview" /></li>
                            <li><NavLink path="/services" label="Solutions" /></li>
                            <li><NavLink path="/technology" label="Core Tech" /></li>
                            <li><NavLink path="/about" label="Identity" /></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-blue-500 mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><NavLink path="/documentation" label="Blueprints" /></li>
                            <li><NavLink path="/contact" label="Support" /></li>
                            <li><NavLink path="/privacy" label="Privacy" /></li>
                            <li><NavLink path="/terms" label="Terms" /></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-blue-500 mb-8">Status</h4>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                                <span className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase">All Systems Nominal</span>
                            </div>
                            <p className="text-[9px] text-zinc-500 leading-tight">
                                Autonomous parking networks operating at 99.9% efficiency.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600">
                    <p className="text-[10px] font-mono tracking-widest uppercase">
                        © {currentYear} RIGHTPARKING AEROSPACE & INFRASTRUCTURE GROUP
                    </p>
                    <div className="flex items-center gap-8 font-mono text-[9px] tracking-[0.2em] uppercase">
                        <span className="text-zinc-800">COORDINATES: 28.6139° N, 77.2090° E</span>
                        <div className="w-[1px] h-4 bg-white/5" />
                        <span className="text-zinc-400">ENCRYPTION: AES-256</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const NavLink = ({ path, label }) => (
    <Link to={path} className="hover:text-blue-400 transition-all duration-300 flex items-center group">
        <span className="w-0 group-hover:w-2 h-[1px] bg-blue-500 mr-0 group-hover:mr-2 transition-all opacity-0 group-hover:opacity-100" />
        {label}
    </Link>
);
