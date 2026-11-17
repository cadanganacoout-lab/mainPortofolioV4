import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import "../../styles/location-map-card.css";

const mapEmbedUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=112.718%2C-7.277%2C112.785%2C-7.238&layer=mapnik&marker=-7.2575%2C112.7521";
const fullMapUrl =
  "https://www.openstreetmap.org/?mlat=-7.2575&mlon=112.7521#map=13/-7.2575/112.7521";

function LocationMapCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isExpanded) return undefined;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setIsExpanded(false);
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const closeMap = () => {
    setIsExpanded(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <motion.div
      className="location-map-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="location-map-trigger"
        aria-expanded={isExpanded}
        aria-controls="surabaya-map-panel"
        onClick={() => setIsExpanded(true)}
        hidden={isExpanded}
      >
        <span className="location-map-art" aria-hidden="true">
          <svg viewBox="0 0 480 380" role="presentation">
            <path d="M-20 76 126 116l108-22 118 36 150-37" />
            <path d="m-14 208 106-45 99 24 96-52 82 25 123-55" />
            <path d="m36 398 40-105 85-55 22-95 87-70" />
            <path d="m218 401 32-89-17-76 75-62 32-106" />
            <path d="m384 403-42-85 30-92-54-78 93-72" />
            <path d="m-12 314 113 8 77-40 92 32 86-47 136 17" />
            <path d="m112-20 42 100-31 77 57 74-24 110" />
            <path d="m308-26-17 73 46 72-17 77 76 84-9 112" />
          </svg>
          <span className="location-map-grid-glow" />
          <span className="location-map-pin">
            <MapPin size={22} strokeWidth={1.7} />
          </span>
        </span>

        <span className="location-map-copy">
          <span className="location-map-eyebrow">Location / East Java</span>
          <span className="location-map-title">Surabaya</span>
          <span className="location-map-country">Indonesia</span>
          <span className="location-map-open">
            Explore map <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </span>
        <span className="location-map-index" aria-hidden="true">
          07°15&apos;S / 112°45&apos;E
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id="surabaya-map-panel"
            className="location-map-expanded"
            role="region"
            aria-label="Map of Surabaya, Indonesia"
            initial={
              prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
          >
            <iframe
              className="location-map-iframe"
              src={mapEmbedUrl}
              title="OpenStreetMap showing Surabaya, Indonesia"
              loading="lazy"
              referrerPolicy="no-referrer"
              allowFullScreen
            />
            <div className="location-map-overlay">
              <span className="location-map-place">
                <MapPin size={14} aria-hidden="true" />
                Surabaya, Indonesia
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="location-map-close"
                onClick={closeMap}
                aria-label="Close expanded map"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="location-map-attribution">
              <span>Map tiles load from OpenStreetMap when opened.</span>
              <a href={fullMapUrl} target="_blank" rel="noreferrer">
                © OpenStreetMap contributors
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LocationMapCard;
