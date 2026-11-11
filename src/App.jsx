import { useEffect } from "react";
import SiteHeader from "./components/layout/SiteHeader";
import AboutTeaserSection from "./components/sections/AboutTeaserSection";
import ContactSection from "./components/sections/ContactSection";
import HeroSection from "./components/sections/HeroSection";
import ProjectsTeaserSection from "./components/sections/ProjectsTeaserSection";
import { useLandingSectionScroll } from "./hooks/useLandingSectionScroll";
import { useScrollReveal } from "./hooks/useScrollReveal";

function App() {
  useLandingSectionScroll();
  useScrollReveal();

  useEffect(() => {
    document.title = "Gilang Faid — Portfolio";
    document.documentElement.classList.add("snap-landing");
    return () => {
      document.documentElement.classList.remove("snap-landing");
    };
  }, []);

  return (
    <div className="portfolio-page landing-page">
      <SiteHeader />

      <main id="main-content" className="landing-main" tabIndex="-1">
        <HeroSection />
        <AboutTeaserSection />
        <ProjectsTeaserSection />
      </main>
      <ContactSection />
    </div>
  );
}

export default App;
