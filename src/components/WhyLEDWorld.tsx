import React from 'react';
import { BRAND_STRENGTHS } from '../data/lightingData';
import { ShieldCheck, Zap, Gauge, Compass, Cpu, Layers } from 'lucide-react';

export const WhyLEDWorld: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    QUALITY: <ShieldCheck className="w-5 h-5 text-[#c8a97e]" />,
    PERFORMANCE: <Gauge className="w-5 h-5 text-[#c8a97e]" />,
    EFFICIENCY: <Zap className="w-5 h-5 text-[#c8a97e]" />,
    DESIGN: <Compass className="w-5 h-5 text-[#c8a97e]" />,
    TECHNOLOGY: <Cpu className="w-5 h-5 text-[#c8a97e]" />,
    SOLUTIONS: <Layers className="w-5 h-5 text-[#c8a97e]" />,
  };

  return (
    <section id="why-us" className="py-28 md:py-36 bg-[#090a0c] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#c8a97e] uppercase mb-3">
              06 · Brand Values & Standard
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee] max-w-2xl leading-[1.12]">
              ENGINEERED FOR LIGHT. DESIGNED FOR SPACE.
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed">
            The intersection of rigorous semiconductor optical engineering and architectural purity.
          </p>
        </div>

        {/* 6 Core Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND_STRENGTHS.map((strength) => (
            <div
              key={strength.title}
              className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/40 p-8 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 bg-[#1a1c20] border border-white/10 group-hover:border-[#c8a97e]/40 transition-colors">
                    {iconMap[strength.title] || <Zap className="w-5 h-5 text-[#c8a97e]" />}
                  </div>
                  <span className="text-[11px] font-mono text-white/30 tracking-widest uppercase">
                    LED WORLD
                  </span>
                </div>

                <div className="text-xs font-semibold tracking-wider text-[#c8a97e] uppercase mb-1">
                  {strength.tagline}
                </div>
                <h3 className="text-xl font-bold text-[#f4f2ee] mb-3 group-hover:text-white transition-colors">
                  {strength.title}
                </h3>

                <p className="text-xs text-[#a5a299] leading-relaxed">
                  {strength.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-hairline flex items-center justify-between text-[11px] text-white/40">
                <span>Verified Metric</span>
                <span className="font-mono text-[#c8a97e]">ISO 9001 / CE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
