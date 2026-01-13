import { motion } from 'framer-motion'

const Section = (props) => {
    return (
        <section className={`min-h-screen w-screen flex flex-col justify-center px-6 md:px-24 py-20 ${props.align === 'right' ? 'items-end' : 'items-start'}`}>
            <div className="w-full md:w-1/2 flex flex-col">
                {props.children}
            </div>
        </section>
    )
}

export const Interface = () => {
    return (
        <div className="flex flex-col w-full text-white z-10 overflow-x-hidden">
            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 md:py-8 flex justify-between items-center z-50 pointer-events-auto">
                <div className="flex items-baseline gap-2">
                    <span className="text-xl md:text-2xl font-serif italic font-bold tracking-tighter text-white">RightParking</span>
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                </div>

                <div className="hidden md:flex gap-12 text-[10px] font-mono tracking-[0.3em] uppercase items-center text-white/70">
                    <a href="#about" className="hover:text-red-500 transition-colors">The Model</a>
                    <a href="#tech" className="hover:text-red-500 transition-colors">Technology</a>
                    <a href="#vision" className="hover:text-red-500 transition-colors">Vision</a>
                    <button className="bg-white text-zinc-900 px-6 py-2.5 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl font-bold">
                        Waitlist
                    </button>
                </div>

                {/* Mobile Waitlist - simple button for mobile */}
                <div className="md:hidden">
                    <button className="bg-white text-zinc-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        Waitlist
                    </button>
                </div>
            </nav>

            {/* Page 1: Hero */}
            <Section align="left">
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-6xl md:text-8xl font-serif italic tracking-tighter mb-2 text-white"
                    >
                        Brabus 850
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-4xl md:text-6xl font-light tracking-widest uppercase text-zinc-500 mb-8 md:mb-12"
                    >
                        Performance
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="flex gap-4 items-center"
                >
                    <div className="h-[1px] w-12 md:w-24 bg-zinc-800/50"></div>
                    <p className="text-[10px] md:text-sm font-mono tracking-[0.2em] uppercase text-zinc-600">
                        The Premium Parking Experience
                    </p>
                </motion.div>
            </Section>

            {/* Page 2: Spacer */}
            <div className="h-[50vh] md:h-screen w-screen flex items-end pb-20 md:pb-32 px-6 md:px-32 justify-end pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-right"
                >
                    <h3 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-400 outline-text tracking-tighter opacity-20">Velocity</h3>
                    <p className="text-2xl md:text-4xl font-serif italic text-zinc-400">Extreme Precision</p>
                </motion.div>
            </div>

            <div className="h-screen w-screen" />
            <div className="h-screen w-screen" />

            {/* Page 3: Intelligent System */}
            <Section align="right">
                <div className="backdrop-blur-xl bg-black/40 p-6 md:p-12 border border-white/10 shadow-3xl rounded-sm">
                    <h2 className="text-3xl md:text-5xl font-serif italic mb-4 md:mb-6 text-white">
                        V8 Biturbo Control
                    </h2>
                    <p className="text-zinc-400 leading-relaxed mb-6 md:mb-8 font-light text-base md:text-lg max-w-lg">
                        The Brabus 850 approaches with silenced authority. The architecture responds.
                        Equipped with 850 horsepower, it requires millimeter accuracy on the polished concrete floor.
                    </p>
                    <ul className="space-y-3 md:space-y-4 text-[10px] md:text-sm font-mono text-zinc-500 tracking-widest uppercase border-t border-white/10 pt-6 md:pt-8 mt-6">
                        <li className="flex justify-between">
                            <span>Engine Status</span>
                            <span className="text-white">Standby</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Battery</span>
                            <span className="text-white">98%</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Parking Zone</span>
                            <span className="text-red-600">A-01 VIP</span>
                        </li>
                    </ul>
                </div>
            </Section>

            {/* Page 4: Spacer */}
            <div className="h-[50vh] md:h-screen flex items-center justify-center pointer-events-none">
                <h1 className="text-8xl md:text-[15rem] font-serif italic text-zinc-900/5">LUXURY</h1>
            </div>

            <div className="h-screen w-screen" />
            <div className="h-screen w-screen" />

            {/* Page 5: Parked State */}
            <Section align="left">
                <div className="mt-20 md:mt-32">
                    <p className="text-[10px] font-mono mb-4 text-red-600 tracking-widest uppercase">System Status</p>
                    <h2 className="text-5xl md:text-7xl font-sans font-thin text-white mb-2 leading-none">
                        Locked
                    </h2>
                    <h2 className="text-5xl md:text-7xl font-serif italic text-zinc-500 mb-8 md:mb-12 leading-none">
                        & Secured
                    </h2>

                    <button className="w-full md:w-auto border border-white/20 bg-white text-black hover:bg-red-600 hover:text-white hover:border-red-600 px-8 md:px-12 py-4 uppercase tracking-widest font-mono text-[10px] md:text-xs transition-all shadow-lg pointer-events-auto">
                        Retrieve Vehicle
                    </button>
                </div>
            </Section>

            {/* Extra Spacing for the cinematic finale */}
            <div className="h-screen w-screen" />
            <div className="h-screen w-screen" />

            {/* Final Cinematic Title - RIGHT PARKING */}
            <div className="h-screen w-screen flex flex-col items-center justify-center pointer-events-none sticky top-0 overflow-hidden px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="flex items-center gap-4 md:gap-6 mb-4">
                        <div className="h-[1px] w-12 md:w-24 bg-red-600"></div>
                        <span className="text-red-600 font-mono tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-xs uppercase">The Final Destination</span>
                        <div className="h-[1px] w-12 md:w-24 bg-red-600"></div>
                    </div>

                    <h1 className="text-6xl md:text-[12rem] font-serif italic tracking-tighter text-white leading-none">
                        Right <span className="text-white opacity-40 font-light block md:inline">PARKING</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-zinc-400 font-mono tracking-[0.2em] text-[10px] md:text-sm uppercase mt-6 md:mt-8"
                    >
                        Automation Meeting Excellence
                    </motion.p>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-screen bg-zinc-900 text-white px-6 md:px-24 py-16 md:py-24 mt-32 relative z-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl md:text-4xl font-serif italic mb-6 md:mb-8 tracking-tighter">RightParking.</h2>
                        <p className="text-zinc-400 max-w-sm leading-relaxed font-light text-sm md:text-base">
                            Redefining the synergy between automotive excellence and architectural precision.
                            Our automated systems handle the world's most capable vehicles with the respect they deserve.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 mb-4 md:mb-6">Specifications</h4>
                        <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-zinc-500 font-light">
                            <li><a href="#" className="hover:text-white transition-colors">V8 6.0 Biturbo</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">850 HP Output</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Active Aerodynamics</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Brabus Interior</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-500 mb-4 md:mb-6">Connect</h4>
                        <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-zinc-500 font-light">
                            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-zinc-800 flex flex-col md:row justify-between items-center gap-6 md:gap-8">
                    <p className="text-[8px] md:text-[10px] font-mono tracking-widest text-zinc-600 uppercase text-center">
                        © 2026 RightParking – Designed for Excellence
                    </p>
                    <div className="flex gap-6 md:gap-8 text-[8px] md:text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
                        <a href="#" className="hover:text-white transition-all">Privacy</a>
                        <a href="#" className="hover:text-white transition-all">TOS</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
