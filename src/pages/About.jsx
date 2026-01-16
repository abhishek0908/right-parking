import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';

export const About = () => {
    return (
        <div className="bg-[var(--bg-dark)] min-h-screen text-[var(--text-main)] pt-32 transition-colors duration-300">
            <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                {/* 1.1 Hero Section */}
                <div className="mb-32">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4"
                    >
                        Reimagining Parking in India
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-display italic tracking-tighter-premium mb-8 leading-tight text-gradient py-4"
                    >
                        Building India’s <br />
                        Future of <span className="text-blue-500 font-display inline-block pb-2">Parking</span>
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl text-[var(--text-muted)] font-light tracking-wide mb-12"
                    >
                        Ticketless. Manpowerless. Seamlessly Managed.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-[var(--text-muted)] font-light max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-6"
                    >
                        Right Parking is transforming how India parks by building intelligent, automated parking infrastructure that operates without tickets, without cash, and without friction.
                    </motion.p>
                </div>

                {/* 1.2 About Right Parking */}
                <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display italic mb-6 leading-tight py-2">Invisible Infrastructure That <span className="text-blue-500 inline-block pb-1">Simply Works</span></h2>
                        <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                            Right Parking replaces outdated parking systems with self-operating infrastructure.
                            Just seamless entry, guided parking, automatic billing, and real-time control.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[var(--surface)] p-8 rounded-[2rem] border border-[var(--border)]"
                    >
                        <ul className="space-y-4">
                            {["No paper tickets", "No manual cash collection", "Minimal on-ground manpower"].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-[var(--text-main)] font-mono text-sm uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-8 border-t border-[var(--border)]">
                            <p className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest mb-2">Our Core Promise</p>
                            <p className="text-xl italic font-display">We don’t just manage parking. We build self-operating ecosystems that run silently in the background.</p>
                        </div>
                    </motion.div>
                </div>

                {/* 1.3 The Problem */}
                <div className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-display italic mb-4">India’s Parking Challenge</h2>
                        <p className="text-[var(--text-muted)]">Parking is treated as an afterthought—yet it directly impacts traffic flow, safety, and city efficiency.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            "Congested entry & exit points",
                            "Cash leakage and manual errors",
                            "Poor visibility into occupancy",
                            "High manpower dependency",
                            "Frustrating driver experiences"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl"
                            >
                                <span className="block text-red-500/50 font-mono text-xs mb-2">0{i + 1}</span>
                                <p className="text-[var(--text-muted)]">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 1.4 The Right Parking Way */}
                <div className="mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-display italic mb-16 text-center"
                    >From Entry to Exit — <span className="text-blue-500">Without Friction</span></motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "Arrive", title: "Identification", desc: "Your vehicle is identified instantly through FASTag or number plate recognition." },
                            { step: "Park", title: "Guidance", desc: "Smart sensors detect vacant bays and guide you to the nearest available spot." },
                            { step: "Pay", title: "Auto-Billing", desc: "Billing happens automatically—via FASTag, UPI, or card. No queues. No cash." },
                            { step: "Exit", title: "Seamless", desc: "Your session closes seamlessly and the barrier opens automatically." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="relative pt-8 border-t border-blue-500/20"
                            >
                                <span className="absolute top-0 left-0 -translate-y-1/2 w-4 h-4 bg-[var(--bg-dark)] border-2 border-blue-500 rounded-full" />
                                <h3 className="text-xl font-display italic mb-2">{item.step}</h3>
                                <p className="text-[var(--text-muted)] font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-4">{item.title}</p>
                                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 1.5 Presence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 bg-[var(--surface)] rounded-[3rem] p-12 text-center border border-[var(--border)] relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-blue-600/5 blur-[100px]" />
                    <h2 className="text-3xl md:text-5xl font-display italic mb-6 relative z-10">Proven on Ground</h2>
                    <p className="text-[var(--text-muted)] max-w-2xl mx-auto mb-12 relative z-10">
                        Right Parking actively operates infrastructure across Public parking zones, Commercial complexes, and Urban assets.
                        Cities trust us with their most overlooked yet critical infrastructure.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {[
                            { label: "Cities", val: "12+" },
                            { label: "Active Sites", val: "50+" },
                            { label: "Parking Bays", val: "10,000+" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-5xl md:text-7xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-main)] to-[var(--text-muted)] mb-2">{stat.val}</div>
                                <div className="text-blue-500 font-mono text-xs tracking-widest uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 1.6 Facilities */}
                <div className="mb-32">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-display italic mb-12"
                    >Facilities & Amenities</motion.h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            "Automated Barriers", "FASTag Integration", "Smart Sensors", "Wayfinding Displays",
                            "EV Charging", "CCTV Surveillance", "Reserved Parking", "Digital Payments", "Emergency Support"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center gap-3 hover:bg-[var(--surface)]/80 transition-colors"
                            >
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                <span className="text-sm text-[var(--text-muted)] font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 1.7 End-to-End Ownership */}
                <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 bg-blue-900/10 p-12 rounded-[2rem] border border-blue-500/20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display italic mb-6 text-[var(--text-main)]">From Empty Land to Smart Asset</h2>
                        <ul className="space-y-4 text-[var(--text-muted)]">
                            {["Site assessment & design", "Complete technology installation", "Operations & maintenance", "Revenue management & reporting"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="text-blue-500">✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-blue-600 p-8 rounded-2xl text-white"
                    >
                        <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Zero CapEx for Partners</h3>
                        <p className="mb-6 opacity-90">All technology and system costs are borne by Right Parking.</p>
                        <div className="pt-6 border-t border-white/20">
                            <p className="text-xs uppercase tracking-widest mb-2 opacity-75">Partners earn through:</p>
                            <div className="flex gap-4 font-display italic text-lg">
                                <span>Rent Models</span>
                                <span>•</span>
                                <span>Revenue Share</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 1.8 Who We Serve */}
                <div className="mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-display italic mb-12"
                    >Who We Serve</motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { t: "Urban Bodies", d: "Turning public parking into transparent, revenue-generating assets." },
                            { t: "Real Estate", d: "Enhancing footfall, visitor experience, and monetization." },
                            { t: "Everyday Drivers", d: "Making parking predictable, cashless, and stress-free." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="bg-[var(--surface)] border border-[var(--border)] p-8 rounded-3xl hover:border-blue-500/50 transition-colors group"
                            >
                                <h3 className="text-2xl font-display italic mb-4 group-hover:text-blue-500 transition-colors">{item.t}</h3>
                                <p className="text-[var(--text-muted)] leading-relaxed">{item.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 1.9 App Section */}
                <div className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4 block">The Right Parking App</span>
                        <h2 className="text-4xl md:text-6xl font-display italic mb-6 leading-tight py-2">Your Spot Is Waiting</h2>
                        <ul className="space-y-4 mb-8">
                            {["Pre-book parking", "Enter without stopping", "Get live slot guidance", "Pay automatically"].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-[var(--text-muted)]">
                                    <div className="w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center text-blue-500 text-xs font-bold">{i + 1}</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xl italic [var(--text-muted)] opacity-50">Parking becomes part of the journey—not a disruption.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[var(--surface)] rounded-[3rem] aspect-square flex items-center justify-center border border-[var(--border)] relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-blue-500/20 blur-[100px]" />
                        <div className="text-center relative z-10">
                            <span className="text-6xl">📱</span>
                            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">App Interface Preview</p>
                        </div>
                    </motion.div>
                </div>

                {/* CEO Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-48 bg-[var(--surface)] p-8 md:p-16 rounded-[3rem] border border-[var(--border)]">
                    {/* Image Column */}
                    <div className="relative flex justify-center lg:justify-start">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-full max-w-md"
                        >
                            <div className="absolute inset-0 bg-blue-600/20 blur-[80px] rounded-full -z-10" />
                            <img
                                src="/assets/kumar-ceo.png"
                                alt="Kumar - CEO of Right Parking"
                                className="w-full h-auto rounded-[2rem] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-[var(--border)]"
                            />
                        </motion.div>
                    </div>

                    {/* Text Column */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <h2 className="text-4xl md:text-6xl font-sans font-black text-[var(--text-main)] leading-[0.9] tracking-tighter mb-4">
                                MEET<br />
                                THE CEO<br />
                                <span className="text-blue-500">&</span> FOUNDER
                            </h2>
                            <div className="flex flex-col">
                                <span className="text-3xl md:text-5xl font-display italic tracking-tighter text-blue-500 leading-tight py-2 inline-block">RIGHT</span>
                                <span className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-[var(--text-main)]">PARKING</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[var(--text-muted)] font-light text-sm md:text-lg leading-relaxed space-y-6 border-l border-blue-500/30 pl-8"
                        >
                            <p>
                                Kumar is the <span className="text-[var(--text-main)] font-medium">visionary founder</span> and CEO of Right Parking, driven by a passion for revolutionizing urban mobility through innovative parking solutions.
                            </p>
                            <p>
                                With a background in <span className="text-[var(--text-main)] font-medium">technology</span> and a keen understanding of urban challenges, Kumar founded Right Parking to address the growing need for efficient and secure parking options in cities.
                            </p>
                            <p>
                                Under Kumar's leadership, Right Parking has grown from a <span className="text-[var(--text-main)] font-medium">concept</span> to a leading provider of digital parking solutions, offering <span className="text-[var(--text-main)] font-medium">seamless booking experiences</span>, advanced security systems, and automated payment solutions.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Legacy & Future */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-48 border-t border-[var(--border)] pt-24 text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-display italic mb-8 leading-tight py-4">Forward Thinking.</h2>
                    <p className="text-[var(--text-muted)] font-mono tracking-widest uppercase">Since 2024 — Building for 2050.</p>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};
