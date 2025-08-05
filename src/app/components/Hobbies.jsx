"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const hobbies = [
  { icon: "fas fa-code", label: "Coding" },
  { icon: "fas fa-music", label: "Music" },
  { icon: "fas fa-book", label: "Reading" },
  { icon: "fas fa-gamepad", label: "Gaming" },
  { icon: "fas fa-hiking", label: "Hiking" },
];

const Hobbies = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="hobbies" className="container py-5" data-aos="fade-up">
      <h2 className="text-center mb-4 oswald-title">HOBBIES</h2>
      <div className="d-flex overflow-auto gap-4 px-2">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="text-center px-3 py-4 bg-white shadow-sm rounded hobby-card"
          >
            <i className={`${hobby.icon} fa-2x mb-2`}></i>
            <div>{hobby.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
