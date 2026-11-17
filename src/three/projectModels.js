import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/**
 * Procedural PBR 3D Project Model Library
 * Every portfolio project (id 1..19) maps to a custom multi-part 3D assembly
 * sitting on a beveled turntable plinth with zero external asset dependencies.
 */

export function createProjectMaterials() {
  return {
    ceramicWhite: new THREE.MeshPhysicalMaterial({
      color: 0xf4f7fa,
      metalness: 0.05,
      roughness: 0.24,
      clearcoat: 0.75,
      clearcoatRoughness: 0.14,
    }),
    anodizedNavy: new THREE.MeshPhysicalMaterial({
      color: 0x0f2f50,
      metalness: 0.72,
      roughness: 0.28,
      clearcoat: 0.35,
    }),
    deepNavy: new THREE.MeshStandardMaterial({
      color: 0x091d33,
      metalness: 0.35,
      roughness: 0.58,
    }),
    brushedSilver: new THREE.MeshPhysicalMaterial({
      color: 0xd6dfe8,
      metalness: 0.9,
      roughness: 0.22,
      anisotropy: 0.7,
    }),
    warmBrass: new THREE.MeshPhysicalMaterial({
      color: 0xd0a244,
      metalness: 0.92,
      roughness: 0.18,
      anisotropy: 0.75,
    }),
    roseGold: new THREE.MeshPhysicalMaterial({
      color: 0xd89a8c,
      metalness: 0.88,
      roughness: 0.2,
    }),
    visorGlass: new THREE.MeshPhysicalMaterial({
      color: 0x061322,
      metalness: 0.12,
      roughness: 0.08,
      clearcoat: 1.0,
    }),
    glowCyan: new THREE.MeshStandardMaterial({
      color: 0x67c8ff,
      emissive: 0x3b9eff,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    }),
    glowMint: new THREE.MeshStandardMaterial({
      color: 0x6ee7b7,
      emissive: 0x10b981,
      emissiveIntensity: 1.25,
      roughness: 0.22,
    }),
    whatsappGreen: new THREE.MeshStandardMaterial({
      color: 0x25d366,
      emissive: 0x128c45,
      emissiveIntensity: 0.55,
      roughness: 0.28,
      metalness: 0.15,
    }),
    amberSignal: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.9,
      roughness: 0.25,
    }),
    coralAccent: new THREE.MeshStandardMaterial({
      color: 0xe05d6f,
      roughness: 0.32,
      metalness: 0.1,
    }),
    matteSlate: new THREE.MeshStandardMaterial({
      color: 0x22384f,
      metalness: 0.1,
      roughness: 0.8,
    }),
  };
}

function makeCanvasTexture(width, height, drawFn, maxAniso = 4) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  drawFn(ctx, width, height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAniso;
  tex.needsUpdate = true;
  return tex;
}

function createScreenTexture(title, lines, badgeText, accentHex, maxAniso) {
  return makeCanvasTexture(
    512,
    320,
    (ctx, w, h) => {
      ctx.fillStyle = "#081626";
      ctx.fillRect(0, 0, w, h);

      // Top window chrome
      ctx.fillStyle = "#102845";
      ctx.fillRect(0, 0, w, 40);
      ["#E06C75", "#E5C07B", "#62C58A"].forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(22 + i * 16, 20, 5, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      });

      ctx.fillStyle = "#DCE8F5";
      ctx.font = "700 16px monospace";
      ctx.fillText(title, 80, 26);

      // Badge
      if (badgeText) {
        ctx.fillStyle = accentHex;
        ctx.fillRect(w - 134, 9, 118, 22);
        ctx.fillStyle = "#081626";
        ctx.font = "700 12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(badgeText, w - 75, 24);
        ctx.textAlign = "left";
      }

      // Simulated UI grid & bars
      ctx.strokeStyle = "rgba(103, 200, 255, 0.16)";
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 56, w - 40, h - 76);

      lines.forEach((line, idx) => {
        ctx.fillStyle = idx === 0 ? accentHex : "#DCE8F5";
        ctx.font = idx === 0 ? "700 22px monospace" : "500 17px monospace";
        ctx.fillText(line, 38, 98 + idx * 40);
      });

      // Bottom progress bar
      ctx.fillStyle = "#14304F";
      ctx.fillRect(38, h - 48, w - 76, 12);
      ctx.fillStyle = accentHex;
      ctx.fillRect(38, h - 48, (w - 76) * 0.72, 12);
    },
    maxAniso
  );
}

