"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
  Download,
  Share2,
  Heart,
  Eye,
  Calendar,
  Clock,
  User,
  Tag,
  Loader,
  Search,
  Filter,
  Grid,
  List,
  Columns,
  Film,
  Sliders,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

// Enhanced Video Interface with more metadata options
interface VideoData {
  id: string;
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  duration?: number;
  author?: string;
  publishDate?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  category?: string;
  thumbnail?: string;
  quality?: "auto" | "720p" | "1080p" | "4k";
  subtitles?: { src: string; label: string; language: string }[];
  chapters?: { time: number; title: string }[];
  resolution?: string;
  frameRate?: number;
  license?: string;
  location?: string;
}

// Enhanced responsive breakpoints with more options
interface ResponsiveConfig {
  xs?: number; // < 480px
  sm?: number; // 480px - 640px
  md?: number; // 640px - 768px
  lg?: number; // 768px - 1024px
  xl?: number; // 1024px - 1280px
  "2xl"?: number; // > 1280px
  "3xl"?: number; // > 1536px
}

// Enhanced theme configuration with more options
interface ThemeConfig {
  // Colors
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  surface?: string;
  text?: string;
  textSecondary?: string;
  textTertiary?: string;
  border?: string;
  // Effects
  shadow?: string;
  hoverShadow?: string;
  gradient?: string;
  // Shapes
  borderRadius?: string;
  borderRadiusSmall?: string;
  borderRadiusLarge?: string;
  // Transitions
  transitionSpeed?: string;
  transitionEasing?: string;
  // Typography
  fontFamily?: string;
  fontSizeBase?: string;
  fontWeightNormal?: string;
  fontWeightBold?: string;
  // Spacing
  spacingUnit?: string;
  // Custom
  backdropBlur?: string;
  overlayOpacity?: string;
}

// Layout options with more variants
type LayoutType =
  | "grid"
  | "masonry"
  | "carousel"
  | "list"
  | "mosaic"
  | "compact"
  | "highlight";
type AspectRatio =
  | "16:9"
  | "4:3"
  | "1:1"
  | "3:2"
  | "21:9"
  | "auto"
  | "9:16"
  | "custom";
type AnimationType =
  | "fade"
  | "slide"
  | "zoom"
  | "flip"
  | "none"
  | "slide-up"
  | "slide-down";
type SortOption =
  | "date"
  | "title"
  | "views"
  | "likes"
  | "duration"
  | "random"
  | "trending";

interface VideoGalleryProps {
  videos: VideoData[];
  // Layout Configuration
  layout?: LayoutType;
  columns?: ResponsiveConfig;
  gap?: string | ResponsiveConfig;
  aspectRatio?: AspectRatio;
  // Visual Configuration
  theme?: ThemeConfig;
  showThumbnails?: boolean;
  showMetadata?: boolean;
  metadataPosition?: "below" | "overlay" | "hover";
  showControls?: boolean;
  controlsPosition?: "bottom" | "top" | "sides" | "floating";
  showProgress?: boolean;
  showVolume?: boolean;
  showQualityOptions?: boolean;
  showSpeedOptions?: boolean;
  // Behavior Configuration
  autoPlay?: boolean;
  autoPlayDelay?: number;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  lazyLoading?: boolean;
  infiniteScroll?: boolean;
  loadMoreThreshold?: number;
  // Lightbox Configuration
  lightbox?: boolean;
  lightboxAnimation?: AnimationType;
  lightboxTransitionSpeed?: number;
  keyboard?: boolean;
  swipeGestures?: boolean;
  // SEO & Accessibility
  title?: string;
  description?: string;
  ariaLabel?: string;
  structured?: boolean;
  // Advanced Features
  search?: boolean;
  searchPlaceholder?: string;
  filter?: boolean;
  sort?: boolean;
  sortOptions?: SortOption[];
  playlist?: boolean;
  fullscreen?: boolean;
  pictureInPicture?: boolean;
  sharing?: boolean;
  download?: boolean;
  favorites?: boolean;
  // Customization
  customLoader?: React.ReactNode;
  customEmptyState?: React.ReactNode;
  customErrorState?: React.ReactNode;
  // Callbacks
  onVideoClick?: (video: VideoData, index: number) => void;
  onVideoEnd?: (video: VideoData, index: number) => void;
  onVideoPlay?: (video: VideoData, index: number) => void;
  onVideoPause?: (video: VideoData, index: number) => void;
  onVideoLike?: (video: VideoData, liked: boolean) => void;
  onVideoShare?: (video: VideoData) => void;
  onVideoDownload?: (video: VideoData) => void;
  onLayoutChange?: (layout: LayoutType) => void;
  onSearch?: (query: string) => void;
  onFilter?: (category: string) => void;
  onSort?: (sortBy: SortOption) => void;
  // Classes
  className?: string;
  containerClassName?: string;
  videoItemClassName?: string;
  controlsClassName?: string;
}

