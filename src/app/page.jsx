import Header from "./components/Header";
import About from "./components/About";
import AboutInfo from "./components/AboutInfo";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppWidget from "./components/WhatsAppWidget";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/globals.css";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <AboutInfo />
      <Experience />
      <Projects />
      <Skills />
      <Hobbies />
      <Contact />
      <ScrollToTop />
      <WhatsAppWidget />
    </>
  );
}
