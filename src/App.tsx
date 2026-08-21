import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { EducationLanguages } from "./components/EducationLanguages";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

function App() {
  return (
    <div className="min-h-screen bg-evergreen text-white-smoke" id="top">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <EducationLanguages />
      </main>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
