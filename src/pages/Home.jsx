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
                <div className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-10"
                    >
                        <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                        The Future of Urban Infrastructure
                    </motion.div>

                    <div className="flex justify-center mb-10 overflow-hidden rounded-3xl group">
                        <motion.div
                            initial={{ scale: 1.2, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
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

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-9xl font-display italic tracking-tighter-premium leading-tight mb-8 py-8 px-4"
                    >
                        <span className="text-gradient inline-block pb-2">Right</span> <span className="text-blue-500 font-display inline-block pb-2">Parking</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[var(--text-main)] text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto mb-16 leading-relaxed"
                    >
                        Experience automated parking that works in the background.
                        <span className="font-semibold"> Seamlessly integrated.</span>
                        <span className="font-semibold"> Ticketless.</span>
                        <span className="font-semibold"> Intelligent.</span>
                    </motion.p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link to="/services">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                whileHover={{ scale: 1.05, translateY: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-blue-600 text-white px-10 py-5 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all blue-glow relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Launch Experience
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
