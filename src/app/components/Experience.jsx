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
      <div className="grid-overlay"></div>
      <div className="theme-orb theme-orb-1"></div>
      <div className="theme-orb theme-orb-2"></div>

      <div className="container">
        <div className="section-header-wrap" data-aos="fade-down">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">Professional career history, engineering roles, and real-world project impact</p>
        </div>

        <div className="exp-list">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="exp-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="exp-header">
                <div className="exp-header-left">
                  <h3 className="exp-position">{exp.position}</h3>
                  <h4 className="exp-company">
                    <span>@</span> {exp.company}
                  </h4>
                </div>
                <div className="exp-meta">
                  <span className="badge-exp-type">{exp.type}</span>
                  <span className="exp-duration">
                    <i className="far fa-calendar-alt me-1"></i> {exp.duration}
                  </span>
                </div>
              </div>

              <p className="exp-description">{exp.description}</p>

              <div className="exp-responsibilities-wrap">
                <div className="responsibilities-title">Key Responsibilities & Achievements:</div>
                <ul className="exp-responsibilities">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>
                      <span className="exp-bullet">›</span>
                      <span>{item}</span>
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
