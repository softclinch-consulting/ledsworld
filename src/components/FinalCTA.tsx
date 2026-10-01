import React from 'react';
import { ASSET_IMAGES } from '../data/lightingData';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface FinalCTAProps {
  onRequestQuote: () => void;
  onTalkToTeam: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onRequestQuote,
  onTalkToTeam,
}) => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#0a0b0d] border-t border-hairline">
      {/* Background Architectural Lighting Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hospitality}
          alt="Architectural hospitality interior lighting ambiance"
          className="w-full h-full object-cover opacity-25 filter brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d] via-[#0a0b0d]/90 to-[#0a0b0d]/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div className="inline-block text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-4">
          Collaboration & Specification
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f4f2ee] max-w-3xl mx-auto leading-[1.08] mb-6">
          LET'S LIGHT YOUR NEXT SPACE.
        </h2>

        <p className="text-base sm:text-lg text-[#b8b5ad] font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Tell us about your project and discover the right lighting solution for your space. From custom fixture extrusions to complete photometrics, our architectural lighting team is ready.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onRequestQuote}
            className="px-8 py-4 text-xs font-semibold tracking-widest uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors rounded-none cursor-pointer shadow-lg hover:shadow-brass/20"
          >
            REQUEST A QUOTE
          </button>

          <button
            onClick={onTalkToTeam}
            className="px-8 py-4 text-xs font-semibold tracking-widest uppercase text-[#f4f2ee] border border-white/20 hover:border-[#c8a97e] hover:text-[#c8a97e] bg-black/50 backdrop-blur-sm transition-colors rounded-none cursor-pointer inline-flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>TALK TO OUR TEAM</span>
          </button>
        </div>
      </div>
    </section>
  );
};
