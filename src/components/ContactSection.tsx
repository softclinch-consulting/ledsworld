import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: 'Commercial',
    requirement: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const projectTypes = [
    'Residential',
    'Commercial',
    'Hospitality',
    'Retail',
    'Architectural',
    'Outdoor',
    'Other',
  ];

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#0c0d0e] border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-hairline">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#c8a97e] uppercase mb-3">
              08 · Specification & Inquiries
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4f2ee]">
              START A CONVERSATION
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#a5a299] max-w-md font-light leading-relaxed">
            Connect with our architectural lighting consultants for project specifications, schedule reviews, and sample requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Business Details (Clearly marked placeholders) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#f4f2ee] mb-3">
                Architectural Studio & Inquiries
              </h3>
              <p className="text-xs text-[#a5a299] leading-relaxed mb-8">
                Our technical team supports architects, interior designers, and MEP consultants worldwide. Send your project plans or schedule a lighting design review.
              </p>
            </div>

            <div className="space-y-6 text-xs border-y border-hairline py-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-[#c8a97e] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium uppercase tracking-wider mb-1">
                    Design Studio & Showroom
                  </div>
                  <div className="text-[#a5a299]">450 Lumina Way, Suite 800</div>
                  <div className="text-[#a5a299]">New York, NY 10011 [Placeholder]</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-[#c8a97e] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium uppercase tracking-wider mb-1">
                    Direct Line
                  </div>
                  <div className="text-[#a5a299] font-mono">+1 (800) 555-0199 [Placeholder]</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-[#c8a97e] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium uppercase tracking-wider mb-1">
                    Specifications & Plans
                  </div>
                  <div className="text-[#a5a299]">architectural@ledworld.example.com [Placeholder]</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-4 h-4 text-[#c8a97e] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium uppercase tracking-wider mb-1">
                    Consultation Hours
                  </div>
                  <div className="text-[#a5a299]">Monday – Friday: 08:30 – 18:00 EST</div>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div>
              <div className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-3">
                Follow Design Updates
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-[#c8a97e]">
                <a href="#hero" className="hover:underline">LinkedIn</a>
                <span className="text-white/20">/</span>
                <a href="#hero" className="hover:underline">Instagram</a>
                <span className="text-white/20">/</span>
                <a href="#hero" className="hover:underline">ArchDaily</a>
                <span className="text-white/20">/</span>
                <a href="#hero" className="hover:underline">Pinterest</a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7 bg-[#121316] border border-hairline p-8 md:p-12">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-[#c8a97e] mx-auto" />
                <h4 className="text-2xl font-bold text-white">Enquiry Received</h4>
                <p className="text-xs text-[#a5a299] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. An architectural lighting specialist will review your {formData.projectType.toLowerCase()} requirements and respond within one business day.
                </p>
                <div className="text-[11px] font-mono text-[#c8a97e]">
                  Reference ID: LW-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      phone: '',
                      email: '',
                      projectType: 'Commercial',
                      requirement: '',
                      message: '',
                    });
                  }}
                  className="mt-6 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
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
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                      Architecture / Firm Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Studio Vesper Architects"
                      className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@firm.com"
                      className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none transition-colors"
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
                      className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white focus:border-[#c8a97e] focus:outline-none transition-colors cursor-pointer"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#181a1d] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                      Primary Requirement
                    </label>
                    <input
                      type="text"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      placeholder="e.g. Linear Cove & Downlights Schedule"
                      className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#f4f2ee] uppercase tracking-wider mb-2">
                    Message / Project Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe spatial scope, approximate square meters, timeline, or photometric needs..."
                    className="w-full bg-[#181a1d] border border-hairline px-4 py-3 text-xs text-white placeholder-white/20 focus:border-[#c8a97e] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xs font-semibold tracking-widest uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors rounded-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>PROCESSING...</span>
                  ) : (
                    <>
                      <span>SEND ENQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
