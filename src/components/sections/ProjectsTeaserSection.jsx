import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "../shared/TypewriterText";

function ProjectsTeaserSection() {
  const [isTitleComplete, setIsTitleComplete] = useState(false);

  return (
    <section id="projects" className="landing-section projects-teaser-section">
      <div className="landing-section-inner">
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
      </div>
    </section>
  );
}

export default ProjectsTeaserSection;
