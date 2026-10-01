import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS_CATALOG } from '../data/lightingData';
import { ArrowLeft, Download, Check, Sparkles, Shield, Compass, FileText, Share2, Layers, Box } from 'lucide-react';
import { Product3DViewer } from '../components/Product3DViewer';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const product = PRODUCTS_CATALOG.find((p) => p.slug === slug) || PRODUCTS_CATALOG[0];
  const relatedProducts = PRODUCTS_CATALOG.filter((p) => p.id !== product.id).slice(0, 3);

  const handleDownloadSpec = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">{product.name}</span>
        </div>

        {/* Product Hero: Two Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-hairline">
          {/* Left Column: Large Product Imagery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] bg-[#151719] border border-hairline overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 font-mono text-xs text-white border border-white/10">
                {product.code}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 text-xs text-[#c8a97e] uppercase tracking-wider font-semibold">
                {product.category}
              </div>
            </div>

            {/* Micro Gallery / Finish Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/50 mr-2">Available Finishes:</span>
              {product.specs.finish.map((f, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#181a1d] text-xs font-mono text-white/80 border border-white/10">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Specs & Primary CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
                {product.category} · Specification
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f4f2ee] mb-3">
                {product.name}
              </h1>
              <div className="font-mono text-xs text-[#b8b5ad] mb-6">
                Product Code: <strong className="text-white">{product.code}</strong>
              </div>

              <p className="text-sm text-[#b8b5ad] leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Core Photometric Badges */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#14161a] border border-hairline mb-8 text-xs font-mono">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Power Rating</span>
                  <span className="text-white font-medium">{product.specs.power}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Luminous Output</span>
                  <span className="text-white font-medium">{product.specs.lumens}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Color Spectrum</span>
                  <span className="text-white font-medium">{product.specs.cri}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase font-sans">Ingress Protection</span>
                  <span className="text-white font-medium">{product.specs.ipRating}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                to={`/request-a-quote?product=${encodeURIComponent(product.name)}`}
                className="w-full py-4 text-xs font-semibold tracking-widest uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors text-center block cursor-pointer shadow-lg"
              >
                REQUEST PRODUCT DETAILS & QUOTE
              </Link>

              <button
                onClick={handleDownloadSpec}
                className="w-full py-3.5 text-xs font-semibold tracking-widest uppercase text-white border border-white/20 hover:border-[#c8a97e] hover:text-[#c8a97e] bg-[#121316] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadSuccess ? 'SPECIFICATION SHEET READY (PDF)' : 'DOWNLOAD SPECIFICATION (IES / PDF)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section: Product Overview */}
        <div className="py-16 border-b border-hairline grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-bold text-white mb-2">Product Overview</h2>
            <div className="text-xs text-[#c8a97e] uppercase tracking-wider">Engineering Narrative</div>
          </div>
          <div className="lg:col-span-8 space-y-4 text-sm text-[#b8b5ad] leading-relaxed">
            <p>{product.overviewLong}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {product.features.map((feat, idx) => (
                <div key={idx} className="p-4 bg-[#14161a] border border-hairline">
                  <Check className="w-4 h-4 text-[#c8a97e] mb-2" />
                  <p className="text-xs text-[#d8d5cc]">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: 3D Luminaire Interactive Inspector */}
        <div className="py-16 border-b border-hairline">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-widest text-[#c8a97e] uppercase mb-1 flex items-center gap-2">
                <Box className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span>Real-Time 3D Optical Engineering</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Interactive 3D Luminaire Visualizer</h2>
            </div>
            <p className="text-xs text-[#a5a299] max-w-sm">
              Rotate 360°, test optical beam angles, toggle power, and switch CCT Kelvin temperatures (2700K Warm Dim to 4000K).
            </p>
          </div>

          <Product3DViewer product={product} />
        </div>

        {/* Section: Technical Specifications Table */}
        <div className="py-16 border-b border-hairline">
          <div className="mb-8">
            <div className="text-xs font-semibold tracking-widest text-[#c8a97e] uppercase mb-1">
              Verifiable Metrics
            </div>
            <h2 className="text-2xl font-bold text-white">Technical Specifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs">
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Wattage / Consumption</span>
              <span className="font-mono text-white font-medium">{product.specs.power}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Luminous Flux (Output)</span>
              <span className="font-mono text-white font-medium">{product.specs.lumens}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Correlated Colour Temp (CCT)</span>
              <span className="font-mono text-white font-medium">{product.specs.cct}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Color Rendering Index (CRI)</span>
              <span className="font-mono text-white font-medium">{product.specs.cri}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Optical Beam Angle</span>
              <span className="font-mono text-white font-medium">{product.specs.beamAngle}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Input Voltage & Protocol</span>
              <span className="font-mono text-white font-medium">{product.inputVoltage}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Ingress Protection (IP)</span>
              <span className="font-mono text-white font-medium">{product.specs.ipRating}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Physical Dimensions</span>
              <span className="font-mono text-white font-medium">{product.dimensions}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Installation / Mounting</span>
              <span className="font-mono text-white font-medium">{product.specs.mounting}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Housing Material</span>
              <span className="font-mono text-white font-medium">{product.material}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Dimming Compatibility</span>
              <span className="font-mono text-white font-medium">{product.specs.dimming}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-hairline">
              <span className="text-[#888]">Manufacturer Warranty</span>
              <span className="font-mono text-white font-medium">{product.warranty}</span>
            </div>
          </div>
        </div>

        {/* Section: Applications & Recommended Spaces */}
        <div className="py-16 border-b border-hairline grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Suitable Architectural Applications</h3>
            <div className="flex flex-wrap gap-2">
              {product.applicationsList.map((app) => (
                <Link
                  key={app}
                  to="/applications"
                  className="px-3.5 py-1.5 bg-[#16181c] border border-hairline hover:border-[#c8a97e] text-xs text-white/80 transition-colors"
                >
                  {app} Architecture
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Recommended Interior Spaces</h3>
            <div className="flex flex-wrap gap-2">
              {product.recommendedSpaces.map((space) => (
                <span
                  key={space}
                  className="px-3.5 py-1.5 bg-[#16181c] border border-hairline text-xs font-mono text-[#c8a97e]"
                >
                  {space}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Related Products */}
        <div className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Complementary Luminaires</h3>
            <Link to="/products" className="text-xs text-[#c8a97e] uppercase tracking-wider hover:underline">
              View All Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug}`}
                className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/60 p-4 transition-all"
              >
                <div className="aspect-[4/3] bg-black overflow-hidden mb-4">
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="text-[11px] font-mono text-[#c8a97e] uppercase mb-1">{rel.code}</div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#c8a97e] transition-colors mb-2">{rel.name}</h4>
                <div className="text-xs font-mono text-[#888]">{rel.specs.power} · {rel.specs.cri}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
