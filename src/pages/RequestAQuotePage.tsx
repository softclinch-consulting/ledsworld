import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, FileText, ArrowRight, Lightbulb } from 'lucide-react';

export const RequestAQuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product') || '';
  const applicationParam = searchParams.get('application') || '';
  const projectParam = searchParams.get('project') || '';
  const requirementParam = searchParams.get('requirement') || '';

  const initialRequirement = productParam
    ? `Specification Quote: ${productParam}`
    : applicationParam
    ? `${applicationParam} Architectural Lighting Schedule`
    : projectParam
    ? `Reference Project Specification: ${projectParam}`
    : requirementParam
    ? requirementParam
    : 'Continuous Linear Extrusions & Darklight Downlights';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    projectType: applicationParam || 'Commercial',
    requirement: initialRequirement,
    estimatedScope: '50 - 150 Fixture Units / 500m²',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const projectTypes = [
    'Residential',
    'Commercial',
    'Hospitality',
    'Retail',
    'Architectural',
    'Outdoor',
    'Industrial',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRefId(`LW-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">Request a Quote</span>
        </div>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-hairline">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
            Commercial & Architectural Specification
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] mb-4">
            LET'S LIGHT YOUR SPACE.
          </h1>
          <p className="text-sm md:text-base text-[#a5a299] max-w-2xl font-light leading-relaxed">
            Submit your spatial parameters, project drawings, or bill of materials. Our engineering team prepares IES photometric schedules, custom extrusion lengths, and trade pricing.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 md:p-14 bg-[#121316] border border-brass-hairline text-center space-y-5 animate-in fade-in duration-300">
            <CheckCircle2 className="w-16 h-16 text-[#c8a97e] mx-auto" />
            <h2 className="text-3xl font-bold text-white">Thank You.</h2>
            <p className="text-sm text-[#b8b5ad] max-w-md mx-auto leading-relaxed">
              Our architectural lighting team will review your requirement and get back to you within one business day with photometric data and trade quotation.
            </p>
            <div className="p-3 bg-[#181a1d] border border-hairline inline-block font-mono text-xs text-[#c8a97e]">
              Inquiry Reference: {refId}
            </div>
            <div className="pt-6 flex justify-center gap-4">
              <Link
                to="/products"
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase bg-[#c8a97e] text-black hover:bg-[#dfc299] transition-colors"
              >
                Continue Browsing Products
              </Link>
              <Link
                to="/"
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase border border-white/20 text-white hover:text-[#c8a97e] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-[#121316] border border-hairline p-8 md:p-12 shadow-2xl">
            {productParam && (
              <div className="mb-8 p-4 bg-[#181a1d] border-l-2 border-[#c8a97e] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-4 h-4 text-[#c8a97e]" />
                  <span className="text-xs text-white">
                    Pre-selected Product: <strong>{productParam}</strong>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#c8a97e] uppercase">Direct Luminaire Inquiry</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Vance"
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    Company / Architectural Studio
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Studio Vance Architecture"
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="david@firm.com"
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    City / Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. New York, USA"
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white focus:border-[#c8a97e] focus:outline-none cursor-pointer"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#181a1d]">
                        {type} Project
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    Estimated Fixture Scope / Area
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedScope}
                    onChange={(e) => setFormData({ ...formData, estimatedScope: e.target.value })}
                    placeholder="e.g. 50 linear meters + 30 downlights"
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                  Product / Lighting Requirement *
                </label>
                <input
                  type="text"
                  required
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  placeholder="Specify product name, fixture types, or design requirement"
                  className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                  Project Details & Specifications *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe ceiling height, target lux levels, timeline, required CCT (2700K / 3000K / 4000K), or photometric support needed..."
                  className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xs font-semibold tracking-widest uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors rounded-none cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <span>PREPARING SPECIFICATION...</span>
                  ) : (
                    <>
                      <span>SUBMIT ENQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
