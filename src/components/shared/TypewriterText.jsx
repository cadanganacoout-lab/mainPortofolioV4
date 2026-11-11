import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function TypewriterText({
  text,
  emphasis,
  className = "",
  onTypingStart,
  onTypingComplete,
  onTypingReset,
}) {
  const elementRef = useRef(null);
  const onTypingStartRef = useRef(onTypingStart);
  const onTypingCompleteRef = useRef(onTypingComplete);
  const onTypingResetRef = useRef(onTypingReset);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [visibleText, setVisibleText] = useState("");
  const prefersReducedMotion = useReducedMotion();

  onTypingStartRef.current = onTypingStart;
  onTypingCompleteRef.current = onTypingComplete;
  onTypingResetRef.current = onTypingReset;

  useEffect(() => {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      setVisibleText(text);
      setIsTyping(false);
      onTypingCompleteRef.current?.();
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
          onTypingStartRef.current?.();
          return;
        }

        setIsVisible(false);
        setVisibleText("");
        setIsTyping(false);
        onTypingResetRef.current?.();
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
    let intervalId;
    const startTimeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        visibleCharacterCount += 1;
        setVisibleText(characters.slice(0, visibleCharacterCount).join(""));
        if (visibleCharacterCount >= characters.length) {
          window.clearInterval(intervalId);
          setIsTyping(false);
          onTypingCompleteRef.current?.();
        }
      }, 90);
    }, 280);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
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
