import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/lightingData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onDiscoverClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDiscoverClick }) => {
  const [showFullManifesto, setShowFullManifesto] = useState(false);

  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#0c0d0e] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#c8a97e] uppercase mb-3">
              01 · The Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee] max-w-xl leading-[1.12]">
              LIGHTING THAT SHAPES SPACE
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed">
            Light is not merely illumination—it is the invisible material that defines volume, texture, intimacy, and human focus.
          </p>
        </div>

        {/* Editorial Layout: Large Imagery + Narrative Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Architectural Photography */}
          <div className="lg:col-span-7 relative group">
            <div className="relative overflow-hidden aspect-[16/10] bg-[#151719] border border-hairline">
              <img
                src={ASSET_IMAGES.about}
                alt="Architectural interior with minimalist warm linear cove LED illumination"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#f4f2ee]">
                <span className="tracking-widest uppercase text-[11px] text-[#c8a97e]">Spatial Geometry & Illumination</span>
                <span className="font-mono text-white/60">2700K · CRI 98+</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Brand Pillar Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-lg md:text-xl text-[#f4f2ee] font-medium leading-relaxed mb-6">
              LED WORLD was founded on a singular conviction: when lighting is engineered with architectural discipline, it transforms how people experience space.
            </p>

            <div className="space-y-4 text-sm text-[#b8b5ad] font-light leading-relaxed mb-8">
              <p>
                We unite advanced semiconductor optics, cold-forged thermal management, and seamless trimless fixtures to serve the world’s most demanding architects and lighting consultants.
              </p>
              <p>
                Every luminaire is designed to disappear into ceiling planes and reveal joints—leaving only pure, glare-free, biologically calibrated light.
              </p>
            </div>

            {/* Architectural Rigor Spec Numbers */}
            <div className="grid grid-cols-2 gap-6 py-6 border-y border-hairline mb-8 text-left">
              <div>
                <div className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-[#f4f2ee] tabular-nums">
                  Ra &gt; 98
                </div>
                <div className="text-xs text-[#a5a299] mt-1 uppercase tracking-wider">
                  Full Spectrum Color Fidelity
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-[#f4f2ee] tabular-nums">
                  UGR &lt; 15
                </div>
                <div className="text-xs text-[#a5a299] mt-1 uppercase tracking-wider">
                  Engineered Glare Cut-Off
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-[#f4f2ee] tabular-nums">
                  150 lm/W
                </div>
                <div className="text-xs text-[#a5a299] mt-1 uppercase tracking-wider">
                  System Efficacy
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-[#f4f2ee] tabular-nums">
                  50,000h
                </div>
                <div className="text-xs text-[#a5a299] mt-1 uppercase tracking-wider">
                  L90B10 Calibrated Lifespan
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={() => {
                  if (onDiscoverClick) {
                    onDiscoverClick();
                  } else {
                    setShowFullManifesto(!showFullManifesto);
                  }
                }}
                className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-[#f4f2ee] hover:text-[#c8a97e] transition-colors group cursor-pointer"
              >
                <span>{showFullManifesto ? 'CLOSE MANIFESTO' : 'DISCOVER LED WORLD'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#c8a97e]" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Manifesto Drawer */}
        {showFullManifesto && (
          <div className="mt-12 p-8 md:p-12 bg-[#151719] border border-brass-hairline animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="max-w-3xl">
              <div className="text-xs text-[#c8a97e] font-semibold tracking-widest uppercase mb-2">
                Brand Manifesto
              </div>
              <h3 className="text-2xl font-bold text-[#f4f2ee] mb-4">
                The Anatomy of Invisibility
              </h3>
              <p className="text-sm text-[#b8b5ad] leading-relaxed mb-4">
                In architectural lighting, perfection is achieved not when there is nothing left to add, but when the luminaire itself vanishes. Our fixtures feature plaster-in perforated wings that skim effortlessly into ceiling gypsum, knife-edge linear coves with micro-prismatic optics, and deep baffle downlights that appear pitch black from across the room even at maximum output.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-hairline text-xs text-[#f4f2ee]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c8a97e] shrink-0" />
                  <span>MacAdam 2-Step Binning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c8a97e] shrink-0" />
                  <span>DALI-2 / Casambi Controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c8a97e] shrink-0" />
                  <span>Custom Extrusion Lengths</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
