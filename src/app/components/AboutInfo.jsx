"use client";

import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./AboutInfo.css";

const STAT_META = [
  { icon: "fas fa-folder-open", code: "01" },
  { icon: "fas fa-briefcase", code: "02" },
  { icon: "fas fa-microchip", code: "03" },
];

function parseStatValue(rawValue) {
  const match = String(rawValue).match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: String(rawValue) };
  return {
    target: parseInt(match[1], 10),
    suffix: match[2] || "",
  };
}

const AboutInfo = () => {
  const stats = portfolioData.stats.slice(0, 3);
  const parsedStats = stats.map((stat) => parseStatValue(stat.number));
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState(() => parsedStats.map(() => 0));

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: false });
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = null;

    const runCountAnimation = () => {
      if (prefersReducedMotion) {
        setCounts(parsedStats.map((item) => item.target));
        return;
      }

      const duration = 1250;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setCounts(
          parsedStats.map((item) => Math.round(item.target * eased)),
        );

        if (progress < 1) {
          rafId = window.requestAnimationFrame(step);
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setInView(true);
            runCountAnimation();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="about-info-section" id="about-info" ref={sectionRef}>
      <div className="container">
        <div className="about-info-stats">
          {stats.map((stat, index) => {
            const meta = STAT_META[index] || {
              icon: "fas fa-chart-line",
              code: String(index + 1).padStart(2, "0"),
            };
            const { suffix } = parsedStats[index];

            return (
              <div
                className={`about-info-stat ${inView ? "is-visible" : ""}`}
                key={stat.label}
                data-aos="fade-up"
                data-aos-delay={index * 110}
              >
                <div className="stat-card-top">
                  <span className="stat-index">{meta.code} / 03</span>
                  <span className="stat-icon-box" aria-hidden="true">
                    <i className={meta.icon} />
                  </span>
                </div>

                <span className="stat-number" aria-label={stat.number}>
                  {counts[index]}
                  {suffix}
                </span>

                <span className="stat-label">{stat.label}</span>

                <div className="stat-meter-track" aria-hidden="true">
                  <span
                    className="stat-meter-fill"
                    style={{ transitionDelay: `${index * 120}ms` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
