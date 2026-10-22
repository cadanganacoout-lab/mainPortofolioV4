import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projectData } from "../../data/portfolio";

function ProjectsSection() {
  return (
    <section id="work" className="section-space">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-topline">
          <div className="section-heading">
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2>
              Made with
              <br />
              <span>care and curiosity.</span>
            </h2>
          </div>
          <p className="section-side-note">
            A few small milestones in my learning journey.
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          {projectData.map((project) => (
            <article key={project.number} className="project-card reveal">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className={`project-visual visual-${project.visual}`}
                aria-label={`View ${project.title} (opens in a new tab)`}
              >
                <span className="visual-topline">
                  <span>PROJECT / {project.number}</span>
                  <ArrowUpRight size={18} />
                </span>

                <span className="visual-decoration" aria-hidden="true">
                  {project.visual === "mobile" ? (
                    <span className="phone-outline">
                      <span />
                    </span>
                  ) : (
                    <span className="visual-orbit">
                      <span>{project.visualLabel}</span>
                    </span>
                  )}
                </span>

                <span className="visual-caption">
                  <strong>{project.visualLabel}</strong>
                  <span>{project.visualNote}</span>
                </span>
              </a>

              <div className="project-info">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>2026</span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="technology-list">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <button type="button" className="project-preview-button">
                    Preview live
                    <ArrowUpRight size={14} />
                  </button>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-external-link"
                  >
                    Open site
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
