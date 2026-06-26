"use client";
import Image from "next/image";
import profilePic from "@/public/images/profile.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "@/lib/portfolioData";
import "./About.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const { name, title, tagline } = portfolioData.personal;

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          {/* Left Content */}
          <div className="col-lg-7 order-lg-1 order-2" data-aos="fade-right">
            <div className="about-content glass p-4 p-lg-5 rounded-4">
              <div className="badge-gradient mb-4 animate-pulse-glow">
                <i className="fas fa-code me-2"></i>
                Available for Projects
              </div>
              <h1 className="display-4 fw-bold mb-3 text-white">
                Hi, I'm <span className="gradient-text">{name}</span>
              </h1>
              <h2 className="h4 mb-4 text-white-80">{title}</h2>
              <p className="lead text-white-70 mb-4">{tagline}</p>
              <div className="d-flex gap-3 flex-wrap">
                <a
                  href="#contact"
                  className="btn btn-primary btn-lg rounded-pill px-5"
                >
                  <i className="fas fa-paper-plane me-2"></i>Hire Me
                </a>
                <a
                  href="#projects"
                  className="btn btn-outline-light btn-lg rounded-pill px-5"
                >
                  <i className="fas fa-briefcase me-2"></i>View Work
                </a>
              </div>
            </div>
          </div>

          {/* Right Profile Image - New Design */}
          <div
            className="col-lg-5 order-lg-2 order-1 text-center mb-4 mb-lg-0"
            data-aos="fade-left"
          >
            <div className="profile-wrapper">
              {/* Decorative background shapes */}
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>

              {/* Main profile image */}
              <div className="profile-image-container">
                <div className="profile-image-border">
                  <Image
                    src={profilePic}
                    alt={name}
                    className="profile-image"
                    width={300}
                    height={300}
                    priority
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Floating status badge */}
                <div className="status-badge-new">
                  <span className="status-dot"></span>
                  Available
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links-new mt-4">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-new"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-new"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href={`https://wa.me/${portfolioData.personal.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-new"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="social-link-new"
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
