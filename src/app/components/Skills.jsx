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
      {/* Background decorations */}
      <div className="grid-overlay"></div>
      <div className="glow-orb-skills glow-orb-skills-1"></div>
      <div className="glow-orb-skills glow-orb-skills-2"></div>

      <div className="container">
        <h2 className="section-title-skills" data-aos="fade-down">
          Skills
        </h2>

        <div className="row g-4">
          {skills.map((category, index) => (
            <div
              className="col-lg-4 col-md-6"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="skill-card">
                <div className="skill-header">
                  <i className={`${category.icon} skill-icon`}></i>
                  <h5>{category.category}</h5>
                </div>
                <div className="skill-items">
                  {category.items.map((skill, i) => (
                    <span key={i} className="skill-item">
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
