"use client";

import { useRef, useState } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration);
  };

  const handleScrub = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src="/audio/THE MAN WHO BEAT THE MAN INSTRUMENTAL.mp3"
        loop
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button
        onClick={toggleMusic}
        className="music-player__button"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "PAUSE" : "PLAY"}
      </button>

      <div className="music-player__info">
        <span className="music-player__artist">
          ARTIST: zaine
        </span>

        <div className="music-player__marquee">
          <span
            className={`music-player__track ${
              playing ? "music-player__track--playing" : ""
            }`}
          >
            THE MAN WHO BEAT THE MAN INSTRUMENTAL
          </span>
        </div>

        <div className="music-player__progress">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={handleScrub}
            className="music-player__scrubber"
            aria-label="Song position"
          />

          <div className="music-player__time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <span className="music-player__status">
          {playing ? "NOW PLAYING" : "SOUND OFF"}
        </span>
      </div>
    </div>
  );
}