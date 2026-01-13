import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="w-full bg-zinc-950 text-white px-6 md:px-24 py-16 md:py-24 relative z-50 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl md:text-5xl font-serif italic mb-8 tracking-tighter">RightParking.</h2>
                        <p className="text-zinc-400 max-w-sm leading-relaxed font-light text-base md:text-lg">
                            Pioneering the next generation of automated parking infrastructure.
                            Where engineering excellence meets architectural vision.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-blue-500 mb-6">Explore</h4>
                            <ul className="space-y-4 text-xs md:text-sm text-zinc-500 font-light">
                                <li><Link to="/" className="hover:text-blue-400 transition-all hover:pl-2">Home</Link></li>
                                <li><Link to="/about" className="hover:text-blue-400 transition-all hover:pl-2">About Our Vision</Link></li>
                                <li><Link to="/technology" className="hover:text-blue-400 transition-all hover:pl-2">The Stack</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-400 transition-all hover:pl-2">Connect</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-mono tracking-[0.4em] uppercase text-blue-500 mb-6">Social</h4>
                            <ul className="space-y-4 text-xs md:text-sm text-zinc-500 font-light">
                                <li><a href="#" className="hover:text-white transition-all hover:pl-2">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-all hover:pl-2">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white transition-all hover:pl-2">Twitter / X</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
                        <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
                            © 2026 RightParking – Built for the Future
                        </p>
                        <div className="flex gap-8 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,1)]"></div>
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500">Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
