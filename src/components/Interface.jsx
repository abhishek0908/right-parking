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
            {/* Section 1: Hero */}
            <Section align="left">
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-6xl md:text-8xl font-display italic tracking-tighter mb-4 text-white leading-[0.9]"
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

            <div className="h-[80vh]" />

            {/* Section 2: The Vision */}
            <Section align="right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">The Vision</p>
                    <h2 className="text-4xl md:text-7xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        Invisible <br />
                        <span className="text-blue-500">Infrastructure</span>
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base font-mono uppercase tracking-[0.2em] max-w-sm ml-auto">
                        Technology that stays out of your way. No paper, no queues, no stress.
                    </p>
                </motion.div>
            </Section>

            <div className="h-[80vh]" />

            {/* Section 3: Smart Entry */}
            <Section align="left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left"
                >
                    <p className="text-emerald-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Phase 01</p>
                    <h2 className="text-4xl md:text-7xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        ANPR & <br />
                        <span className="text-emerald-500">FASTag Entry</span>
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs uppercase tracking-widest">
                            <span className="w-10 h-[1px] bg-emerald-600" />
                            99.9% Recognition Accuracy
                        </div>
                        <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs uppercase tracking-widest">
                            <span className="w-10 h-[1px] bg-emerald-600" />
                            Under 2 Second Gate Cycle
                        </div>
                    </div>
                </motion.div>
            </Section>

            <div className="h-[80vh]" />

            {/* Section 4: Real-time Stats */}
            <Section align="right">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-orange-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Live Data</p>
                    <h2 className="text-4xl md:text-6xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        Real-Time <br />
                        <span className="text-orange-500">Analytics</span>
                    </h2>
                    <div className="flex gap-8 justify-end">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-white">24/7</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Monitoring</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-orange-500">98%</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Uptime</div>
                        </div>
                    </div>
                </motion.div>
            </Section>

            <div className="h-[80vh]" />

            {/* Section 5: AI Guidance */}
            <Section align="left">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-left"
                >
                    <p className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Phase 02</p>
                    <h2 className="text-4xl md:text-7xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        AI Managed <br />
                        <span className="text-cyan-500">Slot Routing</span>
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base font-mono uppercase tracking-[0.2em] max-w-md">
                        Ultrasonic sensors guide you to the nearest available premium spot in real-time.
                    </p>
                </motion.div>
            </Section>

            <div className="h-[80vh]" />

            {/* Section 6: Floor Info */}
            <Section align="right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-purple-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Smart Display</p>
                    <h2 className="text-4xl md:text-6xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        Floor-wise <br />
                        <span className="text-purple-500">Availability</span>
                    </h2>
                    <div className="space-y-2 text-left ml-auto max-w-xs">
                        <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg">
                            <span className="text-white font-mono text-sm">Floor 01</span>
                            <span className="text-emerald-400 font-mono text-sm font-bold">45 FREE</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg">
                            <span className="text-white font-mono text-sm">Floor 02</span>
                            <span className="text-orange-400 font-mono text-sm font-bold">11 FREE</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg">
                            <span className="text-white font-mono text-sm">Floor 03</span>
                            <span className="text-red-400 font-mono text-sm font-bold">FULL</span>
                        </div>
                    </div>
                </motion.div>
            </Section>

            <div className="h-[80vh]" />

            {/* Section 7: EV Charging */}
            <Section align="left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-green-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">EV Ready</p>
                    <h2 className="text-4xl md:text-7xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        Integrated <br />
                        <span className="text-green-500">EV Charging</span>
                    </h2>
                    <div className="flex gap-6">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                            <div className="text-2xl font-black text-green-500">22kW</div>
                            <div className="text-[10px] text-zinc-500 uppercase">AC Charger</div>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                            <div className="text-2xl font-black text-green-500">150kW</div>
                            <div className="text-[10px] text-zinc-500 uppercase">DC Fast</div>
                        </div>
                    </div>
                </motion.div>
            </Section>

            <div className="h-[80vh]" />

            {/* Section 8: Security */}
            <Section align="right">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-red-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Phase 03</p>
                    <h2 className="text-4xl md:text-7xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        Secured & <br />
                        <span className="text-red-500">Monitored</span>
                    </h2>
                    <ul className="space-y-2 font-mono text-xs text-zinc-400 uppercase tracking-widest text-right">
                        <li className="flex items-center justify-end gap-3">24/7 AI Video Analytics <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /></li>
                        <li className="flex items-center justify-end gap-3">Intrusion Detection <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /></li>
                        <li className="flex items-center justify-end gap-3">Digital Valet Retrieval <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /></li>
                    </ul>
                </motion.div>
            </Section>

            <div className="h-[80vh]" />

            {/* Section 9: Payment */}
            <Section align="left">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-yellow-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Checkout</p>
                    <h2 className="text-4xl md:text-6xl font-display italic tracking-tighter mb-8 text-white leading-tight">
                        Cashless <br />
                        <span className="text-yellow-500">Exit</span>
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-zinc-300">UPI</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-zinc-300">FASTag</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-zinc-300">Card</span>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-zinc-300">Wallet</span>
                    </div>
                </motion.div>
            </Section>

            <div className="h-[100vh]" />

            {/* Section 10: Grande Finale */}
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

                    <h1 className="text-7xl md:text-[14rem] font-display italic tracking-tighter text-white leading-none">
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
