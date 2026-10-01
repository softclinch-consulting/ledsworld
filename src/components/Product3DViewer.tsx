import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ProductItem } from '../types/lighting';
import { RotateCw, Sun, Zap, Sliders, Eye, Compass, Sparkles, Check } from 'lucide-react';

interface Product3DViewerProps {
  product: ProductItem;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ product }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(true);
  const [cct, setCct] = useState<2700 | 3000 | 4000>(2700);
  const [beamAngle, setBeamAngle] = useState<15 | 24 | 36 | 60>(24);
  const [dimming, setDimming] = useState(90);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // References to 3D objects
  const sceneElementsRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    fixtureGroup: THREE.Group;
    spotLight: THREE.SpotLight;
    lensMesh: THREE.Mesh;
    beamCone: THREE.Mesh;
    lightPoolMesh: THREE.Mesh;
  } | null>(null);

  // Drag interaction state
  const dragRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    rotationX: 0.2,
    rotationY: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0d10);
    scene.fog = new THREE.FogExp2(0x0c0d10, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.2);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.replaceChildren(renderer.domElement);

    // 2. Ambient & Fill Light for the fixture chassis
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const studioRimLight = new THREE.DirectionalLight(0xc8a97e, 1.2);
    studioRimLight.position.set(3, 4, 3);
    scene.add(studioRimLight);

    const studioFillLight = new THREE.DirectionalLight(0x7890a8, 0.8);
    studioFillLight.position.set(-3, 2, -2);
    scene.add(studioFillLight);

    // 3. Ground Plane with architectural reflection
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.45,
      metalness: 0.2,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Grid markings on floor for engineering look
    const gridHelper = new THREE.GridHelper(8, 16, 0x333842, 0x1f2229);
    gridHelper.position.y = -1.19;
    scene.add(gridHelper);

    // Light pool on floor
    const lightPoolGeo = new THREE.CircleGeometry(1.6, 64);
    const lightPoolMat = new THREE.MeshBasicMaterial({
      color: 0xffaa55,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const lightPoolMesh = new THREE.Mesh(lightPoolGeo, lightPoolMat);
    lightPoolMesh.rotation.x = -Math.PI / 2;
    lightPoolMesh.position.y = -1.18;
    scene.add(lightPoolMesh);

    // 4. Detailed Luminaire Fixture Group
    const fixtureGroup = new THREE.Group();
    fixtureGroup.position.y = 0.6;

    // Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e2025,
      roughness: 0.25,
      metalness: 0.85,
    });
    const brassTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc8a97e,
      roughness: 0.3,
      metalness: 0.9,
    });
    const heatsinkMat = new THREE.MeshStandardMaterial({
      color: 0x151619,
      roughness: 0.6,
      metalness: 0.5,
    });
    const lensEmissiveMat = new THREE.MeshBasicMaterial({
      color: 0xffb86c,
    });

    // Main luminaire body (machined aluminum cylinder)
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.6, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, chassisMat);
    fixtureGroup.add(bodyMesh);

    // Deep anti-glare baffle cone (UGR < 15)
    const baffleGeo = new THREE.ConeGeometry(0.32, 0.28, 32, 1, true);
    const baffleMesh = new THREE.Mesh(baffleGeo, chassisMat);
    baffleMesh.rotation.x = Math.PI;
    baffleMesh.position.y = -0.22;
    fixtureGroup.add(baffleMesh);

    // Brass accent bevel ring
    const bezelGeo = new THREE.TorusGeometry(0.35, 0.02, 16, 32);
    const bezelMesh = new THREE.Mesh(bezelGeo, brassTrimMat);
    bezelMesh.rotation.x = Math.PI / 2;
    bezelMesh.position.y = -0.3;
    fixtureGroup.add(bezelMesh);

    // Heat sink cooling fins (top)
    for (let i = 0; i < 6; i++) {
      const finGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.02, 32);
      const finMesh = new THREE.Mesh(finGeo, heatsinkMat);
      finMesh.position.y = 0.12 + i * 0.045;
      fixtureGroup.add(finMesh);
    }

    // Optical COB LED Lens
    const lensGeo = new THREE.CircleGeometry(0.18, 32);
    const lensMesh = new THREE.Mesh(lensGeo, lensEmissiveMat);
    lensMesh.rotation.x = Math.PI / 2;
    lensMesh.position.y = -0.15;
    fixtureGroup.add(lensMesh);

    // Suspension wire or mounting stem
    const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.2, 16);
    const stemMesh = new THREE.Mesh(stemGeo, brassTrimMat);
    stemMesh.position.y = 0.95;
    fixtureGroup.add(stemMesh);

    // Ceil plate
    const canopyGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 32);
    const canopyMesh = new THREE.Mesh(canopyGeo, chassisMat);
    canopyMesh.position.y = 1.55;
    fixtureGroup.add(canopyMesh);

    // 5. Projected Light Beam Volumetric Cone
    const coneHeight = 1.7;
    const coneRadius = Math.tan(THREE.MathUtils.degToRad(24 / 2)) * coneHeight;
    const coneGeo = new THREE.ConeGeometry(coneRadius, coneHeight, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xffaa55,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const beamCone = new THREE.Mesh(coneGeo, coneMat);
    beamCone.position.y = -0.2 - coneHeight / 2;
    fixtureGroup.add(beamCone);

    // 6. Three.js Real Spot Light
    const spotLight = new THREE.SpotLight(0xffaa55, 30);
    spotLight.position.set(0, 0, 0);
    spotLight.target.position.set(0, -2, 0);
    spotLight.angle = THREE.MathUtils.degToRad(24 / 2);
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    fixtureGroup.add(spotLight);
    fixtureGroup.add(spotLight.target);

    scene.add(fixtureGroup);

    sceneElementsRef.current = {
      scene,
      camera,
      renderer,
      fixtureGroup,
      spotLight,
      lensMesh,
      beamCone,
      lightPoolMesh,
    };

    // Mouse / Touch Drag handling
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      dragRef.current.isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragRef.current.prevX = clientX;
      dragRef.current.prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragRef.current.prevX;
      const deltaY = clientY - dragRef.current.prevY;

      dragRef.current.rotationY += deltaX * 0.01;
      dragRef.current.rotationX = Math.max(-0.4, Math.min(0.6, dragRef.current.rotationX + deltaY * 0.008));

      dragRef.current.prevX = clientX;
      dragRef.current.prevY = clientY;
    };

    const onPointerUp = () => {
      dragRef.current.isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    domElement.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domElement.addEventListener('touchstart', onPointerDown);
    domElement.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      if (isAutoRotate && !dragRef.current.isDragging) {
        dragRef.current.rotationY += 0.006;
      }

      fixtureGroup.rotation.y = dragRef.current.rotationY;
      fixtureGroup.rotation.x = dragRef.current.rotationX;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      domElement.removeEventListener('mousedown', onPointerDown);
      domElement.removeEventListener('mousemove', onPointerMove);
      domElement.removeEventListener('touchstart', onPointerDown);
      domElement.removeEventListener('touchmove', onPointerMove);
      renderer.dispose();
    };
  }, []);

  // Update light color & beam angle dynamically
  useEffect(() => {
    const el = sceneElementsRef.current;
    if (!el) return;

    let hexColor = 0xffaa55;
    if (cct === 2700) hexColor = 0xffa852;
    else if (cct === 3000) hexColor = 0xffcf91;
    else if (cct === 4000) hexColor = 0xfff0dd;

    const intensityScale = isOn ? (dimming / 100) : 0;

    // Spot light
    el.spotLight.color.setHex(hexColor);
    el.spotLight.intensity = intensityScale * 35;
    el.spotLight.angle = THREE.MathUtils.degToRad(beamAngle / 2);

    // Lens emissive
    (el.lensMesh.material as THREE.MeshBasicMaterial).color.setHex(hexColor);
    (el.lensMesh.material as THREE.MeshBasicMaterial).opacity = isOn ? 1 : 0.1;

    // Beam cone geometry & material
    const coneHeight = 1.7;
    const coneRadius = Math.tan(THREE.MathUtils.degToRad(beamAngle / 2)) * coneHeight;
    el.beamCone.geometry.dispose();
    el.beamCone.geometry = new THREE.ConeGeometry(coneRadius, coneHeight, 32, 1, true);
    (el.beamCone.material as THREE.MeshBasicMaterial).color.setHex(hexColor);
    (el.beamCone.material as THREE.MeshBasicMaterial).opacity = isOn ? (dimming / 100) * 0.28 : 0;

    // Floor light pool
    const poolRadius = Math.max(0.6, coneRadius * 1.5);
    el.lightPoolMesh.scale.set(poolRadius, poolRadius, 1);
    (el.lightPoolMesh.material as THREE.MeshBasicMaterial).color.setHex(hexColor);
    (el.lightPoolMesh.material as THREE.MeshBasicMaterial).opacity = isOn ? (dimming / 100) * 0.45 : 0;
  }, [cct, beamAngle, dimming, isOn]);

  return (
    <div className="relative bg-[#101215] border border-white/10 rounded-sm overflow-hidden">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-[460px] sm:h-[520px] cursor-grab active:cursor-grabbing"
      />

      {/* Engineering Overlay Header */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-[#c8a97e] flex items-center gap-2">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Interactive 3D Engineering Model</span>
        </div>
      </div>

      {/* Live Optical Telemetry (Top Right) */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex flex-col gap-1 items-end text-[10px] font-mono bg-black/80 backdrop-blur-md border border-white/15 p-2.5 rounded-sm">
        <div className="text-white/40 uppercase">Optical Diagnostics</div>
        <div className="text-[#c8a97e]">CCT: {cct}K</div>
        <div className="text-white">BEAM: {beamAngle}° FWHM</div>
        <div className="text-emerald-400">FLUX: {isOn ? Math.round(Number(product.specs.lumens.replace(/\D/g, '') || 1200) * (dimming / 100)) : 0} lm</div>
      </div>

      {/* Floating Control Bar (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/85 backdrop-blur-lg border border-white/15 p-4 rounded-sm flex flex-wrap items-center justify-between gap-4">
        {/* Power Toggle */}
        <button
          onClick={() => setIsOn(!isOn)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider border transition-all ${
            isOn
              ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'border-white/15 bg-white/5 text-white/40'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isOn ? 'Active (ON)' : 'Standby (OFF)'}</span>
        </button>

        {/* CCT Kelvin Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-white/40 uppercase mr-1">CCT:</span>
          {([2700, 3000, 4000] as const).map((k) => (
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

        {/* Beam Angle Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-white/40 uppercase mr-1">Optic:</span>
          {([15, 24, 36, 60] as const).map((deg) => (
            <button
              key={deg}
              onClick={() => setBeamAngle(deg)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                beamAngle === deg
                  ? 'border-[#c8a97e] bg-[#c8a97e]/20 text-[#c8a97e] font-semibold'
                  : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>

        {/* Dimmer Slider */}
        <div className="flex items-center gap-2 min-w-[140px]">
          <Sun className="w-3.5 h-3.5 text-white/40" />
          <input
            type="range"
            min="10"
            max="100"
            value={dimming}
            disabled={!isOn}
            onChange={(e) => setDimming(Number(e.target.value))}
            className="w-24 accent-[#c8a97e] h-1.5 bg-white/20 rounded cursor-pointer disabled:opacity-30"
          />
          <span className="text-[10px] font-mono text-white/70 w-8">{dimming}%</span>
        </div>

        {/* Orbit auto-rotate toggle */}
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
            isAutoRotate
              ? 'border-white/20 bg-white/10 text-white'
              : 'border-white/10 bg-transparent text-white/40'
          }`}
        >
          {isAutoRotate ? 'Orbiting' : 'Paused'}
        </button>
      </div>
    </div>
  );
};
