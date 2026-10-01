import { LightingCategory, ProductItem, ApplicationItem, ProjectItem, KnowledgeArticle } from '../types/lighting';

// High-fidelity image assets
import heroPosterImg from '../assets/images/hero_cinematic_poster_1790844860618.jpg';
import aboutHeroImg from '../assets/images/about_architectural_light_1790844201094.jpg';
import villaProjectImg from '../assets/images/project_minimal_villa_1790844218423.jpg';
import hospitalityProjectImg from '../assets/images/project_hospitality_lounge_1790844234327.jpg';
import linearProductImg from '../assets/images/product_architectural_linear_1790844248451.jpg';
import livingRoomImg from '../assets/images/space_living_room_1790844880797.jpg';
import diningKitchenImg from '../assets/images/space_dining_kitchen_1790844895183.jpg';
import officeLinearImg from '../assets/images/space_office_linear_1790844907927.jpg';

export const ASSET_IMAGES = {
  heroPoster: heroPosterImg,
  about: aboutHeroImg,
  villa: villaProjectImg,
  hospitality: hospitalityProjectImg,
  linearProduct: linearProductImg,
  livingRoom: livingRoomImg,
  diningKitchen: diningKitchenImg,
  officeLinear: officeLinearImg,
};

// Cinematic Real-Life Video Scenes for Hero
export const HERO_VIDEO_SCENES = [
  {
    id: 'scene-1',
    title: 'Modern Living Space',
    subtitle: 'Warm Architectural Illumination',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-warm-interior-lights-42931-large.mp4',
    poster: heroPosterImg,
    description: 'Slow motion panning through a luxury architectural residence highlighting recessed downlights and ambient illumination.'
  },
  {
    id: 'scene-2',
    title: 'Warm Light Activation',
    subtitle: 'Halogen Warm Dim & Linear Reveal',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-warm-lamp-lighting-up-in-a-luxury-room-41973-large.mp4',
    poster: livingRoomImg,
    description: 'Single architectural fixture gradually illuminates marble, timber, and textured vertical surfaces.'
  },
  {
    id: 'scene-3',
    title: 'Dining & Kitchen Focus',
    subtitle: 'Sculptural Pendant & Glare-Free Task',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-kitchen-and-dining-room-interior-41551-large.mp4',
    poster: diningKitchenImg,
    description: 'Architectural suspended lighting creating warm intimate focal balance across natural stone countertops.'
  },
  {
    id: 'scene-4',
    title: 'Exterior Facade at Dusk',
    subtitle: 'IP68 Wall Grazing & Dark-Sky Optics',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-outside-of-a-modern-glass-house-at-night-42861-large.mp4',
    poster: villaProjectImg,
    description: 'Monumental architectural glazing and landscape illumination in harmony with nocturnal natural surroundings.'
  }
];

// Product Categories
export const CATEGORIES_DATA: { slug: string; name: LightingCategory; description: string; count: number; image: string }[] = [
  {
    slug: 'downlights',
    name: 'Downlights',
    description: 'Precision architectural recessed luminaires with deep anti-glare baffles (UGR < 15).',
    count: 14,
    image: livingRoomImg,
  },
  {
    slug: 'spotlights',
    name: 'Spotlights',
    description: 'Adjustable directional accent luminaires with interchangeable magnetic optics.',
    count: 12,
    image: hospitalityProjectImg,
  },
  {
    slug: 'linear-lights',
    name: 'Linear Lights',
    description: 'Seamless continuous aluminum profiles with micro-prismatic and opal diffusers.',
    count: 18,
    image: officeLinearImg,
  },
  {
    slug: 'led-strips',
    name: 'LED Strips',
    description: 'High-density 24V COB and SMD strips with 2-step MacAdam ellipse binning.',
    count: 16,
    image: aboutHeroImg,
  },
  {
    slug: 'track-lights',
    name: 'Track Lights',
    description: 'Low-voltage 48V magnetic architectural track systems for modular layouts.',
    count: 9,
    image: hospitalityProjectImg,
  },
  {
    slug: 'panel-lights',
    name: 'Ceiling Lights',
    description: 'Ultra-slim surface-mounted flush disks and monolithic geometric profiles.',
    count: 11,
    image: villaProjectImg,
  },
  {
    slug: 'pendant-lights',
    name: 'Pendant Lights',
    description: 'Sculptural architectural pendants combining ambient light and acoustic felt.',
    count: 8,
    image: diningKitchenImg,
  },
  {
    slug: 'wall-lights',
    name: 'Wall Lights',
    description: 'Indirect bi-directional grazers and minimalist bedside task luminaires.',
    count: 10,
    image: aboutHeroImg,
  },
  {
    slug: 'decorative-lighting',
    name: 'Decorative Lighting',
    description: 'Bespoke hand-finished brass, smoked glass, and alabaster statement luminaires.',
    count: 7,
    image: hospitalityProjectImg,
  },
  {
    slug: 'outdoor-lighting',
    name: 'Outdoor Lighting',
    description: 'Marine-grade 316 stainless steel IP68 in-ground grazers, bollards and pathlights.',
    count: 15,
    image: villaProjectImg,
  },
  {
    slug: 'architectural-lighting',
    name: 'Architectural Lighting',
    description: 'Engineered plaster-in trimless cove extrusions and monolithic facade grazing systems.',
    count: 20,
    image: aboutHeroImg,
  }
];

// Rich Product Catalog with realistic specs
export interface DetailedProductItem extends ProductItem {
  slug: string;
  wattageNumber: number;
  lumensNumber: number;
  cctSummary: string;
  isIndoor: boolean;
  isOutdoor: boolean;
  dimensions: string;
  inputVoltage: string;
  warranty: string;
  material: string;
  overviewLong: string;
  recommendedSpaces: string[];
  applicationsList: string[];
}

