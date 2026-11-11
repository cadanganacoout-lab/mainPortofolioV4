import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import DetailBackHeader from "../components/layout/DetailBackHeader";
import ProjectsSection from "../components/sections/ProjectsSection";
import { useScrollReveal } from "../hooks/useScrollReveal";

function ProjectsPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = "Projects — Gilang Faid";
  }, []);

  return (
    <div className="portfolio-page detail-page projects-detail-page">
      <DetailBackHeader />

      <main id="main-content" className="detail-main" tabIndex="-1">
        <section id="projects" className="detail-hero projects-page-hero">
          <div className="detail-hero-copy reveal">
            <p className="eyebrow">SELECTED WORK / 2023—2026</p>
            <h1>
              Things I’ve
              <br />
              <em>made & learned.</em>
            </h1>
            <p className="detail-intro">
              Five class, web, mobile, and education projects that mark
              different steps in my learning journey.
            </p>
            <a href="#project-list" className="text-link detail-scroll-link">
              Scroll through the work <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="project-index-art reveal" aria-hidden="true">
            <div className="project-index-top">
              <span>GF / PROJECT INDEX</span>
              <span>05</span>
            </div>
            <div className="project-index-orbit">
              <span>MAKE</span>
              <i />
              <strong>
                LEARN
                <br />
                REPEAT
              </strong>
            </div>
            <div className="project-index-bottom">
              <span>WEB · MOBILE · EXPERIMENTS</span>
              <span>2026</span>
            </div>
          </div>
        </section>

        <ProjectsSection />
      </main>
    </div>
  );
}

export default ProjectsPage;
