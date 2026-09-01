"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./AboutInfo.css";

const AboutInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const { stats, aboutDetails } = portfolioData;

  return (
    <section className="about-info-section" id="about-info">
      <div className="grid-overlay"></div>
      <div className="theme-orb theme-orb-1"></div>
      <div className="theme-orb theme-orb-2"></div>

      <div className="container">
        <div className="section-header-wrap" data-aos="fade-down">
          <h2 className="section-title">Overview & Impact</h2>
          <p className="section-subtitle">Key performance metrics and professional attributes</p>
        </div>

        {/* Stats Row */}
        <div className="row g-4" data-aos="fade-up">
          {stats.map((stat, index) => (
            <div className="col-md-4 col-6" key={index}>
              <div className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Info List */}
        <div className="row mt-5" data-aos="fade-up" data-aos-delay="150">
          <div className="col-lg-9 mx-auto">
            <div className="info-list-card">
              <div className="info-list-header">
                <span className="info-header-tag">Quick Profile Details</span>
                <span className="info-header-status">
                  <span className="status-live-dot"></span> Available for Work
                </span>
              </div>
              <div className="info-items-container">
                {aboutDetails.map((item, index) => (
                  <div className="info-item" key={index}>
                    <span className="info-label">
                      <span className="info-arrow">›</span> {item.label}
                    </span>
                    <span className="info-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
