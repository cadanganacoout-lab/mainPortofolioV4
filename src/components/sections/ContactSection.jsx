import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, LoaderCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { emailAddress, socialLinks } from "../../data/portfolio";
import { FaWhatsapp } from "react-icons/fa6";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [copied, setCopied] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
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
    <footer id="contact" className="landing-contact-footer">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="contact-panel reveal">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-content">
            <h2>
              Let’s
              <br />
              <span>connect.</span>
            </h2>

            <div className="contact-cta-row">
              <button
                type="button"
                className="button-dark"
                aria-expanded={isContactFormOpen}
                aria-controls="contact-message-form"
                onClick={() => setIsContactFormOpen((isOpen) => !isOpen)}
              >
                <Mail size={16} />
                {isContactFormOpen ? "Close message form" : "Send a message"}
                <ArrowUpRight size={16} />
              </button>
              <button type="button" onClick={handleCopyEmail} className="copy-button copy-button-dark">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            <div
              id="contact-message-form"
              className="contact-form-panel"
              hidden={!isContactFormOpen}
            >
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
                  <div className="contact-field">
                    <label htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      maxLength={120}
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-email">Your email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      maxLength={254}
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    maxLength={160}
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    maxLength={5000}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

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
                  <a
                    href="https://wa.me/6288991531800"
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                  >
                    Message on WhatsApp
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                {status.message && (
                  <div
                    className={`form-status form-status-${status.type}`}
                    role={status.type === "error" ? "alert" : "status"}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
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
                <FaWhatsapp size={16} />
                WhatsApp
                <ArrowUpRight size={14} />
              </a>

              <span className="contact-phone">
                0889-9153-1800 · MESSAGE ONLY
              </span>
            </div>
          </div>
        </div>

        <div className="contact-footer-bar">
          <Link to="#home" className="brand-mark brand-mark-small">
            <img src="/images/logo/gilang-faid.svg" alt="" aria-hidden="true" />
            <span>Gilang Faid</span>
          </Link>
          <p>Independently made by Gilang Nur Maulida Faid · 2026</p>
          <Link to="#home" className="back-to-top-link">
            Back to top <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default ContactSection;
