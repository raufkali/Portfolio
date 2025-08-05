"use client"; // if using app directory

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <nav className="container d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Rauf Ahmad</h2>
        <ul className="nav">
          <li className="nav-item">
            <Link href="#home" className="nav-link text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#about-info" className="nav-link text-white">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#skills" className="nav-link text-white">
              Skills
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#contact" className="nav-link text-white">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
