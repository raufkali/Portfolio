"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Experience.css";

const Experience = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const { experience } = portfolioData;

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2
          className="oswald-title text-center text-white mb-5"
          data-aos="fade-down"
        >
          EXPERIENCE
        </h2>
        <div className="timeline text-light">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className="timeline-content glass p-4 rounded-4">
                <div className="timeline-badge">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3 className="text-white">{exp.position}</h3>
                <h4 className="text-white-70">{exp.company}</h4>
                <div className="timeline-meta">
                  <span className="badge bg-primary">{exp.type}</span>
                  <span className="text-white-60 ms-3">
                    <i className="far fa-calendar-alt me-2"></i>
                    {exp.duration}
                  </span>
                </div>
                <p className="text-white-70 mt-3">{exp.description}</p>
                <ul className="responsibilities-list">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle text-success me-2"></i>
                      {item}
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

export default Experience;
