"use client";

import { portfolioData } from "../../../lib/portfolioData";
import "./AboutInfo.css";

const AboutInfo = () => {
  const { stats } = portfolioData;

  return (
    <section className="about-info-section" id="about-info">
      <div className="container">
        <div className="about-info-stats">
          {stats.map((stat, index) => (
            <div className="about-info-stat" key={index}>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
