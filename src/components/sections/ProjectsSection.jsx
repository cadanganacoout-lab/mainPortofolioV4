import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { projectData } from "../../data/portfolio";

const caseStudyFields = [
  { key: "problem", label: "Problem statement" },
  { key: "role", label: "My role" },
  { key: "challenge", label: "Technical challenge" },
  { key: "solution", label: "Solution" },
  { key: "outcome", label: "Verified outcome" },
];

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewProjectId, setPreviewProjectId] = useState(null);
  const closeButtonRef = useRef(null);
  const documentedCaseStudy = caseStudyFields.filter(({ key }) => {
    const detail = selectedProject?.caseStudy?.[key];
    return typeof detail === "string" && detail.trim().length > 0;
  });

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleDialogKeys = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = [
        ...document.querySelectorAll(
          ".project-modal a[href], .project-modal button:not([disabled])",
        ),
      ];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeys);
    return () => {
      document.removeEventListener("keydown", handleDialogKeys);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [selectedProject]);

  return (
    <>
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

          <div className="project-grid mt-10 grid gap-6">
            {projectData.map((project) => (
              <article key={project.number} className="project-card reveal">
                <div
                  className={`project-visual visual-${project.visual}`}
                >
                  {previewProjectId === project.number ? (
                    <iframe
                      className="project-live-preview"
                      src={project.href}
                      title={`${project.title} live preview`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-forms"
                    />
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                <div className="project-info">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>PROJECT / {project.number}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="technology-list">
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button
                      ref={closeButtonRef}
                      type="button"
                      className="project-preview-button"
                      aria-expanded={previewProjectId === project.number}
                      onClick={() =>
                        setPreviewProjectId((currentId) =>
                          currentId === project.number ? null : project.number,
                        )
                      }
                    >
                      {previewProjectId === project.number
                        ? "Hide preview"
                        : "Preview live"}
                      <ArrowUpRight size={14} />
                    </button>
                    <button
                      type="button"
                      className="project-preview-button"
                      onClick={() => setSelectedProject(project)}
                    >
                      View case study
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

      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close case study"
            >
              <X size={18} />
            </button>

            <div className="project-modal-header">
              <span className="eyebrow">CASE STUDY / {selectedProject.number}</span>
              <h3 id="project-modal-title">{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
            </div>

            {documentedCaseStudy.length ? (
              <div className="project-modal-grid">
                {documentedCaseStudy.map(({ key, label }) => (
                  <div key={key} className="project-modal-card">
                    <h4>{label}</h4>
                    <p>{selectedProject.caseStudy[key]}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="case-study-pending" role="note">
                Project-specific problem, role, challenges, solution, and
                outcomes are not documented yet. Add only verified details to
                the project&apos;s <code>caseStudy</code> data before publishing.
              </div>
            )}

            <div className="project-modal-footer">
              <div>
                <span className="project-modal-label">Tech stack</span>
                <div className="technology-list">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-modal-actions">
              <a href={selectedProject.href} target="_blank" rel="noreferrer" className="button-primary">
                Open live site
                <ArrowUpRight size={15} />
              </a>
              <button type="button" className="text-link" onClick={() => setSelectedProject(null)}>
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsSection;
