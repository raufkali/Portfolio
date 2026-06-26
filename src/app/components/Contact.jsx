"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "@/lib/portfolioData";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      disable: window.innerWidth < 768 ? true : false, // Disable AOS on mobile
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const { name, email, message } = form;
    const whatsappMessage = `Hello Rauf!%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
    const whatsappNumber = portfolioData.personal.whatsapp.replace("+", "");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank",
    );

    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 1000);
  };

  const { personal } = portfolioData;

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2
          className="oswald-title text-center text-white mb-5"
          data-aos="fade-down"
        >
          CONTACT ME
        </h2>
        <div className="row g-4">
          <div className="col-lg-5" data-aos="fade-right" data-aos-offset="200">
            <div className="contact-info glass p-4 p-lg-5 rounded-4 h-100">
              <h3 className="text-white mb-4">Let's Connect</h3>
              <p className="text-white-70 mb-4">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>
              <div className="contact-item">
                <i className="fas fa-envelope gradient-text"></i>
                <div>
                  <span className="text-white-60 d-block">Email</span>
                  <span
                    className="text-white"
                    style={{ wordBreak: "break-all" }}
                  >
                    {personal.email}
                  </span>
                </div>
              </div>
              <div className="contact-item">
                <i className="fab fa-whatsapp whatsapp-color"></i>
                <div>
                  <span className="text-white-60 d-block">WhatsApp</span>
                  <a
                    href={`https://wa.me/${personal.whatsapp.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    {personal.whatsapp}
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone gradient-text"></i>
                <div>
                  <span className="text-white-60 d-block">Phone</span>
                  <span className="text-white">{personal.phone}</span>
                </div>
              </div>
              <div className="contact-item">
                <i className="fab fa-linkedin gradient-text"></i>
                <div>
                  <span className="text-white-60 d-block">LinkedIn</span>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                    style={{ wordBreak: "break-all" }}
                  >
                    {personal.linkedin.replace("https://www.", "")}
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <i className="fab fa-github gradient-text"></i>
                <div>
                  <span className="text-white-60 d-block">GitHub</span>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    {personal.github.replace("https://github.com/", "")}
                  </a>
                </div>
              </div>

              <div className="mt-4">
                <a
                  href={`https://wa.me/${personal.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-lg w-100 rounded-pill"
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-7" data-aos="fade-left" data-aos-offset="200">
            <div className="contact-form glass p-4 p-lg-5 rounded-4">
              <h3 className="text-white mb-4">Send Me a Message</h3>
              <p className="text-white-70 mb-4">
                Fill in the form below and I'll get back to you via WhatsApp
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white-70">Your Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg glass-input"
                    value={form.name}
                    placeholder="Enter your name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white-70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg glass-input"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white-70">Message</label>
                  <textarea
                    className="form-control form-control-lg glass-input"
                    rows="5"
                    placeholder="Enter your message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 rounded-pill"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <i className="fab fa-whatsapp me-2"></i>
                      Send via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
