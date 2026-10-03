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
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  /* ------------------------------------------------------------
     AOS
  ------------------------------------------------------------ */
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  /* ------------------------------------------------------------
     FILTER DATA
  ------------------------------------------------------------ */
  const allTechs = projects.flatMap((p) => p.technologies);
  const technologies = ["All", ...new Set(allTechs)];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  /* ------------------------------------------------------------
     FILTER CHANGE — reset carousel
  ------------------------------------------------------------ */
  useEffect(() => {
    setActiveIndex(0);
    const track = trackRef.current;
    if (track) {
      track.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [filter]);

  /* ------------------------------------------------------------
     SCROLL → sync active dot + edge state
  ------------------------------------------------------------ */
  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    const firstCard = cardRefs.current[0];
    if (!track || !firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24;
    const idx = Math.round(track.scrollLeft / (cardWidth + gap));
    const maxScroll = track.scrollWidth - track.clientWidth;

    setActiveIndex(Math.max(0, Math.min(idx, filteredProjects.length - 1)));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= maxScroll - 4);
  }, [filteredProjects.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    // initial sync
    syncScrollState();

    return () => {
      track.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState]);

  /* ------------------------------------------------------------
     PROGRAMMATIC SCROLL
  ------------------------------------------------------------ */
  const scrollToCard = (idx) => {
    const track = trackRef.current;
    const card = cardRefs.current[idx];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (activeIndex > 0) scrollToCard(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < filteredProjects.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  /* ------------------------------------------------------------
     KEYBOARD NAVIGATION
  ------------------------------------------------------------ */
  useEffect(() => {
    const handleKey = (e) => {
      // Only handle when the carousel section is in view (optional)
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    // We intentionally don't attach this globally — arrows on the carousel
    // are the primary control. Keyboard users can still Tab to buttons.
    // Remove the following two lines if you want global arrow keys.
    // window.addEventListener("keydown", handleKey);
    // return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, filteredProjects.length]);

  /* ------------------------------------------------------------
     STATUS CLASS HELPER
  ------------------------------------------------------------ */
  const getStatusClass = (status) => {
    const map = {
      Completed: "status-completed",
      "In Development": "status-dev",
      "In Progress": "status-progress",
    };
    return map[status] || "status-completed";
  };

  /* ------------------------------------------------------------
     PROGRESS BAR
  ------------------------------------------------------------ */
  const total = filteredProjects.length;
  const progressPct = total <= 1 ? 100 : ((activeIndex + 1) / total) * 100;

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* =====================================================
            SECTION HEADER
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
            FILTER PILLS
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
            CAROUSEL
            ===================================================== */}
        <div className="projects-carousel" data-aos="fade-up">
          {/* Prev button */}
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={handlePrev}
            disabled={atStart}
            aria-label="Previous project"
            title="Previous"
          >
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>

          {/* Next button */}
          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={handleNext}
            disabled={atEnd}
            aria-label="Next project"
            title="Next"
          >
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>

          {/* Track */}
          <div className="projects-track" ref={trackRef}>
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className="project-card"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                {/* Card body */}
                <div className="project-card-body">
                  {/* Header row */}
                  <div className="project-card-head">
                    <h3 className="project-card-title">{project.title}</h3>
                    <span
                      className={`project-status ${getStatusClass(
                        project.status,
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="project-card-desc">{project.description}</p>

                  {/* Meta */}
                  <div className="project-card-meta">
                    <span>
                      <i className="far fa-calendar-alt" aria-hidden="true" />
                      {project.startDate} – {project.endDate}
                    </span>
                    <span>
                      <i className="fas fa-user-tag" aria-hidden="true" />
                      {project.role}
                    </span>
                  </div>

                  {/* Tech badges */}
                  <div className="project-card-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="project-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="project-card-highlights">
                      {project.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="highlight-bullet" aria-hidden="true">
                            ›
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card actions */}
                <div className="project-card-actions">
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
                      aria-label={`Visit live demo for ${project.title}`}
                    >
                      <i
                        className="fas fa-external-link-alt"
                        aria-hidden="true"
                      />
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Progress bar */}
          <div className="carousel-progress" aria-hidden="true">
            <div
              className="carousel-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* =====================================================
            FOOTER — counter + dots
            ===================================================== */}
        <div className="carousel-footer">
          <div className="carousel-counter">
            <span className="counter-current">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="counter-sep">/</span>
            <span className="counter-total">
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="carousel-dots" role="tablist">
            {filteredProjects.map((project, i) => (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to project ${i + 1}`}
                className={`carousel-dot ${
                  i === activeIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => scrollToCard(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
