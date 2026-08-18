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
    window.addEventListener("scroll", toggleVisibility);
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
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
      <footer className="footer">
        <div className="container text-center">
          <p className="text-white-60 mb-0">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All
            rights reserved.
          </p>
          <p className="text-white-60 small mt-1">
            Made with <i className="fas fa-heart text-danger"></i> using Next.js
          </p>
        </div>
      </footer>
    </>
  );
};

export default ScrollToTop;
