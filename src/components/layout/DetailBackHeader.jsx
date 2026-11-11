import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function DetailBackHeader() {
  return (
    <header className="detail-back-header">
      <Link to="/#home" className="detail-back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to landing
      </Link>
    </header>
  );
}

export default DetailBackHeader;
