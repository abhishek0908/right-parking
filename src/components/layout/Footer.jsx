import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Twitter, Phone } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: Instagram, href: 'https://www.instagram.com/right.parkin', label: 'Instagram' },
        { icon: Twitter, href: 'https://x.com/right_parking', label: 'X' },
        { icon: Facebook, href: 'https://www.facebook.com/p/Right-Parking-61559916825440', label: 'Facebook' },
        { icon: Youtube, href: 'https://www.youtube.com/@RightParking', label: 'YouTube' },
        { icon: Phone, href: 'tel:+9191910899089', label: 'Phone' },
    ];

    return (
        <footer className="w-full bg-[var(--bg-dark)] text-[var(--text-main)] px-6 md:px-12 py-16 md:py-24 relative z-50 border-t border-[var(--border)] overflow-hidden transition-colors duration-300">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <Link to="/" className="flex items-center gap-3 mb-8 group w-fit">
                        <img src="/logo.svg" alt="RightParking Logo" className="h-10 w-auto rounded-lg object-contain" />
                        <span className="text-2xl font-display italic font-bold tracking-tighter-premium text-[var(--text-main)]">RightParking</span>
                    </Link>
                    <p className="text-[var(--text-muted)] max-w-2xl leading-relaxed font-light text-base md:text-lg mb-10">
                        India's Leading Smart Parking Solutions Provider, specializing in AI-driven ANPR technology, automated invoicing, and integrated EV charging infrastructure.
                    </p>
                    <div className="flex gap-6">
                        {socials.map((social) => (
                            <a 
                                key={social.label} 
                                href={social.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all shadow-sm"
                                aria-label={social.label}
                            >
                                <social.icon size={20} strokeWidth={1.5} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-8 text-[var(--text-muted)]/50">
                    <p className="text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-center md:text-left">
                        @ {currentYear} rightparking
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 font-mono text-[9px] tracking-[0.2em] uppercase">
                        <span className="text-[var(--text-muted)] opacity-20">COORDINATES: 28.6139° N, 77.2090° E</span>
                        <div className="hidden sm:block w-[1px] h-4 bg-[var(--border)]" />
                        <span className="text-[var(--text-muted)] opacity-40">ENCRYPTION: AES-256</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
