import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { KNOWLEDGE_ARTICLES, PRODUCTS_CATALOG, ASSET_IMAGES } from '../data/lightingData';
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, Bookmark, Share2 } from 'lucide-react';

export const KnowledgeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug) || KNOWLEDGE_ARTICLES[0];
  const relatedArticles = KNOWLEDGE_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);
  const featuredProduct = PRODUCTS_CATALOG[0];

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/knowledge" className="hover:text-white transition-colors">Knowledge</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">{article.title}</span>
        </div>

        {/* Article Meta Header */}
        <div className="mb-10 pb-8 border-b border-hairline">
          <div className="flex items-center gap-3 text-xs text-[#c8a97e] font-semibold uppercase tracking-widest mb-3">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono text-white/50">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#b8b5ad] font-light leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Real Architectural Image Illustration */}
        <div className="relative aspect-[16/9] bg-[#16181b] border border-hairline overflow-hidden mb-12 shadow-2xl">
          <img
            src={ASSET_IMAGES.about}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-xs text-white/80">
            Real architectural lighting application · Optical study
          </div>
        </div>

        {/* Key Takeaways Callout */}
        <div className="p-6 md:p-8 bg-[#14161a] border-l-2 border-[#c8a97e] mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#c8a97e] mb-3">
            Key Architectural Takeaways
          </h2>
          <div className="space-y-2.5">
            {article.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-[#d8d5cc]">
                <CheckCircle2 className="w-4 h-4 text-[#c8a97e] shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base text-[#b8b5ad] leading-relaxed mb-16">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </article>

        {/* Internal Linking: Related Luminaire Specification */}
        <div className="p-8 bg-[#121316] border border-brass-hairline mb-16">
          <div className="text-xs font-semibold text-[#c8a97e] uppercase tracking-wider mb-2">
            Recommended Luminaire System
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {featuredProduct.name} ({featuredProduct.code})
          </h3>
          <p className="text-xs text-[#a5a299] mb-4">
            Engineered specifically to fulfill the optical criteria discussed in this guide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/products/${featuredProduct.slug}`}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#c8a97e] text-black hover:bg-[#dfc299] transition-colors"
            >
              View Fixture Specifications
            </Link>
            <Link
              to={`/request-a-quote?product=${encodeURIComponent(featuredProduct.name)}`}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border border-white/20 text-white hover:text-[#c8a97e] transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-hairline">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Related Architectural Guides</h3>
            <Link to="/knowledge" className="text-xs text-[#c8a97e] uppercase hover:underline">
              All Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={`/knowledge/${rel.slug}`}
                className="group p-6 bg-[#121316] border border-hairline hover:border-[#c8a97e] transition-all"
              >
                <div className="text-[11px] text-[#c8a97e] uppercase tracking-wider mb-1 font-mono">
                  {rel.category}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#c8a97e] transition-colors mb-2">
                  {rel.title}
                </h4>
                <div className="text-xs text-[#888]">{rel.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
