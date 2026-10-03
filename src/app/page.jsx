import Header from "./components/Header";
import About from "./components/About";
import AboutInfo from "./components/AboutInfo";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <AboutInfo />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Achievements />
      <Certifications />
      <Hobbies />
      <Contact />
      <ScrollToTop />
      <WhatsAppWidget />
    </>
  );
}
