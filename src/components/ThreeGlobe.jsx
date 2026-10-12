import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeGlobe = ({ size = 260 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = size;
    const height = size;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 4. Lighting - Soft cinematic lighting matching video
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(-4, 4, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xb0b0b8, 0.8);
    dirLight2.position.set(4, -3, -3);
    scene.add(dirLight2);

    // 5. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Main Sphere - Light grey matte material with subtle roughness
    const sphereGeo = new THREE.SphereGeometry(1.8, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xdedee3,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: false,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // Procedural continent relief dots/patches
    const reliefGroup = new THREE.Group();
    const reliefMat = new THREE.MeshStandardMaterial({
      color: 0xc8c8cd,
      roughness: 0.85,
    });

    // Generate organic clusters of relief patches around the sphere
    const seedPoints = [
      { lat: 40, lon: -100 }, // North America
      { lat: -15, lon: -60 }, // South America
      { lat: 50, lon: 15 },   // Europe
      { lat: 5, lon: 25 },    // Africa
      { lat: 45, lon: 80 },   // Asia
      { lat: -25, lon: 135 }, // Australia
      { lat: -5, lon: 120 },  // Indonesia
    ];

    seedPoints.forEach(({ lat, lon }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const centerVec = new THREE.Vector3(
        -1.805 * Math.sin(phi) * Math.cos(theta),
        1.805 * Math.cos(phi),
        1.805 * Math.sin(phi) * Math.sin(theta)
      );

      // Create small organic clusters around each continent seed
      for (let i = 0; i < 16; i++) {
        const jitter = 0.35;
        const patchGeo = new THREE.CircleGeometry(0.12 + Math.random() * 0.16, 8);
        const patchMesh = new THREE.Mesh(patchGeo, reliefMat);
        const pos = centerVec.clone().add(
          new THREE.Vector3(
            (Math.random() - 0.5) * jitter,
            (Math.random() - 0.5) * jitter,
            (Math.random() - 0.5) * jitter
          )
        ).normalize().multiplyScalar(1.806);
        patchMesh.position.copy(pos);
        patchMesh.lookAt(pos.clone().multiplyScalar(2));
        reliefGroup.add(patchMesh);
      }
    });
    globeGroup.add(reliefGroup);

    // 6. Airplane Group orbiting the globe
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = 0.35;
    orbitGroup.rotation.z = -0.25;
    scene.add(orbitGroup);

    const airplane = new THREE.Group();
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      roughness: 0.3,
      metalness: 0.1,
    });

    // Fuselage
    const bodyGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.22, 12);
    bodyGeo.rotateZ(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, planeMat);
    airplane.add(body);

    // Wings
    const wingGeo = new THREE.BoxGeometry(0.08, 0.008, 0.28);
    const wings = new THREE.Mesh(wingGeo, planeMat);
    wings.position.set(0.02, 0.005, 0);
    airplane.add(wings);

    // Tail
    const tailGeo = new THREE.BoxGeometry(0.05, 0.05, 0.008);
    const tail = new THREE.Mesh(tailGeo, planeMat);
    tail.position.set(-0.08, 0.03, 0);
    airplane.add(tail);

    airplane.position.set(2.25, 0, 0);
    airplane.rotation.y = Math.PI / 2;
    airplane.rotation.z = 0.15;
    orbitGroup.add(airplane);

    // 7. Interaction: Drag to rotate
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.003 };

    const onPointerDown = (e) => {
      isDragging = true;
      dom.style.cursor = 'grabbing';
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.008;
      globeGroup.rotation.x += deltaY * 0.008;

      rotationVelocity = {
        x: deltaY * 0.002,
        y: deltaX * 0.002,
      };

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      dom.style.cursor = 'grab';
    };

    const dom = renderer.domElement;
    dom.style.cursor = 'grab';
    dom.style.touchAction = 'none';
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 8. Animation Loop
    let animId;
    let orbitAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Ambient globe auto-rotation & inertia damping
      if (!isDragging) {
        globeGroup.rotation.y += rotationVelocity.y;
        globeGroup.rotation.x += rotationVelocity.x;
        rotationVelocity.y = THREE.MathUtils.lerp(rotationVelocity.y, 0.003, 0.05);
        rotationVelocity.x = THREE.MathUtils.lerp(rotationVelocity.x, 0, 0.05);
      }

      // Orbiting airplane
      orbitAngle += 0.014;
      const radius = 2.22;
      airplane.position.x = radius * Math.cos(orbitAngle);
      airplane.position.y = radius * Math.sin(orbitAngle);
      airplane.rotation.z = orbitAngle + Math.PI / 2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (mount && dom) mount.removeChild(dom);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      reliefMat.dispose();
      planeMat.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className="flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    />
  );
};

export default ThreeGlobe;
