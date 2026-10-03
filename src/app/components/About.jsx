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
      <div className="container">
        <div className="row align-items-center min-vh-100 py-5">
          {/* =====================================================
              LEFT — Copy + CTAs
              ===================================================== */}
          <div className="col-lg-7 order-lg-1 order-2" data-aos="fade-right">
            <div className="about-content">
              {/* Eyebrow */}
              <div className="about-eyebrow">
                <span className="eyebrow-rule" aria-hidden="true" />
                <span className="eyebrow-text">
                  Available for projects &amp; full-time roles
                </span>
              </div>

              {/* Headline */}
              <h1 className="about-headline">
                Hi, I'm <span className="about-name">{name}</span>
              </h1>

              {/* Subtitle */}
              <p className="about-subtitle">{title}</p>

              {/* Tagline */}
              <p className="about-tagline">{tagline}</p>

              {/* Divider */}
              <div className="about-divider" aria-hidden="true" />

              {/* CTAs */}
              <div className="about-cta-group">
                <a href="#contact" className="btn-primary-action">
                  <i className="fas fa-paper-plane" aria-hidden="true" />
                  <span>Hire Me</span>
                </a>
                <a href="#projects" className="btn-secondary-action">
                  <i className="fas fa-briefcase" aria-hidden="true" />
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
                  <i className="fas fa-file-pdf" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — Portrait + Social
              ===================================================== */}
          <div
            className="col-lg-5 order-lg-2 order-1 mb-5 mb-lg-0"
            data-aos="fade-left"
          >
            <div className="about-portrait-wrap">
              {/* Portrait frame — single hairline, no card */}
              <div className="about-portrait">
                <Image
                  src="/images/profile.jpg"
                  alt={`${name} — ${title}`}
                  className="about-portrait-photo"
                  width={360}
                  height={420}
                  priority
                />

                {/* Corner tag — replaces pulsing badge */}
                <div className="about-portrait-tag">
                  <span>Full Stack Dev</span>
                </div>
              </div>

              {/* Social links */}
              <div className="about-social">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <i className="fab fa-github" aria-hidden="true" />
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin-in" aria-hidden="true" />
                </a>
                <a
                  href={`https://wa.me/${portfolioData.personal.whatsapp.replace(
                    /[^0-9]/g,
                    "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-btn"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <i className="fab fa-whatsapp" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="about-social-btn"
                  aria-label="Email"
                  title="Email"
                >
                  <i className="fas fa-envelope" aria-hidden="true" />
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
