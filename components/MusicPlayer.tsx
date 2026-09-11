"use client";

import {
  useRef,
  useState,
  type FormEvent,
} from "react";

import "./MusicPlayer.css";

export default function MusicPlayer() {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] =
    useState(false);

  const [hidden, setHidden] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error(
          "Audio playback failed:",
          error
        );
      }
    } else {
      audio.pause();
    }
  };

  const updateDuration = () => {
    const audio = audioRef.current;

    if (
      !audio ||
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {
      return;
    }

    setDuration((previousDuration) =>
      previousDuration === audio.duration
        ? previousDuration
        : audio.duration
    );
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleScrub = (
    event: FormEvent<HTMLInputElement>
  ) => {
    const audio = audioRef.current;

    if (!audio || duration <= 0) return;

    const newTime = Number(
      event.currentTarget.value
    );

    if (!Number.isFinite(newTime)) return;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (
    seconds: number
  ) => {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(
      seconds / 60
    );

    const remainingSeconds = Math.floor(
      seconds % 60
    )
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

  const safeCurrentTime =
    duration > 0
      ? Math.min(currentTime, duration)
      : 0;

  const progress =
    duration > 0
      ? Math.min(
          (safeCurrentTime / duration) *
            100,
          100
        )
      : 0;

  return (
    <div
      className={`music-player ${
        hidden
          ? "music-player--hidden"
          : ""
      }`}
    >
      <audio
        ref={audioRef}
        src="/audio/hesi%20pull%20up.mp3"
        loop
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={updateDuration}
        onDurationChange={updateDuration}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          console.error(
            "The audio file could not be loaded."
          );
        }}
      />

      {hidden ? (
        <button
          type="button"
          className="music-player__show"
          onClick={() => setHidden(false)}
          aria-label="Show music player"
          title="Show music player"
        >
          <span
            className={
              playing
                ? "music-player__note music-player__note--playing"
                : "music-player__note"
            }
            aria-hidden="true"
          >
            ♪
          </span>
        </button>
      ) : (
        <>
          <button
            type="button"
            className="music-player__hide"
            onClick={() => setHidden(true)}
            aria-label="Hide music player"
            title="Hide music player"
          >
            ×
          </button>

          <button
            type="button"
            onClick={toggleMusic}
            className="music-player__button"
            aria-label={
              playing
                ? "Pause music"
                : "Play music"
            }
          >
            {playing ? "PAUSE" : "PLAY"}
          </button>

          <div className="music-player__info">
            <span className="music-player__artist">
              ARTIST: ZAINE
            </span>

            <div className="music-player__marquee">
              <span
                className={`music-player__track ${
                  playing
                    ? "music-player__track--playing"
                    : ""
                }`}
              >
                hesi pull up
              </span>
            </div>

            <div className="music-player__progress">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.01}
                value={safeCurrentTime}
                disabled={duration <= 0}
                onInput={handleScrub}
                className="music-player__scrubber"
                aria-label="Song position"
                style={{
                  background: `linear-gradient(
                    to right,
                    var(--foreground) 0%,
                    var(--foreground) ${progress}%,
                    rgba(23, 25, 24, 0.18) ${progress}%,
                    rgba(23, 25, 24, 0.18) 100%
                  )`,
                }}
              />

              <div className="music-player__time">
                <span>
                  {formatTime(
                    safeCurrentTime
                  )}
                </span>

                <span>
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            <span className="music-player__status">
              {playing
                ? "NOW PLAYING"
                : "SOUND OFF"}
            </span>
          </div>
        </>
      )}
    </div>
  );
}