import React from 'react';
import { Link } from 'react-router-dom';
import { ContactSection } from '../components/ContactSection';
import { MessageSquare, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">Contact</span>
        </div>

        {/* Header */}
        <div className="mb-14 pb-8 border-b border-hairline">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
            Direct Studio Contact
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] mb-4">
            CONNECT WITH LED WORLD
          </h1>
          <p className="text-sm md:text-base text-[#a5a299] max-w-2xl font-light leading-relaxed">
            Our architectural lighting consultants support specifiers, interior architects, and lighting engineers globally. Reach out for technical scheduling, project samples, or trade inquiries.
          </p>
        </div>

        {/* WhatsApp & Fast Track Banner */}
        <div className="p-6 bg-[#14161a] border border-brass-hairline mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1e2026] text-[#c8a97e]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Instant Technical Assistance via WhatsApp</div>
              <div className="text-xs text-[#a5a299]">Direct message our architectural lighting engineers for quick photometric reviews.</div>
            </div>
          </div>
          <a
            href="https://wa.me/18005550199?text=Hello%20LED%20WORLD%20team,%20I%20have%20an%20architectural%20lighting%20inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-black bg-[#c8a97e] hover:bg-[#dfc299] transition-colors whitespace-nowrap"
          >
            CHAT ON WHATSAPP
          </a>
        </div>

        {/* Embed Full Contact Form */}
        <ContactSection />
      </div>
    </div>
  );
};
