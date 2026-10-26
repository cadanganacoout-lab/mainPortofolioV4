import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, LoaderCircle, Mail } from "lucide-react";
import { emailAddress, socialLinks } from "../../data/portfolio";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [copied, setCopied] = useState(false);
  const formStartedAt = useRef(Date.now());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: event.currentTarget.elements.website.value,
          formStartedAt: formStartedAt.current,
        }),
      });
      const responseText = await response.text();
      let result;

      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        result = null;
      }

      if (!result || typeof result !== "object" || Array.isArray(result)) {
        throw new Error(
          response.ok
            ? "The contact service returned an empty or invalid response. Please try again later."
            : `The contact service returned an invalid response (HTTP ${response.status}). Please try again later.`,
        );
      }

      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent. Please try again.");
      }

      setStatus({
        type: "success",
        message: "Thanks! Your message has been sent.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      formStartedAt.current = Date.now();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof TypeError
            ? "Could not connect to the contact service. Please try again."
            : error.message,
      });
    }
  };

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

            <div className="contact-cta-row">
              <a href="mailto:langgdeveloper@gmail.com" className="button-dark">
                <Mail size={16} />
                Send me an email
                <ArrowUpRight size={16} />
              </a>
              <button type="button" onClick={handleCopyEmail} className="copy-button copy-button-dark">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              aria-busy={status.type === "loading"}
            >
              <label className="contact-honeypot" aria-hidden="true">
                Leave this field empty
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <div className="contact-form-grid">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  aria-label="Your name"
                  autoComplete="name"
                  maxLength={120}
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  aria-label="Your email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Project or opportunity title"
                aria-label="Project or opportunity title"
                maxLength={160}
                required
                value={formData.subject}
                onChange={handleChange}
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Tell me more about your idea, role, or project."
                aria-label="Message"
                maxLength={5000}
                required
                value={formData.message}
                onChange={handleChange}
              />

              <div className="contact-form-actions">
                <button
                  type="submit"
                  className="button-primary button-compact"
                  disabled={status.type === "loading"}
                >
                  {status.type === "loading" ? (
                    <>
                      <LoaderCircle size={16} className="loading-spinner" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
                <a href="https://wa.me/6288991531800" target="_blank" rel="noreferrer" className="text-link">
                  Message on WhatsApp
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {status.message && (
                <div
                  className={`form-status form-status-${status.type}`}
                  role={status.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>

          <div className="contact-aside">
            <div className="contact-social-list">
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

            <figure className="contact-portrait">
              <img
                src="/images/profil/gilangfaid.webp"
                alt="Dummy formal portrait placeholder"
              />
              <figcaption>
                <span>GILANG FAID</span>
                <strong>Web Developer · UI/UX Designer</strong>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
