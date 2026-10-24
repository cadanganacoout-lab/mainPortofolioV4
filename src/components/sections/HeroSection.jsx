import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CodeXml,
  Copy,
  MapPin,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { emailAddress } from "../../data/portfolio";

function HeroSection() {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = emailAddress;
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      document.body.removeChild(fallback);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <section id="home" className="section-shell">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-16 lg:pt-20">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="space-y-7"
        >
          <span className="eyebrow">
            <span className="status-dot" />
            CURRENTLY INTERNING
          </span>

          <div className="space-y-4">
            <h1 className="hero-title">
              Hi, I’m
              <br />
              <span>Gilang.</span>
            </h1>
            <p className="hero-description">
              I’m a Software Engineering student who loves turning ideas and
              lines of code into lively digital experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#work" className="button-primary">
              View my work
              <ArrowDown size={16} />
            </a>
            <a href="#contact" className="text-link">
              Let’s connect
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="copy-button"
              aria-label="Copy email address"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Email copied" : "Copy email"}
            </button>
            <a href="mailto:cadanganacoout@gmail.com" className="text-link">
              {emailAddress}
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <MapPin size={15} />
            Surabaya, East Java, Indonesia
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="profile-card">
            <div className="profile-card-top">
              <span>PORTFOLIO / 2026</span>
              <span className="profile-card-spark">✳</span>
            </div>

            <div className="monogram">GF</div>

            <div className="profile-card-bottom">
              <div>
                <strong>Gilang Faid</strong>
                <span>Software Engineering student · Grade 11</span>
              </div>
              <span className="profile-card-arrow">
                <ArrowUpRight size={19} />
              </span>
            </div>
          </div>

          <div className="code-note">
            <span className="code-note-icon">
              <CodeXml size={17} />
            </span>
            <span>
              <span className="code-note-label">CURRENTLY LEARNING</span>
              <strong>Web development</strong>
            </span>
          </div>

          <span className="hero-coordinate">07°52' S · 111°28' E</span>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-[var(--line)] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] sm:px-6 lg:px-8">
        <span>WEB DEVELOPER · STUDENT · LIFELONG LEARNER</span>
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-[var(--text)]"
        >
          Scroll to explore
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
