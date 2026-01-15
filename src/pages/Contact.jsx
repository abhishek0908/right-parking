import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';

export const Contact = () => {
    return (
        <div className="bg-[var(--bg-dark)] min-h-screen text-[var(--text-main)] pt-24 md:pt-32 transition-colors duration-300">
            <main className="max-w-7xl mx-auto px-6 md:px-12">
                {/* 4.1 Hero Section */}
                <section className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Connect</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-display italic tracking-tighter-premium mb-8 leading-tight text-gradient py-4"
                    >
                        Let’s Build Smarter <br />
                        <span className="text-blue-500 font-display border-blue-500 inline-block pb-1">Parking</span> Together.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-[var(--text-muted)] font-light max-w-2xl leading-relaxed border-l-2 border-blue-500/30 pl-6"
                    >
                        Right Parking works best through long-term collaboration. We build infrastructure that lasts.
                    </motion.p>
                </section>

                {/* 4.2 Partner With Right Parking */}
                <section className="mb-48">
                    <h2 className="text-3xl md:text-5xl font-display italic mb-12 leading-tight py-2">Who We Partner With</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            "Urban Local Bodies & Government",
                            "Commercial Developers",
                            "Landowners & Asset Managers",
                            "Transit & Public Infrastructure"
                        ].map((partner, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[var(--surface)] border border-[var(--border)] p-8 rounded-[2rem] hover:border-blue-500/50 transition-colors group h-full flex flex-col justify-between"
                            >
                                <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    0{i + 1}
                                </div>
                                <h3 className="text-xl text-[var(--text-muted)] font-light leading-snug">{partner}</h3>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4.3 What Happens Next */}
                <section className="mb-48">
                    <div className="flex flex-col items-center text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-display italic mb-4 leading-tight py-2">What Happens Next</h2>
                        <p className="text-[var(--text-muted)] font-mono text-sm uppercase tracking-widest">Clear Timelines. Clear Ownership.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--border)] hidden md:block -translate-y-1/2 z-0" />

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                            {[
                                { title: "Share Details", desc: "Coordinates & Context" },
                                { title: "Feasibility", desc: "Assessment & Audit" },
                                { title: "Define Model", desc: "Operating & Revenue" },
                                { title: "Deploy Tech", desc: "Installation & Setup" },
                                { title: "Go Live", desc: "Monitoring Begins" }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="bg-[var(--bg-dark)] border border-[var(--border)] p-6 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                                >
                                    <div className="w-8 h-8 mx-auto bg-[var(--surface)] rounded-full border border-[var(--border)] flex items-center justify-center text-[10px] font-mono text-blue-500 mb-4 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                        {i + 1}
                                    </div>
                                    <h4 className="text-[var(--text-main)] font-medium mb-2">{step.title}</h4>
                                    <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4.4 Get In Touch Form & Info */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-48">
                    {/* Contact Form */}
                    <div className="lg:col-span-8 bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 rounded-[3rem] relative overflow-hidden">
                        <h3 className="text-3xl font-display italic mb-8">Start the Conversation</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">Full Name</label>
                                    <input type="text" className="w-full bg-[var(--bg-dark)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-colors text-[var(--text-main)]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">Email Address</label>
                                    <input type="email" className="w-full bg-[var(--bg-dark)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-colors text-[var(--text-main)]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">Enquiry Type</label>
                                <select className="w-full bg-[var(--bg-dark)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-colors text-[var(--text-main)] appearance-none cursor-pointer">
                                    <option>Partnerships</option>
                                    <option>Government Proposals</option>
                                    <option>Site Assessments</option>
                                    <option>App & User Support</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">Project Details</label>
                                <textarea className="w-full bg-[var(--bg-dark)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-colors text-[var(--text-main)] h-32 resize-none"></textarea>
                            </div>
                            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-mono uppercase tracking-[0.2em] text-xs hover:bg-blue-500 transition-colors w-full md:w-auto">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-12">
                        <div>
                            <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-2 block">Corporate Office</span>
                            <h4 className="text-2xl font-display italic mb-4">Right Parking</h4>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                [Address Line 1]<br />
                                [Address Line 2]<br />
                                [City, State, Zip]
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[var(--text-muted)] text-sm"><span className="text-[var(--text-muted)] opacity-50 uppercase text-xs tracking-widest mr-4">Email</span> [email@rightparking.com]</p>
                            <p className="text-[var(--text-muted)] text-sm"><span className="text-[var(--text-muted)] opacity-50 uppercase text-xs tracking-widest mr-4">Phone</span> [+91 99999 99999]</p>
                        </div>
                    </div>
                </section>

                {/* 4.5 Closing Statement */}
                <section className="mb-48 bg-gradient-to-br from-[var(--surface)] to-[var(--bg-dark)] border border-[var(--border)] p-16 md:p-32 rounded-[4rem] text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display italic mb-6 leading-tight text-[var(--text-main)] py-4">
                            Parking Is Infrastructure.<br />
                            <span className="text-blue-500 inline-block pb-2">Let’s Treat It That Way.</span>
                        </h2>
                        <p className="text-[var(--text-muted)] text-lg md:text-xl font-light max-w-3xl mx-auto">
                            Right Parking is building the next generation of parking systems—designed to move cities, businesses, and people forward.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};