export const PRODUCTS_CATALOG: DetailedProductItem[] = [
  {
    id: 'lw-ln204',
    slug: 'lw-ln204-architectural-linear',
    name: 'Architectural Linear Light',
    code: 'LW-LN204',
    category: 'Linear Lights',
    description: 'Continuous trimless extrusion with micro-prismatic glare suppression, engineered for seamless architectural ceiling integration.',
    overviewLong: 'The LW-LN204 system is an engineered continuous linear extrusion that disappears into architectural drywall reveals or suspends with hair-thin aircraft cable. Featuring high-transmission micro-prismatic optical lenses, it achieves exceptional uniform illumination while maintaining unified glare rating UGR < 16.',
    image: linearProductImg,
    wattageNumber: 24,
    lumensNumber: 2880,
    cctSummary: '2700K - 4000K',
    isIndoor: true,
    isOutdoor: false,
    dimensions: '1000mm / 2000mm x 45mm x 60mm',
    inputVoltage: '220-240V AC / 48V DC remote',
    warranty: '5 Years Comprehensive',
    material: 'Extruded 6063-T6 Aerospace Aluminum',
    specs: {
      power: '24W / meter',
      lumens: '2,880 lm/m',
      cct: '2700K / 3000K / 4000K / Tunable White',
      cri: 'Ra > 97, R9 > 90',
      beamAngle: '75° Direct / 110° Indirect',
      finish: ['Anodized Matte Black', 'Textured Architectural White', 'Brushed Champagne Brass'],
      ipRating: 'IP40 (Optional IP54)',
      dimming: 'DALI-2, 0-10V, Casambi Bluetooth',
      mounting: 'Recessed Trimless, Surface, Suspended Pendant'
    },
    features: [
      'Seamless run lengths up to 50 meters with single power feed',
      'Optical micro-prism diffuser achieving UGR < 16 for workspace compliance',
      'Extruded 6063-T6 aerospace aluminum heat sink for 70,000h L90B10 lifespan'
    ],
    recommendedSpaces: ['Office', 'Living Room', 'Dining', 'Retail', 'Hotel Lobby'],
    applicationsList: ['Commercial', 'Residential', 'Retail', 'Architectural']
  },
  {
    id: 'lw-dl08',
    slug: 'lw-dl08-precision-deep-downlight',
    name: 'Precision Deep Downlight',
    code: 'LW-DL08',
    category: 'Downlights',
    description: 'Ultra-deep recessed luminaire featuring a 45° cut-off angle for absolute visual comfort and zero ceiling glare.',
    overviewLong: 'The LW-DL08 sets the benchmark for residential and hospitality darklight illumination. Designed with a deep parabolic secondary reflector, the light source is recessed 60mm into the ceiling plane, ensuring occupants perceive zero glare at standard viewing angles.',
    image: livingRoomImg,
    wattageNumber: 12,
    lumensNumber: 1250,
    cctSummary: '2700K Warm Dim to 1800K',
    isIndoor: true,
    isOutdoor: false,
    dimensions: 'Ø 85mm x 95mm (Cutout Ø 75mm)',
    inputVoltage: '220-240V AC remote driver',
    warranty: '5 Years Comprehensive',
    material: 'Die-cast Pure Copper & Forged Aluminum',
    specs: {
      power: '12W / 18W / 25W',
      lumens: '1,250 – 2,600 lm',
      cct: '2700K Warm Dim to 1800K',
      cri: 'Ra > 98 (Full Spectrum)',
      beamAngle: '15° Spot / 24° Medium / 38° Flood',
      finish: ['Matte Black Baffle', 'Brushed Gold', 'Architectural White'],
      ipRating: 'IP54 Suitable for bathrooms',
      dimming: 'Phase Cut, 0-10V, DALI-2',
      mounting: 'Round or Square Plaster-in Trimless'
    },
    features: [
      'Patented anti-glare darklight technology with internal secondary reflector',
      'Smooth halogen-like warm dim curve from 3000K down to 1800K candlelight',
      'Die-cast pure copper and cold-forged aluminum passive cooling module'
    ],
    recommendedSpaces: ['Living Room', 'Bedroom', 'Dining', 'Hotel Room', 'Restaurant'],
    applicationsList: ['Residential', 'Hospitality', 'Commercial']
  },
  {
    id: 'lw-tr30',
    slug: 'lw-tr30-magnetic-track-spot',
    name: 'Magnetic Track Spot Matrix',
    code: 'LW-TR30',
    category: 'Track Lights',
    description: 'Low-profile 48V magnetic click-and-slide spotlight with toolless magnetic lock and 360° pan-tilt articulation.',
    overviewLong: 'Engineered for contemporary galleries, luxury retail boutiques, and high-end residential joinery. The LW-TR30 snaps securely into ultra-slim 48V low-voltage tracks with dual magnetic and mechanical safety latches.',
    image: hospitalityProjectImg,
    wattageNumber: 15,
    lumensNumber: 1450,
    cctSummary: '3000K Architectural Crisp',
    isIndoor: true,
    isOutdoor: false,
    dimensions: 'Ø 42mm x 120mm body',
    inputVoltage: '48V DC Low Voltage Track',
    warranty: '5 Years Comprehensive',
    material: 'CNC Machined Aircraft Aluminum',
    specs: {
      power: '15W',
      lumens: '1,450 lm',
      cct: '3000K Crisp Architectural',
      cri: 'Ra > 95, R9 > 85',
      beamAngle: 'Zoom 10° – 40° Stepless',
      finish: ['Velvet Matte Black', 'Matte White'],
      ipRating: 'IP20',
      dimming: 'DALI DT6/DT8, Wireless Mesh',
      mounting: '48V Low-Voltage Magnetic Track'
    },
    features: [
      'Dual optical lens system with stepless mechanical beam angle adjustment',
      'Hot-swappable installation while track is live with integrated safety latch',
      'Honeycomb louvre and oval spread lens magnetic snap-in accessories'
    ],
    recommendedSpaces: ['Retail', 'Living Room', 'Hotel', 'Office', 'Dining'],
    applicationsList: ['Retail', 'Commercial', 'Hospitality', 'Residential']
  },
  {
    id: 'lw-st12',
    slug: 'lw-st12-pro-cove-cob-strip',
    name: 'Pro-Cove High Density COB Strip',
    code: 'LW-ST12',
    category: 'LED Strips',
    description: 'Dot-free continuous phosphor LED strip delivering a perfectly uniform wash in shallow architectural coves and joinery.',
    overviewLong: 'With 576 micro-LEDs per meter coated beneath a continuous phosphor layer, the LW-ST12 eliminates all hotspot reflection even in 5mm shallow aluminum channels, creating an ethereal gradient of indirect illumination.',
    image: aboutHeroImg,
    wattageNumber: 14,
    lumensNumber: 1650,
    cctSummary: '2400K / 2700K / 3000K',
    isIndoor: true,
    isOutdoor: true,
    dimensions: '10mm width x 2.2mm thickness (5m Reel)',
    inputVoltage: '24V DC Constant Voltage',
    warranty: '5 Years Comprehensive',
    material: '3oz Double-Sided Copper FPC & Silicone Encapsulation',
    specs: {
      power: '14.4W / meter',
      lumens: '1,650 lm/m',
      cct: '2400K / 2700K / 3000K',
      cri: 'Ra > 95',
      beamAngle: '180° Flat Diffused',
      finish: ['Flexible White PCB with 3M VHB'],
      ipRating: 'IP20 / IP67 Silicon Encapsulated',
      dimming: 'PWM, 0-10V, DMX512, DALI',
      mounting: 'Architectural Aluminum Extrusion'
    },
    features: [
      '576 chips per meter eliminating any visible hot spots even in 5mm profiles',
      'Gold-plated 3oz copper trace ensuring negligible voltage drop over 10m',
      'Certified MacAdam 2-step ellipse for flawless batch-to-batch color match'
    ],
    recommendedSpaces: ['Living Room', 'Bedroom', 'Kitchen', 'Hotel', 'Facade'],
    applicationsList: ['Architectural', 'Residential', 'Hospitality', 'Outdoor']
  },
  {
    id: 'lw-pd05',
    slug: 'lw-pd05-aura-suspended-ring',
    name: 'Aura Minimalist Suspended Ring',
    code: 'LW-PD05',
    category: 'Pendant Lights',
    description: 'Ultra-thin brass suspended halo emitting soft bidirectional diffuse light, floating on ultra-fine current-carrying aircraft cables.',
    overviewLong: 'A sculptural halo that commands presence without obstructing architectural sightlines. Precision rolled from solid brass with hand-waxed satin protective finishing, the fixture delivers balanced 60% down / 40% up illumination.',
    image: diningKitchenImg,
    wattageNumber: 45,
    lumensNumber: 4100,
    cctSummary: '2700K Architectural Warm',
    isIndoor: true,
    isOutdoor: false,
    dimensions: 'Ø 800mm / 1200mm / 1800mm',
    inputVoltage: '220-240V AC remote driver',
    warranty: '5 Years Comprehensive',
    material: 'Machined Solid Brass & Opal Polycarbonate',
    specs: {
      power: '45W',
      lumens: '4,100 lm',
      cct: '2700K Architectural Warm',
      cri: 'Ra > 97',
      beamAngle: '360° Volumetric Diffuse',
      finish: ['Hand-Rubbed Brass', 'Oxidized Gunmetal', 'Pearl Bronze'],
      ipRating: 'IP20',
      dimming: '0-10V, Casambi, Phase Dimming',
      mounting: 'Micro-Canopy with Invisible Wire Suspension'
    },
    features: [
      'Machined solid brass body with hand-waxed protective satin sealant',
      'Integrated micro-driver hidden inside 28mm ceiling rosette',
      'Custom diameters from 600mm to 2400mm available on bespoke specification'
    ],
    recommendedSpaces: ['Dining', 'Living Room', 'Hotel Lobby', 'Office Boardroom'],
    applicationsList: ['Hospitality', 'Residential', 'Commercial']
  },
  {
    id: 'lw-od50',
    slug: 'lw-od50-sub-terra-inground-grazer',
    name: 'Sub-Terra IP68 Inground Grazer',
    code: 'LW-OD50',
    category: 'Outdoor Lighting',
    description: 'Drive-over stainless steel ground luminaire with asymmetric wall-wash optic for monumental facade and tree illumination.',
    overviewLong: 'Built to withstand harsh seaside atmospheres and heavy vehicular traffic. The LW-OD50 incorporates a tiltable internal optical engine that grazes 10-meter stone facades without blinding passersby.',
    image: villaProjectImg,
    wattageNumber: 20,
    lumensNumber: 2100,
    cctSummary: '3000K Amber Glow',
    isIndoor: false,
    isOutdoor: true,
    dimensions: 'Ø 180mm x 165mm depth',
    inputVoltage: '24V DC / 240V AC IP68 connector',
    warranty: '5 Years Comprehensive',
    material: 'Marine Grade 316 Stainless Steel & 15mm Tempered Glass',
    specs: {
      power: '20W',
      lumens: '2,100 lm',
      cct: '3000K Amber Glow',
      cri: 'Ra > 90',
      beamAngle: '12° x 45° Asymmetric Tiltable',
      finish: ['Marine Grade 316 Stainless Steel'],
      ipRating: 'IP68 / IK10 (5,000 kg Drive-Over)',
      dimming: '0-10V, DMX512',
      mounting: 'Heavy-Duty Ground Pre-Installation Sleeve'
    },
    features: [
      'Internal tilt mechanism adjustable ±20° without opening water seal',
      'Desiccant breather valve preventing internal humidity condensation',
      'Anti-slip etched tempered glass with zero surface glare treatment'
    ],
    recommendedSpaces: ['Facade', 'Landscape', 'Driveway', 'Hotel Entrance'],
    applicationsList: ['Outdoor', 'Architectural', 'Commercial']
  }
];

