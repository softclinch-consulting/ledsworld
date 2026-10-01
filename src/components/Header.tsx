import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { CATEGORIES_DATA, SPACES_DATA } from '../data/lightingData';

interface HeaderProps {
  onRequestQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRequestQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMegaOpen, setProductsMegaOpen] = useState(false);
  const [applicationsMegaOpen, setApplicationsMegaOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menus on route change
  useEffect(() => {
    setProductsMegaOpen(false);
    setApplicationsMegaOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? 'bg-[#0c0d0e]/95 backdrop-blur-md border-b border-hairline py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
      onMouseLeave={() => {
        setProductsMegaOpen(false);
        setApplicationsMegaOpen(false);
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark (clicking goes to home) */}
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="text-lg md:text-xl font-bold tracking-[0.25em] text-[#f4f2ee] uppercase hover:text-[#c8a97e] transition-colors whitespace-nowrap cursor-pointer"
          title="LED WORLD - Return to Home"
        >
          LED WORLD
        </Link>

        {/* Zone 2: Navigation with Mega-Menus */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-wider text-[#b8b5ad] uppercase">
          <Link
            to="/about"
            className={`transition-colors py-2 hover:text-white ${
              location.pathname === '/about' ? 'text-[#c8a97e] font-semibold' : ''
            }`}
          >
            About
          </Link>

          {/* Products Mega-Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => {
              setProductsMegaOpen(true);
              setApplicationsMegaOpen(false);
            }}
          >
            <Link
              to="/products"
              className={`flex items-center gap-1 transition-colors py-2 hover:text-white ${
                location.pathname.startsWith('/products') ? 'text-[#c8a97e] font-semibold' : ''
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsMegaOpen ? 'rotate-180' : ''}`} />
            </Link>

            {/* Products Dropdown / Mega-Menu */}
            {productsMegaOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-[#121316] border border-brass-hairline p-6 shadow-2xl animate-in fade-in duration-150"
                onMouseLeave={() => setProductsMegaOpen(false)}
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
                  <span className="text-xs font-semibold tracking-widest text-[#c8a97e] uppercase">
                    Architectural Lighting Systems
                  </span>
                  <Link
                    to="/products"
                    className="text-[11px] text-white/60 hover:text-white flex items-center gap-1 font-medium"
                  >
                    <span>View Complete Catalogue</span>
                    <ArrowRight className="w-3 h-3 text-[#c8a97e]" />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {CATEGORIES_DATA.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      className="p-2.5 bg-[#17191d] hover:bg-[#1e2025] border border-hairline hover:border-[#c8a97e]/40 transition-colors group flex items-start gap-2.5"
                    >
                      <div className="w-9 h-9 bg-black shrink-0 overflow-hidden">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#c8a97e] transition-colors leading-tight">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-[#888] font-mono mt-0.5">
                          {cat.count} models
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Applications Mega-Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => {
              setApplicationsMegaOpen(true);
              setProductsMegaOpen(false);
            }}
          >
            <Link
              to="/applications"
              className={`flex items-center gap-1 transition-colors py-2 hover:text-white ${
                location.pathname.startsWith('/applications') ? 'text-[#c8a97e] font-semibold' : ''
              }`}
            >
              <span>Applications</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${applicationsMegaOpen ? 'rotate-180' : ''}`} />
            </Link>

            {/* Applications Mega Menu */}
            {applicationsMegaOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] bg-[#121316] border border-brass-hairline p-6 shadow-2xl animate-in fade-in duration-150"
                onMouseLeave={() => setApplicationsMegaOpen(false)}
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
                  <span className="text-xs font-semibold tracking-widest text-[#c8a97e] uppercase">
                    Lighting by Space & Sector
                  </span>
                  <Link
                    to="/applications"
                    className="text-[11px] text-white/60 hover:text-white flex items-center gap-1 font-medium"
                  >
                    <span>Explore All Spaces</span>
                    <ArrowRight className="w-3 h-3 text-[#c8a97e]" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SPACES_DATA.slice(0, 6).map((space) => (
                    <Link
                      key={space.slug}
                      to={`/lighting/${space.slug}`}
                      className="p-3 bg-[#17191d] hover:bg-[#1e2025] border border-hairline hover:border-[#c8a97e]/40 transition-colors group flex items-center gap-3"
                    >
                      <div className="w-12 h-10 bg-black shrink-0 overflow-hidden">
                        <img src={space.image} alt={space.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#c8a97e] transition-colors">
                          {space.name}
                        </div>
                        <div className="text-[10px] text-[#888] line-clamp-1">
                          {space.tagline}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/projects"
            className={`transition-colors py-2 hover:text-white ${
              location.pathname.startsWith('/projects') ? 'text-[#c8a97e] font-semibold' : ''
            }`}
          >
            Projects
          </Link>

          <Link
            to="/knowledge"
            className={`transition-colors py-2 hover:text-white ${
              location.pathname.startsWith('/knowledge') ? 'text-[#c8a97e] font-semibold' : ''
            }`}
          >
            Knowledge
          </Link>

          <Link
            to="/contact"
            className={`transition-colors py-2 hover:text-white ${
              location.pathname === '/contact' ? 'text-[#c8a97e] font-semibold' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/request-a-quote"
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors rounded-none whitespace-nowrap cursor-pointer shadow-sm hover:shadow-brass/20"
          >
            REQUEST A QUOTE
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#f4f2ee] hover:text-[#c8a97e] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0d0e]/98 backdrop-blur-lg flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-5 text-center">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium tracking-widest text-[#f4f2ee] uppercase">
              About
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium tracking-widest text-[#f4f2ee] uppercase">
              Products Catalogue
            </Link>
            <Link to="/applications" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium tracking-widest text-[#f4f2ee] uppercase">
              Applications
            </Link>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium tracking-widest text-[#f4f2ee] uppercase">
              Projects Portfolio
            </Link>
            <Link to="/knowledge" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium tracking-widest text-[#f4f2ee] uppercase">
              Lighting Knowledge
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium tracking-widest text-[#f4f2ee] uppercase">
              Contact
            </Link>
            <div className="pt-6 border-t border-hairline max-w-xs mx-auto w-full">
              <Link
                to="/request-a-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-black bg-[#c8a97e] text-center"
              >
                REQUEST A QUOTE
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
