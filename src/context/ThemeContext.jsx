"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  {
    id: "classic",
    name: "Classical",
    subtitle: "Navy & White",
    icon: "fa-solid fa-gem",
    color: "#0F2F50",
    accent: "#1A4A7A",
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
    // Lock to single classical theme on mount
    document.documentElement.setAttribute("data-theme", "classic");
    try {
      localStorage.setItem("portfolio-theme", "classic");
    } catch (e) {
      // Ignore localStorage errors (e.g. private mode)
    }
    setMounted(true);
  }, []);

  const setTheme = () => {
    // Single theme locked — no-op
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
