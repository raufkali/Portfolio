"use client";

import { useEffect, useState, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Achievements.css";

const Achievements = () => {
  const achievements = portfolioData.achievements || [];
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(achievements.map((a) => a.category).filter(Boolean));
    return ["All", ...set];
  }, [achievements]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? achievements
        : achievements.filter((a) => a.category === filter),
    [achievements, filter],
  );

  const total = String(achievements.length).padStart(2, "0");

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        {/* Header */}
        <div className="achievements-header" data-aos="fade-down">
          <div className="achievements-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            <span className="eyebrow-text">Recognition</span>
          </div>

          <h2 className="achievements-title">Achievements</h2>

          <p className="achievements-subtitle">
            Awards, honors, and recognition earned through professional,
            academic, and community work.
          </p>
        </div>

        {/* Category filters */}
        {categories.length > 1 && (
          <div className="achievements-filters" data-aos="fade-up">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`achievements-filter ${
                  filter === cat ? "achievements-filter-active" : ""
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="achievements-empty" data-aos="fade-up">
            <span className="empty-kicker">Coming Soon</span>
            <h3 className="empty-title">Achievements will be listed here.</h3>
            <p className="empty-text">
              Add entries to <code>portfolioData.achievements</code> to populate
              this section.
            </p>
          </div>
        ) : (
          <div className="achievements-grid">
            {filtered.map((item, index) => {
              const indexLabel = String(index + 1).padStart(2, "0");
              return (
                <article
                  key={item.id ?? index}
                  className="achievement-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <header className="achievement-head">
                    <div className="achievement-icon" aria-hidden="true">
                      {item.icon ? (
                        <i className={item.icon} />
                      ) : (
                        <span className="achievement-index-fallback">
                          {indexLabel}
                        </span>
                      )}
                    </div>

                    <span className="achievement-index">
                      {indexLabel} / {total}
                    </span>
                  </header>

                  <h3 className="achievement-title">{item.title}</h3>

                  <div className="achievement-meta">
                    {item.issuer && (
                      <span className="achievement-issuer">{item.issuer}</span>
                    )}
                    {item.issuer && item.date && (
                      <span className="achievement-meta-sep">•</span>
                    )}
                    {item.date && (
                      <span className="achievement-date">{item.date}</span>
                    )}
                  </div>

                  {item.category && (
                    <span className="achievement-tag">{item.category}</span>
                  )}

                  {item.description && (
                    <p className="achievement-desc">{item.description}</p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
