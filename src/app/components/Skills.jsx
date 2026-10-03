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
  const totalCategories = String(skills.length).padStart(2, "0");

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* =====================================================
            SECTION HEADER
            ===================================================== */}
        <div className="skills-header" data-aos="fade-down">
          <div className="skills-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            <span className="eyebrow-text">Technical Arsenal</span>
          </div>

          <h2 className="skills-title">Skills &amp; Proficiencies</h2>

          <p className="skills-subtitle">
            Core full-stack engineering stack, modern frameworks, cloud
            databases, and automation tools.
          </p>
        </div>

        {/* =====================================================
            SKILLS GRID
            ===================================================== */}
        <div className="skills-grid">
          {skills.map((category, index) => {
            const indexLabel = String(index + 1).padStart(2, "0");

            return (
              <article
                key={index}
                className="skills-card"
                data-aos="fade-up"
                data-aos-delay={index * 60}
              >
                {/* Card header — number + icon + title */}
                <header className="skills-card-head">
                  <div className="skills-card-head-left">
                    <span className="skills-card-index">
                      {indexLabel} / {totalCategories}
                    </span>
                    <h3 className="skills-card-title">{category.category}</h3>
                  </div>

                  <div className="skills-card-icon" aria-hidden="true">
                    <i className={category.icon} />
                  </div>
                </header>

                {/* Divider */}
                <div className="skills-card-rule" aria-hidden="true" />

                {/* Skill chips */}
                <div className="skills-card-items">
                  {category.items.map((skill, i) => (
                    <span key={i} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
