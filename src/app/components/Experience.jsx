"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Experience.css";

const Experience = () => {
  const { experience } = portfolioData;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const touchStartX = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const total = experience.length;

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

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  /* Touch / swipe support */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  if (total === 0) return null;

  const currentExp = experience[current];
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
            STACKED SLIDER
            ===================================================== */}
        <div
          className="experience-slider"
          data-aos="fade-up"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Stacked decorative cards behind — read as a deck */}
          <div className="experience-stack" aria-hidden="true">
            <div className="stack-card stack-card-5" />
            <div className="stack-card stack-card-4" />
            <div className="stack-card stack-card-3" />
            <div className="stack-card stack-card-2" />
            <div className="stack-card stack-card-1" />
          </div>

          {/* Active card */}
          <article
            key={currentExp.id}
            className={`experience-card experience-card-${direction}`}
          >
            {/* Circular navigation buttons */}
            <button
              type="button"
              className="experience-nav experience-nav-prev"
              onClick={handlePrev}
              aria-label="Previous experience"
              title="Previous"
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="experience-nav experience-nav-next"
              onClick={handleNext}
              aria-label="Next experience"
              title="Next"
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>

            {/* Card body */}
            <div className="experience-card-inner">
              {/* Card header */}
              <div className="experience-card-header">
                <div className="experience-card-header-left">
                  <h3 className="experience-position">{currentExp.position}</h3>
                  <h4 className="experience-company">
                    <span className="company-at" aria-hidden="true">
                      @
                    </span>
                    {currentExp.company}
                  </h4>
                </div>

                <div className="experience-card-header-right">
                  <span className="experience-type">{currentExp.type}</span>
                  <span className="experience-duration">
                    <i className="far fa-calendar-alt" aria-hidden="true" />
                    {currentExp.duration}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="experience-description">{currentExp.description}</p>

              {/* Responsibilities */}
              <div className="experience-responsibilities-wrap">
                <span className="responsibilities-title">
                  Key Responsibilities &amp; Deliverables
                </span>
                <ul className="experience-responsibilities">
                  {currentExp.responsibilities.map((item, i) => (
                    <li key={i}>
                      <span className="exp-bullet" aria-hidden="true">
                        ›
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card footer — counter + dots */}
            <div className="experience-card-footer">
              <div className="experience-counter">
                <span className="counter-current">{currentIndex}</span>
                <span className="counter-sep">/</span>
                <span className="counter-total">{totalIndex}</span>
              </div>

              <div className="experience-dots" role="tablist">
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
          </article>
        </div>
      </div>
    </section>
  );
};

export default Experience;
