import { useState } from "react";
import { certificates } from "../../data/portfolio";
import "../../styles/certificate-fan.css";

function CertificatesSection() {
  const [hoveredNumber, setHoveredNumber] = useState(null);
  const [focusedNumber, setFocusedNumber] = useState(null);
  const [pinnedNumber, setPinnedNumber] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const activeNumber = focusedNumber ?? hoveredNumber ?? pinnedNumber;

  return (
    <section
      id="milestones"
      className="section-space certificate-section"
      onPointerLeave={() => setHoveredNumber(null)}
      onFocusCapture={(event) => {
        const card = event.target.closest("[data-certificate-number]");
        if (card) setFocusedNumber(card.dataset.certificateNumber);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusedNumber(null);
        }
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-topline">
          <div className="section-heading">
            <p className="eyebrow">04 / SOCIAL PROOF</p>
            <h2>
              Experiences that
              <br />
              <span>shaped my journey.</span>
            </h2>
          </div>
          <p className="section-side-note">
            Activities and milestones that show my growth, curiosity, and
            commitment to learning.
          </p>
        </div>

        <p className="certificate-fan-instruction">
          Hover or focus to spotlight · Tap to pin
        </p>

        <div
          className={`certificate-fan${activeNumber ? " has-spotlight" : ""}`}
        >
          {certificates.map((certificate, index) => (
            <button
              key={certificate.number}
              type="button"
              className={`certificate-card certificate-fan-card${activeNumber === certificate.number ? " is-active" : ""}`}
              data-certificate-number={certificate.number}
              aria-label={`Spotlight ${certificate.title}, ${certificate.issuer}, ${certificate.year}`}
              aria-pressed={pinnedNumber === certificate.number}
              style={{ "--certificate-order": index }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  setHoveredNumber(certificate.number);
                }
              }}
              onClick={() => {
                const isPinned = pinnedNumber === certificate.number;
                setPinnedNumber(isPinned ? null : certificate.number);
                setStatusMessage(
                  isPinned
                    ? `${certificate.title} spotlight released.`
                    : `${certificate.title} pinned in the spotlight.`,
                );
              }}
            >
              <span className="certificate-image-wrap">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="certificate-image"
                  loading="lazy"
                />
              </span>
              <span className="certificate-content">
                <span className="certificate-number">
                  {certificate.number} / MILESTONE
                </span>
                <span className="certificate-title">{certificate.title}</span>
                <span className="certificate-issuer">
                  {certificate.issuer} · {certificate.year}
                </span>
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {statusMessage}
        </p>

        <div className="achievement-summary">
          <div>
            <span className="code-note-label">ACTIVE GROWTH</span>
            <strong>
              Developing skills through real projects, competitions, and
              learning communities.
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificatesSection;
