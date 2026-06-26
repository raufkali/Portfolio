"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { portfolioData } from "../../../lib/portfolioData";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const { name } = portfolioData.personal;

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className="container navbar">
        <Link href="#about" className="navbar-brand oswald">
          {name}
        </Link>

        <button
          className={`navbar-toggler ${menuOpen ? "active" : ""}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Mobile menu – custom controlled */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <ul className="navbar-nav">
            <li>
              <Link href="#about" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="#about-info" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link href="#experience" onClick={closeMenu}>
                Experience
              </Link>
            </li>
            <li>
              <Link href="#projects" onClick={closeMenu}>
                Projects
              </Link>
            </li>
            <li>
              <Link href="#skills" onClick={closeMenu}>
                Skills
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
