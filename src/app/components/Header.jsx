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

  /* ------------------------------------------------------------
     SCROLL + ACTIVE SECTION
  ------------------------------------------------------------ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = navItems
        .filter((item) => item.href !== "#contact")
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      let currentSection = "about";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 180) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ------------------------------------------------------------
     CLOSE THEME DROPDOWN ON OUTSIDE CLICK
  ------------------------------------------------------------ */

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ------------------------------------------------------------
     MOBILE SIDEBAR BODY LOCK
  ------------------------------------------------------------ */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ------------------------------------------------------------
     ESCAPE KEY
  ------------------------------------------------------------ */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ------------------------------------------------------------
     HELPERS
  ------------------------------------------------------------ */

  const closeMenu = () => {
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
        {/* =====================================================
            BRAND
        ===================================================== */}

        <a href="#about" className="header-brand" onClick={closeMenu}>
          <span className="brand-mark">RAUF AHMAD</span>

          <span className="brand-cursor" aria-hidden="true" />
        </a>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="desktop-navigation" aria-label="Main navigation">
          {navItems.map((item, index) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                onClick={closeMenu}
              >
                <span className="nav-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ===================================================== */}

        <div className="header-actions">
          {/* THEME */}

          <div className="theme-switcher-container" ref={themeDropdownRef}>
            <button
              type="button"
              className="theme-switcher-btn"
              onClick={() => setThemeDropdownOpen((prev) => !prev)}
              aria-label={`Current theme: ${currentThemeObj.name}`}
              aria-expanded={themeDropdownOpen}
            >
              <i className={currentThemeObj.icon} />

              <span className="theme-btn-label">{currentThemeObj.name}</span>

              <i
                className={`fas fa-chevron-down theme-arrow ${
                  themeDropdownOpen ? "open" : ""
                }`}
              />
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
                        style={{
                          background: t.color,
                        }}
                      />

                      <i className={t.icon} />

                      <div className="theme-option-text">
                        <span className="theme-option-name">{t.name}</span>

                        <span className="theme-option-sub">{t.subtitle}</span>
                      </div>
                    </div>

                    {theme === t.id && (
                      <i className="fas fa-check theme-check" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CV */}

          <a
            href="/cv.pdf"
            download="cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="header-cv-btn"
            aria-label="Download CV"
            title="Download Rauf Ahmad's CV"
          >
            <i className="fas fa-file-pdf" />

            <span className="cv-btn-text">CV</span>

            <i className="fas fa-download cv-download-icon" />
          </a>

          {/* CONTACT */}

          <a href="#contact" className="header-contact" onClick={closeMenu}>
            <span>Let's talk</span>

            <span className="contact-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "menu-toggle-active" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </div>

      {/* =======================================================
          MOBILE BACKDROP
      ======================================================= */}

      <div
        className={`mobile-backdrop ${
          menuOpen ? "mobile-backdrop-visible" : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* =======================================================
          MOBILE SIDEBAR
      ======================================================= */}

      <aside
        id="mobile-navigation"
        className={`mobile-navigation ${
          menuOpen ? "mobile-navigation-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-navigation-inner">
          {/* SIDEBAR HEADER */}

          <div className="mobile-sidebar-header">
            <div>
              <span className="mobile-sidebar-kicker">MENU</span>

              <span className="mobile-sidebar-title">Navigation</span>
            </div>

            <button
              type="button"
              className="mobile-close"
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              <span />
              <span />
            </button>
          </div>

          {/* NAVIGATION */}

          <nav className="mobile-nav-list">
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
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

          {/* THEME */}

          <div className="mobile-theme-section">
            <div className="mobile-menu-label">
              <span className="mobile-menu-line" />
              <span>Theme</span>
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
                  <i className={t.icon} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}

          <div className="mobile-action-buttons">
            <a
              href="/cv.pdf"
              download="cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cv-btn"
              onClick={closeMenu}
            >
              <i className="fas fa-file-pdf" />
              <span>Download CV</span>
            </a>

            <a
              href="#contact"
              className="mobile-contact-btn"
              onClick={closeMenu}
            >
              <span>Let's talk</span>
              <span>↗</span>
            </a>
          </div>

          {/* FOOTER */}

          <div className="mobile-menu-footer">
            <span>Full Stack Developer</span>

            <span className="mobile-availability">
              <span className="availability-dot" aria-hidden="true" />
              Available for work
            </span>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;
