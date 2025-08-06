"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Skills.css";
const skillCategories = [
  {
    title: "MERN Stack Development",
    icon: "fas fa-layer-group",
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "Next.js"],
  },
  {
    title: "Frontend Development",
    icon: "fas fa-code",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Next.js"],
  },
  {
    title: "Desktop Application Development",
    icon: "fas fa-desktop",
    skills: ["Electron.js", "React.js", "Node.js"],
  },
  {
    title: "Databases",
    icon: "fas fa-database",
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Programming & Scripting Languages",
    icon: "fas fa-terminal",
    skills: ["C++", "Python", "JavaScript", "Bash", "PHP"],
  },
  {
    title: "Operating Systems & Cybersecurity",
    icon: "fas fa-shield-alt",
    skills: ["Windows", "Kali Linux", "Linux (General Use & Security)"],
  },
  {
    title: "Office & Productivity Tools",
    icon: "fas fa-file-alt",
    skills: [
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "LibreOffice Writer",
      "LibreOffice Calc",
      "LibreOffice Impress",
    ],
  },
  {
    title: "Photo & Video Editing",
    icon: "fas fa-photo-video",
    skills: ["Canva", "PicsArt", "PixelLab", "KineMaster", "Cap Cut"],
  },
  {
    title: "Cyber Tools",
    icon: "fa fa-tools",
    skills: [
      "Nmap",
      "Meta-Sploit",
      "Wifite",
      "Ngrok",
      "WireShark",
      "Bettercap",
      "Evillimiter",
    ],
  },
];

const Skills = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="skills" className="bg-dark py-5">
      <div className="container" data-aos="fade-up">
        <h2 className="oswald-title text-center mb-5 title text-white">
          SKILLS
        </h2>
        <div className="row g-4 skills-row">
          {skillCategories.map((category, i) => (
            <div className="col-md-4" key={i}>
              <div className="card skills-card shadow border-0 h-100 skill-category">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center fw-bold mb-3">
                    <i className={`${category.icon} me-2 text-dark`}></i>{" "}
                    {category.title}
                  </h5>
                  <ul className="list-unstyled ms-3">
                    {category.skills.map((skill, j) => (
                      <li key={j} className="mb-2">
                        <i className="fas fa-check-circle text-dark me-2"></i>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
