import { CodeXml } from "lucide-react";
import {
  educationData,
  skillData,
  skillGroups,
  toolList,
} from "../../data/portfolio";

function JourneySection() {
  const marqueeTools = [...toolList, ...toolList];

  return (
    <section id="journey" className="section-space">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="journey-grid">
          <div className="journey-intro reveal">
            <p className="eyebrow">03 / JOURNEY & SKILLS</p>
            <h2>
              Always learning.
              <br />
              <span>Always growing.</span>
            </h2>
            <p>
              My goal is to become a software engineer who builds useful,
              user-friendly digital products to a professional standard.
            </p>

            <div className="learning-card">
              <span className="learning-icon">
                <CodeXml size={20} />
              </span>
              <span>
                <span className="code-note-label">MY MOTTO</span>
                <strong>consistency &gt; intensity</strong>
              </span>
            </div>
          </div>

          <div className="journey-details reveal">
            <div className="detail-block">
              <div className="detail-heading">
                <h3>Education</h3>
                <span>2016 — PRESENT</span>
              </div>

              <ol className="education-list">
                {educationData.map((item) => (
                  <li key={item.school}>
                    <span>{item.period}</span>
                    <div>
                      <strong>{item.school}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="detail-block skills-block">
              <div className="detail-heading">
                <h3>Languages & technologies</h3>
                <span>ALWAYS IN PROGRESS</span>
              </div>

              <div className="skill-group-grid">
                {skillGroups.map((group) => (
                  <div key={group.title} className="skill-group-card">
                    <h4>{group.title}</h4>
                    <div className="skill-group-list">
                      {group.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="skill-grid">
                {skillData.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-meta">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <span style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="marquee-wrap" aria-label="Tools I use">
                <div className="marquee-track">
                  {marqueeTools.map((tool, index) => (
                    <span key={`${tool}-${index}`} className="tool-pill">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
