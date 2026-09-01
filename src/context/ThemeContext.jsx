"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  {
    id: "minimalism",
    name: "Minimalism",
    subtitle: "Clean & Monochromatic",
    icon: "fa-solid fa-sparkles",
    color: "#FFFFFF",
    accent: "#94A3B8",
  },
  {
    id: "neoextremism",
    name: "Neo-Extremism",
    subtitle: "Bold & High-Contrast",
    icon: "fa-solid fa-bolt",
    color: "#FFE600",
    accent: "#FF2E93",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    subtitle: "Neon & Futuristic",
    icon: "fa-solid fa-terminal",
    color: "#00FF41",
    accent: "#00FFFF",
  },
];

const ThemeContext = createContext({
  theme: "neoextremism",
  setTheme: () => {},
  themes: THEMES,
  mounted: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("neoextremism");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check saved theme in localStorage
    try {
      const savedTheme = localStorage.getItem("portfolio-theme");
      const initialTheme =
        savedTheme && THEMES.some((t) => t.id === savedTheme)
          ? savedTheme
          : "neoextremism";

      setThemeState(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    } catch (e) {
      console.error("Failed to read theme from localStorage", e);
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme) => {
    if (!THEMES.some((t) => t.id === newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem("portfolio-theme", newTheme);
    } catch (e) {
      console.error("Failed to write theme to localStorage", e);
    }
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
