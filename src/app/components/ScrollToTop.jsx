"use client";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    visible && (
      <button
        className="btn btn-dark position-fixed bottom-0 end-0 m-4 shadow"
        onClick={scrollToTop}
        style={{ zIndex: 1000 }}
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTop;
