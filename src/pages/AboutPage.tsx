import React from 'react';
import { Link } from 'react-router-dom';
import { ASSET_IMAGES } from '../data/lightingData';
import { Shield, Sparkles, CheckCircle2, Award, Zap, Compass, Cpu } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">About</span>
        </div>

        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-hairline">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
            The Brand Ethos
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f4f2ee] max-w-4xl mb-6 leading-tight">
            WE CREATE LIGHT FOR THE WAY SPACES ARE LIVED.
          </h1>
          <p className="text-base sm:text-lg text-[#b8b5ad] max-w-2xl font-light leading-relaxed">
            LED WORLD is an architectural lighting brand dedicated to merging semiconductor precision, optical science, and minimalist product design.
          </p>
        </div>

        {/* Large Architectural Photography Hero */}
        <div className="relative aspect-[21/9] bg-[#16181b] border border-hairline overflow-hidden mb-20 shadow-2xl">
          <img
            src={ASSET_IMAGES.about}
            alt="LED WORLD architectural lighting studio design philosophy"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs text-white">
            <span className="uppercase tracking-widest text-[#c8a97e]">Light as Architecture</span>
            <span className="font-mono text-white/60">CRI &gt; 98 · UGR &lt; 15</span>
          </div>
        </div>

        {/* Brand Narrative Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-hairline">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
              Lighting Designed to Elevate the Human Experience
            </h2>
            <div className="text-xs text-[#c8a97e] uppercase tracking-widest mb-6">
              Our Design Philosophy
            </div>
            <p className="text-sm text-[#a5a299] leading-relaxed mb-6">
              In luxury architecture, lighting is often treated as an afterthought—fixtures chosen late in the project and scattered randomly across ceilings. We approach lighting as an essential architectural material, working with designers from the initial massing studies to calibrate light to space.
            </p>
            <p className="text-sm text-[#a5a299] leading-relaxed">
              Our luminaires are engineered to disappear. By utilizing plaster-in perforated flanges, deep parabolic baffles, and knife-edge drywall details, the fixture becomes an organic part of the building envelope.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-[#121316] border border-hairline">
                <Compass className="w-5 h-5 text-[#c8a97e] mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Design Thinking</h3>
                <p className="text-xs text-[#a5a299] leading-relaxed">
                  Clean geometries, hand-rubbed brass finishes, and recessed profiles that respect structural lines rather than competing with them.
                </p>
              </div>

              <div className="p-6 bg-[#121316] border border-hairline">
                <Cpu className="w-5 h-5 text-[#c8a97e] mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Technical Approach</h3>
                <p className="text-xs text-[#a5a299] leading-relaxed">
                  Semiconductor grade optical lenses, cold-forged thermal management, and 2-step MacAdam ellipse binning for perfect color consistency.
                </p>
              </div>

              <div className="p-6 bg-[#121316] border border-hairline">
                <Zap className="w-5 h-5 text-[#c8a97e] mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Application Expertise</h3>
                <p className="text-xs text-[#a5a299] leading-relaxed">
                  Deep understanding of residential warm-dimming, corporate WELL Building standards, retail color vibrancy, and marine outdoor sealing.
                </p>
              </div>

              <div className="p-6 bg-[#121316] border border-hairline">
                <Shield className="w-5 h-5 text-[#c8a97e] mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Customer Support</h3>
                <p className="text-xs text-[#a5a299] leading-relaxed">
                  Dedicated photometric engineering, IES file provision, custom extrusion cutting, and direct coordination with electrical contractors.
                </p>
              </div>
            </div>

            {/* Verifiable Optical Standards */}
            <div className="p-6 bg-[#151719] border border-brass-hairline">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8a97e] mb-3">
                Verifiable Engineering Standards
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Color Binning</span>
                  <span className="text-white font-medium">MacAdam 2-Step</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Glare Index</span>
                  <span className="text-white font-medium">UGR &lt; 15 Certified</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Efficacy</span>
                  <span className="text-white font-medium">Up to 150 lm/W</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Flicker Standard</span>
                  <span className="text-white font-medium">IEEE 1789 Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Collaborate With Our Lighting Studio
          </h2>
          <p className="text-xs text-[#a5a299] max-w-md mx-auto mb-8">
            Whether you are designing a private alpine residence or a corporate tower, our technical team is ready to assist.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors"
            >
              BROWSE PRODUCTS
            </Link>
            <Link
              to="/request-a-quote"
              className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-white border border-white/20 hover:border-[#c8a97e] hover:text-[#c8a97e] bg-black/40 transition-colors"
            >
              REQUEST A QUOTE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
