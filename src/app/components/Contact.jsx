"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { portfolioData } from "../../../lib/portfolioData";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const { name, email, message } = form;
    const whatsappMessage = `Hello Rauf!%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
    const whatsappNumber = (portfolioData.personal.whatsapp || "+923469258704").replace(/[^0-9]/g, "");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank",
      "noopener,noreferrer"
    );

    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 1000);
  };

  const { personal } = portfolioData;

  return (
    <section id="contact" className="contact-section">
      <div className="grid-overlay"></div>
      <div className="theme-orb theme-orb-1"></div>
      <div className="theme-orb theme-orb-2"></div>

      <div className="container">
        <div className="section-header-wrap" data-aos="fade-down">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">Have a project idea, software inquiry, or engineering opportunity? Reach out directly</p>
        </div>

        <div className="row g-4">
          {/* Left: Contact Info */}
          <div className="col-lg-5" data-aos="fade-right">
            <div className="contact-info-card">
              <h3 className="contact-card-title">Contact Information</h3>
              <p className="contact-card-subtitle">
                I am actively open to discussing new software projects, web applications, or engineering roles.
              </p>

              <div className="contact-details-list">
                {/* Email */}
                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <span className="contact-detail-label">Email</span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="contact-detail-val"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="contact-detail-item">
                  <div className="contact-icon-box text-success">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <span className="contact-detail-label">WhatsApp</span>
                    <a
                      href={`https://wa.me/${personal.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-detail-val"
                    >
                      {personal.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <span className="contact-detail-label">Phone</span>
                    <span className="contact-detail-val">{personal.phone}</span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <div>
                    <span className="contact-detail-label">LinkedIn</span>
                    <a
                      href={personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-detail-val"
                    >
                      {personal.linkedin.replace("https://www.", "")}
                    </a>
                  </div>
                </div>

                {/* GitHub */}
                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <i className="fab fa-github"></i>
                  </div>
                  <div>
                    <span className="contact-detail-label">GitHub</span>
                    <a
                      href={personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-detail-val"
                    >
                      {personal.github.replace("https://github.com/", "")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <a
                  href={`https://wa.me/${personal.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-direct"
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  Direct WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="col-lg-7" data-aos="fade-left">
            <div className="contact-form-card">
              <h3 className="contact-card-title">Send a Quick Message</h3>
              <p className="contact-card-subtitle">
                Fill out the form below to initiate an instant conversation on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="contact-form-body">
                <div className="form-group mb-3">
                  <label className="form-input-label">Your Name</label>
                  <input
                    type="text"
                    className="form-custom-input"
                    value={form.name}
                    placeholder="Enter your name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-input-label">Email Address</label>
                  <input
                    type="email"
                    className="form-custom-input"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="form-input-label">Message</label>
                  <textarea
                    className="form-custom-input"
                    rows="5"
                    placeholder="Tell me about your project or inquiry..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit-message"
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
                      Send Message via WhatsApp
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
