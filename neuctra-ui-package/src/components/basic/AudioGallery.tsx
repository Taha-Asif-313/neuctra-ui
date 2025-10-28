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
  Download,
  Heart,
  Share2,
  Music,
  Shuffle,
} from "lucide-react";

interface AudioTrack {
  src: string;
  title: string;
  artist?: string;
  thumbnail?: string;
  duration?: string;
}

interface AudioGalleryProps {
  tracks?: AudioTrack[];
  className?: string;
  galleryTitle?: string;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  secondaryColor?: string;
  autoplay?: boolean;
  borderColor?: string;
  border?: number;
  maxWidth?: number;
  loop?: boolean;
}

const defaultTracks: AudioTrack[] = [
  {
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    title: "Morning Bell",
    artist: "Nature Sounds",
    duration: "0:15",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  },
  {
    src: "https://www.soundjay.com/buttons/sounds/button-4.wav",
    title: "Digital Click",
    artist: "Tech Audio",
    duration: "0:05",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
  },
  {
    src: "https://www.soundjay.com/buttons/sounds/button-10.wav",
    title: "Soft Chime",
    artist: "Ambient Studio",
    duration: "0:08",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  },
];

export function AudioGallery({
  tracks = defaultTracks,
  className = "",
  galleryTitle = "Audio Gallery",
  primaryColor = "#8b5cf6",
  backgroundColor = "#0f0f23",
  textColor = "#e4e4e7",
  secondaryColor = "#1a1a2e",
  border = 0,
  borderColor,
  maxWidth = 420,
  autoplay = false,
  loop = false,
}: AudioGalleryProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    if (currentTrackIndex === null && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentTrackIndex]);

  const playPauseTrack = (index: number) => {
    if (currentTrackIndex === index) {
      if (!audioRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setCurrentTrackIndex(index);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 100);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    if (audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = e.clientX - rect.left;
    const percent = clickPos / rect.width;
    const seekTime = percent * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = e.clientX - rect.left;
    const percent = clickPos / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));
    setVolume(newVolume);
  };

  const skip = (seconds: number) => {
    if (audioRef.current && duration) {
      let newTime = audioRef.current.currentTime + seconds;
      newTime = Math.min(Math.max(newTime, 0), duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex === null) return;
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % tracks.length;
    }
    playPauseTrack(nextIndex);
  };

  const prevTrack = () => {
    if (currentTrackIndex === null) return;
    let prevIndex;
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * tracks.length);
    } else {
      prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    }
    playPauseTrack(prevIndex);
  };

  const toggleMute = () => {
    setVolume((prev) => (prev > 0 ? 0 : 0.7));
  };

  const showVolume = () => {
    setShowVolumeSlider(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 3000);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentTrack =
    currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  return (
    <div
      className={className}
      style={{
        maxWidth: `${maxWidth}px`,
        margin: "20px auto",
        background: `linear-gradient(145deg, ${backgroundColor}, ${secondaryColor})`,
        color: textColor,
        borderRadius: "24px",
        padding: "24px 16px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        userSelect: "none",
        backdropFilter: "blur(20px)",
        border: `${border}px solid ${borderColor}40`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Music size={20} color="white" />
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: "700",
                color: primaryColor, // fallback for browsers without WebkitTextFillColor
              }}
            >
              {galleryTitle}
            </h2>
            <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>
              {tracks.length} tracks
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsShuffle(!isShuffle)}
          style={{
            background: isShuffle ? primaryColor : "transparent",
            border: "none",
            borderRadius: "12px",
            padding: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            opacity: isShuffle ? 1 : 0.6,
          }}
          aria-label="Toggle Shuffle"
        >
          <Shuffle size={18} color={isShuffle ? "white" : textColor} />
        </button>
      </div>

      {/* Track List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "20px",
          maxHeight: "240px",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        {tracks.map((track, index) => {
          const isActive = currentTrackIndex === index;
          const isCurrentlyPlaying = isActive && isPlaying;

          return (
            <div
              key={index}
              onClick={() => playPauseTrack(index)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: "16px",
                background: isActive
                  ? `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)`
                  : "rgba(255,255,255,0.05)",
                border: isActive
                  ? `1px solid ${primaryColor}40`
                  : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: isActive ? `blur(20px)` : "none",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: track.thumbnail
                    ? `url(${track.thumbnail}) center/cover`
                    : primaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {!track.thumbnail && <Music size={20} color="white" />}
                {isCurrentlyPlaying && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0,0,0,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        display: "flex",
                        gap: "2px",
                        alignItems: "end",
                        justifyContent: "center",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: "3px",
                            background: "white",
                            borderRadius: "2px",
                            animation: `equalizer 1s ease-in-out infinite ${
                              i * 0.2
                            }s`,
                            height: "12px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    color: isActive ? primaryColor : textColor,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {track.title}
                </div>
                {track.artist && (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      opacity: 0.7,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {track.artist}
                  </div>
                )}
              </div>

              {/* Duration & Play Button */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {track.duration && (
                  <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                    {track.duration}
                  </span>
                )}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: isActive
                      ? primaryColor
                      : "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isCurrentlyPlaying ? (
                    <Pause size={16} color="white" />
                  ) : (
                    <Play size={16} color="white" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Track Display & Controls */}
      {currentTrack && (
        <div
          ref={playerRef}
          style={{
            background: `linear-gradient(135deg, ${secondaryColor}, ${backgroundColor})`,
            borderRadius: "20px",
            padding: "20px",
            border: `1px solid ${primaryColor}40`,
            backdropFilter: "blur(20px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Blur Effect */}
          {currentTrack.thumbnail && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${currentTrack.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(60px) opacity(0.1)",
                transform: "scale(1.1)",
              }}
            />
          )}

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Track Info */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  color: primaryColor,
                }}
              >
                {currentTrack.title}
              </h3>
              {currentTrack.artist && (
                <p style={{ margin: 0, opacity: 0.7, fontSize: "0.9rem" }}>
                  {currentTrack.artist}
                </p>
              )}
            </div>

            {/* Main Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={prevTrack}
                style={controlButtonStyle(textColor, "rgba(255,255,255,0.1)")}
                aria-label="Previous Track"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={() => skip(-10)}
                style={controlButtonStyle(textColor, "rgba(255,255,255,0.1)")}
                aria-label="Skip back 10 seconds"
              >
                <SkipBack size={16} />
                <span style={{ fontSize: "0.7rem", marginLeft: "2px" }}>
                  10
                </span>
              </button>

              <button
                onClick={() => {
                  if (!audioRef.current) return;
                  if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    audioRef.current.play().catch(() => {});
                    setIsPlaying(true);
                  }
                }}
                style={{
                  ...controlButtonStyle("#fff", primaryColor),
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  boxShadow: `0 8px 25px ${primaryColor}40`,
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={() => skip(10)}
                style={controlButtonStyle(textColor, "rgba(255,255,255,0.1)")}
                aria-label="Skip forward 10 seconds"
              >
                <span style={{ fontSize: "0.7rem", marginRight: "2px" }}>
                  10
                </span>
                <SkipForward size={16} />
              </button>

              <button
                onClick={nextTrack}
                style={controlButtonStyle(textColor, "rgba(255,255,255,0.1)")}
                aria-label="Next Track"
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontSize: "0.8rem",
                  opacity: 0.7,
                }}
              >
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div
                onClick={handleSeek}
                style={{
                  height: "6px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "3px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(currentTime / duration) * 100 || 0}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${primaryColor}, #ec4899)`,
                    borderRadius: "3px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "-6px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "12px",
                      height: "12px",
                      background: primaryColor,
                      borderRadius: "50%",
                      boxShadow: `0 2px 8px ${primaryColor}60`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Additional Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  style={controlButtonStyle(
                    isLiked ? "#ec4899" : textColor,
                    "rgba(255,255,255,0.1)"
                  )}
                  aria-label="Like"
                >
                  <Heart size={16} fill={isLiked ? "#ec4899" : "none"} />
                </button>

                <button
                  onClick={() => setIsLooping(!isLooping)}
                  style={controlButtonStyle(
                    isLooping ? primaryColor : textColor,
                    "rgba(255,255,255,0.1)"
                  )}
                  aria-label="Toggle Loop"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative",
                }}
              >
                {showVolumeSlider && (
                  <div
                    onClick={handleVolumeChange}
                    style={{
                      width: "80px",
                      height: "4px",
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "2px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: `${volume * 100}%`,
                        height: "100%",
                        background: primaryColor,
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                )}

                <button
                  onClick={toggleMute}
                  onMouseEnter={showVolume}
                  style={controlButtonStyle(textColor, "rgba(255,255,255,0.1)")}
                  aria-label={volume > 0 ? "Mute" : "Unmute"}
                >
                  {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.src}
            autoPlay={autoplay}
            loop={isLooping}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setIsPlaying(false);
              if (!isLooping) {
                nextTrack();
              }
            }}
            onLoadedMetadata={handleTimeUpdate}
            preload="metadata"
            style={{ display: "none" }}
          />
        </div>
      )}

      <style>{`
        @keyframes equalizer {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        
        /* Custom Scrollbar */
        div::-webkit-scrollbar {
          width: 4px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: ${primaryColor};
          border-radius: 2px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: ${primaryColor}dd;
        }
      `}</style>
    </div>
  );
}

function controlButtonStyle(
  color: string,
  backgroundColor: string
): React.CSSProperties {
  return {
    border: "none",
    backgroundColor,
    color,
    cursor: "pointer",
    padding: "10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  };
}
