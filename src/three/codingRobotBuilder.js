import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/**
 * Composite 3D Procedural Builders:
 * - Cute Coding Robot (articulated head, blinking/tracking eyes, typing arms, floating code console)
 * - Mini Companion Drone Bot
 * - Beveled 3D Coding Brackets (<, >, /, { })
 * - Floating Glass Code Cards
 */

export function createSharedCodingMaterials(isSoftwareGl = false) {
  const ceramicWhite = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7fa,
    metalness: 0.04,
    roughness: 0.22,
    clearcoat: 0.8,
    clearcoatRoughness: 0.14,
  });

  const anodizedNavy = new THREE.MeshPhysicalMaterial({
    color: 0x0f2f50,
    metalness: 0.72,
    roughness: 0.28,
    clearcoat: 0.35,
    clearcoatRoughness: 0.22,
  });

  const brushedSilver = new THREE.MeshPhysicalMaterial({
    color: 0xd3dce5,
    metalness: 0.9,
    roughness: 0.24,
    anisotropy: 0.75,
  });

  const warmBrass = new THREE.MeshPhysicalMaterial({
    color: 0xc99c42,
    metalness: 0.92,
    roughness: 0.2,
    anisotropy: 0.75,
  });

  const visorGlass = new THREE.MeshPhysicalMaterial({
    color: 0x071526,
    metalness: 0.1,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });

  const glowCyan = new THREE.MeshStandardMaterial({
    color: 0x64c2ff,
    emissive: 0x3b9eff,
    emissiveIntensity: 1.55,
    roughness: 0.2,
    metalness: 0.05,
  });

  const glowMint = new THREE.MeshStandardMaterial({
    color: 0x72e6be,
    emissive: 0x3bc294,
    emissiveIntensity: 1.35,
    roughness: 0.25,
    metalness: 0.05,
  });

  const matteSlate = new THREE.MeshStandardMaterial({
    color: 0x1e3044,
    metalness: 0.08,
    roughness: 0.8,
  });

  const holoGlass = new THREE.MeshPhysicalMaterial({
    color: 0xd9ecff,
    metalness: 0.05,
    roughness: 0.1,
    transparent: true,
    opacity: isSoftwareGl ? 0.55 : 0.48,
    clearcoat: 0.9,
  });

  return {
    ceramicWhite,
    anodizedNavy,
    brushedSilver,
    warmBrass,
    visorGlass,
    glowCyan,
    glowMint,
    matteSlate,
    holoGlass,
  };
}