function createRadialShadowTexture() {
  return makeCanvasTexture(256, 256, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(
      w / 2,
      h / 2,
      12,
      w / 2,
      h / 2,
      w / 2
    );
    grad.addColorStop(0, "rgba(3, 10, 20, 0.58)");
    grad.addColorStop(0.55, "rgba(3, 10, 20, 0.22)");
    grad.addColorStop(1, "rgba(3, 10, 20, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}

function buildPlinthBase(mats, textures) {
  const group = new THREE.Group();

  const shadowTex = createRadialShadowTexture();
  textures.push(shadowTex);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.1, 3.1),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -0.84;
  group.add(shadowPlane);

  const lowerDisk = new THREE.Mesh(
    new THREE.CylinderGeometry(1.18, 1.26, 0.1, 40),
    mats.deepNavy
  );
  lowerDisk.position.y = -0.78;
  group.add(lowerDisk);

  const silverRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.18, 0.025, 12, 48),
    mats.brushedSilver
  );
  silverRim.rotation.x = Math.PI / 2;
  silverRim.position.y = -0.73;
  group.add(silverRim);

  const topDeck = new THREE.Mesh(
    new THREE.CylinderGeometry(1.06, 1.12, 0.05, 40),
    mats.ceramicWhite
  );
  topDeck.position.y = -0.71;
  group.add(topDeck);

  return group;
}

function buildDesktopMonitor(mats, screenTex, width = 1.35, height = 0.86) {
  const monitor = new THREE.Group();

  const chassis = new THREE.Mesh(
    new RoundedBoxGeometry(width, height, 0.08, 4, 0.03),
    mats.anodizedNavy
  );
  monitor.add(chassis);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(width - 0.14, height - 0.14),
    new THREE.MeshStandardMaterial({
      map: screenTex,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: screenTex,
      emissiveIntensity: 0.45,
      roughness: 0.2,
    })
  );
  screen.position.z = 0.043;
  monitor.add(screen);

  const neck = new THREE.Mesh(
    new RoundedBoxGeometry(0.16, 0.34, 0.08, 3, 0.02),
    mats.brushedSilver
  );
  neck.position.set(0, -height / 2 - 0.14, -0.02);
  monitor.add(neck);

  const foot = new THREE.Mesh(
    new RoundedBoxGeometry(0.62, 0.045, 0.38, 3, 0.015),
    mats.brushedSilver
  );
  foot.position.set(0, -height / 2 - 0.3, 0.04);
  monitor.add(foot);

  return monitor;
}

function buildServerTower(mats, tiers = 3) {
  const tower = new THREE.Group();
  for (let i = 0; i < tiers; i++) {
    const y = -0.45 + i * 0.34;
    const blade = new THREE.Mesh(
      new RoundedBoxGeometry(1.04, 0.26, 0.72, 4, 0.03),
      i % 2 === 0 ? mats.anodizedNavy : mats.matteSlate
    );
    blade.position.y = y;
    tower.add(blade);

    const trim = new THREE.Mesh(
      new RoundedBoxGeometry(0.96, 0.04, 0.04, 2, 0.01),
      mats.brushedSilver
    );
    trim.position.set(0, y + 0.08, 0.35);
    tower.add(trim);

    for (let led = 0; led < 3; led++) {
      const dot = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.03, 0.02),
        led === 0 ? mats.glowMint : mats.glowCyan
      );
      dot.position.set(-0.32 + led * 0.12, y - 0.03, 0.365);
      tower.add(dot);
    }
  }
  return tower;
}

function buildMiniGear(mats, outerR = 0.24, teeth = 8, mat = null) {
  const gear = new THREE.Group();
  const useMat = mat || mats.warmBrass;
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(outerR * 0.72, outerR * 0.18, 10, 24),
    useMat
  );
  gear.add(ring);

  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const tooth = new THREE.Mesh(
      new RoundedBoxGeometry(outerR * 0.24, outerR * 0.3, 0.08, 2, 0.01),
      useMat
    );
    tooth.position.set(Math.cos(a) * outerR * 0.92, Math.sin(a) * outerR * 0.92, 0);
    tooth.rotation.z = a + Math.PI / 2;
    gear.add(tooth);
  }
  return gear;
}

