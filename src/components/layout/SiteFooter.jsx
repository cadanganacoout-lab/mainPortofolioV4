import { ArrowUpRight } from "lucide-react";

function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--panel)]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
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
