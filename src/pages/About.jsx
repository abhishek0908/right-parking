import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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
                            start: "top 60%",
                            end: "top 10%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-[var(--bg-dark)] text-[var(--text-main)] overflow-x-hidden scroll-smooth scrollbar-hide"
        >
            {/* Scroll Progress Indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
                {[...Array(11)].map((_, i) => (
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
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 snap-start snap-always sticky top-0 bg-[var(--bg-dark)]">
                    <div className="max-w-7xl w-full panel-content">
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-blue-500 font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-6">Reimagining Parking in India</motion.p>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display italic tracking-tighter-premium mb-6 md:mb-8 leading-[1.1] md:leading-tight text-gradient py-2 sm:py-4">
                            Building India’s <br /> Future of <span className="text-blue-500 font-display inline-block pb-1 md:pb-2">Parking</span>
                        </motion.h1>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-[var(--text-muted)] font-light tracking-wide mb-6 md:mb-8">Ticketless. Manpowerless. Seamlessly Managed.</motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xs sm:text-base md:text-lg lg:text-xl text-[var(--text-muted)] font-light max-w-xl md:max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-4 md:pl-6 mb-8 sm:mb-12">
                            Right Parking is transforming how India parks by building intelligent, automated parking infrastructure that operates without tickets, without cash, and without friction.
                        </motion.p>
                    </div>
                </section>

                {/* 1.1b CEO Section - Panel 1 */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 z-0 ceo-bg-container">
                        <img src="/assets/kumar-ceo.jpeg" className="w-full h-full object-cover opacity-100 object-left-top contrast-[1.1] brightness-[0.8]" alt="CEO Background" />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#17171a] via-transparent to-transparent" />
                    </div>
                    <div className="max-w-[100rem] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center panel-content relative z-10 px-6 md:px-12">
                        <div className="lg:col-span-4 space-y-4 sm:space-y-6 ceo-heading-col">
                            <div className="flex flex-col">
                                <span className="text-blue-500 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-2 sm:mb-4">Founder's Vision</span>
                                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black text-white leading-[0.85] tracking-tighter mb-4 md:mb-6 uppercase">
                                    MEET<br />THE <span className="text-blue-500">CEO</span><br /><span className="text-blue-500">&</span> FOUNDER
                                </h2>
                                <div className="flex flex-col group">
                                    <span className="text-xl sm:text-3xl md:text-4xl font-display italic tracking-tighter text-blue-500 py-1 inline-block">RIGHT</span>
                                    <span className="text-3xl sm:text-5xl md:text-6xl font-sans font-black tracking-tighter text-white">PARKING</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 ceo-bio-col mt-4 lg:mt-0">
                            <div className="text-[var(--text-muted)] font-light text-xs sm:text-sm md:text-lg lg:text-xl leading-[1.6] md:leading-[1.8] space-y-4 sm:space-y-6 md:space-y-10 text-left lg:ml-auto max-w-xl">
                                <p className="text-white/90">Kumar is the <span className="text-blue-500 font-medium whitespace-nowrap">visionary founder</span> and CEO of Right Parking, driven by a passion for revolutionizing urban mobility through innovative parking solutions.</p>
                                <p>With a background in <span className="text-white font-medium">technology</span> and a keen understanding of urban challenges, Kumar founded Right Parking to address the growing need for efficient and secure parking options in cities.</p>
                                <p>Under Kumar's leadership, Right Parking has grown from a <span className="text-white font-medium">concept</span> to a leading provider of digital parking solutions.</p>
                                <div className="pt-6 md:pt-12 border-t border-white/10">
                                    <p className="italic text-blue-400 text-lg sm:text-xl md:text-3xl font-display leading-tight">"Parking isn't just about slots. It's about time, safety, and the seamless flow of a city's lifeblood."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.2 About Right Parking - Panel 2 */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#0a0a0c]">
                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center panel-content">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic mb-6 leading-tight py-2">Invisible Infrastructure That <span className="text-blue-500 inline-block pb-1">Simply Works</span></h2>
                            <p className="text-[var(--text-muted)] text-sm md:text-base lg:text-lg leading-relaxed mb-6">Right Parking replaces outdated parking systems with self-operating infrastructure. Just seamless entry, guided parking, automatic billing, and real-time control.</p>
                            <p className="text-[var(--text-muted)] text-sm md:text-base lg:text-lg leading-relaxed mb-8 italic border-l border-blue-500/20 pl-4">"We don’t just manage parking. We build self-operating ecosystems that run silently in the background."</p>
                            <div className="flex flex-wrap gap-4">
                                <span className="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-widest border border-blue-500/20 px-4 py-2 rounded-full">Automation</span>
                                <span className="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-widest border border-blue-500/20 px-4 py-2 rounded-full">Intelligence</span>
                            </div>
                        </div>
                        <div className="bg-[var(--surface)] p-8 rounded-[2rem] border border-[var(--border)] relative overflow-hidden group shadow-2xl">
                            <ul className="space-y-4 relative z-10">
                                {["No paper tickets", "No manual cash collection", "Minimal on-ground manpower"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-[var(--text-main)] font-mono text-xs sm:text-sm uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-8 border-t border-[var(--border)] relative z-10">
                                <p className="text-[var(--text-muted)] font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2">Our Core Promise</p>
                                <p className="text-lg sm:text-xl italic font-display">Invisible Infrastructure. Total Control.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.3 The Problem - Panel 3 */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#0c0c0e]">
                    <div className="max-w-7xl w-full panel-content">
                        <div className="mb-6 md:mb-12 text-center md:text-left">
                            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic mb-3 md:mb-4">India’s Parking <span className="text-red-500">Challenge</span></h2>
                            <p className="text-sm sm:text-base md:text-xl mb-3 md:mb-4 text-[var(--text-muted)]">Parking is treated as an afterthought—yet it directly impacts traffic flow, safety, and city efficiency.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {["Congested entry & exit points", "Cash leakage and manual errors", "Poor visibility into occupancy", "High manpower dependency", "Frustrating driver experiences"].map((item, i) => (
                                <div key={i} className="bg-red-500/5 border border-red-500/10 p-5 md:p-8 rounded-xl hover:bg-red-500/10 transition-colors">
                                    <span className="block text-red-500 font-mono text-[10px] md:text-xs mb-3 md:mb-4 uppercase tracking-[0.2em]">Pain Point 0{i + 1}</span>
                                    <p className="text-[var(--text-main)] text-sm sm:text-base md:text-lg leading-snug">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 1.4 The Way - Panel 4 */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#0e0e11]">
                    <div className="max-w-7xl w-full panel-content">
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic mb-8 md:mb-16 text-center">Without <span className="text-blue-500 uppercase">Friction</span></h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {[
                                { step: "Arrive", title: "Identification", desc: "Vehicle identified instantly through FASTag or ANPR." },
                                { step: "Park", title: "Guidance", desc: "Smart sensors guide you to the nearest available spot." },
                                { step: "Pay", title: "Auto-Billing", desc: "Billing via FASTag or UPI. No queues. No cash." },
                                { step: "Exit", title: "Seamless", desc: "Session closes and barrier opens automatically." }
                            ].map((item, i) => (
                                <div key={i} className="relative pt-6 md:pt-8 border-t border-blue-500/20 group hover:border-blue-500 transition-colors">
                                    <span className="absolute top-0 left-0 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[var(--bg-dark)] border-2 border-blue-500 rounded-full" />
                                    <h3 className="text-xl md:text-2xl font-display italic mb-2">{item.step}</h3>
                                    <p className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-3 md:mb-4">{item.title}</p>
                                    <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 5: Stats */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#111114]">
                    <div className="max-w-7xl w-full panel-content">
                        <div className="bg-[var(--surface)] rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 text-center border border-[var(--border)] relative overflow-hidden shadow-2xl">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic mb-6">Proven on Ground</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mt-8 md:mt-16">
                                {[
                                    { label: "Cities", val: "12+" },
                                    { label: "Active Sites", val: "50+" },
                                    { label: "Parking Bays", val: "10,000+" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-5xl sm:text-6xl md:text-8xl font-sans font-black text-white mb-2">{stat.val}</div>
                                        <div className="text-blue-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 6: Amenities */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#121215]">
                    <div className="max-w-7xl w-full panel-content">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic mb-8 md:mb-12">Facilities & <span className="text-blue-500">Amenities</span></h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                            {["Automated Barriers", "FASTag Integration", "Smart Sensors", "Wayfinding Displays", "EV Charging", "CCTV Surveillance", "Reserved Parking", "Digital Payments", "Emergency Support"].map((item, i) => (
                                <div key={i} className="p-4 md:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center gap-3 md:gap-4 hover:border-blue-500/50 transition-all group">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                                    <span className="text-xs sm:text-sm md:text-lg text-[var(--text-main)] font-light">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 7: Ownership */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#131316]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-blue-900/10 p-8 md:p-16 rounded-[2rem] border border-blue-500/20 panel-content">
                        <div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display italic mb-6 text-[var(--text-main)] leading-tight">From Empty Land to <br />Smart Asset</h2>
                            <ul className="space-y-4 md:space-y-6 text-sm sm:text-lg md:text-xl text-[var(--text-muted)] font-light">
                                {["Site assessment & design", "Complete technology installation", "Operations & maintenance", "Revenue management & reporting"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="text-blue-500 text-base md:text-2xl">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-600 p-8 md:p-12 rounded-[2rem] text-white shadow-2xl flex flex-col justify-center">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 uppercase tracking-widest">Zero CapEx for Partners</h3>
                            <p className="mb-6 text-sm sm:text-base opacity-90 leading-relaxed">All technology and system costs are borne by Right Parking. We invest in your facility's future.</p>
                            <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row gap-4 sm:gap-8 font-display italic text-xl sm:text-2xl">
                                <span>Rent Models</span><span>Revenue Share</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 8: Who We Serve */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#141418]">
                    <div className="max-w-7xl w-full panel-content text-center">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic mb-8 md:mb-16">Who We <span className="text-blue-500">Serve</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                { t: "Urban Bodies", d: "Turning public parking into transparent, revenue-generating assets for the city." },
                                { t: "Real Estate", d: "Enhancing footfall, visitor experience, and asset monetization for developers." },
                                { t: "Everyday Drivers", d: "Making parking predictable, cashless, and stress-free for everyone on the move." }
                            ].map((item, i) => (
                                <div key={i} className="bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 rounded-[2rem] text-left hover:border-blue-500 transition-all group">
                                    <h3 className="text-2xl md:text-3xl font-display italic mb-4 group-hover:text-blue-500 transition-colors uppercase tracking-tighter">{item.t}</h3>
                                    <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] leading-relaxed font-light">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 1.9 App Experience - Panel 9 */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center px-6 md:px-12 bg-[#151519]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center panel-content">
                        <div className="order-2 lg:order-1">
                            <span className="text-blue-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-4 block">The Right Parking App</span>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic mb-6 md:mb-8 leading-tight py-2">Your Spot Is <br /><span className="text-blue-500">Waiting</span></h2>
                            <ul className="space-y-4 sm:space-y-6 mb-8">
                                {["Pre-book parking", "Enter without stopping", "Get live slot guidance", "Pay automatically"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 sm:gap-6 text-[var(--text-muted)]">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500">{i + 1}</div>
                                        <span className="text-sm sm:text-lg md:text-xl font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative flex justify-center order-1 lg:order-2">
                            <div className="bg-[#121214] rounded-[3rem] aspect-[9/18.5] h-[40vh] sm:h-[50vh] md:h-[70vh] border border-zinc-800 p-4">
                                <img src="/mobile_view.png" alt="App" className="w-full h-full object-cover rounded-[2rem]" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legacy & Future - Panel 10 */}
                <section className="about-panel h-screen w-full snap-start snap-always sticky top-0 flex items-center justify-center relative bg-[#000]">
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