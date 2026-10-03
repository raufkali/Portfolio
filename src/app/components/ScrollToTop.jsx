"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "../../../lib/portfolioData";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { personal } = portfolioData;

  return (
    <>
      {visible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Scroll back to top of page"
          title="Scroll to top"
        >
          <i className="fas fa-arrow-up" aria-hidden="true" />
        </button>
      )}

      <footer className="site-footer" role="contentinfo">
        <div className="container">
          {/* =====================================================
              TOP ROW — brand + nav + social
              ===================================================== */}
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <span className="footer-brand-name">{personal.name}</span>
              <p className="footer-brand-tagline">
                Software Engineer &amp; Full-Stack Developer building scalable
                web and desktop applications.
              </p>
            </div>

            {/* Nav links */}
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="#about" className="footer-nav-link">
                About
              </a>
              <a href="#experience" className="footer-nav-link">
                Experience
              </a>
              <a href="#projects" className="footer-nav-link">
                Work
              </a>
              <a href="#skills" className="footer-nav-link">
                Skills
              </a>
              <a href="#contact" className="footer-nav-link">
                Contact
              </a>
            </nav>

            {/* Social icons */}
            <div className="footer-social">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <i className="fab fa-github" aria-hidden="true" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${personal.whatsapp.replace(
                  /[^0-9]/g,
                  "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="WhatsApp Chat"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="footer-social-btn"
                aria-label="Send Email"
                title="Email"
              >
                <i className="fas fa-envelope" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Hairline rule */}
          <div className="footer-rule" aria-hidden="true" />

          {/* =====================================================
              BOTTOM ROW — copyright + credits
              ===================================================== */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
            <p className="footer-credit">
              Designed &amp; built with Next.js &amp; React
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ScrollToTop;
