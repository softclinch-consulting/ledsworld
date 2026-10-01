import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Sun, Sliders, Sparkles, Layers, RotateCw, Lightbulb } from 'lucide-react';

export const Spatial3DSimulator: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cct, setCct] = useState<2200 | 2700 | 3500 | 5000>(2700);
  const [layers, setLayers] = useState({
    downlights: true,
    cove: true,
    wallGrazer: true,
  });
  const [overallIntensity, setOverallIntensity] = useState(85);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    lights: {
      ambient: THREE.AmbientLight;
      downlight1: THREE.SpotLight;
      downlight2: THREE.SpotLight;
      downlight3: THREE.SpotLight;
      coveLight: THREE.PointLight;
      wallGrazer: THREE.SpotLight;
    };
    emissives: {
      downlights: THREE.MeshBasicMaterial[];
      cove: THREE.MeshBasicMaterial;
      wallGrazer: THREE.MeshBasicMaterial;
    };
  } | null>(null);

  const cameraAngleRef = useRef({
    yaw: 0.15,
    pitch: 0.1,
    isDragging: false,
    prevX: 0,
    prevY: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0b0d);
    scene.fog = new THREE.FogExp2(0x0a0b0d, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50);
    camera.position.set(0, 1.6, 4.2);
    camera.lookAt(0, 1.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.replaceChildren(renderer.domElement);

    // 2. Room Geometry: Minimalist Architectural Interior
    // Floor
    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x181a1e,
      roughness: 0.25,
      metalness: 0.35,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Ceiling
    const ceilGeo = new THREE.PlaneGeometry(8, 8);
    const ceilMat = new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.8,
    });
    const ceilMesh = new THREE.Mesh(ceilGeo, ceilMat);
    ceilMesh.position.y = 2.8;
    ceilMesh.rotation.x = Math.PI / 2;
    ceilMesh.receiveShadow = true;
    scene.add(ceilMesh);

    // Back Feature Wall (Architectural fluted / textured wall)
    const wallGeo = new THREE.PlaneGeometry(8, 2.8);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x16181c,
      roughness: 0.5,
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 1.4, -2.8);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 2.8), wallMat);
    leftWall.position.set(-3.5, 1.4, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Architectural Low Bench / Console Table
    const benchGeo = new THREE.BoxGeometry(3.6, 0.45, 0.7);
    const benchMat = new THREE.MeshStandardMaterial({
      color: 0x111214,
      roughness: 0.3,
      metalness: 0.6,
    });
    const bench = new THREE.Mesh(benchGeo, benchMat);
    bench.position.set(0, 0.225, -2.2);
    bench.castShadow = true;
    bench.receiveShadow = true;
    scene.add(bench);

    // Architectural Minimalist Sculpture on Console
    const artGeo = new THREE.TorusKnotGeometry(0.22, 0.05, 64, 16);
    const artMat = new THREE.MeshStandardMaterial({
      color: 0xc8a97e,
      metalness: 0.9,
      roughness: 0.2,
    });
    const artMesh = new THREE.Mesh(artGeo, artMat);
    artMesh.position.set(0, 0.65, -2.2);
    artMesh.castShadow = true;
    scene.add(artMesh);

    // 3. Multi-Channel Architectural Lighting Setup
    // Channel A: Ambient Light
    const ambient = new THREE.AmbientLight(0x1a1e24, 0.4);
    scene.add(ambient);

    // Channel B: Recessed Downlights (Triple ceiling fixtures)
    const dlMat = new THREE.MeshBasicMaterial({ color: 0xffaa55 });
    const dlEmissives: THREE.MeshBasicMaterial[] = [];

    const createDownlight = (x: number, z: number) => {
      const ringGeo = new THREE.RingGeometry(0.04, 0.08, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, 2.79, z);
      scene.add(ring);

      const lensGeo = new THREE.CircleGeometry(0.04, 24);
      const lensMat = dlMat.clone();
      dlEmissives.push(lensMat);
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(x, 2.788, z);
      scene.add(lens);

      const spot = new THREE.SpotLight(0xffaa55, 18);
      spot.position.set(x, 2.78, z);
      spot.target.position.set(x, 0, z);
      spot.angle = THREE.MathUtils.degToRad(28);
      spot.penumbra = 0.6;
      spot.castShadow = true;
      spot.shadow.mapSize.width = 512;
      spot.shadow.mapSize.height = 512;
      scene.add(spot);
      scene.add(spot.target);
      return spot;
    };

    const downlight1 = createDownlight(-1.1, -0.6);
    const downlight2 = createDownlight(0, -0.6);
    const downlight3 = createDownlight(1.1, -0.6);

    // Channel C: Cove Indirect Perimeter Light
    const coveLight = new THREE.PointLight(0xffaa55, 12, 6);
    coveLight.position.set(0, 2.7, -2.6);
    scene.add(coveLight);

    const coveStripGeo = new THREE.BoxGeometry(7.2, 0.03, 0.03);
    const coveEmissive = new THREE.MeshBasicMaterial({ color: 0xffaa55 });
    const coveStrip = new THREE.Mesh(coveStripGeo, coveEmissive);
    coveStrip.position.set(0, 2.73, -2.7);
    scene.add(coveStrip);

    // Channel D: Feature Wall Grazer Light
    const wallGrazer = new THREE.SpotLight(0xffaa55, 20);
    wallGrazer.position.set(0, 2.75, -2.3);
    wallGrazer.target.position.set(0, 0.8, -2.8);
    wallGrazer.angle = THREE.MathUtils.degToRad(35);
    wallGrazer.penumbra = 0.8;
    wallGrazer.castShadow = true;
    scene.add(wallGrazer);
    scene.add(wallGrazer.target);

    const wgStripGeo = new THREE.BoxGeometry(3.2, 0.02, 0.04);
    const wallGrazerEmissive = new THREE.MeshBasicMaterial({ color: 0xffaa55 });
    const wgStrip = new THREE.Mesh(wgStripGeo, wallGrazerEmissive);
    wgStrip.position.set(0, 2.75, -2.3);
    scene.add(wgStrip);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      lights: {
        ambient,
        downlight1,
        downlight2,
        downlight3,
        coveLight,
        wallGrazer,
      },
      emissives: {
        downlights: dlEmissives,
        cove: coveEmissive,
        wallGrazer: wallGrazerEmissive,
      },
    };

    // Camera dragging logic
    const dom = renderer.domElement;
    const handleDown = (e: MouseEvent | TouchEvent) => {
      cameraAngleRef.current.isDragging = true;
      cameraAngleRef.current.prevX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      cameraAngleRef.current.prevY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!cameraAngleRef.current.isDragging) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const dx = x - cameraAngleRef.current.prevX;
      const dy = y - cameraAngleRef.current.prevY;

      cameraAngleRef.current.yaw += dx * 0.005;
      cameraAngleRef.current.pitch = Math.max(-0.2, Math.min(0.4, cameraAngleRef.current.pitch + dy * 0.004));

      cameraAngleRef.current.prevX = x;
      cameraAngleRef.current.prevY = y;
    };

    const handleUp = () => {
      cameraAngleRef.current.isDragging = false;
    };

    dom.addEventListener('mousedown', handleDown);
    dom.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    dom.addEventListener('touchstart', handleDown);
    dom.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);

    let reqId: number;
    const renderLoop = () => {
      // Smooth orbit around focal center
      const r = 4.2;
      camera.position.x = Math.sin(cameraAngleRef.current.yaw) * r;
      camera.position.z = Math.cos(cameraAngleRef.current.yaw) * r;
      camera.position.y = 1.6 + cameraAngleRef.current.pitch * 2;
      camera.lookAt(0, 1.2, -0.6);

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
      dom.removeEventListener('mousedown', handleDown);
      dom.removeEventListener('mousemove', handleMove);
      dom.removeEventListener('touchstart', handleDown);
      dom.removeEventListener('touchmove', handleMove);
      renderer.dispose();
    };
  }, []);

  // Update dynamic Kelvin & multi-channel fixtures
  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;

    let hex = 0xffaa55;
    if (cct === 2200) hex = 0xff8c2b;
    else if (cct === 2700) hex = 0xffab5e;
    else if (cct === 3500) hex = 0xffdbaf;
    else if (cct === 5000) hex = 0xd9eaff;

    const baseIntensity = overallIntensity / 100;

    // Downlights
    const dlIntensity = layers.downlights ? baseIntensity * 22 : 0;
    s.lights.downlight1.intensity = dlIntensity;
    s.lights.downlight1.color.setHex(hex);
    s.lights.downlight2.intensity = dlIntensity;
    s.lights.downlight2.color.setHex(hex);
    s.lights.downlight3.intensity = dlIntensity;
    s.lights.downlight3.color.setHex(hex);
    s.emissives.downlights.forEach((mat) => {
      mat.color.setHex(hex);
      mat.opacity = layers.downlights ? 1 : 0.05;
    });

    // Cove
    const coveIntensity = layers.cove ? baseIntensity * 16 : 0;
    s.lights.coveLight.intensity = coveIntensity;
    s.lights.coveLight.color.setHex(hex);
    s.emissives.cove.color.setHex(hex);
    s.emissives.cove.opacity = layers.cove ? 1 : 0.05;

    // Wall Grazer
    const wgIntensity = layers.wallGrazer ? baseIntensity * 24 : 0;
    s.lights.wallGrazer.intensity = wgIntensity;
    s.lights.wallGrazer.color.setHex(hex);
    s.emissives.wallGrazer.color.setHex(hex);
    s.emissives.wallGrazer.opacity = layers.wallGrazer ? 1 : 0.05;
  }, [cct, layers, overallIntensity]);

  // Estimated Lux computation
  const activeCount = (layers.downlights ? 1 : 0) + (layers.cove ? 0.6 : 0) + (layers.wallGrazer ? 0.8 : 0);
  const calculatedLux = Math.round(activeCount * (overallIntensity / 100) * 220);

  return (
    <div className="relative bg-[#0d0e11] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-[480px] sm:h-[550px] cursor-grab active:cursor-grabbing"
      />

      {/* Header Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="px-3 py-1.5 bg-black/85 backdrop-blur-md border border-white/15 text-xs font-mono text-[#c8a97e] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time 3D Spatial Illumination Simulation</span>
        </div>
      </div>

      {/* Lux Meter Telemetry (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1 text-[11px] font-mono bg-black/85 backdrop-blur-md border border-white/15 p-3 rounded-sm">
        <div className="text-white/40 uppercase">Photometric Calculation</div>
        <div className="text-xl font-bold text-[#c8a97e]">{calculatedLux} <span className="text-xs text-white/60">LUX</span></div>
        <div className="text-[10px] text-emerald-400">Glare Rating: UGR &lt; 14</div>
      </div>

      {/* Architectural Layer & CCT Control Deck (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/90 backdrop-blur-xl border border-white/15 p-4 rounded-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Luminaire Channels */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-white/40 uppercase mr-1">Systems:</span>
          
          <button
            onClick={() => setLayers((p) => ({ ...p, downlights: !p.downlights }))}
            className={`px-3 py-1.5 text-xs font-mono uppercase rounded border transition-all ${
              layers.downlights
                ? 'border-[#c8a97e] bg-[#c8a97e]/15 text-[#c8a97e]'
                : 'border-white/15 bg-white/5 text-white/40'
            }`}
          >
            Downlights
          </button>

          <button
            onClick={() => setLayers((p) => ({ ...p, cove: !p.cove }))}
            className={`px-3 py-1.5 text-xs font-mono uppercase rounded border transition-all ${
              layers.cove
                ? 'border-[#c8a97e] bg-[#c8a97e]/15 text-[#c8a97e]'
                : 'border-white/15 bg-white/5 text-white/40'
            }`}
          >
            Perimeter Cove
          </button>

          <button
            onClick={() => setLayers((p) => ({ ...p, wallGrazer: !p.wallGrazer }))}
            className={`px-3 py-1.5 text-xs font-mono uppercase rounded border transition-all ${
              layers.wallGrazer
                ? 'border-[#c8a97e] bg-[#c8a97e]/15 text-[#c8a97e]'
                : 'border-white/15 bg-white/5 text-white/40'
            }`}
          >
            Wall Grazer
          </button>
        </div>

        {/* CCT Kelvin Preset Selection */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-white/40 uppercase mr-1">CCT:</span>
          {([2200, 2700, 3500, 5000] as const).map((k) => (
            <button
              key={k}
              onClick={() => setCct(k)}
              className={`px-2.5 py-1 text-xs font-mono uppercase rounded border transition-colors ${
                cct === k
                  ? 'border-[#c8a97e] bg-[#c8a97e] text-black font-semibold'
                  : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {k}K
            </button>
          ))}
        </div>

        {/* Master Dimmer */}
        <div className="flex items-center gap-2">
          <Sun className="w-3.5 h-3.5 text-white/40" />
          <input
            type="range"
            min="0"
            max="100"
            value={overallIntensity}
            onChange={(e) => setOverallIntensity(Number(e.target.value))}
            className="w-24 accent-[#c8a97e] h-1.5 bg-white/20 rounded cursor-pointer"
          />
          <span className="text-[10px] font-mono text-white/70 w-8">{overallIntensity}%</span>
        </div>
      </div>
    </div>
  );
};
