"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Experience.css";

const Experience = () => {
  const { experience } = portfolioData;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const total = experience.length;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const goTo = useCallback(
    (index, dir = "next") => {
      if (total === 0) return;

      setDirection(dir);
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const handleNext = useCallback(() => {
    goTo(current + 1, "next");
  }, [current, goTo]);

  const handlePrev = useCallback(() => {
    goTo(current - 1, "prev");
  }, [current, goTo]);

  /* ---------------------------------------------------------
     KEYBOARD NAVIGATION
  --------------------------------------------------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleNext, handlePrev]);

  /* ---------------------------------------------------------
     TOUCH / SWIPE
  --------------------------------------------------------- */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    /*
      Ignore vertical scrolling gestures.
    */
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (total === 0) return null;

  /*
    Returns the experience index that should appear
    on the left/right side of the active card.
  */
  const getIndex = (offset) => {
    return (((current + offset) % total) + total) % total;
  };

  const currentIndex = String(current + 1).padStart(2, "0");
  const totalIndex = String(total).padStart(2, "0");

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}
        <div className="experience-header" data-aos="fade-down">
          <div className="experience-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />

            <span className="eyebrow-text">Career Path</span>
          </div>

          <h2 className="experience-title">Work Experience</h2>

          <p className="experience-subtitle">
            Professional software development roles, engineering
            responsibilities, and production impact.
          </p>
        </div>

        {/* =====================================================
            IPHONE STYLE CAROUSEL
        ===================================================== */}
        <div
          className="experience-carousel"
          data-aos="fade-up"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Left preview */}
          {total > 1 && (
            <button
              type="button"
              className="experience-preview experience-preview-left"
              onClick={handlePrev}
              aria-label="Previous experience"
            >
              <div className="preview-index">
                {String(getIndex(-1) + 1).padStart(2, "0")}
              </div>

              <div className="preview-line" />

              <div className="preview-title">
                {experience[getIndex(-1)].position}
              </div>
            </button>
          )}

          {/* ===================================================
              MAIN ACTIVE CARD
          =================================================== */}
          <article
            key={current}
            className={`experience-card experience-card-${direction}`}
          >
            {/* Top navigation row */}
            <div className="experience-card-top">
              <div className="experience-card-number">
                <span>{currentIndex}</span>
                <span className="number-divider">/</span>
                <span>{totalIndex}</span>
              </div>

              <div className="experience-card-controls">
                <button
                  type="button"
                  className="experience-arrow"
                  onClick={handlePrev}
                  aria-label="Previous experience"
                  title="Previous"
                >
                  <i className="fas fa-arrow-left" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="experience-arrow"
                  onClick={handleNext}
                  aria-label="Next experience"
                  title="Next"
                >
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="experience-card-content">
              <div className="experience-card-header">
                <div className="experience-card-header-left">
                  <span className="experience-label">POSITION</span>

                  <h3 className="experience-position">
                    {experience[current].position}
                  </h3>

                  <h4 className="experience-company">
                    <span className="company-at" aria-hidden="true">
                      @
                    </span>

                    {experience[current].company}
                  </h4>
                </div>

                <div className="experience-card-header-right">
                  <span className="experience-type">
                    {experience[current].type}
                  </span>

                  <span className="experience-duration">
                    <i className="far fa-calendar-alt" aria-hidden="true" />

                    {experience[current].duration}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="experience-description">
                {experience[current].description}
              </p>

              {/* Responsibilities */}
              <div className="experience-responsibilities-wrap">
                <span className="responsibilities-title">
                  Key Responsibilities &amp; Deliverables
                </span>

                <ul className="experience-responsibilities">
                  {experience[current].responsibilities.map((item, i) => (
                    <li key={i}>
                      <span className="exp-bullet" aria-hidden="true">
                        →
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom progress */}
            <div className="experience-card-footer">
              <div className="experience-progress">
                <span
                  className="experience-progress-fill"
                  style={{
                    width: `${((current + 1) / total) * 100}%`,
                  }}
                />
              </div>

              <span className="experience-swipe-label">SWIPE TO EXPLORE</span>
            </div>
          </article>

          {/* Right preview */}
          {total > 1 && (
            <button
              type="button"
              className="experience-preview experience-preview-right"
              onClick={handleNext}
              aria-label="Next experience"
            >
              <div className="preview-index">
                {String(getIndex(1) + 1).padStart(2, "0")}
              </div>

              <div className="preview-line" />

              <div className="preview-title">
                {experience[getIndex(1)].position}
              </div>
            </button>
          )}
        </div>

        {/* =====================================================
            DOT NAVIGATION
        ===================================================== */}
        <div
          className="experience-navigation"
          role="tablist"
          aria-label="Experience navigation"
        >
          <div className="experience-dots">
            {experience.map((exp, i) => (
              <button
                key={exp.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to ${exp.position} at ${exp.company}`}
                className={`experience-dot ${
                  i === current ? "experience-dot-active" : ""
                }`}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
