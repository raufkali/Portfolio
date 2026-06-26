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

  const technologies = [
    "All",
    ...new Set(projects.flatMap((p) => p.technologies)),
  ];
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2
          className="oswald-title text-center text-white mb-4"
          data-aos="fade-down"
        >
          PROJECTS
        </h2>
        <div className="filter-buttons text-center mb-5" data-aos="fade-up">
          {technologies.slice(0, 6).map((tech, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === tech ? "active" : ""}`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
        <div className="row g-4">
          {filteredProjects.map((project, index) => (
            <div
              className="col-lg-6"
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="project-card glass p-4 rounded-4 h-100">
                <div className="project-header">
                  <h3 className="text-white">{project.title}</h3>
                  <span
                    className={`status-badge ${project.status.toLowerCase()}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-white-70">{project.description}</p>
                <div className="project-meta text-light">
                  <span className="text-white-60">
                    <i className="far fa-calendar me-2 "></i>
                    {project.startDate} - {project.endDate}
                  </span>
                  <span className="text-white-60 ms-3">
                    <i className="fas fa-user me-2"></i>
                    {project.role}
                  </span>
                </div>
                <div className="tech-tags mt-3">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="highlights-list mt-3">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle text-success me-2"></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
