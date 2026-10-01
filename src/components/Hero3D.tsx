import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Eye, Move, Lightbulb, Sun, Compass, Sparkles, Sliders, ChevronDown } from 'lucide-react';

interface Hero3DProps {
  onExploreClick?: () => void;
  onViewProductsClick?: () => void;
  onRequestQuoteClick?: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({
  onExploreClick,
  onViewProductsClick,
  onRequestQuoteClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePreset, setActivePreset] = useState<'warm' | 'neutral' | 'focus'>('warm');
  const [activeFixture, setActiveFixture] = useState<string | null>(null);
  const [fixturesState, setFixturesState] = useState({
    pendant: true,
    cove: true,
    downlights: true,
    wallgrazer: true,
  });
  const [showControlsHint, setShowControlsHint] = useState(true);

  // References to 3D scene elements to allow dynamic UI interaction
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    lights: {
      ambient: THREE.AmbientLight;
      pendantPoint: THREE.PointLight;
      coveLinear1: THREE.RectAreaLight | THREE.SpotLight;
      coveLinear2: THREE.RectAreaLight | THREE.SpotLight;
      downlight1: THREE.SpotLight;
      downlight2: THREE.SpotLight;
      downlight3: THREE.SpotLight;
      wallGrazer: THREE.SpotLight;
    };
    materials: {
      pendantEmissive: THREE.MeshBasicMaterial;
      coveEmissive: THREE.MeshBasicMaterial;
      downlightEmissive: THREE.MeshBasicMaterial;
      wallGrazerEmissive: THREE.MeshBasicMaterial;
    };
    interactiveMeshes: {
      pendant: THREE.Object3D;
      cove: THREE.Object3D;
      downlights: THREE.Object3D;
      wallGrazer: THREE.Object3D;
    };
  } | null>(null);

  // Movement & Camera Look state
  const cameraState = useRef({
    pitch: 0,
    yaw: 0,
    targetPitch: 0,
    targetYaw: 0,
    position: new THREE.Vector3(0, 1.65, 4.8),
    targetPosition: new THREE.Vector3(0, 1.65, 3.2),
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    keysPressed: { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false },
    introAnimationComplete: false,
    introStartTime: 0,
  });

