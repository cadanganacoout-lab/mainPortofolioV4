import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const landingSectionsSelector =
  ".landing-page .landing-section, .landing-page .landing-contact-footer";
const landingAreaSelector =
  ".landing-page .landing-main, .landing-page .landing-contact-footer";

export function useLandingSectionScroll() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let isNavigating = false;
    let navigationTimeoutId;

    const handleWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 2) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(landingAreaSelector)) return;
      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      if (isNavigating) {
        event.preventDefault();
        return;
      }

      const sections = [...document.querySelectorAll(landingSectionsSelector)];
      const viewportCenter = window.innerHeight / 2;
      const currentIndex = sections.findIndex((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= viewportCenter && bounds.bottom > viewportCenter;
      });
      if (currentIndex < 0) return;

      const nextIndex = currentIndex + Math.sign(event.deltaY);
      const nextSection = sections[nextIndex];
      if (!nextSection) return;

      event.preventDefault();
      isNavigating = true;
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      navigationTimeoutId = window.setTimeout(() => {
        isNavigating = false;
      }, 750);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.clearTimeout(navigationTimeoutId);
    };
  }, [prefersReducedMotion]);
}
