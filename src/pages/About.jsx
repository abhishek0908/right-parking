import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Footer } from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".about-panel");

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
            const isCeoSection = i === 1;

            if (isCeoSection) {
                // Special sequential animation for CEO section
                const heading = panel.querySelector(".ceo-heading-col");
                const bgImage = panel.querySelector(".ceo-bg-container");
                const bio = panel.querySelector(".ceo-bio-col");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                });

                tl.fromTo([heading, bio],
                    { opacity: 0, y: 30, filter: "blur(5px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.1, ease: "power2.out" }
                );
            } else {
                // Default stagger animation for other panels
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
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-[var(--bg-dark)] text-[var(--text-main)] overflow-x-hidden transition-colors duration-300">
            {/* Scroll Progress Indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
                {[...Array(11)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 transition-all duration-300"
                    />
                ))}
            </div>

            <main>
                {/* 1.1 Hero Section - Panel 0 */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[1] bg-[var(--bg-dark)]">
                    <div className="max-w-7xl w-full panel-content">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-blue-500 font-mono text-sm tracking-[0.4em] uppercase mb-6"
                        >
                            Reimagining Parking in India
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display italic tracking-tighter-premium mb-6 md:mb-8 leading-[1.1] md:leading-tight text-gradient py-4"
                        >
                            Building India’s <br />
                            Future of <span className="text-blue-500 font-display inline-block pb-1 md:pb-2">Parking</span>
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg sm:text-xl md:text-3xl text-[var(--text-muted)] font-light tracking-wide mb-6 md:mb-8"
                        >
                            Ticketless. Manpowerless. Seamlessly Managed.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--text-muted)] font-light max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-4 md:pl-6 mb-12"
                        >
                            Right Parking is transforming how India parks by building intelligent, automated parking infrastructure that operates without tickets, without cash, and without friction.
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
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-blue-500/50"
                        >
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll to reveal</span>
                            <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                        </motion.div>
                    </div>
                </section>

                {/* 1.1b CEO Section - Moved to 2nd position (Panel 1) */}
                <section className="about-panel h-screen w-full flex items-center justify-center relative overflow-hidden z-[2]">
                    {/* Background CEO Image */}
                    <div className="absolute inset-0 z-0 ceo-bg-container">
                        <img
                            src="/assets/kumar-ceo.jpeg"
                            className="w-full h-full object-cover opacity-100 object-left-top contrast-[1.1] brightness-[0.8]"
                            alt="CEO Background"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#17171a] via-transparent to-transparent" />
                    </div>

                    <div className="max-w-[100rem] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center panel-content relative z-10 px-6 md:px-12">
                        {/* Heading Cluster - Left Side */}
                        <div className="lg:col-span-4 space-y-6 ceo-heading-col">
                            <div className="flex flex-col">
                                <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Founder's Vision</span>
                                <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-black text-white leading-[0.85] tracking-tighter mb-4 md:mb-6 uppercase">
                                    MEET<br />
                                    THE <span className="text-blue-500">CEO</span><br />
                                    <span className="text-blue-500">&</span> FOUNDER
                                </h2>
                                <div className="flex flex-col group">
                                    <span className="text-xl sm:text-2xl md:text-4xl font-display italic tracking-tighter text-blue-500 leading-tight py-1 md:py-2 inline-block">RIGHT</span>
                                    <span className="text-3xl sm:text-4xl md:text-6xl font-sans font-black tracking-tighter text-white group-hover:text-blue-500 transition-colors duration-500">PARKING</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio Cluster - Far Right (Narrower width, more lines) */}
                        <div className="lg:col-span-8 ceo-bio-col mt-8 lg:mt-0">
                            <div className="text-[var(--text-muted)] font-light text-xs sm:text-sm md:text-lg lg:text-xl leading-[1.6] md:leading-[1.8] space-y-6 md:space-y-10 text-left lg:ml-auto max-w-xl">
                                <p className="text-white/90">
                                    Kumar is the <span className="text-blue-500 font-medium whitespace-nowrap">visionary founder</span> and CEO of Right Parking, driven by a passion for revolutionizing urban mobility through innovative parking solutions.
                                </p>
                                <p>
                                    With a background in <span className="text-white font-medium">technology</span> and a keen understanding of urban challenges, Kumar founded Right Parking to address the growing need for efficient and secure parking options in cities.
                                </p>
                                <p>
                                    Under Kumar's leadership, Right Parking has grown from a <span className="text-white font-medium">concept</span> to a leading provider of digital parking solutions, offering <span className="text-white font-medium">seamless booking experiences</span>, advanced security systems, and automated payment solutions.
                                </p>
                                <div className="pt-6 md:pt-12 border-t border-white/10">
                                    <p className="italic text-blue-400 text-xl md:text-3xl font-display leading-tight">
                                        "Parking isn't just about slots. It's about time, safety, and the seamless flow of a city's lifeblood."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.2 About Right Parking - Panel 2 */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[3] bg-[#0a0a0c]">
                    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center panel-content">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display italic mb-6 leading-tight py-2">Invisible Infrastructure That <span className="text-blue-500 inline-block pb-1">Simply Works</span></h2>
                            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-6">
                                Right Parking replaces outdated parking systems with self-operating infrastructure.
                                Just seamless entry, guided parking, automatic billing, and real-time control.
                            </p>
                            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8 italic border-l border-blue-500/20 pl-4">
                                "We don’t just manage parking. We build self-operating ecosystems that run silently in the background."
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-widest border border-blue-500/20 px-4 py-2 rounded-full">Automation</span>
                                <span className="text-blue-500 font-mono text-[10px] md:text-xs uppercase tracking-widest border border-blue-500/20 px-4 py-2 rounded-full">Intelligence</span>
                            </div>
                        </div>
                        <div className="bg-[var(--surface)] p-8 rounded-[2rem] border border-[var(--border)] relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                            <ul className="space-y-4 relative z-10">
                                {["No paper tickets", "No manual cash collection", "Minimal on-ground manpower"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-[var(--text-main)] font-mono text-sm uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-8 border-t border-[var(--border)] relative z-10">
                                <p className="text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest mb-2">Our Core Promise</p>
                                <p className="text-xl italic font-display">Invisible Infrastructure. Total Control.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.3 The Problem - Panel 3 */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[4] bg-[#0c0c0e]">
                    <div className="max-w-7xl w-full panel-content">
                        <div className="mb-6 md:mb-12 text-center md:text-left">
                            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display italic mb-3 md:mb-4">India’s Parking <span className="text-red-500">Challenge</span></h2>
                            <p className="text-base sm:text-lg md:text-xl mb-3 md:mb-4 text-[var(--text-muted)]">Parking is treated as an afterthought—yet it directly impacts traffic flow, safety, and city efficiency.</p>
                            <p className="text-[var(--text-muted)] text-[10px] sm:text-xs md:text-sm max-w-2xl mx-auto md:mx-0">Traditional parking infrastructure in India faces systemic bottlenecks that reduce urban mobility and site profitability.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                "Congested entry & exit points",
                                "Cash leakage and manual errors",
                                "Poor visibility into occupancy",
                                "High manpower dependency",
                                "Frustrating driver experiences"
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-red-500/5 border border-red-500/10 p-5 md:p-8 rounded-xl md:rounded-2xl hover:bg-red-500/10 transition-colors"
                                >
                                    <span className="block text-red-500 font-mono text-[10px] md:text-xs mb-3 md:mb-4 uppercase tracking-[0.2em]">Pain Point 0{i + 1}</span>
                                    <p className="text-[var(--text-main)] text-base md:text-lg leading-snug">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 1.4 The Way - Panel 4 */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[5] bg-[#0e0e11]">
                    <div className="max-w-7xl w-full panel-content">
                        <h2 className="text-3xl md:text-6xl font-display italic mb-16 text-center">Without <span className="text-blue-500 uppercase">Friction</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { step: "Arrive", title: "Identification", desc: "Vehicle identified instantly through FASTag or ANPR." },
                                { step: "Park", title: "Guidance", desc: "Smart sensors guide you to the nearest available spot." },
                                { step: "Pay", title: "Auto-Billing", desc: "Billing via FASTag or UPI. No queues. No cash." },
                                { step: "Exit", title: "Seamless", desc: "Session closes and barrier opens automatically." }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="relative pt-8 border-t border-blue-500/20 group hover:border-blue-500 transition-colors"
                                >
                                    <span className="absolute top-0 left-0 -translate-y-1/2 w-4 h-4 bg-[var(--bg-dark)] border-2 border-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                                    <h3 className="text-2xl font-display italic mb-2">{item.step}</h3>
                                    <p className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-4">{item.title}</p>
                                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 5: Presence & Stats */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[6] bg-[#111114]">
                    <div className="max-w-7xl w-full panel-content">
                        <div className="bg-[var(--surface)] rounded-[4rem] p-16 text-center border border-[var(--border)] relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[100px]" />
                            <h2 className="text-3xl md:text-6xl font-display italic mb-6 relative z-10">Proven on Ground</h2>
                            <p className="text-[var(--text-muted)] max-w-2xl mx-auto mb-16 relative z-10 text-lg">
                                Right Parking actively operates infrastructure across Public parking zones, Commercial complexes, and Urban assets.
                                <br />
                                Cities trust us with their most overlooked yet critical infrastructure.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                                {[
                                    { label: "Cities", val: "12+" },
                                    { label: "Active Sites", val: "50+" },
                                    { label: "Parking Bays", val: "10,000+" }
                                ].map((stat, i) => (
                                    <div key={i} className="group">
                                        <div className="text-6xl md:text-8xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-main)] to-zinc-800 mb-2 group-hover:to-blue-500 transition-all duration-700">{stat.val}</div>
                                        <div className="text-blue-500 font-mono text-xs tracking-widest uppercase">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 6: Facilities & Amenities (Restored) */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[7] bg-[#121215]">
                    <div className="max-w-7xl w-full panel-content">
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-display italic mb-8 md:mb-12">Facilities & <span className="text-blue-500">Amenities</span></h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                "Automated Barriers", "FASTag Integration", "Smart Sensors", "Wayfinding Displays",
                                "EV Charging", "CCTV Surveillance", "Reserved Parking", "Digital Payments", "Emergency Support"
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="p-4 md:p-8 bg-[var(--surface)] border border-[var(--border)] rounded-xl md:rounded-2xl flex items-center gap-4 md:gap-6 hover:border-blue-500/50 transition-all group"
                                >
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] group-hover:scale-150 transition-transform" />
                                    <span className="text-sm sm:text-base md:text-lg text-[var(--text-main)] font-light tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Panel 7: End-to-End Ownership (Restored) */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[8] bg-[#131316]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-blue-900/10 p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] border border-blue-500/20 panel-content">
                        <div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display italic mb-6 md:mb-8 text-[var(--text-main)] leading-tight">From Empty Land to <br />Smart Asset</h2>
                            <ul className="space-y-4 md:space-y-6 text-lg md:text-xl text-[var(--text-muted)] font-light">
                                {[
                                    "Site assessment & design",
                                    "Complete technology installation",
                                    "Operations & maintenance",
                                    "Revenue management & reporting"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 md:gap-4">
                                        <span className="text-blue-500 text-lg md:text-2xl">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-blue-600 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-white shadow-2xl flex flex-col justify-center">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 uppercase tracking-widest">Zero CapEx for Partners</h3>
                            <p className="mb-6 md:mb-10 text-base md:text-lg opacity-90 leading-relaxed">All technology and system costs are borne by Right Parking. We invest in your facility's future.</p>
                            <div className="pt-8 border-t border-white/20">
                                <p className="text-xs uppercase tracking-widest mb-4 opacity-75">Partners earn through:</p>
                                <div className="flex flex-col md:flex-row gap-8 font-display italic text-2xl">
                                    <span className="bg-white/10 px-6 py-2 rounded-lg">Rent Models</span>
                                    <span className="bg-white/10 px-6 py-2 rounded-lg">Revenue Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel 8: Who We Serve (Restored) */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[9] bg-[#141418]">
                    <div className="max-w-7xl w-full panel-content">
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-display italic mb-8 md:mb-16 text-center">Who We <span className="text-blue-500">Serve</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                { t: "Urban Bodies", d: "Turning public parking into transparent, revenue-generating assets for the city." },
                                { t: "Real Estate", d: "Enhancing footfall, visitor experience, and asset monetization for developers." },
                                { t: "Everyday Drivers", d: "Making parking predictable, cashless, and stress-free for everyone on the move." }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] hover:border-blue-500 transition-all group"
                                >
                                    <h3 className="text-2xl md:text-3xl font-display italic mb-4 md:mb-6 group-hover:text-blue-500 transition-colors uppercase tracking-tighter">{item.t}</h3>
                                    <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed font-light">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 1.9 App Experience - Panel 9 */}
                <section className="about-panel h-screen w-full flex items-center justify-center px-6 md:px-12 z-[10] bg-[#151519]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center panel-content">
                        <div>
                            <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-4 block">The Right Parking App</span>
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display italic mb-6 md:mb-8 leading-tight py-2">Your Spot Is <br /><span className="text-blue-500">Waiting</span></h2>
                            <ul className="space-y-6 mb-8">
                                {["Pre-book parking", "Enter without stopping", "Get live slot guidance", "Pay automatically"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-6 text-[var(--text-muted)] group">
                                        <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-blue-500 text-sm font-bold group-hover:bg-blue-500 group-hover:text-white transition-colors">{i + 1}</div>
                                        <span className="text-base sm:text-lg md:text-xl font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xl italic text-[var(--text-muted)] opacity-50 border-t border-white/5 pt-6">"Parking becomes part of the journey—not a disruption."</p>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
                            <div className="bg-[#121214] rounded-[2rem] md:rounded-[4rem] aspect-[9/18.5] h-[50vh] md:h-[70vh] flex items-center justify-center border border-zinc-800 relative overflow-hidden shadow-2xl p-4">
                                <div className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden border border-zinc-700/50 shadow-inner bg-[#09090b]">
                                    <img
                                        src="/mobile_view.png"
                                        alt="App Interface Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 border border-white/5" />
                            </div>
                        </div>
                    </div>
                </section>



                {/* Legacy & Future - Panel 10 */}
                <section className="about-panel h-screen w-full flex items-center justify-center z-[11] bg-[#000]">
                    <div className="absolute inset-0 overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-[3s]"
                        >
                            <source src="/parking_video.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                    </div>
                    <div className="relative z-10 text-center px-6 panel-content">
                        <h2 className="text-4xl sm:text-7xl md:text-9xl font-display italic mb-8 leading-tight text-white tracking-tighter">
                            Forward <br /><span className="text-blue-500">Thinking.</span>
                        </h2>
                        <p className="text-blue-400 font-mono tracking-[0.3em] md:tracking-[0.5em] uppercase text-xs md:text-base">
                            Since 2024 — Building for 2050.
                        </p>
                    </div>
                </section>

                {/* Footer Section */}
                <div className="bg-black relative z-[12]">

                    <Footer />
                </div>
            </main>
        </div >
    );
};