  // Touch look helper
  const touchState = useRef({
    startX: 0,
    startY: 0,
    isTouching: false,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0b0d);
    scene.fog = new THREE.FogExp2(0x0a0b0d, 0.05);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 100);
    camera.position.set(0, 1.65, 4.8); // Eye-level at start
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Texture helper for realistic architectural materials
    const createFloorTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#16181b';
        ctx.fillRect(0, 0, 512, 512);
        // Subtle plank lines & stone aggregate
        ctx.fillStyle = '#1c1e22';
        for (let i = 0; i < 512; i += 64) {
          ctx.fillRect(i, 0, 1, 512);
          ctx.fillRect(0, i, 512, 1);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        for (let j = 0; j < 3000; j++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(8, 8);
      return texture;
    };

    const floorTexture = createFloorTexture();

    // 3. Materials
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.28,
      metalness: 0.12,
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x222428,
      roughness: 0.85,
      metalness: 0.05,
    });

    const featureWallMaterial = new THREE.MeshStandardMaterial({
      color: 0x181a1d,
      roughness: 0.6,
      metalness: 0.2,
    });

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0x191a1d,
      roughness: 0.9,
      metalness: 0.02,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8a97e,
      metalness: 0.85,
      roughness: 0.3,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x121316,
      metalness: 0.8,
      roughness: 0.4,
    });

    // Emissive materials for active fixtures
    const pendantEmissive = new THREE.MeshBasicMaterial({ color: 0xffeecc });
    const coveEmissive = new THREE.MeshBasicMaterial({ color: 0xffe2b8 });
    const downlightEmissive = new THREE.MeshBasicMaterial({ color: 0xffeedd });
    const wallGrazerEmissive = new THREE.MeshBasicMaterial({ color: 0xffd9a6 });

    // 4. Room Geometry (10m x 8m x 3.6m ceiling)
    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 16), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling with recessed architectural light channels
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(12, 16), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 3.6, 0);
    scene.add(ceiling);

    // Back Feature Wall (behind lounge)
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 3.6), wallMaterial);
    backWall.position.set(0, 1.8, -4.5);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Architectural Slatted Wooden/Stone Feature Panel on back wall
    const slatGroup = new THREE.Group();
    for (let x = -2.5; x <= 2.5; x += 0.14) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.4, 0.05), featureWallMaterial);
      slat.position.set(x, 1.7, -4.42);
      slat.castShadow = true;
      slat.receiveShadow = true;
      slatGroup.add(slat);
    }
    scene.add(slatGroup);

    // Left Wall with large floor-to-ceiling glass window vista
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 3.6), wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-5, 1.8, 0);
    scene.add(leftWall);

    // Right Wall with art alcove
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 3.6), wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(5, 1.8, 0);
    scene.add(rightWall);

    // Front Wall (behind start camera)
    const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 3.6), wallMaterial);
    frontWall.rotation.y = Math.PI;
    frontWall.position.set(0, 1.8, 6.5);
    scene.add(frontWall);

    // Architectural Column / Pillar
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.65, 3.6, 0.65), wallMaterial);
    pillar.position.set(2.8, 1.8, 0.8);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    scene.add(pillar);

    // 5. Furniture & Interior Elements
    // Minimalist Luxury Low-Slung Sofa
    const sofaGroup = new THREE.Group();
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.35, 1.2), darkMetalMaterial);
    sofaBase.position.set(0, 0.18, -1.2);
    sofaBase.castShadow = true;
    sofaGroup.add(sofaBase);

    const sofaCushion = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.28, 1.05),
      new THREE.MeshStandardMaterial({ color: 0x282a2e, roughness: 0.7 })
    );
    sofaCushion.position.set(0, 0.45, -1.2);
    sofaCushion.castShadow = true;
    sofaGroup.add(sofaCushion);

    const sofaBack = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.5, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.75 })
    );
    sofaBack.position.set(0, 0.65, -1.6);
    sofaBack.castShadow = true;
    sofaGroup.add(sofaBack);

    // Travertine Minimalist Low Table
    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.12, 0.9),
      new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.4, metalness: 0.05 })
    );
    tableTop.position.set(0, 0.28, 0.3);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    sofaGroup.add(tableTop);

    const tableBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.22, 0.6), darkMetalMaterial);
    tableBase.position.set(0, 0.11, 0.3);
    sofaGroup.add(tableBase);

    scene.add(sofaGroup);

    // 6. Interactive LED Fixtures & Lights
    // A. Ambient soft base (starts near 0 for dramatic dark reveal)
    const ambientLight = new THREE.AmbientLight(0x0e1116, 0.2);
    scene.add(ambientLight);

    // B. Fixture 1: Suspended Brass Architectural Pendant (LW-PD05)
    const pendantGroup = new THREE.Group();
    pendantGroup.position.set(0, 2.3, 0.3);

    // Cord
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 1.3), darkMetalMaterial);
    cord.position.set(0, 0.65, 0);
    pendantGroup.add(cord);

    // Brass ring housing
    const brassRing = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.035, 16, 64), brassMaterial);
    brassRing.rotation.x = Math.PI / 2;
    brassRing.castShadow = true;
    pendantGroup.add(brassRing);

    // Diffuser ring with emissive light
    const diffuserRing = new THREE.Mesh(new THREE.TorusGeometry(0.51, 0.02, 16, 64), pendantEmissive);
    diffuserRing.rotation.x = Math.PI / 2;
    pendantGroup.add(diffuserRing);

    // Hotspot beacon icon
    const pendantHotspot = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xc8a97e, wireframe: true })
    );
    pendantHotspot.position.set(0, 0, 0);
    pendantGroup.add(pendantHotspot);

    scene.add(pendantGroup);

    const pendantPoint = new THREE.PointLight(0xffeedd, 0, 7, 1.8);
    pendantPoint.position.set(0, 2.2, 0.3);
    pendantPoint.castShadow = true;
    pendantPoint.shadow.bias = -0.002;
    scene.add(pendantPoint);

    // C. Fixture 2: Recessed Ceiling Linear Cove (LW-LN204)
    const coveGroup = new THREE.Group();
    const coveMesh1 = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.04, 0.08), coveEmissive);
    coveMesh1.position.set(0, 3.56, -4.3);
    coveGroup.add(coveMesh1);

    const coveMesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 8.0), coveEmissive);
    coveMesh2.position.set(-4.8, 3.56, 0);
    coveGroup.add(coveMesh2);

    scene.add(coveGroup);

    const coveLinear1 = new THREE.SpotLight(0xffe2b8, 0, 8, Math.PI / 2.8, 0.8, 1.6);
    coveLinear1.position.set(0, 3.55, -4.2);
    coveLinear1.target.position.set(0, 0, -4.4);
    scene.add(coveLinear1);
    scene.add(coveLinear1.target);

    const coveLinear2 = new THREE.SpotLight(0xffe2b8, 0, 8, Math.PI / 2.8, 0.8, 1.6);
    coveLinear2.position.set(-4.7, 3.55, 0);
    coveLinear2.target.position.set(-4.9, 0, 0);
    scene.add(coveLinear2);
    scene.add(coveLinear2.target);

    // D. Fixture 3: Downlight Array (LW-DL08)
    const downlightGroup = new THREE.Group();
    const createDownlightMesh = (x: number, z: number) => {
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24), darkMetalMaterial);
      bezel.position.set(x, 3.59, z);
      const aperture = new THREE.Mesh(new THREE.CircleGeometry(0.05, 24), downlightEmissive);
      aperture.rotation.x = Math.PI / 2;
      aperture.position.set(x, 3.585, z);
      downlightGroup.add(bezel);
      downlightGroup.add(aperture);
    };

    createDownlightMesh(-1.5, 1.2);
    createDownlightMesh(0, 1.2);
    createDownlightMesh(1.5, 1.2);
    scene.add(downlightGroup);

    const downlight1 = new THREE.SpotLight(0xffeedd, 0, 6, Math.PI / 6, 0.5, 2);
    downlight1.position.set(-1.5, 3.58, 1.2);
    downlight1.target.position.set(-1.5, 0, 1.2);
    scene.add(downlight1);
    scene.add(downlight1.target);

    const downlight2 = new THREE.SpotLight(0xffeedd, 0, 6, Math.PI / 6, 0.5, 2);
    downlight2.position.set(0, 3.58, 1.2);
    downlight2.target.position.set(0, 0, 1.2);
    scene.add(downlight2);
    scene.add(downlight2.target);

    const downlight3 = new THREE.SpotLight(0xffeedd, 0, 6, Math.PI / 6, 0.5, 2);
    downlight3.position.set(1.5, 3.58, 1.2);
    downlight3.target.position.set(1.5, 0, 1.2);
    scene.add(downlight3);
    scene.add(downlight3.target);

    // E. Fixture 4: Architectural Wall-Grazer Spotlight (LW-TR30)
    const wallGrazerMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.12, 16), brassMaterial);
    wallGrazerMesh.position.set(2.0, 3.5, -2.5);
    wallGrazerMesh.rotation.x = Math.PI / 4;
    scene.add(wallGrazerMesh);

    const wallGrazer = new THREE.SpotLight(0xffd9a6, 0, 7, Math.PI / 5, 0.4, 1.8);
    wallGrazer.position.set(2.0, 3.5, -2.5);
    wallGrazer.target.position.set(0, 1.2, -4.4);
    scene.add(wallGrazer);
    scene.add(wallGrazer.target);

    // Save refs for state and animation
    sceneRef.current = {
      scene,
      camera,
      renderer,
      lights: {
        ambient: ambientLight,
        pendantPoint,
        coveLinear1,
        coveLinear2,
        downlight1,
        downlight2,
        downlight3,
        wallGrazer,
      },
      materials: {
        pendantEmissive,
        coveEmissive,
        downlightEmissive,
        wallGrazerEmissive,
      },
      interactiveMeshes: {
        pendant: pendantGroup,
        cove: coveGroup,
        downlights: downlightGroup,
        wallGrazer: wallGrazerMesh,
      },
    };

    setIsLoaded(true);
    cameraState.current.introStartTime = performance.now();

    // 7. Event Handlers: Mouse drag / pointer move for 360° camera look
    const onMouseDown = (e: MouseEvent) => {
      // Don't intercept if clicking an interactive UI button
      if ((e.target as HTMLElement).closest('button, a, input, select')) return;
      cameraState.current.isDragging = true;
      cameraState.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!cameraState.current.isDragging) return;
      const deltaX = e.clientX - cameraState.current.previousMousePosition.x;
      const deltaY = e.clientY - cameraState.current.previousMousePosition.y;

      // Sensitivity
      cameraState.current.targetYaw -= deltaX * 0.0035;
      cameraState.current.targetPitch = Math.max(
        -Math.PI / 3.2,
        Math.min(Math.PI / 3.5, cameraState.current.targetPitch - deltaY * 0.003)
      );

      cameraState.current.previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      cameraState.current.isDragging = false;
    };

    // Touch controls for mobile
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input, select')) return;
      if (e.touches.length === 1) {
        touchState.current.isTouching = true;
        touchState.current.startX = e.touches[0].clientX;
        touchState.current.startY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchState.current.isTouching || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchState.current.startX;
      const deltaY = e.touches[0].clientY - touchState.current.startY;

      cameraState.current.targetYaw -= deltaX * 0.004;
      cameraState.current.targetPitch = Math.max(
        -Math.PI / 3.2,
        Math.min(Math.PI / 3.5, cameraState.current.targetPitch - deltaY * 0.004)
      );

      touchState.current.startX = e.touches[0].clientX;
      touchState.current.startY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      touchState.current.isTouching = false;
    };

    // Keyboard controls (WASD & Arrows for human-scale movement)
    const onKeyDown = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        if (e.code === 'KeyW' || e.code === 'ArrowUp') cameraState.current.keysPressed.w = true;
        if (e.code === 'KeyS' || e.code === 'ArrowDown') cameraState.current.keysPressed.s = true;
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') cameraState.current.keysPressed.a = true;
        if (e.code === 'KeyD' || e.code === 'ArrowRight') cameraState.current.keysPressed.d = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') cameraState.current.keysPressed.w = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') cameraState.current.keysPressed.s = false;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') cameraState.current.keysPressed.a = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') cameraState.current.keysPressed.d = false;
    };

    // Window Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // 8. Main Animation Loop
    let animationFrameId: number;
    const moveSpeed = 0.045;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (time - cameraState.current.introStartTime) / 1000;

      // Cinematic Intro Choreography
      // 0.0s - 0.8s: Dark atmosphere
      // 0.8s - 1.8s: Brass Pendant activates (One fixture turns on)
      // 1.8s - 2.8s: Architectural Cove washes reveal structural lines
      // 2.8s - 3.8s: Downlights & Wall grazers activate
      // Camera smoothly glides forward from 4.8 to 3.2
      if (!cameraState.current.introAnimationComplete) {
        if (elapsed > 0.6) {
          // Pendant reveal
          const pProg = Math.min(1, (elapsed - 0.6) / 1.0);
          pendantPoint.intensity = pProg * 2.2;
          pendantEmissive.color.setRGB(1.0 * pProg, 0.93 * pProg, 0.8 * pProg);
        }

        if (elapsed > 1.6) {
          // Cove reveal
          const cProg = Math.min(1, (elapsed - 1.6) / 1.2);
          coveLinear1.intensity = cProg * 2.8;
          coveLinear2.intensity = cProg * 2.8;
          coveEmissive.color.setRGB(1.0 * cProg, 0.88 * cProg, 0.72 * cProg);
          ambientLight.intensity = 0.2 + cProg * 0.35;
        }

        if (elapsed > 2.6) {
          // Downlights reveal
          const dProg = Math.min(1, (elapsed - 2.6) / 1.0);
          downlight1.intensity = dProg * 2.0;
          downlight2.intensity = dProg * 2.0;
          downlight3.intensity = dProg * 2.0;
          wallGrazer.intensity = dProg * 2.2;
          downlightEmissive.color.setRGB(1.0 * dProg, 0.95 * dProg, 0.85 * dProg);
          wallGrazerEmissive.color.setRGB(1.0 * dProg, 0.85 * dProg, 0.65 * dProg);
        }

        // Camera gentle forward dolly
        const camProg = Math.min(1, elapsed / 3.8);
        const easeProg = 1 - Math.pow(1 - camProg, 3);
        camera.position.z = 4.8 - easeProg * 1.6;

        if (elapsed >= 3.8) {
          cameraState.current.introAnimationComplete = true;
          cameraState.current.position.set(camera.position.x, camera.position.y, camera.position.z);
        }
      } else {
        // Human-scale WASD navigation within room bounds
        const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraState.current.yaw);
        const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraState.current.yaw);

        const moveDir = new THREE.Vector3(0, 0, 0);
        if (cameraState.current.keysPressed.w) moveDir.add(forward);
        if (cameraState.current.keysPressed.s) moveDir.sub(forward);
        if (cameraState.current.keysPressed.d) moveDir.add(right);
        if (cameraState.current.keysPressed.a) moveDir.sub(right);

        if (moveDir.lengthSq() > 0) {
          moveDir.normalize();
          cameraState.current.position.x += moveDir.x * moveSpeed;
          cameraState.current.position.z += moveDir.z * moveSpeed;

          // Clamp to room bounds
          cameraState.current.position.x = Math.max(-3.5, Math.min(3.5, cameraState.current.position.x));
          cameraState.current.position.z = Math.max(-1.8, Math.min(4.8, cameraState.current.position.z));
        }

        camera.position.x = cameraState.current.position.x;
        camera.position.z = cameraState.current.position.z;
        camera.position.y = 1.65; // Fixed realistic human eye height
      }

      // Smooth camera interpolation (lerp)
      cameraState.current.yaw += (cameraState.current.targetYaw - cameraState.current.yaw) * 0.1;
      cameraState.current.pitch += (cameraState.current.targetPitch - cameraState.current.pitch) * 0.1;

      // Rotate camera
      const euler = new THREE.Euler(0, 0, 0, 'YXZ');
      euler.x = cameraState.current.pitch;
      euler.y = cameraState.current.yaw;
      camera.quaternion.setFromEuler(euler);

      // Gentle subtle breathing bob
      if (cameraState.current.introAnimationComplete) {
        camera.position.y = 1.65 + Math.sin(time * 0.001) * 0.012;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Preset lighting changes
  const applyPreset = useCallback((preset: 'warm' | 'neutral' | 'focus') => {
    setActivePreset(preset);
    const ref = sceneRef.current;
    if (!ref) return;

    if (preset === 'warm') {
      // 2700K Warm Dim
      ref.lights.pendantPoint.color.setHex(0xffeedd);
      ref.lights.pendantPoint.intensity = 2.2;
      ref.lights.coveLinear1.color.setHex(0xffe2b8);
      ref.lights.coveLinear2.color.setHex(0xffe2b8);
      ref.lights.downlight1.color.setHex(0xffeedd);
      ref.lights.downlight2.color.setHex(0xffeedd);
      ref.lights.downlight3.color.setHex(0xffeedd);
      ref.lights.wallGrazer.color.setHex(0xffd9a6);
      ref.materials.pendantEmissive.color.setHex(0xffeedd);
      ref.materials.coveEmissive.color.setHex(0xffe2b8);
      setFixturesState({ pendant: true, cove: true, downlights: true, wallgrazer: true });
    } else if (preset === 'neutral') {
      // 3500K Architectural Neutral
      ref.lights.pendantPoint.color.setHex(0xfdf7ea);
      ref.lights.pendantPoint.intensity = 2.4;
      ref.lights.coveLinear1.color.setHex(0xf5eedb);
      ref.lights.coveLinear2.color.setHex(0xf5eedb);
      ref.lights.downlight1.color.setHex(0xfffaed);
      ref.lights.downlight2.color.setHex(0xfffaed);
      ref.lights.downlight3.color.setHex(0xfffaed);
      ref.lights.wallGrazer.color.setHex(0xf8edd3);
      ref.materials.pendantEmissive.color.setHex(0xffffff);
      ref.materials.coveEmissive.color.setHex(0xfdfcf7);
      setFixturesState({ pendant: true, cove: true, downlights: true, wallgrazer: true });
    } else if (preset === 'focus') {
      // Architectural Accent Focus: Cove & Grazer solo
      ref.lights.pendantPoint.intensity = 0.3;
      ref.lights.downlight1.intensity = 0.2;
      ref.lights.downlight2.intensity = 0.2;
      ref.lights.downlight3.intensity = 0.2;
      ref.lights.coveLinear1.intensity = 3.4;
      ref.lights.coveLinear2.intensity = 3.4;
      ref.lights.wallGrazer.intensity = 3.2;
      ref.materials.pendantEmissive.color.setHex(0x554433);
      ref.materials.coveEmissive.color.setHex(0xffe2b8);
      setFixturesState({ pendant: false, cove: true, downlights: false, wallgrazer: true });
    }
  }, []);

  // Toggle single fixture
  const toggleFixture = (fixture: 'pendant' | 'cove' | 'downlights' | 'wallgrazer') => {
    const ref = sceneRef.current;
    if (!ref) return;

    setFixturesState((prev) => {
      const next = !prev[fixture];
      if (fixture === 'pendant') {
        ref.lights.pendantPoint.intensity = next ? 2.2 : 0;
        ref.materials.pendantEmissive.color.setHex(next ? 0xffeedd : 0x221105);
      } else if (fixture === 'cove') {
        ref.lights.coveLinear1.intensity = next ? 2.8 : 0;
        ref.lights.coveLinear2.intensity = next ? 2.8 : 0;
        ref.materials.coveEmissive.color.setHex(next ? 0xffe2b8 : 0x221508);
      } else if (fixture === 'downlights') {
        ref.lights.downlight1.intensity = next ? 2.0 : 0;
        ref.lights.downlight2.intensity = next ? 2.0 : 0;
        ref.lights.downlight3.intensity = next ? 2.0 : 0;
        ref.materials.downlightEmissive.color.setHex(next ? 0xffeedd : 0x222222);
      } else if (fixture === 'wallgrazer') {
        ref.lights.wallGrazer.intensity = next ? 2.2 : 0;
        ref.materials.wallGrazerEmissive.color.setHex(next ? 0xffd9a6 : 0x221808);
      }
      return { ...prev, [fixture]: next };
    });
    setActiveFixture(fixture);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0b0d] select-none" id="hero">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing w-full h-full" />

      {/* Subtle vignette scrim to frame the architecture and guarantee WCAG contrast */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0c0d0e] via-transparent to-black/40" />

      {/* Editorial DOM Overlay (Semantic Title & Main Actions) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
        {/* Top spacer to account for sticky navbar */}
        <div className="h-16" />

        {/* Hero Central Editorial Headline Area */}
        <div className="max-w-2xl text-left pointer-events-auto mt-auto mb-8">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-[0.2em] text-[#c8a97e] uppercase">
            <span>Architectural Lighting Systems</span>
            <span aria-hidden="true">·</span>
            <span>2026 Collection</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#f4f2ee] leading-[1.08] mb-6">
            LIGHT IS THE EXPERIENCE.
          </h1>

          <p className="text-base sm:text-lg text-[#b8b5ad] font-light leading-relaxed max-w-xl mb-8">
            Lighting designed to transform the way spaces look, feel and perform. Engineered for modern architecture,
            refined luxury, and human well-being.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                if (onExploreClick) onExploreClick();
                else document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-black bg-[#f4f2ee] hover:bg-[#c8a97e] transition-colors rounded-none whitespace-nowrap shadow-lg hover:shadow-brass/20 cursor-pointer"
            >
              EXPLORE LIGHTING
            </button>

            <button
              onClick={() => {
                if (onViewProductsClick) onViewProductsClick();
                else document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#f4f2ee] border border-white/20 hover:border-[#c8a97e] hover:text-[#c8a97e] bg-black/40 backdrop-blur-sm transition-colors rounded-none whitespace-nowrap cursor-pointer"
            >
              VIEW PRODUCTS
            </button>
          </div>
        </div>

        {/* Bottom Bar: 360° Indicator & Interactive Fixture Controller HUD */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pointer-events-auto border-t border-white/10 pt-4">
          {/* Subtle 360° Indicator */}
          <div className="flex items-center gap-3 text-xs tracking-wider text-[#b8b5ad] uppercase bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
            <Compass className="w-4 h-4 text-[#c8a97e] animate-pulse" />
            <span className="font-semibold text-[#f4f2ee]">LOOK AROUND 360°</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-[11px] normal-case tracking-normal text-white/60">
              Drag mouse to look · WASD to move
            </span>
          </div>

          {/* Interactive Lighting Fixture Toggles & Kelvin Scene Presets */}
          <div className="flex flex-wrap items-center gap-2 bg-black/70 backdrop-blur-md p-1.5 border border-white/10 text-xs">
            <div className="hidden lg:flex items-center gap-1.5 px-2 text-[11px] text-[#c8a97e] font-medium uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Fixtures:</span>
            </div>

            <button
              onClick={() => toggleFixture('pendant')}
              className={`px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                fixturesState.pendant ? 'bg-[#c8a97e] text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
              title="Toggle Brass Pendant"
            >
              Pendant {fixturesState.pendant ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => toggleFixture('cove')}
              className={`px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                fixturesState.cove ? 'bg-[#c8a97e] text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
              title="Toggle Perimeter Linear Cove"
            >
              Cove {fixturesState.cove ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => toggleFixture('downlights')}
              className={`px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                fixturesState.downlights ? 'bg-[#c8a97e] text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
              title="Toggle Downlights Array"
            >
              Downlights {fixturesState.downlights ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => toggleFixture('wallgrazer')}
              className={`px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                fixturesState.wallgrazer ? 'bg-[#c8a97e] text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
              title="Toggle Wall Grazer"
            >
              Grazer {fixturesState.wallgrazer ? 'ON' : 'OFF'}
            </button>

            <div className="h-4 w-[1px] bg-white/20 mx-1 hidden sm:block" />

            {/* Kelvin Presets */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => applyPreset('warm')}
                className={`px-2 py-1 text-[11px] transition-colors cursor-pointer ${
                  activePreset === 'warm' ? 'text-[#c8a97e] underline decoration-2' : 'text-white/50 hover:text-white'
                }`}
              >
                2700K Warm
              </button>
              <button
                onClick={() => applyPreset('neutral')}
                className={`px-2 py-1 text-[11px] transition-colors cursor-pointer ${
                  activePreset === 'neutral' ? 'text-[#c8a97e] underline decoration-2' : 'text-white/50 hover:text-white'
                }`}
              >
                3500K Clean
              </button>
              <button
                onClick={() => applyPreset('focus')}
                className={`px-2 py-1 text-[11px] transition-colors cursor-pointer ${
                  activePreset === 'focus' ? 'text-[#c8a97e] underline decoration-2' : 'text-white/50 hover:text-white'
                }`}
              >
                Accent Focus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Fixture Info Tag (when a fixture is toggled or inspected) */}
      {activeFixture && (
        <div className="absolute top-24 right-6 md:right-12 z-30 pointer-events-auto bg-[#151719]/90 backdrop-blur-md p-4 border border-brass-hairline text-left max-w-xs animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between text-[11px] text-[#c8a97e] uppercase font-semibold tracking-wider mb-1">
            <span>Fixture Active</span>
            <button
              onClick={() => setActiveFixture(null)}
              className="text-white/40 hover:text-white cursor-pointer px-1"
            >
              ✕
            </button>
          </div>
          <div className="text-sm font-semibold text-white mb-1">
            {activeFixture === 'pendant' && 'LW-PD05 Aura Minimalist Ring'}
            {activeFixture === 'cove' && 'LW-LN204 Architectural Linear Cove'}
            {activeFixture === 'downlights' && 'LW-DL08 Precision Deep Downlight'}
            {activeFixture === 'wallgrazer' && 'LW-TR30 Fluted Wall Grazer'}
          </div>
          <div className="text-xs text-[#a5a299] leading-relaxed">
            {activeFixture === 'pendant' && 'Brushed brass toroidal chassis with 360° diffused radial glow. CRI > 97.'}
            {activeFixture === 'cove' && 'Plaster-in knife edge trimless profile with continuous 2400K–3000K LED wash.'}
            {activeFixture === 'downlights' && 'Deep darklight anti-glare baffle with 35° beam angle for pure visual comfort.'}
            {activeFixture === 'wallgrazer' && 'Asymmetric optical distribution accentuating vertical timber and stone texture.'}
          </div>
        </div>
      )}

      {/* Scroll Down Hint to Next Section (transition to 2D website) */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-white flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase cursor-pointer transition-colors"
        aria-label="Scroll to About Section"
      >
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
