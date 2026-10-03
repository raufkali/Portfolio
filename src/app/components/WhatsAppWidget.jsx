"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "../../../lib/portfolioData";
import "./WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { personal } = portfolioData;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const number = (personal.whatsapp || "+923469258704").replace(
      /[^0-9]/g,
      "",
    );
    const message = `Hello Rauf! I visited your portfolio and I'm interested in discussing a project.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isVisible) return null;

  return (
    <div className="wa-widget">
      <button
        type="button"
        className="wa-btn"
        onClick={handleClick}
        aria-label="Chat with Rauf on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="wa-icon" aria-hidden="true">
          <i className="fab fa-whatsapp" />
        </span>

        <span className="wa-label">
          <span className="wa-dot" aria-hidden="true" />
          <span className="wa-label-text">WhatsApp</span>
        </span>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
