import { createContext, useContext, useEffect, useRef, useState } from "react";

export const musicTracks = [
  {
    title: "8 Letters",
    artist: "Why Don't We",
    fileName: "8 Letters - Why Don't We [Official Music Video].mp3",
  },
  {
    title: "Shape Of My Heart",
    artist: "Backstreet Boys",
    fileName:
      "Backstreet Boys - Shape Of My Heart (Official HD Video) [OT5msu-dap8].mp3",
  },
  {
    title: "That Should Be Me",
    artist: "Justin Bieber",
    fileName: "Justin Bieber - That Should Be Me [Pr-fGuRIk3Q].mp3",
  },
  {
    title: "Soft",
    artist: "LANY",
    fileName: "LANY - Soft (Official Music Video) [L7IHw86JsDE].mp3",
  },
  {
    title: "Infinity",
    artist: "One Direction",
    fileName: "One Direction - Infinity (Audio) [JAERpGGh-wA].mp3",
  },
  {
    title: "Night Changes",
    artist: "One Direction",
    fileName: "One Direction - Night Changes [syFZfO_wfMQ].mp3",
  },
  {
    title: "About You",
    artist: "The 1975",
    fileName: "The 1975 - About You (Official) [tGv7CUutzqU].mp3",
  },
  {
    title: "Best Friend",
    artist: "Rex Orange County",
    fileName:
      "Rex Orange County - Best Friend (Official Audio) [OqBuXQLR4Y8].mp3",
  },
].map((track) => ({
  ...track,
  src: `/music/${encodeURIComponent(track.fileName)}`,
}));

const MusicPlayerContext = createContext(null);

export function MusicPlayerProvider({ children }) {
  const [musicOn, setMusicOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [selectedTrack, setSelectedTrack] = useState(musicTracks[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const seekTo = (time) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time) || !Number.isFinite(audio.duration)) {
      return;
    }

    const nextTime = Math.min(Math.max(time, 0), audio.duration);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [selectedTrack]);

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
  }, [isMuted, musicOn, selectedTrack, volume]);

  return (
    <MusicPlayerContext.Provider
      value={{
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
      }}
    >
      <audio
        ref={audioRef}
        src={selectedTrack.src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
          setCurrentTime(audio.currentTime);
        }}
        onDurationChange={(event) => {
          const audio = event.currentTarget;
          setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => {
          setCurrentTime(0);
          setSelectedTrack((currentTrack) => {
            const currentIndex = musicTracks.findIndex(
              (track) => track.fileName === currentTrack.fileName,
            );
            return musicTracks[(currentIndex + 1) % musicTracks.length];
          });
        }}
      />
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}
