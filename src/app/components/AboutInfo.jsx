"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "@/lib/portfolioData";
import "./AboutInfo.css";

const AboutInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const { description, stats } = portfolioData;

  return (
    <section id="about-info" className="about-info-section">
      <div className="container py-5">
        <h2 className="oswald-title text-center mb-5" data-aos="fade-down">
          ABOUT ME
        </h2>
        <div className="row g-4">
          <div className="col-lg-8" data-aos="fade-right">
            <div className="glass p-5 rounded-4 h-100">
              <p className="lead mb-4">{description}</p>
              <div className="row g-3 mt-3">
                {stats.map((stat, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="stat-card text-center p-3 rounded-3">
                      <h3 className="display-4 fw-bold gradient-text">
                        {stat.number}
                      </h3>
                      <p className="text-muted mb-0">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4" data-aos="fade-left">
            <div className="glass p-5 rounded-4 h-100 d-flex flex-column justify-content-center">
              <div className="info-item mb-4">
                <i className="fas fa-map-marker-alt gradient-text me-3"></i>
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="info-item mb-4">
                <i className="fas fa-envelope gradient-text me-3"></i>
                <span>{portfolioData.personal.email}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-phone gradient-text me-3"></i>
                <span>{portfolioData.personal.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
