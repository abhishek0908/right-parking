import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';

export const WhyUs = () => {
    return (
        <div className="bg-[#09090b] min-h-screen text-white pt-32">
            <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24">

                {/* 3.1 Hero Section */}
                <div className="mb-32">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4"
                    >
                        We Build It. We Run It. We Share the Value.
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-display italic tracking-tighter mb-12 leading-tight py-4"
                    >
                        Why Us.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl leading-relaxed border-l-2 border-blue-500/30 pl-6"
                    >
                        Parking works only when technology, operations, and economics align.<br />
                        <span className="text-white font-medium">Right Parking owns all three.</span>
                    </motion.p>
                </div>

                {/* 3.2 End-to-End Services */}
                <div className="mb-48">
                    <h2 className="text-3xl md:text-5xl font-display italic mb-12 leading-tight py-2">End-to-End Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "Site assessment & planning",
                            "Infrastructure development",
                            "Technology installation",
                            "Daily operations & monitoring",
                            "Maintenance & upgrades",
                            "Automated billing & reporting"
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/50 hover:border-blue-500/30 transition-all group"
                            >
                                <div className="text-blue-500/20 font-mono text-4xl font-bold mb-4 group-hover:text-blue-500 transition-colors">0{i + 1}</div>
                                <h3 className="text-zinc-300 text-lg">{service}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3.3 Business Models */}
                <div className="mb-48">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <h2 className="text-4xl md:text-6xl font-display italic leading-tight py-2">Business Models</h2>
                        <div className="text-right">
                            <span className="block text-blue-500 font-mono text-sm uppercase tracking-widest mb-1">Zero CapEx Commitment</span>
                            <span className="text-zinc-500 text-sm">All technology costs are on us.</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Rent Model */}
                        <div className="bg-zinc-900 border border-white/5 p-12 rounded-[3rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] group-hover:bg-blue-500/20 transition-colors" />
                            <h3 className="text-3xl font-display italic mb-8">Rent Model</h3>
                            <ul className="space-y-6">
                                {[
                                    "Fixed monthly payout",
                                    "Zero operational involvement",
                                    "No technology investment"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-zinc-400">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Revenue Share Model */}
                        <div className="bg-blue-600 p-12 rounded-[3rem] relative overflow-hidden text-white">
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 blur-[60px]" />
                            <h3 className="text-3xl font-display italic mb-8">Revenue Share Model</h3>
                            <ul className="space-y-6">
                                {[
                                    "Performance-linked earnings",
                                    "Transparent dashboards",
                                    "Upside aligned with demand"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-white/90">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3.4 Long-Term Partnerships */}
                <div className="mb-48 bg-zinc-900/20 border border-white/5 p-12 md:p-24 rounded-[3rem] text-center">
                    <h2 className="text-3xl md:text-5xl font-display italic mb-12 leading-tight py-2">Designed for <span className="text-blue-500 inline-block pb-1">Long-Term</span></h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-12">
                        {[
                            "Multi-year operations",
                            "City-wide scalability",
                            "Regulatory adaptability",
                            "Continuous upgrades"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-zinc-300 font-mono text-xs md:text-sm uppercase tracking-widest">
                                {i > 0 && <span className="hidden md:block text-zinc-700">•</span>}
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3.5 Proven Projects (Map Placeholder) */}
                <div className="mb-48">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display italic mb-4 leading-tight py-2">Proven Projects</h2>
                            <p className="text-zinc-500 max-w-md">Operating thousands of bays across Bengaluru, including MLCPs, Government complexes, and Transit hubs.</p>
                        </div>
                    </div>

                    {/* Abstract Map Visual */}
                    <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-zinc-900 rounded-[2rem] border border-white/5 relative overflow-hidden">
                        {/* Map Grid Background */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                        />

                        {/* Glowing Pins */}
                        {[
                            { top: '30%', left: '40%' },
                            { top: '50%', left: '45%' },
                            { top: '45%', left: '55%' },
                            { top: '60%', left: '35%' },
                            { top: '25%', left: '60%' }
                        ].map((pin, i) => (
                            <div key={i} className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6] animate-pulse" style={{ top: pin.top, left: pin.left }}>
                                <div className="absolute inset-0 bg-blue-500 animate-ping rounded-full opacity-75" />
                            </div>
                        ))}

                        <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
                            <span className="text-blue-500 font-mono text-xs uppercase tracking-widest block mb-1">Active Zone</span>
                            <span className="text-white text-lg font-display italic">Bengaluru City</span>
                        </div>
                    </div>
                </div>

                {/* 3.6 What Sets Us Apart */}
                <div className="mb-24 border-t border-white/5 pt-24">
                    <h2 className="text-3xl md:text-5xl font-display italic mb-16 text-center leading-tight py-2">What Sets Us Apart</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {[
                            "Execution over promises",
                            "Built for Indian conditions",
                            "Dashboard-driven governance",
                            "Zero CapEx for partners",
                            "Proven on-ground scale"
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-4 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                                    {i + 1}
                                </div>
                                <p className="text-zinc-400 text-sm font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};
