import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS_DATA, PRODUCTS_CATALOG } from '../data/lightingData';
import { MapPin, Calendar, Building, ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = PROJECTS_DATA.find((p) => p.slug === slug) || PROJECTS_DATA[0];
  const relatedProjects = PROJECTS_DATA.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">{project.name}</span>
        </div>

        {/* Hero Image & Headline */}
        <div className="mb-14">
          <div className="relative aspect-[21/9] w-full bg-[#181a1d] border border-hairline overflow-hidden mb-8 shadow-2xl">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c8a97e] block mb-2">
                {project.application} Spatial Case Study
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                {project.name}
              </h1>
            </div>
          </div>

          {/* Project Meta Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#121316] border border-hairline text-xs font-mono">
            <div>
              <span className="text-white/40 block text-[10px] uppercase font-sans mb-1">Location</span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>{project.location}</span>
              </span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase font-sans mb-1">Architecture Firm</span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>{project.architect}</span>
              </span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase font-sans mb-1">Sector Program</span>
              <span className="text-white font-medium">{project.application}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase font-sans mb-1">Year Completed</span>
              <span className="text-[#c8a97e] font-medium">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Narrative Split: Challenge vs Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-b border-hairline">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold text-white mb-2">Spatial Context & Brief</h2>
            <div className="text-xs text-[#c8a97e] uppercase tracking-wider">Architectural Scope</div>
          </div>
          <div className="lg:col-span-8 space-y-6 text-sm text-[#b8b5ad] leading-relaxed">
            <p className="text-base text-white font-normal">{project.overview}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="p-6 bg-[#151719] border border-hairline">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                  The Lighting Challenge
                </h3>
                <p className="text-xs text-[#a5a299] leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 bg-[#151719] border border-brass-hairline">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#c8a97e] mb-3">
                  The LED WORLD Approach
                </h3>
                <p className="text-xs text-[#d8d5cc] leading-relaxed">
                  {project.approach}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Installation Photographic Gallery */}
        <div className="py-16 border-b border-hairline">
          <div className="mb-8">
            <div className="text-xs font-semibold tracking-widest text-[#c8a97e] uppercase mb-1">
              Installation Photography
            </div>
            <h3 className="text-2xl font-bold text-white">Documented Spatial Views</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] bg-black overflow-hidden border border-hairline">
                <img
                  src={img}
                  alt={`${project.name} perspective ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Specified Luminaires */}
        <div className="py-16 border-b border-hairline">
          <div className="mb-8">
            <div className="text-xs font-semibold tracking-widest text-[#c8a97e] uppercase mb-1">
              Bill of Materials
            </div>
            <h3 className="text-2xl font-bold text-white">Products Specified in this Space</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.fixturesUsed.map((fix, idx) => (
              <div key={idx} className="p-5 bg-[#14161a] border border-hairline flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-[#c8a97e] mb-1">Fixture #{idx + 1}</div>
                  <div className="text-sm font-bold text-white">{fix}</div>
                </div>
                <Link
                  to="/products"
                  className="text-xs text-white/50 hover:text-white uppercase font-mono tracking-wider"
                >
                  Specs →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Bottom CTA */}
        <div className="py-16 text-center bg-[#131518] border border-brass-hairline p-8 md:p-12 my-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Specify a Similar Lighting Solution
          </h3>
          <p className="text-xs text-[#a5a299] max-w-md mx-auto mb-8">
            Our architectural lighting consultants can assist with photometric layouts, lux calculations, and customized extrusion lengths for your next project.
          </p>
          <Link
            to={`/request-a-quote?project=${encodeURIComponent(project.name)}`}
            className="inline-block px-8 py-4 text-xs font-semibold tracking-widest uppercase text-black bg-[#c8a97e] hover:bg-[#dfc299] transition-colors"
          >
            REQUEST CONSULTATION FOR THIS SPECIFICATION
          </Link>
        </div>
      </div>
    </div>
  );
};
