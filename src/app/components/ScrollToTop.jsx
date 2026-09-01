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
          aria-label="Scroll to top of page"
          title="Scroll to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      <footer className="site-footer">
        <div className="container text-center">
          <p className="footer-copyright mb-1">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All
            rights reserved.
          </p>
          <p className="footer-subtext mb-0">
            Engineered with <i className="fas fa-heart text-danger mx-1"></i> using Next.js & React
          </p>
        </div>
      </footer>
    </>
  );
};

export default ScrollToTop;
