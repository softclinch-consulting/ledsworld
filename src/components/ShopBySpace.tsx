import React from 'react';
import { Link } from 'react-router-dom';
import { SPACES_DATA } from '../data/lightingData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const ShopBySpace: React.FC = () => {
  return (
    <section id="shop-by-space" className="py-24 md:py-32 bg-[#090a0c] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-3">
              03 · Spatial Programs
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee]">
              LIGHTING FOR EVERY SPACE.
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed">
            Lighting designed around how spaces look, feel, and perform. From intimate residential sanctuaries to monumentally scaled public architecture.
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPACES_DATA.map((space) => (
            <div
              key={space.slug}
              className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Space Real Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#181a1d]">
                <img
                  src={space.image}
                  alt={`${space.name} architectural lighting`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-85" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 border border-white/10">
                    {space.name}
                  </span>
                </div>
                <div className="absolute bottom-3 right-4 text-[10px] font-mono text-[#c8a97e] bg-black/60 px-2 py-0.5 border border-white/10">
                  {space.recommendedCCT}
                </div>
              </div>

              {/* Space Description */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-xs font-medium text-[#c8a97e] mb-2">
                    {space.tagline}
                  </div>
                  <p className="text-xs text-[#a5a299] leading-relaxed mb-6">
                    {space.description}
                  </p>

                  <div className="border-t border-hairline pt-3 mb-4 space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 block">
                      Recommended System:
                    </span>
                    <div className="text-xs font-mono text-[#d8d5cc]">
                      {space.keyFixtures.join(' · ')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-hairline">
                  <Link
                    to={`/lighting/${space.slug}`}
                    className="w-full py-2.5 text-xs font-semibold tracking-wider uppercase text-[#f4f2ee] hover:text-black hover:bg-[#c8a97e] border border-white/15 hover:border-[#c8a97e] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>EXPLORE {space.name.toUpperCase()} LIGHTING</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
