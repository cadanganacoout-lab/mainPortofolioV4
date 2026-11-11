import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "../shared/TypewriterText";

function AboutTeaserSection() {
  return (
    <section id="about" className="landing-section about-teaser-section">
      <div className="landing-section-inner">
        <div className="teaser-heading reveal">
          <h2>
            <TypewriterText
              text={"Curiosity is\nwhere it begins."}
              emphasis="where it begins."
            />
          </h2>
          <Link to="/about" className="button-spiral teaser-cta">
            About <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutTeaserSection;
