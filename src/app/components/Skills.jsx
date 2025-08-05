"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Git",
  "MongoDB",
  "Node.js",
];

const Skills = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="skills" className="bg-light py-5">
      <div className="container" data-aos="fade-up">
        <h2 className={` oswald-title text-center mb-4 title`}>SKILLS</h2>
        <div className="row g-4">
          {skills.map((skill, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="card text-center shadow-sm border-0 h-100 skill-card">
                <div className="card-body">
                  <h5 className="card-title">{skill}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skill-card {
          transition: transform 0.3s ease;
        }
        .skill-card:hover {
          transform: scale(1.05);
          background-color: #f0f8ff;
        }
      `}</style>
    </section>
  );
};

export default Skills;
