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
  backgroundColor = "#000000",
  primaryColor = "#10b981",
  secondaryColor = "#ffffff",
  borderRadius = "12px",
  padding = "16px",
  width = "100%",
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
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
    if (!audioRef.current || !e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
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
        position: "relative",
        width,
        backgroundColor,
        borderRadius,
        color: secondaryColor,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        overflow: "hidden",
        padding,
        boxSizing: "border-box",
        maxWidth: "100%",
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

      {thumbnail && (
        <img
          src={thumbnail}
          alt="Audio Thumbnail"
          style={{
            width: "100%",
            objectFit: "cover",
            borderRadius,
            marginBottom: "16px",
            maxHeight: "150px",
          }}
        />
      )}

      {/* Main Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          flexShrink: 0,
          marginTop: "10px",
        }}
      >
        <button onClick={() => skip(-10)} aria-label="Skip Back 10s">
          <SkipBack size={20} />
        </button>
        <button
          onClick={togglePlayPause}
          style={{
            background: primaryColor,
            borderRadius: "9999px",
            padding: "10px",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={() => skip(10)} aria-label="Skip Forward 10s">
          <SkipForward size={20} />
        </button>
      </div>

      {/* Time & Seek */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          width: "100%",
        }}
      >
        {/* Time Info */}
        <div style={{ flexShrink: 0, minWidth: "60px", textAlign: "center" }}>
          <span style={{ fontSize: "14px", marginRight: "4px" }}>
            {formatTime(currentTime)}
          </span>
          <span style={{ fontSize: "14px", color: "#aaa" }}>
            / {formatTime(duration)}
          </span>
        </div>

        {/* Seek Bar */}
        <div
          onClick={handleSeek}
          style={{
            flex: 1,
            height: "8px",
            background: "#444",
            borderRadius: "4px",
            cursor: "pointer",
            position: "relative",
            minWidth: "100px",
          }}
        >
          <div
            style={{
              width: `${(currentTime / duration) * 100 || 0}%`,
              height: "100%",
              background: primaryColor,
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Extra Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setIsLooping(!isLooping)}
            aria-label="Toggle Loop"
          >
            <RotateCcw size={18} color={isLooping ? primaryColor : undefined} />
          </button>
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
            aria-label="Toggle Mute"
          >
            {volume > 0 ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
