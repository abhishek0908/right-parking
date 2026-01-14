import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';

export const Home = () => {
    return (
        <div className="bg-[var(--bg-home)] min-h-screen text-[var(--text-main)] relative transition-colors duration-300">
            {/* Background Ambience - More sophisticated */}
            <div className="fixed inset-0 pointer-events-none select-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-600/5 rounded-full blur-[150px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_20%,transparent_100%)] opacity-20" />
            </div>

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-32 pb-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-10">
                        <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                        The Future of Urban Infrastructure
                    </div>

                    <div className="flex justify-center mb-10 overflow-hidden rounded-3xl group">
                        <motion.div
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="relative"
                        >
                            <img
                                src="/logo.svg"
                                alt="RightParking Logo"
                                className="h-32 w-auto md:h-44 rounded-3xl object-contain border border-[var(--border)] shadow-[0_0_60px_rgba(37,99,235,0.15)] group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full -z-10 opacity-50" />
                        </motion.div>
                    </div>

                    <h1 className="text-7xl md:text-[11rem] font-serif italic tracking-tighter-premium leading-[0.85] mb-8 text-gradient">
                        Right<span className="text-[var(--text-muted)] font-serif opacity-30">Parking</span>
                    </h1>

                    <p className="text-[var(--text-muted)] text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto mb-16 leading-relaxed">
                        Experience automated parking that works in the background.
                        <span className="text-[var(--text-main)]"> Seamlessly integrated.</span>
                        <span className="text-[var(--text-main)]"> Ticketless.</span>
                        <span className="text-[var(--text-main)]"> Intelligent.</span>
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link to="/services">
                            <motion.button
                                whileHover={{ scale: 1.05, translateY: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-blue-600 text-white px-10 py-5 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all blue-glow relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Launch Interface
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </motion.button>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text-main)] px-10 py-5 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 hover:border-white/20 transition-all"
                        >
                            System Architecture
                        </motion.button>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};
