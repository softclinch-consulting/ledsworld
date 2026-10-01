import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/lightingData';
import { MapPin, ArrowUpRight, Calendar } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const categories = ['All', 'Residential', 'Hospitality', 'Commercial', 'Retail', 'Architectural', 'Outdoor'];

  const filtered = PROJECTS_DATA.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.application.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">Projects</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
              Architectural Portfolio
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee]">
              LIGHT IN REAL SPACES
            </h1>
          </div>
          <p className="text-sm text-[#a5a299] max-w-md font-light leading-relaxed">
            Selected private villas, boutique hospitality sanctums, and corporate headquarters illuminated by LED WORLD systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer border ${
                selectedFilter === cat
                  ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-bold'
                  : 'border-white/10 bg-[#121316] text-[#a5a299] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/50 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#181a1d]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white border border-white/10">
                  {project.application}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1.5 text-[#c8a97e]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </span>
                  <span className="font-mono text-white/60">{project.year}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-[#c8a97e] transition-colors mb-3">
                    {project.name}
                  </h2>
                  <div className="text-xs text-[#b8b5ad] mb-4">
                    <span className="text-white/40 block text-[10px] uppercase mb-1">Lighting Strategy</span>
                    {project.lightingSolution}
                  </div>
                  <p className="text-xs text-[#a5a299] line-clamp-3 leading-relaxed mb-6">
                    {project.overview}
                  </p>
                </div>

                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white group-hover:text-[#c8a97e] transition-colors"
                  >
                    <span>VIEW PROJECT CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4 text-[#c8a97e]" />
                  </Link>
                  <span className="text-xs text-white/40 font-mono">{project.architect}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
