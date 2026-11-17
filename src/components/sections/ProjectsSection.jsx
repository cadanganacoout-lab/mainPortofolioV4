import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  X,
} from "lucide-react";
import { projectData } from "../../data/portfolio";
import "../../styles/project-bento.css";

const caseStudyFields = [
  { key: "problem", label: "Problem statement" },
  { key: "role", label: "My role" },
  { key: "challenge", label: "Technical challenge" },
  { key: "solution", label: "Solution" },
  { key: "outcome", label: "Verified outcome" },
];

function getDocumentedCaseStudy(project) {
  return caseStudyFields.filter(({ key }) => {
    const detail = project?.caseStudy?.[key];
    return typeof detail === "string" && detail.trim().length > 0;
  });
}

function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewProjectId, setPreviewProjectId] = useState(null);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [caseStudyProject, setCaseStudyProject] = useState(null);
  const modalCloseButtonRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const activeProject = projectData[activeIndex];
  const documentedCaseStudy = getDocumentedCaseStudy(caseStudyProject);
  const activeProjectDomain = new URL(activeProject.href).hostname;
  const isPreviewOpen = previewProjectId === activeProject.number;

  const selectProject = (index) => {
    setActiveIndex((index + projectData.length) % projectData.length);
    setPreviewProjectId(null);
    setPreviewFailed(false);
  };

  useEffect(() => {
    if (!caseStudyProject) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalCloseButtonRef.current?.focus();

    const handleDialogKeys = (event) => {
      if (event.key === "Escape") {
        setCaseStudyProject(null);
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
  }, [caseStudyProject]);

  return (
    <>
      <section id="project-list" className="section-space project-showcase">
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
              Class, web, mobile, and education projects with their original
              summaries and links.
            </p>
          </div>

          <div className="project-showcase-controls">
            <div
              className="project-showcase-picker"
              role="group"
              aria-label="Choose a project"
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectProject(activeIndex - 1);
                } else if (event.key === "ArrowRight") {
                  event.preventDefault();
                  selectProject(activeIndex + 1);
                }
              }}
            >
              {projectData.map((project, index) => (
                <button
                  key={project.number}
                  type="button"
                  className="project-showcase-pick"
                  aria-label={`Show project ${project.number}: ${project.title}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => selectProject(index)}
                >
                  {project.number}
                </button>
              ))}
            </div>

            <div className="project-showcase-stepper">
              <button
                type="button"
                className="project-step-button"
                onClick={() => selectProject(activeIndex - 1)}
                aria-label="Previous project"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Previous</span>
              </button>
              <span className="project-showcase-count" aria-hidden="true">
                {activeProject.number} / {String(projectData.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="project-step-button"
                onClick={() => selectProject(activeIndex + 1)}
                aria-label="Next project"
              >
                <span>Next</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Project {activeProject.number} of {projectData.length}: {activeProject.title}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProject.number}
              className="project-bento-grid"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -5 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-label={`${activeProject.title} project details`}
            >
              <article className="project-bento-tile project-bento-preview">
                <div
                  className={`project-visual visual-${activeProject.visual}${isPreviewOpen ? " is-live-preview" : ""}`}
                  aria-hidden={!isPreviewOpen}
                >
                  {isPreviewOpen ? (
                    <iframe
                      className="project-live-preview"
                      id={`project-preview-${activeProject.number}`}
                      src={activeProject.href}
                      title={`${activeProject.title} live preview`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-forms"
                      onError={() => setPreviewFailed(true)}
                    />
                  ) : (
                    <>
                      <span className="visual-topline">
                        <span>PROJECT / {activeProject.number}</span>
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </span>
                      <span className="visual-decoration" aria-hidden="true">
                        {activeProject.visual === "mobile" ? (
                          <span className="phone-outline">
                            <span />
                          </span>
                        ) : (
                          <span className="visual-orbit">
                            <span>{activeProject.visualLabel}</span>
                          </span>
                        )}
                      </span>
                      <span className="visual-caption">
                        <strong>{activeProject.visualLabel}</strong>
                        <span>{activeProject.visualNote}</span>
                      </span>
                    </>
                  )}
                </div>
                <span className="project-bento-tile-index">01 / VISUAL</span>
              </article>

              <article className="project-bento-tile project-bento-identity">
                <div className="project-bento-tile-heading">
                  <span className="project-bento-label">Project identity</span>
                  <span className="project-bento-tile-index">
                    {activeProject.number}
                  </span>
                </div>
                <div>
                  <span className="project-bento-category">
                    {activeProject.category}
                  </span>
                  <h3>{activeProject.title}</h3>
                  <p>{activeProject.description}</p>
                </div>
              </article>

              <article className="project-bento-tile project-bento-stack">
                <div className="project-bento-tile-heading">
                  <span className="project-bento-label">Built with</span>
                  <span className="project-bento-tile-index">
                    {String(activeProject.technologies.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="technology-list">
                  {activeProject.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </article>

              <article className="project-bento-tile project-bento-note">
                <span className="project-bento-label">Project note</span>
                <p>{activeProject.visualNote}</p>
                <span className="project-bento-tile-index">03 / SNAPSHOT</span>
              </article>

              <article className="project-bento-tile project-bento-facts">
                <span className="project-bento-label">Live domain</span>
                <strong>{activeProjectDomain}</strong>
                <span className="project-bento-fact-caption">
                  {activeProject.category} · {activeProject.technologies.length} technologies
                </span>
              </article>

              <article className="project-bento-tile project-bento-actions">
                <div>
                  <span className="project-bento-label">Explore this project</span>
                  <p>Open the project or explore its live preview.</p>
                </div>
                <div className="project-actions">
                  <button
                    type="button"
                    className="project-preview-button"
                    aria-controls={
                      isPreviewOpen
                        ? `project-preview-${activeProject.number}`
                        : undefined
                    }
                    aria-expanded={isPreviewOpen}
                    onClick={() => {
                      setPreviewFailed(false);
                      setPreviewProjectId((currentId) =>
                        currentId === activeProject.number
                          ? null
                          : activeProject.number,
                      );
                    }}
                  >
                    {isPreviewOpen ? "Hide preview" : "Preview live"}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                  {getDocumentedCaseStudy(activeProject).length > 0 && (
                    <button
                      type="button"
                      className="project-preview-button"
                      onClick={() => setCaseStudyProject(activeProject)}
                    >
                      View case study
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </button>
                  )}
                  <a
                    href={activeProject.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-external-link"
                  >
                    Open site
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
                {isPreviewOpen && (
                  <p className="project-preview-note" role="status">
                    {previewFailed
                      ? "The preview could not be displayed. Open the project in a new tab instead."
                      : "Some sites do not allow embedded previews. Open the project in a new tab if it stays blank."}
                  </p>
                )}
              </article>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {caseStudyProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setCaseStudyProject(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={modalCloseButtonRef}
              className="project-modal-close"
              onClick={() => setCaseStudyProject(null)}
              aria-label="Close case study"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="project-modal-header">
              <span className="eyebrow">
                CASE STUDY / {caseStudyProject.number}
              </span>
              <h3 id="project-modal-title">{caseStudyProject.title}</h3>
              <p>{caseStudyProject.description}</p>
            </div>

            <div className="project-modal-grid">
              {documentedCaseStudy.map(({ key, label }) => (
                <div key={key} className="project-modal-card">
                  <h4>{label}</h4>
                  <p>{caseStudyProject.caseStudy[key]}</p>
                </div>
              ))}
            </div>

            <div className="project-modal-footer">
              <div>
                <span className="project-modal-label">Tech stack</span>
                <div className="technology-list">
                  {caseStudyProject.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-modal-actions">
              <a
                href={caseStudyProject.href}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                Open live site
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="text-link"
                onClick={() => setCaseStudyProject(null)}
              >
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
