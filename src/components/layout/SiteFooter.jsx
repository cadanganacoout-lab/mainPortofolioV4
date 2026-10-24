import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { emailAddress } from "../../data/portfolio";

function SiteFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = emailAddress;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      const copiedSuccessfully = document.execCommand("copy");
      document.body.removeChild(fallback);

      if (copiedSuccessfully) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      } else {
        window.location.href = `mailto:${emailAddress}`;
      }
    }
  };

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--panel)]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <a
          href="#home"
          className="brand-mark brand-mark-small"
          aria-label="Gilang Faid — back to top"
        >
          <img
            src="/images/logo/gilang-faid.svg"
            alt=""
            aria-hidden="true"
          />
          <span>gilang <strong>faid</strong></span>
        </a>

        <div className="footer-cta">
          <a href="#contact" className="footer-hire-link">
            Hire me
            <ArrowUpRight size={14} />
          </a>
          <button type="button" onClick={handleCopyEmail} className="footer-copy-button">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Email copied" : "Copy email"}
          </button>
        </div>

        <p>Independently made by Gilang Nur Maulida Faid | 2026</p>

        <a
          href="#home"
          className="inline-flex items-center gap-2 text-[var(--text)] uppercase tracking-[0.2em] text-[11px]"
        >
          Back to top
          <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}

export default SiteFooter;
