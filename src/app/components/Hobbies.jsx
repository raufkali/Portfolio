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
      <div className="container">
        <h2
          className="oswald-title text-center text-white mb-5"
          data-aos="fade-down"
        >
          HOBBIES & INTERESTS
        </h2>
        <div className="row g-4 justify-content-center">
          {hobbies.map((hobby, index) => (
            <div
              className="col-lg-3 col-md-4 col-6"
              key={index}
              data-aos="flip-left"
              data-aos-delay={index * 50}
            >
              <div className="hobby-card glass text-center p-4 rounded-4">
                <i className={`${hobby.icon} hobby-icon`}></i>
                <p className="text-white mt-2 mb-0">{hobby.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
