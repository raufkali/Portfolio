"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Hobbies.css";

const Hobbies = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const { hobbies } = portfolioData;

  return (
    <section id="hobbies" className="hobbies-section">
      <div className="grid-overlay"></div>
      <div className="theme-orb theme-orb-1"></div>
      <div className="theme-orb theme-orb-2"></div>

      <div className="container">
        <div className="section-header-wrap" data-aos="fade-down">
          <h2 className="section-title">Hobbies & Interests</h2>
          <p className="section-subtitle">Personal pursuits, languages, and analytical activities beyond coding</p>
        </div>

        <div className="row g-4 justify-content-center">
          {hobbies.map((hobby, index) => (
            <div
              className="col-lg-3 col-md-4 col-6"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              <div className="hobby-item-card">
                <i className={`${hobby.icon} hobby-card-icon`}></i>
                <p className="hobby-card-label">{hobby.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
