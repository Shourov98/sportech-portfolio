"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Earth3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000); // Square aspect ratio
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    // Set initial size
    const size = Math.min(window.innerWidth, 509); // Match original 509px size, adjust for responsiveness
    renderer.setSize(size, size);
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const otherMap = textureLoader.load("/earth/04_rainbow1k.jpg");
    const colorMap = textureLoader.load("/earth/00_earthmap1k.jpg");
    const elevMap = textureLoader.load("/earth/01_earthbump1k.jpg");
    const alphaMap = textureLoader.load("/earth/02_earthspec1k.jpg");

    // Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Wireframe globe
    const geo = new THREE.IcosahedronGeometry(1, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x0099ff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const globe = new THREE.Mesh(geo, mat);
    globeGroup.add(globe);

    // Points geometry for detailed surface
    const detail = 120;
    const pointsGeo = new THREE.IcosahedronGeometry(1, detail);

    // Shaders (unchanged, but mouseUV is fixed so no interaction)
    const vertexShader = `
      uniform float size;
      uniform sampler2D elevTexture;
      uniform vec2 mouseUV;

      varying vec2 vUv;
      varying float vVisible;
      varying float vDist;

      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float elv = texture2D(elevTexture, vUv).r;
        vec3 vNormal = normalMatrix * normal;
        vVisible = step(0.0, dot(-normalize(mvPosition.xyz), normalize(vNormal)));
        mvPosition.z += 0.35 * elv;

        float dist = distance(mouseUV, vUv);
        float zDisp = 0.0;
        float thresh = 0.04;
        if (dist < thresh) {
          zDisp = (thresh - dist) * 10.0;
        }
        vDist = dist;
        mvPosition.z += zDisp;

        gl_PointSize = size;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const fragmentShader = `
      uniform sampler2D colorTexture;
      uniform sampler2D alphaTexture;
      uniform sampler2D otherTexture;

      varying vec2 vUv;
      varying float vVisible;
      varying float vDist;

      void main() {
        if (floor(vVisible + 0.1) == 0.0) discard;
        float alpha = 1.0 - texture2D(alphaTexture, vUv).r;
        vec3 color = texture2D(colorTexture, vUv).rgb;
        vec3 other = texture2D(otherTexture, vUv).rgb;
        float thresh = 0.04;
        if (vDist < thresh) {
          color = mix(color, other, (thresh - vDist) * 50.0);
        }
        gl_FragColor = vec4(color, alpha);
      }
    `;

    // Uniforms: mouseUV stays constant (no interactivity)
    const uniforms = {
      size: { value: 4.0 },
      colorTexture: { value: colorMap },
      otherTexture: { value: otherMap },
      elevTexture: { value: elevMap },
      alphaTexture: { value: alphaMap },
      mouseUV: { value: new THREE.Vector2(0.0, 0.0) },
    };

    const pointsMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(points);

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 3);
    scene.add(hemiLight);

    // Animation loop (auto-rotate only; no controls/raycast)
    let rafId = 0;
    const animate = () => {
      renderer.render(scene, camera);
      globeGroup.rotation.y += 0.002;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const onResize = () => {
      const newSize = Math.min(window.innerWidth, 509);
      renderer.setSize(newSize, newSize);
      camera.aspect = 1; // Keep square aspect
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (
        mountRef.current &&
        renderer.domElement.parentElement === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      pointsGeo.dispose();
      mat.dispose();
      pointsMat.dispose();
      colorMap.dispose();
      otherMap.dispose();
      elevMap.dispose();
      alphaMap.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute left-1/2 -translate-x-1/2 w-[509px] h-[509px] max-w-full"
      style={{ maxWidth: "min(100vw, 509px)" }}
    />
  );
}
