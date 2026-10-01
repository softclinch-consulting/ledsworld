import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS_CATALOG, CATEGORIES_DATA } from '../data/lightingData';
import { Search, Filter, ArrowUpRight, SlidersHorizontal, Check } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWattage, setSelectedWattage] = useState<string>('All');
  const [selectedCCT, setSelectedCCT] = useState<string>('All');
  const [selectedApplication, setSelectedApplication] = useState<string>('All');
  const [locationType, setLocationType] = useState<'All' | 'Indoor' | 'Outdoor'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'wattage' | 'lumens'>('name');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Wattage filter
      if (selectedWattage === 'low' && product.wattageNumber > 15) return false;
      if (selectedWattage === 'mid' && (product.wattageNumber <= 15 || product.wattageNumber > 30)) return false;
      if (selectedWattage === 'high' && product.wattageNumber <= 30) return false;

      // Location type
      if (locationType === 'Indoor' && !product.isIndoor) return false;
      if (locationType === 'Outdoor' && !product.isOutdoor) return false;

      // Application
      if (selectedApplication !== 'All' && !product.applicationsList.includes(selectedApplication)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'wattage') return a.wattageNumber - b.wattageNumber;
      if (sortBy === 'lumens') return a.lumensNumber - b.lumensNumber;
      return 0;
    });
  }, [selectedCategory, searchQuery, selectedWattage, selectedApplication, locationType, sortBy]);

  return (
    <div className="pt-28 pb-32 bg-[#0c0d0e] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#888] mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c8a97e]">Products</span>
        </div>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-hairline">
          <div className="text-xs font-semibold tracking-[0.25em] text-[#c8a97e] uppercase mb-2">
            Engineered Luminaires
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f4f2ee] mb-4">
            ARCHITECTURAL LIGHTING CATALOGUE
          </h1>
          <p className="text-sm md:text-base text-[#a5a299] max-w-2xl font-light leading-relaxed">
            High-performance LED luminaires engineered with aerospace-grade 6063-T6 aluminum, anti-glare optics (UGR &lt; 16), and 98+ CRI full-spectrum color fidelity.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#121316] border border-hairline p-6 mb-10 space-y-6">
          {/* Top Row: Search and Quick Category selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by luminaire name, code (e.g. LW-LN204), or optic..."
                className="w-full bg-[#181a1d] border border-hairline pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#c8a97e] focus:outline-none"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white focus:border-[#c8a97e] focus:outline-none cursor-pointer"
              >
                <option value="All">All Luminaire Categories</option>
                {CATEGORIES_DATA.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.count} models)
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#181a1d] border border-hairline px-3.5 py-2.5 text-xs text-white focus:border-[#c8a97e] focus:outline-none cursor-pointer"
              >
                <option value="name">Sort: Name (A to Z)</option>
                <option value="wattage">Sort: Power (Wattage)</option>
                <option value="lumens">Sort: Output (Lumens)</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters: Wattage, Application, Environment */}
          <div className="pt-4 border-t border-hairline flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#888] text-[11px] uppercase tracking-wider">Wattage:</span>
              <div className="flex gap-1">
                {['All', 'low', 'mid', 'high'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedWattage(tier)}
                    className={`px-2.5 py-1 transition-colors cursor-pointer border ${
                      selectedWattage === tier
                        ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-semibold'
                        : 'border-white/10 bg-[#181a1d] text-[#888] hover:text-white'
                    }`}
                  >
                    {tier === 'All' ? 'Any' : tier === 'low' ? '< 15W' : tier === 'mid' ? '15W–30W' : '> 30W'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#888] text-[11px] uppercase tracking-wider">Environment:</span>
              <div className="flex gap-1">
                {(['All', 'Indoor', 'Outdoor'] as const).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocationType(loc)}
                    className={`px-2.5 py-1 transition-colors cursor-pointer border ${
                      locationType === loc
                        ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-semibold'
                        : 'border-white/10 bg-[#181a1d] text-[#888] hover:text-white'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[11px] font-mono text-[#c8a97e]">
                Showing {filteredProducts.length} of {PRODUCTS_CATALOG.length} models
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#121316] border border-hairline p-8">
            <p className="text-white text-base mb-2">No luminaires matched your filter parameters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedWattage('All');
                setLocationType('All');
              }}
              className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#c8a97e] text-black"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#121316] border border-hairline hover:border-[#c8a97e]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#181a1d]">
                  <img
                    src={product.image}
                    alt={`${product.name} - ${product.code}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-85" />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs font-semibold text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 border border-white/10 tracking-wider">
                      {product.code}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 text-[11px] text-[#c8a97e] uppercase tracking-wider font-medium">
                    {product.category}
                  </div>
                </div>

                {/* Technical Product Info */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#f4f2ee] group-hover:text-[#c8a97e] transition-colors mb-2">
                      {product.name}
                    </h2>
                    <p className="text-xs text-[#a5a299] leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Exact Technical Spec Bar as requested */}
                    <div className="p-3 bg-[#181a1d] border border-hairline text-xs font-mono text-[#d8d5cc] mb-4">
                      <div className="text-[10px] text-white/40 uppercase font-sans mb-1">
                        Technical Metrics
                      </div>
                      <div className="font-semibold text-[#f4f2ee]">
                        {product.specs.power} | {product.specs.cct.split('/')[0]} | {product.specs.lumens.split('–')[0]} | {product.specs.cri}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-hairline flex items-center gap-3">
                    <Link
                      to={`/products/${product.slug}`}
                      className="flex-1 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors text-center"
                    >
                      VIEW PRODUCT
                    </Link>
                    <Link
                      to={`/request-a-quote?product=${encodeURIComponent(product.name)}`}
                      className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#f4f2ee] border border-white/20 hover:border-[#c8a97e] hover:text-[#c8a97e] transition-colors"
                      title="Request quotation for this product"
                    >
                      QUOTE
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
