import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/lightingData';
import { Eye, Check } from 'lucide-react';

export const LightingInRealSpaces: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'ambient' | 'accent' | 'decorative' | 'task' | 'architectural'>('ambient');

  const layers = [
    {
      id: 'ambient',
      label: 'Ambient Layer',
      title: 'Perimeter Cove & Soft Base Illumination',
      image: ASSET_IMAGES.about,
      explanation: 'Soft indirect light washes vertical wall planes, lifting the perceived ceiling line and establishing calm visual comfort without pinprick ceiling glare.',
      specs: '2700K Warm White · 180° Diffuse Wash · 12W/m COB Strip',
      fixture: 'LW-ST12 Pro-Cove Extrusion'
    },
    {
      id: 'accent',
      label: 'Accent Layer',
      title: 'High-Contrast Wall Grazing & Art Punch',
      image: ASSET_IMAGES.hospitality,
      explanation: 'Precision 15° beam optics highlight vertical fluted stone textures and custom artwork with 5:1 contrast ratios, giving the architecture three-dimensional drama.',
      specs: '3000K Crisp Focus · 15° Narrow Optical Lens · UGR < 12',
      fixture: 'LW-TR30 48V Magnetic Spot Matrix'
    },
    {
      id: 'decorative',
      label: 'Decorative Layer',
      title: 'Sculptural Brass Statement & Warm Focal Gravity',
      image: ASSET_IMAGES.diningKitchen,
      explanation: 'Suspended architectural rings and bespoke metalwork anchor social spaces with warm focal presence while delivering balanced volumetric diffuse glow.',
      specs: '2400K Warm Dim · Hand-Rubbed Solid Brass · 360° Volumetric',
      fixture: 'LW-PD05 Aura Suspended Ring'
    },
    {
      id: 'task',
      label: 'Task Layer',
      title: 'Micro-Prismatic Glare-Free Plane Lighting',
      image: ASSET_IMAGES.officeLinear,
      explanation: 'Micro-prismatic optical lenses focus comfortable 400 lux directly onto desks and kitchen preparation surfaces with zero screen reflections.',
      specs: '3500K Clean Clarity · UGR < 16 Workspace Compliance · 24W/m',
      fixture: 'LW-LN204 Architectural Linear System'
    },
    {
      id: 'architectural',
      label: 'Architectural Layer',
      title: 'Trimless Gypsum Reveal & Monolithic Detailing',
      image: ASSET_IMAGES.villa,
      explanation: 'Plaster-in knife-edge extrusions conceal all luminaire bezels inside architectural reveal joints, making the light source completely invisible to occupants.',
      specs: 'Full-Spectrum CRI 98+ · 2-Step MacAdam Binning · Trimless Gypsum',
      fixture: 'LW-DL08 Deep Darklight Downlight'
    },
  ];

  const current = layers.find((l) => l.id === activeLayer) || layers[0];

  return (
    <section className="py-24 md:py-32 bg-[#0a0b0d] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-3">
              05 · Optical Transformation
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee]">
              SEE THE DIFFERENCE LIGHT MAKES.
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed">
            Architecture remains dormant until activated by intentional light. Switch layers below to observe spatial transformation.
          </p>
        </div>

        {/* Interactive Layer Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {layers.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayer(l.id as any)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer border ${
                activeLayer === l.id
                  ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-bold'
                  : 'border-white/10 bg-[#121316] text-[#a5a299] hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Big Editorial Photographic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121316] border border-hairline p-6 md:p-10">
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#181a1d]">
            <img
              src={current.image}
              alt={current.title}
              key={current.image}
              className="w-full h-full object-cover transition-opacity duration-700 animate-in fade-in"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-mono text-[#c8a97e] border border-white/10">
              Active Strategy: {current.label}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-semibold">{current.title}</span>
              <span className="font-mono text-[#c8a97e]">{current.fixture}</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#c8a97e] mb-2">
                Spatial Analysis
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                {current.title}
              </h3>
              <p className="text-xs text-[#a5a299] leading-relaxed mb-6">
                {current.explanation}
              </p>

              <div className="p-4 bg-[#181a1d] border-l-2 border-[#c8a97e] space-y-2 text-xs">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white">
                  Photometric Calibration:
                </div>
                <div className="font-mono text-[#c8a97e]">{current.specs}</div>
                <div className="text-[#888]">Specified Fixture: <strong className="text-white">{current.fixture}</strong></div>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline">
              <span className="text-[11px] text-white/50 block mb-2">
                Real-world installation photography · Uncompressed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
