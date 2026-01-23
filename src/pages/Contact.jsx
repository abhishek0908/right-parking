import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Footer } from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".contact-panel");

        // Track active panel for indicators
        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                scroller: containerRef.current,
                start: "top center",
                end: "bottom center",
                onToggle: (self) => self.isActive && setActiveIndex(i),
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
                        scroller: containerRef.current,
                        start: "top 95%",
                        end: "bottom 5%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
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
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 border ${activeIndex === i
                            ? "bg-blue-500 scale-150 border-blue-500 shadow-[0_0_8px_#3b82f6]"
                            : "bg-blue-500/20 border-blue-500/40"
                            }`}
                    />
                ))}
            </div>

            <main>
                {/* 4.1 Hero Section - Panel 0 */}
                <section className="contact-panel h-screen w-full snap-start snap-always flex items-center justify-center relative overflow-hidden z-[1]">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/contact-img.png"
                            alt="Contact Background"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-dark)] via-[var(--bg-dark)]/80 to-transparent" />
                    </div>

                    <div className="max-w-7xl w-full panel-content relative z-10 px-6 md:px-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-blue-500 font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-6"
                        >
                            Connect
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display italic tracking-tighter-premium mb-6 md:mb-8 leading-tight text-gradient py-2 sm:py-4"
                        >
                            Let’s Build Smarter <br />
                            <span className="text-blue-500 font-display border-blue-500 inline-block pb-1">Parking</span> Together.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm sm:text-base md:text-xl lg:text-2xl text-[var(--text-muted)] font-light max-w-xl md:max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-4 md:pl-6"
                        >
                            Right Parking works best through long-term collaboration. We build infrastructure that lasts.
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
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll for Partnership</span>
                        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                    </motion.div>
                </section>

                {/* 4.2 Partner With Right Parking - Panel 1 */}
                <section className="contact-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 z-[2] bg-[#0a0a0c]">
                    <div className="max-w-7xl w-full panel-content">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic mb-8 md:mb-16 uppercase tracking-tighter">Who We <span className="text-blue-500">Partner With</span></h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                "Urban Local Bodies & Government",
                                "Commercial Developers",
                                "Landowners & Asset Managers",
                                "Transit & Public Infrastructure"
                            ].map((partner, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--surface)] border border-[var(--border)] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:border-blue-500/50 transition-all group h-full flex flex-col justify-between shadow-2xl"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 text-sm font-bold group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                        0{i + 1}
                                    </div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl text-[var(--text-main)] font-light leading-snug mt-8 md:mt-12 group-hover:text-blue-500 transition-colors uppercase tracking-tight">{partner}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4.3 What Happens Next - Panel 2 */}
                <section className="contact-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 z-[3] bg-[#0c0c0e]">
                    <div className="max-w-7xl w-full panel-content">
                        <div className="flex flex-col items-center text-center mb-12 md:mb-24">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display italic mb-4 md:mb-6 leading-tight py-2 uppercase tracking-tighter">Roadmap to <span className="text-blue-500">Go-Live</span></h2>
                            <p className="text-[var(--text-muted)] font-mono text-[10px] uppercase tracking-[0.4em] opacity-60">Clear Timelines. Clear Ownership.</p>
                        </div>

                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/10 hidden md:block -translate-y-1/2 z-0" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 relative z-10">
                                {[
                                    { title: "Share Details", desc: "Coordinates & Context" },
                                    { title: "Feasibility", desc: "Assessment & Audit" },
                                    { title: "Define Model", desc: "Operating & Revenue" },
                                    { title: "Deploy Tech", desc: "Installation & Setup" },
                                    { title: "Go Live", desc: "Monitoring Begins" }
                                ].map((step, i) => (
                                    <div
                                        key={i}
                                        className="bg-[var(--bg-dark)] border border-[var(--border)] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-center hover:border-blue-500/50 transition-all duration-500 shadow-2xl group"
                                    >
                                        <div className="w-8 h-8 md:w-10 md:h-10 mx-auto bg-blue-500/10 rounded-full border border-blue-500/20 flex items-center justify-center text-[10px] font-mono text-blue-500 mb-4 md:mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            {i + 1}
                                        </div>
                                        <h4 className="text-[var(--text-main)] font-display italic text-base md:text-lg mb-2 md:mb-3">{step.title}</h4>
                                        <p className="text-[var(--text-muted)] text-[9px] md:text-[10px] uppercase tracking-widest font-mono">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4.4 Form Section - Panel 3 */}
                <section className="contact-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 z-[4] bg-[#0e0e11]">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center panel-content">
                        <div className="lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[4rem] relative overflow-hidden shadow-2xl">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic mb-8 md:mb-10 uppercase tracking-tighter">Start the <span className="text-blue-500">Conversation</span></h3>
                            <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-blue-500/60 font-mono">Full Name</label>
                                        <input type="text" className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl px-6 py-3 md:py-4 focus:border-blue-500 outline-none transition-all text-white font-light text-sm md:text-base" placeholder="Kumar ..." />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-blue-500/60 font-mono">Email Address</label>
                                        <input type="email" className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl px-6 py-3 md:py-4 focus:border-blue-500 outline-none transition-all text-white font-light text-sm md:text-base" placeholder="ceo@..." />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-blue-500/60 font-mono">Enquiry Type</label>
                                    <select className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl px-6 py-3 md:py-4 focus:border-blue-500 outline-none transition-all text-white appearance-none cursor-pointer font-light text-sm md:text-base">
                                        <option>Partnerships</option>
                                        <option>Government Proposals</option>
                                        <option>Site Assessments</option>
                                        <option>App & User Support</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-blue-500/60 font-mono">Project Details</label>
                                    <textarea className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl px-6 py-3 md:py-4 focus:border-blue-500 outline-none transition-all text-white h-24 md:h-32 resize-none font-light text-sm md:text-base" placeholder="Tell us about your requirements..."></textarea>
                                </div>
                                <button className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 md:py-5 rounded-full font-display italic font-bold text-lg md:text-xl hover:bg-white hover:text-blue-600 transition-all shadow-2xl">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-center space-y-8 sm:space-y-16">
                            <div>
                                <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block">Corporate Office</span>
                                <h4 className="text-2xl sm:text-3xl font-display italic mb-6">Right Parking</h4>
                                <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed font-light border-l-2 border-blue-500/20 pl-6 sm:pl-8">
                                    Unit 508, 5th Floor,<br />
                                    Iris Tech Park, Sohna Road,<br />
                                    Gurgaon, Haryana 122018
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-lg sm:text-xl text-[var(--text-main)] font-light"><span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mr-8 opacity-50">Email</span> admin@rightparking.com</p>
                                <p className="text-lg sm:text-xl text-[var(--text-main)] font-light"><span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mr-8 opacity-50">Phone</span> +91 99999 99999</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4.5 Closing - Panel 4 */}
                <section className="contact-panel h-screen w-full snap-start snap-always flex items-center justify-center px-6 md:px-12 z-[5] bg-black">
                    <div className="max-w-7xl w-full panel-content">
                        <div className="bg-gradient-to-br from-[#1a1a1e] to-black border border-white/5 p-8 md:p-12 lg:p-32 rounded-[3rem] md:rounded-[5rem] text-center relative overflow-hidden shadow-3xl">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[150px] pointer-events-none" />
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-display italic mb-6 md:mb-10 leading-tight text-[var(--text-main)] py-2 md:py-4 uppercase tracking-tighter relative z-10">
                                Parking Is <br /><span className="text-blue-500">Infrastructure.</span>
                            </h2>
                            <p className="text-base sm:text-xl md:text-3xl font-light max-w-4xl mx-auto relative z-10 leading-relaxed text-[var(--text-muted)]">
                                Let’s treat it that way. Right Parking is building the systems designed to move cities forward.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <div className="contact-panel snap-start snap-always bg-black relative z-[6]">
                    <Footer />
                </div>
            </main>
        </div>
    );
};
