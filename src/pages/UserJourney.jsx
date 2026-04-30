import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
    Smartphone,
    FileText,
    CreditCard,
    MapPin,
    CheckCircle2,
    Calendar,
    UserCheck,
    Car,
    ParkingCircle,
    Zap,
    Cpu,
    Search,
    Settings,
    LayoutDashboard,
    Lock,
    SmartphoneNfc,
    BarChart3,
    ShieldCheck,
    Bike,
    QrCode,
    Waypoints,
    Activity,
    ArrowUpRight
} from 'lucide-react';
import { Footer } from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

const DotPattern = () => (
    <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)',
            backgroundSize: '35px 35px'
        }}
    />
);

const DiagramNode = ({ name, icon: Icon, highlight, className = "" }) => (
    <div className={`flex flex-col items-center gap-2 md:gap-4 ${className}`}>
        <div className={`w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center relative ${highlight ? 'bg-purple-500/20 border-2 md:border-3 border-purple-500' : 'bg-zinc-900 border border-zinc-700'} transition-all hover:scale-110 group`}>
            {Icon && <Icon className={`${highlight ? 'text-white' : 'text-purple-400'} w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform`} strokeWidth={1.5} />}
            {highlight && <div className="absolute inset-0 rounded-full animate-pulse bg-purple-500/20" />}
        </div>
        <span className="text-[8px] md:text-[10px] text-zinc-500 font-mono text-center uppercase tracking-widest leading-tight max-w-[60px] md:max-w-[100px]">{name}</span>
    </div>
);

const SlideHeader = ({ title, subtitle, icon: Icon }) => (
    <div className="flex flex-col mb-4 md:mb-8 relative z-20">
        <div className="flex items-center gap-3 mb-1">
            {Icon && <Icon className="text-blue-500" size={18} />}
            <h2 className="text-xs md:text-sm font-mono text-blue-500 uppercase tracking-[0.3em] opacity-80">
                {title}
            </h2>
        </div>
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display font-black italic text-white tracking-tighter">
            {subtitle}
        </p>
    </div>
);

const SectionWrapper = ({ children, className = "" }) => (
    <section className={`journey-panel h-screen w-full snap-start snap-always relative overflow-hidden bg-[#06070d] flex flex-col ${className}`}>
        <div className="absolute inset-0 z-0 pt-24 md:pt-32 px-6 md:px-12">
            <DotPattern />
        </div>
        <div className="max-w-7xl w-full mx-auto px-5 md:px-10 h-full flex flex-col relative z-10 pt-24 md:pt-28 pb-8 overflow-hidden">
            {children}
        </div>
    </section>
);