export const FEATURED_PRODUCTS = PRODUCTS_CATALOG;

// Spaces Data (Shop by Space)
export const SPACES_DATA = [
  {
    slug: 'living-room',
    name: 'Living Room',
    tagline: 'Depth, intimacy & layered warmth',
    description: 'Ambient cove illumination, recessed darklight downlights, and decorative pendant fixtures designed to create spatial depth and relaxation.',
    image: livingRoomImg,
    recommendedCCT: '2400K - 2700K Warm Dim',
    keyFixtures: ['LW-DL08 Deep Downlight', 'LW-ST12 Cove COB', 'LW-PD05 Suspended Ring'],
    purposeTypes: ['Ambient', 'Accent', 'Decorative']
  },
  {
    slug: 'dining-room',
    name: 'Dining',
    tagline: 'Focal warmth & gastronomic fidelity',
    description: 'High CRI (>97) focal illumination over dining tables paired with subtle vertical wall washing for intimate gatherings.',
    image: diningKitchenImg,
    recommendedCCT: '2700K Warm Architectural',
    keyFixtures: ['LW-PD05 Aura Ring', 'LW-DL08 Precision Spot', 'LW-ST12 Joinery'],
    purposeTypes: ['Decorative', 'Task', 'Accent']
  },
  {
    slug: 'kitchen',
    name: 'Kitchen',
    tagline: 'Shadow-free precision prep & clean aesthetics',
    description: 'Under-cabinet linear grazers and glare-free 3000K downlights engineered for food preparation clarity without harsh reflections.',
    image: diningKitchenImg,
    recommendedCCT: '3000K Clean Architectural',
    keyFixtures: ['LW-LN204 Linear Recessed', 'LW-DL08 Low UGR', 'LW-ST12 Under-Cabinet'],
    purposeTypes: ['Task', 'Ambient', 'Architectural']
  },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    tagline: 'Circadian relaxation & soft indirect glows',
    description: 'Low-lux indirect headboard grazing, warm dimming down to 1800K, and micro-aperture bedside reading spotlights.',
    image: aboutHeroImg,
    recommendedCCT: '2200K - 2700K Amber Relaxation',
    keyFixtures: ['LW-ST12 Headboard Cove', 'LW-DL08 Warm Dim', 'LW-WL10 Bedside Grazer'],
    purposeTypes: ['Ambient', 'Task', 'Accent']
  },
  {
    slug: 'office',
    name: 'Office & Workspaces',
    tagline: 'Cognitive focus & WELL Standard compliance',
    description: 'Micro-prismatic continuous linear profiles delivering uniform 400 lux desk illumination with UGR < 16 and zero screen glare.',
    image: officeLinearImg,
    recommendedCCT: '3500K - 4000K Focused White',
    keyFixtures: ['LW-LN204 Linear System', 'LW-TR30 Track Spot', 'LW-DL08 Workstation Downlight'],
    purposeTypes: ['Task', 'Ambient', 'Architectural']
  },
  {
    slug: 'hotel',
    name: 'Hotel & Hospitality',
    tagline: 'Seductive ambiance & monumental reception',
    description: 'Atmospheric scene choreography that shifts effortlessly from welcoming daylight clarity to deep evening luxury.',
    image: hospitalityProjectImg,
    recommendedCCT: '2400K - 3000K Automated Scenes',
    keyFixtures: ['LW-TR30 Magnetic Spot', 'LW-PD05 Aura Chandelier', 'LW-ST12 Joinery'],
    purposeTypes: ['Decorative', 'Accent', 'Ambient']
  },
  {
    slug: 'restaurant',
    name: 'Restaurant & Bar',
    tagline: 'High-contrast drama & culinary rendering',
    description: 'Deep-recessed spotlights providing high punch contrast on table surfaces while keeping circulating corridors softly dimmed.',
    image: hospitalityProjectImg,
    recommendedCCT: '2200K - 2700K Intimate Glow',
    keyFixtures: ['LW-DL08 Narrow Spot', 'LW-TR30 Track System', 'LW-ST12 Bar Grazer'],
    purposeTypes: ['Accent', 'Decorative', 'Ambient']
  },
  {
    slug: 'retail',
    name: 'Retail & Showrooms',
    tagline: 'High-fidelity color rendering & focal contrast',
    description: 'Full-spectrum 98 CRI track spotlights with high R9 red rendering to elevate product materials, fabrics, and textures.',
    image: hospitalityProjectImg,
    recommendedCCT: '3000K - 3500K High Saturation',
    keyFixtures: ['LW-TR30 Magnetic Matrix', 'LW-LN204 Perimeter Grazer'],
    purposeTypes: ['Display', 'Accent', 'Ambient']
  },
  {
    slug: 'landscape',
    name: 'Landscape & Garden',
    tagline: 'Nocturnal depth & dark-sky compliance',
    description: 'Low-glare bollards and in-ground spotlights that highlight tree foliage and natural stone textures without spilling light into the night sky.',
    image: villaProjectImg,
    recommendedCCT: '2700K - 3000K Warm Organic',
    keyFixtures: ['LW-OD50 Sub-Terra', 'LW-BL20 Path Bollard', 'LW-ST12 Exterior Ribbon'],
    purposeTypes: ['Outdoor', 'Accent', 'Ambient']
  },
  {
    slug: 'facade',
    name: 'Facade & Architecture',
    tagline: 'Monolithic grazing & monumental presence',
    description: 'Precision narrow-beam optical wallwashers grazing multi-story stone, concrete, and timber architectural elevations.',
    image: heroPosterImg,
    recommendedCCT: '3000K Clean Architectural',
    keyFixtures: ['LW-OD50 Inground Grazer', 'LW-WL15 Exterior Grazer'],
    purposeTypes: ['Architectural', 'Outdoor', 'Accent']
  }
];

