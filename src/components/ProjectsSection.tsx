import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/lightingData';
import { ArrowUpRight, Sun, Moon, MapPin, Calendar, Compass, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  onRequestProjectInquiry?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onRequestProjectInquiry,
}) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [lightingMode, setLightingMode] = useState<'night' | 'dusk'>('night');

  const featuredProjects = PROJECTS_DATA.slice(0, 4);
  const activeProj = featuredProjects[activeProjectIndex] || featuredProjects[0];

  return (
    <section className="py-28 bg-[#0b0c0f] border-b border-hairline relative overflow-hidden">
      {/* Dynamic Lighting Glow */}
      <div
        className="absolute bottom-10 left-1/3 w-[600px] h-[350px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--dynamic-light-glow, rgba(200, 169, 126, 0.3)) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#c8a97e] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c8a97e]" />
              <span>Realized Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] font-display">
              GLOBAL CASE STUDIES & PROJECTS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Dusk / Night Lighting state simulator */}
            <div className="flex items-center gap-1 bg-black/60 border border-white/15 p-1 rounded-sm text-xs font-mono">
              <button
                onClick={() => setLightingMode('night')}
                className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                  lightingMode === 'night'
                    ? 'bg-[#c8a97e] text-black font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Night Beam</span>
              </button>
              <button
                onClick={() => setLightingMode('dusk')}
                className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
                  lightingMode === 'dusk'
                    ? 'bg-[#c8a97e] text-black font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Warm Dusk</span>
              </button>
            </div>

            <Link
              to="/projects"
              className="text-xs font-mono uppercase tracking-widest text-[#c8a97e] hover:underline flex items-center gap-1.5"
            >
              <span>All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Highlighted Project Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          {/* Main Visual */}
          <div className="lg:col-span-8 relative min-h-[460px] overflow-hidden rounded-sm border border-white/10 group">
            <img
              src={activeProj.image}
              alt={activeProj.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                lightingMode === 'dusk' ? 'brightness-105 contrast-100' : 'brightness-90 contrast-110'
              }`}
            />

            {/* Dynamic Lighting Overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                background:
                  lightingMode === 'night'
                    ? 'radial-gradient(circle at 60% 40%, var(--dynamic-light-color, rgba(200, 169, 126, 0.25)) 0%, transparent 65%)'
                    : 'radial-gradient(circle at 50% 30%, rgba(255, 200, 130, 0.2) 0%, transparent 70%)',
              }}
            />

            {/* Project Quick Meta Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-black/85 backdrop-blur-md border border-white/15">
              <div>
                <span className="text-[10px] font-mono text-[#c8a97e] uppercase tracking-wider block mb-1">
                  {activeProj.application} • {activeProj.location}
                </span>
                <h4 className="text-xl font-bold text-white">{activeProj.name}</h4>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/projects/${activeProj.id}`}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider border border-white/20 transition-colors"
                >
                  View Case Study
                </Link>
                {onRequestProjectInquiry && (
                  <button
                    onClick={onRequestProjectInquiry}
                    className="px-4 py-2 bg-[#c8a97e] hover:bg-[#b59569] text-black text-xs font-mono uppercase font-semibold tracking-wider transition-colors"
                  >
                    Inquire
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Project Details Sidebar */}
          <div className="lg:col-span-4 bg-[#121417] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#c8a97e] uppercase mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>Project Specifications</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{activeProj.name}</h3>

              <p className="text-xs text-[#a5a299] font-light leading-relaxed mb-6">
                {activeProj.overview}
              </p>

              {/* Architectural Credits */}
              <div className="space-y-3 py-4 border-y border-white/10 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-white/40">Architectural Lead</span>
                  <span className="text-white font-medium">{activeProj.architect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Location</span>
                  <span className="text-white font-medium">{activeProj.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Year</span>
                  <span className="text-white font-medium">{activeProj.year}</span>
                </div>
              </div>

              {/* Luminaires Specified */}
              <div className="mt-6">
                <div className="text-[11px] font-mono uppercase text-white/50 mb-2.5">
                  Luminaires Integrated
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeProj.fixturesUsed.map((fix, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[10px] font-mono bg-black/50 border border-white/15 text-[#f4f2ee]"
                    >
                      {fix}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Inquiry CTA */}
            {onRequestProjectInquiry && (
              <button
                onClick={onRequestProjectInquiry}
                className="w-full mt-8 py-3 bg-[#c8a97e] hover:bg-[#b59569] text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors text-center"
              >
                Inquire For Similar Project
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featuredProjects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveProjectIndex(idx)}
              className={`p-3 text-left border rounded-sm transition-all flex items-center gap-3 ${
                activeProjectIndex === idx
                  ? 'border-[#c8a97e] bg-white/10 text-white shadow-md'
                  : 'border-white/10 bg-[#121316] text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              <img
                src={proj.image}
                alt={proj.name}
                className="w-12 h-12 rounded-sm object-cover border border-white/15"
              />
              <div className="overflow-hidden">
                <div className="text-[10px] font-mono text-[#c8a97e] uppercase truncate">
                  {proj.application}
                </div>
                <div className="text-xs font-bold text-white truncate">{proj.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
