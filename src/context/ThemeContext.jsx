"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  {
    id: "classic",
    name: "Classical",
    subtitle: "White Light & Dark Blue",
    icon: "fa-solid fa-gem",
    color: "#0A192F",
    accent: "#2563EB",
  },
];

const ThemeContext = createContext({
  theme: "classic",
  setTheme: () => {},
  themes: THEMES,
  mounted: true,
});

export const ThemeProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set single classic theme
    document.documentElement.setAttribute("data-theme", "classic");
    try {
      localStorage.setItem("portfolio-theme", "classic");
    } catch (e) {
      // Ignore localStorage errors
    }
    setMounted(true);
  }, []);

  const setTheme = () => {
    // Single theme locked to classic
    document.documentElement.setAttribute("data-theme", "classic");
  };

  return (
    <ThemeContext.Provider
      value={{ theme: "classic", setTheme, themes: THEMES, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
