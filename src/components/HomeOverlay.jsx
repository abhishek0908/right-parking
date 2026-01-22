import { Scroll } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Section = ({
    headline,
    description,
    opacity = 1,
    className = "",
    onClick,
    align = "right", // "left" or "right"
}) => {
    const isLeft = align === "left";

    // Adjusted text colors to match right-parking variables
    const textColor = "text-[var(--text-main)]";
    const mutedColor = "text-[var(--text-muted)]";

    return (
        <section
            className={`h-screen flex flex-col justify-center px-6 md:px-24 pointer-events-none ${className} ${isLeft ? "items-start" : "items-end"
                }`}
            style={{ opacity }}
        >
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className={`w-full md:w-[60%] lg:w-[50%] p-4 pointer-events-auto cursor-pointer group relative`}
                onClick={onClick}
            >
                <div className="relative z-10">
                    <motion.h2
                        className={`text-3xl sm:text-5xl md:text-6xl font-black ${textColor} mb-4 md:mb-6 leading-tight tracking-tighter-premium group-hover:text-blue-500 transition-colors duration-300 ${isLeft ? "text-left" : "text-left md:text-right"}`}
                    >
                        {headline}
                    </motion.h2>
                    <motion.p
                        className={`text-base sm:text-xl md:text-2xl ${mutedColor} leading-relaxed font-light ${isLeft ? "text-left" : "text-left md:text-right"} max-w-2xl ${isLeft ? "" : "ml-auto"}`}
                    >
                        {description}
                    </motion.p>

                    <div className={`mt-8 flex ${isLeft ? "justify-start" : "justify-start md:justify-end"}`}>
                        <span className="text-blue-500 text-sm font-bold tracking-[0.3em] uppercase group-hover:translate-x-4 transition-transform duration-500 flex items-center gap-4">
                            Explore <div className="w-12 h-px bg-blue-500 transition-all duration-500 group-hover:w-20"></div>
                        </span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export function HomeOverlay() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Scroll html style={{ width: "100%" }}>
            <div className="w-full">
                {/* Hero Section */}
                <section className="h-screen flex flex-col justify-center px-6 md:px-24 pointer-events-none items-start">
                    <div
                        className="w-full md:w-[60%] text-left pointer-events-auto cursor-pointer group"
                        onClick={() => handleNavigate("/about")}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-main)] mb-2 leading-[0.85] tracking-tighter">
                                Right<span className="text-blue-500">Parking</span>
                            </h1>
                            <div className="h-1 w-16 md:h-1.5 md:w-32 bg-blue-500 mb-6 md:mb-8"></div>
                            <p className="text-lg sm:text-2xl md:text-4xl text-[var(--text-muted)] font-light tracking-wide max-w-2xl leading-tight">
                                Engineering the Future of Urban Mobility through Intelligent Systems.
                            </p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.4, 1] }}
                                transition={{
                                    delay: 1.5,
                                    duration: 2,
                                    times: [0, 0.2, 0.5, 1],
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="pt-16 text-blue-500/50 flex items-center gap-6"
                            >
                                <span className="text-xs font-bold tracking-[0.4em] uppercase">Scroll to explore</span>
                                <div className="w-24 h-px bg-blue-500/20"></div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Content Sections */}
                <Section
                    headline="Our Story"
                    description="Redefining how India parks. We combine operational excellence with cutting-edge technology to create seamless experiences for developers and drivers alike."
                    onClick={() => handleNavigate("/about")}
                    align="right"
                />
                <Section
                    headline="Intelligence"
                    description="From ALPR and automated entry-exit to real-time occupancy tracking. We build the brains behind the modern parking garage."
                    onClick={() => handleNavigate("/technology")}
                    align="left"
                />
                <Section
                    headline="Signature"
                    description="Explore our portfolio of high-traffic commercial and residential installations across India's Tier 1 cities."
                    onClick={() => handleNavigate("/projects")}
                    align="right"
                />
                <Section
                    headline="Management"
                    description="Beyond hardware. We provide end-to-end management, revenue optimization, and custom business models tailored to your facility."
                    onClick={() => handleNavigate("/services")}
                    align="left"
                />
                <Section
                    headline="Ecosystem"
                    description="Trusted by India's leading real estate developers and municipal corporations to solve the most complex parking challenges."
                    onClick={() => handleNavigate("/clients")}
                    align="right"
                />

                {/* Final CTA */}
                <div className="h-screen flex items-center justify-center px-6 md:px-12 pointer-events-none">
                    <div className="w-full md:w-[80%] lg:w-[60%] text-center pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[var(--text-main)] mb-8 md:mb-12 leading-tight tracking-tighter">
                                Next <span className="text-blue-500">Level?</span>
                            </h2>
                            <button
                                onClick={() => handleNavigate("/projects")}
                                className="group relative px-12 py-6 bg-transparent text-white text-2xl font-black uppercase tracking-widest overflow-hidden transition-all duration-300"
                            >
                                <span className="relative z-10">View Projects</span>
                                <div className="absolute inset-0 border-2 border-blue-500 scale-100 group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-blue-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Scroll>
    );
}