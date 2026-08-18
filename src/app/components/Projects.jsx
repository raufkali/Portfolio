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

  // Map status to class
  const getStatusClass = (status) => {
    const map = {
      Completed: "completed",
      "In Development": "in-development",
      "In Progress": "in-progress",
    };
    return map[status] || "";
  };

  return (
    <section id="projects" className="projects-section">
      {/* Background decorations */}
      <div className="grid-overlay"></div>
      <div className="glow-orb-proj glow-orb-proj-1"></div>
      <div className="glow-orb-proj glow-orb-proj-2"></div>

      <div className="container">
        <h2 className="section-title-proj" data-aos="fade-down">
          Projects
        </h2>

        {/* Filter Buttons */}
        <div className="filter-buttons" data-aos="fade-up">
          {technologies.map((tech) => (
            <button
              key={tech}
              className={`filter-btn ${filter === tech ? "active" : ""}`}
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
              data-aos-delay={index * 80}
            >
              <div className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span
                    className={`status-badge ${getStatusClass(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>

                <div className="project-meta">
                  <span>
                    <i className="far fa-calendar-alt"></i>
                    {project.startDate} – {project.endDate}
                  </span>
                  <span>
                    <i className="fas fa-user"></i>
                    {project.role}
                  </span>
                </div>

                <div className="tech-tags">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="highlights-list">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.githubLink && (
                    <div>
                      {project.githubLink === "private" ? (
                        <span className="private-repo">
                          <i className="fas fa-lock"></i> Private
                        </span>
                      ) : (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github-link"
                        >
                          <i className="fab fa-github"></i> Code
                        </a>
                      )}
                    </div>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-link"
                    >
                      <i className="fas fa-external-link-alt"></i> Demo
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
