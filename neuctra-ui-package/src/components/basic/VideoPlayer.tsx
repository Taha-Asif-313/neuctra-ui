import React, { useRef, useState, useEffect, useCallback } from "react";
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
  Settings,
  Download,
  Share2,
  PictureInPicture,
  Volume1,
  Rewind,
  FastForward,
  MoreHorizontal,
  Subtitles,
  Loader
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
  theme?: 'dark' | 'light' | 'glass' | 'neon';
  primaryColor?: string;
  className?: string;
  showProgress?: boolean;
  showVolumeSlider?: boolean;
  showSettings?: boolean;
  showDownload?: boolean;
  showShare?: boolean;
  showPiP?: boolean;
  showSubtitles?: boolean;
  showPlaybackSpeed?: boolean;
  showQuality?: boolean;
  previewThumbnails?: boolean;
  customControls?: boolean;
  hideControlsDelay?: number;
  seekStep?: number;
  volumeStep?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  autoPlay = false,
  loop = false,
  muted = false,
  width = "100%",
  height = "400px",
  borderRadius = "16px",
  theme = 'dark',
  primaryColor = "#3b82f6",
  className,
  showProgress = true,
  showVolumeSlider = true,
  showSettings = true,
  showDownload = true,
  showShare = true,
  showPiP = true,
  showSubtitles = false,
  showPlaybackSpeed = true,
  showQuality = true,
  previewThumbnails = false,
  customControls = true,
  hideControlsDelay = 3000,
  seekStep = 10,
  volumeStep = 0.1,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onVolumeChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 0.8);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState("auto");
  const [showControls, setShowControls] = useState(true);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showVolumePanel, setShowVolumePanel] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(0);

  // Theme configurations
  const themes = {
    dark: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      controlsBg: 'rgba(0, 0, 0, 0.8)',
      text: '#ffffff',
      textSecondary: '#a3a3a3',
      border: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(255, 255, 255, 0.1)',
    },
    light: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      controlsBg: 'rgba(255, 255, 255, 0.95)',
      text: '#212529',
      textSecondary: '#6c757d',
      border: 'rgba(0, 0, 0, 0.1)',
      hover: 'rgba(0, 0, 0, 0.05)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      controlsBg: 'rgba(255, 255, 255, 0.1)',
      text: '#ffffff',
      textSecondary: '#a3a3a3',
      border: 'rgba(255, 255, 255, 0.2)',
      hover: 'rgba(255, 255, 255, 0.2)',
    },
    neon: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 100%)',
      controlsBg: 'rgba(139, 69, 19, 0.8)',
      text: '#00ffff',
      textSecondary: '#ff00ff',
      border: 'rgba(0, 255, 255, 0.3)',
      hover: 'rgba(255, 0, 255, 0.2)',
    }
  };

  const currentTheme = themes[theme];

