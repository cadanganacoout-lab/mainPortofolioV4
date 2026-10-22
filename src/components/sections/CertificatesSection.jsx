import { certificates } from "../../data/portfolio";

function CertificatesSection() {
  return (
    <section id="certificates" className="section-space">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-topline">
          <div className="section-heading">
            <p className="eyebrow">04 / CERTIFICATES</p>
            <h2>
              Experiences that
              <br />
              <span>shaped my journey.</span>
            </h2>
          </div>
          <p className="section-side-note">
            Activities and milestones from my learning journey.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {certificates.map((certificate) => (
            <div key={certificate.number} className="certificate-card">
              <div className="certificate-image-wrap">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="certificate-image"
                />
              </div>
              <div className="certificate-content">
                <span>{certificate.number}</span>
                <h3>{certificate.title}</h3>
                <p>
                  {certificate.issuer} · {certificate.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificatesSection;
