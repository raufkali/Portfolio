"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef(null);

  const { theme, setTheme, themes } = useTheme();

  /* ============================================================
     SCROLL + ACTIVE SECTION
     ============================================================ */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems
        .filter((item) => item.href !== "#contact")
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      let currentSection = "about";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 160) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ============================================================
     CLOSE DROPDOWN ON OUTSIDE CLICK
     ============================================================ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target)
      ) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
     ============================================================ */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavigation = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <header
      className={`site-header ${
        scrolled ? "site-header-scrolled" : ""
      } ${menuOpen ? "menu-is-open" : ""}`}
    >
      <div className="header-inner">
        {/* BRAND */}
        <a href="#about" className="header-brand" onClick={handleNavigation}>
          <span className="brand-mark">RAUF AHMAD</span>
          <span className="brand-cursor" aria-hidden="true"></span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navItems.map((item, index) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                onClick={handleNavigation}
              >
                <span className="nav-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* ACTIONS: THEME SWITCHER + DOWNLOAD CV + CONTACT */}
        <div className="header-actions">
          {/* THEME SWITCHER DROPDOWN */}
          <div className="theme-switcher-container" ref={themeDropdownRef}>
            <button
              type="button"
              className="theme-switcher-btn"
              onClick={() => setThemeDropdownOpen((prev) => !prev)}
              aria-label={`Current theme: ${currentThemeObj.name}. Click to change theme.`}
              aria-expanded={themeDropdownOpen}
            >
              <i className={currentThemeObj.icon}></i>
              <span className="theme-btn-label">{currentThemeObj.name}</span>
              <i
                className={`fas fa-chevron-down theme-arrow ${
                  themeDropdownOpen ? "open" : ""
                }`}
              ></i>
            </button>

            {themeDropdownOpen && (
              <div className="theme-dropdown-menu">
                <div className="theme-dropdown-header">
                  <span>Select Theme</span>
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-option ${theme === t.id ? "active" : ""}`}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeDropdownOpen(false);
                    }}
                  >
                    <div className="theme-option-left">
                      <span
                        className="theme-color-dot"
                        style={{ background: t.color }}
                      ></span>
                      <i className={t.icon}></i>
                      <div className="theme-option-text">
                        <span className="theme-option-name">{t.name}</span>
                        <span className="theme-option-sub">{t.subtitle}</span>
                      </div>
                    </div>
                    {theme === t.id && (
                      <i className="fas fa-check theme-check"></i>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DOWNLOAD CV BUTTON */}
          <a
            href="/cv.pdf"
            download="cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="header-cv-btn"
            aria-label="Download CV"
            title="Download Rauf Ahmad's CV (cv.pdf)"
          >
            <i className="fas fa-file-pdf"></i>
            <span className="cv-btn-text">CV</span>
            <i className="fas fa-download cv-download-icon"></i>
          </a>

          {/* DESKTOP CONTACT */}
          <a
            href="#contact"
            className="header-contact"
            onClick={handleNavigation}
          >
            <span>Let's talk</span>
            <span className="contact-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "menu-toggle-active" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE NAVIGATION OVERLAY */}
      <div
        id="mobile-navigation"
        className={`mobile-navigation ${
          menuOpen ? "mobile-navigation-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-navigation-inner">
          {/* THEME SWITCHER FOR MOBILE */}
          <div className="mobile-theme-section">
            <div className="mobile-menu-label">
              <span className="mobile-menu-line"></span>
              <span>Theme Switcher</span>
              <span className="mobile-menu-line"></span>
            </div>
            <div className="mobile-theme-grid">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`mobile-theme-pill ${
                    theme === t.id ? "active" : ""
                  }`}
                  onClick={() => setTheme(t.id)}
                >
                  <i className={t.icon}></i>
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="mobile-menu-label">
            <span className="mobile-menu-line"></span>
            <span>Navigation</span>
            <span className="mobile-menu-line"></span>
          </div>

          <nav className="mobile-nav-list">
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`mobile-nav-link ${
                    isActive ? "mobile-nav-link-active" : ""
                  }`}
                >
                  <span className="mobile-nav-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mobile-nav-text">{item.label}</span>
                  <span className="mobile-nav-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              );
            })}
          </nav>

          {/* MOBILE ACTIONS: CV & CONTACT */}
          <div className="mobile-action-buttons">
            <a
              href="/cv.pdf"
              download="cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cv-btn"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fas fa-file-pdf me-2"></i>
              Download CV
            </a>
            <a
              href="#contact"
              className="mobile-contact-btn"
              onClick={handleNavigation}
            >
              <i className="fas fa-paper-plane me-2"></i>
              Let's talk
            </a>
          </div>

          {/* FOOTER */}
          <div className="mobile-menu-footer">
            <span>Full Stack Developer</span>
            <span className="mobile-availability">
              <span className="availability-dot" aria-hidden="true"></span>
              Available for work
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
