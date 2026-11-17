"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function detectSoftwareWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || "");
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    room.dispose();
    pmrem.dispose();

    return () => {
      scene.environment = null;
      target.dispose();
    };
  }, [gl, scene]);

  return null;
}

function LowPolyRobot({ pointerRef, hoveredRef, reducedMotion }) {
  const rootRef = useRef(null);
  const headRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const crystalRef = useRef(null);

  const elapsedRef = useRef(0);
  const hoverSpinRef = useRef(0);
  const wasHoveredRef = useRef(false);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    if (!reducedMotion) {
      elapsedRef.current += dt;
    }
    const t = elapsedRef.current;

    // Trigger playful spin boost when hovered
    if (hoveredRef.current && !wasHoveredRef.current) {
      hoverSpinRef.current += Math.PI * 2;
    }
    wasHoveredRef.current = hoveredRef.current;
    hoverSpinRef.current = THREE.MathUtils.damp(hoverSpinRef.current, 0, 4.5, dt);

    const mx = pointerRef.current.x;
    const my = pointerRef.current.y;

    if (rootRef.current) {
      // Gentle hover bob + continuous gentle rotation + mouse reaction
      const targetY = reducedMotion ? 0 : Math.sin(t * 2.1) * 0.065;
      rootRef.current.position.y = THREE.MathUtils.damp(
        rootRef.current.position.y,
        targetY,
        6,
        dt
      );

      const gentleYaw = reducedMotion ? 0 : Math.sin(t * 0.95) * 0.34;
      const targetRotY = gentleYaw + mx * 0.58 + hoverSpinRef.current;
      const targetRotX = -my * 0.22;
      const targetRotZ = -mx * 0.1;

      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        targetRotY,
        6.5,
        dt
      );
      rootRef.current.rotation.x = THREE.MathUtils.damp(
        rootRef.current.rotation.x,
        targetRotX,
        6.5,
        dt
      );
      rootRef.current.rotation.z = THREE.MathUtils.damp(
        rootRef.current.rotation.z,
        targetRotZ,
        6.5,
        dt
      );
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        mx * 0.42,
        8,
        dt
      );
      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        -my * 0.26,
        8,
        dt
      );
    }

    if (leftArmRef.current && rightArmRef.current && !reducedMotion) {
      leftArmRef.current.rotation.x = Math.sin(t * 2.4) * 0.18 + my * 0.2;
      rightArmRef.current.rotation.x = -Math.sin(t * 2.4) * 0.18 + my * 0.2;
    }

    if (crystalRef.current && !reducedMotion) {
      crystalRef.current.rotation.y += dt * 1.6;
      crystalRef.current.rotation.x += dt * 0.8;
    }

    // Periodic natural blink
    if (leftEyeRef.current && rightEyeRef.current && !reducedMotion) {
      const cycle = t % 3.8;
      let blinkScale = 1;
      if (cycle > 3.62) {
        const b = (cycle - 3.62) / 0.18;
        blinkScale = Math.max(0.1, Math.abs(Math.cos(b * Math.PI)));
      }
      leftEyeRef.current.scale.y = blinkScale;
      rightEyeRef.current.scale.y = blinkScale;
    }
  });

  return (
    <group ref={rootRef} scale={0.96} position={[0, -0.05, 0]}>
      {/* HEAD ASSEMBLY */}
      <group ref={headRef} position={[0, 0.62, 0]}>
        {/* Low-poly faceted cranium */}
        <mesh>
          <boxGeometry args={[0.92, 0.68, 0.72]} />
          <meshStandardMaterial
            color="#F4F7FA"
            roughness={0.34}
            metalness={0.08}
            flatShading
          />
        </mesh>

        {/* Top bevel crown plate */}
        <mesh position={[0, 0.37, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.38, 0.56, 0.08, 4]} />
          <meshStandardMaterial
            color="#0F2F50"
            roughness={0.3}
            metalness={0.65}
            flatShading
          />
        </mesh>

        {/* Visor outer bezel */}
        <mesh position={[0, -0.02, 0.35]}>
          <boxGeometry args={[0.76, 0.4, 0.08]} />
          <meshStandardMaterial
            color="#0F2F50"
            roughness={0.28}
            metalness={0.7}
            flatShading
          />
        </mesh>

        {/* Dark visor face */}
        <mesh position={[0, -0.02, 0.385]}>
          <boxGeometry args={[0.66, 0.3, 0.04]} />
          <meshStandardMaterial
            color="#071526"
            roughness={0.12}
            metalness={0.25}
            flatShading
          />
        </mesh>

        {/* Left & Right Glowing Low-Poly Eyes */}
        <mesh ref={leftEyeRef} position={[-0.15, -0.01, 0.42]}>
          <octahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial
            color="#62C8FF"
            emissive="#3BA3FF"
            emissiveIntensity={1.6}
            roughness={0.2}
            flatShading
          />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.15, -0.01, 0.42]}>
          <octahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial
            color="#62C8FF"
            emissive="#3BA3FF"
            emissiveIntensity={1.6}
            roughness={0.2}
            flatShading
          />
        </mesh>

        {/* Hexagonal Ear Pods */}
        <mesh position={[-0.51, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 6]} />
          <meshStandardMaterial
            color="#C8D3DF"
            roughness={0.26}
            metalness={0.85}
            flatShading
          />
        </mesh>
        <mesh position={[0.51, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 6]} />
          <meshStandardMaterial
            color="#C8D3DF"
            roughness={0.26}
            metalness={0.85}
            flatShading
          />
        </mesh>
        <mesh position={[-0.57, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 6]} />
          <meshStandardMaterial
            color="#C99C42"
            roughness={0.22}
            metalness={0.9}
            flatShading
          />
        </mesh>
        <mesh position={[0.57, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 6]} />
          <meshStandardMaterial
            color="#C99C42"
            roughness={0.22}
            metalness={0.9}
            flatShading
          />
        </mesh>

        {/* Antenna Mast & Tip */}
        <mesh position={[0, 0.52, 0]}>
          <cylinderGeometry args={[0.024, 0.04, 0.24, 6]} />
          <meshStandardMaterial
            color="#C8D3DF"
            roughness={0.25}
            metalness={0.85}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.68, 0]}>
          <octahedronGeometry args={[0.075, 0]} />
          <meshStandardMaterial
            color="#62C8FF"
            emissive="#3BA3FF"
            emissiveIntensity={1.7}
            roughness={0.2}
            flatShading
          />
        </mesh>
      </group>

      {/* NECK */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.16, 6]} />
        <meshStandardMaterial
          color="#C8D3DF"
          roughness={0.28}
          metalness={0.85}
          flatShading
        />
      </mesh>

      {/* TORSO ASSEMBLY */}
      <group position={[0, -0.14, 0]}>
        <mesh>
          <cylinderGeometry args={[0.42, 0.3, 0.58, 6]} />
          <meshStandardMaterial
            color="#0F2F50"
            roughness={0.32}
            metalness={0.65}
            flatShading
          />
        </mesh>

        {/* Chest Core Plate */}
        <mesh position={[0, 0.03, 0.32]}>
          <boxGeometry args={[0.42, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#F4F7FA"
            roughness={0.34}
            metalness={0.08}
            flatShading
          />
        </mesh>

        {/* Spinning Chest Energy Crystal */}
        <mesh ref={crystalRef} position={[0, 0.03, 0.38]}>
          <octahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial
            color="#72E6BE"
            emissive="#3BC294"
            emissiveIntensity={1.5}
            roughness={0.2}
            flatShading
          />
        </mesh>

        {/* LEFT ARM */}
        <group ref={leftArmRef} position={[-0.48, 0.16, 0]}>
          <mesh>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#C99C42"
              roughness={0.22}
              metalness={0.9}
              flatShading
            />
          </mesh>
          <mesh position={[-0.04, -0.22, 0.04]} rotation={[0.15, 0, 0.12]}>
            <boxGeometry args={[0.15, 0.34, 0.15]} />
            <meshStandardMaterial
              color="#F4F7FA"
              roughness={0.34}
              metalness={0.08}
              flatShading
            />
          </mesh>
          <mesh position={[-0.07, -0.43, 0.07]}>
            <octahedronGeometry args={[0.085, 0]} />
            <meshStandardMaterial
              color="#0F2F50"
              roughness={0.32}
              metalness={0.65}
              flatShading
            />
          </mesh>
        </group>

        {/* RIGHT ARM */}
        <group ref={rightArmRef} position={[0.48, 0.16, 0]}>
          <mesh>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#C99C42"
              roughness={0.22}
              metalness={0.9}
              flatShading
            />
          </mesh>
          <mesh position={[0.04, -0.22, 0.04]} rotation={[0.15, 0, -0.12]}>
            <boxGeometry args={[0.15, 0.34, 0.15]} />
            <meshStandardMaterial
              color="#F4F7FA"
              roughness={0.34}
              metalness={0.08}
              flatShading
            />
          </mesh>
          <mesh position={[0.07, -0.43, 0.07]}>
            <octahedronGeometry args={[0.085, 0]} />
            <meshStandardMaterial
              color="#0F2F50"
              roughness={0.32}
              metalness={0.65}
              flatShading
            />
          </mesh>
        </group>

        {/* HOVER THRUSTER BASE */}
        <mesh position={[0, -0.38, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.24, 0.22, 6]} />
          <meshStandardMaterial
            color="#C8D3DF"
            roughness={0.28}
            metalness={0.85}
            flatShading
          />
        </mesh>
        <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.028, 6, 12]} />
          <meshStandardMaterial
            color="#62C8FF"
            emissive="#3BA3FF"
            emissiveIntensity={1.4}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

