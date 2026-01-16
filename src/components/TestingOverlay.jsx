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
            className={`h-screen flex flex-col justify-center px-12 pointer-events-none ${className} ${isLeft ? "items-start" : "items-end"
                }`}
            style={{ opacity }}
        >
            <div
                className={`w-[40%] ${isLeft ? "text-left" : "text-right"
                    } pointer-events-auto cursor-pointer group`}
                onClick={onClick}
            >
                <motion.h1
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-5xl md:text-7xl font-bold ${textColor} mb-6 leading-tight tracking-tight group-hover:text-blue-500 transition-colors duration-300`}
                >
                    {headline}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`text-xl md:text-2xl ${mutedColor} leading-relaxed max-w-lg ${isLeft ? "mr-auto" : "ml-auto"
                        }`}
                >
                    {description}
                </motion.p>
            </div>
        </section>
    );
};

export function TestingOverlay() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Scroll html style={{ width: "100%" }}>
            <div className="w-full">
                {/* First Section */}
                <section className="h-screen flex flex-col justify-start pt-45 px-12 pointer-events-none items-start">
                    <div
                        className="w-[40%] text-left pointer-events-auto cursor-pointer group"
                        onClick={() => handleNavigate("/about")}
                        style={{ marginTop: '20vh' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-main)] mb-2">
                                Right<span className="text-blue-500">Parking</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-[var(--text-muted)] font-light tracking-wide">
                                Ticketless. Seamless. Smart.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Scroll Sections */}
                <Section
                    headline="Build With Ease"
                    description="Real-time generation, smooth workflow, and optimized development process."
                    onClick={() => handleNavigate("/about")}
                    align="right"
                />
                <Section
                    headline="Designed For Scale"
                    description="From small businesses to enterprise solutions, AI Website Builder adapts effortlessly."
                    onClick={() => handleNavigate("/projects")} // Note: /projects might not exist in right-parking, kept for fidelity
                    align="left"
                />
                <Section
                    headline="Future-Ready Technology"
                    description="Powered by AI, automation, and intelligent code generation."
                    onClick={() => handleNavigate("/about")}
                    align="right"
                />

                {/* Final CTA */}
                <div className="h-screen flex items-center justify-center px-12 pointer-events-none">
                    <div className="w-[40%] text-center pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] mb-8">
                                Ready to Park?
                            </h2>
                            <button
                                onClick={() => handleNavigate("/contact")}
                                className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] min-w-[120px]"
                            >
                                Get Started
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Scroll>
    );
}
