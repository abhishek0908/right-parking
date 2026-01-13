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
        <div className="relative flex flex-col w-full text-white z-[999999] overflow-x-hidden">
            {/* Page 1: Hero */}
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
                        Ticketless. Manpowerless. Seamlessly Managed.
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="flex gap-4 items-center"
                >
                    <div className="h-[1px] w-12 md:w-24 bg-blue-600/30"></div>
                    <p className="text-[10px] md:text-sm font-mono tracking-[0.2em] uppercase text-zinc-600">
                        Smart Infrastructure for India's Growing Cities.
                    </p>
                </motion.div>
            </Section>

            {/* Page 2: Philosophy */}
            <Section align="right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-right"
                >
                    <p className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">The Philosophy</p>
                    <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter mb-12 text-white leading-tight">
                        Invisible Infrastructure <br />
                        That <span className="text-blue-500">Simply Works</span>
                    </h2>

                    <div className="flex flex-col items-end gap-6 border-r-2 border-blue-600/30 pr-8">
                        {[
                            "No tickets",
                            "No cash",
                            "Minimal manpower"
                        ].map((bullet, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex items-center gap-4 text-zinc-400 font-mono text-sm uppercase tracking-widest"
                            >
                                {bullet}
                                <span className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.6)]" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            <div className="h-screen w-screen" />
            <div className="h-screen w-screen" />

            {/* Page 3: The Proof - 5 Core Moments */}
            <Section align="right">
                <div className="backdrop-blur-xl bg-black/40 p-8 md:p-12 border border-white/10 shadow-3xl rounded-[2rem] max-w-2xl">
                    <p className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-10 text-right">The Proof</p>

                    <div className="space-y-10">
                        {[
                            { title: "Arrive", desc: "Ticketless Entry via FASTag / ANPR" },
                            { title: "Park", desc: "Real-Time Slot Detection & Guidance" },
                            { title: "Parked", desc: "Smart Detection & EV Charging Available" },
                            { title: "Pay", desc: "Automatic Billing. No Queues." },
                            { title: "Exit", desc: "Friction-Free Exit" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="flex flex-col items-end text-right group"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <h3 className="text-3xl md:text-4xl font-serif italic text-white group-hover:text-blue-500 transition-colors duration-500">{item.title}</h3>
                                    <span className="text-zinc-700 font-mono text-xs md:text-sm font-bold tracking-widest">{`0${i + 1}`}</span>
                                </div>
                                <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-widest uppercase border-r-2 border-zinc-800 pr-4 group-hover:border-blue-500 transition-colors duration-500">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Page 4: Spacer */}
            <div className="h-[50vh] md:h-screen flex items-center justify-center pointer-events-none">
                <h1 className="text-8xl md:text-[15rem] font-serif italic text-blue-900/5">LUXURY</h1>
            </div>

            <div className="h-screen w-screen" />
            <div className="h-screen w-screen" />

            {/* Page 5: Parked State */}
            <Section align="left">
                <div className="mt-20 md:mt-32">
                    <p className="text-[10px] font-mono mb-4 text-blue-500 tracking-widest uppercase">System Status</p>
                    <h2 className="text-5xl md:text-7xl font-sans font-thin text-white mb-2 leading-none">
                        Locked
                    </h2>
                    <h2 className="text-5xl md:text-7xl font-serif italic text-zinc-500 mb-8 md:mb-12 leading-none">
                        & Secured
                    </h2>

                    <button className="w-full md:w-auto border border-white/20 bg-white text-black hover:bg-blue-600 hover:text-white hover:border-blue-600 px-8 md:px-12 py-4 uppercase tracking-widest font-mono text-[10px] md:text-xs transition-all shadow-lg pointer-events-auto">
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
                        <div className="h-[1px] w-12 md:w-24 bg-blue-600"></div>
                        <span className="text-blue-600 font-mono tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-xs uppercase">The Final Destination</span>
                        <div className="h-[1px] w-12 md:w-24 bg-blue-600"></div>
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
        </div>
    )
}
