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
      <div className="container">
        <h2
          className="oswald-title text-center text-white mb-5"
          data-aos="fade-down"
        >
          SKILLS
        </h2>
        <div className="row g-4">
          {skills.map((category, index) => (
            <div
              className="col-lg-4 col-md-6"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="skill-card glass p-4 rounded-4 h-100">
                <div className="skill-header">
                  <i className={`${category.icon} skill-icon`}></i>
                  <h5 className="text-white mb-0">{category.category}</h5>
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