// Purpose Categories (Shop by Purpose)
export const PURPOSES_DATA = [
  {
    slug: 'ambient-lighting',
    name: 'Ambient Lighting',
    tagline: 'General illumination for comfortable everyday spaces.',
    description: 'The foundational base layer of light that establishes spatial orientation, comfort, and uniform warmth throughout a room.',
    image: livingRoomImg,
    fixtures: ['LW-ST12 Cove COB', 'LW-DL08 Deep Downlight', 'LW-LN204 Linear']
  },
  {
    slug: 'accent-lighting',
    name: 'Accent Lighting',
    tagline: 'Highlight architecture, artwork, products and textures.',
    description: 'Directional, high-contrast illumination that draws the eye to structural elements, sculptures, paintings, and stone feature walls.',
    image: hospitalityProjectImg,
    fixtures: ['LW-TR30 Magnetic Spot', 'LW-DL08 15° Narrow', 'LW-OD50 Grazer']
  },
  {
    slug: 'task-lighting',
    name: 'Task Lighting',
    tagline: 'Focused illumination for working, reading and activities.',
    description: 'Glare-free, high-lux illumination calibrated for reading desks, kitchen preparation islands, and boardroom tables.',
    image: officeLinearImg,
    fixtures: ['LW-LN204 Micro-Prismatic Linear', 'LW-DL08 Workstation', 'LW-ST12 Joinery']
  },
  {
    slug: 'decorative-lighting',
    name: 'Decorative Lighting',
    tagline: 'Lighting that contributes to the visual identity of the space.',
    description: 'Sculptural statement chandeliers, brass halos, and hand-finished pendants that function as architectural art objects.',
    image: diningKitchenImg,
    fixtures: ['LW-PD05 Aura Ring', 'LW-WL10 Bespoke Brass Sconce']
  },
  {
    slug: 'architectural-lighting',
    name: 'Architectural Lighting',
    tagline: 'Integrated lighting designed around architectural elements.',
    description: 'Plaster-in knife-edge coves, shadow reveal channels, and perimeter grazing that make luminaires completely disappear.',
    image: aboutHeroImg,
    fixtures: ['LW-LN204 Trimless Monolith', 'LW-ST12 High-Density COB']
  },
  {
    slug: 'display-lighting',
    name: 'Display Lighting',
    tagline: 'Lighting designed to highlight merchandise and visual displays.',
    description: 'High-CRI (Ra > 98) spotlights engineered to render luxury retail textiles, jewelry, and collector exhibitions with true spectral vibrance.',
    image: hospitalityProjectImg,
    fixtures: ['LW-TR30 Track Spot Matrix', 'LW-DL08 Accent']
  },
  {
    slug: 'outdoor-lighting',
    name: 'Outdoor Lighting',
    tagline: 'Lighting for facades, landscapes, pathways and exterior spaces.',
    description: 'Rugged marine-grade IP68 submersible and IK10 drive-over fixtures engineered to withstand the elements without light pollution.',
    image: villaProjectImg,
    fixtures: ['LW-OD50 Sub-Terra Inground', 'LW-BL20 Path Bollard']
  }
];

