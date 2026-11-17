import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../../styles/project-bento.css";
import TypewriterText from "../shared/TypewriterText";

const topMottoLines = ["LEARN", "MAKE", "BUILD", "REPEAT"];
const leftMottoLines = [
  "CONSISTENCY",
  "> INTENSITY",
  "CONSISTENCY",
  "> INTENSITY",
];
const rightMottoLines = ["ALWAYS", "LEARNING", "ALWAYS", "GROWING"];

function ProjectsTeaserSection() {
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="landing-section projects-teaser-section">
      <div className="landing-section-inner projects-teaser-layout">
        <div className="teaser-heading reveal">
          <h2>
            <TypewriterText
              text={"Selected\nwork."}
              emphasis="work."
              onTypingStart={() => setIsTitleComplete(false)}
              onTypingComplete={() => setIsTitleComplete(true)}
              onTypingReset={() => setIsTitleComplete(false)}
            />
          </h2>
          <Link
            to="/projects"
            className={`button-spiral teaser-cta${isTitleComplete ? " is-visible" : ""}`}
            aria-hidden={!isTitleComplete}
            tabIndex={isTitleComplete ? 0 : -1}
            inert={!isTitleComplete}
          >
            Projects <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <motion.figure
          className="project-motto-figure"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="project-motto-stage">
            <div
              className="motto-cube-art"
              role="img"
              aria-label="Floating typographic cube: learn, make, build, repeat; consistency is greater than intensity; always learning and growing."
            >
              <svg
                className="motto-cube-svg"
                viewBox="0 0 500 500"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="motto-cube-top-clip">
                    <rect width="300" height="160" />
                  </clipPath>
                  <clipPath id="motto-cube-left-clip">
                    <rect width="300" height="190" />
                  </clipPath>
                  <clipPath id="motto-cube-right-clip">
                    <rect width="300" height="190" />
                  </clipPath>
                </defs>

                <g
                  className="motto-cube-text motto-cube-text-top"
                  transform="matrix(0.617 0.35 -1.156 0.656 250 40)"
                  clipPath="url(#motto-cube-top-clip)"
                >
                  {topMottoLines.map((line, index) => (
                    <text
                      key={`${line}-${index}`}
                      x="15"
                      y={32 + index * 36}
                      textLength="270"
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {line}
                    </text>
                  ))}
                </g>
                <g
                  className="motto-cube-text motto-cube-text-left"
                  transform="matrix(0.617 0.35 0 1.05 65 145)"
                  clipPath="url(#motto-cube-left-clip)"
                >
                  {leftMottoLines.map((line, index) => (
                    <text
                      key={`${line}-${index}`}
                      x="15"
                      y={38 + index * 44}
                      textLength="270"
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {line}
                    </text>
                  ))}
                </g>
                <g
                  className="motto-cube-text motto-cube-text-right"
                  transform="matrix(-0.617 0.35 0 1.05 435 145)"
                  clipPath="url(#motto-cube-right-clip)"
                >
                  {rightMottoLines.map((line, index) => (
                    <text
                      key={`${line}-${index}`}
                      x="15"
                      y={38 + index * 44}
                      textLength="270"
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}

export default ProjectsTeaserSection;