export const UserJourney = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".journey-panel");

        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                scroller: containerRef.current,
                start: "top center",
                end: "bottom center",
                onToggle: (self) => self.isActive && setActiveIndex(i),
            });

            const elements = panel.querySelectorAll(".slide-content > *");
            gsap.fromTo(elements,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: panel,
                        scroller: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        ScrollTrigger.create({
            scroller: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            snap: {
                snapTo: 1 / (panels.length - 1),
                duration: { min: 0.3, max: 0.6 },
                delay: 0,
                ease: "power2.inOut"
            }
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'auto' }}
            className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-[#06070d] text-white overflow-x-hidden scrollbar-hide"
        >
            {/* Scroll Progress Indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 border ${activeIndex === i
                            ? "bg-blue-500 scale-150 border-blue-500 shadow-[0_0_8px_#3b82f6]"
                            : "bg-blue-500/10 border-blue-500/20"
                            }`}
                    />
                ))}
            </div>

            <main className="w-full">
                {/* Panel 0: Hero Section */}
                <section className="journey-panel h-screen w-full snap-start snap-always relative overflow-hidden flex items-center justify-center px-6 md:px-12">
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/assets/journey-hero.jpg"
                            alt="User Journey Hero"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#06070d]/80 via-[#06070d]/20 to-transparent" />
                    </div>

                    <div className="max-w-7xl w-full panel-content relative z-10 px-5 md:px-10 flex flex-col justify-center h-full pt-28 md:pt-32 pb-10">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-500 font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase mb-4 sm:mb-8"
                        >
                            End-to-End Excellence
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display italic tracking-tighter-premium mb-6 md:mb-10 leading-[1.1] md:leading-tight text-gradient py-2"
                        >
                            User <br /> <span className="text-blue-500 font-display inline-block pb-1 md:pb-2">Journey.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-[10px] md:text-sm lg:text-base text-zinc-400 font-light max-w-xl md:max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-4 md:pl-6 mb-8 sm:mb-12"
                        >
                            Step into a frictionless parking ecosystem. From the moment you pre-book to the instant you retrieve your vehicle, every touchpoint is powered by intelligent automation designed for the modern urban driver.
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
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll for Experience</span>
                        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                    </motion.div>
                </section>

                {/* Panel 1: Pre-booked Parking Journey */}
                <SectionWrapper>
                    <SlideHeader title="Flow Visualization" subtitle="Pre-booked Journey" icon={Car} />

                    <div className="flex-1 flex flex-col justify-center slide-content overflow-hidden">
                        {/* Desktop: Straight Road Flow */}
                        <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-[400px]">
                            {/* The Road */}
                            <div className="w-full h-24 bg-[#1a1a1e] border-y-2 border-zinc-800 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center">
                                {/* Road Markings (Dashed Yellow Line) */}
                                <div className="absolute left-0 right-0 h-[2px] border-t-2 border-dashed border-yellow-500/40 opacity-50 z-0" />

                                {/* Progress Indicator on Road */}
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 bg-blue-500/10 border-r-2 border-blue-500/50 z-10"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 3, ease: "linear" }}
                                />

                                {/* Points on Road */}
                                <div className="absolute inset-0 flex justify-between items-center px-12 z-20">
                                    {[
                                        { t: "Visit RP App", i: Smartphone },
                                        { t: "Vehicle Info", i: FileText },
                                        { t: "Quick Payment", i: CreditCard },
                                        { t: "Slot Allocated", i: ParkingCircle },
                                        { t: "Notification", i: CheckCircle2 },
                                        { t: "Arrival", i: MapPin },
                                        { t: "Verification", i: UserCheck },
                                        { t: "Entry Gate", i: ArrowUpRight },
                                        { t: "Park Vehicle", i: Car }
                                    ].map((node, i) => (
                                        <div key={i} className="relative flex flex-col items-center group/node">
                                            {/* Node Marker on Road */}
                                            <div className="w-4 h-4 rounded-full bg-zinc-900 border-2 border-blue-500 group-hover/node:scale-150 transition-transform shadow-[0_0_10px_#3b82f6] relative z-20">
                                                <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/20" />
                                            </div>

                                            {/* Alternating Labels & Icons */}
                                            <div className={`absolute whitespace-nowrap flex flex-col items-center ${i % 2 === 0 ? 'bottom-12' : 'top-12'}`}>
                                                {i % 2 !== 0 && (
                                                    <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-blue-500/50 to-transparent mb-2" />
                                                )}

                                                <div className="flex flex-col items-center gap-2 group-hover/node:-translate-y-2 transition-transform duration-300">
                                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-[#0c0c0e] border border-zinc-800 flex items-center justify-center text-blue-400 shadow-xl group-hover/node:border-blue-500 group-hover/node:text-white transition-all">
                                                        <node.i size={20} md:size={24} strokeWidth={1.5} />
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-[10px] md:text-xs text-white font-display font-medium uppercase tracking-widest">{node.t}</span>
                                                        <div className="h-[2px] w-0 bg-blue-500 group-hover/node:w-full transition-all duration-300 mx-auto mt-1" />
                                                    </div>
                                                </div>

                                                {i % 2 === 0 && (
                                                    <div className="w-[1px] h-12 md:h-16 bg-gradient-to-t from-blue-500/50 to-transparent mt-2" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tablet/Mobile: Vertical Grid (Simplified) */}
                        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-full pr-2 custom-scrollbar">
                            {[
                                { t: "Visit RP App", i: Smartphone },
                                { t: "Vehicle Info", i: FileText },
                                { t: "Quick Payment", i: CreditCard },
                                { t: "Slot Allocated", i: ParkingCircle },
                                { t: "Notification", i: CheckCircle2 },
                                { t: "Arrival", i: MapPin },
                                { t: "Verification", i: UserCheck },
                                { t: "Entry Gate", i: ArrowUpRight },
                                { t: "Park vehicle", i: Car }
                            ].map((node, i) => (
                                <div key={i} className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-400">
                                        <node.i size={20} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-xs md:text-sm text-zinc-300 font-mono uppercase tracking-widest">{node.t}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>

                {/* Panel 2: 4-Wheeler Entry */}
                <SectionWrapper>
                    <SlideHeader title="Flow Control" subtitle="4-Wheeler Process" icon={Car} />

                    <div className="flex-1 flex flex-col justify-center slide-content overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                            {[
                                { id: 1, t: "Arrival at entry lane." },
                                { id: 2, t: "Detection loop active." },
                                { id: 3, t: "Power Gate integration.", sub: "FASTag / RFID" },
                                { id: 4, t: "Boom barrier release." },
                                { id: 5, t: "Data logging & sync." },
                                { id: 6, t: "Proceed to slot." }
                            ].map((step) => (
                                <div key={step.id} className="p-4 md:p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-all flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{step.id}</div>
                                    <div className="flex flex-col justify-center">
                                        {step.sub && <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase mb-1">{step.sub}</span>}
                                        <p className="text-sm text-zinc-300 leading-snug">{step.t}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>

                {/* Panel 3: 2-Wheeler Entry */}
                <SectionWrapper>
                    <SlideHeader title="Flow Control" subtitle="2-Wheeler Process" icon={Bike} />

                    <div className="flex-1 flex flex-col justify-center slide-content overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                            {[
                                { id: 1, t: "Arrival at entry lane." },
                                { id: 2, t: "Sensor detection." },
                                { id: 3, t: "Manual power gate.", sub: "Ticket / Token" },
                                { id: 4, t: "Barrier clearance." },
                                { id: 5, t: "Navigate to zone." }
                            ].map((step) => (
                                <div key={step.id} className="p-4 md:p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-all flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{step.id}</div>
                                    <div className="flex flex-col justify-center">
                                        {step.sub && <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase mb-1">{step.sub}</span>}
                                        <p className="text-sm text-zinc-300 leading-snug">{step.t}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>

                {/* Panel 4: Fasttag Entry */}
                <SectionWrapper>
                    <SlideHeader title="Infrastructure" subtitle="FASTag Entry" icon={Cpu} />

                    <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 slide-content overflow-hidden">
                        <div className="lg:col-span-4 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                            {[
                                "ANPR plate scanning",
                                "Barrier integration",
                                "Real-time verification",
                                "Anti-passback checks"
                            ].map((t, idx) => (
                                <div key={idx} className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl flex items-center gap-4 group hover:border-blue-500/30">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-zinc-500 group-hover:text-blue-500">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <p className="text-xs text-zinc-400 group-hover:text-zinc-200">{t}</p>
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-4 sm:p-6 flex items-center justify-center overflow-hidden">
                            <div className="grid grid-cols-4 gap-y-8 sm:gap-y-12 md:gap-y-16 gap-x-2 scale-[0.6] sm:scale-[0.75] lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100 origin-center">
                                <div className="col-span-4 flex justify-center">
                                    <DiagramNode name="FASTag Tag" icon={SmartphoneNfc} />
                                </div>
                                <DiagramNode name="Scanner" icon={Activity} />
                                <div className="col-span-2 flex justify-center">
                                    <DiagramNode name="Middleware" icon={Cpu} highlight />
                                </div>
                                <DiagramNode name="PMS" icon={Settings} />
                                <DiagramNode name="ANPR" icon={Search} />
                                <div className="col-span-2 flex justify-center">
                                    <div className="bg-white px-6 py-2 rounded-lg flex flex-col items-center">
                                        <span className="text-black font-black italic text-xl">NPCI</span>
                                    </div>
                                </div>
                                <DiagramNode name="Cloud" icon={ShieldCheck} />
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* Panel 5: Fasttag Exit */}
                <SectionWrapper>
                    <SlideHeader title="Infrastructure" subtitle="FASTag Exit" icon={Cpu} />

                    <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 slide-content overflow-hidden">
                        <div className="lg:col-span-4 flex flex-col gap-3 p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-y-auto custom-scrollbar">
                            {[
                                "Automated account debit",
                                "Fare calculation engine",
                                "Exit barrier sync",
                                "Transaction logging"
                            ].map((t, idx) => (
                                <div key={idx} className="flex gap-4 text-zinc-400 text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                    {t}
                                </div>
                            ))}
                        </div>
                        <div className="lg:col-span-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-4 sm:p-6 flex items-center justify-center overflow-hidden">
                            <div className="grid grid-cols-4 gap-y-8 sm:gap-y-12 md:gap-y-16 gap-x-2 scale-[0.6] sm:scale-[0.75] lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100 origin-center">
                                <div className="col-span-4 flex justify-center">
                                    <DiagramNode name="RFID Tag" icon={SmartphoneNfc} />
                                </div>
                                <DiagramNode name="Exit Reader" icon={Activity} />
                                <div className="col-span-2 flex justify-center">
                                    <DiagramNode name="Middleware" icon={Cpu} highlight />
                                </div>
                                <DiagramNode name="Control" icon={Settings} />
                                <DiagramNode name="ANPR" icon={Search} />
                                <div className="col-span-2 flex justify-center">
                                    <div className="bg-white px-6 py-2 rounded-lg flex flex-col items-center">
                                        <span className="text-black font-black italic text-xl">NPCI</span>
                                    </div>
                                </div>
                                <DiagramNode name="Bank" icon={ShieldCheck} />
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* Panel 6: Valet Request */}
                <SectionWrapper>
                    <SlideHeader title="Mobile First" subtitle="Valet Retrieval" icon={Smartphone} />

                    <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center slide-content overflow-hidden">
                        <div className="lg:col-span-4 flex flex-col items-center gap-4 order-2 lg:order-1">
                            <div className="p-4 bg-white rounded-2xl shadow-xl">
                                <QrCode size={100} className="text-zinc-900" />
                            </div>
                            <h4 className="text-lg font-bold text-white uppercase italic underline decoration-blue-500 underline-offset-4">Instant Pickup</h4>
                        </div>

                        <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
                            <div className="w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] bg-zinc-950 border-[4px] border-zinc-800 rounded-[2rem] p-4 relative shadow-2xl flex flex-col items-center">
                                <div className="w-10 h-3 bg-zinc-800 rounded-full mb-6" />
                                <img src="/logo.svg" alt="logo" className="h-4 w-auto opacity-30 mb-6" />
                                <div className="w-full text-center">
                                    <span className="text-[10px] text-zinc-500 uppercase">Vehicle</span>
                                    <p className="text-white font-bold text-base">KA-05-AB-1234</p>
                                    <div className="w-full mt-6 py-2 bg-blue-600 rounded-lg text-white font-bold text-[10px] uppercase">Retrieving</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-4 text-center lg:text-left order-3">
                            <h3 className="text-4xl md:text-6xl font-display font-black text-white italic leading-tight">PUSH<br /><span className="text-zinc-600">to</span><br />PARK</h3>
                            <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                                Avoid the exit queue. Request your vehicle via the app and have it waiting for you at the gate.
                            </p>
                        </div>
                    </div>
                </SectionWrapper>

                {/* Panel 7: Systems Grid */}
                <SectionWrapper>
                    <SlideHeader title="Holistic Tech" subtitle="Key Features" icon={Zap} />

                    <div className="flex-1 slide-content overflow-y-auto custom-scrollbar pb-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                            {[
                                { n: "PGS", d: "Nav-based guidance system.", i: MapPin },
                                { n: "EV Charging", d: "Integrated charging ecosystem.", i: Zap },
                                { n: "ANPR Invoicing", d: "AI-based automated billing.", i: FileText },
                                { n: "Search", d: "Locate your parked vehicle.", i: Search },
                                { n: "Digital Pay", d: "RBI approved payment gateway.", i: CreditCard },
                                { n: "RFID", d: "Staff and VIP authentication.", i: SmartphoneNfc },
                                { n: "Bookings", d: "App-based parking reservations.", i: Calendar },
                                { n: "Cloud Ops", d: "24/7 remote monitoring.", i: Activity }
                            ].map((item, idx) => (
                                <div key={idx} className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl group hover:border-blue-500/30 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                                        <item.i size={20} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-white font-bold text-sm mb-1">{item.n}</h4>
                                    <p className="text-[10px] text-zinc-500 leading-snug">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionWrapper>

                <div className="snap-start relative z-10">
                    <Footer />
                </div>
            </main>
        </div>
    );
};