export function buildCuteCodingRobot(mats, textures) {
  const root = new THREE.Group();

  // ----------------------------------------------------------
  // 1. TORSO & HOVER BASE
  // ----------------------------------------------------------
  const bodyGroup = new THREE.Group();

  const torsoShell = new THREE.Mesh(
    new RoundedBoxGeometry(0.62, 0.58, 0.46, 5, 0.16),
    mats.ceramicWhite
  );
  bodyGroup.add(torsoShell);

  // Navy chest armor inset
  const chestPlate = new THREE.Mesh(
    new RoundedBoxGeometry(0.46, 0.36, 0.06, 4, 0.05),
    mats.anodizedNavy
  );
  chestPlate.position.set(0, 0.02, 0.21);
  bodyGroup.add(chestPlate);

  // Glowing </> Chest Display
  const chestScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.28, 0.22),
    new THREE.MeshStandardMaterial({
      map: textures.chestDisplay,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: textures.chestDisplay,
      emissiveIntensity: 0.6,
      roughness: 0.25,
    })
  );
  chestScreen.position.set(0, 0.02, 0.244);
  bodyGroup.add(chestScreen);

  // Brass neck collar ring
  const neckCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.17, 0.1, 24),
    mats.brushedSilver
  );
  neckCollar.position.set(0, 0.31, 0);
  bodyGroup.add(neckCollar);

  const neckTrim = new THREE.Mesh(
    new THREE.TorusGeometry(0.165, 0.018, 12, 28),
    mats.warmBrass
  );
  neckTrim.rotation.x = Math.PI / 2;
  neckTrim.position.set(0, 0.29, 0);
  bodyGroup.add(neckTrim);

  // Hover Thruster Bell (LatheGeometry) + Glowing Hover Ring
  const thrusterPts = [
    new THREE.Vector2(0.06, 0),
    new THREE.Vector2(0.2, 0),
    new THREE.Vector2(0.24, 0.07),
    new THREE.Vector2(0.16, 0.14),
    new THREE.Vector2(0, 0.14),
  ];
  const thruster = new THREE.Mesh(
    new THREE.LatheGeometry(thrusterPts, 28),
    mats.anodizedNavy
  );
  thruster.position.set(0, -0.37, 0);
  bodyGroup.add(thruster);

  const hoverRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.17, 0.022, 12, 32),
    mats.glowCyan
  );
  hoverRing.rotation.x = Math.PI / 2;
  hoverRing.position.set(0, -0.39, 0);
  bodyGroup.add(hoverRing);

  root.add(bodyGroup);

  // ----------------------------------------------------------
  // 2. ARTICULATED CUTE HEAD + BLINKING TRACKING EYES
  // ----------------------------------------------------------
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.64, 0.02);

  const cranium = new THREE.Mesh(
    new RoundedBoxGeometry(0.76, 0.56, 0.56, 5, 0.18),
    mats.ceramicWhite
  );
  headGroup.add(cranium);

  // Navy visor rim
  const visorBezel = new THREE.Mesh(
    new RoundedBoxGeometry(0.62, 0.36, 0.08, 4, 0.07),
    mats.anodizedNavy
  );
  visorBezel.position.set(0, -0.01, 0.25);
  headGroup.add(visorBezel);

  // Glossy dark visor face
  const visorScreen = new THREE.Mesh(
    new RoundedBoxGeometry(0.55, 0.3, 0.04, 3, 0.05),
    mats.visorGlass
  );
  visorScreen.position.set(0, -0.01, 0.278);
  headGroup.add(visorScreen);

  // Eyes group (shifts slightly toward cursor + blinks)
  const eyesGroup = new THREE.Group();
  eyesGroup.position.set(0, 0.01, 0.302);

  const eyeGeo = new THREE.CapsuleGeometry(0.038, 0.05, 8, 16);
  const leftEye = new THREE.Mesh(eyeGeo, mats.glowCyan);
  leftEye.position.set(-0.125, 0.01, 0);
  eyesGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, mats.glowCyan);
  rightEye.position.set(0.125, 0.01, 0);
  eyesGroup.add(rightEye);

  // Cute glowing smile arc
  const smileCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.065, -0.065, 0),
    new THREE.Vector3(0, -0.09, 0.006),
    new THREE.Vector3(0.065, -0.065, 0),
  ]);
  const smileMesh = new THREE.Mesh(
    new THREE.TubeGeometry(smileCurve, 16, 0.011, 8, false),
    mats.glowMint
  );
  eyesGroup.add(smileMesh);

  headGroup.add(eyesGroup);

  // Cute Headphone Ear Pods (Left & Right)
  [-1, 1].forEach((side) => {
    const earCup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.07, 24),
      mats.brushedSilver
    );
    earCup.rotation.z = Math.PI / 2;
    earCup.position.set(side * 0.4, 0, 0);
    headGroup.add(earCup);

    const earAccent = new THREE.Mesh(
      new THREE.TorusGeometry(0.095, 0.014, 10, 24),
      mats.warmBrass
    );
    earAccent.rotation.y = Math.PI / 2;
    earAccent.position.set(side * 0.436, 0, 0);
    headGroup.add(earAccent);
  });

  // Top Curved Antenna + Glowing Tip
  const antennaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.27, -0.02),
    new THREE.Vector3(0.03, 0.39, -0.03),
    new THREE.Vector3(0.07, 0.48, 0.02),
  ]);
  const antennaStem = new THREE.Mesh(
    new THREE.TubeGeometry(antennaCurve, 16, 0.016, 10, false),
    mats.brushedSilver
  );
  headGroup.add(antennaStem);

  const antennaTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.042, 16, 16),
    mats.glowCyan
  );
  antennaTip.position.set(0.07, 0.49, 0.02);
  headGroup.add(antennaTip);

  root.add(headGroup);

  // ----------------------------------------------------------
  // 3. TYPING ARMS + FLOATING HOLOGRAPHIC CODE CONSOLE
  // ----------------------------------------------------------
  const createArm = (side) => {
    const armPivot = new THREE.Group();
    armPivot.position.set(side * 0.35, 0.14, 0.04);

    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      mats.brushedSilver
    );
    armPivot.add(shoulder);

    const armCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(side * 0.08, -0.14, 0.14),
      new THREE.Vector3(-side * 0.06, -0.16, 0.36),
    ]);
    const armTube = new THREE.Mesh(
      new THREE.TubeGeometry(armCurve, 20, 0.042, 12, false),
      mats.ceramicWhite
    );
    armPivot.add(armTube);

    const hand = new THREE.Mesh(
      new RoundedBoxGeometry(0.11, 0.08, 0.13, 3, 0.03),
      mats.anodizedNavy
    );
    hand.position.set(-side * 0.07, -0.16, 0.39);
    armPivot.add(hand);

    return armPivot;
  };

  const leftArm = createArm(-1);
  const rightArm = createArm(1);
  root.add(leftArm, rightArm);

  // Floating Mini Code Console in front of Robot Hands
  const holoConsole = new THREE.Group();
  holoConsole.position.set(0, -0.04, 0.62);
  holoConsole.rotation.x = -0.52;

  const consoleFrame = new THREE.Mesh(
    new RoundedBoxGeometry(0.66, 0.4, 0.024, 3, 0.008),
    mats.anodizedNavy
  );
  holoConsole.add(consoleFrame);

  const consoleScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.6, 0.35),
    new THREE.MeshStandardMaterial({
      map: textures.holoCode,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: textures.holoCode,
      emissiveIntensity: 0.55,
      roughness: 0.22,
    })
  );
  consoleScreen.position.z = 0.014;
  holoConsole.add(consoleScreen);

  root.add(holoConsole);

  return {
    group: root,
    bodyGroup,
    headGroup,
    eyesGroup,
    leftEye,
    rightEye,
    leftArm,
    rightArm,
    holoConsole,
    hoverRing,
  };
}

