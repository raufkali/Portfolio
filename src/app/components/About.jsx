"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./About.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: false });
  }, []);

  const { name, title, tagline } = portfolioData.personal;

  return (
    <section id="about" className="about-section">
      <div className="grid-overlay"></div>

      {/* Glow / decorative shapes */}
      <div className="theme-orb theme-orb-1"></div>
      <div className="theme-orb theme-orb-2"></div>

      <div className="container">
        <div className="row align-items-center min-vh-100 py-5">
          {/* Left Content */}
          <div className="col-lg-7 order-lg-1 order-2" data-aos="fade-right">
            <div className="about-content-card">
              {/* Status Badge */}
              <div className="about-status-pill mb-4">
                <span className="status-live-dot"></span>
                <span>Available for Projects & Full-Time Roles</span>
              </div>

              {/* Main Headline */}
              <h1 className="hero-title mb-3">
                Hi, I'm <span className="gradient-text">{name}</span>
              </h1>

              <h2 className="hero-subtitle mb-4">{title}</h2>

              <p className="hero-tagline mb-4">{tagline}</p>

              {/* Action Buttons: Hire Me, View Work, Download CV */}
              <div className="hero-cta-group">
                <a href="#contact" className="btn-primary-action">
                  <i className="fas fa-paper-plane"></i>
                  <span>Hire Me</span>
                </a>
                <a href="#projects" className="btn-secondary-action">
                  <i className="fas fa-briefcase"></i>
                  <span>View Work</span>
                </a>
                <a
                  href="/cv.pdf"
                  download="cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cv-action"
                  aria-label="Download CV"
                  title="Download Rauf Ahmad's CV"
                >
                  <i className="fas fa-file-pdf"></i>
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Profile Image */}
          <div
            className="col-lg-5 order-lg-2 order-1 text-center mb-5 mb-lg-0"
            data-aos="fade-left"
          >
            <div className="hero-profile-wrapper">
              {/* Profile Image Frame */}
              <div className="profile-frame">
                <div className="profile-img-inner">
                  <Image
                    src="/images/profile.jpg"
                    alt={`${name} - Software Engineer & Full-Stack Developer`}
                    className="profile-photo"
                    width={320}
                    height={320}
                    priority
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Floating Status Pill */}
                <div className="profile-floating-badge">
                  <span className="badge-pulse-indicator"></span>
                  <span>Full Stack Dev</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="hero-social-links mt-4">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-btn"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-btn"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href={`https://wa.me/${portfolioData.personal.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-btn"
                  aria-label="WhatsApp Chat"
                  title="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="hero-social-btn"
                  aria-label="Send Email"
                  title="Email"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
