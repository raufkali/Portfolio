"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Contact.css";
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${form.name}!`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="text-white ps-3 bg-dark">
      <div className=" d-flex g-5 align-items-stretch">
        {/* Left Panel - Contact Info */}
        <div className="col-md-6" data-aos="fade-right">
          <div className="bg-white contact-card border border-4 rounded-5 mt-4  border-dark text-dark ps-5 p-4 h-100">
            <h2 className="text-center  mb-5 oswald-title" data-aos="fade-down">
              CONTACT ME
            </h2>
            <h4>
              <i className="fas fa-envelope me-2 mb-3"></i>{" "}
              your-email@example.com
            </h4>
            <h4>
              <i className="fab fa-whatsapp me-2 mb-3"></i> +92-3469258704{" "}
            </h4>
            <h4>
              <i className="fas fa-phone me-2 mb-3"></i> +92-3469258704
            </h4>
            <h4>
              <i className="fab fa-linkedin me-2 mb-3"></i>{" "}
              <a
                href="https://linkedin.com/in/yourprofile"
                className="text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/rufiii
              </a>
            </h4>
          </div>
        </div>

        {/* Right Panel - Contact Form */}
        <div className="col-md-6" data-aos="fade-left">
          <div className="p-4 form-card bg-dark h-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-white">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  placeholder="Enter your name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter your message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-light w-100">
                <i className="fas fa-paper-plane me-2"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
