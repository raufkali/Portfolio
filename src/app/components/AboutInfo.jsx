"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./AboutInfo.css";

const AboutInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const { stats, aboutDetails } = portfolioData;

  return (
    <section className="about-info-section" id="about-info">
      <div className="grid-overlay"></div>
      <div className="glow-orb-info glow-orb-info-1"></div>
      <div className="glow-orb-info glow-orb-info-2"></div>

      <div className="container">
        {/* Stats Row */}
        <div className="row g-4" data-aos="fade-up">
          {stats.map((stat, index) => (
            <div className="col-md-4 col-6" key={index}>
              <div className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info List (terminal style) */}
        <div className="row mt-5" data-aos="fade-up" data-aos-delay="200">
          <div className="col-lg-8 mx-auto">
            <div className="info-list">
              {aboutDetails.map((item, index) => (
                <div className="info-item" key={index}>
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
