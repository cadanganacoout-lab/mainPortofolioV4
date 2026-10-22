import { ArrowUpRight, Mail } from "lucide-react";
import { socialLinks } from "../../data/portfolio";

function ContactSection() {
  return (
    <section id="contact" className="section-space pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="contact-panel reveal">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-content">
            <p className="eyebrow">05 / WHAT’S NEXT? LET’S...</p>
            <h2>
              Make something
              <br />
              <span>meaningful.</span>
            </h2>
            <p>
              Have an idea, an internship opportunity, or just want to talk
              about technology? I’d love to hear from you.
            </p>

            <a href="mailto:cadanganacoout@gmail.com" className="button-dark">
              <Mail size={16} />
              Send me an email
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="contact-aside">
            <span className="contact-aside-label">FIND ME ON</span>

            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="contact-social"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}

            <a
              href="https://wa.me/6288991531800"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              WhatsApp
              <ArrowUpRight size={14} />
            </a>

            <span className="contact-phone">
              0889-9153-1800 · MESSAGE ONLY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
