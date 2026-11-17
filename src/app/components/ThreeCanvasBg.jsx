"use client";

import { useEffect, useRef } from "react";
import { createBackgroundEffectEngine } from "../../three/backgroundEffectEngine";

const ThreeCanvasBg = ({ variant = "hero", className = "" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    let engine = null;
    try {
      engine = createBackgroundEffectEngine({
        container,
        variant,
        reducedMotion: Boolean(prefersReducedMotion),
      });
    } catch {
      // Gracefully degrade to normal CSS background if WebGL fails
    }

    return () => {
      engine?.dispose();
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
};

export default ThreeCanvasBg;
