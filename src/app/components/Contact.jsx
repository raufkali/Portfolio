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
    AOS.init({ duration: 800, once: false });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const { name, email, message } = form;
    const whatsappMessage = `Hello Rauf!%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
    const whatsappNumber = (
      portfolioData.personal.whatsapp || "+923469258704"
    ).replace(/[^0-9]/g, "");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank",
      "noopener,noreferrer",
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
        {/* =====================================================
            SECTION HEADER
            ===================================================== */}
        <div className="contact-header" data-aos="fade-down">
          <div className="contact-eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            <span className="eyebrow-text">Get in Touch</span>
          </div>

          <h2 className="contact-title">Let's Work Together</h2>

          <p className="contact-subtitle">
            Have a project in mind, engineering inquiry, or software
            opportunity? Let's build something remarkable.
          </p>
        </div>

        {/* =====================================================
            GRID — info panel + form
            ===================================================== */}
        <div className="contact-grid">
          {/* ---------------- LEFT: CONTACT INFO ---------------- */}
          <aside className="contact-info" data-aos="fade-right">
            <header className="contact-panel-head">
              <span className="panel-kicker">Direct Channels</span>
              <h3 className="panel-title">Contact Information</h3>
              <p className="panel-subtitle">
                Available for full-time engineering roles, freelance contracts,
                and production web and desktop applications.
              </p>
            </header>

            <div className="contact-details">
              {/* Email */}
              <div className="contact-row">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fas fa-envelope" />
                </div>
                <div className="contact-row-body">
                  <span className="contact-label">Email</span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="contact-value contact-value-link"
                    aria-label={`Send email to ${personal.email}`}
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-row">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fab fa-whatsapp" />
                </div>
                <div className="contact-row-body">
                  <span className="contact-label">WhatsApp</span>
                  <a
                    href={`https://wa.me/${personal.whatsapp.replace(
                      /[^0-9]/g,
                      "",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value contact-value-link"
                    aria-label="Direct message on WhatsApp"
                  >
                    {personal.whatsapp}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-row">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fas fa-phone" />
                </div>
                <div className="contact-row-body">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">{personal.phone}</span>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-row">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fab fa-linkedin-in" />
                </div>
                <div className="contact-row-body">
                  <span className="contact-label">LinkedIn</span>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value contact-value-link"
                    aria-label="Visit LinkedIn Profile"
                  >
                    {personal.linkedin.replace("https://www.", "")}
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-row">
                <div className="contact-icon" aria-hidden="true">
                  <i className="fab fa-github" />
                </div>
                <div className="contact-row-body">
                  <span className="contact-label">GitHub</span>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value contact-value-link"
                    aria-label="Visit GitHub Profile"
                  >
                    {personal.github.replace("https://github.com/", "")}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${personal.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct"
              aria-label="Start direct WhatsApp conversation"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </aside>

          {/* ---------------- RIGHT: FORM ---------------- */}
          <div className="contact-form-wrap" data-aos="fade-left">
            <header className="contact-panel-head">
              <span className="panel-kicker">Quick Message</span>
              <h3 className="panel-title">Send a Message</h3>
              <p className="panel-subtitle">
                Fill out the details below to initiate an instant conversation
                on WhatsApp.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-field-label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact-input"
                  value={form.name}
                  placeholder="Enter your name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-field-label">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-input"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="contact-field">
                <label
                  htmlFor="contact-message"
                  className="contact-field-label"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="contact-input contact-textarea"
                  rows="5"
                  placeholder="Tell me about your project, idea, or inquiry..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={submitted}
                aria-label="Send message via WhatsApp"
              >
                {submitted ? (
                  <>
                    <span className="contact-spinner" aria-hidden="true" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp" aria-hidden="true" />
                    <span>Send Message via WhatsApp</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
