"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Projects.css";

const Projects = () => {
  const { projects } = portfolioData;

  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const technologies = [
    "All",
    ...new Set(projects.flatMap((project) => project.technologies)),
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.technologies.includes(filter));

  const total = filteredProjects.length;

  useEffect(() => {
    setActiveIndex(0);
    setDirection("next");
  }, [filter]);

  const goTo = useCallback(
    (index, dir = "next") => {
      if (!total) return;

      setDirection(dir);

      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const handleNext = useCallback(() => {
    goTo(activeIndex + 1, "next");
  }, [activeIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(activeIndex - 1, "prev");
  }, [activeIndex, goTo]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      }

      if (event.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleNext, handlePrev]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;

    const deltaY = event.changedTouches[0].clientY - touchStartY.current;

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

  const getOffset = (index) => {
    if (!total) return 0;

    let offset = index - activeIndex;

    if (offset > total / 2) {
      offset -= total;
    }

    if (offset < -total / 2) {
      offset += total;
    }

    return offset;
  };

  if (!total) return null;

  const currentNumber = String(activeIndex + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="projects-header" data-aos="fade-down">
          <div className="projects-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />

            <span className="eyebrow-text">Selected Works</span>
          </div>

          <h2 className="projects-title">Featured Projects</h2>

          <p className="projects-subtitle">
            A comprehensive showcase of production web applications, desktop
            platforms, and automation systems.
          </p>
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div
          className="projects-filters"
          data-aos="fade-up"
          role="tablist"
          aria-label="Project technology filters"
        >
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              role="tab"
              aria-selected={filter === tech}
              className={`projects-filter ${
                filter === tech ? "projects-filter-active" : ""
              }`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* =====================================================
            COVER FLOW
        ===================================================== */}

        <div
          className="projects-cinematic"
          data-aos="fade-up"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="projects-cinematic-top">
            <div className="projects-cinematic-label">PROJECT ARCHIVE</div>

            <div className="projects-cinematic-counter">
              <span>{currentNumber}</span>
              <i />
              <span>{totalNumber}</span>
            </div>
          </div>

          <div className="projects-coverflow">
            {/* Ambient floor */}
            <div className="projects-coverflow-floor" aria-hidden="true" />

            {filteredProjects.map((project, index) => {
              const offset = getOffset(index);

              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              const isActive = offset === 0;

              return (
                <article
                  key={project.id}
                  className={`project-cover-card ${
                    isActive ? "project-cover-card-active" : ""
                  } ${offset < 0 ? "project-cover-card-left" : ""} ${
                    offset > 0 ? "project-cover-card-right" : ""
                  }`}
                  data-offset={offset}
                  aria-hidden={!isActive}
                  onClick={() => {
                    if (offset < 0) {
                      handlePrev();
                    }

                    if (offset > 0) {
                      handleNext();
                    }
                  }}
                >
                  {/* =================================================
                      PROJECT INFORMATION
                  ================================================= */}

                  <div className="project-cover-content">
                    <div className="project-cover-heading">
                      <div>
                        <span className="project-cover-kicker">CASE STUDY</span>

                        <h3 className="project-cover-title">{project.title}</h3>
                      </div>

                      <span className="project-cover-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="project-cover-description">
                      {project.description}
                    </p>

                    <div className="project-cover-meta">
                      <div>
                        <span>ROLE</span>
                        <strong>{project.role}</strong>
                      </div>

                      <div>
                        <span>PERIOD</span>
                        <strong>
                          {project.startDate} – {project.endDate}
                        </strong>
                      </div>
                    </div>

                    <div className="project-cover-tags">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span key={i} className="project-cover-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.highlights && project.highlights.length > 0 && (
                      <div className="project-cover-highlights">
                        {project.highlights.slice(0, 2).map((highlight, i) => (
                          <div className="project-cover-highlight" key={i}>
                            <span>+</span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="project-cover-actions">
                      {project.githubLink && (
                        <>
                          {project.githubLink === "private" ? (
                            <span className="project-private-badge">
                              <i className="fas fa-lock" aria-hidden="true" />
                              Private Repo
                            </span>
                          ) : (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-action-btn"
                              onClick={(event) => event.stopPropagation()}
                              aria-label={`View ${project.title} source code on GitHub`}
                            >
                              <i className="fab fa-github" aria-hidden="true" />
                              Code
                            </a>
                          )}
                        </>
                      )}

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-btn project-action-btn-primary"
                          onClick={(event) => event.stopPropagation()}
                          aria-label={`Visit live demo for ${project.title}`}
                        >
                          <i
                            className="fas fa-arrow-up-right-from-square"
                            aria-hidden="true"
                          />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom rail */}
                  <div className="project-cover-bottom">
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <div className="project-cover-bottom-line" />

                    <span>{totalNumber}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =====================================================
              NAVIGATION
          ===================================================== */}

          <button
            type="button"
            className="project-cover-arrow project-cover-arrow-prev"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <i className="fas fa-arrow-left" aria-hidden="true" />

            <span>PREV</span>
          </button>

          <button
            type="button"
            className="project-cover-arrow project-cover-arrow-next"
            onClick={handleNext}
            aria-label="Next project"
          >
            <span>NEXT</span>

            <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="projects-cover-footer">
          <div className="projects-cover-progress">
            <span
              style={{
                width: `${
                  total <= 1 ? 100 : ((activeIndex + 1) / total) * 100
                }%`,
              }}
            />
          </div>

          <div className="projects-cover-footer-row">
            <div className="projects-cover-counter">
              <span className="projects-cover-current">{currentNumber}</span>

              <span>/</span>

              <span className="projects-cover-total">{totalNumber}</span>
            </div>

            <div
              className="projects-cover-dots"
              role="tablist"
              aria-label="Project navigation"
            >
              {filteredProjects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to project ${index + 1}: ${project.title}`}
                  className={`projects-cover-dot ${
                    index === activeIndex ? "projects-cover-dot-active" : ""
                  }`}
                  onClick={() =>
                    goTo(index, index > activeIndex ? "next" : "prev")
                  }
                />
              ))}
            </div>

            <div className="projects-cover-swipe">
              <span>DRAG / SWIPE</span>

              <span className="projects-cover-swipe-arrows">← →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