const startHideControlsTimer = useCallback(() => {
  if (typeof window === "undefined") return; // SSR-safe guard

  if (hideControlsTimer.current) {
    clearTimeout(hideControlsTimer.current);
  }

  hideControlsTimer.current = window.setTimeout(() => {
    if (isPlaying) {
      setShowControls(false);
    }
  }, hideControlsDelay);
}, [isPlaying, hideControlsDelay]);

  const showControlsTemp = useCallback(() => {
    setShowControls(true);
    startHideControlsTimer();
  }, [startHideControlsTimer]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.loop = isLooping;
      videoRef.current.muted = isMuted;
      videoRef.current.playbackRate = playbackRate;
    }
  }, [volume, isLooping, isMuted, playbackRate]);

  useEffect(() => {
    if (isPlaying) {
      startHideControlsTimer();
    } else {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
      setShowControls(true);
    }
  }, [isPlaying, startHideControlsTimer]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(time);
    setDuration(dur);
    onTimeUpdate?.(time);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;
    setHoverTime(time);
    setPreviewPosition(e.clientX - rect.left);
    setShowPreview(true);
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(0, videoRef.current.currentTime + seconds),
        duration
      );
    }
  };

  const changeVolume = (newVolume: number) => {
    const vol = Math.min(Math.max(newVolume, 0), 1);
    setVolume(vol);
    setIsMuted(vol === 0);
    onVolumeChange?.(vol);
  };

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    
    try {
      if (isFullscreen) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } else {
        if (playerRef.current.requestFullscreen) {
          await playerRef.current.requestFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    
    try {
      if (isPiP) {
        if (document.exitPictureInPicture) {
          await document.exitPictureInPicture();
        }
      } else {
        if (videoRef.current.requestPictureInPicture) {
          await videoRef.current.requestPictureInPicture();
        }
      }
      setIsPiP(!isPiP);
    } catch (error) {
      console.error('Picture-in-Picture error:', error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title || 'video';
    link.click();
  };

const handleShare = async () => {
  if (typeof window === "undefined") return; // skip on server
  if (!navigator) return; // extra safety

  try {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: title || "Video",
        url,
      });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      console.log("URL copied to clipboard!");
    } else {
      console.warn("Share API and Clipboard API not supported in this browser.");
    }
  } catch (error) {
    console.error("Share error:", error);
  }
};


  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={18} />;
    if (volume < 0.3) return <VolumeX size={18} />;
    if (volume < 0.7) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    };
  }, []);

  return (
    <div
      ref={playerRef}
      className={className}
      style={{
        position: "relative",
        width,
        height,
        background: currentTheme.background,
        borderRadius,
        overflow: "hidden",
        boxShadow: theme === 'glass' ? 
          'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)' : 
          '0 10px 30px rgba(0, 0, 0, 0.3)',
        backdropFilter: theme === 'glass' ? 'blur(16px)' : 'none',
        userSelect: "none",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
      onMouseMove={showControlsTemp}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={false}
        onClick={togglePlayPause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onWaiting={() => setIsBuffering(true)}
        onCanPlay={() => setIsBuffering(false)}
        onEnded={() => {
          setIsPlaying(false);
          onEnded?.();
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          backgroundColor: "#000",
        }}
      />

      {/* Loading Spinner */}
      {isBuffering && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: currentTheme.text,
            animation: "spin 1s linear infinite",
          }}
        >
          <Loader size={48} />
        </div>
      )}

      {/* Center Play Button */}
      {!isPlaying && !isBuffering && (
        <button
          onClick={togglePlayPause}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `${primaryColor}CC`,
            borderRadius: "50%",
            border: "none",
            padding: "24px",
            cursor: "pointer",
            color: "#fff",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)";
            e.currentTarget.style.background = primaryColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
            e.currentTarget.style.background = `${primaryColor}CC`;
          }}
        >
          <Play size={32} />
        </button>
      )}

      {/* Title Overlay */}
      {title && showControls && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            color: currentTheme.text,
            fontSize: "18px",
            fontWeight: "600",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
            opacity: showControls ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {title}
        </div>
      )}

      {/* Custom Controls */}
      {customControls && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: currentTheme.controlsBg,
            backdropFilter: "blur(10px)",
            color: currentTheme.text,
            padding: "16px",
            transform: showControls ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Progress Bar */}
          {showProgress && (
            <div
              style={{
                marginBottom: "12px",
                position: "relative",
              }}
            >
              <div
                ref={progressRef}
                onClick={handleSeek}
                onMouseMove={handleProgressHover}
                onMouseLeave={() => setShowPreview(false)}
                style={{
                  height: "6px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "3px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <div
                  style={{
                    width: `${(currentTime / duration) * 100 || 0}%`,
                    height: "100%",
                    background: primaryColor,
                    borderRadius: "3px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "-6px",
                      top: "50%",
                      width: "12px",
                      height: "12px",
                      background: primaryColor,
                      borderRadius: "50%",
                      transform: "translateY(-50%)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </div>
              </div>

              {/* Time Preview */}
              {showPreview && previewThumbnails && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: `${previewPosition}px`,
                    transform: "translateX(-50%)",
                    background: "rgba(0, 0, 0, 0.9)",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>
          )}

          {/* Main Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Left Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => skip(-seekStep)}
                style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={togglePlayPause}
                style={{
                  background: primaryColor,
                  borderRadius: "50%",
                  padding: "12px",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                onClick={() => skip(seekStep)}
                style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
              >
                <SkipForward size={20} />
              </button>

              {/* Volume Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  onMouseEnter={() => showVolumeSlider && setShowVolumePanel(true)}
                  style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
                >
                  <VolumeIcon />
                </button>

                {showVolumeSlider && (
                  <div
                    onMouseEnter={() => setShowVolumePanel(true)}
                    onMouseLeave={() => setShowVolumePanel(false)}
                    style={{
                      position: showVolumePanel ? "relative" : "absolute",
                      left: showVolumePanel ? "0" : "40px",
                      bottom: showVolumePanel ? "0" : "40px",
                      width: showVolumePanel ? "80px" : "30px",
                      height: showVolumePanel ? "6px" : "80px",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "3px",
                      cursor: "pointer",
                      opacity: showVolumePanel ? 1 : 0,
                      transition: "all 0.3s ease",
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percent = (e.clientX - rect.left) / rect.width;
                      changeVolume(percent);
                    }}
                  >
                    <div
                      style={{
                        width: `${volume * 100}%`,
                        height: "100%",
                        background: primaryColor,
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Time Display */}
              <div style={{ fontSize: "14px", color: currentTheme.textSecondary, minWidth: "100px" }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Right Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {showSubtitles && (
                <button
                  style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
                >
                  <Subtitles size={18} />
                </button>
              )}

              {showSettings && (
                <button
                  onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                  style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
                >
                  <Settings size={18} />
                </button>
              )}

              {showDownload && (
                <button
                  onClick={handleDownload}
                  style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
                >
                  <Download size={18} />
                </button>
              )}

              {showShare && (
                <button
                  onClick={handleShare}
                  style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
                >
                  <Share2 size={18} />
                </button>
              )}

              {showPiP && (
                <button
                  onClick={togglePiP}
                  style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
                >
                  <PictureInPicture size={18} />
                </button>
              )}

              <button
                onClick={() => setIsLooping(!isLooping)}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: isLooping ? primaryColor : currentTheme.text, 
                  cursor: "pointer", 
                  padding: "8px" 
                }}
              >
                <RotateCcw size={18} />
              </button>

              <button
                onClick={toggleFullscreen}
                style={{ background: "none", border: "none", color: currentTheme.text, cursor: "pointer", padding: "8px" }}
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettingsPanel && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "16px",
            background: currentTheme.controlsBg,
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "16px",
            minWidth: "200px",
            color: currentTheme.text,
            border: `1px solid ${currentTheme.border}`,
            opacity: showSettingsPanel ? 1 : 0,
            transform: showSettingsPanel ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.3s ease",
          }}
        >
          {showPlaybackSpeed && (
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "14px", marginBottom: "8px", color: currentTheme.textSecondary }}>
                Playback Speed
              </div>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackRate(speed)}
                    style={{
                      background: playbackRate === speed ? primaryColor : "transparent",
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: "6px",
                      padding: "4px 8px",
                      color: currentTheme.text,
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          )}

          {showQuality && (
            <div>
              <div style={{ fontSize: "14px", marginBottom: "8px", color: currentTheme.textSecondary }}>
                Quality
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {["auto", "1080p", "720p", "480p", "360p"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    style={{
                      background: quality === q ? primaryColor : "transparent",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px",
                      color: currentTheme.text,
                      cursor: "pointer",
                      fontSize: "12px",
                      textAlign: "left",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Demo Component
// export default function App() {
//   return (
//     <div style={{ padding: "20px", backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
//       <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
//         <h1 style={{ color: "#fff", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
//           Modern Enhanced Video Player
//         </h1>
        
//         <ModernVideoPlayer
//           src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//           poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
//           title="Big Buck Bunny - Sample Video"
//           theme="dark"
//           primaryColor="#3b82f6"
//           showProgress={true}
//           showVolumeSlider={true}
//           showSettings={true}
//           showDownload={true}
//           showShare={true}
//           showPiP={true}
//           showPlaybackSpeed={true}
//           showQuality={true}
//           previewThumbnails={true}
//           customControls={true}
//           onPlay={() => console.log("Video started playing")}
//           onPause={() => console.log("Video paused")}
//           onEnded={() => console.log("Video ended")}
//           onTimeUpdate={(time) => console.log("Time:", time)}
//           onVolumeChange={(volume) => console.log("Volume:", volume)}
//         />

//         <ModernVideoPlayer
//           src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
//           poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg"
//           title="Elephants Dream - Glass Theme"
//           theme="glass"
//           primaryColor="#ff6b6b"
//           height="300px"
//         />

//         <ModernVideoPlayer
//           src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
//           poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
//           title="For Bigger Blazes - Neon Theme"
//           theme="neon"
//           primaryColor="#00ffff"
//           height="250px"
//         />
//       </div>
//     </div>
//   );
// }