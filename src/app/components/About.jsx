"use client";
import Image from "next/image";
import profilePic from "@/public/images/profile.png"; // Change if needed
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="about" className="pt-5 container-fluid ps-5">
      <div className="row align-items-center" data-aos="fade-up">
        <div className="col-md-7 p-4 text-center p-relative bg-light rounded-5">
          <div className="lead p">
            Hi! I’m{" "}
            <section className="fw-bold h2 oswald-title ">Rauf Ahmad</section>{" "}
            Here you will Explore all about me
          </div>
        </div>
        <div className="col-md-5 ">
          <Image
            src={profilePic}
            alt="Profile Picture"
            className="border border-5 border-start-0 border-end-0 border-top-0 border-dark"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
