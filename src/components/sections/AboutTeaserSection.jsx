import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "../shared/TypewriterText";

function AboutTeaserSection() {
  const [isTitleComplete, setIsTitleComplete] = useState(false);

  return (
    <section id="about" className="landing-section about-teaser-section">
      <div className="landing-section-inner">
        <div className="teaser-heading reveal">
          <h2>
            <TypewriterText
              text={"Curiosity is\nwhere it begins."}
              emphasis="where it begins."
              onTypingStart={() => setIsTitleComplete(false)}
              onTypingComplete={() => setIsTitleComplete(true)}
              onTypingReset={() => setIsTitleComplete(false)}
            />
          </h2>
          <Link
            to="/about"
            className={`button-spiral teaser-cta${isTitleComplete ? " is-visible" : ""}`}
            aria-hidden={!isTitleComplete}
            tabIndex={isTitleComplete ? 0 : -1}
            inert={!isTitleComplete}
          >
            About <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutTeaserSection;
