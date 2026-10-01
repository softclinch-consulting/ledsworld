import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../data/lightingData';
import { ArrowUpRight, Layers, Sliders, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCategoriesProps {
  onSelectCategory?: (category: string) => void;
  onViewAllProducts?: () => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({
  onSelectCategory,
  onViewAllProducts,
}) => {
  const navigate = useNavigate();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    } else {
      navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    }
  };

  return (
    <section className="py-28 bg-[#0c0d10] border-b border-hairline relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#c8a97e] mb-2">
              Optical Classification
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] font-display">
              SHOP BY LUMINAIRE SYSTEM
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a5a299] max-w-md font-light leading-relaxed">
            Modular downlights, seamless magnetic track profiles, grazing linear strips, 
            and precision accent spotlights engineered for architectural cohesion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isHovered = hoveredSlug === cat.slug;

            return (
              <div
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.name)}
                onMouseEnter={() => setHoveredSlug(cat.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="group relative h-96 bg-[#131518] border border-white/10 hover:border-[#c8a97e]/60 overflow-hidden cursor-pointer transition-all duration-500 flex flex-col justify-end p-8"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.85]"
                />

                {/* Dark Architectural Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Dynamic Lighting Cone Effect when hovered */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    opacity: isHovered ? 0.35 : 0,
                    background: 'radial-gradient(circle at 50% 10%, var(--dynamic-light-glow, rgba(200, 169, 126, 0.7)) 0%, transparent 60%)',
                  }}
                />

                {/* Top Details */}
                <div className="relative z-10 mb-auto flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-black/60 border border-white/15 text-[#c8a97e] backdrop-blur-sm">
                    {cat.count} MODELS
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#c8a97e] group-hover:text-black group-hover:border-[#c8a97e] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#c8a97e] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#a5a299] font-light leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-[#c8a97e] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <span>Explore System</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => (onViewAllProducts ? onViewAllProducts() : navigate('/products'))}
            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#c8a97e] text-xs font-mono uppercase tracking-widest transition-all"
          >
            Browse Complete Luminaire Library
          </button>
        </div>
      </div>
    </section>
  );
};
