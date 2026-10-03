"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Certifications.css";

const Certifications = () => {
  const certifications = portfolioData.certifications || [];

  const [filter, setFilter] = useState("All");
  const [modalItem, setModalItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  /* AOS */
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  /* Issuer filters */
  const issuers = useMemo(() => {
    const set = new Set(certifications.map((c) => c.issuer).filter(Boolean));
    return ["All", ...set];
  }, [certifications]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? certifications
        : certifications.filter((c) => c.issuer === filter),
    [certifications, filter],
  );

  const total = filtered.length;
  const totalNumber = String(total).padStart(2, "0");

  /* Reset on filter change */
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  /* Navigation */
  const goTo = useCallback(
    (index) => {
      if (!total) return;
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const handleNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  /* Keyboard nav — ignore while modal is open */
  useEffect(() => {
    const handleKey = (event) => {
      if (modalItem) return;
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev, modalItem]);

  /* Modal: scroll lock + escape */
  useEffect(() => {
    document.body.style.overflow = modalItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalItem]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModalItem(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Touch / swipe */
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const deltaY = event.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const getOffset = (index) => {
    if (!total) return 0;
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  /* Empty state */
  if (!total) {
    return (
      <section id="certifications" className="certifications-section">
        <div className="container">
          <div className="certifications-header" data-aos="fade-down">
            <div className="certifications-eyebrow">
              <span className="eyebrow-rule" aria-hidden="true" />
              <span className="eyebrow-text">Credentials</span>
            </div>
            <h2 className="certifications-title">Certifications</h2>
            <p className="certifications-subtitle">
              Verified professional credentials, technical certifications, and
              continuing education.
            </p>
          </div>

          <div className="certifications-empty" data-aos="fade-up">
            <span className="empty-kicker">Coming Soon</span>
            <h3 className="empty-title">Certifications will be listed here.</h3>
            <p className="empty-text">
              Add entries to <code>portfolioData.certifications</code> to
              populate this section.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentNumber = String(activeIndex + 1).padStart(2, "0");

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="certifications-header" data-aos="fade-down">
          <div className="certifications-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            <span className="eyebrow-text">Credentials</span>
          </div>

          <h2 className="certifications-title">Certifications</h2>

          <p className="certifications-subtitle">
            Verified professional credentials, technical certifications, and
            continuing education.
          </p>
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}
        {issuers.length > 1 && (
          <div
            className="certifications-filters"
            data-aos="fade-up"
            role="tablist"
            aria-label="Issuer filters"
          >
            {issuers.map((issuer) => (
              <button
                key={issuer}
                type="button"
                role="tab"
                aria-selected={filter === issuer}
                className={`certifications-filter ${
                  filter === issuer ? "certifications-filter-active" : ""
                }`}
                onClick={() => setFilter(issuer)}
              >
                {issuer}
              </button>
            ))}
          </div>
        )}

        {/* =====================================================
            CINEMATIC COVERFLOW
        ===================================================== */}
        <div
          className="certifications-cinematic"
          data-aos="fade-up"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="certifications-cinematic-top">
            <div className="certifications-cinematic-label">
              CERTIFICATION ARCHIVE
            </div>

            <div className="certifications-cinematic-counter">
              <span>{currentNumber}</span>
              <i />
              <span>{totalNumber}</span>
            </div>
          </div>

          <div className="certifications-coverflow">
            <div
              className="certifications-coverflow-floor"
              aria-hidden="true"
            />

            {filtered.map((cert, index) => {
              const offset = getOffset(index);
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;
              const isActive = offset === 0;

              return (
                <article
                  key={cert.id ?? index}
                  className={`cert-cover-card ${
                    isActive ? "cert-cover-card-active" : ""
                  } ${offset < 0 ? "cert-cover-card-left" : ""} ${
                    offset > 0 ? "cert-cover-card-right" : ""
                  }`}
                  data-offset={offset}
                  aria-hidden={!isActive}
                  onClick={() => {
                    if (offset < 0) handlePrev();
                    if (offset > 0) handleNext();
                  }}
                >
                  {/* Image header */}
                  <div className="cert-cover-visual">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="cert-cover-image"
                      loading="lazy"
                    />

                    <div className="cert-cover-overlay" aria-hidden="true" />

                    <div className="cert-cover-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {cert.issueDate && (
                      <div className="cert-cover-date">{cert.issueDate}</div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="cert-cover-content">
                    <div className="cert-cover-heading">
                      <div>
                        <span className="cert-cover-kicker">
                          {cert.issuer || "CERTIFICATE"}
                        </span>
                        <h3 className="cert-cover-title">{cert.title}</h3>
                      </div>

                      <span className="cert-cover-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="cert-cover-tags">
                        {cert.skills.slice(0, 4).map((skill, i) => (
                          <span key={i} className="cert-cover-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="cert-cover-actions">
                      <button
                        type="button"
                        className="cert-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalItem(cert);
                        }}
                      >
                        <i className="far fa-eye" aria-hidden="true" />
                        View
                      </button>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-action-btn cert-action-btn-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i
                            className="fas fa-external-link-alt"
                            aria-hidden="true"
                          />
                          Verify
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom rail */}
                  <div className="cert-cover-bottom">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div className="cert-cover-bottom-line" />
                    <span>{totalNumber}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            type="button"
            className="cert-cover-arrow cert-cover-arrow-prev"
            onClick={handlePrev}
            aria-label="Previous certification"
          >
            <i className="fas fa-arrow-left" aria-hidden="true" />
            <span>PREV</span>
          </button>

          <button
            type="button"
            className="cert-cover-arrow cert-cover-arrow-next"
            onClick={handleNext}
            aria-label="Next certification"
          >
            <span>NEXT</span>
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <div className="certifications-cover-footer">
          <div className="certifications-cover-progress">
            <span
              style={{
                width: `${
                  total <= 1 ? 100 : ((activeIndex + 1) / total) * 100
                }%`,
              }}
            />
          </div>

          <div className="certifications-cover-footer-row">
            <div className="certifications-cover-counter">
              <span className="certifications-cover-current">
                {currentNumber}
              </span>
              <span>/</span>
              <span className="certifications-cover-total">{totalNumber}</span>
            </div>

            <div
              className="certifications-cover-dots"
              role="tablist"
              aria-label="Certification navigation"
            >
              {filtered.map((cert, i) => (
                <button
                  key={cert.id ?? i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to certification ${i + 1}`}
                  className={`certifications-cover-dot ${
                    i === activeIndex ? "certifications-cover-dot-active" : ""
                  }`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <div className="certifications-cover-swipe">
              <span>DRAG / SWIPE</span>
              <span className="certifications-cover-swipe-arrows">← →</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MODAL PREVIEW
      ===================================================== */}
      {modalItem && (
        <div
          className="cert-modal-backdrop"
          onClick={() => setModalItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalItem.title}
        >
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cert-modal-close"
              onClick={() => setModalItem(null)}
              aria-label="Close preview"
            >
              <i className="fas fa-times" aria-hidden="true" />
            </button>

            <div className="cert-modal-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalItem.image}
                alt={modalItem.title}
                className="cert-modal-image"
              />
            </div>

            <div className="cert-modal-body">
              <span className="cert-modal-kicker">
                {modalItem.issuer || "Certificate"}
              </span>

              <h3 className="cert-modal-title">{modalItem.title}</h3>

              <div className="cert-modal-meta">
                {modalItem.issueDate && (
                  <span>
                    <i className="far fa-calendar-alt" aria-hidden="true" />
                    Issued {modalItem.issueDate}
                  </span>
                )}
                {modalItem.credentialId && (
                  <span>
                    <i className="fas fa-fingerprint" aria-hidden="true" />
                    ID: {modalItem.credentialId}
                  </span>
                )}
              </div>

              {modalItem.description && (
                <p className="cert-modal-desc">{modalItem.description}</p>
              )}

              {modalItem.credentialUrl && (
                <a
                  href={modalItem.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-modal-verify"
                >
                  <i className="fas fa-external-link-alt" aria-hidden="true" />
                  Verify Credential
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
