"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "../../../lib/portfolioData";
import "./WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { personal } = portfolioData;

  // Show after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const number = (personal.whatsapp || "+923469258704").replace(/[^0-9]/g, "");
    const message = `Hello Rauf! I visited your portfolio and I'm interested in discussing a project.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isVisible) return null;

  return (
    <div className="whatsapp-floating-widget" data-aos="zoom-in">
      <button
        className="whatsapp-float-btn"
        onClick={handleClick}
        aria-label="Chat with Rauf on WhatsApp"
        title="Chat with Rauf Ahmad on WhatsApp"
      >
        <span className="whatsapp-icon-wrap">
          <i className="fab fa-whatsapp"></i>
        </span>
        <span className="whatsapp-tooltip">
          <span className="whatsapp-pulse-dot"></span>
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
