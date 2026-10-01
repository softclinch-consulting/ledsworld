import React from 'react';
import { Link } from 'react-router-dom';
import { ASSET_IMAGES } from '../data/lightingData';
import { ArrowRight, Layers, Home, Target } from 'lucide-react';

export const FindYourLight: React.FC = () => {
  const cards = [
    {
      title: 'SHOP BY PRODUCT',
      subtitle: 'Explore Precision Fixtures',
      description: 'Continuous linear extrusions, darklight downlights, magnetic tracks, and architectural recessed systems.',
      image: ASSET_IMAGES.linearProduct,
      link: '/products',
      tag: '12 Systems Available',
      icon: <Layers className="w-5 h-5 text-[#c8a97e]" />
    },
    {
      title: 'SHOP BY SPACE',
      subtitle: 'Engineered for Context',
      description: 'Living rooms, kitchens, corporate workspaces, hospitality lounges, and exterior facade architecture.',
      image: ASSET_IMAGES.livingRoom,
      link: '/applications',
      tag: '10 Spatial Programs',
      icon: <Home className="w-5 h-5 text-[#c8a97e]" />
    },
    {
      title: 'SHOP BY PURPOSE',
      subtitle: 'Calibrate the Experience',
      description: 'Ambient base warmth, high-punch accent focal points, glare-free task planes, and sculptural statement halos.',
      image: ASSET_IMAGES.diningKitchen,
      link: '/lighting/ambient-lighting',
      tag: '7 Light Typologies',
      icon: <Target className="w-5 h-5 text-[#c8a97e]" />
    },
  ];

  return (
    <section id="find-your-light" className="py-24 md:py-32 bg-[#0c0d0e] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-3">
              01 · Discovery Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee]">
              FIND YOUR LIGHT.
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed">
            Explore lighting by product, space or purpose. Real architectural illumination tailored to human ritual and spatial volume.
          </p>
        </div>

        {/* 3 Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group relative bg-[#121316] border border-hairline hover:border-[#c8a97e]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-brass/10"
            >
              {/* Card Real Photograph */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#181a1d]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur-sm border border-white/10">
                  {card.icon}
                </div>
                <div className="absolute bottom-3 right-4 text-[11px] font-mono text-[#c8a97e] uppercase tracking-wider">
                  {card.tag}
                </div>
              </div>

              {/* Card Text & Action */}
              <div className="p-8 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-[#c8a97e] uppercase mb-1">
                    {card.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-[#f4f2ee] group-hover:text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#a5a299] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#f4f2ee] group-hover:text-[#c8a97e] transition-colors inline-flex items-center gap-2">
                    <span>EXPLORE PATH</span>
                    <ArrowRight className="w-4 h-4 text-[#c8a97e] transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
