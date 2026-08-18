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
      {/* Background decorations (optional – remove if you prefer cleaner) */}
      <div className="grid-overlay"></div>
      <div className="glow-orb-exp glow-orb-exp-1"></div>
      <div className="glow-orb-exp glow-orb-exp-2"></div>

      <div className="container">
        <h2 className="section-title-exp" data-aos="fade-down">
          Experience
        </h2>

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
                  <h4 className="exp-company">{exp.company}</h4>
                </div>
                <div className="exp-meta">
                  <span className="badge-type">{exp.type}</span>
                  <span className="exp-duration">
                    <i className="far fa-calendar-alt"></i> {exp.duration}
                  </span>
                </div>
              </div>

              <p className="exp-description">{exp.description}</p>

              <ul className="exp-responsibilities">
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
