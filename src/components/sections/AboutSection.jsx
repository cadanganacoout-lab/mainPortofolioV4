import { missions } from "../../data/portfolio";

function AboutSection() {
  return (
    <section id="about" className="section-space">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="eyebrow">01 / ABOUT ME</p>
          <h2>
            Curiosity is
            <br />
            <span>where it all begins.</span>
          </h2>
        </div>

        <div className="about-grid mt-10 grid gap-8">
          <div className="about-story space-y-6 reveal">
            <p className="text-lg leading-8 text-[var(--muted)]">
              I became interested in computers in junior high, when I tinkered
              with a personal blog and wondered how a webpage could feel
              “alive.” That curiosity led me to teach myself through video
              tutorials before pursuing a formal education in a field I love.
            </p>
            <p className="text-lg leading-8 text-[var(--muted)]">
              I chose Software Engineering because I want to understand how to
              build applications from the ground up—from program logic and
              interface design to creating something people can actually use.
              To me, it’s a practical way to turn ideas into something real.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {["Frontend enthusiast", "Learning every day"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="about-highlights space-y-6 reveal">
            <div className="vision-card">
              <span className="code-note-label">VISION</span>
              <p>
                To become a software engineer who builds useful, intuitive
                digital products to a professional standard.
              </p>
            </div>

            <div className="mission-block">
              <h3>What I’m working toward</h3>
              <ol>
                {missions.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
