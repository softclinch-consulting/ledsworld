import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KNOWLEDGE_ARTICLES } from '../data/lightingData';
import { ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Fundamentals', 'Optical Engineering', 'Design Strategy', 'Installation & Detailing', 'Product Selection', 'Commercial Standards'];

  const filtered = KNOWLEDGE_ARTICLES.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">Knowledge</span>
        </div>

        {/* Section Header */}
        <div className="mb-14 pb-8 border-b border-hairline">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
            Educational Resource Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] max-w-3xl mb-4 leading-tight">
            ARCHITECTURAL LIGHTING KNOWLEDGE
          </h1>
          <p className="text-sm md:text-base text-[#a5a299] max-w-2xl font-light leading-relaxed">
            Essential optical guidelines, Kelvin color temperature science, beam distribution geometry, and circadian wellness design for architects and lighting specifiers.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer border ${
                selectedCategory === cat
                  ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-bold'
                  : 'border-white/10 bg-[#121316] text-[#a5a299] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <Link
              key={article.id}
              to={`/knowledge/${article.slug}`}
              className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/60 p-8 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#888] mb-4">
                  <span className="text-[#c8a97e] font-semibold uppercase tracking-wider text-[11px]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-[#c8a97e] transition-colors mb-3 leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-[#a5a299] leading-relaxed line-clamp-3 mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-white group-hover:text-[#c8a97e]">
                <span>Read Guide</span>
                <ArrowUpRight className="w-4 h-4 text-[#c8a97e] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
