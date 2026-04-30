import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const XIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const WhatsAppIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: Instagram, href: 'https://www.instagram.com/right.parking', label: 'Instagram' },
        { icon: XIcon, href: 'https://x.com/right_parking', label: 'X' },
        { icon: Facebook, href: 'https://www.facebook.com/p/Right-Parking-61559916825440', label: 'Facebook' },
        { icon: Youtube, href: 'https://www.youtube.com/@RightParking', label: 'YouTube' },
        { icon: WhatsAppIcon, href: 'https://wa.me/91910899089', label: 'WhatsApp' },
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
