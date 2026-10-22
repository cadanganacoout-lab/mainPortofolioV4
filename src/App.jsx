import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import AboutSection from "./components/sections/AboutSection";
import CertificatesSection from "./components/sections/CertificatesSection";
import ContactSection from "./components/sections/ContactSection";
import HeroSection from "./components/sections/HeroSection";
import JourneySection from "./components/sections/JourneySection";
import ProjectsSection from "./components/sections/ProjectsSection";

function App() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text)] transition-colors duration-300">
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
