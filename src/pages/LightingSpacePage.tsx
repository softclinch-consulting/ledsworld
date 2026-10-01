import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SPACES_DATA, PURPOSES_DATA, PRODUCTS_CATALOG } from '../data/lightingData';
import { Check, ArrowRight, Lightbulb, Box } from 'lucide-react';
import { Spatial3DSimulator } from '../components/Spatial3DSimulator';

export const LightingSpacePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Check if it's a space or purpose
  const matchedSpace = SPACES_DATA.find((s) => s.slug === slug);
  const matchedPurpose = PURPOSES_DATA.find((p) => p.slug === slug);

  const title = matchedSpace ? `${matchedSpace.name} Lighting` : matchedPurpose ? matchedPurpose.name : 'Spatial Lighting Program';
  const tagline = matchedSpace ? matchedSpace.tagline : matchedPurpose ? matchedPurpose.tagline : 'Architectural Illumination';
  const description = matchedSpace ? matchedSpace.description : matchedPurpose ? matchedPurpose.description : '';
  const image = matchedSpace ? matchedSpace.image : matchedPurpose ? matchedPurpose.image : '';

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 text-xs text-[#888] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 pb-12 border-b border-hairline">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase">
              Spatial Illumination Architecture
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {title.toUpperCase()}
            </h1>
            <p className="text-base text-[#c8a97e] font-medium">
              {tagline}
            </p>
            <p className="text-sm text-[#a5a299] leading-relaxed">
              {description}
            </p>

            <div className="pt-4 flex gap-4">
              <Link
                to={`/request-a-quote?requirement=${encodeURIComponent(title)}`}
                className="px-6 py-3.5 text-xs font-semibold tracking-widest uppercase text-black bg-[#c8a97e] hover:bg-[#dfc299] transition-colors"
              >
                REQUEST {title.toUpperCase()} SPECIFICATION
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] bg-[#16181b] border border-hairline overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-mono text-[#c8a97e]">
                Verified Real-World Installation
              </div>
            </div>
          </div>
        </div>

        {/* 3D Interactive Spatial Illumination Simulation */}
        <div className="mb-16">
          <Spatial3DSimulator />
        </div>

        {/* Recommended Luminaires for this Space */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Recommended Luminaire Systems</h2>
            <Link to="/products" className="text-xs text-[#c8a97e] uppercase tracking-wider hover:underline">
              Browse Catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS_CATALOG.slice(0, 3).map((prod) => (
              <div key={prod.id} className="bg-[#121316] border border-hairline p-6 flex flex-col justify-between">
                <div className="aspect-[4/3] bg-black overflow-hidden mb-4">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#c8a97e] mb-1">{prod.code}</div>
                  <h3 className="text-base font-bold text-white mb-2">{prod.name}</h3>
                  <p className="text-xs text-[#a5a299] mb-4">{prod.description}</p>
                </div>
                <Link
                  to={`/products/${prod.slug}`}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-[#c8a97e] hover:text-black text-white text-center transition-colors block"
                >
                  View Specifications
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
