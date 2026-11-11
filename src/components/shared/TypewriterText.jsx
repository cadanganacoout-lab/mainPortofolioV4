import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function TypewriterText({ text, emphasis, className = "" }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [visibleText, setVisibleText] = useState("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      setVisibleText(text);
      setIsTyping(false);
      return undefined;
    }

    const element = elementRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setVisibleText("");
          setIsTyping(true);
          return;
        }

        setIsVisible(false);
        setVisibleText("");
        setIsTyping(false);
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion, text]);

  useEffect(() => {
    if (!isTyping) return undefined;

    const characters = Array.from(text);
    let visibleCharacterCount = 0;
    const intervalId = window.setInterval(() => {
      visibleCharacterCount += 1;
      setVisibleText(characters.slice(0, visibleCharacterCount).join(""));
      if (visibleCharacterCount >= characters.length) {
        window.clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 68);

    return () => window.clearInterval(intervalId);
  }, [isTyping, text]);

  const emphasisStart = emphasis ? text.indexOf(emphasis) : -1;
  const emphasisEnd =
    emphasisStart < 0 ? -1 : emphasisStart + emphasis.length;

  return (
    <span
      ref={elementRef}
      className={`typewriter${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span className="typewriter-visual" aria-hidden="true">
        {emphasisStart < 0 ? (
          visibleText
        ) : (
          <>
            {visibleText.slice(0, emphasisStart)}
            <em>
              {visibleText.slice(
                emphasisStart,
                Math.min(visibleText.length, emphasisEnd),
              )}
            </em>
            {visibleText.slice(emphasisEnd)}
          </>
        )}
        {isTyping && <i className="typewriter-caret" />}
      </span>
    </span>
  );
}

export default TypewriterText;
