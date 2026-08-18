"use client";
import { useState, useEffect } from "react";
import { portfolioData } from "../../../lib/portfolioData";
import "./WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { personal } = portfolioData;

  // Show after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const number = personal.whatsapp.replace("+", "");
    const message = `Hello Rauf! I'm interested in your work. Can we discuss further?`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {isVisible && (
        <div className="whatsapp-widget">
          <button
            className="whatsapp-button"
            onClick={handleClick}
            aria-label="Chat on WhatsApp"
          >
            <span className="icon">
              <i className="fab fa-whatsapp"></i>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