function extrudeBarX(mats) {
  const group = new THREE.Group();
  const barGeo = new RoundedBoxGeometry(0.18, 0.92, 0.14, 4, 0.03);
  const b1 = new THREE.Mesh(barGeo, mats.ceramicWhite);
  b1.rotation.z = Math.PI / 4;
  const b2 = new THREE.Mesh(barGeo, mats.brushedSilver);
  b2.rotation.z = -Math.PI / 4;
  group.add(b1, b2);
  return group;
}

/**
 * Build a custom composite 3D showcase model for a specific portfolio project ID.
 */
export function buildProject3DModel(projectId, maxAniso = 4) {
  const mats = createProjectMaterials();
  const textures = [];
  const root = new THREE.Group();
  const animables = [];

  // Shared plinth base at y = -0.71
  root.add(buildPlinthBase(mats, textures));

  const subject = new THREE.Group();
  root.add(subject);

  switch (projectId) {
    // 19. X AI AUTOMATION AGENT (Post -> WhatsApp Verify -> Publish / Urdu / Roman Urdu / New)
    case 19: {
      // Center X Emblem
      const xEmblem = extrudeBarX(mats);
      xEmblem.position.set(-0.34, 0.08, 0.08);
      xEmblem.scale.setScalar(0.84);
      subject.add(xEmblem);

      // WhatsApp Verification Smartphone Node
      const phoneBody = new THREE.Mesh(
        new RoundedBoxGeometry(0.5, 0.88, 0.07, 4, 0.04),
        mats.anodizedNavy
      );
      phoneBody.position.set(0.46, 0.02, 0.1);
      phoneBody.rotation.y = -0.26;
      subject.add(phoneBody);

      const waTex = createScreenTexture(
        "WhatsApp Verify",
        ["Draft Ready -> Approve?", "1. Post to X", "2. Urdu / Roman Urdu"],
        "VERIFIED",
        "#25D366",
        maxAniso
      );
      textures.push(waTex);

      const phoneScreen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.42, 0.74),
        new THREE.MeshStandardMaterial({
          map: waTex,
          emissive: new THREE.Color(0xffffff),
          emissiveMap: waTex,
          emissiveIntensity: 0.45,
          roughness: 0.2,
        })
      );
      phoneScreen.position.set(0.45, 0.02, 0.14);
      phoneScreen.rotation.y = -0.26;
      subject.add(phoneScreen);

      // WhatsApp emerald verify check orb
      const checkPod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.06, 20),
        mats.whatsappGreen
      );
      checkPod.rotation.x = Math.PI / 2;
      checkPod.position.set(0.68, 0.36, 0.22);
      subject.add(checkPod);

      // Glowing neural pipeline tube connecting X prism -> WhatsApp verifier
      const pipeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.34, 0.08, 0.08),
        new THREE.Vector3(0.05, 0.32, 0.22),
        new THREE.Vector3(0.45, 0.06, 0.12),
      ]);
      const pipe = new THREE.Mesh(
        new THREE.TubeGeometry(pipeCurve, 24, 0.024, 10, false),
        mats.glowCyan
      );
      subject.add(pipe);

      // Floating AI Neural Core Octahedron
      const aiCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.18, 0),
        mats.warmBrass
      );
      aiCore.position.set(0.04, 0.56, 0.02);
      subject.add(aiCore);
      animables.push({ mesh: aiCore, type: "spin", speed: 1.4, bob: 0.04 });

      // Multilingual Orbital Ring (EN / اردو / Roman Urdu)
      const langRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.86, 0.018, 12, 48),
        mats.glowMint
      );
      langRing.rotation.set(Math.PI / 2.4, 0.22, 0);
      langRing.position.y = 0.05;
      subject.add(langRing);
      animables.push({ mesh: langRing, type: "orbitZ", speed: 0.7 });
      break;
    }

    // 1. SMART E-COMMERCE MARKETPLACE
    case 1: {
      const bagBody = new THREE.Mesh(
        new RoundedBoxGeometry(0.76, 0.72, 0.44, 4, 0.06),
        mats.anodizedNavy
      );
      bagBody.position.set(-0.14, -0.1, 0);
      subject.add(bagBody);

      const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.32, 0.24, 0),
        new THREE.Vector3(-0.14, 0.52, 0),
        new THREE.Vector3(0.04, 0.24, 0),
      ]);
      const handle = new THREE.Mesh(
        new THREE.TubeGeometry(handleCurve, 20, 0.032, 10, false),
        mats.warmBrass
      );
      subject.add(handle);

      // Stripe payment card tilted alongside
      const card = new THREE.Mesh(
        new RoundedBoxGeometry(0.62, 0.4, 0.04, 3, 0.02),
        mats.ceramicWhite
      );
      card.position.set(0.42, 0.08, 0.26);
      card.rotation.set(-0.15, -0.35, 0.14);
      subject.add(card);

      const chip = new THREE.Mesh(
        new RoundedBoxGeometry(0.12, 0.09, 0.05, 2, 0.01),
        mats.warmBrass
      );
      chip.position.set(0.26, 0.12, 0.29);
      chip.rotation.copy(card.rotation);
      subject.add(chip);

      // Floating analytics node
      const orb = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.14, 0),
        mats.glowCyan
      );
      orb.position.set(0.45, 0.5, -0.05);
      subject.add(orb);
      animables.push({ mesh: orb, type: "spin", speed: 1.5, bob: 0.05 });
      break;
    }

    // 2. RESHINE COSMETICS STORE
    case 2: {
      // Sculpted Lathe Serum Bottle
      const pts = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.28, 0),
        new THREE.Vector2(0.32, 0.12),
        new THREE.Vector2(0.3, 0.62),
        new THREE.Vector2(0.14, 0.78),
        new THREE.Vector2(0.14, 0.92),
        new THREE.Vector2(0, 0.92),
      ];
      const bottle = new THREE.Mesh(
        new THREE.LatheGeometry(pts, 32),
        mats.ceramicWhite
      );
      bottle.position.set(-0.22, -0.66, 0.05);
      subject.add(bottle);

      const goldCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.24, 24),
        mats.warmBrass
      );
      goldCap.position.set(-0.22, 0.36, 0.05);
      subject.add(goldCap);

      // Compact Rose-Gold Mirror Disc
      const compact = new THREE.Mesh(
        new THREE.CylinderGeometry(0.34, 0.34, 0.11, 32),
        mats.roseGold
      );
      compact.position.set(0.36, -0.45, 0.14);
      compact.rotation.z = 0.25;
      subject.add(compact);

      const glowGem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.14, 0),
        mats.glowMint
      );
      glowGem.position.set(0.38, 0.12, 0.02);
      subject.add(glowGem);
      animables.push({ mesh: glowGem, type: "spin", speed: 1.3, bob: 0.06 });
      break;
    }

    // 3. FINANCE MANAGEMENT DESKTOP APP
    case 3: {
      const tex = createScreenTexture(
        "Ledger Desktop",
        ["+ $14,820 Income", "- $4,190 Expenses", "Net Balance: +72%"],
        "ELECTRON",
        "#6EE7B7",
        maxAniso
      );
      textures.push(tex);
      const mon = buildDesktopMonitor(mats, tex, 1.24, 0.78);
      mon.position.set(-0.1, 0.1, -0.08);
      subject.add(mon);

      // 3D Bar Chart + Brass Coins
      [0.24, 0.42, 0.6].forEach((h, i) => {
        const bar = new THREE.Mesh(
          new RoundedBoxGeometry(0.13, h, 0.13, 3, 0.02),
          i === 2 ? mats.warmBrass : mats.glowCyan
        );
        bar.position.set(0.42 + i * 0.18, -0.68 + h / 2, 0.3);
        subject.add(bar);
      });
      break;
    }

    // 4. STUDENT MANAGEMENT SYSTEM
    case 4: {
      const tex = createScreenTexture(
        "Campus Portal",
        ["Students: 1,240", "Attendance: 96%", "RBAC: Multi-Role"],
        "NEXT.JS",
        "#67C8FF",
        maxAniso
      );
      textures.push(tex);
      const mon = buildDesktopMonitor(mats, tex, 1.26, 0.78);
      mon.position.set(0, 0.06, -0.05);
      subject.add(mon);

      // 3D Mortarboard Graduation Cap perched on top right
      const cap = new THREE.Group();
      const crown = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.14, 20),
        mats.anodizedNavy
      );
      const board = new THREE.Mesh(
        new RoundedBoxGeometry(0.56, 0.04, 0.56, 2, 0.01),
        mats.anodizedNavy
      );
      board.position.y = 0.09;
      board.rotation.y = Math.PI / 4;
      const tassel = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 12, 12),
        mats.warmBrass
      );
      tassel.position.set(0.24, 0.08, 0.1);
      cap.add(crown, board, tassel);
      cap.position.set(0.46, 0.54, 0.16);
      cap.rotation.set(0.15, -0.25, -0.14);
      subject.add(cap);
      animables.push({ mesh: cap, type: "bob", speed: 1.8, amp: 0.04 });
      break;
    }

    // 5. GDC GULABAD WEBSITE PORTAL
    case 5: {
      // Architectural Academic Pediment & 3 Pillars
      const baseStep = new THREE.Mesh(
        new RoundedBoxGeometry(1.36, 0.12, 0.78, 3, 0.02),
        mats.ceramicWhite
      );
      baseStep.position.y = -0.62;
      subject.add(baseStep);

      [-0.44, 0, 0.44].forEach((x) => {
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.085, 0.1, 0.72, 16),
          mats.ceramicWhite
        );
        pillar.position.set(x, -0.2, 0.1);
        subject.add(pillar);
      });

      const entablature = new THREE.Mesh(
        new RoundedBoxGeometry(1.32, 0.12, 0.72, 3, 0.02),
        mats.anodizedNavy
      );
      entablature.position.y = 0.2;
      subject.add(entablature);

      const pediment = new THREE.Mesh(
        new THREE.ConeGeometry(0.74, 0.34, 4),
        mats.warmBrass
      );
      pediment.rotation.y = Math.PI / 4;
      pediment.scale.set(1.25, 1, 0.72);
      pediment.position.y = 0.42;
      subject.add(pediment);

      const firebaseOrb = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.15, 0),
        mats.amberSignal
      );
      firebaseOrb.position.set(0.58, 0.52, 0.2);
      subject.add(firebaseOrb);
      animables.push({ mesh: firebaseOrb, type: "spin", speed: 1.4, bob: 0.05 });
      break;
    }

    // 6. POST MANAGEMENT SYSTEM
    case 6: {
      // Stacked Floating Feed Cards + JWT Brass Lock
      [-0.22, 0.02, 0.26].forEach((y, idx) => {
        const slab = new THREE.Mesh(
          new RoundedBoxGeometry(1.06 - idx * 0.08, 0.22, 0.54, 4, 0.03),
          idx === 1 ? mats.anodizedNavy : mats.ceramicWhite
        );
        slab.position.set(-0.14 + idx * 0.08, y - 0.15, idx * 0.14 - 0.1);
        slab.rotation.y = (idx - 1) * 0.14;
        subject.add(slab);
      });

      const lockGroup = new THREE.Group();
      const lockBody = new THREE.Mesh(
        new RoundedBoxGeometry(0.32, 0.28, 0.14, 3, 0.03),
        mats.warmBrass
      );
      const shackle = new THREE.Mesh(
        new THREE.TorusGeometry(0.1, 0.028, 10, 24, Math.PI),
        mats.brushedSilver
      );
      shackle.position.y = 0.14;
      lockGroup.add(lockBody, shackle);
      lockGroup.position.set(0.48, 0.32, 0.22);
      subject.add(lockGroup);
      animables.push({ mesh: lockGroup, type: "bob", speed: 2.0, amp: 0.05 });
      break;
    }

    // 7. WANDERLY - TRAVEL WEBSITE
    case 7: {
      const globeGroup = new THREE.Group();
      globeGroup.position.set(0, 0.04, 0);

      const sphere = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.48, 2),
        mats.anodizedNavy
      );
      globeGroup.add(sphere);

      const equator = new THREE.Mesh(
        new THREE.TorusGeometry(0.56, 0.022, 12, 40),
        mats.warmBrass
      );
      equator.rotation.x = Math.PI / 2.2;
      globeGroup.add(equator);

      const meridian = new THREE.Mesh(
        new THREE.TorusGeometry(0.64, 0.018, 12, 40),
        mats.glowCyan
      );
      meridian.rotation.y = Math.PI / 3;
      globeGroup.add(meridian);

      // Stylized Paper Plane orbiting globe
      const plane = new THREE.Mesh(
        new THREE.ConeGeometry(0.11, 0.28, 4),
        mats.ceramicWhite
      );
      plane.rotation.z = -Math.PI / 2;
      plane.position.set(0.64, 0.22, 0.16);
      globeGroup.add(plane);

      subject.add(globeGroup);
      animables.push({ mesh: globeGroup, type: "spinSlow", speed: 0.7 });
      break;
    }

    // 8. ADMIN PANEL WITH E-COMMERCE
    case 8: {
      const tex = createScreenTexture(
        "Admin Console",
        ["Orders: 482 Active", "Stock: 98.4% Sync", "Revenue: +34% MoM"],
        "DASHBOARD",
        "#D0A244",
        maxAniso
      );
      textures.push(tex);
      const mon = buildDesktopMonitor(mats, tex, 1.28, 0.8);
      mon.position.set(0, 0.06, -0.05);
      subject.add(mon);

      // 3D Donut KPI Gauge floating beside monitor
      const donut = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.065, 14, 32),
        mats.warmBrass
      );
      donut.position.set(0.56, 0.32, 0.25);
      subject.add(donut);
      animables.push({ mesh: donut, type: "spin", speed: 1.1, bob: 0.04 });
      break;
    }

    // 9. EVENTSPHERE - EVENT MANAGEMENT
    case 9: {
      // Geodesic Sphere Core + Concentric Spotlight Rings
      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.36, 1),
        mats.ceramicWhite
      );
      core.position.y = 0.08;
      subject.add(core);
      animables.push({ mesh: core, type: "spinSlow", speed: 0.9 });

      const r1 = new THREE.Mesh(
        new THREE.TorusGeometry(0.58, 0.022, 12, 40),
        mats.warmBrass
      );
      r1.rotation.set(1.1, 0.4, 0);
      r1.position.y = 0.08;
      subject.add(r1);
      animables.push({ mesh: r1, type: "orbitZ", speed: 0.85 });

      const r2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.72, 0.018, 12, 40),
        mats.glowCyan
      );
      r2.rotation.set(-0.9, 0.7, 0);
      r2.position.y = 0.08;
      subject.add(r2);
      animables.push({ mesh: r2, type: "orbitZ", speed: -0.65 });

      // Two floating ticket passes
      [-0.58, 0.58].forEach((x, idx) => {
        const pass = new THREE.Mesh(
          new RoundedBoxGeometry(0.24, 0.34, 0.04, 3, 0.02),
          idx === 0 ? mats.anodizedNavy : mats.glowMint
        );
        pass.position.set(x, -0.34, 0.32);
        pass.rotation.y = idx === 0 ? 0.35 : -0.35;
        subject.add(pass);
      });
      break;
    }

    // 10. MYACCOUNTANT DESKTOP APP
    case 10: {
      const calcBody = new THREE.Mesh(
        new RoundedBoxGeometry(0.84, 0.96, 0.16, 4, 0.05),
        mats.anodizedNavy
      );
      calcBody.position.set(0, 0.02, 0);
      calcBody.rotation.x = -0.22;
      subject.add(calcBody);

      const calcScreen = new THREE.Mesh(
        new RoundedBoxGeometry(0.68, 0.24, 0.05, 3, 0.02),
        mats.glowMint
      );
      calcScreen.position.set(0, 0.28, 0.09);
      calcScreen.rotation.x = -0.22;
      subject.add(calcScreen);

      // 3x3 3D Tactile Keys
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const key = new THREE.Mesh(
            new RoundedBoxGeometry(0.16, 0.14, 0.07, 2, 0.02),
            r === 0 && c === 2 ? mats.warmBrass : mats.ceramicWhite
          );
          key.position.set(
            -0.22 + c * 0.22,
            0.05 - r * 0.18,
            0.09 + r * 0.035
          );
          key.rotation.x = -0.22;
          subject.add(key);
        }
      }
      break;
    }

    // 11. CONSTRUCTION BUSINESS WEBSITE
    case 11: {
      // Architectural Structural Frame + Mini Crane Jib
      const tower = new THREE.Mesh(
        new RoundedBoxGeometry(0.46, 0.86, 0.46, 3, 0.02),
        mats.ceramicWhite
      );
      tower.position.set(-0.22, -0.22, 0);
      subject.add(tower);

      const annex = new THREE.Mesh(
        new RoundedBoxGeometry(0.42, 0.52, 0.42, 3, 0.02),
        mats.anodizedNavy
      );
      annex.position.set(0.26, -0.39, 0.06);
      subject.add(annex);

      const craneMast = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 1.05, 0.08),
        mats.amberSignal
      );
      craneMast.position.set(0.32, -0.12, -0.24);
      subject.add(craneMast);

      const jib = new THREE.Mesh(
        new THREE.BoxGeometry(0.96, 0.07, 0.07),
        mats.warmBrass
      );
      jib.position.set(-0.04, 0.42, -0.24);
      subject.add(jib);
      break;
    }

    // 12. STUDENT MANAGEMENT API
    case 12: {
      const rack = buildServerTower(mats, 3);
      rack.position.set(0, 0.02, 0);
      subject.add(rack);

      // Orbiting JSON API Endpoint Nodes
      const ring = new THREE.Group();
      [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach((a, idx) => {
        const node = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.11, 0),
          idx === 0 ? mats.warmBrass : mats.glowCyan
        );
        node.position.set(Math.cos(a) * 0.78, 0.15, Math.sin(a) * 0.78);
        ring.add(node);
      });
      subject.add(ring);
      animables.push({ mesh: ring, type: "spinSlow", speed: 0.9 });
      break;
    }

    // 13. TASK MANAGER API
    case 13: {
      // 3D Kanban Board Columns + Floating Check Ring
      [-0.36, 0, 0.36].forEach((x, c) => {
        const col = new THREE.Mesh(
          new RoundedBoxGeometry(0.28, 0.82, 0.12, 3, 0.02),
          mats.anodizedNavy
        );
        col.position.set(x, -0.1, 0);
        subject.add(col);

        for (let r = 0; r < 2; r++) {
          const card = new THREE.Mesh(
            new RoundedBoxGeometry(0.22, 0.18, 0.06, 2, 0.015),
            c === 2 && r === 0 ? mats.glowMint : mats.ceramicWhite
          );
          card.position.set(x, 0.12 - r * 0.28, 0.08);
          subject.add(card);
        }
      });

      const badge = new THREE.Mesh(
        new THREE.TorusGeometry(0.18, 0.045, 12, 24),
        mats.warmBrass
      );
      badge.position.set(0.46, 0.44, 0.18);
      subject.add(badge);
      animables.push({ mesh: badge, type: "spin", speed: 1.2, bob: 0.04 });
      break;
    }

    // 14. LINKEDIN AUTO POSTING BOT
    case 14: {
      // Stylized 'in' Monolith + Companion Bot Head + Automation Gear
      const slab = new THREE.Mesh(
        new RoundedBoxGeometry(0.76, 0.76, 0.18, 4, 0.06),
        mats.anodizedNavy
      );
      slab.position.set(-0.18, -0.05, 0);
      subject.add(slab);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 16, 16),
        mats.ceramicWhite
      );
      dot.position.set(-0.34, 0.13, 0.12);
      const stem = new THREE.Mesh(
        new RoundedBoxGeometry(0.1, 0.28, 0.06, 2, 0.02),
        mats.ceramicWhite
      );
      stem.position.set(-0.34, -0.08, 0.12);
      const arch = new THREE.Mesh(
        new RoundedBoxGeometry(0.24, 0.28, 0.06, 3, 0.03),
        mats.ceramicWhite
      );
      arch.position.set(-0.08, -0.08, 0.12);
      subject.add(dot, stem, arch);

      const gear = buildMiniGear(mats, 0.26, 8, mats.warmBrass);
      gear.position.set(0.44, 0.28, 0.14);
      subject.add(gear);
      animables.push({ mesh: gear, type: "orbitZ", speed: 1.2 });
      break;
    }

    // 15. BINANCE SQUARE AUTO POSTING BOT
    case 15: {
      // Faceted Golden Crypto Diamond + Candlestick Bars
      const diamond = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.36, 0),
        mats.warmBrass
      );
      diamond.position.set(-0.14, 0.08, 0.05);
      subject.add(diamond);
      animables.push({ mesh: diamond, type: "spin", speed: 1.1, bob: 0.05 });

      const outerDiamond = new THREE.Mesh(
        new THREE.TorusGeometry(0.56, 0.022, 4, 4),
        mats.amberSignal
      );
      outerDiamond.position.set(-0.14, 0.08, 0.05);
      subject.add(outerDiamond);

      [0.34, 0.52, 0.44].forEach((h, i) => {
        const candle = new THREE.Mesh(
          new RoundedBoxGeometry(0.11, h, 0.11, 2, 0.02),
          i === 1 ? mats.glowMint : mats.glowCyan
        );
        candle.position.set(0.38 + i * 0.15, -0.68 + h / 2 + 0.08, 0.22);
        subject.add(candle);
      });
      break;
    }

    // 16. STUDENT MANAGEMENT SAAS DESKTOP APP
    case 16: {
      const cloudBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.56, 0.62, 0.22, 32),
        mats.brushedSilver
      );
      cloudBase.position.y = -0.38;
      subject.add(cloudBase);

      const tex = createScreenTexture(
        "EduSaaS Multi-Tenant",
        ["Campuses: Synced", "Offline Queue: 0", "Cloud Backup: Active"],
        "SAAS",
        "#67C8FF",
        maxAniso
      );
      textures.push(tex);
      const mon = buildDesktopMonitor(mats, tex, 1.16, 0.72);
      mon.position.set(0, 0.18, 0);
      subject.add(mon);

      const tenantRing = new THREE.Group();
      [0, 2.1, 4.2].forEach((a) => {
        const pod = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 16, 16),
          mats.warmBrass
        );
        pod.position.set(Math.cos(a) * 0.82, -0.1, Math.sin(a) * 0.82);
        tenantRing.add(pod);
      });
      subject.add(tenantRing);
      animables.push({ mesh: tenantRing, type: "spinSlow", speed: 0.75 });
      break;
    }

    // 17. CLINIC MANAGEMENT SAAS DESKTOP APP
    case 17: {
      // Sculpted 3D Medical Shield Cross + Rx Capsule
      const shield = new THREE.Mesh(
        new RoundedBoxGeometry(0.82, 0.88, 0.18, 4, 0.08),
        mats.ceramicWhite
      );
      shield.position.set(-0.14, 0.04, 0);
      subject.add(shield);

      const crossH = new THREE.Mesh(
        new RoundedBoxGeometry(0.46, 0.15, 0.1, 2, 0.02),
        mats.coralAccent
      );
      crossH.position.set(-0.14, 0.04, 0.1);
      const crossV = new THREE.Mesh(
        new RoundedBoxGeometry(0.15, 0.46, 0.1, 2, 0.02),
        mats.coralAccent
      );
      crossV.position.set(-0.14, 0.04, 0.1);
      subject.add(crossH, crossV);

      const pill = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.11, 0.24, 8, 16),
        mats.glowMint
      );
      pill.position.set(0.48, 0.18, 0.2);
      pill.rotation.z = -0.6;
      subject.add(pill);
      animables.push({ mesh: pill, type: "bob", speed: 2.0, amp: 0.06 });
      break;
    }

    // 18. MTACADEMY — PMA MOCK TEST PLATFORM
    default: {
      // Chronometer Stopwatch + Stacked Exam Sheets + Brass Star Crest
      const watchBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.46, 0.46, 0.14, 32),
        mats.anodizedNavy
      );
      watchBody.rotation.x = Math.PI / 2;
      watchBody.position.set(-0.18, 0.05, 0);
      subject.add(watchBody);

      const bezel = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.035, 12, 36),
        mats.warmBrass
      );
      bezel.position.set(-0.18, 0.05, 0.06);
      subject.add(bezel);

      const dial = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.02, 32),
        mats.ceramicWhite
      );
      dial.rotation.x = Math.PI / 2;
      dial.position.set(-0.18, 0.05, 0.07);
      subject.add(dial);

      const hand = new THREE.Mesh(
        new RoundedBoxGeometry(0.03, 0.28, 0.03, 2, 0.01),
        mats.coralAccent
      );
      hand.position.set(-0.18, 0.12, 0.095);
      subject.add(hand);
      animables.push({ mesh: hand, type: "orbitZ", speed: -1.4 });

      const crest = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.18, 0),
        mats.warmBrass
      );
      crest.position.set(0.48, 0.26, 0.18);
      subject.add(crest);
      animables.push({ mesh: crest, type: "spin", speed: 1.3, bob: 0.05 });
      break;
    }
  }

  return { group: root, animables, textures };
}
