"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { detectSoftwareWebGL } from "../../three/backgroundEffectEngine";
import { buildProject3DModel } from "../../three/projectModels";

const ProjectCard3D = ({ project }) => {
  const mountRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotion = Boolean(
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    );

    const width = Math.max(container.clientWidth, 220);
    const height = Math.max(container.clientHeight, 120);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 30);
    camera.position.set(0, 0.42, 3.6);
    camera.lookAt(0, -0.05, 0);

    // 3-point warm/cool studio light rig
    const hemi = new THREE.HemisphereLight(0xeef6ff, 0x162b44, 0.95);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xfff4e0, 1.85);
    key.position.set(3.5, 4.5, 4.5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x7cc4ff, 1.15);
    rim.position.set(-4.0, 2.5, -3.5);
    scene.add(rim);

    const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy() || 4, 8);
    const { group, animables, textures } = buildProject3DModel(
      project.id,
      maxAniso
    );
    group.position.set(0, -0.05, 0);
    scene.add(group);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer hover + drag orbit state
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let dragRotY = 0;
    let dragRotX = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothYaw = 0;
    let smoothPitch = 0.08;
    let elapsed = 0;
    let lastTime = performance.now();
    let isInViewport = true;
    let disposed = false;
    let frameId = 0;

    const canvasEl = renderer.domElement;

    const onPointerDown = (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvasEl.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerX = THREE.MathUtils.clamp(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -1,
          1
        );
        pointerY = THREE.MathUtils.clamp(
          -((e.clientY - rect.top) / rect.height) * 2 + 1,
          -1,
          1
        );
      }
      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        dragRotY += dx * 0.013;
        dragRotX = THREE.MathUtils.clamp(dragRotX + dy * 0.008, -0.45, 0.55);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      canvasEl.style.cursor = "grab";
    };

    canvasEl.style.cursor = "grab";
    canvasEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    function afterDraw(cb) {
      if (disposed) return;
      const gl = renderer.getContext();
      if (!gl || typeof gl.fenceSync !== "function") {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function step(dt) {
      elapsed += dt;

      const autoYaw = reducedMotion ? 0 : Math.sin(elapsed * 0.55) * 0.28;
      const targetYaw = autoYaw + dragRotY + pointerX * 0.35;
      const targetPitch = 0.08 + dragRotX - pointerY * 0.16;

      smoothYaw = THREE.MathUtils.damp(smoothYaw, targetYaw, 6, dt);
      smoothPitch = THREE.MathUtils.damp(smoothPitch, targetPitch, 6, dt);

      group.rotation.y = smoothYaw;
      group.rotation.x = smoothPitch;

      if (!reducedMotion) {
        animables.forEach((item, idx) => {
          if (item.type === "spin") {
            item.mesh.rotation.y += dt * item.speed;
            item.mesh.rotation.x += dt * item.speed * 0.45;
            if (item.bob) {
              if (item.mesh.userData.baseY === undefined) {
                item.mesh.userData.baseY = item.mesh.position.y;
              }
              item.mesh.position.y =
                item.mesh.userData.baseY +
                Math.sin(elapsed * 2.1 + idx) * item.bob;
            }
          } else if (item.type === "spinSlow") {
            item.mesh.rotation.y += dt * item.speed;
          } else if (item.type === "orbitZ") {
            item.mesh.rotation.z += dt * item.speed;
          } else if (item.type === "bob") {
            if (item.mesh.userData.baseY === undefined) {
              item.mesh.userData.baseY = item.mesh.position.y;
            }
            item.mesh.position.y =
              item.mesh.userData.baseY +
              Math.sin(elapsed * item.speed + idx) * (item.amp || 0.04);
          }
        });
      }
    }

    function tick() {
      if (disposed || !isInViewport) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      step(dt);
      renderer.render(scene, camera);

      if (!reducedMotion) {
        if (isSoftwareGl) afterDraw(tick);
        else frameId = requestAnimationFrame(tick);
      }
    }

    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting ?? true;
          const wasVisible = isInViewport;
          isInViewport = visible;
          if (visible && !wasVisible) {
            lastTime = performance.now();
            tick();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    const handleResize = () => {
      if (disposed) return;
      const w = Math.max(container.clientWidth, 220);
      const h = Math.max(container.clientHeight, 120);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };

    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }

    const handleContextLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      setWebglFailed(true);
    };
    canvasEl.addEventListener("webglcontextlost", handleContextLost);

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      observer?.disconnect();
      resizeObserver?.disconnect();
      canvasEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvasEl.removeEventListener("webglcontextlost", handleContextLost);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      textures.forEach((t) => t.dispose());
      envTarget.dispose();
      renderer.dispose();

      if (canvasEl.parentNode === container) {
        container.removeChild(canvasEl);
      }
    };
  }, [project.id]);

  if (webglFailed) {
    return (
      <div className="project-3d-fallback" aria-hidden="true">
        <div className="project-3d-cube">
          <i className="fas fa-cube" />
        </div>
        <span>3D SHOWCASE · {project.role}</span>
      </div>
    );
  }

  return (
    <div
      className="project-3d-stage"
      onClick={(e) => e.stopPropagation()}
      aria-label={`Interactive 3D model for ${project.title}`}
    >
      <div className="project-3d-canvas-wrap" ref={mountRef} />
      <span className="project-3d-hint" aria-hidden="true">
        DRAG TO ORBIT 3D
      </span>
    </div>
  );
};

export default ProjectCard3D;