// Applications Hub Data
export const APPLICATIONS_DATA: ApplicationItem[] = [
  {
    id: 'residential',
    title: 'RESIDENTIAL',
    tagline: 'Homes, apartments, villas and interiors',
    description: 'Human-centric illumination calibrated for comfort, intimacy, and biological wellness. Warm dimming and trimless architectural integration allow structural lines to breathe.',
    keyRequirements: ['Warm Dimming 2700K–1800K', 'Zero Glare (UGR < 16)', 'Circadian Rhythm Sync', 'Plaster-in Trimless Detailing'],
    recommendedFixtures: ['LW-DL08 Deep Downlight', 'LW-ST12 High Density COB', 'LW-LN204 Linear Recessed'],
    image: livingRoomImg,
  },
  {
    id: 'commercial',
    title: 'COMMERCIAL',
    tagline: 'Offices, workspaces and corporate environments',
    description: 'High-efficiency, low-glare luminaires engineered to optimize cognitive focus and satisfy WELL Building Standard and LEED v4 criteria with precision micro-optics.',
    keyRequirements: ['Micro-Prismatic Glare Control', 'DALI-2 Addressability', 'Energy Density < 4.5 W/m²', 'Daylight Harvesting Integration'],
    recommendedFixtures: ['LW-LN204 Architectural Linear', 'LW-TR30 Magnetic Track System', 'LW-DL08 Workstation Downlight'],
    image: officeLinearImg,
  },
  {
    id: 'hospitality',
    title: 'HOSPITALITY',
    tagline: 'Hotels, restaurants, lounges and reception spaces',
    description: 'Atmospheric light choreography that transitions effortlessly from welcoming daytime brightness to seductive evening ambience with deep saturated warmth.',
    keyRequirements: ['Bespoke Brass & Metal Finishes', 'Preset Scene Automation', 'High CRI > 98 for Gastronomy', 'Acoustic & Decorative Integration'],
    recommendedFixtures: ['LW-PD05 Aura Suspended Ring', 'LW-TR30 Track Spot Matrix', 'LW-ST12 Joinery Strip'],
    image: hospitalityProjectImg,
  },
  {
    id: 'retail',
    title: 'RETAIL',
    tagline: 'Showrooms, stores and product displays',
    description: 'Precision color fidelity with exceptional R9 red rendering to showcase fabrics, jewels, and luxury finishes with vibrant authenticity and punchy contrast ratios.',
    keyRequirements: ['CRI 98+ with R9 > 95', 'Interchangeable Narrow Beam Optics', 'High Lux Contrast (5:1 Ratio)', 'Rapid Relocatable Track Modules'],
    recommendedFixtures: ['LW-TR30 Magnetic Spot Matrix', 'LW-LN204 Perimeter Grazer', 'LW-DL08 Accent Downlight'],
    image: hospitalityProjectImg,
  },
  {
    id: 'architectural',
    title: 'ARCHITECTURAL',
    tagline: 'Feature walls, ceilings, façades and architectural elements',
    description: 'Indirect grazing and monolithic light recesses that celebrate raw concrete, stone textures, and dramatic cantilevers without revealing the physical fixture source.',
    keyRequirements: ['Hidden Light Source Detail', 'Continuous Shadowless Grazing', 'Custom Curved Extrusions', 'Thermal Management in Cavities'],
    recommendedFixtures: ['LW-LN204 Trimless Monolith', 'LW-ST12 Cove System', 'LW-OD50 Inground Wallwasher'],
    image: aboutHeroImg,
  },
  {
    id: 'outdoor',
    title: 'OUTDOOR',
    tagline: 'Landscape, pathways, entrances and exterior lighting',
    description: 'Rugged marine-grade luminaires engineered to resist extreme environmental elements, saltwater corrosion, and mechanical stress while eliminating dark sky light pollution.',
    keyRequirements: ['IP68 Submersible & IK10 Drive-Over', '316 Marine Stainless Steel', 'Dark Sky Compliant Optics', 'Integrated Surge Protection 10kV'],
    recommendedFixtures: ['LW-OD50 Sub-Terra Inground', 'LW-BL20 Architectural Bollard', 'LW-WL15 Exterior Grazer'],
    image: villaProjectImg,
  }
];

