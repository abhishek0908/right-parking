import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
    Cpu,
    Layout,
    Zap,
    Search,
    Smile,
    Share2,
    Users,
    Briefcase,
    TrendingUp,
    ShieldCheck,
    Leaf,
    Target,
    Lightbulb,
    Handshake,
    Award,
    Scale,
    MessageSquare,
    CheckCircle,
    Eye,
    FileText,
    Star
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".about-panel");

        panels.forEach((panel, i) => {
            const isCeoSection = i === 1;

            // TRACK ACTIVE PANEL FOR DOT INDICATORS
            ScrollTrigger.create({
                trigger: panel,
                scroller: containerRef.current, // Tell GSAP to watch this specific div
                start: "top center",
                end: "bottom center",
                onToggle: (self) => self.isActive && setActiveIndex(i),
            });

            if (isCeoSection) {
                const heading = panel.querySelector(".ceo-heading-col");
                const bio = panel.querySelector(".ceo-bio-col");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        scroller: containerRef.current,
                        start: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                });

                tl.fromTo([heading, bio],
                    { opacity: 0, y: 30, filter: "blur(5px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.1, ease: "power2.out" }
                );
            } else {
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
                            scroller: containerRef.current,
                            start: "top 95%",
                            end: "bottom 5%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            }
        });

        // FORCE SNAP TO PANELS
        ScrollTrigger.create({
            scroller: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            snap: {
                snapTo: 1 / (panels.length - 1),
                duration: { min: 0.2, max: 0.5 },
                delay: 0,
                ease: "power2.inOut"
            }
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'auto' }}
            className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-[var(--bg-dark)] text-[var(--text-main)] overflow-x-hidden scrollbar-hide"
        >
            {/* Scroll Progress Indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
                {[...Array(13)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 border ${activeIndex === i
                            ? "bg-blue-500 scale-150 border-blue-500 shadow-[0_0_8px_#3b82f6]"
                            : "bg-blue-500/20 border-blue-500/40"
                            }`}
                    />
                ))}
            </div>

            <main className="w-full">
                {/* 1.1 Hero Section - Panel 0 */}
                <section className="about-panel h-screen w-full flex items-center justify-center snap-start snap-always bg-[var(--bg-dark)] relative px-6 md:px-12">
                    <div className="max-w-7xl w-full panel-content px-5 md:px-10 pt-28 md:pt-32 pb-12 md:pb-16">
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-blue-500 font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6">Reimagining Parking in India</motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display italic tracking-tighter-premium mb-4 md:mb-8 leading-[1.1] md:leading-tight text-gradient py-2">
                            Building India’s <br /> Future of <span className="text-blue-500 font-display inline-block pb-1 md:pb-2">Parking</span>
                        </motion.h1>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xs md:text-lg lg:text-xl text-[var(--text-muted)] font-light tracking-wide mb-6 md:mb-8">Ticketless. Manpowerless. Seamlessly Managed.</motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[10px] md:text-sm lg:text-base text-[var(--text-muted)] font-light max-w-xl md:max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-4 md:pl-6 mb-8 sm:mb-12">
                            Right Parking is transforming how India parks by building intelligent, automated parking infrastructure that operates without tickets, without cash, and without friction.
                        </motion.p>
                    </div>

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
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-blue-500/50 z-20"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll for Vision</span>
                        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                    </motion.div>
                </section>

                {/* 1.1b CEO Section - Panel 1 */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center relative overflow-hidden px-6 md:px-12">
                    <div className="absolute inset-0 z-0 ceo-bg-container">
                        <img src="/assets/kumar-ceo.jpeg" className="w-full h-full object-cover opacity-100 object-left-top contrast-[1.1] brightness-[0.8]" alt="CEO Background" />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#17171a] via-transparent to-transparent" />
                    </div>
                    <div className="max-w-[100rem] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center panel-content relative z-10 px-5 md:px-10 pt-28 md:pt-32 pb-10">
                        <div className="lg:col-span-4 space-y-4 sm:space-y-6 ceo-heading-col">
                            <div className="flex flex-col">
                                <span className="text-blue-500 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-2">Founder's Vision</span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-black text-white leading-[0.85] tracking-tighter mb-4 uppercase">
                                    MEET<br />THE <span className="text-blue-500">CEO</span><br /><span className="text-blue-500">&</span> FOUNDER
                                </h2>
                                <div className="flex flex-col group">
                                    <span className="text-lg sm:text-2xl md:text-3xl font-display italic tracking-tighter text-blue-500 py-1 inline-block">RIGHT</span>
                                    <span className="text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tighter text-white">PARKING</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 ceo-bio-col mt-4 lg:mt-0">
                            <div className="text-[var(--text-muted)] font-light text-[10px] md:text-sm lg:text-base leading-relaxed space-y-3 md:space-y-4 text-left lg:ml-auto max-w-xl">
                                <p className="text-white/90">Kumar is the <span className="text-blue-500 font-medium whitespace-nowrap">visionary founder</span> and CEO of Right Parking, driven by a passion for revolutionizing urban mobility through innovative parking solutions.</p>
                                <p>With a background in <span className="text-white font-medium">technology</span> and a keen understanding of urban challenges, Kumar founded Right Parking to address the growing need for efficient and secure parking options in cities.</p>
                                <p>Under Kumar's leadership, Right Parking has grown from a <span className="text-white font-medium">concept</span> to a leading provider of digital parking solutions.</p>
                                <div className="pt-4 md:pt-6 border-t border-white/10">
                                    <p className="italic text-blue-400 text-sm md:text-lg lg:text-xl font-display leading-tight">"Parking isn't just about slots. It's about time, safety, and the seamless flow of a city's lifeblood."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.1c Vision & Mission - Panel 2 */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center relative bg-[#09090b] overflow-hidden px-6 md:px-12">
                    <div className="max-w-7xl w-full panel-content px-5 md:px-10 pt-28 md:pt-32 pb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display italic tracking-tighter-premium text-white leading-tight uppercase">
                                    Vision & <br /><span className="text-blue-500">Mission</span>
                                </h2>
                            </div>
                            <div className="hidden sm:block">
                                <img src="/logo.svg" alt="RightParking" className="h-8 md:h-12 w-auto opacity-80" />
                            </div>
                        </div>

                        {/* Customer Promise Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-8">
                            {[
                                { title: "Seamless Digital Experience", icon: Layout },
                                { title: "Maximized Convenience", icon: Zap },
                                { title: "Transparency", icon: Eye },
                                { title: "Customer Delight", icon: Smile }
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex items-center gap-2 md:gap-4 transition-transform hover:scale-105">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <item.icon className="w-4 h-4 md:w-6 md:h-6" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-black font-bold text-[10px] md:text-[14px] leading-tight flex-1">{item.title}</span>
                                </div>
                            ))}
                            <div className="col-span-2 md:col-span-4 lg:col-span-1 bg-blue-700/90 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-5 flex items-center justify-center text-center transition-transform hover:scale-105 border border-blue-500/30">
                                <span className="text-white font-display italic font-bold text-[10px] md:text-xs lg:text-sm uppercase tracking-widest">Customer Promise</span>
                            </div>
                        </div>

                        {/* Pillars Row */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-8 overflow-hidden">
                            <div className="hidden lg:flex items-center justify-center px-4 bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden min-w-[50px]">
                                <span className="[writing-mode:vertical-lr] rotate-180 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Pillars</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2 md:gap-3 flex-1">
                                {[
                                    { t: "Digital Integration", i: Share2 },
                                    { t: "Process Efficiency", i: Zap },
                                    { t: "Customer-Centric Marketing", i: Users },
                                    { t: "Value-Added Services", i: Briefcase },
                                    { t: "Revenue Optimization", i: TrendingUp },
                                    { t: "Compliance Risk", i: ShieldCheck },
                                    { t: "Sustainability", i: Leaf }
                                ].map((p, i) => (
                                    <div key={i} className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/20 rounded-xl md:rounded-2xl p-2 md:p-4 flex flex-col items-center justify-center text-center gap-2 transition-all hover:bg-blue-600/30 hover:border-blue-500/50 group">
                                        <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <p.i className="w-3 h-3 md:w-5 md:h-5" />
                                        </div>
                                        <span className="text-[8px] md:text-[10px] font-bold text-white/90 leading-tight uppercase tracking-tight">{p.t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Values Row */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="hidden lg:flex items-center justify-center px-4 bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden min-w-[50px]">
                                <span className="[writing-mode:vertical-lr] rotate-180 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Values</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2 md:gap-3 flex-1">
                                {[
                                    { t: "Customer Focus", i: Target },
                                    { t: "Innovation", i: Lightbulb },
                                    { t: "Integrity", i: Handshake },
                                    { t: "Quality", i: Award },
                                    { t: "Teamwork", i: Users },
                                    { t: "Opportunity", i: Scale },
                                    { t: "Communication", i: MessageSquare }
                                ].map((v, i) => (
                                    <div key={i} className="bg-blue-900/40 backdrop-blur-sm border border-blue-500/20 rounded-xl md:rounded-2xl p-2 md:p-4 flex flex-col items-center justify-center text-center gap-2 transition-all hover:bg-blue-900/60 hover:border-blue-500/50 group">
                                        <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <v.i className="w-3 h-3 md:w-5 md:h-5" />
                                        </div>
                                        <span className="text-[8px] md:text-[10px] font-bold text-white/90 leading-tight uppercase tracking-tight">{v.t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.2 About Right Parking - Panel 3 */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center bg-[#0a0a0c] px-6 md:px-12">
                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center panel-content px-5 md:px-10 pt-28 md:pt-32 pb-10">
                        <div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display italic mb-4 leading-tight py-2">Invisible Infrastructure That <span className="text-blue-500 inline-block pb-1">Simply Works</span></h2>
                            <p className="text-[var(--text-muted)] text-[10px] sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4">Right Parking replaces outdated parking systems with self-operating infrastructure. Just seamless entry, guided parking, automatic billing, and real-time control.</p>
                            <p className="text-[var(--text-muted)] text-[10px] sm:text-sm md:text-base lg:text-lg leading-relaxed mb-6 italic border-l border-blue-500/20 pl-4 max-w-lg">"We don’t just manage parking. We build self-operating ecosystems that run silently in the background."</p>
                            <div className="flex flex-wrap gap-2 md:gap-4">
                                <span className="text-blue-500 font-mono text-[8px] md:text-xs uppercase tracking-widest border border-blue-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full">Automation</span>
                                <span className="text-blue-500 font-mono text-[8px] md:text-xs uppercase tracking-widest border border-blue-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full">Intelligence</span>
                            </div>
                        </div>
                        <div className="bg-[var(--surface)] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-[var(--border)] relative overflow-hidden group shadow-2xl">
                            <ul className="space-y-3 relative z-10">
                                {["No paper tickets", "No manual cash collection", "Minimal on-ground manpower"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[var(--text-main)] font-mono text-[10px] sm:text-sm uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6] shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-[var(--border)] relative z-10">
                                <p className="text-[var(--text-muted)] font-mono text-[8px] sm:text-xs uppercase tracking-widest mb-1">Our Core Promise</p>
                                <p className="text-base sm:text-lg md:text-xl italic font-display">Invisible Infrastructure. Total Control.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.3 The Problem - Panel 4 */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center bg-[#0c0c0e] px-6 md:px-12">
                    <div className="max-w-7xl w-full panel-content px-5 md:px-10 pt-28 md:pt-32 pb-10">
                        <div className="mb-4 md:mb-6 text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-display italic mb-2">India’s Parking <span className="text-red-500">Challenge</span></h2>
                            <p className="text-xs md:text-base lg:text-lg mb-2 text-[var(--text-muted)] font-light">Parking is treated as an afterthought—yet it directly impacts traffic flow, safety, and city efficiency.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                            {["Congested entry & exit points", "Cash leakage and manual errors", "Poor visibility into occupancy", "High manpower dependency", "Frustrating driver experiences"].map((item, i) => (
                                <div key={i} className="bg-red-500/5 border border-red-500/10 p-4 md:p-6 lg:p-8 rounded-xl hover:bg-red-500/10 transition-colors">
                                    <span className="block text-red-500 font-mono text-[8px] md:text-xs mb-1 md:mb-2 uppercase tracking-[0.2em]">Pain Point 0{i + 1}</span>
                                    <p className="text-[var(--text-main)] text-xs md:text-sm lg:text-base leading-snug font-light">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 1.4 The Way - Panel 5 */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center bg-[#0e0e11] px-6 md:px-12">
                    <div className="max-w-7xl w-full panel-content px-5 md:px-10 pt-28 md:pt-32 pb-10">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display italic mb-6 md:mb-12 text-center text-gradient">Without <span className="text-blue-500 uppercase not-italic">Friction</span></h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
                            {[
                                { step: "Arrive", title: "Identification", desc: "Vehicle identified instantly through FASTag or ANPR." },
                                { step: "Park", title: "Guidance", desc: "Smart sensors guide you to the nearest available spot." },
                                { step: "Pay", title: "Auto-Billing", desc: "Billing via FASTag or UPI. No queues. No cash." },
                                { step: "Exit", title: "Seamless", desc: "Session closes and barrier opens automatically." }
                            ].map((item, i) => (
                                <div key={i} className="relative pt-4 md:pt-8 border-t border-blue-500/20 group hover:border-blue-500 transition-colors">
                                    <span className="absolute top-0 left-0 -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 bg-[var(--bg-dark)] border-2 border-blue-500 rounded-full" />
                                    <h3 className="text-lg md:text-2xl font-display italic mb-1 md:mb-2">{item.step}</h3>
                                    <p className="text-blue-500 font-mono text-[8px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-4">{item.title}</p>
                                    <p className="text-[var(--text-muted)] text-[10px] sm:text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 6: Stats */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center bg-[#111114] px-6 md:px-12">
                    <div className="max-w-7xl w-full panel-content px-5 md:px-10 pt-28 md:pt-32 pb-10">
                        <div className="bg-[var(--surface)] rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-center border border-[var(--border)] relative overflow-hidden shadow-2xl">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic mb-4 md:mb-6">Proven on Ground</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 mt-6 md:mt-16">
                                {[
                                    { label: "Cities", val: "1" },
                                    { label: "Active Sites", val: "3" },
                                    { label: "Parking Bays", val: "3000+" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black text-white mb-2 leading-none">{stat.val}</div>
                                        <div className="text-blue-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 7: Amenities */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 bg-[#121215]">
                    <div className="max-w-7xl w-full panel-content py-10">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic mb-6 md:mb-12">Facilities & <span className="text-blue-500">Amenities</span></h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
                            {["Automated Barriers", "FASTag Integration", "Smart Sensors", "Wayfinding Displays", "EV Charging", "CCTV Surveillance", "Reserved Parking", "Digital Payments", "Emergency Support"].map((item, i) => (
                                <div key={i} className="p-3 md:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center gap-2 md:gap-4 hover:border-blue-500/50 transition-all group">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] shrink-0" />
                                    <span className="text-[10px] sm:text-sm md:text-lg text-[var(--text-main)] font-light leading-tight">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 8: Ownership */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 bg-[#131316]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 bg-blue-900/10 p-6 md:p-16 rounded-[1.5rem] md:rounded-[2rem] border border-blue-500/20 panel-content py-10">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display italic mb-4 text-[var(--text-main)] leading-tight">From Empty Land to <br />Smart Asset</h2>
                            <ul className="space-y-3 md:space-y-6 text-sm sm:text-lg md:text-xl text-[var(--text-muted)] font-light">
                                {["Site assessment & design", "Complete technology installation", "Operations & maintenance", "Revenue management & reporting"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="text-blue-500 text-lg md:text-2xl">✓</span> <span className="text-xs sm:text-base md:text-lg lg:text-xl">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-600 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] text-white shadow-2xl flex flex-col justify-center">
                            <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 uppercase tracking-widest">Zero CapEx for Partners</h3>
                            <p className="mb-4 md:mb-6 text-[10px] sm:text-sm md:text-base opacity-90 leading-relaxed font-light">All technology and system costs are borne by Right Parking. We invest in your facility's future.</p>
                            <div className="pt-4 md:pt-8 border-t border-white/20 flex flex-row gap-4 sm:gap-8 font-display italic text-base sm:text-2xl">
                                <span>Rent Models</span><span>Revenue Share</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 9: Who We Serve */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 bg-[#141418]">
                    <div className="max-w-7xl w-full panel-content text-center py-10 md:py-20">
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic mb-8 md:mb-16">Who We <span className="text-blue-500">Serve</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                            {[
                                { t: "Urban Bodies", d: "Turning public parking into transparent, revenue-generating assets for the city." },
                                { t: "Real Estate", d: "Enhancing footfall, visitor experience, and asset monetization for developers." },
                                { t: "Everyday Drivers", d: "Making parking predictable, cashless, and stress-free for everyone on the move." }
                            ].map((item, i) => (
                                <div key={i} className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-12 rounded-2xl md:rounded-[2rem] text-left hover:border-blue-500 transition-all group">
                                    <h3 className="text-xl md:text-3xl font-display italic mb-3 group-hover:text-blue-500 transition-colors uppercase tracking-tighter">{item.t}</h3>
                                    <p className="text-[10px] sm:text-sm md:text-base lg:text-lg text-[var(--text-muted)] leading-relaxed font-light">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 10: Our Focus (Sectors) */}
                <section id="sectors" className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center px-5 md:px-10 lg:px-16 bg-[#060608] overflow-hidden relative z-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.08),_transparent_70%)]" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_rgba(168,85,247,0.08),_transparent_70%)]" />

                    <div className="max-w-7xl w-full panel-content flex flex-col lg:flex-row items-center justify-between h-full pt-16 md:pt-20 lg:pt-0 gap-8 lg:gap-8">
                        {/* Title Section */}
                        <div className="w-full lg:w-[35%] text-left lg:pt-0 lg:pl-4 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans font-normal tracking-[0.3em] text-white/50 uppercase leading-none mb-2">
                                    OUR
                                </h2>
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold tracking-tight text-white uppercase leading-none">
                                    <span className="text-blue-500">FOCUS</span>
                                </h2>
                                <div className="mt-4 lg:mt-6 h-1 w-16 bg-blue-500 rounded-full" />
                                <p className="mt-4 lg:mt-6 text-zinc-400 text-sm md:text-base lg:text-sm xl:text-base font-light max-w-sm leading-relaxed hidden md:block">
                                    We specialize in high-traffic urban environments where intelligent parking is not just a luxury, but a logistical necessity.
                                </p>
                            </motion.div>
                        </div>

                        {/* Sectors Display */}
                        <div className="w-full lg:w-3/5 relative flex-1 min-h-0 flex items-center justify-center max-h-[70vh] lg:max-h-none">
                            {/* Desktop Honeycomb */}
                            <div className="hidden md:flex relative w-full h-full items-center justify-center overflow-visible">
                                <div className="relative w-full aspect-square max-w-[350px] lg:max-w-none lg:h-full flex items-center justify-center scale-[0.45] lg:scale-[0.55] xl:scale-[0.65] 2xl:scale-[0.8] origin-center">
                                    {[
                                        // Column 1
                                        { name: "Airport Sector", x: 0, y: 50, color: "#a855f7" },
                                        // Column 2
                                        { name: "Government Sector", x: 25, y: 22, color: "#3b82f6" },
                                        { name: "Residential Establishments", x: 25, y: 78, color: "#3b82f6" },
                                        // Column 3 (Center)
                                        { name: "Corporate Houses & Tech Parks", x: 50, y: 50, color: "#3b82f6", primary: true },
                                        // Column 4
                                        { name: "Industrial Establishments", x: 75, y: 22, color: "#3b82f6" },
                                        { name: "Commercial Establishments", x: 75, y: 78, color: "#3b82f6" },
                                        // Column 5
                                        { name: "Expos & Events Sector", x: 100, y: 50, color: "#a855f7" },
                                    ].map((sector, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                                            className="absolute group z-10"
                                            style={{
                                                left: `${sector.x}%`,
                                                top: `${sector.y}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <div
                                                className="relative w-44 h-52 lg:w-48 lg:h-56 xl:w-52 xl:h-60 flex items-center justify-center p-6 text-center transition-all duration-500"
                                                style={{
                                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                    background: 'rgba(11, 11, 13, 0.95)',
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-0" />
                                                <div
                                                    className="absolute inset-0 opacity-10 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"
                                                    style={{ backgroundColor: sector.color + '44' }}
                                                />
                                                <div
                                                    className="absolute inset-0 pointer-events-none"
                                                    style={{
                                                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                        padding: sector.primary ? '3px' : '1.5px',
                                                        background: sector.color
                                                    }}
                                                >
                                                    <div
                                                        className="w-full h-full"
                                                        style={{
                                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                                            background: 'rgba(11, 11, 13, 1)'
                                                        }}
                                                    />
                                                </div>
                                                <div className="relative z-10 px-4">
                                                    <h3 className={`font-sans font-bold leading-tight uppercase tracking-tight ${sector.primary ? 'text-lg text-white' : 'text-xs text-zinc-300'}`}>
                                                        {sector.name}
                                                    </h3>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Grid (Visible below md) */}
                            <div className="md:hidden grid grid-cols-2 gap-4 w-full">
                                {[
                                    { name: "Airport Sector", color: "#a855f7" },
                                    { name: "Government Sector", color: "#3b82f6" },
                                    { name: "Residential", color: "#3b82f6" },
                                    { name: "Corporate & Tech", color: "#3b82f6", primary: true },
                                    { name: "Industrial", color: "#3b82f6" },
                                    { name: "Commercial", color: "#3b82f6" },
                                    { name: "Expos & Events", color: "#a855f7" },
                                ].map((sector, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-4 rounded-xl border flex flex-col justify-center gap-2 ${sector.primary ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-white/10'
                                            } ${idx === 6 ? 'col-span-2' : ''}`}
                                    >
                                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: sector.color + '33', border: `1px solid ${sector.color}` }} />
                                        <h3 className={`text-[10px] uppercase tracking-wider font-bold ${sector.primary ? 'text-blue-500' : 'text-zinc-400'}`}>
                                            {sector.name}
                                        </h3>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.9 App Experience - Panel 11 */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 bg-[#151519]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center panel-content py-10">
                        <div className="order-2 lg:order-1">
                            <span className="text-blue-500 font-mono text-[8px] md:text-xs tracking-widest uppercase mb-2 md:mb-4 block">The Right Parking App</span>
                            <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic mb-4 md:mb-8 leading-tight py-2">Your Spot Is <br /><span className="text-blue-500">Waiting</span></h2>
                            <ul className="space-y-3 sm:space-y-6 mb-6 md:mb-8">
                                {["Pre-book parking", "Enter without stopping", "Get live slot guidance", "Pay automatically"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 sm:gap-6 text-[var(--text-muted)]">
                                        <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0 text-xs sm:text-base">{i + 1}</div>
                                        <span className="text-xs sm:text-lg md:text-xl font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative flex justify-center order-1 lg:order-2">
                            <div className="bg-[#121214] rounded-[2rem] md:rounded-[3rem] aspect-[9/18.5] h-[35vh] sm:h-[50vh] md:h-[70vh] border border-zinc-800 p-2 md:p-4">
                                <img src="/mobile_view.png" alt="App" className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2rem]" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legacy & Future - Panel 12 */}
                <section className="about-panel h-screen w-full snap-start snap-always flex items-center justify-center relative bg-[#000]">
                    <div className="absolute inset-0">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
                            <source src="/parking_video.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                    </div>
                    <div className="relative z-10 text-center px-6 panel-content">
                        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-display italic mb-8 text-white">Forward <br /><span className="text-blue-500">Thinking.</span></h2>
                        <p className="text-blue-400 font-mono tracking-[0.3em] uppercase text-xs sm:text-base">Since 2024 — Building for 2050.</p>
                    </div>
                </section>

                <div className="snap-start">
                    <Footer />
                </div>
            </main>
        </div>
    );
};