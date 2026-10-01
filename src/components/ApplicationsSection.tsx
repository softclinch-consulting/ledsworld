import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APPLICATIONS_DATA } from '../data/lightingData';
import { ArrowRight, Check, Sparkles, Building2, Home, Hotel, Landmark } from 'lucide-react';

interface ApplicationsSectionProps {
  onRequestQuote?: () => void;
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  onRequestQuote,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentApp = APPLICATIONS_DATA[activeTab] || APPLICATIONS_DATA[0];

  const appIcons = [Home, Hotel, Building2, Landmark];

  return (
    <section className="py-28 bg-[#090a0d] border-b border-hairline relative overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, var(--dynamic-light-glow, rgba(200, 169, 126, 0.4)) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#c8a97e] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c8a97e]" />
              <span>Tailored Environments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] font-display">
              ARCHITECTURAL APPLICATIONS
            </h2>
          </div>
          <Link
            to="/applications"
            className="text-xs font-mono uppercase tracking-widest text-[#c8a97e] hover:underline flex items-center gap-2"
          >
            <span>View All Sectors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {APPLICATIONS_DATA.map((app, idx) => {
            const Icon = appIcons[idx % appIcons.length];
            const isActive = activeTab === idx;

            return (
              <button
                key={app.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 text-left border rounded-sm transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? 'border-[#c8a97e] bg-white/10 shadow-[0_0_20px_rgba(200,169,126,0.15)] text-white'
                    : 'border-white/10 bg-[#121316] text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                <div
                  className={`p-2 rounded-sm ${
                    isActive ? 'bg-[#c8a97e] text-black' : 'bg-white/5 text-white/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#c8a97e] uppercase">Sector 0{idx + 1}</div>
                  <div className="text-xs font-bold truncate">{app.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Application Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-[#121418] border border-white/10 p-6 sm:p-10 shadow-2xl">
          {/* Left Column: Image with dynamic lighting wash */}
          <div className="lg:col-span-7 relative min-h-[380px] overflow-hidden rounded-sm border border-white/10 group">
            <img
              src={currentApp.image}
              alt={currentApp.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
            />
            {/* Dynamic Light Beam overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'linear-gradient(135deg, var(--dynamic-light-color, rgba(200, 169, 126, 0.2)) 0%, transparent 60%)',
              }}
            />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-[#c8a97e]">
              {currentApp.tagline}
            </div>
          </div>

          {/* Right Column: Specifications & Requirements */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#c8a97e] uppercase tracking-wider mb-2">
                Engineered Performance
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {currentApp.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a5a299] font-light leading-relaxed mb-6">
                {currentApp.description}
              </p>

              {/* Key Technical Requirements */}
              <div className="mb-6">
                <div className="text-[11px] font-mono uppercase text-white/50 mb-3 tracking-wider">
                  Critical Optical Metrics
                </div>
                <div className="space-y-2">
                  {currentApp.keyRequirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/90">
                      <div className="mt-0.5 p-0.5 rounded-full bg-[#c8a97e]/20 text-[#c8a97e]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Fixtures */}
              <div className="mb-8">
                <div className="text-[11px] font-mono uppercase text-white/50 mb-2 tracking-wider">
                  Compatible Systems
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentApp.recommendedFixtures.map((fix, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono bg-black/40 border border-white/15 text-[#f4f2ee]"
                    >
                      {fix}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
              {onRequestQuote && (
                <button
                  onClick={onRequestQuote}
                  className="flex-1 py-3 px-4 bg-[#c8a97e] hover:bg-[#b59569] text-black text-xs font-mono font-semibold uppercase tracking-wider transition-colors text-center shadow-md"
                >
                  Request Application Schedule
                </button>
              )}
              <Link
                to="/applications"
                className="py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-mono uppercase tracking-wider transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
