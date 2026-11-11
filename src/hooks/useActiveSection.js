import { useEffect, useState } from "react";

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      const isAtPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (isAtPageEnd) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const focusLine = window.innerHeight * 0.38;
      const sectionAtFocusLine = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= focusLine && bounds.bottom > focusLine;
      });

      if (sectionAtFocusLine) {
        setActiveSection(sectionAtFocusLine.id);
        return;
      }

      const nearestSection = sections.reduce((nearest, section) => {
        const bounds = section.getBoundingClientRect();
        const distance =
          focusLine < bounds.top
            ? bounds.top - focusLine
            : focusLine - bounds.bottom;
        return distance < nearest.distance
          ? { section, distance }
          : nearest;
      }, { section: sections[0], distance: Infinity });

      setActiveSection(nearestSection.section.id);
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [sectionIds]);

  return activeSection;
}
