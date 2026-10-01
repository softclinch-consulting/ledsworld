import React from 'react';
import { Link } from 'react-router-dom';
import { KNOWLEDGE_ARTICLES } from '../data/lightingData';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';

export const KnowledgeSection: React.FC = () => {
  return (
    <section id="knowledge" className="py-24 md:py-32 bg-[#0c0d0e] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-3">
              08 · Architectural Insights
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee]">
              UNDERSTAND LIGHT
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed hidden md:block">
              Essential optical guidelines, Kelvin psychology, and spatial engineering best practices for designers and architects.
            </p>
            <Link
              to="/knowledge"
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#c8a97e] border border-[#c8a97e]/40 hover:bg-[#c8a97e] hover:text-black transition-colors whitespace-nowrap"
            >
              All Articles →
            </Link>
          </div>
        </div>

        {/* Articles Grid (Links to /knowledge/:slug) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KNOWLEDGE_ARTICLES.slice(0, 6).map((article) => (
            <Link
              key={article.id}
              to={`/knowledge/${article.slug}`}
              className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/60 p-8 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#a5a299] mb-4">
                  <span className="text-[#c8a97e] font-semibold uppercase tracking-wider text-[11px]">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-white/40 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#f4f2ee] group-hover:text-[#c8a97e] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#a5a299] leading-relaxed mb-6 line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-hairline flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#f4f2ee] group-hover:text-[#c8a97e] transition-colors inline-flex items-center gap-1.5">
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#c8a97e] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <BookOpen className="w-4 h-4 text-white/20 group-hover:text-[#c8a97e] transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/knowledge"
            className="inline-block px-8 py-4 text-xs font-semibold tracking-widest uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors rounded-none"
          >
            EXPLORE ALL LIGHTING GUIDES
          </Link>
        </div>
      </div>
    </section>
  );
};