/**
 * Smaller companion coding bot drone (great for dark navy #projects background)
 */
export function buildMiniDroneBot(mats) {
  const root = new THREE.Group();

  const shell = new THREE.Mesh(
    new RoundedBoxGeometry(0.46, 0.38, 0.38, 4, 0.12),
    mats.brushedSilver
  );
  root.add(shell);

  const visor = new THREE.Mesh(
    new RoundedBoxGeometry(0.36, 0.2, 0.05, 3, 0.04),
    mats.visorGlass
  );
  visor.position.set(0, 0.01, 0.18);
  root.add(visor);

  const eyeGeo = new THREE.SphereGeometry(0.032, 12, 12);
  const lEye = new THREE.Mesh(eyeGeo, mats.glowCyan);
  lEye.position.set(-0.08, 0.02, 0.21);
  const rEye = new THREE.Mesh(eyeGeo, mats.glowCyan);
  rEye.position.set(0.08, 0.02, 0.21);
  root.add(lEye, rEye);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.32, 0.014, 10, 32),
    mats.warmBrass
  );
  halo.rotation.x = Math.PI / 2.3;
  root.add(halo);

  return { group: root, halo };
}

/**
 * Beveled ExtrudeGeometry 3D coding symbols (<, >, /, { })
 */
function extrudePoints(points, depth = 0.08) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

export function buildCodeBracketsGroup(mats) {
  const group = new THREE.Group();

  // Left '<'
  const leftGeo = extrudePoints([
    [0.18, 0.24],
    [0.12, 0.3],
    [-0.18, 0.0],
    [0.12, -0.3],
    [0.18, -0.24],
    [-0.06, 0.0],
  ]);
  const leftMesh = new THREE.Mesh(leftGeo, mats.anodizedNavy);
  leftMesh.position.set(-0.34, 0, 0);

  // Center '/'
  const slashGeo = extrudePoints([
    [0.08, 0.32],
    [0.15, 0.32],
    [-0.08, -0.32],
    [-0.15, -0.32],
  ]);
  const slashMesh = new THREE.Mesh(slashGeo, mats.warmBrass);

  // Right '>'
  const rightGeo = extrudePoints([
    [-0.18, 0.24],
    [-0.12, 0.3],
    [0.18, 0.0],
    [-0.12, -0.3],
    [-0.18, -0.24],
    [0.06, 0.0],
  ]);
  const rightMesh = new THREE.Mesh(rightGeo, mats.anodizedNavy);
  rightMesh.position.set(0.34, 0, 0);

  group.add(leftMesh, slashMesh, rightMesh);
  return group;
}

export function buildCurlyBracePair(mats) {
  const group = new THREE.Group();

  const braceGeo = extrudePoints([
    [0.12, 0.32],
    [0.02, 0.32],
    [-0.04, 0.24],
    [-0.04, 0.06],
    [-0.12, 0.0],
    [-0.04, -0.06],
    [-0.04, -0.24],
    [0.02, -0.32],
    [0.12, -0.32],
    [0.12, -0.25],
    [0.04, -0.24],
    [0.04, -0.04],
    [-0.02, 0.0],
    [0.04, 0.04],
    [0.04, 0.24],
    [0.12, 0.25],
  ]);

  const leftBrace = new THREE.Mesh(braceGeo, mats.brushedSilver);
  leftBrace.position.set(-0.22, 0, 0);

  const rightBrace = new THREE.Mesh(braceGeo, mats.brushedSilver);
  rightBrace.rotation.y = Math.PI;
  rightBrace.position.set(0.22, 0, 0);

  group.add(leftBrace, rightBrace);
  return group;
}

export function buildFloatingCodeCard(mats, texture) {
  const card = new THREE.Group();

  const frame = new THREE.Mesh(
    new RoundedBoxGeometry(1.12, 0.72, 0.036, 3, 0.012),
    mats.brushedSilver
  );
  card.add(frame);

  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(1.04, 0.64),
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.32,
      metalness: 0.05,
    })
  );
  face.position.z = 0.02;
  card.add(face);

  return card;
}