const defaultTheme: ThemeConfig = {
  // Colors
  primary: "#3b82f6",
  secondary: "#6366f1",
  accent: "#f59e0b",
  background: "#0f172a",
  surface: "#1e293b",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  textTertiary: "#64748b",
  border: "#334155",
  // Effects
  shadow: "0 10px 25px rgba(0,0,0,0.3)",
  hoverShadow: "0 15px 30px rgba(0,0,0,0.4)",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  // Shapes
  borderRadius: "0px 0px 12px 12px",
  borderRadiusSmall: "6px",
  borderRadiusLarge: "16px",
  // Transitions
  transitionSpeed: "0.3s",
  transitionEasing: "ease",
  // Typography
  fontFamily: "inherit",
  fontSizeBase: "16px",
  fontWeightNormal: "400",
  fontWeightBold: "600",
  // Spacing
  spacingUnit: "16px",
  // Custom
  backdropBlur: "8px",
  overlayOpacity: "0.7",
};

const defaultColumns: ResponsiveConfig = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  "2xl": 6,
  "3xl": 7,
};

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  // Layout
  layout = "grid",
  columns = defaultColumns,
  gap = "16px",
  aspectRatio = "16:9",
  // Visual
  theme = defaultTheme,
  showThumbnails = true,
  showMetadata = true,
  metadataPosition = "below",
  showControls = true,
  controlsPosition = "bottom",
  showProgress = true,
  showVolume = true,
  showQualityOptions = false,
  showSpeedOptions = false,
  // Behavior
  autoPlay = false,
  autoPlayDelay = 2000,
  autoAdvance = false,
  autoAdvanceDelay = 5000,
  loop = false,
  muted = true,
  preload = "metadata",
  lazyLoading = true,
  infiniteScroll = false,
  loadMoreThreshold = 1000,
  // Lightbox
  lightbox = true,
  lightboxAnimation = "zoom",
  lightboxTransitionSpeed = 300,
  keyboard = true,
  swipeGestures = true,
  // SEO
  title = "Video Gallery",
  description = "A collection of videos",
  ariaLabel = "Video gallery",
  structured = true,
  // Features
  search = true,
  searchPlaceholder = "Search videos...",
  filter = true,
  sort = true,
  sortOptions = ["date", "title", "views", "likes", "duration"],
  playlist = false,
  fullscreen = true,
  pictureInPicture = false,
  sharing = true,
  download = false,
  favorites = true,
  // Customization
  customLoader,
  customEmptyState,
  customErrorState,
  // Callbacks
  onVideoClick,
  onVideoEnd,
  onVideoPlay,
  onVideoPause,
  onVideoLike,
  onVideoShare,
  onVideoDownload,
  onLayoutChange,
  onSearch,
  onFilter,
  onSort,
  // Classes
  className = "",
  containerClassName = "",
  videoItemClassName = "",
  controlsClassName = "",
}) => {
  // State management
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [favoriteVideos, setFavoriteVideos] = useState<Set<string>>(new Set());
  const [visibleVideos, setVisibleVideos] = useState(12);
  const [activeLayout, setActiveLayout] = useState<LayoutType>(layout);
  const [videoQuality, setVideoQuality] = useState<string>("auto");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Merge default theme with custom theme
  const mergedTheme = useMemo(
    () => ({
      ...defaultTheme,
      hoverShadow: theme.hoverShadow ?? defaultTheme.hoverShadow,
      ...theme,
    }),
    [theme]
  );

  // Responsive columns calculation
  const getCurrentColumns = useCallback(() => {
    const { width } = windowSize;
    if (width < 480) return columns.xs ?? 1;
    if (width < 640) return columns.sm ?? 2;
    if (width < 768) return columns.md ?? 3;
    if (width < 1024) return columns.lg ?? 4;
    if (width < 1280) return columns.xl ?? 5;
    if (width < 1536) return columns["2xl"] ?? 6;
    return columns["3xl"] ?? 7;
  }, [windowSize, columns]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter and search logic
  const filteredVideos = useMemo(() => {
    try {
      let filtered = [...videos];

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter(
          (video) =>
            video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            video.tags?.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            video.author?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        onSearch?.(searchQuery);
      }

      // Category filter
      if (filterCategory !== "all") {
        filtered = filtered.filter(
          (video) => video.category === filterCategory
        );
        onFilter?.(filterCategory);
      }

      // Sort
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "title":
            return (a.title || "").localeCompare(b.title || "");
          case "views":
            return (b.views || 0) - (a.views || 0);
          case "likes":
            return (b.likes || 0) - (a.likes || 0);
          case "duration":
            return (b.duration || 0) - (a.duration || 0);
          case "random":
            return Math.random() - 0.5;
          case "trending":
            // Simple trending algorithm (views/likes ratio + recency)
            const aScore =
              ((a.views || 0) / ((a.likes || 0) + 1)) *
              (a.publishDate ? new Date(a.publishDate).getTime() : 0);
            const bScore =
              ((b.views || 0) / ((b.likes || 0) + 1)) *
              (b.publishDate ? new Date(b.publishDate).getTime() : 0);
            return bScore - aScore;
          case "date":
          default:
            return (
              new Date(b.publishDate || "").getTime() -
              new Date(a.publishDate || "").getTime()
            );
        }
      });
      onSort?.(sortBy);

      return infiniteScroll ? filtered.slice(0, visibleVideos) : filtered;
    } catch (err) {
      setError("Error filtering videos");
      console.error(err);
      return [];
    }
  }, [
    videos,
    searchQuery,
    filterCategory,
    sortBy,
    infiniteScroll,
    visibleVideos,
  ]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = videos
      .map((v) => v.category)
      .filter((cat): cat is string => Boolean(cat));
    return ["all", ...Array.from(new Set(cats))];
  }, [videos]);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboard || selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setSelectedIndex(null);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + videos.length) % videos.length : null
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % videos.length : null
          );
          break;
        case " ":
          e.preventDefault();
          // Toggle play/pause
          break;
        case "m":
          e.preventDefault();
          // Toggle mute
          break;
        case "f":
          e.preventDefault();
          // Toggle fullscreen
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [keyboard, selectedIndex, videos.length]);

  // Touch/swipe handling for mobile
  useEffect(() => {
    if (!swipeGestures || !lightboxRef.current || selectedIndex === null)
      return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Only consider horizontal swipes with minimal vertical movement
      if (Math.abs(diffX) > 50 && Math.abs(diffY) < 50) {
        if (diffX > 0) {
          // Swipe left - next video
          setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % videos.length : null
          );
        } else {
          // Swipe right - previous video
          setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + videos.length) % videos.length : null
          );
        }
      }
    };

    const element = lightboxRef.current;
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [swipeGestures, selectedIndex, videos.length]);

  // Infinite scroll handler
  useEffect(() => {
    if (!infiniteScroll) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - loadMoreThreshold
      ) {
        setVisibleVideos((prev) => Math.min(prev + 12, videos.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [infiniteScroll, videos.length, loadMoreThreshold]);

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!structured) return null;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "VideoGallery",
      name: title,
      description: description,
      video: videos.map((video) => ({
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: video.poster || video.thumbnail,
        contentUrl: video.src,
        uploadDate: video.publishDate,
        duration: video.duration ? `PT${video.duration}S` : undefined,
        author: {
          "@type": "Person",
          name: video.author,
        },
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/WatchAction",
            userInteractionCount: video.views || 0,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: video.likes || 0,
          },
        ],
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  };

  // Handle layout change
  const handleLayoutChange = (newLayout: LayoutType) => {
    setActiveLayout(newLayout);
    onLayoutChange?.(newLayout);
  };

  // Handle video like
  const handleVideoLike = (videoId: string) => {
    setFavoriteVideos((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(videoId)) {
        newFavorites.delete(videoId);
        const video = videos.find((v) => v.id === videoId);
        if (video) onVideoLike?.(video, false);
      } else {
        newFavorites.add(videoId);
        const video = videos.find((v) => v.id === videoId);
        if (video) onVideoLike?.(video, true);
      }
      return newFavorites;
    });
  };

  // Handle video share
  const handleVideoShare = (video: VideoData) => {
    if (navigator.share) {
      navigator
        .share({
          title: video.title,
          text: video.description,
          url: video.src,
        })
        .catch(() => {
          navigator.clipboard?.writeText(video.src);
        });
    } else {
      navigator.clipboard?.writeText(video.src);
    }
    onVideoShare?.(video);
  };

  // Handle video download
  const handleVideoDownload = (video: VideoData) => {
    const a = document.createElement("a");
    a.href = video.src;
    a.download = video.title || "video";
    a.click();
    onVideoDownload?.(video);
  };

  // Format time (mm:ss or hh:mm:ss)
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Modern Video Player Component
  const VideoPlayer: React.FC<{
    video: VideoData;
    isLightbox?: boolean;
    onClick?: () => void;
  }> = ({ video, isLightbox = false, onClick }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(muted);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);

    // Detect mobile on mount
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);
      return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    // Auto-hide controls after delay when playing
    useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (isPlaying) {
        setShowControls(true);
        timeout = setTimeout(() => {
          setShowControls(false);
        }, 2000);
      } else {
        setShowControls(true);
      }

      return () => clearTimeout(timeout);
    }, [isPlaying, currentTime]);

    // Play/pause toggle
    const togglePlay = useCallback(() => {
      if (!videoRef.current) return;

      if (isPlaying) {
        videoRef.current.pause();
        onVideoPause?.(
          video,
          videos.findIndex((v) => v.id === video.id)
        );
      } else {
        videoRef.current.play();
        onVideoPlay?.(
          video,
          videos.findIndex((v) => v.id === video.id)
        );
      }
      setIsPlaying(!isPlaying);
    }, [isPlaying, video]);

    // Handle time update
    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    };

    // Handle seek
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const time = percent * duration;
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
      if (!videoRef.current?.parentElement) return;
      if (isFullscreen) {
        document.exitFullscreen?.();
      } else {
        videoRef.current.parentElement.requestFullscreen?.();
      }
      setIsFullscreen(!isFullscreen);
    };

    // Toggle mute
    const toggleMute = () => {
      if (!videoRef.current) return;
      if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
        if (volume === 0) setVolume(0.5);
      } else {
        setIsMuted(true);
        videoRef.current.muted = true;
      }
    };

    // Change playback speed
    const changePlaybackSpeed = (speed: number) => {
      if (videoRef.current) {
        videoRef.current.playbackRate = speed;
        setPlaybackSpeed(speed);
      }
      setShowSpeedMenu(false);
    };

    // Change video quality
    const changeVideoQuality = (quality: string) => {
      setVideoQuality(quality);
      setShowQualityMenu(false);
    };

    // Handle touch events for mobile controls
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
      setShowControls(true);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Only consider horizontal swipes with minimal vertical movement
      if (Math.abs(diffX) > 50 && Math.abs(diffY) < 50) {
        if (diffX > 0) {
          // Swipe left - forward 10 seconds
          if (videoRef.current) videoRef.current.currentTime += 10;
        } else {
          // Swipe right - rewind 10 seconds
          if (videoRef.current) videoRef.current.currentTime -= 10;
        }
      } else {
        // Tap - toggle play/pause
        togglePlay();
      }
    };

    // Get aspect ratio style
    const getAspectRatioStyle = () => {
      if (aspectRatio === "auto" || aspectRatio === "custom") return {};
      const ratios: Record<Exclude<AspectRatio, "auto" | "custom">, string> = {
        "16:9": "56.25%",
        "4:3": "75%",
        "1:1": "100%",
        "3:2": "66.67%",
        "21:9": "42.86%",
        "9:16": "177.78%",
      };
      return { paddingBottom: ratios[aspectRatio] };
    };

    // Get metadata position style
    const getMetadataPositionStyle = (): React.CSSProperties => {
      const baseStyle: React.CSSProperties = {
        padding: mergedTheme.spacingUnit,
        color: mergedTheme.text,
      };

      switch (metadataPosition) {
        case "overlay":
          return {
            ...baseStyle,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: `linear-gradient(to top, rgba(0,0,0,${mergedTheme.overlayOpacity}), transparent)`,
          };
        case "hover":
          return {
            ...baseStyle,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            transition: `opacity ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
            background: `linear-gradient(to top, rgba(0,0,0,${mergedTheme.overlayOpacity}), transparent)`,
          };
        default:
          return baseStyle;
      }
    };

    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: mergedTheme.surface,
          borderRadius: mergedTheme.borderRadius,
          boxShadow: mergedTheme.shadow,
          border: `1px solid ${mergedTheme.border}`,
          cursor: onClick ? "pointer" : "default",
          height: "100%",
        }}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        onMouseMove={() => setShowControls(true)}
        className={videoItemClassName}
      >
        {/* Video Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            ...getAspectRatioStyle(),
          }}
        >
          {showThumbnails && (
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster || video.thumbnail}
              preload={preload}
              loop={loop}
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              onWaiting={() => setIsBuffering(true)}
              onCanPlay={() => setIsBuffering(false)}
              onEnded={() => {
                setIsPlaying(false);
                onVideoEnd?.(
                  video,
                  videos.findIndex((v) => v.id === video.id)
                );
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius:
                  aspectRatio === "auto"
                    ? mergedTheme.borderRadius
                    : `${mergedTheme.borderRadius} ${mergedTheme.borderRadius} 0 0`,
                ...(aspectRatio === "auto"
                  ? { aspectRatio: "16/9" }
                  : { position: "absolute", top: 0, left: 0 }),
              }}
            />
          )}

          {/* Play Overlay - Only show when not in lightbox mode and not playing */}
          {selectedIndex === null && !isPlaying && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
                backdropFilter: `blur(${mergedTheme.backdropBlur})`,
              }}
              onClick={onClick || togglePlay}
            >
              {isBuffering ? (
                customLoader || (
                  <div style={{ animation: "spin 1s linear infinite" }}>
                    <Loader size={48} color={mergedTheme.primary} />
                  </div>
                )
              ) : (
                <div
                  style={{
                    backgroundColor: `${mergedTheme.primary}33`,
                    backdropFilter: "blur(4px)",
                    borderRadius: "50%",
                    padding: "16px",
                  }}
                >
                  <Play
                    size={32}
                    color={mergedTheme.text}
                    fill={mergedTheme.text}
                  />
                </div>
              )}
            </div>
          )}

          {/* Duration Badge */}
          {video.duration && (
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                padding: "4px 8px",
                fontSize: "12px",
                fontWeight: mergedTheme.fontWeightBold,
                borderRadius: mergedTheme.borderRadiusSmall,
                backgroundColor: mergedTheme.background + "CC",
                color: mergedTheme.text,
                backdropFilter: `blur(${mergedTheme.backdropBlur})`,
              }}
            >
              {formatTime(video.duration)}
            </div>
          )}

          {/* Favorite Button */}
          {favorites && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleVideoLike(video.id);
              }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                padding: "8px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "none",
                cursor: "pointer",
                backdropFilter: `blur(${mergedTheme.backdropBlur})`,
              }}
              aria-label={
                favoriteVideos.has(video.id) ? "Unlike video" : "Like video"
              }
            >
              <Heart
                size={16}
                color={
                  favoriteVideos.has(video.id)
                    ? mergedTheme.accent
                    : mergedTheme.text
                }
                fill={
                  favoriteVideos.has(video.id) ? mergedTheme.accent : "none"
                }
              />
            </button>
          )}
        </div>

        {/* Lightbox Controls - Only show when controls should be visible */}
        {isLightbox && showControls && (
          <div
            ref={controlsRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: mergedTheme.spacingUnit,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              borderRadius: `0 0 ${mergedTheme.borderRadius} ${mergedTheme.borderRadius}`,
              backdropFilter: `blur(${mergedTheme.backdropBlur})`,
              transition: `opacity ${mergedTheme.transitionSpeed} ease`,
              opacity: showControls ? 1 : 0,
            }}
            className={controlsClassName}
          >
            {/* Progress Bar */}
            {showProgress && (
              <div
                onClick={handleSeek}
                style={{
                  height: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: mergedTheme.borderRadiusSmall,
                  cursor: "pointer",
                  position: "relative",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: mergedTheme.borderRadiusSmall,
                    width: `${(currentTime / duration) * 100 || 0}%`,
                    backgroundColor: mergedTheme.primary,
                  }}
                />
              </div>
            )}

            {/* Main Controls */}
        
            <div
              style={{
                display:  "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <button
                  onClick={togglePlay}
                  style={{
                    padding: "8px",
                    borderRadius: "50%",
                    backgroundColor: mergedTheme.primary,
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={20} color={mergedTheme.text} />
                  ) : (
                    <Play size={20} color={mergedTheme.text} />
                  )}
                </button>

                {showVolume && (
                  <>
                    <button
                      onClick={toggleMute}
                      style={{
                        padding: "6px",
                        borderRadius: "50%",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX size={18} color={mergedTheme.text} />
                      ) : (
                        <Volume2 size={18} color={mergedTheme.text} />
                      )}
                    </button>

                    {!isMobile && (
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          const newVolume = parseFloat(e.target.value);
                          setVolume(newVolume);
                          if (videoRef.current) {
                            videoRef.current.volume = newVolume;
                            if (newVolume > 0) setIsMuted(false);
                          }
                        }}
                        style={{
                          width: "80px",
                          height: "4px",
                          borderRadius: "2px",
                          background: `linear-gradient(to right, ${
                            mergedTheme.primary
                          } 0%, ${mergedTheme.primary} ${
                            (isMuted ? 0 : volume) * 100
                          }%, rgba(255,255,255,0.3) ${
                            (isMuted ? 0 : volume) * 100
                          }%, rgba(255,255,255,0.3) 100%)`,
                        }}
                        aria-label="Volume control"
                      />
                    )}
                  </>
                )}

                <span
                  style={{
                    fontSize: "14px",
                    color: mergedTheme.text,
                    minWidth: "40px",
                  }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {showSpeedOptions && (
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: mergedTheme.borderRadiusSmall,
                        backgroundColor: showSpeedMenu
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                        border: "none",
                        color: mergedTheme.text,
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      aria-label="Playback speed"
                    >
                      {playbackSpeed}x
                    </button>
                    {showSpeedMenu && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "100%",
                          right: 0,
                          backgroundColor: mergedTheme.surface,
                          borderRadius: mergedTheme.borderRadiusSmall,
                          padding: "8px",
                          boxShadow: mergedTheme.shadow,
                          zIndex: 10,
                          minWidth: "80px",
                        }}
                      >
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => changePlaybackSpeed(speed)}
                            style={{
                              width: "100%",
                              padding: "6px 10px",
                              backgroundColor:
                                playbackSpeed === speed
                                  ? mergedTheme.primary + "33"
                                  : "transparent",
                              border: "none",
                              color: mergedTheme.text,
                              cursor: "pointer",
                            }}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {fullscreen && (
                  <button
                    onClick={toggleFullscreen}
                    style={{
                      padding: "6px",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label={
                      isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                    }
                  >
                    {isFullscreen ? (
                      <Minimize size={18} color={mergedTheme.text} />
                    ) : (
                      <Maximize size={18} color={mergedTheme.text} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Metadata */}
        {showMetadata && (
          <div style={getMetadataPositionStyle()}>
            {video.title && (
              <h3
                style={{
                  color: mergedTheme.text,
                  fontWeight: mergedTheme.fontWeightBold,
                  fontSize: "14px",
                  margin: "0 0 8px 0",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {video.title}
              </h3>
            )}

            {video.description && metadataPosition !== "hover" && (
              <p
                style={{
                  color: mergedTheme.textSecondary,
                  fontSize: "12px",
                  margin: "0 0 8px 0",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {video.description}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
                color: mergedTheme.textSecondary,
              }}
            >
              <div style={{ display: "flex", gap: "12px" }}>
                {video.views && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Eye size={12} /> {video.views.toLocaleString()}
                  </span>
                )}
                {video.likes && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Heart size={12} /> {video.likes.toLocaleString()}
                  </span>
                )}
              </div>

              {video.publishDate && (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Calendar size={12} />{" "}
                  {new Date(video.publishDate).toLocaleDateString()}
                </span>
              )}
            </div>

            {video.tags && video.tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  marginTop: "8px",
                }}
              >
                {video.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "4px 8px",
                      fontSize: "12px",
                      borderRadius: "16px",
                      backgroundColor: mergedTheme.primary + "33",
                      color: mergedTheme.primary,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Progress Bar for Grid View */}
        {!isLightbox && showProgress && isPlaying && duration > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "4px",
              width: `${(currentTime / duration) * 100}%`,
              backgroundColor: mergedTheme.primary,
            }}
          />
        )}
      </div>
    );
  };

  // Lightbox Modal Component
  const LightboxModal = () => {
    if (selectedIndex === null || !lightbox) return null;

    const currentVideo = videos[selectedIndex];
    if (!currentVideo) return null;

    const goToPrevious = () => {
      setSelectedIndex((prev) =>
        prev !== null ? (prev - 1 + videos.length) % videos.length : null
      );
    };

    const goToNext = () => {
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % videos.length : null
      );
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
      if (!lightboxRef.current) return;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        lightboxRef.current.requestFullscreen();
      }
    };

    // Mobile detection
    const isMobile = window.innerWidth < 768;

    return (
      <div
        ref={lightboxRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedIndex(null);
          }
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedIndex(null)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "12px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          aria-label="Close lightbox"
        >
          <X size={24} color="white" />
        </button>

        {/* Navigation Buttons */}
        {videos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              style={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "12px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
              aria-label="Previous video"
            >
              <ChevronLeft size={24} color="white" />
            </button>

            <button
              onClick={goToNext}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                padding: "12px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10000,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
              aria-label="Next video"
            >
              <ChevronRight size={24} color="white" />
            </button>
          </>
        )}

        {/* Video Content */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Top Controls Bar - Always Visible */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "16px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              zIndex: 1000,
            }}
          >
            {/* Video Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  color: "white",
                  fontSize: isMobile ? "18px" : "20px",
                  fontWeight: "bold",
                  margin: "0 0 4px 0",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentVideo.title}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: "rgb(209, 213, 219)",
                  fontSize: isMobile ? "12px" : "14px",
                }}
              >
                {currentVideo.views && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Eye size={isMobile ? 12 : 14} />{" "}
                    {currentVideo.views.toLocaleString()} views
                  </span>
                )}
                {currentVideo.likes && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Heart size={isMobile ? 12 : 14} />{" "}
                    {currentVideo.likes.toLocaleString()} likes
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "8px" : "12px",
              }}
            >
              {favorites && (
                <button
                  onClick={() => handleVideoLike(currentVideo.id)}
                  style={{
                    padding: isMobile ? "6px" : "8px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label={
                    favoriteVideos.has(currentVideo.id)
                      ? "Unlike video"
                      : "Like video"
                  }
                >
                  <Heart
                    size={isMobile ? 18 : 20}
                    color={
                      favoriteVideos.has(currentVideo.id)
                        ? mergedTheme.accent
                        : "white"
                    }
                    fill={
                      favoriteVideos.has(currentVideo.id)
                        ? mergedTheme.accent
                        : "none"
                    }
                  />
                  {isMobile && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "white",
                        marginTop: "2px",
                      }}
                    >
                      {favoriteVideos.has(currentVideo.id) ? "Liked" : "Like"}
                    </span>
                  )}
                </button>
              )}
              {download && (
                <button
                  onClick={() => handleVideoDownload(currentVideo)}
                  style={{
                    padding: isMobile ? "6px" : "8px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label="Download video"
                >
                  <Download size={isMobile ? 18 : 20} color="white" />
                  {isMobile && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "white",
                        marginTop: "2px",
                      }}
                    >
                      Download
                    </span>
                  )}
                </button>
              )}
              {sharing && (
                <button
                  onClick={() => handleVideoShare(currentVideo)}
                  style={{
                    padding: isMobile ? "6px" : "8px",
                    borderRadius: "50%",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label="Share video"
                >
                  <Share2 size={isMobile ? 18 : 20} color="white" />
                  {isMobile && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "white",
                        marginTop: "2px",
                      }}
                    >
                      Share
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Video Player */}
          <VideoPlayer video={currentVideo} isLightbox={true} />
        </div>
      </div>
    );
  };

  // Get grid styles based on layout
  const getGridStyles = (): React.CSSProperties => {
    const columns = getCurrentColumns();
    const gapValue = typeof gap === "string" ? gap : mergedTheme.spacingUnit;

    switch (activeLayout) {
      case "grid":
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gapValue,
        };
      case "masonry":
        return {
          columnCount: columns,
          columnGap: gapValue,
        };
      case "list":
        return {
          display: "flex",
          flexDirection: "column",
          gap: gapValue,
        };
      case "carousel":
        return {
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: `calc(100% / ${columns})`,
          gap: gapValue,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          ["&::-webkit-scrollbar" as any]: {
            // Type assertion
            display: "none",
          },
        };
      case "mosaic":
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: "masonry",
          gap: gapValue,
        };
      case "compact":
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${columns * 2}, 1fr)`,
          gap: gapValue,
        };
      case "highlight":
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${columns - 1}, 1fr) 2fr`,
          gap: gapValue,
        };
      default:
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gapValue,
        };
    }
  };

  // Empty state component
  const EmptyState = () => {
    if (customEmptyState) return customEmptyState;

    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: mergedTheme.textSecondary,
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            opacity: 0.5,
          }}
        >
          🎥
        </div>
        <h3
          style={{
            color: mergedTheme.text,
            fontSize: "20px",
            margin: "0 0 8px 0",
          }}
        >
          No videos found
        </h3>
        <p style={{ fontSize: "16px", margin: 0 }}>
          {searchQuery || filterCategory !== "all"
            ? "Try adjusting your search or filter criteria."
            : "No videos available in this gallery."}
        </p>
      </div>
    );
  };

  // Error state component
  const ErrorState = () => {
    if (customErrorState) return customErrorState;

    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: mergedTheme.textSecondary,
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            opacity: 0.5,
          }}
        >
          ⚠️
        </div>
        <h3
          style={{
            color: mergedTheme.text,
            fontSize: "20px",
            margin: "0 0 8px 0",
          }}
        >
          Error loading videos
        </h3>
        <p style={{ fontSize: "16px", margin: 0 }}>
          {error || "An unknown error occurred while loading the videos."}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            borderRadius: mergedTheme.borderRadiusSmall,
            backgroundColor: mergedTheme.primary,
            color: mergedTheme.text,
            border: "none",
            cursor: "pointer",
            transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          Try Again
        </button>
      </div>
    );
  };

  return (
    <div
      ref={galleryRef}
      className={`${className} ${containerClassName}`}
      style={{
        backgroundColor: mergedTheme.background,
        minHeight: "100vh",
        padding: mergedTheme.spacingUnit,
        fontFamily: mergedTheme.fontFamily,
        fontSize: mergedTheme.fontSizeBase,
        color: mergedTheme.text,
      }}
      aria-label={ariaLabel}
    >
      {generateStructuredData()}

      {/* Header */}
      <div style={{ marginBottom: mergedTheme.spacingUnit }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: mergedTheme.spacingUnit,
          }}
        >
          <div>
            <h1
              style={{
                color: mergedTheme.text,
                fontSize: "32px",
                fontWeight: mergedTheme.fontWeightBold,
                margin: "0 0 8px 0",
              }}
            >
              {title}
            </h1>

            {description && (
              <p
                style={{
                  color: mergedTheme.textSecondary,
                  fontSize: "16px",
                  margin: "0 0 24px 0",
                  lineHeight: "1.6",
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Layout Switcher */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleLayoutChange("grid")}
              style={{
                padding: "8px",
                borderRadius: mergedTheme.borderRadiusSmall,
                backgroundColor:
                  activeLayout === "grid" ? mergedTheme.primary : "transparent",
                border: "none",
                cursor: "pointer",
                transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
              }}
              onMouseEnter={(e) => {
                if (activeLayout !== "grid") {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    mergedTheme.primary + "33";
                }
              }}
              onMouseLeave={(e) => {
                if (activeLayout !== "grid") {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }
              }}
              aria-label="Grid layout"
            >
              <Grid
                size={20}
                color={
                  activeLayout === "grid"
                    ? mergedTheme.text
                    : mergedTheme.textSecondary
                }
              />
            </button>
            <button
              onClick={() => handleLayoutChange("masonry")}
              style={{
                padding: "8px",
                borderRadius: mergedTheme.borderRadiusSmall,
                backgroundColor:
                  activeLayout === "masonry"
                    ? mergedTheme.primary
                    : "transparent",
                border: "none",
                cursor: "pointer",
                transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
              }}
              onMouseEnter={(e) => {
                if (activeLayout !== "masonry") {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    mergedTheme.primary + "33";
                }
              }}
              onMouseLeave={(e) => {
                if (activeLayout !== "masonry") {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }
              }}
              aria-label="Masonry layout"
            >
              <Columns
                size={20}
                color={
                  activeLayout === "masonry"
                    ? mergedTheme.text
                    : mergedTheme.textSecondary
                }
              />
            </button>
            <button
              onClick={() => handleLayoutChange("list")}
              style={{
                padding: "8px",
                borderRadius: mergedTheme.borderRadiusSmall,
                backgroundColor:
                  activeLayout === "list" ? mergedTheme.primary : "transparent",
                border: "none",
                cursor: "pointer",
                transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
              }}
              onMouseEnter={(e) => {
                if (activeLayout !== "list") {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    mergedTheme.primary + "33";
                }
              }}
              onMouseLeave={(e) => {
                if (activeLayout !== "list") {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent";
                }
              }}
              aria-label="List layout"
            >
              <List
                size={20}
                color={
                  activeLayout === "list"
                    ? mergedTheme.text
                    : mergedTheme.textSecondary
                }
              />
            </button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: mergedTheme.spacingUnit,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: mergedTheme.spacingUnit,
              alignItems: "center",
              flex: 1,
            }}
          >
            {/* Search */}
            {search && (
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  maxWidth: "400px",
                }}
              >
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 16px 10px 40px",
                    borderRadius: mergedTheme.borderRadius,
                    border: `1px solid ${mergedTheme.border}`,
                    backgroundColor: mergedTheme.surface,
                    color: mergedTheme.text,
                    fontSize: mergedTheme.fontSizeBase,
                    transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      mergedTheme.primary || "none";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      mergedTheme.border || "none";
                  }}
                  aria-label="Search videos"
                />
                <Search
                  size={18}
                  color={mergedTheme.textSecondary}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
            )}

            {/* Filter */}
            {filter && categories.length > 1 && (
              <div style={{ position: "relative" }}>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    padding: "10px 36px 10px 16px",
                    borderRadius: mergedTheme.borderRadius,
                    border: `1px solid ${mergedTheme.border}`,
                    backgroundColor: mergedTheme.surface,
                    color: mergedTheme.text,
                    fontSize: mergedTheme.fontSizeBase,
                    appearance: "none",
                    cursor: "pointer",
                    transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      mergedTheme.primary || "none";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      mergedTheme.border || "none";
                  }}
                  aria-label="Filter videos by category"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      style={{
                        backgroundColor: mergedTheme.surface,
                        color: mergedTheme.text,
                      }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <Filter
                  size={16}
                  color={mergedTheme.textSecondary}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}

            {/* Sort */}
            {sort && sortOptions && sortOptions.length > 0 && (
              <div style={{ position: "relative" }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  style={{
                    padding: "10px 36px 10px 16px",
                    borderRadius: mergedTheme.borderRadius,
                    border: `1px solid ${mergedTheme.border}`,
                    backgroundColor: mergedTheme.surface,
                    color: mergedTheme.text,
                    fontSize: mergedTheme.fontSizeBase,
                    appearance: "none",
                    cursor: "pointer",
                    transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor =
                      mergedTheme.primary || "none";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      mergedTheme.border || "none";
                  }}
                  aria-label="Sort videos"
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      style={{
                        backgroundColor: mergedTheme.surface,
                        color: mergedTheme.text,
                      }}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                <ArrowUpDown
                  size={16}
                  color={mergedTheme.textSecondary}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}
          </div>

          {/* View Stats */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: mergedTheme.textSecondary,
              fontSize: "14px",
            }}
          >
            <Film size={16} />
            <span>
              Showing {filteredVideos.length} of {videos.length} videos
            </span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      {error ? (
        <ErrorState />
      ) : filteredVideos.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={getGridStyles()} className={containerClassName}>
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              style={{
                breakInside: activeLayout === "masonry" ? "avoid" : undefined,
                pageBreakInside:
                  activeLayout === "masonry" ? "avoid" : undefined,
              }}
            >
              <VideoPlayer
                video={video}
                onClick={() => {
                  setSelectedIndex(index);
                  onVideoClick?.(video, index);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal />

      {/* Load More Button */}
      {infiniteScroll && visibleVideos < videos.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: mergedTheme.spacingUnit,
          }}
        >
          <button
            onClick={() =>
              setVisibleVideos((prev) => Math.min(prev + 12, videos.length))
            }
            style={{
              padding: "12px 24px",
              borderRadius: mergedTheme.borderRadius,
              backgroundColor: mergedTheme.primary,
              color: mergedTheme.text,
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: mergedTheme.fontWeightBold,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: `all ${mergedTheme.transitionSpeed} ${mergedTheme.transitionEasing}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                mergedTheme.hoverShadow || "none";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            aria-label="Load more videos"
          >
            <RefreshCw size={18} />
            Load More Videos
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