// Rich Architectural Projects
export interface DetailedProjectItem extends ProjectItem {
  slug: string;
  challenge: string;
  approach: string;
  galleryImages: string[];
}

export const PROJECTS_DATA: DetailedProjectItem[] = [
  {
    id: 'villa-solstice',
    slug: 'villa-solstice-aspen',
    name: 'Villa Solstice',
    application: 'Residential',
    location: 'Aspen, Colorado',
    lightingSolution: 'Continuous Recessed Cove & Deep Warm Dimming System',
    architect: 'Studio Vesper Architects',
    year: '2025',
    image: villaProjectImg,
    overview: 'A monolithic timber and cast-concrete private residence embedded in the Colorado alpine slope. All lighting was engineered to sit completely flush with architectural reveal joints, utilizing custom 2400K warm LED ribbons and deep baffle downlights.',
    challenge: 'Extreme ceiling heights with massive exposed glulam timber beams created significant potential for glaring fixture reflections on expansive triple-glazed glass facade walls facing the mountain range.',
    approach: 'Deployed deep baffle 45° cut-off downlights (LW-DL08) with anti-reflective black inner baffles, alongside indirect continuous plaster-in coves (LW-ST12) hidden on beam shoulders, ensuring 0% glass glare while enveloping the interior in natural 2400K timber warmth.',
    fixturesUsed: ['LW-DL08 Precision Downlight', 'LW-ST12 Pro-Cove COB', 'LW-LN204 Linear'],
    galleryImages: [villaProjectImg, livingRoomImg, heroPosterImg]
  },
  {
    id: 'the-lumina-lounge',
    slug: 'the-lumina-hotel-lounge',
    name: 'The Lumina Hotel & Bar',
    application: 'Hospitality',
    location: 'Zurich, Switzerland',
    lightingSolution: 'Custom Brass Track Accents & Ambient Dimmable Grazers',
    architect: 'Kaufmann & Partners Interior',
    year: '2025',
    image: hospitalityProjectImg,
    overview: 'A high-end boutique hospitality sanctuary featuring a fluted travertine cocktail bar and double-height timber ceilings. Automated DALI-2 scenes shift from daylight clarity to deep 1800K intimacy as dusk settles.',
    challenge: 'Transitioning the spatial mood seamlessly across morning coffee services, afternoon executive meetings, and late-night cocktail hours without manual staff adjustments.',
    approach: 'Created an astronomical clock DALI-2 integration coordinating 48V magnetic track spotlights (LW-TR30) and hand-rubbed brass suspended halo pendants (LW-PD05) that follow solar azimuth and smooth warm dim curves down to 1800K.',
    fixturesUsed: ['LW-TR30 Magnetic Track Spot', 'LW-PD05 Aura Ring', 'LW-ST12 Joinery System'],
    galleryImages: [hospitalityProjectImg, diningKitchenImg, aboutHeroImg]
  },
  {
    id: 'omnia-headquarters',
    slug: 'omnia-technology-campus',
    name: 'Omnia Technology Campus',
    application: 'Commercial',
    location: 'London, UK',
    lightingSolution: 'Continuous Linear Prismatic Grid & Daylight Harvesting',
    architect: 'Foster & Grey Associates',
    year: '2024',
    image: officeLinearImg,
    overview: 'A 12,000 m² corporate headquarters designed around WELL Gold certification standards. Integrated smart sensors modulate lux levels according to external sky irradiance, maintaining an even 400 lux desk surface plane with zero screen reflections.',
    challenge: 'Meeting rigorous WELL Building Standard equivalent melanopic lux criteria while achieving energy density under 4.0 W/m² across open-plan workspaces.',
    approach: 'Specified LW-LN204 micro-prismatic continuous linear luminaires with 75° direct / 110° indirect optics, balancing ceiling luminance and direct task lighting without computer screen glare.',
    fixturesUsed: ['LW-LN204 Architectural Linear', 'LW-DL08 Low UGR Downlight'],
    galleryImages: [officeLinearImg, heroPosterImg, aboutHeroImg]
  },
  {
    id: 'atelier-k-boutique',
    slug: 'atelier-k-flagship',
    name: 'Atelier K Flagship',
    application: 'Retail',
    location: 'Milan, Italy',
    lightingSolution: 'Ultra-High CRI 98 Track Matrix & Perimeter Wallwashers',
    architect: 'De Luca Design Office',
    year: '2025',
    image: hospitalityProjectImg,
    overview: 'A luxury haute couture boutique on Via Montenapoleone requiring absolute spectral fidelity. Using specialized full-spectrum LED dies with R9 > 95, garments render with natural textile depth and true color accuracy.',
    challenge: 'High-contrast spotlighting was required to accentuate fabric textures without generating high heat that could damage delicate silk and cashmere collections.',
    approach: 'Engineered low-voltage 48V magnetic track spotlights (LW-TR30) equipped with cold-forged heatsinks and interchangeable magnetic honeycomb baffles, delivering 5:1 contrast ratios at zero thermal emission.',
    fixturesUsed: ['LW-TR30 Track Spot Matrix', 'LW-LN204 Perimeter System'],
    galleryImages: [hospitalityProjectImg, linearProductImg, diningKitchenImg]
  },
  {
    id: 'kyoto-pavilion-gallery',
    slug: 'kyoto-heritage-pavilion',
    name: 'Kyoto Heritage Pavilion',
    application: 'Architectural',
    location: 'Kyoto, Japan',
    lightingSolution: 'Trimless Monolithic Cove & Indirect Wood Surface Illumination',
    architect: 'Tanaka & Associates',
    year: '2024',
    image: aboutHeroImg,
    overview: 'Minimalist contemporary art pavilion combining traditional cedar joinery with micro-recessed LED profiles. Fixtures remain entirely invisible to visitors, generating ethereal floating planes of light.',
    challenge: 'Strict preservation requirements prohibited drilling or visible cabling along historic hinoki wood ceiling structures.',
    approach: 'Integrated custom concealed plaster-in cove profiles (LW-ST12) into perimeter shadow gaps, bouncing light upward across natural cedar beams without exposing fixture hardware.',
    fixturesUsed: ['LW-ST12 High Density COB', 'LW-LN204 Custom Profile'],
    galleryImages: [aboutHeroImg, livingRoomImg, villaProjectImg]
  },
  {
    id: 'malibu-horizon-estate',
    slug: 'malibu-horizon-estate',
    name: 'Malibu Horizon Estate',
    application: 'Outdoor',
    location: 'Malibu, California',
    lightingSolution: 'Marine-Grade 316 Stainless Inground Grazers & Low-Profile Step Lights',
    architect: 'Coastline Architecture Group',
    year: '2025',
    image: villaProjectImg,
    overview: 'An oceanfront property subjected to heavy Pacific saltwater fog. Marine-grade 316 stainless steel fixtures provide subtle, dark-sky-compliant pathway and landscape grazing without disturbing nocturnal wildlife.',
    challenge: 'Extreme coastal saline exposure causing corrosion in ordinary aluminum luminaires within 18 months, coupled with strict local coastal dark-sky ordinance.',
    approach: 'Fabricated all luminaires from solid passivated 316 marine-grade stainless steel with IP68 internal potting and zero upward light spill optics (LW-OD50).',
    fixturesUsed: ['LW-OD50 Sub-Terra Inground', 'LW-WL15 Exterior Grazer'],
    galleryImages: [villaProjectImg, heroPosterImg, livingRoomImg]
  }
];

