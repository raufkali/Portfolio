"use client";

import { useEffect, useState } from "react";
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

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  /* ============================================================
     CLOSE MOBILE MENU
     ============================================================ */

  const handleNavigation = () => {
    setMenuOpen(false);
  };

  /* ============================================================
     TOGGLE MOBILE MENU
     ============================================================ */

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`site-header ${
        scrolled ? "site-header-scrolled" : ""
      } ${menuOpen ? "menu-is-open" : ""}`}
    >
      {/* ========================================================
          HEADER / NAVBAR
          THIS MUST ALWAYS STAY ABOVE THE MOBILE OVERLAY
          ======================================================== */}

      <div className="header-inner">
        {/* ======================================================
            BRAND
            ====================================================== */}

        <a href="#about" className="header-brand" onClick={handleNavigation}>
          <span className="brand-mark">RAUF AHMAD</span>

          <span className="brand-cursor" aria-hidden="true"></span>
        </a>

        {/* ======================================================
            DESKTOP NAVIGATION
            ====================================================== */}

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

        {/* ======================================================
            DESKTOP CONTACT
            ====================================================== */}

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

        {/* ======================================================
            MOBILE TOGGLE
            HAMBURGER → X

            This stays inside .header-inner so it is ALWAYS
            visible above the mobile navigation overlay.
            ====================================================== */}

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

      {/* ========================================================
          MOBILE NAVIGATION OVERLAY

          IMPORTANT:
          This is BELOW .header-inner visually.
          ======================================================== */}

      <div
        id="mobile-navigation"
        className={`mobile-navigation ${
          menuOpen ? "mobile-navigation-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-navigation-inner">
          {/* ====================================================
              LABEL
              ==================================================== */}

          <div className="mobile-menu-label">
            <span className="mobile-menu-line"></span>

            <span>Navigation</span>
          </div>

          {/* ====================================================
              MOBILE NAVIGATION
              ==================================================== */}

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

          {/* ====================================================
              FOOTER
              ==================================================== */}

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