const HeaderRobotCanvas = () => {
  const [mounted, setMounted] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  const pointerRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);

  const isSoftwareGl = useMemo(() => detectSoftwareWebGL(), []);
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    );
  }, []);

  useEffect(() => {
    setMounted(true);

    const onPointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerRef.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerRef.current.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  if (!mounted || webglFailed) {
    return (
      <span className="header-robot-fallback" aria-hidden="true">
        <i className="fas fa-robot" />
      </span>
    );
  }

  return (
    <span
      className="header-robot-stage"
      aria-hidden="true"
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <Canvas
        dpr={isSoftwareGl ? 1 : [1, 2]}
        camera={{ position: [0, 0.25, 3.25], fov: 38, near: 0.1, far: 20 }}
        gl={{
          alpha: true,
          antialias: !isSoftwareGl,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
          gl.setClearColor(0x000000, 0);

          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setWebglFailed(true);
          });
        }}
      >
        <StudioEnvironment />
        <hemisphereLight args={["#EAF3FF", "#6B7C8F", 0.9]} />
        <directionalLight position={[3, 4, 4]} intensity={1.7} color="#FFF6E9" />
        <directionalLight position={[-3, 2, -2]} intensity={0.9} color="#8CC4FF" />
        <LowPolyRobot
          pointerRef={pointerRef}
          hoveredRef={hoveredRef}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </span>
  );
};

export default HeaderRobotCanvas;
