import { useRef, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { motion, useAnimation } from "framer-motion";

export const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    const controls = useAnimation();

    useEffect(() => {
        if (!active) {
            controls.start({
                opacity: 0,
                transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
            });
        }
    }, [active, controls]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={controls}
            className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#09090b] transition-opacity duration-1000 ${!active ? "pointer-events-none" : ""
                }`}
        >
            <div className="relative flex flex-col items-center overflow-hidden">
                {/* Animated Accent Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "240px" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent mb-8"
                />

                {/* Brand Header */}
                <div className="flex flex-col items-center mb-12">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white text-4xl md:text-6xl font-serif italic tracking-tighter mb-2"
                    >
                        RightParking
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-white text-[10px] uppercase tracking-[0.4em] font-mono"
                    >
                        Precision Loading
                    </motion.p>
                </div>

                {/* Progress Container */}
                <div className="w-48 md:w-64 h-[2px] bg-zinc-800 relative mb-4">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    />
                </div>

                {/* Stats */}
                <div className="flex flex-col items-center gap-1">
                    <span className="text-white font-mono text-[10px] tracking-widest uppercase">
                        {Math.round(progress)}%
                    </span>
                    <span className="text-zinc-600 font-mono text-[8px] tracking-[0.2em] uppercase">
                        Initialized: {loaded} / {total} Assets
                    </span>
                </div>

                {/* Technical Detail */}
                <div className="mt-8 h-4 overflow-hidden">
                    <motion.p
                        key={item}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-zinc-700 font-mono text-[7px] uppercase tracking-tighter text-center max-w-[200px] truncate"
                    >
                        {item}
                    </motion.p>
                </div>
            </div>

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>
        </motion.div>
    );
};
