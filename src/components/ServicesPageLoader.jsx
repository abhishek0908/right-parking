import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export const ServicesPageLoader = () => {
    const { progress } = useProgress()
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        // Only hide the loader when progress is 100%
        if (progress === 100) {
            const timeout = setTimeout(() => setIsFinished(true), 1500)
            return () => clearTimeout(timeout)
        }
    }, [progress])

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-[#09090b]"
                >
                    {/* Technical Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Content - Positioned below Header area */}
                    <div className="relative z-10 flex flex-col items-center mt-20">

                        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mb-4 relative">
                            <motion.div
                                className="absolute inset-0 bg-blue-500"
                                style={{ width: `${progress}%` }}
                                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <span className="text-white/40 font-mono text-[9px] tracking-[0.3em] uppercase">
                                Initializing Simulation
                            </span>
                            <span className="text-blue-500 font-mono text-[14px] font-bold">
                                {Math.round(progress)}%
                            </span>
                        </div>
                    </div>

                    {/* Cinematic Scanline */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            initial={{ top: '-100%' }}
                            animate={{ top: '100%' }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-full h-[100px] bg-gradient-to-b from-transparent via-blue-500/5 to-transparent shadow-[0_0_50px_rgba(59,130,246,0.1)]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
