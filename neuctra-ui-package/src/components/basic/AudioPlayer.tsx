"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface AudioPlayerProps {
  src: string;
  thumbnail?: string;
  autoPlay?: boolean;
  loop?: boolean;
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderRadius?: string;
  className?: string;
  padding?: string;
  width?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  thumbnail,
  autoPlay = false,
  loop = false,
  backgroundColor = "#0a0a0a",
  primaryColor = "#10b981",
  secondaryColor = "#ffffff",
  borderRadius = "12px",
  padding = "12px",
  width = "100%",
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = isLooping;
  }, [isLooping]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  };

  const skip = (seconds: number) => {
    if (audioRef.current) audioRef.current.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    isFullscreen
      ? document.exitFullscreen?.()
      : playerRef.current.requestFullscreen?.();
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      ref={playerRef}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width,
        backgroundColor,
        borderRadius,
        padding,
        boxSizing: "border-box",
        color: secondaryColor,
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        flexWrap: "wrap",
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Thumbnail / Avatar */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="Audio Thumbnail"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      )}

      {/* Main Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flex: 1,
          minWidth: "0",
        }}
      >
        <button
          onClick={() => skip(-10)}
          style={{
            background: "transparent",
            border: "none",
            color: secondaryColor,
            cursor: "pointer",
          }}
          aria-label="Skip Back 10s"
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={togglePlayPause}
          style={{
            background: primaryColor,
            borderRadius: "50%",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={() => skip(10)}
          style={{
            background: "transparent",
            border: "none",
            color: secondaryColor,
            cursor: "pointer",
          }}
          aria-label="Skip Forward 10s"
        >
          <SkipForward size={20} />
        </button>

        {/* Seek Bar */}
        <div
          onClick={handleSeek}
          style={{
            flex: 1,
            height: "6px",
            background: "#444",
            borderRadius: "3px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${(currentTime / duration) * 100 || 0}%`,
              height: "100%",
              background: primaryColor,
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Time */}
        <div style={{ minWidth: "70px", textAlign: "right", fontSize: "0.8rem" }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Extra Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setIsLooping(!isLooping)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: isLooping ? primaryColor : secondaryColor,
            }}
            aria-label="Toggle Loop"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: secondaryColor,
            }}
            aria-label="Toggle Mute"
          >
            {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={toggleFullscreen}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: secondaryColor,
            }}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};