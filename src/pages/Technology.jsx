import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';

export const Technology = () => {
    return (
        <div className="bg-[var(--bg-dark)] min-h-screen text-[var(--text-main)] pt-32 transition-colors duration-300">
            <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24">

                {/* 2.1 Hero Section */}
                <div className="mb-32">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4"
                    >
                        Invisible Systems. Total Control.
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-display italic tracking-tighter-premium mb-12 text-gradient leading-tight py-4"
                    >
                        Technology.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-[var(--text-muted)] font-light max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-6"
                    >
                        Parking works best when you don’t notice it at all.<br />
                        Right Parking’s technology disappears from sight—while delivering full operational control behind the scenes.
                    </motion.p>
                </div>

                {/* 2.2 Our Technology Philosophy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-48">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display italic mb-6 leading-tight py-2">Automation by Design, <br /><span className="text-blue-500 inline-block pb-1">Not by Exception</span></h2>
                        <p className="text-[var(--text-muted)] mb-8 max-w-md leading-relaxed">
                            Every site runs on redundant automation + centralized intelligence. Our systems operate independently and scale across cities.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            "Operate independently",
                            "Scale across cities and asset types",
                            "Remain resilient in all conditions",
                            "Deliver real-time insights"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] flex items-center gap-4 group hover:border-blue-500/30 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-mono group-hover:bg-blue-500 group-hover:text-white transition-colors">0{i + 1}</div>
                                <span className="text-[var(--text-main)] font-mono text-xs uppercase tracking-widest">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2.3 Entry & Exit Systems */}
                <div className="mb-48">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-display italic mb-16 text-center leading-tight py-2"
                    >Three-Tier Framework for <span className="text-blue-500 inline-block pb-1">Zero Downtime</span></motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Tier 1: FASTag", role: "Primary Layer", desc: "Stop-free access. Real-time wallet verification. Instant session creation and closure.", color: "blue" },
                            { name: "Tier 2: ANPR", role: "Secondary Layer", desc: "AI-based number plate recognition. Works when FASTag is unreadable. Auto-verification.", color: "cyan" },
                            { name: "Tier 3: Manual", role: "Fail-Safe Layer", desc: "Rare edge cases only. Ensures zero shutdown. Fully logged digitally.", color: "emerald" }
                        ].map((tier, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                className="bg-[var(--surface)] p-8 rounded-[2rem] border border-[var(--border)] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${tier.color}-500/10 blur-[60px] group-hover:bg-${tier.color}-500/20 transition-colors`} />
                                <span className={`text-${tier.color}-500 font-mono text-xs tracking-widest uppercase mb-4 block`}>{tier.role}</span>
                                <h3 className="text-2xl font-display italic mb-4">{tier.name}</h3>
                                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{tier.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display italic mb-8 leading-tight py-2">Inside the ANPR Engine</h2>
                        <p className="text-[var(--text-muted)] mb-12 text-lg">Cameras That Don’t Just See — They Decide.</p>
                        <div className="space-y-8 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-[var(--border)]" />

                            {[
                                "Plate image captured",
                                "AI-OCR extracts data",
                                "Backend validation",
                                "Decision engine triggers barrier & billing"
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-6 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-[var(--bg-dark)] border border-blue-500/50 flex items-center justify-center text-blue-500 text-xs font-bold shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                                        {i + 1}
                                    </div>
                                    <p className="text-[var(--text-main)] font-mono text-sm uppercase tracking-wider">{step}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    {/* Visual representation */}
                    <div className="aspect-square bg-[var(--surface)] rounded-[3rem] border border-[var(--border)] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-500/5" />

                        {/* Scanning Animation */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute left-0 right-0 h-1 bg-blue-500/50 blur-sm shadow-[0_0_20px_#3b82f6]"
                        />

                        <div className="border border-[var(--border)] p-8 rounded-xl bg-[var(--surface)]/50 backdrop-blur-md">
                            <div className="font-mono text-2xl tracking-[0.2em] text-[var(--text-main)]">HR 26 DQ 5555</div>
                            <div className="mt-4 flex justify-between items-center text-[10px] font-mono uppercase text-green-500/80">
                                <span>Confidence: 99.8%</span>
                                <span>Access: GRANTED</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2.5 Smart Parking Bay Sensors & 2.6 Guidance */}
                <div className="mb-48 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[var(--surface)] p-12 rounded-[3rem] border border-[var(--border)]"
                    >
                        <h3 className="text-3xl font-display italic mb-6">Every Spot Knows Its Status</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="text-[var(--text-muted)]">✓ Detects vehicle presence</li>
                            <li className="text-[var(--text-muted)]">✓ Updates occupancy in real time</li>
                            <li className="text-[var(--text-muted)]">✓ Feeds dashboards, displays, and apps</li>
                        </ul>
                        <div className="flex gap-4">
                            <span className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border border-green-500/20">Accurate</span>
                            <span className="bg-blue-500/10 text-blue-500 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border border-blue-500/20">Fast</span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[var(--surface)] p-12 rounded-[3rem] border border-[var(--border)]"
                    >
                        <h3 className="text-3xl font-display italic mb-6">No Circling. No Guessing.</h3>
                        <p className="text-[var(--text-muted)] mb-8">LED vacancy displays, zone indicators, and in-app navigation working in harmony.</p>
                        <div className="bg-[var(--bg-dark)] p-6 rounded-2xl border border-[var(--border)] flex justify-between items-center">
                            <span className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest">Zone A Level 2</span>
                            <span className="text-green-500 font-mono text-4xl font-bold">14 <span className="text-xs font-normal text-[var(--text-muted)] align-middle">SPOTS</span></span>
                        </div>
                    </motion.div>
                </div>

                {/* 2.7 Centralized Dashboards */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-48 bg-gradient-to-br from-[var(--surface)] to-[var(--bg-dark)] p-12 md:p-24 rounded-[3rem] border border-[var(--border)] relative overflow-hidden"
                >
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4 block">Total Visibility</span>
                        <h2 className="text-4xl md:text-6xl font-display italic mb-12 leading-tight py-2">Real-Time Visibility Across Every Site</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                            {["Occupancy", "Entry Logs", "Revenue", "Health", "Violations"].map((metric, i) => (
                                <div key={i} className="flex flex-col items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                                    <span className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest">{metric}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 2.8 Digital Payments */}
                <div className="mb-48 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-display italic mb-12 leading-tight py-2"
                    >Frictionless Finance</motion.h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {["FASTag", "UPI", "Credit Cards", "Debit Cards"].map((pay, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-[var(--surface)] px-8 py-4 rounded-full border border-[var(--border)] text-[var(--text-main)] font-mono text-sm uppercase tracking-widest hover:bg-[var(--surface)]/80 hover:border-blue-500/50 transition-all"
                            >
                                {pay}
                            </motion.div>
                        ))}
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-8 text-[var(--text-muted)] font-light"
                    >Zero cash handling. Faster exits. Complete audit trails.</motion.p>
                </div>

                {/* 2.9 Security */}
                <div className="mb-48 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display italic mb-8 leading-tight py-2">Parking That Prevents Incidents</h2>
                        <p className="text-[var(--text-muted)] mb-8 max-w-md">AI analyzes live feeds, flags anomalies, and generates instant alerts.</p>
                        <ul className="space-y-4">
                            {[
                                "Loitering & suspicious behavior",
                                "Overspeeding & wrong-way driving",
                                "Falls & medical emergencies",
                                "Accidents & collisions"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-red-500/80 font-mono text-xs uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full" />
                        <div className="bg-[var(--bg-dark)] border border-red-500/20 rounded-2xl p-2 relative z-10">
                            {/* Mock Security Feed Interface */}
                            <div className="aspect-video bg-[var(--surface)] rounded-xl relative overflow-hidden flex items-center justify-center">
                                <span className="text-[var(--text-muted)] font-mono uppercase tracking-widest text-xs opacity-30">Video Feed Inactive</span>
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-red-500 text-white text-[8px] px-2 py-0.5 rounded uppercase font-bold animate-pulse">Live Alert</span>
                                    <span className="bg-zinc-800 text-zinc-400 text-[8px] px-2 py-0.5 rounded uppercase font-mono">Cam-04</span>
                                </div>
                                {/* Target box */}
                                <div className="absolute w-24 h-40 border-2 border-red-500/50 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="absolute -top-3 left-0 bg-red-500/80 text-white text-[8px] px-1">Wrong Way</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2.10 Built for Scale */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 border-t border-[var(--border)] pt-24 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-display italic mb-6 leading-tight py-2">Built for Scale</h2>
                    <p className="text-[var(--text-muted)] text-xl font-light mb-12">From a single site to city-wide deployments.</p>
                    <div className="flex justify-center gap-12 text-blue-500 font-mono text-xs uppercase tracking-widest">
                        <span>Modular</span>
                        <span>•</span>
                        <span>Cloud-Connected</span>
                        <span>•</span>
                        <span>Upgrade-Ready</span>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};
