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
      <div className="container">
        {/* =====================================================
            SECTION HEADER
            ===================================================== */}
        <div className="about-info-header" data-aos="fade-down">
          <div className="about-info-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            <span className="eyebrow-text">Metrics &amp; Attributes</span>
          </div>

          <h2 className="about-info-title">Overview &amp; Impact</h2>

          <p className="about-info-subtitle">
            Key engineering metrics, technical versatility, and professional
            credentials.
          </p>
        </div>

        {/* =====================================================
            STATS — flat row, hairline dividers, no cards
            ===================================================== */}
        <div className="about-info-stats" data-aos="fade-up">
          {stats.map((stat, index) => (
            <div className="about-info-stat" key={index}>
              <span className="stat-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* =====================================================
            PROFILE DETAILS — single flat panel, row-based list
            ===================================================== */}
        <div
          className="about-info-panel"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div className="about-info-panel-header">
            <div>
              <span className="panel-kicker">Profile Details</span>
              <span className="panel-title">At a Glance</span>
            </div>

            <span className="panel-status">
              <span className="panel-status-dot" aria-hidden="true" />
              Available for Work
            </span>
          </div>

          <div className="about-info-list">
            {aboutDetails.map((item, index) => (
              <div className="about-info-row" key={index}>
                <span className="about-info-label">
                  <span className="about-info-arrow" aria-hidden="true">
                    ›
                  </span>
                  {item.label}
                </span>
                <span className="about-info-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
