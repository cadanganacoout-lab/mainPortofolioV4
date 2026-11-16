import { useEffect, useRef, useState } from "react";
import {
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  musicTracks,
  useMusicPlayer,
} from "../../context/MusicPlayerContext";
import "../../styles/music-notch.css";

const hoverRegionWidth = 480;
const hoverRegionHeight = 84;
const autoHideDelay = 80;

function formatMusicTime(time) {
  const totalSeconds = Number.isFinite(time) ? Math.max(0, Math.floor(time)) : 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getLyricLines(track) {
  if (!Array.isArray(track.lyrics)) return [];

  return track.lyrics.filter(
    (line) =>
      line &&
      Number.isFinite(line.start) &&
      typeof line.text === "string" &&
      line.text.trim().length > 0,
  );
}

function parseLrcLyrics(contents) {
  const lyrics = [];
  const timestampPattern = /\[(\d+):([0-5]\d)(?:\.(\d{1,3}))?\]/g;

  for (const line of contents.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const timestamps = [...line.matchAll(timestampPattern)];
    const text = line.replace(timestampPattern, "").trim();
    if (!text) continue;

    for (const [, minutes, seconds, fraction = "0"] of timestamps) {
      lyrics.push({
        start:
          Number(minutes) * 60 +
          Number(seconds) +
          Number(`0.${fraction}`),
        text,
      });
    }
  }

  return lyrics.sort((first, second) => first.start - second.start);
}

function MusicNotch() {
  const {
    currentTime,
    duration,
    isMuted,
    musicOn,
    seekTo,
    selectedTrack,
    setIsMuted,
    setMusicOn,
    setSelectedTrack,
    setVolume,
    volume,
  } = useMusicPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [loadedLyrics, setLoadedLyrics] = useState({
    trackFileName: null,
    lines: [],
    status: "idle",
  });
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const playbackControlRef = useRef(null);

  const inlineLyrics = getLyricLines(selectedTrack);
  const loadedTrackLyrics =
    loadedLyrics.trackFileName === selectedTrack.fileName ? loadedLyrics : null;
  const lyrics = inlineLyrics.length
    ? inlineLyrics
    : loadedTrackLyrics?.lines ?? [];
  const lyricsStatus = inlineLyrics.length
    ? "ready"
    : loadedTrackLyrics?.status ??
      (selectedTrack.lyricsFile ? "loading" : "unavailable");
  const activeLyricIndex = lyrics.reduce(
    (activeIndex, line, index) =>
      currentTime >= line.start ? index : activeIndex,
    -1,
  );
  const activeLyric =
    activeLyricIndex >= 0 ? lyrics[activeLyricIndex] : null;
  const dockLyric = musicOn ? activeLyric : null;
  const firstVisibleLyric = Math.max(0, activeLyricIndex - 1);
  const visibleLyrics = lyrics.slice(firstVisibleLyric, firstVisibleLyric + 4);
  const currentTrackIndex = Math.max(
    0,
    musicTracks.findIndex((track) => track.fileName === selectedTrack.fileName),
  );
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (getLyricLines(selectedTrack).length) return undefined;

    if (!selectedTrack.lyricsFile) {
      setLoadedLyrics({
        trackFileName: selectedTrack.fileName,
        lines: [],
        status: "unavailable",
      });
      return undefined;
    }

    const controller = new AbortController();
    setLoadedLyrics({
      trackFileName: selectedTrack.fileName,
      lines: [],
      status: "loading",
    });

    const loadLyrics = async () => {
      try {
        const response = await fetch(selectedTrack.lyricsFile, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setLoadedLyrics({
            trackFileName: selectedTrack.fileName,
            lines: [],
            status: "unavailable",
          });
          return;
        }

        if (!response.ok) {
          throw new Error(`Lyrics request failed with status ${response.status}`);
        }

        const lines = parseLrcLyrics(await response.text());
        setLoadedLyrics({
          trackFileName: selectedTrack.fileName,
          lines,
          status: lines.length ? "ready" : "unavailable",
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error(`Failed to load lyrics for "${selectedTrack.title}"`, error);
        setLoadedLyrics({
          trackFileName: selectedTrack.fileName,
          lines: [],
          status: "error",
        });
      }
    };

    loadLyrics();
    return () => controller.abort();
  }, [selectedTrack]);

  useEffect(() => {
    const supportsHover =
      window.matchMedia(
        "(min-width: 641px) and (hover: hover) and (pointer: fine)",
      ).matches;
    if (!supportsHover) return undefined;

    let hideTimeout;

    const handlePointerMove = (event) => {
      if (event.pointerType === "touch" || !event.isPrimary) return;

      const activeHoverWidth = Math.min(hoverRegionWidth, window.innerWidth);
      const isOverActivationArea =
        event.clientY <= hoverRegionHeight &&
        Math.abs(event.clientX - window.innerWidth / 2) <= activeHoverWidth / 2;
      const isOverPanel = panelRef.current?.contains(event.target);

      if (isOverActivationArea || isOverPanel) {
        window.clearTimeout(hideTimeout);
        setIsOpen(true);
      } else if (
        isOpen &&
        !panelRef.current?.contains(document.activeElement)
      ) {
        window.clearTimeout(hideTimeout);
        hideTimeout = window.setTimeout(
          () => setIsOpen(false),
          autoHideDelay,
        );
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.clearTimeout(hideTimeout);
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
        if (panelRef.current?.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }
    };

    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const openFromKeyboard = () => {
    setIsOpen(true);
    window.requestAnimationFrame(() => playbackControlRef.current?.focus());
  };

  const changeTrack = (offset) => {
    const nextIndex =
      (currentTrackIndex + offset + musicTracks.length) % musicTracks.length;
    setSelectedTrack(musicTracks[nextIndex]);
  };

  return (
    <div
      ref={rootRef}
      className={`music-notch${isOpen ? " is-open" : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className="music-notch-trigger"
        aria-label={isOpen ? "Music player open" : "Open music player"}
        aria-expanded={isOpen}
        aria-controls="music-notch-panel"
        tabIndex={isOpen ? -1 : 0}
        onClick={openFromKeyboard}
      >
        <span
          className={`music-notch-dock-content${dockLyric ? " has-lyric" : ""}`}
        >
          {dockLyric && (
            <span
              key={`${selectedTrack.fileName}-${dockLyric.start}-${activeLyricIndex}`}
              className="music-notch-current-lyric"
            >
              {dockLyric.text}
            </span>
          )}
          <span
            className={`music-notch-equalizer${musicOn && !isMuted ? " is-playing" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
          </span>
        </span>
      </button>

      <section
        ref={panelRef}
        id="music-notch-panel"
        className="music-notch-panel"
        aria-label="Music player"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="music-notch-content">
          <div className="music-notch-playback">
            <div className="music-notch-track">
              <img
                className="music-notch-art"
                src={selectedTrack.cover}
                alt=""
                aria-hidden="true"
              />
              <div className="music-notch-track-copy">
                <div className="music-notch-track-heading">
                  <strong title={selectedTrack.title}>
                    {selectedTrack.title}
                  </strong>
                  <label className="music-notch-track-picker">
                    <span className="sr-only">Choose a track</span>
                    <select
                      value={selectedTrack.fileName}
                      onChange={(event) => {
                        const nextTrack = musicTracks.find(
                          (track) => track.fileName === event.target.value,
                        );
                        if (nextTrack) setSelectedTrack(nextTrack);
                      }}
                      aria-label="Choose a music track"
                    >
                      {musicTracks.map((track) => (
                        <option key={track.fileName} value={track.fileName}>
                          {track.title} — {track.artist}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <span title={selectedTrack.artist}>{selectedTrack.artist}</span>
              </div>
            </div>

            <label className="music-notch-seek">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration)}
                disabled={duration <= 0}
                onChange={(event) => seekTo(Number(event.target.value))}
                aria-label="Seek music playback"
                aria-valuetext={`${formatMusicTime(currentTime)} of ${formatMusicTime(duration)}`}
                style={{ "--music-seek-progress": `${progress}%` }}
              />
              <span className="music-notch-times">
                <span>{formatMusicTime(currentTime)}</span>
                <span>{formatMusicTime(duration)}</span>
              </span>
            </label>

            <div className="music-notch-controls" aria-label="Playback controls">
              <button
                type="button"
                aria-label="Previous track"
                onClick={() => changeTrack(-1)}
              >
                <SkipBack size={16} fill="currentColor" />
              </button>
              <button
                ref={playbackControlRef}
                type="button"
                className="music-notch-play"
                aria-label={musicOn ? "Pause music" : "Play music"}
                onClick={() => setMusicOn((playing) => !playing)}
              >
                {musicOn ? (
                  <Pause size={17} fill="currentColor" />
                ) : (
                  <Play size={17} fill="currentColor" />
                )}
              </button>
              <button
                type="button"
                aria-label="Next track"
                onClick={() => changeTrack(1)}
              >
                <SkipForward size={16} fill="currentColor" />
              </button>
              <button
                type="button"
                className="music-notch-mute"
                aria-label={isMuted ? "Unmute music" : "Mute music"}
                onClick={() => setIsMuted((muted) => !muted)}
              >
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <label className="music-notch-volume">
                <span className="sr-only">Music volume</span>
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
                  style={{ "--music-volume-progress": `${volume}%` }}
                />
              </label>
            </div>
          </div>

          <div className="music-notch-lyrics">
            <div className="music-notch-lyrics-heading">
              <h2>Lyrics</h2>
              <span>
                {lyricsStatus === "loading"
                  ? "LOADING"
                  : lyricsStatus === "ready"
                    ? "LIVE SYNC"
                    : lyricsStatus === "error"
                      ? "LOAD ERROR"
                      : "NOT AVAILABLE"}
              </span>
            </div>
            {lyrics.length ? (
              <div className="music-notch-lyric-lines">
                {visibleLyrics.map((line, index) => {
                  const lyricIndex = firstVisibleLyric + index;
                  return (
                    <p
                      key={`${line.start}-${lyricIndex}`}
                      className={
                        lyricIndex === activeLyricIndex
                          ? "is-current"
                          : lyricIndex === activeLyricIndex + 1
                            ? "is-next"
                            : ""
                      }
                    >
                      {line.text}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="music-notch-lyrics-empty">
                <Music2 size={18} aria-hidden="true" />
                <p>
                  {lyricsStatus === "loading"
                    ? "Memuat lirik..."
                    : lyricsStatus === "error"
                      ? "Lirik gagal dimuat."
                      : "Lirik belum tersedia untuk lagu ini."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MusicNotch;
