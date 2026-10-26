import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, MoonStar, SunMedium } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const COUNTDOWN_DURATION = 60_000;

function WelcomePage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [remaining, setRemaining] = useState(COUNTDOWN_DURATION);
  const userSelectedTheme = useRef(false);
  const deadline = useRef(Date.now() + COUNTDOWN_DURATION);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystemTheme = (event) => {
      if (!userSelectedTheme.current) setIsDark(event.matches);
    };

    mediaQuery.addEventListener("change", followSystemTheme);
    return () => mediaQuery.removeEventListener("change", followSystemTheme);
  }, []);

  useEffect(() => {
    document.title = "Welcome GF";
    deadline.current = Date.now() + COUNTDOWN_DURATION;

    const intervalId = window.setInterval(() => {
      const nextRemaining = Math.max(0, deadline.current - Date.now());
      setRemaining(nextRemaining);

      if (nextRemaining === 0) {
        navigate("/dashboard", { replace: true });
      }
    }, 100);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [navigate]);

  const secondsRemaining = Math.ceil(remaining / 1000);
  const progress = (remaining / COUNTDOWN_DURATION) * 100;

  return (
    <main className="welcome-page">
      <button
        className="welcome-theme-toggle"
        type="button"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        onClick={() => {
          userSelectedTheme.current = true;
          setIsDark((current) => !current);
        }}
      >
        {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      </button>
      <section className="welcome-content" aria-labelledby="welcome-title">
        <div className="welcome-topline">
          <p className="welcome-identity">GF <span>/</span> Langg</p>
        </div>

        <p className="welcome-eyebrow">A personal portfolio</p>
        <h1 id="welcome-title">Welcome<span>.</span></h1>
        <p className="welcome-description">
          A little about me and what I build.
        </p>

        <Link className="welcome-cta" to="/dashboard">
          Explore my portfolio
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>

        <div
          className="welcome-countdown"
          tabIndex={0}
          role="group"
          aria-describedby="welcome-countdown-tooltip"
        >
          <div className="welcome-countdown-label">
            <span>Auto-entering dashboard</span>
            <span aria-hidden="true">{secondsRemaining}s</span>
          </div>
          <div
            className="welcome-progress-track"
            role="progressbar"
            aria-label="Time until automatic dashboard navigation"
            aria-valuemin={0}
            aria-valuemax={60}
            aria-valuenow={secondsRemaining}
            aria-valuetext={`${secondsRemaining} seconds remaining`}
          >
            <span
              className="welcome-progress-value"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span
            className="welcome-countdown-tooltip"
            id="welcome-countdown-tooltip"
            role="tooltip"
          >
            You&apos;ll enter the dashboard automatically when the 60-second
            countdown ends.
          </span>
        </div>
      </section>
    </main>
  );
}

export default WelcomePage;
