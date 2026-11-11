import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";

function SiteFooter() {
  return (
    <footer className="route-footer">
      <Link to="/#home" className="brand-mark brand-mark-small">
        <BrandLogo />
        <span>Gilang Faid</span>
      </Link>

      <p>Independently made by Gilang Nur Maulida Faid · 2026</p>

      <div className="route-footer-links">
        <Link to="/#contact">
          Get in touch <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <Link to="/#home">Back to landing</Link>
      </div>
    </footer>
  );
}

export default SiteFooter;
