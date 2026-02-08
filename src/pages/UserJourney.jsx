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
        <div className={`w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center relative ${highlight ? 'bg-[#7c3aed]/20 border-[2px] md:border-[3px] border-[#7c3aed]' : 'bg-[#1e1b4b]/30 border border-zinc-700'} transition-all hover:scale-110 group`}>
            {Icon && <Icon className={`${highlight ? 'text-white' : 'text-[#7c3aed]'} w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform`} strokeWidth={1.5} />}
            {highlight && <div className="absolute inset-0 rounded-full animate-pulse bg-purple-500/20" />}
        </div>
        <span className="text-[8px] md:text-[10px] text-zinc-500 font-mono text-center uppercase tracking-widest leading-tight max-w-[60px] md:max-w-[100px]">{name}</span>
    </div>
);

const SlideHeader = ({ title, subtitle, icon: Icon }) => (
    <div className="absolute top-12 md:top-28 left-6 md:left-16 right-6 md:right-16 flex justify-between items-start z-30 pointer-events-none">
        <div className="flex gap-4 md:gap-10">
            <div className="flex items-start gap-3 md:gap-6">
                {Icon && (
                    <div className="text-zinc-600 mt-1 md:mt-2">
                        <Icon size={24} md:size={36} strokeWidth={1} />
                    </div>
                )}
                <div className="flex flex-col">
                    <h2 className="text-xl md:text-4xl font-sans font-light text-white tracking-tight leading-none opacity-80">
                        {title}
                    </h2>
                    <p className="text-xl md:text-4xl font-sans font-bold text-white tracking-tight mt-1">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const SlideFrame = ({ children }) => (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-20 px-6 md:px-20">
        {/* Technical Markings - The 'Frame' */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
            {/* Left Vertical Line */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-zinc-800/50" />
            {/* Top Horizontal Line (below header) */}
            <div className="absolute top-[200px] left-10 right-0 h-px bg-zinc-800/50" />
            {/* Bottom Horizontal Line */}
            <div className="absolute bottom-[100px] left-10 right-0 h-px bg-zinc-800/50" />
            {/* Right Side Vertical Accent (Optional matching slide style) */}
            <div className="absolute right-12 top-0 bottom-0 w-px bg-zinc-800/20" />
        </div>

        <DotPattern />
        {children}
    </div>
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
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
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
                <section className="journey-panel h-screen w-full snap-start snap-always relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                        style={{ backgroundImage: 'url("/assets/journey-hero.jpg")' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#06070d]/60 via-transparent to-[#06070d]" />
                    </div>

                    <div className="relative h-full w-full flex flex-col items-center justify-center slide-content px-12 pt-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-[12rem] font-display font-black tracking-tighter leading-none text-white italic">
                                USER<br />
                                <span className="text-blue-500 not-italic tracking-normal px-4 md:px-8 py-1 md:py-2 bg-blue-500/10 rounded-3xl border border-blue-500/20">JOURNEY</span>
                            </h1>
                            <p className="text-zinc-400 font-mono text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase mt-8 md:mt-12 opacity-60">
                                Seamless Tech Integration / 2025
                            </p>
                        </motion.div>

                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Scroll to Explore</span>
                            <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                        </div>
                    </div>
                </section>

                {/* Panel 1: Pre-booked Parking Journey */}
                <section className="journey-panel h-screen w-full snap-start snap-always bg-[#06070d] relative">
                    <SlideFrame>
                        <SlideHeader title="User Journey" subtitle="Pre-booked Parking" />

                        <div className="max-w-[110rem] w-full slide-content relative h-[75%] md:h-[70%] flex items-center justify-center pt-10 md:pt-20">
                            {/* Desktop View: Horizontal Path */}
                            <div className="absolute inset-0 hidden md:flex items-center justify-center">
                                <svg className="w-full h-full opacity-40" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid meet">
                                    <path
                                        d="M50,400 C300,400 300,200 500,200 C700,200 700,400 900,400 C1100,400 1100,200 1300,200 C1500,200 1550,200 1550,200"
                                        stroke="#1e293b"
                                        strokeWidth="60"
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                    <path
                                        d="M50,400 C300,400 300,200 500,200 C700,200 700,400 900,400 C1100,400 1100,200 1300,200 C1500,200 1550,200 1550,200"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeDasharray="15 25"
                                        fill="none"
                                        className="opacity-30"
                                    />
                                </svg>
                            </div>

                            <div className="relative w-full h-full z-20 hidden md:block">
                                {[
                                    { t: "User visits the Right Parking App to book a parking slot", i: Smartphone, x: 5, y: 65, up: false },
                                    { t: "Enters vehicle details on the platform", i: FileText, x: 16, y: 35, up: true },
                                    { t: "Makes payment online", i: CreditCard, x: 27, y: 65, up: false },
                                    { t: "Parking slot is allocated to the vehicle", i: ParkingCircle, x: 38, y: 35, up: true, special: true },
                                    { t: "User receives confirmation along with the allocated Parking Slot Number", i: CheckCircle2, x: 49, y: 65, up: false },
                                    { t: "User visits the parking space at the scheduled date and time", i: MapPin, x: 60, y: 35, up: true },
                                    { t: "Provides parking details to the executive", i: UserCheck, x: 71, y: 65, up: false },
                                    { t: "Payment is made (if not already paid)", i: CreditCard, x: 82, y: 35, up: true },
                                    { t: "User parks the vehicle at the reserved parking slot", i: Car, x: 93, y: 65, up: false }
                                ].map((node, idx) => {
                                    const yPos = node.up ? (node.special ? "40%" : "20%") : "80%";
                                    return (
                                        <div key={idx} className="absolute group" style={{ left: `${node.x}%`, top: yPos, transform: 'translateX(-50%)' }}>
                                            <div className="absolute w-[1px] bg-blue-500/40" style={{ height: '160px', top: node.up ? '80px' : '-160px', left: '10%' }} />
                                            <div className={`flex flex-col gap-4 max-w-[160px] ${node.up ? 'mb-8' : 'mt-8'}`}>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-12 h-12 flex-shrink-0 bg-[#1e293b]/80 backdrop-blur-md rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                                        <node.i size={24} strokeWidth={1.5} />
                                                    </div>
                                                    <div className="flex flex-col pt-1">
                                                        <p className="text-zinc-300 text-[13px] font-normal leading-snug tracking-tight">{node.t}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute w-5 h-5 rounded-full bg-[#06070d] border-2 border-blue-500 flex items-center justify-center z-30" style={{ top: node.up ? '230px' : '-5px', left: '10%', transform: 'translateX(-50%)' }}>
                                                <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-150 transition-transform" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Mobile View: Vertical Timeline */}
                            <div className="md:hidden flex flex-col gap-6 w-full max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                {[
                                    { t: "User visits the Right Parking App to book a parking slot", i: Smartphone },
                                    { t: "Enters vehicle details on the platform", i: FileText },
                                    { t: "Makes payment online", i: CreditCard },
                                    { t: "Parking slot is allocated to the vehicle", i: ParkingCircle },
                                    { t: "User receives confirmation along with the allocated Parking Slot Number", i: CheckCircle2 },
                                    { t: "User visits the parking space at the scheduled date and time", i: MapPin },
                                    { t: "Provides parking details to the executive", i: UserCheck },
                                    { t: "Payment is made (if not already paid)", i: CreditCard },
                                    { t: "User parks the vehicle at the reserved parking slot", i: Car }
                                ].map((node, idx) => (
                                    <div key={idx} className="flex gap-4 items-start relative pb-6 border-l border-blue-500/30 pl-6 ml-2 last:pb-0">
                                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                                        <div className="w-10 h-10 flex-shrink-0 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 border border-blue-500/20">
                                            <node.i size={20} strokeWidth={1.5} />
                                        </div>
                                        <p className="text-zinc-300 text-sm leading-snug">{node.t}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SlideFrame>
                </section>

                {/* Panel 2: 4-Wheeler Entry Process */}
                <section className="journey-panel h-screen w-full snap-start snap-always bg-[#06070d] relative">
                    <SlideFrame>
                        <SlideHeader title="Parking Entry Process" subtitle="for 4 Wheelers" icon={Car} />

                        <div className="max-w-7xl w-full slide-content relative h-[70%] md:h-[60%] mt-10 md:mt-20">
                            {/* Desktop View */}
                            <div className="hidden md:block relative h-full w-full">
                                <div className="absolute top-1/2 left-0 right-0 h-24 bg-[#111116] border-y-[2px] border-zinc-800 flex items-center">
                                    <div className="w-full h-[1px] border-t-2 border-dashed border-zinc-700 mx-4 opacity-50" />
                                </div>

                                <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 100, opacity: 1 }} transition={{ duration: 1 }} className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                                    <Car size={180} className="text-[#a855f7] opacity-90" strokeWidth={1} />
                                </motion.div>

                                <div className="relative w-full h-full">
                                    {[
                                        { id: 1, x: "15%", y: "20%", t: "Vehicle arrives at the 4-wheeler entry lane." },
                                        { id: 2, x: "35%", y: "20%", t: "Induction Loop detects the presence of the vehicle." },
                                        { id: 4, x: "60%", y: "20%", t: "Boom barrier opens, and a digital display guides the vehicle to the parking spot." },
                                        { id: 6, x: "85%", y: "20%", t: "Customer proceeds to the designated parking spot." },
                                        { id: 3, x: "53%", y: "78%", t: "Power Gate button is pressed manually or automatically for a ticket.", sub: "Ticketing / RFID FastTag Reader Integration" },
                                        { id: 5, x: "80%", y: "78%", t: "Automatically recognize and log vehicle details for a seamless and efficient parking experience." }
                                    ].map((step) => (
                                        <div key={step.id} className="absolute flex flex-col gap-3 max-w-[220px]" style={{ left: step.x, top: step.y }}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">{step.id}</div>
                                                {step.sub && <span className="text-[10px] text-zinc-500 font-mono font-bold tracking-[0.1em]">{step.sub}</span>}
                                            </div>
                                            <p className="text-zinc-300 text-[14px] leading-snug font-light">{step.t}</p>
                                        </div>
                                    ))}
                                    <div className="absolute left-[54%] top-1/2 -translate-y-[80px] w-[5px] h-[70px] bg-blue-500 rounded-full z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                </div>
                            </div>

                            {/* Mobile View */}
                            <div className="md:hidden flex flex-col gap-4 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
                                <div className="flex justify-center mb-4">
                                    <Car size={80} className="text-[#a855f7] opacity-90" strokeWidth={1} />
                                </div>
                                {[
                                    { id: 1, t: "Vehicle arrives at the 4-wheeler entry lane." },
                                    { id: 2, t: "Induction Loop detects the presence of the vehicle." },
                                    { id: 3, t: "Power Gate button is pressed manually or automatically for a ticket.", sub: "Ticketing / RFID FastTag Reader Integration" },
                                    { id: 4, t: "Boom barrier opens, and a digital display guides the vehicle to the parking spot." },
                                    { id: 5, t: "Automatically recognize and log vehicle details for a seamless and efficient parking experience." },
                                    { id: 6, t: "Customer proceeds to the designated parking spot." }
                                ].map((step) => (
                                    <div key={step.id} className="bg-[#111116] p-4 rounded-xl border border-zinc-800 flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">{step.id}</div>
                                        <div className="flex flex-col gap-1">
                                            {step.sub && <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">{step.sub}</span>}
                                            <p className="text-zinc-300 text-sm leading-snug">{step.t}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SlideFrame>
                </section>

                {/* Panel 3: 2-Wheeler Entry Process */}
                <section className="journey-panel h-screen w-full snap-start snap-always bg-[#06070d] relative">
                    <SlideFrame>
                        <SlideHeader title="Parking Entry Process" subtitle="for 2 Wheelers" icon={Bike} />

                        <div className="max-w-7xl w-full slide-content relative h-[70%] md:h-[60%] mt-10 md:mt-20">
                            {/* Desktop View */}
                            <div className="hidden md:block relative h-full w-full">
                                <div className="absolute top-1/2 left-0 right-0 h-24 bg-[#111116] border-y-[2px] border-zinc-800 flex items-center">
                                    <div className="w-full h-[1px] border-t-2 border-dashed border-zinc-700 mx-4 opacity-50" />
                                </div>

                                <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 100, opacity: 1 }} transition={{ duration: 1.2 }} className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                                    <Bike size={160} className="text-zinc-400 opacity-80" strokeWidth={1} />
                                </motion.div>

                                <div className="relative w-full h-full">
                                    {[
                                        { id: 1, x: "15%", y: "20%", t: "Vehicle arrives at the 2-wheeler entry lane." },
                                        { id: 2, x: "40%", y: "20%", t: "Induction Loop detects the presence of the vehicle." },
                                        { id: 4, x: "65%", y: "20%", t: "Boom barrier opens, and a digital display guides the vehicle to the parking spot." },
                                        { id: 5, x: "85%", y: "20%", t: "Customer proceeds to the designated parking spot." },
                                        { id: 3, x: "55%", y: "78%", t: "Customer presses the Power Gate button for a ticket.", sub: "Ticketing/RFID Reader Integration" }
                                    ].map((step) => (
                                        <div key={step.id} className="absolute flex flex-col gap-3 max-w-[240px]" style={{ left: step.x, top: step.y }}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">{step.id}</div>
                                                {step.sub && <span className="text-[10px] text-zinc-500 font-mono font-bold tracking-[0.1em]">{step.sub}</span>}
                                            </div>
                                            <p className="text-zinc-300 text-[14px] leading-snug font-light">{step.t}</p>
                                        </div>
                                    ))}
                                    <div className="absolute left-[56%] top-1/2 -translate-y-[80px] w-[5px] h-[70px] bg-blue-500 rounded-full z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                </div>
                            </div>

                            {/* Mobile View */}
                            <div className="md:hidden flex flex-col gap-4 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
                                <div className="flex justify-center mb-4">
                                    <Bike size={70} className="text-zinc-400 opacity-80" strokeWidth={1} />
                                </div>
                                {[
                                    { id: 1, t: "Vehicle arrives at the 2-wheeler entry lane." },
                                    { id: 2, t: "Induction Loop detects the presence of the vehicle." },
                                    { id: 3, t: "Customer presses the Power Gate button for a ticket.", sub: "Ticketing/RFID Reader Integration" },
                                    { id: 4, t: "Boom barrier opens, and a digital display guides the vehicle to the parking spot." },
                                    { id: 5, t: "Customer proceeds to the designated parking spot." }
                                ].map((step) => (
                                    <div key={step.id} className="bg-[#111116] p-4 rounded-xl border border-zinc-800 flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">{step.id}</div>
                                        <div className="flex flex-col gap-1">
                                            {step.sub && <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">{step.sub}</span>}
                                            <p className="text-zinc-300 text-sm leading-snug">{step.t}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SlideFrame>
                </section>


                {/* Panel: Fasttag Entry System (Slide 107) */}
                <section className="journey-panel h-screen w-full snap-start snap-always bg-[#06070d] relative">
                    <SlideFrame>
                        <div className="absolute top-12 md:top-28 left-6 md:left-16 z-30">
                            <span className="px-3 md:px-4 py-1 md:py-1.5 bg-[#4c1d95]/50 border border-[#7c3aed]/30 text-[#a78bfa] text-base md:text-xl font-bold rounded-lg mb-4 md:mb-8 inline-block">
                                Fastag Entry System
                            </span>
                        </div>

                        <div className="max-w-[110rem] w-full slide-content flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-12 mt-28 md:mt-32 px-4 md:px-16 h-[80%] md:h-[75%] items-start md:items-center overflow-y-auto md:overflow-visible custom-scrollbar">
                            {/* Left Side: Features */}
                            <div className="w-full md:col-span-4 flex flex-col gap-3 md:gap-6">
                                {[
                                    { text: "ANPR System captures the entry of vehicle along with license plate number", icon: "C-321" },
                                    { text: "Boom Barriers integrated with ANPR System", icon: Waypoints },
                                    { text: "ANPR System implementation on parking entry", icon: ParkingCircle }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-4 md:p-8 bg-[#111116] border border-zinc-800/80 rounded-xl md:rounded-[2rem] flex items-center gap-4 md:gap-10 hover:border-blue-500/50 transition-all group">
                                        <div className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0 bg-[#06070d] border border-zinc-800 rounded-lg md:rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-colors">
                                            {typeof item.icon === 'string' ? (
                                                <span className="text-sm md:text-xl font-black font-mono tracking-tighter">{item.icon}</span>
                                            ) : (
                                                <item.icon className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1} />
                                            )}
                                        </div>
                                        <p className="text-zinc-300 text-xs md:text-lg leading-snug font-normal opacity-90">{item.text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Right Side: Network Diagram Card */}
                            <div className="w-full md:col-span-8 h-auto md:h-full">
                                <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl md:rounded-[3rem] p-6 md:p-12 h-full relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(76,29,149,0.05)_0%,_transparent_50%)]" />

                                    <div className="grid grid-cols-4 gap-y-8 md:gap-y-16 gap-x-2 md:gap-x-8 relative z-10 scale-[0.85] md:scale-100">
                                        {/* Top Row */}
                                        <div className="col-span-4 flex justify-center">
                                            <DiagramNode name="RFID Tag Date" icon={SmartphoneNfc} />
                                        </div>

                                        {/* Row 2 */}
                                        <DiagramNode name="UHF Reader" icon={Activity} />
                                        <div className="col-span-2 flex justify-center">
                                            <DiagramNode name="SKIDATA FASTag middleware" icon={Cpu} highlight />
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-20 md:w-20 md:h-32 bg-zinc-900 border border-zinc-700/50 rounded-lg md:rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-4 text-zinc-500 relative">
                                                <div className="w-6 md:w-12 h-px md:h-0.5 bg-zinc-700 rounded-full" />
                                                <div className="w-6 md:w-12 h-px md:h-0.5 bg-zinc-700 rounded-full" />
                                                <div className="w-6 md:w-12 h-px md:h-0.5 bg-zinc-700 rounded-full" />
                                                <span className="text-[5px] md:text-[7px] uppercase font-mono tracking-tighter px-1 md:px-2 text-center absolute -bottom-6 md:-bottom-8 w-16 md:w-24 left-1/2 -translate-x-1/2 text-zinc-600 font-bold leading-tight">SKIDATA Local PMS Server</span>
                                            </div>
                                        </div>

                                        {/* Row 3 */}
                                        <DiagramNode name="Optional IP Camera" icon={Search} />
                                        <div className="col-span-2 flex justify-center py-2 md:py-4">
                                            <div className="flex flex-col items-center justify-center px-4 md:px-8 py-2 md:py-4 bg-white rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                                <span className="text-[#06070d] font-black text-sm md:text-2xl tracking-tighter italic">NPCI</span>
                                                <div className="h-[1px] md:h-[2px] w-full bg-[#1c3e98] my-0.5 md:my-1" />
                                                <span className="text-[4px] md:text-[6px] text-[#06070d] uppercase font-bold text-center leading-tight">National Payments Corporation of India</span>
                                            </div>
                                        </div>
                                        <DiagramNode name="Acquiring Bank cloud Server" icon={ShieldCheck} />
                                    </div>

                                    {/* Connectivity Lines */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block">
                                        <path d="M400,100 L400,300 M200,250 L600,250" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </SlideFrame>
                </section>

                {/* Panel: Fasttag Exit System (Slide 108) */}
                <section className="journey-panel h-screen w-full snap-start snap-always bg-[#06070d] relative">
                    <SlideFrame>
                        <div className="absolute top-12 md:top-28 left-6 md:left-16 z-30">
                            <span className="px-3 md:px-4 py-1 md:py-1.5 bg-[#4c1d95]/50 border border-[#7c3aed]/30 text-[#a78bfa] text-base md:text-xl font-bold rounded-lg mb-4 md:mb-8 inline-block">
                                Fastag Exit System
                            </span>
                        </div>

                        <div className="max-w-[110rem] w-full slide-content flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-12 mt-28 md:mt-32 px-4 md:px-16 h-[80%] md:h-[75%] items-start md:items-center overflow-y-auto md:overflow-visible custom-scrollbar">
                            {/* Left Side: Features */}
                            <div className="w-full md:col-span-4 flex flex-col gap-3 md:gap-6 p-6 md:p-12 bg-[#111116] border border-zinc-800/80 rounded-xl md:rounded-[3rem]">
                                <ul className="space-y-4 md:space-y-8">
                                    {[
                                        "Automated payments with no need for manual intervention.",
                                        "ANPR system captures license plate numbers for accurate fare calculation.",
                                        "The system automatically calculates the applicable parking fee and communicates it to the FASTag system.",
                                        "Minimal stopping time required to process parking payments.",
                                        "Seamless integration with banks to receive FASTag payments."
                                    ].map((point, i) => (
                                        <li key={i} className="flex gap-4 md:gap-6 text-zinc-300 text-xs md:text-lg leading-relaxed font-normal opacity-90">
                                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500 mt-1.5 md:mt-3 flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Side: Network Diagram Card */}
                            <div className="w-full md:col-span-8 h-auto md:h-full">
                                <div className="bg-[#111116] border border-zinc-800/80 rounded-2xl md:rounded-[3rem] p-6 md:p-12 h-full relative overflow-hidden flex flex-col justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(76,29,149,0.05)_0%,_transparent_50%)]" />

                                    <div className="grid grid-cols-4 gap-y-8 md:gap-y-16 gap-x-2 md:gap-x-8 relative z-10 scale-[0.85] md:scale-100">
                                        {/* Top Row */}
                                        <div className="col-span-4 flex justify-center">
                                            <DiagramNode name="RFID Tag Date" icon={SmartphoneNfc} />
                                        </div>

                                        {/* Row 2 */}
                                        <DiagramNode name="UHF Reader" icon={Activity} />
                                        <div className="col-span-2 flex justify-center">
                                            <DiagramNode name="SKIDATA FASTag middleware" icon={Cpu} highlight />
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-20 md:w-20 md:h-32 bg-zinc-900 border border-zinc-700/50 rounded-lg md:rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-4 text-zinc-500 relative">
                                                <div className="w-6 md:w-12 h-px md:h-0.5 bg-zinc-700 rounded-full" />
                                                <div className="w-6 md:w-12 h-px md:h-0.5 bg-zinc-700 rounded-full" />
                                                <div className="w-6 md:w-12 h-px md:h-0.5 bg-zinc-700 rounded-full" />
                                                <span className="text-[5px] md:text-[7px] uppercase font-mono tracking-tighter px-1 md:px-2 text-center absolute -bottom-6 md:-bottom-8 w-16 md:w-24 left-1/2 -translate-x-1/2 text-zinc-600 font-bold leading-tight">SKIDATA Local PMS Server</span>
                                            </div>
                                        </div>

                                        {/* Row 3 */}
                                        <DiagramNode name="Optional IP Camera" icon={Search} />
                                        <div className="col-span-2 flex justify-center py-2 md:py-4">
                                            <div className="flex flex-col items-center justify-center px-4 md:px-8 py-2 md:py-4 bg-white rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                                <span className="text-[#06070d] font-black text-sm md:text-2xl tracking-tighter italic">NPCI</span>
                                                <div className="h-[1px] md:h-[2px] w-full bg-[#1c3e98] my-0.5 md:my-1" />
                                                <span className="text-[4px] md:text-[6px] text-[#06070d] uppercase font-bold text-center leading-tight">National Payments Corporation of India</span>
                                            </div>
                                        </div>
                                        <DiagramNode name="Acquiring Bank cloud Server" icon={ShieldCheck} />
                                    </div>

                                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block">
                                        <path d="M400,100 L400,300 M200,250 L600,250" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </SlideFrame>
                </section>

                {/* Panel: Valet/Instant Car Request (Slide 112) */}
                <section className="journey-panel h-screen w-full snap-start snap-always bg-[#06070d] relative overflow-hidden">
                    <SlideFrame>
                        <SlideHeader title="Don't Wait, Just Tap!" subtitle="Get Your Car Instantly!" icon={Smartphone} />

                        <div className="max-w-[100rem] w-full slide-content relative h-[85%] md:h-[70%] mt-24">
                            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-30">
                                <svg width="100%" height="80%" viewBox="0 0 1200 600" preserveAspectRatio="none">
                                    <path d="M100,500 C400,500 400,100 800,100 C1100,100 1200,100 1200,100" fill="none" stroke="white" strokeWidth="60" strokeLinecap="round" className="opacity-10" />
                                    <path d="M100,500 C400,500 400,100 800,100 C1100,100 1200,100 1200,100" fill="none" stroke="white" strokeWidth="2" strokeDasharray="20 30" />
                                </svg>
                                {[200, 450, 700, 950].map(x => (
                                    <div key={x} className="absolute bottom-[20%] w-1 h-32 bg-zinc-800" style={{ left: `${x}px` }}>
                                        <div className="absolute -top-1 -right-4 w-6 h-2 bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-center h-full relative z-20 overflow-y-auto md:overflow-visible custom-scrollbar px-4 pt-4">
                                <div className="md:col-span-4 flex flex-col items-center gap-4 md:gap-8 order-2 md:order-1">
                                    <div className="p-4 md:p-8 bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl scale-90 md:scale-110">
                                        <QrCode className="w-24 h-24 md:w-[180px] md:h-[180px] text-[#06070d]" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">Scan to Request</p>
                                </div>

                                <div className="md:col-span-4 flex flex-col items-center order-1 md:order-2">
                                    <div className="w-[240px] md:w-[300px] h-[480px] md:h-[600px] bg-[#0c0c14] border-[6px] md:border-[8px] border-zinc-800 rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-6 shadow-2xl relative">
                                        <div className="w-16 md:w-24 h-4 md:h-6 bg-zinc-800 rounded-full mx-auto mb-4 md:mb-8" />
                                        <div className="flex flex-col items-center text-center">
                                            <img src="/logo.svg" alt="Logo" className="h-8 md:h-12 w-auto mb-6 md:mb-12 opacity-80" />
                                            <span className="text-zinc-400 text-xs md:text-sm mb-1 md:mb-2">Welcome, Guest</span>
                                            <span className="text-white text-lg md:text-xl font-bold mb-8 md:mb-12 uppercase tracking-tighter">KA07N5556</span>

                                            <button className="w-full py-4 md:py-5 bg-blue-600 rounded-xl md:rounded-2xl text-white font-bold text-sm md:text-lg shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all uppercase tracking-tight">
                                                Request My Car
                                            </button>

                                            <div className="mt-8 md:mt-16 w-full px-2 md:px-4 text-left">
                                                <div className="h-px bg-zinc-800 w-full mb-4 md:mb-6" />
                                                <span className="text-[8px] md:text-[10px] text-zinc-500 uppercase tracking-widest">Valet PIN</span>
                                                <div className="text-blue-500 font-mono text-xl md:text-2xl mt-1 tracking-widest">01-1234</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-4 flex flex-col gap-4 md:gap-6 md:pl-12 text-center md:text-left order-3 pb-8">
                                    <div className="w-12 h-12 md:w-20 md:h-20 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 border border-blue-500/20 mx-auto md:ml-0">
                                        <Smartphone className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight uppercase italic underline decoration-blue-500/30 underline-offset-8">
                                        Tap <br className="hidden md:block" />
                                        <span className="text-zinc-500">to</span> <br className="hidden md:block" />
                                        Retrieve
                                    </h2>
                                    <p className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed max-w-sm">
                                        Our instant valet retrieval system ensures your vehicle is ready the moment you reach the exit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SlideFrame>
                </section>

                {/* Panel 7: Technology Features */}
                <section className="journey-panel h-screen w-full snap-start snap-always bg-[#06070d] relative">
                    <SlideFrame>
                        <SlideHeader title="Customer-Facing Technology" subtitle="Features" icon={Smartphone} />

                        <div className="max-w-[105rem] w-full slide-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-y-16 gap-x-10 md:gap-x-20 relative z-20 px-6 md:px-24 mt-28 md:mt-32 overflow-y-auto md:overflow-visible custom-scrollbar pb-10">
                            {[
                                { name: "Parking Guidance System (PGS)", desc: "Provides map-based navigation to guide users to their designated parking area.", i: MapPin },
                                { name: "Parking Slot Counting System", desc: "Employs cameras and sensors to track and display available and occupied parking slots in real-time.", i: BarChart3 },
                                { name: "Parking Management System", desc: "A comprehensive system designed to enhance convenience and provide essential controls for seamless parking management.", i: Zap },
                                { name: "Find My Car", desc: "Utilizes map-based navigation to help locate parked vehicles effortlessly.", i: Search },
                                { name: "Flexible Payment Options", desc: "Accepts various digital payment methods, including UPI, digital wallets, and credit/debit cards, all approved by RBI.", i: CreditCard },
                                { name: "RFID Authentication", desc: "Implements RFID technology for secure authentication of all staff vehicles.", i: SmartphoneNfc },
                                { name: "Reserve My Parking Slot", desc: "Allows users to reserve a parking space in advance via the app before arriving at the airport.", i: ParkingCircle },
                                { name: "Technology and Operations Management", desc: "Utilizes both on-premises and cloud-based solutions for efficient operations management.", i: Settings }
                            ].map((item, idx) => {
                                const Icon = item.i;
                                return (
                                    <div key={idx} className="flex gap-4 md:gap-8 group">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#0a0b14] border-[3px] md:border-[5px] border-purple-900 flex items-center justify-center relative overflow-hidden group-hover:border-purple-500 transition-all duration-500 shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover:shadow-purple-500/30">
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                                                <Icon className="w-6 h-6 md:w-10 md:h-10 text-white relative z-10" strokeWidth={1.2} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-3 leading-tight tracking-tight">{item.name}</h4>
                                            <p className="text-zinc-500 text-[12px] md:text-[14px] font-normal leading-snug max-w-[320px]">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </SlideFrame>
                </section>

                <div className="snap-start">
                    <Footer />
                </div>
            </main>
        </div>
    );
};
