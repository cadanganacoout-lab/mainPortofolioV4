import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function useScrollReveal() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    document.body.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.body.classList.remove("reveal-ready");
    };
  }, [prefersReducedMotion]);
}
