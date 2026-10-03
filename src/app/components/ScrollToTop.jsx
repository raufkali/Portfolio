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

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Scroll back to top of page"
          title="Scroll to top"
        >
          <i className="fas fa-arrow-up" aria-hidden="true"></i>
        </button>
      )}

      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="footer-top-row">
            <div className="footer-brand-wrap">
              <span className="footer-brand-name">{portfolioData.personal.name}</span>
              <p className="footer-brand-tagline">
                Software Engineer & Full-Stack Developer building scalable web and desktop applications.
              </p>
            </div>

            <div className="footer-nav-links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Work</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-social-wrap">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
              </a>
              <a
                href={`https://wa.me/${portfolioData.personal.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
              >
                <i className="fab fa-whatsapp" aria-hidden="true"></i>
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                aria-label="Send Email"
              >
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="footer-copyright mb-0">
              © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
            </p>
            <p className="footer-subtext mb-0">
              Designed & Built with <i className="fas fa-heart text-danger mx-1" aria-hidden="true"></i> using Next.js & React
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ScrollToTop;
