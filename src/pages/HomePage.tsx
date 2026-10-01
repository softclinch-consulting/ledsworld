import React from 'react';
import { HeroVideo } from '../components/HeroVideo';
import { FindYourLight } from '../components/FindYourLight';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { ProductCategories } from '../components/ProductCategories';
import { ShopBySpace } from '../components/ShopBySpace';
import { ShopByPurpose } from '../components/ShopByPurpose';
import { LightingInRealSpaces } from '../components/LightingInRealSpaces';
import { ApplicationsSection } from '../components/ApplicationsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { WhyLEDWorld } from '../components/WhyLEDWorld';
import { KnowledgeSection } from '../components/KnowledgeSection';
import { FinalCTA } from '../components/FinalCTA';
import { ContactSection } from '../components/ContactSection';
import { useNavigate } from 'react-router-dom';
import { ProductItem } from '../types/lighting';

interface HomePageProps {
  onOpenQuote: (product?: ProductItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuote }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Real-Life Video Hero */}
      <HeroVideo
        onExploreClick={() => {
          document.getElementById('find-your-light')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onViewProductsClick={() => navigate('/products')}
      />

      {/* 2. Find Your Light */}
      <FindYourLight />

      {/* 3. Featured Lighting */}
      <FeaturedProducts onRequestQuoteWithProduct={(prod) => onOpenQuote(prod)} />

      {/* 4. Shop by Product */}
      <ProductCategories
        onSelectCategory={() => navigate('/products')}
        onViewAllProducts={() => navigate('/products')}
      />

      {/* 5. Shop by Space */}
      <ShopBySpace />

      {/* 6. Shop by Purpose */}
      <ShopByPurpose />

      {/* 7. Lighting in Real Spaces */}
      <LightingInRealSpaces />

      {/* 8. Applications */}
      <ApplicationsSection onRequestQuote={() => onOpenQuote()} />

      {/* 9. Projects */}
      <ProjectsSection onRequestProjectInquiry={() => onOpenQuote()} />

      {/* 10. Why LED WORLD */}
      <WhyLEDWorld />

      {/* 11. Lighting Knowledge */}
      <KnowledgeSection />

      {/* 12. Final CTA */}
      <FinalCTA
        onRequestQuote={() => onOpenQuote()}
        onTalkToTeam={() => navigate('/contact')}
      />

      {/* 13. Contact Form */}
      <ContactSection />
    </div>
  );
};
