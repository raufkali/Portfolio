import * as THREE from "three";

/**
 * Procedural 2D Canvas textures for the 3D Coding Robot & floating coding cards.
 * Zero external files / 404s. All color textures use SRGBColorSpace.
 */

export function createHoloCodeTexture(maxAnisotropy = 4) {
  const w = 512;
  const h = 320;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#08172B";
  ctx.fillRect(0, 0, w, h);

  // Header bar
  ctx.fillStyle = "#0E2644";
  ctx.fillRect(0, 0, w, 34);
  const dotCols = ["#E06C75", "#E5C07B", "#62C58A"];
  dotCols.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(20 + i * 16, 17, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });

  ctx.fillStyle = "#8EB2D9";
  ctx.font = "600 12px monospace";
  ctx.fillText("bot-core.ts — Full-Stack Mode", 78, 21);

  const lines = [
    { text: "const engineer = 'Rauf Ahmad';", color: "#7CC4FF" },
    { text: "const stack = ['Next.js', 'MERN', 'AI'];", color: "#E5C07B" },
    { text: "", color: "#FFFFFF" },
    { text: "async function buildProduct(idea) {", color: "#80E8C8" },
    { text: "  const api = await NodeCluster.boot();", color: "#DCE8F5" },
    { text: "  const ui = renderInterface(stack);", color: "#DCE8F5" },
    { text: "  return deploy({ api, ui, ready: true });", color: "#7CC4FF" },
    { text: "}", color: "#80E8C8" },
  ];

  lines.forEach((l, i) => {
    const y = 66 + i * 28;
    ctx.fillStyle = "#3E5875";
    ctx.font = "500 12px monospace";
    ctx.fillText(String(i + 1).padStart(2, "0"), 18, y);
    ctx.fillStyle = l.color;
    ctx.font = "600 14px monospace";
    ctx.fillText(l.text, 48, y);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

export function createSnippetCardTexture(
  title,
  lines,
  accentHex = "#58A6FF",
  darkMode = false,
  maxAnisotropy = 4
) {
  const w = 512;
  const h = 320;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = darkMode ? "#0B2038" : "#F7F9FC";
  ctx.fillRect(0, 0, w, h);

  // Top accent bar
  ctx.fillStyle = accentHex;
  ctx.fillRect(0, 0, w, 8);

  // Border
  ctx.strokeStyle = darkMode ? "rgba(255,255,255,0.16)" : "#D2DCE6";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, w - 4, h - 4);

  // Title
  ctx.fillStyle = darkMode ? "#E6EEF8" : "#0F2F50";
  ctx.font = "700 20px monospace";
  ctx.fillText(title, 28, 54);

  ctx.fillStyle = darkMode ? "rgba(255,255,255,0.12)" : "#E1E7ED";
  ctx.fillRect(28, 72, w - 56, 2);

  lines.forEach((line, idx) => {
    const y = 114 + idx * 36;
    ctx.fillStyle = darkMode ? "#9BB6D3" : "#3D5064";
    ctx.font = "500 18px monospace";
    ctx.fillText(line, 28, y);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

export function createChestDisplayTexture(maxAnisotropy = 4) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#081628";
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = "#3E93E6";
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, size - 24, size - 24);

  ctx.fillStyle = "#67BFFF";
  ctx.font = "700 76px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("</>", size / 2, size / 2 - 12);

  ctx.fillStyle = "#7CE0C3";
  ctx.font = "600 24px monospace";
  ctx.fillText("DEV.BOT", size / 2, size / 2 + 56);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}
