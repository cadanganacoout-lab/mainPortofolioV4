import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "../shared/TypewriterText";

function HeroSection() {
  return (
    <section id="home" className="landing-section home-section">
      <div className="landing-section-inner home-layout">
        <div className="home-copy reveal">
          <h1 className="hero-title">
            <TypewriterText
              text={"Hi, I’m\nGilang."}
              emphasis="Gilang."
            />
          </h1>
          <Link
            to="#about"
            className="scroll-cue"
            aria-label="Scroll to About section"
          >
            <ArrowDown size={20} aria-hidden="true" />
          </Link>
        </div>

        <figure className="home-portrait reveal">
          <img
            src="/images/profil/gilangfaid.webp"
            alt="Portrait of Gilang Faid"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}

export default HeroSection;
