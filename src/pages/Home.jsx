import { motion } from 'framer-motion';

export const Home = () => {
    return (
        <div className="bg-[#09090b] min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/5 rounded-full blur-[150px]" />
            </div>

            <main className="z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <p className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
                        The Next Generation
                    </p>
                    <div className="flex justify-center mb-6">
                        <img src="/logo.jpeg" alt="RightParking Logo" className="h-24 w-auto md:h-32 rounded-2xl object-contain border-2 border-white/10 shadow-[0_0_40px_rgba(37,99,235,0.3)]" />
                    </div>
                    <h1 className="text-7xl md:text-[10rem] font-serif italic tracking-tighter leading-none mb-6">
                        Right<span className="text-zinc-600">Parking</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto mb-12">
                        Experience the future of automated infrastructure.
                        Seamless, ticketless, and completely invisible.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <motion.a
                            href="/services"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                        >
                            Launch Experience
                        </motion.a>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-zinc-900 border border-white/10 text-zinc-300 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                        >
                            View Blueprint
                        </motion.button>
                    </div>
                </motion.div>
            </main>

            <footer className="absolute bottom-10 left-0 w-full text-center">
                <p className="text-zinc-600 font-mono text-[10px] tracking-widest">
                    INITIALIZING SYSTEM V2.0 // STATUS: READY
                </p>
            </footer>
        </div>
    );
};
