import React, { useState, useEffect, useRef } from 'react';
import { Sun, Sparkles, Sliders, Eye, Zap, Layers, ChevronUp, ChevronDown } from 'lucide-react';

export interface DynamicLightingState {
  cct: number; // Kelvin, e.g. 2700, 3000, 4000, 5000
  intensity: number; // 0 to 100%
  beamMode: 'spot' | 'linear' | 'ambient';
  beamTracking: boolean;
}

const CCT_PRESETS = [
  { name: 'Candlelight', kelvin: 2200, color: 'rgb(255, 147, 41)', desc: 'Ultra-warm intimate ambient' },
  { name: 'Warm Dim', kelvin: 2700, color: 'rgb(255, 180, 107)', desc: 'Residential & luxury hospitality' },
  { name: 'Architectural', kelvin: 3000, color: 'rgb(255, 209, 163)', desc: 'Modern gallery & premium retail' },
  { name: 'Neutral White', kelvin: 4000, color: 'rgb(255, 238, 222)', desc: 'High-focus commercial & workspaces' },
  { name: 'Daylight Focus', kelvin: 5700, color: 'rgb(212, 235, 255)', desc: 'Circadian optical daylight' },
];

export const DynamicLightingController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lighting, setLighting] = useState<DynamicLightingState>({
    cct: 2700,
    intensity: 85,
    beamMode: 'spot',
    beamTracking: true,
  });

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [smoothPos, setSmoothPos] = useState({ x: -1000, y: -1000 });
  const requestRef = useRef<number | null>(null);

  // Smooth mouse lerping for dynamic lighting aura
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      setSmoothPos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.12),
        y: lerp(prev.y, mousePos.y, 0.12),
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos]);

  // Apply dynamic CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    const currentPreset = CCT_PRESETS.find((p) => p.kelvin === lighting.cct) || CCT_PRESETS[1];
    
    // Calculate RGB values for dynamic glow
    let r = 255, g = 190, b = 120;
    if (lighting.cct === 2200) { r = 255; g = 140; b = 30; }
    else if (lighting.cct === 2700) { r = 255; g = 180; b = 100; }
    else if (lighting.cct === 3000) { r = 255; g = 210; b = 150; }
    else if (lighting.cct === 4000) { r = 255; g = 238; b = 215; }
    else if (lighting.cct === 5700) { r = 200; g = 230; b = 255; }

    const opacity = (lighting.intensity / 100) * 0.28;
    root.style.setProperty('--dynamic-light-rgb', `${r}, ${g}, ${b}`);
    root.style.setProperty('--dynamic-light-color', `rgba(${r}, ${g}, ${b}, ${opacity})`);
    root.style.setProperty('--dynamic-light-glow', `rgba(${r}, ${g}, ${b}, ${(lighting.intensity / 100) * 0.45})`);
    root.style.setProperty('--dynamic-light-intensity', `${lighting.intensity / 100}`);
    root.style.setProperty('--dynamic-light-cct', `${lighting.cct}K`);
  }, [lighting]);

  const activePreset = CCT_PRESETS.find((p) => p.kelvin === lighting.cct) || CCT_PRESETS[1];

  return (
    <>
      {/* 1. Global Dynamic Architectural Light Aura (Follows cursor smoothly) */}
      {lighting.beamTracking && (
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 overflow-hidden"
          style={{ opacity: lighting.intensity > 5 ? 1 : 0 }}
        >
          {/* Main dynamic spot beam */}
          <div
            className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform ease-out will-change-transform"
            style={{
              left: `${smoothPos.x}px`,
              top: `${smoothPos.y}px`,
              width: lighting.beamMode === 'spot' ? '700px' : lighting.beamMode === 'linear' ? '1100px' : '900px',
              height: lighting.beamMode === 'spot' ? '700px' : lighting.beamMode === 'linear' ? '450px' : '900px',
              background: `radial-gradient(ellipse at center, var(--dynamic-light-color) 0%, rgba(${lighting.cct > 4000 ? '200, 230, 255' : '200, 169, 126'}, ${(lighting.intensity / 100) * 0.08}) 35%, transparent 70%)`,
              filter: 'blur(35px)',
            }}
          />

          {/* Core high-intensity luminaire center focus */}
          <div
            className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-75"
            style={{
              left: `${smoothPos.x}px`,
              top: `${smoothPos.y}px`,
              width: '180px',
              height: '180px',
              background: `radial-gradient(circle, var(--dynamic-light-glow) 0%, transparent 75%)`,
              filter: 'blur(20px)',
            }}
          />
        </div>
      )}

      {/* 2. Top-edge subtle architectural wall-grazer light strip */}
      <div 
        className="pointer-events-none fixed top-0 left-0 right-0 h-1 z-40 transition-all duration-700"
        style={{
          background: `linear-gradient(90deg, transparent 5%, var(--dynamic-light-color) 50%, transparent 95%)`,
          boxShadow: `0 0 25px 2px var(--dynamic-light-color)`,
          opacity: (lighting.intensity / 100) * 0.8,
        }}
      />

      {/* 3. Floating Architectural Dynamic Lighting Controller Dock */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Expanded Controls Panel */}
        {isOpen && (
          <div className="mb-3 w-80 sm:w-96 bg-[#111215]/95 backdrop-blur-xl border border-white/15 p-5 shadow-2xl rounded-sm text-xs text-[#f4f2ee] space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c8a97e] animate-pulse" />
                <span className="font-semibold uppercase tracking-widest text-[#f4f2ee]">Dynamic Lighting Engine</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-[#c8a97e]">
                LIVE SIMULATION
              </span>
            </div>

            {/* CCT Kelvin Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] text-[#a5a299] uppercase tracking-wider font-mono">Kelvin Temperature (CCT)</span>
                <span className="font-mono text-[#c8a97e] font-semibold">{lighting.cct}K • {activePreset.name}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {CCT_PRESETS.map((preset) => (
                  <button
                    key={preset.kelvin}
                    onClick={() => setLighting((prev) => ({ ...prev, cct: preset.kelvin }))}
                    className={`py-2 px-1 rounded flex flex-col items-center gap-1 border transition-all text-center ${
                      lighting.cct === preset.kelvin
                        ? 'border-[#c8a97e] bg-white/10 shadow-sm'
                        : 'border-white/10 hover:border-white/30 bg-black/40'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-inner"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span className="text-[9px] font-mono text-[#ddd]">{preset.kelvin}K</span>
                  </button>
                ))}
              </div>
              <p className="mt-1 text-[10px] text-[#888] italic">{activePreset.desc}</p>
            </div>

            {/* Dimmer / Lux Intensity Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] text-[#a5a299] uppercase tracking-wider font-mono">Dimming & Flux</span>
                <span className="font-mono text-white font-medium">{lighting.intensity}% ({Math.round(lighting.intensity * 8.5)} Lux)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lighting.intensity}
                onChange={(e) => setLighting((prev) => ({ ...prev, intensity: Number(e.target.value) }))}
                className="w-full accent-[#c8a97e] h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Beam Distribution Mode */}
            <div>
              <div className="text-[11px] text-[#a5a299] uppercase tracking-wider font-mono mb-2">Optical Distribution</div>
              <div className="grid grid-cols-3 gap-2">
                {(['spot', 'linear', 'ambient'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setLighting((prev) => ({ ...prev, beamMode: mode }))}
                    className={`py-2 px-2 text-[10px] uppercase font-mono tracking-wider border rounded transition-all ${
                      lighting.beamMode === mode
                        ? 'border-[#c8a97e] bg-[#c8a97e]/15 text-[#c8a97e] font-semibold'
                        : 'border-white/10 text-white/70 hover:border-white/20'
                    }`}
                  >
                    {mode === 'spot' ? 'Narrow Spot' : mode === 'linear' ? 'Linear Wall' : 'Ambient 360°'}
                  </button>
                ))}
              </div>
            </div>

            {/* Beam Tracking Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
              <span className="text-[#a5a299]">Interactive Cursor Beam</span>
              <button
                onClick={() => setLighting((prev) => ({ ...prev, beamTracking: !prev.beamTracking }))}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded border transition-colors ${
                  lighting.beamTracking
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-white/20 bg-white/5 text-white/50'
                }`}
              >
                {lighting.beamTracking ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>
          </div>
        )}

        {/* Floating Quick-Toggle Pill */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#131518]/90 hover:bg-[#1c1f24] border border-[#c8a97e]/40 shadow-xl backdrop-blur-md transition-all duration-300 text-xs font-mono tracking-wider text-[#f4f2ee] hover:border-[#c8a97e]"
        >
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping absolute left-4 opacity-75"
            style={{ backgroundColor: activePreset.color }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full relative"
            style={{ backgroundColor: activePreset.color }}
          />
          <span className="text-[#c8a97e] font-semibold">{lighting.cct}K</span>
          <span className="text-white/40">|</span>
          <span className="text-white/80">{lighting.intensity}%</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-white/60 ml-1" /> : <ChevronUp className="w-3.5 h-3.5 text-white/60 ml-1" />}
        </button>
      </div>
    </>
  );
};
