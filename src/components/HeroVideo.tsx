import React, { useState, useRef, useEffect } from 'react';
import { HERO_VIDEO_SCENES, ASSET_IMAGES } from '../data/lightingData';
import { Hero3D } from './Hero3D';
import { Play, Pause, Volume2, VolumeX, Sparkles, Box, ArrowRight, Sliders, ShieldCheck } from 'lucide-react';

interface HeroVideoProps {
  onExploreClick?: () => void;
  onViewProductsClick?: () => void;
  onRequestQuoteClick?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onExploreClick,
  onViewProductsClick,
  onRequestQuoteClick,
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [viewMode, setViewMode] = useState<'cinematic' | '3d'>('cinematic');
  const [cctWarmth, setCctWarmth] = useState<'2700k' | '3000k' | '4000k'>('2700k');
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentScene = HERO_VIDEO_SCENES[activeSceneIndex] || HERO_VIDEO_SCENES[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some browsers
      });
    }
  }, [activeSceneIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (viewMode === '3d') {
    return (
      <div className="relative w-full">
        {/* Switch back to video button */}
        <div className="absolute top-24 right-6 sm:right-12 z-40">
          <button
            onClick={() => setViewMode('cinematic')}
            className="flex items-center gap-2 px-4 py-2 bg-[#121316]/90 hover:bg-[#1a1c21] border border-[#c8a97e]/60 text-xs font-mono uppercase tracking-wider text-[#c8a97e] backdrop-blur-md transition-all shadow-lg rounded-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Switch to Cinematic Video
          </button>
        </div>
        <Hero3D
          onExploreClick={onExploreClick}
          onViewProductsClick={onViewProductsClick}
          onRequestQuoteClick={onRequestQuoteClick}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[92vh] flex items-center bg-[#07080a] overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={currentScene.id}
          src={currentScene.videoUrl}
          poster={currentScene.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover transition-opacity duration-1000 scale-[1.02] filter brightness-90 contrast-105"
        />

        {/* Dynamic CCT Temperature Lighting Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 mix-blend-color"
          style={{
            backgroundColor:
              cctWarmth === '2700k'
                ? 'rgba(255, 170, 70, 0.16)'
                : cctWarmth === '3000k'
                ? 'rgba(255, 205, 130, 0.10)'
                : 'rgba(220, 240, 255, 0.08)',
          }}
        />

        {/* Cinematic Vignette and Atmospheric Architectural Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/90 via-[#0a0b0d]/40 to-transparent pointer-events-none" />

        {/* Animated Light Sweep Beam */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 30% 20%, rgba(200, 169, 126, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col justify-between min-h-[85vh] w-full">
        {/* Top Badges & Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a97e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8a97e]"></span>
            </span>
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#c8a97e]">
              Engineered Architectural Illumination
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Switch to 3D room simulation */}
            <button
              onClick={() => setViewMode('3d')}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[#121316]/80 hover:bg-[#1a1c21] border border-white/15 hover:border-[#c8a97e] text-xs font-mono uppercase tracking-wider text-white backdrop-blur-sm transition-all rounded-sm"
            >
              <Box className="w-3.5 h-3.5 text-[#c8a97e]" />
              <span>Launch 3D Room Visualizer</span>
            </button>
          </div>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-3xl my-auto pt-8">
          <div className="text-xs font-mono tracking-widest text-[#a5a299] uppercase mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-[#c8a97e]" />
            <span>Light is the Experience</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f4f2ee] leading-[1.08] mb-6 font-display">
            SCULPTING SPACE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4f2ee] via-[#c8a97e] to-[#dfc299]">
              THROUGH PURE LIGHT
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#ccc8bc] font-light max-w-2xl leading-relaxed mb-8">
            High-performance architectural LED luminaires engineered for luxury residences, 
            monumental hospitality, and precision workspaces. Ultra-low glare optics (UGR &lt; 15) 
            with CRI 98+ museum-grade spectral fidelity.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 bg-[#c8a97e] hover:bg-[#b59569] text-black text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(200,169,126,0.3)] hover:shadow-[0_0_40px_rgba(200,169,126,0.5)] flex items-center gap-2"
            >
              <span>Explore Systems</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewProductsClick}
              className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#c8a97e] text-xs font-semibold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm"
            >
              View Catalogue
            </button>

            {/* Quick CCT Warmth Selector */}
            <div className="flex items-center gap-1.5 ml-0 sm:ml-4 bg-black/60 border border-white/15 p-1 rounded-sm backdrop-blur-md">
              <span className="text-[10px] font-mono text-white/50 px-2 uppercase">CCT:</span>
              {(['2700k', '3000k', '4000k'] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setCctWarmth(k)}
                  className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded transition-colors ${
                    cctWarmth === k
                      ? 'bg-[#c8a97e] text-black font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Scene Selector & Controls Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Scenes Grid */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {HERO_VIDEO_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => setActiveSceneIndex(idx)}
                className={`text-left px-3.5 py-2 rounded-sm border transition-all text-xs ${
                  activeSceneIndex === idx
                    ? 'border-[#c8a97e] bg-white/10 text-white shadow-lg'
                    : 'border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <div className="font-mono text-[10px] text-[#c8a97e] uppercase">Scene 0{idx + 1}</div>
                <div className="font-medium text-xs truncate max-w-[130px]">{scene.title}</div>
              </button>
            ))}
          </div>

          {/* Video Control Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-white/5 border border-white/15 hover:border-[#c8a97e] text-white/80 hover:text-white transition-all backdrop-blur-sm"
              title={isPlaying ? 'Pause cinematic footage' : 'Play cinematic footage'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-white/5 border border-white/15 hover:border-[#c8a97e] text-white/80 hover:text-white transition-all backdrop-blur-sm"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
