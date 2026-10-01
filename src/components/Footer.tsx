import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Applications', href: '/applications' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Knowledge', href: '/knowledge' },
    { label: 'Request a Quote', href: '/request-a-quote' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#08090b] border-t border-hairline py-16 md:py-24 text-xs text-[#a5a299]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-hairline">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link
              to="/"
              className="text-xl font-bold tracking-[0.25em] text-[#f4f2ee] uppercase inline-block hover:text-[#c8a97e] transition-colors"
            >
              LED WORLD
            </Link>
            <div className="text-sm font-semibold tracking-wider text-[#c8a97e] uppercase">
              LIGHT IS THE EXPERIENCE.
            </div>
            <p className="text-xs text-[#8a8880] max-w-sm leading-relaxed">
              Lighting designed to transform the way spaces look, feel and perform. Real architectural luminaires, continuous linear profiles, and bespoke optical solutions.
            </p>
          </div>

          {/* Quick Sitemap Links (Real router Links with slugs) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-semibold text-white uppercase tracking-widest mb-4">
              Explore Pages
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Systems Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[11px] font-semibold text-white uppercase tracking-widest mb-4">
              Luminaire Systems
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8a8880]">
              <Link to="/products?category=Linear%20Lights" className="hover:text-white">Continuous Linear</Link>
              <Link to="/products?category=Downlights" className="hover:text-white">Darklight Downlights</Link>
              <Link to="/products?category=Track%20Lights" className="hover:text-white">Magnetic 48V Track</Link>
              <Link to="/products?category=LED%20Strips" className="hover:text-white">Plaster-In Cove COB</Link>
              <Link to="/products?category=Pendant%20Lights" className="hover:text-white">Sculptural Pendants</Link>
              <Link to="/products?category=Outdoor%20Lighting" className="hover:text-white">IP68 Sub-Terra</Link>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white hover:text-[#c8a97e] transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6d6b65]">
          <div>
            © {new Date().getFullYear()} LED WORLD Architectural Systems. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151719] border border-brass-hairline max-w-lg w-full p-8 relative">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h4>
            <div className="text-xs text-[#a5a299] space-y-3 leading-relaxed max-h-64 overflow-y-auto pr-2">
              <p>
                LED WORLD respects client intellectual property and architectural plans. All submitted photometric schedules, project drawings, and specification requests are treated with strict professional confidentiality.
              </p>
              <p>
                We collect project contact details solely to provide luminaire quotations, IES photometric files, and engineering design support. No user telemetry or tracking data is sold to third parties.
              </p>
              <p>
                Luminaire specifications, dimensions, and photometric files (IES/LDT) are subject to continuous optical engineering improvements. Real-world performance tolerances adhere strictly to ANSI C78.377 standards and MacAdam 2-step binning limits.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c8a97e] text-black hover:bg-[#dfc299] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