// Knowledge Hub Articles
export interface DetailedKnowledgeArticle extends KnowledgeArticle {
  slug: string;
}

export const KNOWLEDGE_ARTICLES: DetailedKnowledgeArticle[] = [
  {
    id: 'cct-guide',
    slug: 'choosing-the-right-colour-temperature',
    title: 'Choosing the Right Colour Temperature (2700K vs 3000K vs 4000K)',
    category: 'Fundamentals',
    readTime: '4 min read',
    summary: 'From 2400K candlelight to 4000K crisp office daylight — learn how correlated color temperature fundamentally impacts circadian rhythms and spatial mood.',
    keyPoints: [
      '2400K–2700K: Ideal for living rooms, bedrooms, and intimate dining',
      '3000K: The architectural sweet spot balancing warmth and clarity',
      '4000K: Clean, focused illumination for offices, labs, and modern kitchens',
      'Tunable White allows spaces to shift with the solar cycle'
    ],
    content: [
      'Correlated Colour Temperature (CCT), measured in Kelvin (K), defines the relative warmness or coolness of white light. Light below 3000K emits rich amber wavelengths that trigger melatonin production, fostering relaxation and emotional warmth.',
      'In high-end architectural design, lighting designers avoid mixing disparate color temperatures in the same visual plane. When specifying residential interiors, a base of 2700K with Warm Dimming down to 1800K replicates the natural ember quality of incandescent filament and flame.',
      'For commercial and retail environments, 3000K or 3500K delivers crisp contrast without the sterile blue tint often associated with low-cost commercial 5000K LED tubes.'
    ]
  },
  {
    id: 'beam-angles-glare',
    slug: 'understanding-beam-angles-and-glare-control',
    title: 'Understanding Beam Angles & Glare Control (UGR < 16)',
    category: 'Optical Engineering',
    readTime: '5 min read',
    summary: 'A deep dive into spot, medium, and wide optics, cut-off angles, and why UGR < 16 is essential for high-end luxury interiors.',
    keyPoints: [
      '10°–15° Spot: Used for dramatic focal punch on art, tables, and columns',
      '24°–36° Medium: The standard for general accent and task illumination',
      '60°+ Flood: Soft ambient wash for spacious hallways and living zones',
      'Deep baffle recessed engineering hides the source from direct line-of-sight'
    ],
    content: [
      'The difference between pedestrian lighting and architectural lighting lies almost entirely in glare control. When you walk into a poorly lit room, your eyes register dozens of glaring white pinpricks in the ceiling.',
      'With LED WORLD precision darklight downlights, the LED chip is recessed deeply behind an engineered parabolic secondary reflector. At normal viewing angles (>30° from vertical), the ceiling aperture appears dark and unlit, while the room beneath is flooded with warm, clean illumination.',
      'Selecting the correct beam spread prevents overlapping scalloping on vertical walls and concentrates footcandles precisely where spatial architecture demands.'
    ]
  },
  {
    id: 'residential-layering',
    slug: 'how-to-light-a-living-room',
    title: 'How to Light a Living Room: The 3 Architectural Layers',
    category: 'Design Strategy',
    readTime: '6 min read',
    summary: 'The three essential layers of residential lighting design: ambient cove illumination, functional task lighting, and architectural accent focal points.',
    keyPoints: [
      'Never rely on a single central ceiling pendant for entire room illumination',
      'Indirect perimeter cove lighting lifts the perceived ceiling height',
      'Under-cabinet and joinery lighting eliminates harsh counter shadows',
      'Multi-scene control panels provide effortless day-to-evening transitions'
    ],
    content: [
      'Exceptional residential lighting is experienced as a natural extension of architecture rather than an added fixture. By separating lighting into three distinct functional layers, a home transforms from a static enclosure into an emotional sanctuary.',
      'Layer 1: Ambient indirect lighting via ceiling coves, drapery pockets, and wall grazers. This layer washes vertical surfaces and reflects softly back into the space.',
      'Layer 2: Task lighting via low-glare linear profiles over kitchen islands, study desks, and vanity mirrors, calibrated at CRI > 95 for natural skin tones.',
      'Layer 3: Accent spotlights highlighting artwork, sculpture niches, and dining table centerpieces with high punch contrast.'
    ]
  },
  {
    id: 'architectural-basics',
    slug: 'architectural-lighting-guide-trimless-details',
    title: 'Architectural Lighting Guide: Trimless Plaster-in Detailing',
    category: 'Installation & Detailing',
    readTime: '5 min read',
    summary: 'How trimless plaster-in frames, knife-edge coves, and shadow reveal channels create the monolithic aesthetic of modern architecture.',
    keyPoints: [
      'Plaster-in perforated mesh flanges eliminate plastic and metal bezel rims',
      'Knife-edge drywall details create the illusion that ceilings float on light',
      'Extrusion anodization thickness protects against thermal warping',
      'Accessibility for remote driver replacement must be engineered upfront'
    ],
    content: [
      'In minimalist architecture, every visible trim or bezel is visual clutter. Trimless architectural fixtures use perforated aluminum wings that are screwed into drywall and skimmed with joint compound until completely seamless.',
      'When painted with the ceiling finish, the fixture becomes an organic opening in the architectural plane. High thermal conductivity aluminum extrusions sink heat away from the LED diode array to guarantee over 50,000 hours of maintenance-free operation.'
    ]
  },
  {
    id: 'downlight-selection',
    slug: 'how-to-choose-downlights',
    title: 'How to Choose the Right Architectural Downlight',
    category: 'Product Selection',
    readTime: '4 min read',
    summary: 'Aperture sizes (from 25mm micro to 90mm), thermal heatsinks, optical lenses vs reflectors, and drivers.',
    keyPoints: [
      'Micro-aperture downlights (35mm–50mm) offer unprecedented architectural discretion',
      'Cold-forged pure aluminum heat sinks outperform cheap die-cast alloys',
      'Flicker-free IEEE 1789 compliant drivers prevent eye fatigue and camera strobe',
      'IP54 rating is required for showers, steam rooms, and covered patios'
    ],
    content: [
      'Downlights are the workhorses of architectural illumination. Choosing the right fixture requires balancing lumen output, optical cut-off, and thermal design.',
      'A common pitfall is over-lighting a space with high-wattage wide-flood downlights. Modern architectural practice favors lower-wattage, narrow-to-medium beam fixtures positioned strategically to illuminate walls and surfaces rather than open floor voids.'
    ]
  },
  {
    id: 'commercial-lighting',
    slug: 'commercial-lighting-guide-well-standard',
    title: 'Commercial Lighting Guide: Meeting WELL Building & LEED Criteria',
    category: 'Commercial Standards',
    readTime: '5 min read',
    summary: 'Meeting strict energy codes, LEED v4 requirements, and WELL Building Standard circadian lighting metrics for modern enterprises.',
    keyPoints: [
      'Equivalent Melanopic Lux (EML) metrics stimulate daytime alertness and focus',
      'Continuous micro-prismatic linear profiles eliminate screen glare in open plans',
      'DALI-2 addressable lighting saves up to 45% energy through automated occupancy',
      'High power factor (>0.95) and low THD (<10%) ensure electrical grid stability'
    ],
    content: [
      'Modern commercial lighting transcends simple illumination: it is an active driver of employee well-being, cognitive performance, and real estate sustainability.',
      'By designing lighting layouts in accordance with the WELL Building Standard, organizations provide spectral distributions that reinforce natural circadian rhythms, improving afternoon alertness and nighttime sleep quality for staff.'
    ]
  }
];

