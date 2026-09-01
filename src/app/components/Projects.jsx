"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Projects.css";

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const { projects } = portfolioData;
  const [filter, setFilter] = useState("All");

  // Get unique technologies (flatten and deduplicate)
  const allTechs = projects.flatMap((p) => p.technologies);
  const technologies = ["All", ...new Set(allTechs)];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  const getStatusClass = (status) => {
    const map = {
      Completed: "status-completed",
      "In Development": "status-dev",
      "In Progress": "status-progress",
    };
    return map[status] || "status-completed";
  };

  return (
    <section id="projects" className="projects-section">
      <div className="grid-overlay"></div>
      <div className="theme-orb theme-orb-1"></div>
      <div className="theme-orb theme-orb-2"></div>

      <div className="container">
        <div className="section-header-wrap" data-aos="fade-down">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A showcase of full-stack platforms, desktop applications, and web systems</p>
        </div>

        {/* Filter Buttons */}
        <div className="project-filters-wrap" data-aos="fade-up">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              className={`project-filter-pill ${filter === tech ? "active" : ""}`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="row g-4">
          {filteredProjects.map((project, index) => (
            <div
              className="col-lg-4 col-md-6"
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 60}
            >
              <div className="project-item-card">
                <div className="project-card-top">
                  <div className="project-title-row">
                    <h3 className="project-card-title">{project.title}</h3>
                    <span
                      className={`project-status-tag ${getStatusClass(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-card-meta">
                    <span>
                      <i className="far fa-calendar-alt me-1"></i>
                      {project.startDate} – {project.endDate}
                    </span>
                    <span>
                      <i className="fas fa-user-tag me-1"></i>
                      {project.role}
                    </span>
                  </div>

                  {/* Tech Tags */}
                  <div className="project-tags-list">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="project-tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="project-highlights-list">
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>
                          <span className="highlight-bullet">›</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Action Links */}
                <div className="project-card-actions">
                  {project.githubLink && (
                    <>
                      {project.githubLink === "private" ? (
                        <span className="project-private-badge">
                          <i className="fas fa-lock me-1"></i> Private Repo
                        </span>
                      ) : (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-link"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <i className="fab fa-github"></i> Code
                        </a>
                      )}
                    </>
                  )}

                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-demo-link"
                      aria-label={`Visit live demo for ${project.title}`}
                    >
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
