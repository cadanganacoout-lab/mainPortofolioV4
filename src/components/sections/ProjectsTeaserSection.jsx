import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectData } from "../../data/portfolio";
import TypewriterText from "../shared/TypewriterText";

function ProjectsTeaserSection() {
  const featuredProject =
    projectData.find((project) => project.number === "05") ?? projectData[0];

  return (
    <section id="projects" className="landing-section projects-teaser-section">
      <div className="landing-section-inner projects-teaser-layout">
        <div className="teaser-heading projects-teaser-heading reveal">
          <h2>
            <TypewriterText
              text={"Selected\nwork."}
              emphasis="work."
            />
          </h2>
          <Link to="/projects" className="button-spiral teaser-cta">
            Projects <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="featured-project-teaser reveal">
          <div
            className={`featured-project-art visual-${featuredProject.visual}`}
            aria-hidden="true"
          >
            <strong>{featuredProject.visualLabel}</strong>
            <i>{featuredProject.number}</i>
          </div>
          <div className="featured-project-copy">
            <h3>{featuredProject.title}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsTeaserSection;
