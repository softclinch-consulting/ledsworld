import React from 'react';
import { Link } from 'react-router-dom';
import { PURPOSES_DATA } from '../data/lightingData';
import { ArrowRight, Lightbulb } from 'lucide-react';

export const ShopByPurpose: React.FC = () => {
  return (
    <section id="shop-by-purpose" className="py-24 md:py-32 bg-[#0c0d0e] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-3">
              04 · Lighting Typologies
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee]">
              SHOP BY PURPOSE.
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed">
            Choose lighting based on the desired emotional and functional experience of the architectural envelope.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PURPOSES_DATA.map((purpose) => (
            <Link
              key={purpose.slug}
              to={`/lighting/${purpose.slug}`}
              className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/50 p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-[#191b1f] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#c8a97e] transition-colors">
                  <Lightbulb className="w-5 h-5 text-[#c8a97e]" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#c8a97e] transition-colors mb-2">
                  {purpose.name}
                </h3>

                <p className="text-xs text-[#a5a299] leading-relaxed mb-6">
                  {purpose.tagline}
                </p>

                <div className="text-[11px] text-[#777] border-t border-hairline pt-3 mb-4">
                  <span className="block text-[10px] uppercase text-white/40 mb-1">Engineered Fixtures</span>
                  <span className="font-mono text-[#d4d1c9]">{purpose.fixtures.join(' · ')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#f4f2ee] group-hover:text-[#c8a97e]">
                <span>Explore Purpose</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
