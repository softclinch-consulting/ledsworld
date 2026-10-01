import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APPLICATIONS_DATA, PRODUCTS_CATALOG, PROJECTS_DATA } from '../data/lightingData';
import { ArrowRight, CheckCircle2, Building, ShieldCheck, Box } from 'lucide-react';
import { Spatial3DSimulator } from '../components/Spatial3DSimulator';

export const ApplicationsPage: React.FC = () => {
  const [activeAppId, setActiveAppId] = useState<string>(APPLICATIONS_DATA[0].id);

  const activeApp = APPLICATIONS_DATA.find((a) => a.id === activeAppId) || APPLICATIONS_DATA[0];
  const matchingProjects = PROJECTS_DATA.filter((p) => p.application.toLowerCase() === activeApp.id.toLowerCase());

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">Applications</span>
        </div>

        {/* Section Header */}
        <div className="mb-14 pb-8 border-b border-hairline">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
            Sector Programs
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] max-w-3xl mb-4 leading-tight">
            LIGHTING DESIGNED AROUND HOW SPACES ARE USED.
          </h1>
          <p className="text-sm md:text-base text-[#a5a299] max-w-2xl font-light leading-relaxed">
            Every architectural typology demands distinct optical distributions, lux levels, and biological color temperatures. Explore our sector solutions.
          </p>
        </div>

        {/* Application Sector Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-hairline">
          {APPLICATIONS_DATA.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveAppId(app.id)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer border ${
                activeAppId === app.id
                  ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-bold'
                  : 'border-white/10 bg-[#121316] text-[#a5a299] hover:text-white'
              }`}
            >
              {app.title}
            </button>
          ))}
        </div>

        {/* Active Application In-Depth Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] bg-[#16181b] border border-hairline overflow-hidden shadow-2xl">
              <img
                src={activeApp.image}
                alt={activeApp.title}
                key={activeApp.image}
                className="w-full h-full object-cover animate-in fade-in duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white">
                <span className="font-semibold uppercase tracking-wider">{activeApp.title} Environment</span>
                <span className="font-mono text-[#c8a97e]">{activeApp.tagline}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#c8a97e] mb-1">
                {activeApp.tagline}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {activeApp.title} Lighting Strategy
              </h2>
              <p className="text-sm text-[#b8b5ad] leading-relaxed mb-6">
                {activeApp.description}
              </p>
            </div>

            <div className="p-5 bg-[#14161a] border border-hairline space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Required Technical Criteria:
              </div>
              <div className="space-y-2">
                {activeApp.keyRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#d8d5cc]">
                    <CheckCircle2 className="w-4 h-4 text-[#c8a97e] shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                Specified Luminaires:
              </div>
              <div className="space-y-1.5">
                {activeApp.recommendedFixtures.map((f, idx) => (
                  <div key={idx} className="text-xs font-mono text-[#c8a97e] p-2 bg-[#17191d] border border-white/10">
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                to={`/request-a-quote?application=${encodeURIComponent(activeApp.title)}`}
                className="w-full py-3.5 text-xs font-semibold tracking-widest uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors text-center block"
              >
                REQUEST {activeApp.title} LIGHTING SCHEDULE
              </Link>
            </div>
          </div>
        </div>

        {/* Real-Time 3D Spatial Lighting Simulator */}
        <div className="mb-20">
          <Spatial3DSimulator />
        </div>

        {/* Real Projects for this Application */}
        {matchingProjects.length > 0 && (
          <div className="pt-12 border-t border-hairline">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">
                Completed {activeApp.title} Installations
              </h3>
              <Link to="/projects" className="text-xs text-[#c8a97e] uppercase hover:underline">
                View All Projects →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {matchingProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.slug}`}
                  className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/60 p-6 flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] bg-black overflow-hidden mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#c8a97e] uppercase mb-1">{p.location}</div>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#c8a97e] transition-colors mb-2">{p.name}</h4>
                    <p className="text-xs text-[#a5a299] line-clamp-2">{p.overview}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-hairline text-xs font-semibold uppercase text-white flex items-center justify-between">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c8a97e]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
