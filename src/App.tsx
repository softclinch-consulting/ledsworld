/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { DynamicLightingController } from './components/DynamicLightingController';
import { ProductItem } from './types/lighting';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { LightingSpacePage } from './pages/LightingSpacePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { KnowledgeDetailPage } from './pages/KnowledgeDetailPage';
import { RequestAQuotePage } from './pages/RequestAQuotePage';
import { ContactPage } from './pages/ContactPage';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<ProductItem | null>(null);

  const handleOpenQuote = (product?: ProductItem) => {
    setSelectedProductForQuote(product || null);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
    setSelectedProductForQuote(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0a0b0d] text-[#f4f2ee] selection:bg-[#c8a97e] selection:text-black flex flex-col justify-between font-sans antialiased">
        <ScrollToTop />

        {/* Global Architectural Navigation Header with Mega-Menu */}
        <Header onRequestQuote={() => handleOpenQuote()} />

        {/* Multi-Page Route Registry */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/lighting/:slug" element={<LightingSpacePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/knowledge/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/request-a-quote" element={<RequestAQuotePage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<HomePage onOpenQuote={handleOpenQuote} />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Interactive Quote Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuote}
          preselectedProduct={selectedProductForQuote}
        />

        {/* Global Dynamic Architectural Lighting Engine (Active across all pages) */}
        <DynamicLightingController />
      </div>
    </HashRouter>
  );
}
