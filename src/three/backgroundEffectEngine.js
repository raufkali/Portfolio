import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  createHoloCodeTexture,
  createSnippetCardTexture,
  createChestDisplayTexture,
} from "./codingTextures";
import {
  createSharedCodingMaterials,
  buildCuteCodingRobot,
  buildMiniDroneBot,
  buildCodeBracketsGroup,
  buildCurlyBracePair,
  buildFloatingCodeCard,
} from "./codingRobotBuilder";

export function detectSoftwareWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") || probe.getContext("webgl");
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

export function createBackgroundEffectEngine({
  container,
  variant = "hero",
  reducedMotion = false,
}) {
  const isSoftwareGl = detectSoftwareWebGL();
  const isDark = variant === "projects";

  const width = Math.max(container.clientWidth, 300);
  const height = Math.max(container.clientHeight, 300);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: !isSoftwareGl,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(
    isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
  );
  renderer.setSize(width, height);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.pointerEvents = "none";

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // Studio environment reflections for brushed metal, ceramic, and visor glass
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const roomEnv = new RoomEnvironment();
  const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
  scene.environment = envTarget.texture;
  roomEnv.dispose();
  pmremGenerator.dispose();

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 40);
  camera.position.set(0, 0.1, 7.4);

  // Warm / cool studio lighting rig
  const hemiLight = new THREE.HemisphereLight(
    isDark ? 0xa3c9f5 : 0xeef5fc,
    isDark ? 0x0b1c30 : 0x8ea0b5,
    isDark ? 0.8 : 0.95
  );
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e6, isDark ? 1.45 : 1.75);
  keyLight.position.set(4.5, 5.5, 5.0);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x8bc2ff, isDark ? 1.15 : 0.9);
  rimLight.position.set(-4.5, 3.0, -3.5);
  scene.add(rimLight);

  const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy() || 4, 8);
  const textures = {
    holoCode: createHoloCodeTexture(maxAniso),
    chestDisplay: createChestDisplayTexture(maxAniso),
    cardNext: createSnippetCardTexture(
      "next.app",
      ["export default async", "function Portfolio()", "  return <Studio />"],
      "#1A4A7A",
      isDark,
      maxAniso
    ),
    cardAi: createSnippetCardTexture(
      "ai.agent",
      ["const llm = Groq()", "await llm.run(task)", "// latency: 42ms"],
      "#C99C42",
      isDark,
      maxAniso
    ),
  };

  const mats = createSharedCodingMaterials(isSoftwareGl);

  // Root parallax group
  const stageGroup = new THREE.Group();
  scene.add(stageGroup);

  const floaters = [];
  let robotRig = null;
  let droneRig = null;

  if (variant === "hero") {
    // 1. Hero Cute 3D Coding Robot positioned cleanly in open hero breathing space
    robotRig = buildCuteCodingRobot(mats, textures);
    robotRig.group.scale.setScalar(0.92);
    robotRig.group.userData.basePos = new THREE.Vector3(0.28, -1.24, 0.25);
    robotRig.group.position.copy(robotRig.group.userData.basePos);
    stageGroup.add(robotRig.group);

    // 2. Beveled </> Coding Brackets (Top-Center / Right Margin)
    const brackets = buildCodeBracketsGroup(mats);
    brackets.scale.setScalar(0.68);
    brackets.userData.basePos = new THREE.Vector3(-0.35, 1.58, -0.45);
    brackets.position.copy(brackets.userData.basePos);
    brackets.rotation.set(0.18, 0.28, -0.08);
    stageGroup.add(brackets);
    floaters.push({ mesh: brackets, speed: 0.75, amp: 0.08, rotSpeed: 0.25 });

    // 3. Curly Braces { } (Far-Right Edge beside Portrait)
    const braces = buildCurlyBracePair(mats);
    braces.scale.setScalar(0.66);
    braces.userData.basePos = new THREE.Vector3(3.38, 0.85, -0.5);
    braces.position.copy(braces.userData.basePos);
    braces.rotation.set(-0.15, -0.4, 0.12);
    stageGroup.add(braces);
    floaters.push({ mesh: braces, speed: 0.62, amp: 0.1, rotSpeed: -0.22 });

    // 4. Floating Mini Code Cards (Lower-Left & Top-Right Periphery)
    const cardA = buildFloatingCodeCard(mats, textures.cardNext);
    cardA.scale.setScalar(0.66);
    cardA.userData.basePos = new THREE.Vector3(-3.15, -1.48, -0.7);
    cardA.position.copy(cardA.userData.basePos);
    cardA.rotation.set(-0.12, 0.38, 0.06);
    stageGroup.add(cardA);
    floaters.push({ mesh: cardA, speed: 0.55, amp: 0.07, rotSpeed: 0.1 });

    const cardB = buildFloatingCodeCard(mats, textures.cardAi);
    cardB.scale.setScalar(0.58);
    cardB.userData.basePos = new THREE.Vector3(2.95, 1.62, -0.85);
    cardB.position.copy(cardB.userData.basePos);
    cardB.rotation.set(0.14, -0.42, -0.08);
    stageGroup.add(cardB);
    floaters.push({ mesh: cardB, speed: 0.68, amp: 0.08, rotSpeed: -0.12 });
  } else {
    // Projects dark navy atmospheric 3D coding background
    droneRig = buildMiniDroneBot(mats);
    droneRig.group.scale.setScalar(1.05);
    droneRig.group.userData.basePos = new THREE.Vector3(-3.1, 1.25, -0.4);
    droneRig.group.position.copy(droneRig.group.userData.basePos);
    stageGroup.add(droneRig.group);

    const brackets = buildCodeBracketsGroup(mats);
    brackets.scale.setScalar(0.75);
    brackets.userData.basePos = new THREE.Vector3(3.2, 1.32, -0.6);
    brackets.position.copy(brackets.userData.basePos);
    brackets.rotation.set(0.2, -0.35, 0.1);
    stageGroup.add(brackets);
    floaters.push({ mesh: brackets, speed: 0.65, amp: 0.1, rotSpeed: 0.2 });

    const braces = buildCurlyBracePair(mats);
    braces.scale.setScalar(0.72);
    braces.userData.basePos = new THREE.Vector3(-3.25, -1.3, -0.7);
    braces.position.copy(braces.userData.basePos);
    braces.rotation.set(-0.12, 0.35, -0.1);
    stageGroup.add(braces);
    floaters.push({ mesh: braces, speed: 0.58, amp: 0.09, rotSpeed: -0.22 });

    const cardC = buildFloatingCodeCard(mats, textures.cardAi);
    cardC.scale.setScalar(0.65);
    cardC.userData.basePos = new THREE.Vector3(3.15, -1.25, -0.8);
    cardC.position.copy(cardC.userData.basePos);
    cardC.rotation.set(0.1, -0.4, -0.05);
    stageGroup.add(cardC);
    floaters.push({ mesh: cardC, speed: 0.52, amp: 0.08, rotSpeed: 0.1 });
  }

  // Subtle InstancedMesh Geometric Code Nodes (18 small precision octahedrons)
  const nodeGeo = new THREE.OctahedronGeometry(0.052, 0);
  const nodeCount = 18;
  const nodeInst = new THREE.InstancedMesh(
    nodeGeo,
    isDark ? mats.brushedSilver : mats.anodizedNavy,
    nodeCount
  );
  const dummy = new THREE.Object3D();
  const nodeSeeds = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radiusX = 2.6 + (i % 3) * 0.68;
    const radiusY = 1.3 + ((i + 1) % 3) * 0.42;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle * 1.3) * radiusY;
    const z = -1.2 - (i % 4) * 0.35;
    nodeSeeds.push({ x, y, z, phase: i * 0.7, scale: 0.7 + (i % 3) * 0.25 });
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(nodeSeeds[i].scale);
    dummy.updateMatrix();
    nodeInst.setMatrixAt(i, dummy.matrix);
  }
  nodeInst.instanceMatrix.needsUpdate = true;
  nodeInst.computeBoundingSphere();
  stageGroup.add(nodeInst);

  // Responsive layout adjustment so mobile/tablet stays clean and uncluttered
  const applyResponsivePlacement = (w, h) => {
    const aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    if (robotRig) {
      if (aspect < 1.0) {
        // Mobile: tuck cute robot gracefully near top-right corner
        robotRig.group.scale.setScalar(0.62);
        robotRig.group.userData.basePos.set(0.95, 1.55, -0.6);
      } else if (aspect < 1.3) {
        robotRig.group.scale.setScalar(0.76);
        robotRig.group.userData.basePos.set(0.32, -1.32, 0.1);
      } else {
        robotRig.group.scale.setScalar(0.92);
        robotRig.group.userData.basePos.set(0.28, -1.24, 0.25);
      }
    }
  };
  applyResponsivePlacement(width, height);

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  // Cursor & scroll state (zero GC)
  let targetMouseX = 0;
  let targetMouseY = 0;
  let smoothMouseX = 0;
  let smoothMouseY = 0;
  let elapsed = 0;
  let blinkTimer = 0;
  let lastTime = performance.now();
  let isInViewport = true;
  let disposed = false;
  let frameId = 0;

  const onPointerMove = (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    targetMouseX = THREE.MathUtils.clamp(nx, -1, 1);
    targetMouseY = THREE.MathUtils.clamp(ny, -1, 1);
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const stepScene = (dt) => {
    elapsed += dt;
    blinkTimer += dt;

    smoothMouseX = THREE.MathUtils.damp(smoothMouseX, targetMouseX, 5.5, dt);
    smoothMouseY = THREE.MathUtils.damp(smoothMouseY, targetMouseY, 5.5, dt);

    // Subtle whole-stage camera parallax
    stageGroup.position.x = -smoothMouseX * 0.16;
    stageGroup.position.y = -smoothMouseY * 0.1;

    if (robotRig) {
      const base = robotRig.group.userData.basePos;
      // Gentle hover bob
      robotRig.group.position.x = base.x;
      robotRig.group.position.y = base.y + Math.sin(elapsed * 1.9) * 0.065;
      robotRig.group.position.z = base.z;
      robotRig.group.rotation.y = -0.18 + smoothMouseX * 0.14;

      // Head tracks mouse cursor smoothly
      robotRig.headGroup.rotation.y = smoothMouseX * 0.38;
      robotRig.headGroup.rotation.x = -smoothMouseY * 0.22;

      // Eyes track slightly inside visor + natural blink every ~3.6s
      robotRig.eyesGroup.position.x = smoothMouseX * 0.028;
      robotRig.eyesGroup.position.y = 0.01 + smoothMouseY * 0.016;

      const cycle = blinkTimer % 3.6;
      let eyeScaleY = 1;
      if (cycle > 3.42) {
        const b = (cycle - 3.42) / 0.18;
        eyeScaleY = Math.max(0.08, Math.abs(Math.cos(b * Math.PI)));
      }
      robotRig.leftEye.scale.y = eyeScaleY;
      robotRig.rightEye.scale.y = eyeScaleY;

      // Cute typing motion on arms
      robotRig.leftArm.rotation.x = Math.sin(elapsed * 7.2) * 0.09;
      robotRig.rightArm.rotation.x = Math.cos(elapsed * 7.2 + 0.6) * 0.09;
      robotRig.holoConsole.position.y = -0.04 + Math.sin(elapsed * 2.4) * 0.012;
      robotRig.hoverRing.scale.setScalar(1 + Math.sin(elapsed * 4.0) * 0.06);
    }

    if (droneRig) {
      const base = droneRig.group.userData.basePos;
      droneRig.group.position.y = base.y + Math.sin(elapsed * 1.6) * 0.1;
      droneRig.group.rotation.y = 0.28 + smoothMouseX * 0.28;
      droneRig.group.rotation.x = -smoothMouseY * 0.16;
      droneRig.halo.rotation.z = elapsed * 0.8;
    }

    floaters.forEach((f, idx) => {
      const base = f.mesh.userData.basePos;
      f.mesh.position.y =
        base.y + Math.sin(elapsed * f.speed + idx * 1.3) * f.amp;
      f.mesh.rotation.y += f.rotSpeed * dt;
    });

    // Subtle drift on instanced geometric nodes
    for (let i = 0; i < nodeCount; i++) {
      const s = nodeSeeds[i];
      dummy.position.set(
        s.x,
        s.y + Math.sin(elapsed * 0.9 + s.phase) * 0.09,
        s.z
      );
      dummy.rotation.set(elapsed * 0.35 + s.phase, elapsed * 0.45, 0);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      nodeInst.setMatrixAt(i, dummy.matrix);
    }
    nodeInst.instanceMatrix.needsUpdate = true;
  };

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

  function tick() {
    if (disposed || !isInViewport) return;
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    stepScene(dt);
    renderer.render(scene, camera);

    if (!reducedMotion) {
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }
  }

  // Pause loop when scrolled out of viewport
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
      { threshold: 0.02 }
    );
    observer.observe(container);
  }

  const handleResize = () => {
    if (disposed) return;
    const w = Math.max(container.clientWidth, 300);
    const h = Math.max(container.clientHeight, 300);
    applyResponsivePlacement(w, h);
    renderer.setSize(w, h);
    renderer.render(scene, camera);
  };

  let resizeObserver = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
  } else {
    window.addEventListener("resize", handleResize);
  }

  const handleContextLost = (e) => {
    e.preventDefault();
    cancelAnimationFrame(frameId);
    clearTimeout(frameId);
  };
  const handleContextRestored = () => {
    tick();
  };
  renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
  renderer.domElement.addEventListener(
    "webglcontextrestored",
    handleContextRestored
  );

  // Start rendering
  tick();

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        handleContextRestored
      );

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

      Object.values(textures).forEach((t) => t.dispose());
      envTarget.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
