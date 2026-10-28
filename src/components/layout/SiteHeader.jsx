import { useEffect, useRef, useState } from "react";
import {
  Headphones,
  Menu,
  MoonStar,
  Pause,
  Play,
  SunMedium,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { navItems } from "../../data/portfolio";

const mobileNavItems = [
  { label: "Home", href: "#home" },
  { label: "My Work", href: "#work" },
  { label: "About Me", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function handleNavigationClick(event, href) {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();
  if (window.location.hash !== href) {
    window.history.pushState(null, "", href);
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function MusicPlaybackControls({
  id,
  isMuted,
  isMusicPanelOpen,
  musicOn,
  setIsMuted,
  setIsMusicPanelOpen,
  setMusicOn,
  setVolume,
  volume,
}) {
  if (!isMusicPanelOpen) return null;

  return (
    <div
      id={id}
      className="music-popover"
      role="group"
      aria-label="Music playback controls"
    >
      <div className="music-popover-heading">
        <span className="music-cover" aria-hidden="true">
          <Headphones size={18} />
        </span>
        <div className="music-track">
          <strong>8 Letters</strong>
          <span>Why Don&apos;t We</span>
        </div>
        <button
          type="button"
          onClick={() => setIsMusicPanelOpen(false)}
          className="music-close"
          aria-label="Close music controls"
        >
          <X size={16} />
        </button>
      </div>

      <div className="music-actions">
        <button
          type="button"
          onClick={() => setMusicOn((prev) => !prev)}
          className="music-play-button"
          aria-label={musicOn ? "Pause music" : "Play music"}
        >
          {musicOn ? (
            <Pause size={17} fill="currentColor" />
          ) : (
            <Play size={17} fill="currentColor" />
          )}
          <span>{musicOn ? "Pause playback" : "Play music"}</span>
        </button>
        <button
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
          className={`music-volume-button${isMuted ? "" : " volume-on"}`}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <label className="music-volume-control">
        <span className="music-volume-label">
          <span>{isMuted ? "Volume · muted" : "Volume"}</span>
          <span>{isMuted ? "—" : `${volume}%`}</span>
        </span>
        <span className="music-volume-slider-row">
          {volume === 0 ? <VolumeX size={15} /> : <Volume1 size={15} />}
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(event) => {
              const nextVolume = Number(event.target.value);
              setVolume(nextVolume);
              setIsMuted(nextVolume === 0);
            }}
            aria-label="Music volume"
            style={{ "--volume-progress": `${volume}%` }}
          />
        </span>
      </label>

      <div className="music-popover-footer">
        <span>
          {musicOn ? (isMuted ? "Playing · muted" : "Playing") : "Playback paused"}
        </span>
        <span>Local MP3</span>
      </div>
    </div>
  );
}

function SiteHeader() {
  const [darkMode, setDarkMode] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMusicPanelOpen, setIsMusicPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopMusicControlRef = useRef(null);
  const mobileMusicControlRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuTriggerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
    audio.muted = isMuted;

    if (musicOn) {
      audio.play().catch(() => setMusicOn(false));
    } else {
      audio.pause();
    }
  }, [isMuted, musicOn, volume]);

  useEffect(() => {
    if (!isMusicPanelOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      const target = event.target;
      if (
        !desktopMusicControlRef.current?.contains(target) &&
        !mobileMusicControlRef.current?.contains(target)
      ) {
        setIsMusicPanelOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMusicPanelOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMusicPanelOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = () =>
      mobileMenuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    mobileMenuRef.current?.querySelector(".mobile-menu-close")?.focus();

    const handleMenuKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        setIsMusicPanelOpen(false);
        mobileMenuTriggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(focusableElements());
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!mobileMenuRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 768px)");
    const closeMenuOnDesktop = (event) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
        setIsMusicPanelOpen(false);
      }
    };

    desktopBreakpoint.addEventListener("change", closeMenuOnDesktop);
    return () =>
      desktopBreakpoint.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  const openMobileMenu = () => {
    const trigger = mobileMenuTriggerRef.current;
    if (!trigger) return;

    const bounds = trigger.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y),
    );

    mobileMenuRef.current?.style.setProperty("--menu-origin-x", `${x}px`);
    mobileMenuRef.current?.style.setProperty("--menu-origin-y", `${y}px`);
    mobileMenuRef.current?.style.setProperty("--menu-radius", `${radius}px`);
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = (restoreFocus = true) => {
    setIsMobileMenuOpen(false);
    setIsMusicPanelOpen(false);
    if (restoreFocus) mobileMenuTriggerRef.current?.focus();
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const renderMusicControls = (id) => (
    <MusicPlaybackControls
      id={id}
      isMuted={isMuted}
      isMusicPanelOpen={isMusicPanelOpen}
      musicOn={musicOn}
      setIsMuted={setIsMuted}
      setIsMusicPanelOpen={setIsMusicPanelOpen}
      setMusicOn={setMusicOn}
      setVolume={setVolume}
      volume={volume}
    />
  );

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/8%20Letters%20-%20Why%20Don%27t%20We%20%5BOfficial%20Music%20Video%5D.mp3"
        preload="metadata"
        loop
      />

      <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--panel)]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="brand-mark"
            aria-label="Gilang Faid — back to top"
          >
            <img
              src="/images/logo/gilang-faid.svg"
              alt=""
              aria-hidden="true"
            />
            <span>
              G <strong>F</strong>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={(event) => handleNavigationClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:gap-3 md:flex">
            <div className="music-control" ref={desktopMusicControlRef}>
              <button
                type="button"
                onClick={() => setIsMusicPanelOpen((prev) => !prev)}
                aria-label={
                  isMusicPanelOpen
                    ? "Close music controls"
                    : "Open music controls"
                }
                aria-expanded={isMusicPanelOpen}
                aria-controls="music-controls-desktop"
                className={`music-trigger${musicOn && !isMuted ? " is-playing" : ""}`}
              >
                <Headphones size={18} />
                <span className="music-trigger-label">Music</span>
                {musicOn && !isMuted && (
                  <span className="music-level" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </button>
              {renderMusicControls("music-controls-desktop")}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              aria-pressed={!darkMode}
              className="icon-button"
            >
              {darkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>

            <a
              href="#contact"
              className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--text)]"
            >
              Let’s talk
            </a>
          </div>

          <button
            ref={mobileMenuTriggerRef}
            type="button"
            onClick={() =>
              isMobileMenuOpen ? closeMobileMenu(false) : openMobileMenu()
            }
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="mobile-menu-trigger icon-button md:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <button
        type="button"
        className={`mobile-menu-backdrop${isMobileMenuOpen ? " is-open" : ""}`}
        onClick={() => closeMobileMenu()}
        aria-label="Close navigation"
        tabIndex={isMobileMenuOpen ? 0 : -1}
        inert={!isMobileMenuOpen}
      />

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`mobile-menu-panel${isMobileMenuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="mobile-menu-close icon-button"
          onClick={() => closeMobileMenu()}
          aria-label="Close navigation"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        >
          <X size={20} />
        </button>

        <nav className="mobile-menu-content" aria-label="Main navigation">
          <p className="mobile-menu-eyebrow">Take a look around</p>
          {mobileNavItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-menu-link"
              onClick={(event) => {
                handleNavigationClick(event, item.href);
                closeMobileMenu();
              }}
            >
              <span className="mobile-menu-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
              <span className="mobile-menu-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}

          <div className="mobile-menu-preferences">
            <p className="mobile-menu-eyebrow">Your preferences</p>
            <div className="mobile-menu-controls">
              <div className="mobile-preference-controls" ref={mobileMusicControlRef}>
                <div className="mobile-menu-control-row">
                  <button
                    type="button"
                    onClick={() => setIsMusicPanelOpen((prev) => !prev)}
                    aria-expanded={isMusicPanelOpen}
                    aria-controls="music-controls-mobile"
                    className={`music-trigger${musicOn && !isMuted ? " is-playing" : ""}`}
                  >
                    <Headphones size={18} />
                    <span className="music-trigger-label">Music</span>
                    {musicOn && !isMuted && (
                      <span className="music-level" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}
                    aria-pressed={!darkMode}
                    className="icon-button mobile-theme-toggle"
                  >
                    {darkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
                    <span>Theme</span>
                  </button>
                </div>
                {renderMusicControls("music-controls-mobile")}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SiteHeader;
