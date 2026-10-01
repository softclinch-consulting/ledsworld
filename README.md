# LED WORLD | Architectural Lighting & Systems

> **Light is the experience.** Engineered architectural LED luminaires and optical systems for luxury residential, monumental hospitality, and commercial spaces.

---

## 🌟 Key Features

- **Dynamic Architectural Lighting Engine (All Pages)**:
  - Real-time cursor-following architectural spotlight beam and luminaire ambient aura.
  - Live Kelvin CCT temperature switcher (2200K Candlelight, 2700K Warm Dim, 3000K Architectural, 4000K Neutral White, 5700K Daylight).
  - Photometric lux intensity slider and luminaire beam distribution selector (Spot, Linear Wall Graze, Ambient 360°).
- **Cinematic Architectural Hero**:
  - High-definition architectural video footage with dynamic CCT warmth shifts.
  - Seamless toggle to real-time interactive 3D virtual showroom.
- **Interactive 3D Luminaire Visualizer (Three.js)**:
  - 360° rotation and CAD-level model inspection.
  - Real optical beam cone projection (15°, 24°, 36°, 60° FWHM).
  - Photometric flux calculation and CCT Kelvin switching.
- **3D Spatial Illumination Room Simulator**:
  - Multi-channel lighting control (Recessed Downlights, Perimeter Indirect Cove, Feature Wall Grazer).
  - Real-time Lux calculation with anti-glare telemetry (UGR < 14).
  - Interactive camera orbit and space illumination diagnostics.
- **Architectural Catalogue & Case Studies**:
  - Downlights, Track Systems, Linear Fixtures, High-CRI LED Strips (CRI 98+, MacAdam Step 2).
  - Global case studies with architect credits, application specs, and luminaire schedules.
  - Interactive Project Inquiry & Specification RFQ quotation modal.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Architectural Theme
- **3D & Optics**: Three.js (WebGL, Real-time Shadow Maps, ACES Filmic Tone Mapping)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Bundler**: Vite 8

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended, tested on v22)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/softclinch-consulting/ledsworld.git
cd ledsworld

# Install dependencies
npm install --legacy-peer-deps
```

### Development Server

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Type Checking & Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
├── src/
│   ├── assets/            # High-fidelity architectural imagery & photography
│   ├── components/        # UI & 3D Lighting components
│   │   ├── DynamicLightingController.tsx # Global dynamic lighting engine
│   │   ├── HeroVideo.tsx                 # Cinematic hero & 3D switcher
│   │   ├── Hero3D.tsx                    # Three.js 3D luxury room
│   │   ├── Product3DViewer.tsx           # Three.js luminaire CAD inspector
│   │   ├── Spatial3DSimulator.tsx        # Three.js architectural room simulator
│   │   ├── FeaturedProducts.tsx          # Luminaire showcase with beam hover
│   │   ├── ProductCategories.tsx         # Category exploration cards
│   │   ├── ApplicationsSection.tsx       # Sectors & specifications
│   │   ├── ProjectsSection.tsx           # Case studies with dusk/night toggle
│   │   └── ...
│   ├── data/
│   │   └── lightingData.ts # Catalog, spaces, projects & technical specs
│   ├── pages/             # Multi-page application routes
│   └── types/             # TypeScript definitions
├── package.json
└── vite.config.ts
```

---

## 📄 License

Proprietary © LED WORLD / Softclinch Consulting. All rights reserved.
