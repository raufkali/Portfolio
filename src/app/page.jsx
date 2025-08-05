import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import AboutInfo from "./components/AboutInfo";
export default function Home() {
  return (
    <main>
      <Header />
      <About />
      <AboutInfo />
      <Skills />
      <Hobbies />
      <Contact />
      <ScrollToTop />
    </main>
  );
}
