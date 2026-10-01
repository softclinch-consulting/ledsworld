import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_CATALOG } from '../data/lightingData';
import { ProductItem } from '../types/lighting';
import { ArrowUpRight, Sparkles, SlidersHorizontal, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FeaturedProductsProps {
  onRequestQuoteWithProduct?: (prod: ProductItem) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onRequestQuoteWithProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Downlights', 'Spotlights', 'Linear Lights', 'Track Lights'];

  const filteredProducts = PRODUCTS_CATALOG.filter((prod) => {
    if (activeCategory === 'All') return true;
    return prod.category === activeCategory;
  }).slice(0, 6);

  return (
    <section className="py-28 bg-[#090a0c] border-b border-hairline relative overflow-hidden">
      {/* Architectural Background Subtle Ambient Light Bloom */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--dynamic-light-glow, rgba(200, 169, 126, 0.25)) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#c8a97e] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c8a97e]" />
              <span>Flagship Luminaires</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] font-display">
              FEATURED ARCHITECTURAL LIGHTING
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm border transition-all ${
                  activeCategory === cat
                    ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-semibold shadow-[0_0_15px_rgba(200,169,126,0.3)]'
                    : 'border-white/10 bg-[#121316] text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => {
            const isHovered = hoveredId === prod.id;

            return (
              <div
                key={prod.id}
                onMouseEnter={() => setHoveredId(prod.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-[#121417] border border-white/10 hover:border-[#c8a97e]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Dynamic Lighting Beam from top edge when hovered */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none transition-opacity duration-700"
                  style={{
                    opacity: isHovered ? 0.45 : 0,
                    background: 'radial-gradient(ellipse at top, var(--dynamic-light-glow, rgba(200, 169, 126, 0.6)) 0%, transparent 75%)',
                    filter: 'blur(16px)',
                  }}
                />

                {/* Luminaire Image with zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/60 border-b border-white/10">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                  />

                  {/* Corner Code Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-[#c8a97e]">
                    {prod.code}
                  </div>

                  {/* Anti-Glare / Optical Badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>UGR &lt; 15</span>
                  </div>

                  {/* Light wash reflection at base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-transparent to-transparent opacity-80" />
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-[#c8a97e] uppercase tracking-wider mb-1">
                      {prod.category}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c8a97e] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#a5a299] line-clamp-2 font-light leading-relaxed mb-4">
                      {prod.description}
                    </p>

                    {/* Spec Highlights Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-white/80 py-3 border-y border-white/10 mb-4 bg-black/20 px-2.5 rounded-sm">
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase">Power</span>
                        {prod.specs.power}
                      </div>
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase">Lumens</span>
                        {prod.specs.lumens}
                      </div>
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase">CRI</span>
                        <span className="text-[#c8a97e]">{prod.specs.cri}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase">Beam</span>
                        {prod.specs.beamAngle}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={`/products/${prod.id}`}
                      className="flex-1 py-2.5 px-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-[#c8a97e] text-center text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {onRequestQuoteWithProduct && (
                      <button
                        onClick={() => onRequestQuoteWithProduct(prod)}
                        className="py-2.5 px-4 bg-[#c8a97e] hover:bg-[#b59569] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Quote
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Catalogue CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white/5 text-[#f4f2ee] border border-white/20 hover:border-[#c8a97e] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300"
          >
            <span>View Complete 60+ Luminaire Catalogue</span>
            <ArrowUpRight className="w-4 h-4 text-[#c8a97e]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
