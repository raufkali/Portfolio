"use client"; // if using app directory

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
const Header = () => {
  return (
    <header className="bg-dark text-white header">
      <nav className="container navbar navbar-dark text-white navbar-expand d-flex justify-content-between align-items-center">
        <h2 className="mb-0 oswald navbar-brand">Rauf Ahmad</h2>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="#home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#about-info" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#skills" className="nav-link">
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
