"use client";

import { useEffect, useRef, useState } from "react";
import "./Header.css";

/* ============================================================
   NAV CONFIG
   primaryItems   → always visible on desktop
   secondaryItems → grouped under a "More" dropdown
   ============================================================ */
const primaryItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const secondaryItems = [
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Interests", href: "#hobbies" },
];

/* Full list — used for the mobile sidebar and scroll tracking */
const navItems = [...primaryItems, ...secondaryItems];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const moreRef = useRef(null);

  /* ------------------------------------------------------------
     SCROLL + ACTIVE SECTION TRACKER
  ------------------------------------------------------------ */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = navItems
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      let currentSection = "about";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) currentSection = section.id;
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------------------------------------------------
     BODY SCROLL LOCK (mobile sidebar)
  ------------------------------------------------------------ */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ------------------------------------------------------------
     ESC CLOSES DROPDOWN + SIDEBAR
  ------------------------------------------------------------ */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ------------------------------------------------------------
     CLICK OUTSIDE CLOSES THE "MORE" DROPDOWN
  ------------------------------------------------------------ */
  useEffect(() => {
    if (!moreOpen) return;

    const onClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeAll = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  /* Is any secondary item the active section? */
  const secondaryActive = secondaryItems.some(
    (item) => activeSection === item.href.replace("#", ""),
  );

  return (
    <>
      {/* ============================================================
          HEADER — backdrop-filter lives here
          ============================================================ */}
      <header
        className={`site-header ${
          scrolled ? "site-header-scrolled" : ""
        } ${menuOpen ? "menu-is-open" : ""}`}
      >
        <div className="header-inner">
          {/* BRAND */}
          <a
            href="#about"
            className="header-brand"
            onClick={closeAll}
            aria-label="Rauf Ahmad Portfolio Home"
          >
            <span className="brand-mark">Rauf Ahmad</span>
            <span className="brand-rule" aria-hidden="true" />
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="desktop-navigation" aria-label="Main navigation">
            {primaryItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  onClick={closeAll}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            {/* MORE DROPDOWN */}
            <div
              className={`nav-more ${moreOpen ? "nav-more-open" : ""}`}
              ref={moreRef}
            >
              <button
                type="button"
                className={`nav-link nav-more-trigger ${
                  secondaryActive ? "nav-link-active" : ""
                }`}
                onClick={() => setMoreOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={moreOpen}
              >
                <span>More</span>
                <i
                  className="fas fa-chevron-down nav-more-chevron"
                  aria-hidden="true"
                />
              </button>

              {moreOpen && (
                <div className="nav-more-menu" role="menu">
                  {secondaryItems.map((item) => {
                    const id = item.href.replace("#", "");
                    const isActive = activeSection === id;

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className={`nav-more-item ${
                          isActive ? "nav-more-item-active" : ""
                        }`}
                        onClick={closeAll}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="header-actions">
            <a
              href="/cv.pdf"
              download="cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="header-cv-btn"
              aria-label="Download Rauf Ahmad's CV"
              title="Download CV"
            >
              <i className="fas fa-file-pdf" aria-hidden="true" />
              <span className="cv-btn-text">Download CV</span>
            </a>

            <a href="#contact" className="header-contact" onClick={closeAll}>
              <span>Let&apos;s talk</span>
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
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ============================================================
          MOBILE BACKDROP — sibling of header
          ============================================================ */}
      <div
        className={`mobile-backdrop ${
          menuOpen ? "mobile-backdrop-visible" : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ============================================================
          MOBILE SIDEBAR — sibling of header
          ============================================================ */}
      <aside
        id="mobile-navigation"
        className={`mobile-navigation ${
          menuOpen ? "mobile-navigation-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-navigation-inner">
          <div className="mobile-sidebar-header">
            <div>
              <span className="mobile-sidebar-kicker">Menu</span>
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

          <nav className="mobile-nav-list" aria-label="Mobile Navigation">
            {navItems.map((item, index) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

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

          <div className="mobile-action-buttons">
            <a
              href="/cv.pdf"
              download="cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cv-btn"
              onClick={closeMenu}
            >
              <i className="fas fa-file-pdf" aria-hidden="true" />
              <span>Download CV</span>
            </a>

            <a
              href="#contact"
              className="mobile-contact-btn"
              onClick={closeMenu}
            >
              <span>Let&apos;s talk</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mobile-menu-footer">
            <span>Software Engineer &amp; Full-Stack Developer</span>
            <span className="mobile-availability">
              <span className="availability-dot" aria-hidden="true" />
              Available for work
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