// Brand Strengths
export const BRAND_STRENGTHS = [
  {
    title: 'QUALITY',
    tagline: 'Precision Craftsmanship',
    description: 'Aircraft-grade 6063-T6 aluminum, 2-step MacAdam ellipse binning, and 5-year comprehensive manufacturer warranty across all product lines.'
  },
  {
    title: 'PERFORMANCE',
    tagline: 'Optical Excellence',
    description: 'Ultra-low glare engineering (UGR < 16), 98+ CRI full-spectrum color fidelity, and passive cold-forged thermal dissipation up to 70,000 hours.'
  },
  {
    title: 'EFFICIENCY',
    tagline: 'Sustainable Power',
    description: 'High-efficacy LED engines delivering up to 150 lumens per watt with intelligent power management and standby consumption under 0.2W.'
  },
  {
    title: 'DESIGN',
    tagline: 'Architectural Purity',
    description: 'Trimless plaster-in profiles, knife-edge details, and hand-rubbed metallic finishes designed to disappear seamlessly into high-end architecture.'
  },
  {
    title: 'TECHNOLOGY',
    tagline: 'Advanced Control',
    description: 'Seamless integration with DALI-2, 0-10V, Casambi Bluetooth Mesh, Lutron, and KNX home automation systems with smooth 0.1% flicker-free dimming.'
  },
  {
    title: 'SOLUTIONS',
    tagline: 'Complete Engineering',
    description: 'End-to-end lighting schedules, bespoke profile extrusion lengths, IES/LDT photometric files, and comprehensive architectural project support.'
  }
];
