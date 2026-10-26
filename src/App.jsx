import { useEffect } from "react";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import AboutSection from "./components/sections/AboutSection";
import CertificatesSection from "./components/sections/CertificatesSection";
import ContactSection from "./components/sections/ContactSection";
import HeroSection from "./components/sections/HeroSection";
import JourneySection from "./components/sections/JourneySection";
import ProjectsSection from "./components/sections/ProjectsSection";

function App() {
  useEffect(() => {
    document.title = "Gilang Faid";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return undefined;

    document.body.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.body.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[4.5rem] text-[var(--text)] transition-colors duration-300">
      <SiteHeader />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <JourneySection />
        <CertificatesSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
