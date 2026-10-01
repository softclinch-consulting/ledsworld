import React, { useState } from 'react';
import { X, CheckCircle2, Send, Lightbulb } from 'lucide-react';
import { ProductItem } from '../types/lighting';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: ProductItem | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Commercial',
    budgetTier: 'Premium Architectural',
    fixtureScope: preselectedProduct ? preselectedProduct.name : 'Architectural Linear & Downlights',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#121316] border border-brass-hairline max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-black/40 border border-white/10 transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <CheckCircle2 className="w-14 h-14 text-[#c8a97e] mx-auto" />
            <h3 className="text-2xl font-bold text-white">Quote Request Submitted</h3>
            <p className="text-xs text-[#a5a299] max-w-sm mx-auto leading-relaxed">
              Our engineering team has received your project parameters. A detailed bill of materials and photometric schedule estimate will be prepared for you.
            </p>
            <div className="p-3 bg-[#181a1d] border border-hairline inline-block font-mono text-xs text-[#c8a97e]">
              Quote Ref: QTE-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#c8a97e] text-black hover:bg-[#dfc299] cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-semibold tracking-widest text-[#c8a97e] uppercase mb-1">
              Project Specification
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Request a Luminaire Quote
            </h3>
            <p className="text-xs text-[#a5a299] mb-6 leading-relaxed">
              Complete your project parameters below to receive photometric files (IES), custom extrusion pricing, and technical lead times.
            </p>

            {preselectedProduct && (
              <div className="mb-6 p-3 bg-[#181a1d] border border-white/10 flex items-center gap-3">
                <Lightbulb className="w-4 h-4 text-[#c8a97e]" />
                <div className="text-xs">
                  <span className="text-white/50">Inquiring for: </span>
                  <span className="text-white font-medium">{preselectedProduct.name} ({preselectedProduct.code})</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                    Firm / Studio
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Design Co."
                    className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@firm.com"
                    className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                    Application Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white focus:border-[#c8a97e] focus:outline-none cursor-pointer"
                  >
                    <option value="Residential">Residential Luxury</option>
                    <option value="Commercial">Commercial / Office</option>
                    <option value="Hospitality">Hospitality & Dining</option>
                    <option value="Retail">Retail & Showroom</option>
                    <option value="Architectural">Architectural Feature</option>
                    <option value="Outdoor">Outdoor & Landscape</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                    Estimated Fixture Scope
                  </label>
                  <input
                    type="text"
                    value={formData.fixtureScope}
                    onChange={(e) => setFormData({ ...formData, fixtureScope: e.target.value })}
                    placeholder="e.g. 80m Linear Cove + 40 Downlights"
                    className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/70 uppercase tracking-wider mb-1.5">
                  Project Notes & Timeline
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Include spatial square meters, target color temperature, or required delivery window..."
                  className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs font-semibold tracking-widest uppercase text-black bg-[#c8a97e] hover:bg-[#dfc299] transition-colors rounded-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>PREPARING ESTIMATE...</span>
                  ) : (
                    <>
                      <span>SUBMIT QUOTE REQUEST</span>
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
