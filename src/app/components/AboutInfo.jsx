import React from "react";

const AboutInfo = () => {
  return (
    <section id="about-info" className="container py-5" data-aos="fade-up">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center mb-4 oswald-title mb-2">ABOUT ME</h2>
          <p className="lead text-center">
            I'm <strong>Rauf Ahmad</strong>, a passionate{" "}
            <strong>MERN Stack Developer</strong> and{" "}
            <strong>Desktop App Developer</strong> with a growing focus on{" "}
            <strong>AI integration</strong> into modern web and software
            solutions. With a solid foundation in technologies like{" "}
            <strong>MongoDB, Express.js, React, and Node.js</strong>, I build
            dynamic, secure, and responsive full-stack applications.
          </p>
        </div>
        <div className="col-md-6 ps-5 pt-3 d-flex flex-column justify-content-between">
          <h4 className="mern-stack about-icon">
            <i className="fas fa-code me-2"></i> MERN Stack Developer
          </h4>
          <h4 className="desktop-app about-icon">
            <i className="fas fa-desktop me-2"></i> Desktop App Developer
          </h4>
          <h4 className="ai-dev about-icon">
            <i className="fas fa-robot me-2"></i> AI/ML Enthusiast
          </h4>
          <h4 className="fullstack-dev about-icon">
            <i className="fas fa-layer-group me-2"></i> Full-Stack Integrator
          </h4>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
