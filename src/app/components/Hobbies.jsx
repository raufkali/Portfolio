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
      {/* Background decorations */}
      <div className="grid-overlay"></div>
      <div className="glow-orb-hobbies glow-orb-hobbies-1"></div>
      <div className="glow-orb-hobbies glow-orb-hobbies-2"></div>

      <div className="container">
        <h2 className="section-title-hobbies" data-aos="fade-down">
          Hobbies & Interests
        </h2>

        <div className="row g-4 justify-content-center">
          {hobbies.map((hobby, index) => (
            <div
              className="col-lg-3 col-md-4 col-6"
              key={index}
              data-aos="flip-left"
              data-aos-delay={index * 50}
            >
              <div className="hobby-card">
                <i className={`${hobby.icon} hobby-icon`}></i>
                <p>{hobby.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
