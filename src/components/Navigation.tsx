import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onRequestQuote: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onRequestQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check active section
      const sections = ['hero', 'about', 'categories', 'applications', 'products', 'projects', 'why-us', 'knowledge', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#categories' },
    { label: 'Applications', href: '#applications' },
    { label: 'Projects', href: '#projects' },
    { label: 'Knowledge', href: '#knowledge' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0d0e]/90 backdrop-blur-md border-b border-hairline py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single text element strictly conforming to Top Bar Contract) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-lg md:text-xl font-bold tracking-[0.25em] text-[#f4f2ee] uppercase transition-colors hover:text-[#c8a97e] whitespace-nowrap"
          >
            LED WORLD
          </a>

          {/* Zone 2: Navigation Links (Clean text links with subtle hover effect) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-wider text-[#b8b5ad] uppercase">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors py-1 relative hover:text-[#f4f2ee] ${
                    isActive ? 'text-[#c8a97e] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c8a97e]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onRequestQuote}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors rounded-none whitespace-nowrap cursor-pointer shadow-sm hover:shadow-brass/20"
            >
              REQUEST A QUOTE
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#f4f2ee] hover:text-[#c8a97e] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0d0e]/98 backdrop-blur-lg flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xl font-medium tracking-widest text-[#f4f2ee] hover:text-[#c8a97e] transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 border-t border-hairline max-w-xs mx-auto w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-black bg-[#c8a97e] hover:bg-[#dfc299] transition-colors cursor-pointer"
              >
                REQUEST A QUOTE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
