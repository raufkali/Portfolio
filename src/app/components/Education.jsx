"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Education.css";

const Education = () => {
  const education = portfolioData.education || [];
  const total = String(education.length).padStart(2, "0");

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <section id="education" className="education-section">
      <div className="container">
        {/* =====================================================
            SECTION HEADER
            ===================================================== */}
        <div className="education-header" data-aos="fade-down">
          <div className="education-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            <span className="eyebrow-text">Academic Background</span>
          </div>

          <h2 className="education-title">Education</h2>

          <p className="education-subtitle">
            Academic foundation in computer science, engineering fundamentals,
            and applied mathematics.
          </p>
        </div>

        {/* =====================================================
            TIMELINE
            ===================================================== */}
        {education.length === 0 ? (
          <div className="education-empty" data-aos="fade-up">
            <span className="empty-kicker">Coming Soon</span>
            <h3 className="empty-title">
              Education history will be listed here.
            </h3>
            <p className="empty-text">
              Add entries to <code>portfolioData.education</code> to populate
              this section.
            </p>
          </div>
        ) : (
          <ol className="education-list">
            {education.map((item, index) => {
              const indexLabel = String(index + 1).padStart(2, "0");
              const isLast = index === education.length - 1;

              return (
                <li
                  key={item.id ?? index}
                  className="education-item"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  {/* Marker column */}
                  <div className="education-marker">
                    <span className="education-marker-dot" aria-hidden="true" />
                    {!isLast && (
                      <span
                        className="education-marker-line"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* Content column */}
                  <div className="education-content">
                    <div className="education-content-head">
                      <span className="education-index">
                        {indexLabel} / {total}
                      </span>

                      <span
                        className={`education-status ${
                          item.status === "Currently Enrolled"
                            ? "education-status-active"
                            : ""
                        }`}
                      >
                        {item.status || "Completed"}
                      </span>
                    </div>

                    <h3 className="education-degree">{item.degree}</h3>

                    <div className="education-meta">
                      <span className="education-institution">
                        {item.institution}
                      </span>

                      {item.year && (
                        <>
                          <span className="education-meta-sep">•</span>
                          <span className="education-year">{item.year}</span>
                        </>
                      )}

                      {item.grade && (
                        <>
                          <span className="education-meta-sep">•</span>
                          <span className="education-grade">
                            Grade: {item.grade}
                          </span>
                        </>
                      )}

                      {item.cgpa && (
                        <>
                          <span className="education-meta-sep">•</span>
                          <span className="education-grade">
                            CGPA: {item.cgpa}
                          </span>
                        </>
                      )}

                      {item.percentage && (
                        <>
                          <span className="education-meta-sep">•</span>
                          <span className="education-grade">
                            {item.percentage}
                          </span>
                        </>
                      )}
                    </div>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="education-tags">
                        {item.highlights.map((h, i) => (
                          <span key={i} className="education-tag">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
};

export default Education;
