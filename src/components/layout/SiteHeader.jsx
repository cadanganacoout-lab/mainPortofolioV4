import { useEffect, useRef, useState } from "react";
import {
  Headphones,
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

function SiteHeader() {
  const [darkMode, setDarkMode] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMusicPanelOpen, setIsMusicPanelOpen] = useState(false);
  const musicControlRef = useRef(null);
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
      if (!musicControlRef.current?.contains(event.target)) {
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

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/8%20Letters%20-%20Why%20Don%27t%20We%20%5BOfficial%20Music%20Video%5D.mp3"
        preload="metadata"
        loop
      />

      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--panel)]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="brand-mark" aria-label="Gilang Faid — back to top">
            <img
              src="/images/logo/gilang-faid.svg"
              alt=""
              aria-hidden="true"
            />
            <span>G <strong>F</strong></span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="music-control" ref={musicControlRef}>
              <button
                type="button"
                onClick={() => setIsMusicPanelOpen((prev) => !prev)}
                aria-label={
                  isMusicPanelOpen
                    ? "Close music controls"
                    : "Open music controls"
                }
                aria-expanded={isMusicPanelOpen}
                aria-controls="music-controls"
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

              {isMusicPanelOpen && (
                <div
                  id="music-controls"
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
                      {volume === 0 ? (
                        <VolumeX size={15} />
                      ) : (
                        <Volume1 size={15} />
                      )}
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
                      {musicOn
                        ? isMuted
                          ? "Playing · muted"
                          : "Playing"
                        : "Playback paused"}
                    </span>
                    <span>Local MP3</span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              className="icon-button"
            >
              {darkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>

            <a
              href="#contact"
              className="hidden rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[var(--text)] sm:inline-flex"
            >
              Let’s talk
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}

export default SiteHeader;
