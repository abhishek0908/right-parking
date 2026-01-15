import { motion } from 'framer-motion'

const Section = (props) => {
    return (
        <section className={`min-h-screen w-screen flex flex-col justify-center px-8 md:px-24 py-32 ${props.align === 'right' ? 'items-end' : 'items-start'}`}>
            <div className={`w-full md:w-1/2 flex flex-col ${props.align === 'right' ? 'items-end' : 'items-start'}`}>
                {props.children}
            </div>
        </section>
    )
}

export const Interface = () => {
    return (
        <div className="relative flex flex-col w-full text-white z-[999999] overflow-x-hidden">
            {/* 0% - 15%: Hero */}
            <Section align="left">
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-6xl md:text-8xl font-serif italic tracking-tighter mb-4 text-white leading-[0.9]"
                    >
                        Building India's <br />
                        <span className="text-blue-500">Future of Parking</span>
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-xl md:text-3xl font-light tracking-widest uppercase text-zinc-400 mb-8 md:mb-12"
                    >
                        Ticketless. Manpowerless. Seamless.
                    </motion.h2>
                </div>
            </Section>

            {/* SPACER to next 15-20% block */}
            <div className="h-[50vh]" />

            {/* 15% - 35%: Philosophy */}
            <Section align="right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">The Philosophy</p>
                    <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter mb-12 text-white leading-tight">
                        Invisible <br />
                        <span className="text-blue-500">Infrastructure</span>
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base font-mono uppercase tracking-[0.2em] max-w-sm ml-auto">
                        Technology that stays out of your way. No paper, no queues, no stress.
                    </p>
                </motion.div>
            </Section>

            <div className="h-[50vh]" />

            {/* 35% - 55%: Smart Admission */}
            <Section align="left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left"
                >
                    <p className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Phase 01: Admission</p>
                    <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter mb-12 text-white leading-tight">
                        ANPR & <br />
                        <span className="text-blue-500">FASTag Entry</span>
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs uppercase tracking-widest">
                            <span className="w-12 h-[1px] bg-blue-600" />
                            99.9% Recognition accuracy
                        </div>
                        <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs uppercase tracking-widest">
                            <span className="w-12 h-[1px] bg-blue-600" />
                            Under 2 Sec gate cycle
                        </div>
                    </div>
                </motion.div>
            </Section>

            <div className="h-[50vh]" />

            {/* 55% - 75%: Real-time Guidance */}
            <Section align="right">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Phase 02: Guidance</p>
                    <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter mb-12 text-white leading-tight">
                        AI Managed <br />
                        <span className="text-blue-500">Slot Routing</span>
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base font-mono uppercase tracking-[0.2em] max-w-sm ml-auto">
                        Real-time ultrasonic sensors guide you to the nearest available premium spot.
                    </p>
                </motion.div>
            </Section>

            <div className="h-[50vh]" />

            {/* 75% - 90%: Parked & EV */}
            <Section align="left">
                <div className="backdrop-blur-xl bg-blue-950/20 p-8 md:p-12 border border-blue-500/10 shadow-3xl rounded-[2rem] max-w-xl">
                    <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-6">Phase 03: The Spot</p>
                    <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-8 text-white leading-tight">
                        Secured & <br />
                        <span className="text-blue-500">EV Powered</span>
                    </h2>
                    <ul className="space-y-3 font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> 24/7 AI Video Analytics</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Integrated EV Charging</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Digital Valet Retrieval</li>
                    </ul>
                </div>
            </Section>

            <div className="h-[70vh]" />

            {/* 90% - 100%: Grande Finale */}
            <div className="h-screen w-screen flex flex-col items-center justify-center pointer-events-none sticky top-0 overflow-hidden px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="flex items-center gap-4 md:gap-6 mb-4">
                        <div className="h-[1px] w-12 md:w-24 bg-blue-600"></div>
                        <span className="text-blue-600 font-mono tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-xs uppercase">Automating Excellence</span>
                        <div className="h-[1px] w-12 md:w-24 bg-blue-600"></div>
                    </div>

                    <h1 className="text-7xl md:text-[14rem] font-serif italic tracking-tighter text-white leading-none">
                        Right <span className="text-white opacity-40 font-light block md:inline">PARKING</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-zinc-600 font-mono tracking-[0.2em] text-[10px] md:text-sm uppercase mt-6 md:mt-8"
                    >
                        India's Smartest Parking Network
                    </motion.p>
                </motion.div>
            </div>
        </div>
    )
}
