"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hobbies.css";
const hobbies = [
  { icon: "fas fa-chess", label: "Chess" },
  { icon: "fas fa-code", label: "Programming" },
  { icon: "fas fa-flask", label: "Exploring Technologies" },
  { icon: "fas fa-language", label: "German Language" },
  { icon: "fas fa-globe-europe", label: "Cultural Awareness" },
  { icon: "fas fa-comments", label: "Communication Skills" },
  { icon: "fas fa-running", label: "Physical Fitness" },
];

const Hobbies = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="hobbies" className="container py-5" data-aos="fade-up">
      <h2 className="text-center mb-5 oswald-title">HOBBIES & INTERESTS</h2>
      <div className="hobby-row d-flex gap-4 px-2">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="text-center px-3 py-4 bg-white mb-3 shadow-sm rounded hobby-card"
          >
            <i className={`${hobby.icon} fa-2x mb-2 hobby-icon`}></i>
            <div>{hobby.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
