export type LightingCategory = 
  | 'Downlights'
  | 'Spotlights'
  | 'Linear Lights'
  | 'LED Strips'
  | 'Track Lights'
  | 'Pendant Lights'
  | 'Ceiling Lights'
  | 'Wall Lights'
  | 'Decorative Lighting'
  | 'Outdoor Lighting'
  | 'Architectural Lighting';

export interface ProductItem {
  id: string;
  name: string;
  code: string;
  category: LightingCategory;
  description: string;
  image: string;
  specs: {
    power: string;
    lumens: string;
    cct: string;
    cri: string;
    beamAngle: string;
    finish: string[];
    ipRating: string;
    dimming: string;
    mounting: string;
  };
  features: string[];
}

export interface ApplicationItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  keyRequirements: string[];
  recommendedFixtures: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  application: 'Residential' | 'Hospitality' | 'Commercial' | 'Retail' | 'Architectural' | 'Outdoor';
  location: string;
  lightingSolution: string;
  architect: string;
  year: string;
  image: string;
  overview: string;
  fixturesUsed: string[];
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyPoints: string[];
  content: string[];
}
