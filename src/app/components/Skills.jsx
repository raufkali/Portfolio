"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Skills.css";

const Skills = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const { skills } = portfolioData;

  return (
    <section id="skills" className="skills-section">
      <div className="grid-overlay"></div>
      <div className="theme-orb theme-orb-1"></div>
      <div className="theme-orb theme-orb-2"></div>

      <div className="container">
        <div className="section-header-wrap" data-aos="fade-down">
          <span className="section-kicker">TECHNICAL ARSENAL</span>
          <h2 className="section-title">Skills & Proficiencies</h2>
          <p className="section-subtitle">
            Core full-stack engineering stack, modern frameworks, cloud databases, and automation tools
          </p>
        </div>

        <div className="row g-4">
          {skills.map((category, index) => (
            <div
              className="col-lg-4 col-md-6"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="skill-category-card">
                <div className="skill-card-header">
                  <div className="skill-icon-wrap">
                    <i className={category.icon} aria-hidden="true"></i>
                  </div>
                  <h3 className="skill-category-title">{category.category}</h3>
                </div>

                <div className="skill-items-grid">
                  {category.items.map((skill, i) => (
                    <span key={i} className="skill-tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
