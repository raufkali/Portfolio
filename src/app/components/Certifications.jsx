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
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const touchStartX = useRef(null);

  /* ------------------------------------------------------------
     AOS
  ------------------------------------------------------------ */
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  /* ------------------------------------------------------------
     ISSUER FILTERS
  ------------------------------------------------------------ */
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
  const totalLabel = String(total).padStart(2, "0");

  /* ------------------------------------------------------------
     FILTER CHANGE — reset carousel
  ------------------------------------------------------------ */
  useEffect(() => {
    setActiveIndex(0);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: 0, behavior: "auto" });
  }, [filter]);

  /* ------------------------------------------------------------
     SYNC SCROLL → active dot + edge state
  ------------------------------------------------------------ */
  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    const firstCard = cardRefs.current[0];
    if (!track || !firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const idx = Math.round(track.scrollLeft / (cardWidth + gap));
    const maxScroll = track.scrollWidth - track.clientWidth;

    setActiveIndex(Math.max(0, Math.min(idx, total - 1)));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= maxScroll - 4);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    syncScrollState();

    return () => {
      track.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState]);

  /* ------------------------------------------------------------
     PROGRAMMATIC SCROLL
  ------------------------------------------------------------ */
  const scrollToCard = (idx) => {
    const track = trackRef.current;
    const card = cardRefs.current[idx];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (activeIndex > 0) scrollToCard(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < total - 1) scrollToCard(activeIndex + 1);
  };

  /* ------------------------------------------------------------
     MODAL — scroll lock + escape
  ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
     TOUCH / SWIPE
  ------------------------------------------------------------ */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  /* ------------------------------------------------------------
     PROGRESS BAR
  ------------------------------------------------------------ */
  const progressPct = total <= 1 ? 100 : ((activeIndex + 1) / total) * 100;

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        {/* =====================================================
            SECTION HEADER
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
            ISSUER FILTER PILLS
            ===================================================== */}
        {issuers.length > 1 && (
          <div className="certifications-filters" data-aos="fade-up">
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
            CAROUSEL
            ===================================================== */}
        {total === 0 ? (
          <div className="certifications-empty" data-aos="fade-up">
            <span className="empty-kicker">Coming Soon</span>
            <h3 className="empty-title">Certifications will be listed here.</h3>
            <p className="empty-text">
              Add entries to <code>portfolioData.certifications</code> to
              populate this section.
            </p>
          </div>
        ) : (
          <div className="certifications-carousel" data-aos="fade-up">
            {/* Prev arrow */}
            <button
              type="button"
              className="cert-arrow cert-arrow-prev"
              onClick={handlePrev}
              disabled={atStart}
              aria-label="Previous certification"
              title="Previous"
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              className="cert-arrow cert-arrow-next"
              onClick={handleNext}
              disabled={atEnd}
              aria-label="Next certification"
              title="Next"
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>

            {/* Track */}
            <div
              className="cert-track"
              ref={trackRef}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {filtered.map((cert, index) => (
                <article
                  key={cert.id ?? index}
                  className="cert-card"
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                >
                  {/* Image area */}
                  <button
                    type="button"
                    className="cert-image-wrap"
                    onClick={() => setModalItem(cert)}
                    aria-label={`Preview ${cert.title}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="cert-image"
                      loading="lazy"
                    />
                    <span className="cert-preview-overlay">
                      <i className="fas fa-expand" aria-hidden="true" />
                      <span>Preview</span>
                    </span>
                  </button>

                  {/* Body */}
                  <div className="cert-body">
                    <div className="cert-head">
                      <span className="cert-index">
                        {String(index + 1).padStart(2, "0")} / {totalLabel}
                      </span>
                      {cert.issueDate && (
                        <span className="cert-issued">{cert.issueDate}</span>
                      )}
                    </div>

                    <h3 className="cert-title">{cert.title}</h3>

                    {cert.issuer && (
                      <p className="cert-issuer">{cert.issuer}</p>
                    )}

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="cert-tags">
                        {cert.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="cert-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="cert-actions">
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-action cert-action-primary"
                      >
                        <i
                          className="fas fa-external-link-alt"
                          aria-hidden="true"
                        />
                        Verify
                      </a>
                    ) : (
                      <span className="cert-action cert-action-disabled">
                        <i className="fas fa-lock" aria-hidden="true" />
                        No public link
                      </span>
                    )}

                    <button
                      type="button"
                      className="cert-action"
                      onClick={() => setModalItem(cert)}
                    >
                      <i className="far fa-eye" aria-hidden="true" />
                      View
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Progress bar */}
            <div className="cert-progress" aria-hidden="true">
              <div
                className="cert-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* =====================================================
            FOOTER — counter + dots
            ===================================================== */}
        {total > 0 && (
          <div className="cert-footer">
            <div className="cert-counter">
              <span className="counter-current">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="counter-sep">/</span>
              <span className="counter-total">{totalLabel}</span>
            </div>

            <div className="cert-dots" role="tablist">
              {filtered.map((cert, i) => (
                <button
                  key={cert.id ?? i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to certification ${i + 1}`}
                  className={`cert-dot ${
                    i === activeIndex ? "cert-dot-active" : ""
                  }`}
                  onClick={() => scrollToCard(i)}
                />
              ))}
            </div>
          </div>
        )}
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
                {modalItem.expiryDate && (
                  <span>
                    <i className="far fa-clock" aria-hidden="true" />
                    Valid until {modalItem.expiryDate}
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
