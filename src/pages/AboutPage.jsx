import { useEffect } from "react";
import SiteHeader from "../components/layout/SiteHeader";
import AboutSection from "../components/sections/AboutSection";
import CertificatesSection from "../components/sections/CertificatesSection";
import JourneySection from "../components/sections/JourneySection";
import { useScrollReveal } from "../hooks/useScrollReveal";

function AboutPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = "About — Gilang Faid";
  }, []);

  return (
    <div className="portfolio-page detail-page about-detail-page">
      <SiteHeader showSidebar={false} />

      <main id="main-content" className="detail-main" tabIndex="-1">
        <AboutSection />
        <JourneySection />
        <CertificatesSection />
      </main>
    </div>
  );
}

export default AboutPage;
