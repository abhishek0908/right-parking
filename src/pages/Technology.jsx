import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Footer } from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export const Technology = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".technology-panel");

        panels.forEach((panel, i) => {
            const isLast = i === panels.length - 1;

            ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: isLast,
                snap: isLast ? null : 1,
            });
        });

        // Animate content within panels
        panels.forEach((panel, i) => {
            const elements = panel.querySelectorAll(".panel-content > *");
            gsap.fromTo(elements,
                { opacity: 0, y: 30, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 60%",
                        end: "top 10%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-[var(--bg-dark)] text-[var(--text-main)] overflow-x-hidden transition-colors duration-300">
            {/* Scroll Progress Indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 transition-all duration-300"
                    />
                ))}
            </div>

            <main>
                {/* 2.1 Hero Section - Panel 0 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center relative overflow-hidden z-[1]">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/technology-car.png"
                            alt="Technology Car Background"
                            className="w-full h-full object-cover opacity-60 -scale-x-100"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-dark)]/80 via-[var(--bg-dark)]/20 to-transparent" />
                    </div>

                    <div className="max-w-7xl w-full panel-content relative z-10 px-6 md:px-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-blue-500 font-mono text-sm tracking-[0.4em] uppercase mb-6"
                        >
                            Invisible Systems. Total Control.
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-9xl font-display italic tracking-tighter-premium mb-8 leading-tight text-gradient py-4"
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

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.4, 1] }}
                            transition={{
                                delay: 1,
                                duration: 2,
                                times: [0, 0.2, 0.5, 1],
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bottom-[-12rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-blue-500/50"
                        >
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll for Core Tech</span>
                            <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                        </motion.div>
                    </div>
                </section>

                {/* 2.2 Our Technology Philosophy - Panel 1 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[2] bg-[#0a0a0c]">
                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center panel-content">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-display italic mb-6 leading-tight py-2 uppercase tracking-tighter">Automation <br /><span className="text-blue-500 inline-block pb-1">by Design</span></h2>
                            <p className="text-[var(--text-muted)] mb-8 text-xl font-light leading-relaxed">
                                Every site runs on redundant automation + centralized intelligence. Our systems operate independently and scale across cities.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                "Operate independently",
                                "Scale across cities and asset types",
                                "Remain resilient in all conditions",
                                "Deliver real-time insights"
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] flex items-center gap-6 group hover:border-blue-500/30 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-sm font-bold group-hover:bg-blue-500 group-hover:text-white transition-colors">0{i + 1}</div>
                                    <span className="text-[var(--text-main)] font-mono text-xs uppercase tracking-widest leading-loose">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2.3 Framework - Panel 2 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[3] bg-[#0c0c0e]">
                    <div className="max-w-7xl w-full panel-content">
                        <h2 className="text-3xl md:text-6xl font-display italic mb-16 text-center leading-tight py-2 uppercase tracking-tighter">Zero Downtime <span className="text-blue-500">Framework</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Tier 1: FASTag", role: "Primary Layer", desc: "Stop-free access. Real-time wallet verification. Instant session creation and closure.", color: "blue" },
                                { name: "Tier 2: ANPR", role: "Secondary Layer", desc: "AI-based number plate recognition. Works when FASTag is unreadable. Auto-verification.", color: "cyan" },
                                { name: "Tier 3: Manual", role: "Fail-Safe Layer", desc: "Rare edge cases only. Ensures zero shutdown. Fully logged digitally.", color: "emerald" }
                            ].map((tier, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--surface)] p-10 rounded-[3rem] border border-[var(--border)] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 h-full"
                                >
                                    <div className={`absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors`} />
                                    <span className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-6 block">{tier.role}</span>
                                    <h3 className="text-3xl font-display italic mb-6">{tier.name}</h3>
                                    <p className="text-[var(--text-muted)] text-lg font-light leading-relaxed">{tier.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2.4 ANPR Engine - Panel 3 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[4] bg-[#0e0e11]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center panel-content">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-display italic mb-8 leading-tight py-2 uppercase tracking-tighter">Cameras That <span className="text-blue-500">Decide</span></h2>
                            <p className="text-[var(--text-muted)] mb-12 text-xl font-light">Inside the AI-OCR ANPR Engine.</p>
                            <div className="space-y-10 relative">
                                <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-blue-500/20" />
                                {[
                                    "Plate image captured",
                                    "AI-OCR extracts data",
                                    "Backend validation",
                                    "Decision engine triggers barrier & billing"
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-8 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-[var(--bg-dark)] border border-blue-500/50 flex items-center justify-center text-blue-500 text-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                                            {i + 1}
                                        </div>
                                        <p className="text-[var(--text-main)] font-mono text-xs uppercase tracking-[0.2em]">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="aspect-square bg-[var(--surface)] rounded-[4rem] border border-[var(--border)] relative overflow-hidden flex items-center justify-center shadow-2xl">
                            <div className="absolute inset-0 bg-blue-500/5" />
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="absolute left-0 right-0 h-1 bg-blue-500/50 blur-sm shadow-[0_0_20px_#3b82f6]"
                            />
                            <div className="border border-white/10 p-12 rounded-3xl bg-black/40 backdrop-blur-2xl">
                                <div className="font-mono text-3xl md:text-4xl tracking-[0.3em] text-white">HR 26 DQ 5555</div>
                                <div className="mt-6 flex justify-between items-center text-[10px] font-mono uppercase text-green-400">
                                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" /> Confidence: 99.8%</span>
                                    <span>Access: GRANTED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2.5 Sensors & Guidance - Panel 4 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[5] bg-[#111114]">
                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 panel-content">
                        <div className="bg-[var(--surface)] p-16 rounded-[4rem] border border-[var(--border)] group hover:border-blue-500/30 transition-all shadow-2xl">
                            <h3 className="text-4xl font-display italic mb-8">Every Spot Knows <br />Its Status</h3>
                            <ul className="space-y-6 mb-12">
                                {["Detects vehicle presence", "Updates occupancy in real time", "Feeds dashboards & user apps"].map((li, i) => (
                                    <li key={i} className="text-xl text-[var(--text-muted)] font-light flex items-center gap-4">
                                        <span className="text-blue-500">✓</span> {li}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-4">
                                <span className="bg-green-500/10 text-green-500 px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] border border-green-500/20">Accurate</span>
                                <span className="bg-blue-500/10 text-blue-500 px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] border border-blue-500/20">Real-Time</span>
                            </div>
                        </div>
                        <div className="bg-[var(--surface)] p-16 rounded-[4rem] border border-[var(--border)] group hover:border-blue-500/30 transition-all shadow-2xl flex flex-col justify-center">
                            <h3 className="text-4xl font-display italic mb-8">No Circling. <br />No Guessing.</h3>
                            <p className="text-[var(--text-muted)] mb-12 text-xl font-light">LED vacancy displays, zone indicators, and in-app navigation working in absolute harmony.</p>
                            <div className="bg-black/40 p-10 rounded-3xl border border-white/5 flex justify-between items-center group-hover:border-blue-500/20 transition-all">
                                <span className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-[0.3em]">Zone A Level 2</span>
                                <span className="text-green-500 font-mono text-6xl font-bold">14 <span className="text-xs font-normal text-[var(--text-muted)] align-middle">SPOTS</span></span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2.7 Visibility - Panel 5 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[6] bg-[#141417]">
                    <div className="max-w-7xl w-full panel-content">
                        <div className="bg-gradient-to-br from-[#1a1a1e] to-[var(--bg-dark)] p-20 md:p-32 rounded-[5rem] border border-white/5 relative overflow-hidden shadow-2xl text-center">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[120px]" />
                            <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-8 block relative z-10">Total Visibility</span>
                            <h2 className="text-4xl md:text-7xl font-display italic mb-16 leading-tight py-2 uppercase tracking-tighter relative z-10">Real-Time Dashboards Across Every Site</h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 text-center relative z-10">
                                {["Occupancy", "Entry Logs", "Revenue", "Health", "Violations"].map((metric, i) => (
                                    <div key={i} className="flex flex-col items-center gap-4 group">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_#22c55e]" />
                                        <span className="text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">{metric}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2.8 Digital Payments - Panel 6 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[7] bg-[#16161a]">
                    <div className="max-w-7xl w-full text-center panel-content">
                        <h2 className="text-4xl md:text-7xl font-display italic mb-16 leading-tight py-2 uppercase tracking-tighter">Frictionless <span className="text-blue-500">Finance</span></h2>
                        <div className="flex flex-wrap justify-center gap-6 mb-16">
                            {["FASTag", "UPI", "Credit Cards", "Debit Cards"].map((pay, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--surface)] px-12 py-6 rounded-full border border-[var(--border)] text-[var(--text-main)] font-mono text-sm uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-default shadow-xl"
                                >
                                    {pay}
                                </div>
                            ))}
                        </div>
                        <p className="text-2xl md:text-3xl text-[var(--text-muted)] font-light max-w-4xl mx-auto border-t border-white/5 pt-12">
                            Zero cash handling. Faster exits. <br />
                            <span className="text-blue-500 font-display italic">Complete digital audit trails.</span>
                        </p>
                    </div>
                </section>

                {/* 2.9 Security - Panel 7 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[8] bg-[#18181d]">
                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center panel-content">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-display italic mb-10 leading-tight py-2 uppercase tracking-tighter">Parking That <span className="text-red-500">Protects</span></h2>
                            <p className="text-[var(--text-muted)] mb-12 text-xl font-light leading-relaxed border-l-2 border-red-500/20 pl-8">
                                AI analyzes live feeds, flags anomalies, and generates instant alerts before incidents escalate.
                            </p>
                            <ul className="space-y-6">
                                {[
                                    "Loitering detection",
                                    "Wrong-way driving alerts",
                                    "Fall & Emergency detection",
                                    "Collision analysis"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-6 text-red-500/80 font-mono text-xs uppercase tracking-[0.2em] group">
                                        <div className="w-2 h-2 bg-red-500 rounded-full group-hover:animate-ping" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/10 blur-[150px] rounded-full" />
                            <div className="bg-black/50 border border-red-500/30 rounded-[3rem] p-4 relative z-10 shadow-3xl">
                                <div className="aspect-video bg-[#09090b] rounded-[2rem] relative overflow-hidden flex items-center justify-center border border-white/10">
                                    <span className="text-white/10 font-mono uppercase tracking-[0.5em] text-[10px]">Processing Feed...</span>
                                    <div className="absolute top-6 left-6 flex gap-3">
                                        <span className="bg-red-600 text-white text-[9px] px-3 py-1 rounded-full uppercase font-black animate-pulse">Live Alert</span>
                                        <span className="bg-zinc-800 text-zinc-400 text-[9px] px-3 py-1 rounded-full uppercase font-mono">Camera-04</span>
                                    </div>
                                    <div className="absolute w-32 h-48 border-2 border-red-500/40 rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                        <div className="absolute -top-4 left-4 bg-red-600 text-white text-[8px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest whitespace-nowrap">Wrong Way Identified</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2.10 Built for Scale - Panel 8 */}
                <section className="technology-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[9] bg-black">
                    <div className="max-w-7xl w-full text-center panel-content">
                        <h2 className="text-5xl md:text-9xl font-display italic mb-10 leading-tight py-4 uppercase tracking-tighter">Built for <span className="text-blue-500">Scale</span></h2>
                        <p className="text-[var(--text-muted)] text-2xl md:text-3xl font-light mb-16 max-w-4xl mx-auto">From a single site to city-wide deployments. Reliable. Resilient. Ready.</p>

                        <div className="flex justify-center flex-wrap gap-12 text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-20 opacity-70">
                            <span>Modular Architecture</span>
                            <span className="opacity-30">•</span>
                            <span>Cloud Connected</span>
                            <span className="opacity-30">•</span>
                            <span>Future Proof</span>
                        </div>

                        <Link
                            to="/services"
                            className="inline-flex items-center gap-6 bg-white text-black px-16 py-8 rounded-full font-display italic font-bold hover:bg-blue-600 hover:text-white hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-xl"
                        >
                            Explore Our Solutions <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </section>

                {/* Footer Section */}
                <div className="bg-black relative z-[10]">
                    <Footer />
                </div>
            </main>
        </div>
    );
};
