"use client"
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center h-screen'>comming soon!</div>
  )
}

export default page




// "use client";

// import React from "react";
// import { Button, Table, VideoGallery } from "@neuctra/ui";
// import {
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   Maximize,
//   Minimize,
//   RotateCcw,
//   SkipBack,
//   SkipForward,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Settings,
//   Download,
//   Share2,
//   Heart,
//   Eye,
//   Calendar,
//   Clock,
//   User,
//   Tag,
//   Loader,
//   Search,
//   Filter,
// } from "lucide-react";
// import CodeBlock from "@/app/components/docs/CodeBlock";
// import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

// const VideoGalleryDocs: React.FC = () => {
//   // Define columns for the props table
//   const columns = [
//     { key: "prop", label: "Prop", sortable: true },
//     { key: "type", label: "Type", sortable: true },
//     { key: "default", label: "Default", sortable: true },
//     { key: "description", label: "Description", sortable: false },
//   ];

//   // Data for VideoGallery component props
//   const data = [
//     {
//       prop: "videos",
//       type: "VideoData[]",
//       default: "[]",
//       description: "Array of video objects to display in the gallery",
//     },
//     {
//       prop: "layout",
//       type: `"grid" | "masonry" | "carousel" | "list" | "mosaic"`,
//       default: `"grid"`,
//       description: "Layout type for the video gallery",
//     },
//     {
//       prop: "columns",
//       type: "ResponsiveConfig",
//       default: "{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4, '2xl': 5 }",
//       description: "Number of columns at different breakpoints",
//     },
//     {
//       prop: "gap",
//       type: "string | ResponsiveConfig",
//       default: `"16px"`,
//       description: "Gap between video items",
//     },
//     {
//       prop: "aspectRatio",
//       type: `"16:9" | "4:3" | "1:1" | "3:2" | "21:9" | "auto"`,
//       default: `"16:9"`,
//       description: "Aspect ratio for video thumbnails",
//     },
//     {
//       prop: "theme",
//       type: "ThemeConfig",
//       default: `{
//         primary: "#3b82f6",
//         secondary: "#6366f1",
//         accent: "#f59e0b",
//         background: "#0f172a",
//         surface: "#1e293b",
//         text: "#f8fafc",
//         textSecondary: "#94a3b8",
//         border: "#334155",
//         shadow: "0 10px 25px rgba(0,0,0,0.3)",
//         gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         borderRadius: "12px"
//       }`,
//       description: "Custom theme configuration for the gallery",
//     },
//     {
//       prop: "showThumbnails",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show video thumbnails",
//     },
//     {
//       prop: "showMetadata",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show video metadata (title, description, etc.)",
//     },
//     {
//       prop: "showControls",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show video player controls",
//     },
//     {
//       prop: "showProgress",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show progress bar",
//     },
//     {
//       prop: "showVolume",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show volume controls",
//     },
//     {
//       prop: "autoPlay",
//       type: "boolean",
//       default: "false",
//       description: "Whether videos autoplay when opened",
//     },
//     {
//       prop: "autoAdvance",
//       type: "boolean",
//       default: "false",
//       description: "Whether to automatically advance to next video",
//     },
//     {
//       prop: "loop",
//       type: "boolean",
//       default: "false",
//       description: "Whether videos should loop",
//     },
//     {
//       prop: "muted",
//       type: "boolean",
//       default: "true",
//       description: "Whether videos start muted",
//     },
//     {
//       prop: "preload",
//       type: `"none" | "metadata" | "auto"`,
//       default: `"metadata"`,
//       description: "Video preload strategy",
//     },
//     {
//       prop: "lazyLoading",
//       type: "boolean",
//       default: "true",
//       description: "Whether to lazy load videos",
//     },
//     {
//       prop: "infiniteScroll",
//       type: "boolean",
//       default: "false",
//       description: "Whether to enable infinite scrolling",
//     },
//     {
//       prop: "lightbox",
//       type: "boolean",
//       default: "true",
//       description: "Whether to enable lightbox mode for videos",
//     },
//     {
//       prop: "lightboxAnimation",
//       type: `"fade" | "slide" | "zoom" | "flip" | "none"`,
//       default: `"zoom"`,
//       description: "Animation type for lightbox transitions",
//     },
//     {
//       prop: "keyboard",
//       type: "boolean",
//       default: "true",
//       description: "Whether to enable keyboard navigation",
//     },
//     {
//       prop: "swipeGestures",
//       type: "boolean",
//       default: "true",
//       description: "Whether to enable swipe gestures on mobile",
//     },
//     {
//       prop: "title",
//       type: "string",
//       default: `"Video Gallery"`,
//       description: "Title for the gallery",
//     },
//     {
//       prop: "description",
//       type: "string",
//       default: `"A collection of videos"`,
//       description: "Description for the gallery",
//     },
//     {
//       prop: "structured",
//       type: "boolean",
//       default: "true",
//       description: "Whether to include structured data (JSON-LD) for SEO",
//     },
//     {
//       prop: "search",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show search functionality",
//     },
//     {
//       prop: "filter",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show category filtering",
//     },
//     {
//       prop: "sort",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show sorting options",
//     },
//     {
//       prop: "playlist",
//       type: "boolean",
//       default: "false",
//       description: "Whether to show playlist functionality",
//     },
//     {
//       prop: "fullscreen",
//       type: "boolean",
//       default: "true",
//       description: "Whether to allow fullscreen mode",
//     },
//     {
//       prop: "sharing",
//       type: "boolean",
//       default: "true",
//       description: "Whether to show share options",
//     },
//     {
//       prop: "download",
//       type: "boolean",
//       default: "false",
//       description: "Whether to show download options",
//     },
//     {
//       prop: "favorites",
//       type: "boolean",
//       default: "true",
//       description: "Whether to allow favoriting videos",
//     },
//     {
//       prop: "onVideoClick",
//       type: "(video: VideoData, index: number) => void",
//       default: "undefined",
//       description: "Callback when a video is clicked",
//     },
//     {
//       prop: "onVideoEnd",
//       type: "(video: VideoData, index: number) => void",
//       default: "undefined",
//       description: "Callback when a video ends",
//     },
//     {
//       prop: "onVideoPlay",
//       type: "(video: VideoData, index: number) => void",
//       default: "undefined",
//       description: "Callback when a video starts playing",
//     },
//     {
//       prop: "onVideoPause",
//       type: "(video: VideoData, index: number) => void",
//       default: "undefined",
//       description: "Callback when a video is paused",
//     },
//     {
//       prop: "className",
//       type: "string",
//       default: `""`,
//       description: "Additional CSS class for the gallery container",
//     },
//   ];

//   // Sample video data for examples
//   const sampleVideos = [
//     {
//       id: "1",
//       src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//       poster:
//         "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
//       title: "Beautiful Sunset",
//       description: "Watch this amazing sunset over the mountains",
//       duration: 120,
//       author: "Nature Films",
//       publishDate: "2023-05-15",
//       tags: ["nature", "sunset", "mountains"],
//       views: 15000,
//       likes: 1200,
//       category: "nature",
//     },
//     {
//       id: "2",
//       src: "https://example.com/video2.mp4",
//       poster: "https://example.com/thumbnail2.jpg",
//       title: "City Time Lapse",
//       description: "A day in the life of a bustling city",
//       duration: 90,
//       author: "Urban Media",
//       publishDate: "2023-06-20",
//       tags: ["city", "timelapse", "urban"],
//       views: 25000,
//       likes: 1800,
//       category: "urban",
//     },
//   ];

//   return (
//     <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
//       {/* Page Title */}
//       <h1 className="text-4xl font-bold mb-8">
//         <span className="text-primary">VideoGallery</span> Component
//         Documentation
//       </h1>

//       {/* Import Statement */}
//       {/* Import Statement */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Import</h2>
//         <CodeBlock
//           language="javascript"
//           code={`import { VideoGallery } from "@neuctra/ui";
// import { VideoData } from "@neuctra/ui/types";`}
//         />
//       </section>

//       {/* Live Demo with Code */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
//         <CodePreviewBlock
//           language="javascript"
//           code={`const videos = [
//   {
//     id: "1",
//     src: "video1.mp4",
//     poster: "thumbnail1.jpg",
//     title: "Beautiful Sunset",
//     description: "Watch this amazing sunset",
//     duration: 120,
//     author: "Nature Films",
//     publishDate: "2023-05-15",
//     tags: ["nature", "sunset"],
//     views: 15000,
//     likes: 1200,
//     category: "nature"
//   },
//   // ... more videos
// ];

// <VideoGallery 
//   videos={videos}
//   layout="grid"
//   title="My Video Collection"
//   description="A curated selection of videos"
// />`}
//           previewContent={
//             <div className="[&_.carousel-container]:[scrollbar-width:none] [&_.carousel-container::-webkit-scrollbar]:[display:none]">
//               <VideoGallery
//                 videos={sampleVideos}
//                 layout="grid"
//                 columns={{ lg: 2, xl: 2, md: 2, xs: 2, "2xl": 2 }}
//                 lightbox
//                 showSpeedOptions
//                 showControls
//                 download
//                 favorites
//                 showQualityOptions
//                 showProgress
//                 loop
//               />
//             </div>
//           }
//         />
//       </section>

//       {/* Live Demo with Code */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
//         <CodePreviewBlock
//           language="javascript"
//           code={`const videos = [
//   {
//     id: "1",
//     src: "video1.mp4",
//     poster: "thumbnail1.jpg",
//     title: "Beautiful Sunset",
//     description: "Watch this amazing sunset",
//     duration: 120,
//     author: "Nature Films",
//     publishDate: "2023-05-15",
//     tags: ["nature", "sunset"],
//     views: 15000,
//     likes: 1200,
//     category: "nature"
//   },
//   {
//     id: "2",
//     src: "video2.mp4",
//     poster: "thumbnail2.jpg",
//     title: "City Time Lapse",
//     description: "A day in the city",
//     duration: 90,
//     author: "Urban Media",
//     publishDate: "2023-06-20",
//     tags: ["city", "timelapse"],
//     views: 25000,
//     likes: 1800,
//     category: "urban"
//   }
// ];

// <VideoGallery 
//   videos={videos}
//   layout="grid"
//   title="My Video Collection"
//   description="A curated selection of videos"
// />`}
//           previewContent={
//             <VideoGallery
//               videos={sampleVideos}
//               layout="grid"
//               showQualityOptions={true}
//               lightbox
//             />
//           }
//         />
//       </section>

//       {/* Component Description */}
//       <section className="mb-16">
//         <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//           The <code>VideoGallery</code> component is a feature-rich React
//           component for displaying collections of videos with multiple layout
//           options, search, filtering, and a full-featured lightbox viewer. It
//           includes comprehensive video player controls, responsive design, and
//           extensive customization options.
//         </p>
//       </section>

//       {/* Props Table */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-6">Props</h2>
//         <table className="w-full text-left text-xs text-gray-200 border-collapse">
//           <thead>
//             <tr className="bg-primary text-white">
//               {columns.map(({ label, key }) => (
//                 <th key={key} className="px-3 py-2 border border-primary">
//                   {label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map(({ prop, type, default: def, description }) => (
//               <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
//                 <td className="border border-primary px-3 py-2 font-mono">
//                   {prop}
//                 </td>
//                 <td className="border border-primary px-3 py-2 font-mono">
//                   {type}
//                 </td>
//                 <td className="border border-primary px-3 py-2 font-mono">
//                   {def}
//                 </td>
//                 <td className="border border-primary px-3 py-2">
//                   {description}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Usage Examples Section */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

//         <CodePreviewBlock
//           language="javascript"
//           code={`// Masonry layout with custom theme
// <VideoGallery
//   videos={videos}
//   layout="masonry"
//   theme={{
//     primary: "#8b5cf6",
//     background: "#111827",
//     surface: "#1f2937",
//     text: "#f9fafb"
//   }}
// />`}
//           previewContent={
//             <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
//               <p className="text-gray-500 dark:text-gray-400">
//                 Masonry layout with custom theme
//               </p>
//             </div>
//           }
//           className="mb-8"
//         />

//         <CodePreviewBlock
//           language="javascript"
//           code={`// Minimal gallery without metadata
// <VideoGallery
//   videos={videos}
//   showMetadata={false}
//   showControls={false}
//   lightbox={false}
// />`}
//           previewContent={
//             <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
//               <p className="text-gray-500 dark:text-gray-400">
//                 Minimal gallery without metadata
//               </p>
//             </div>
//           }
//           className="mb-8"
//         />

//         <CodePreviewBlock
//           language="javascript"
//           code={`// Infinite scroll with search and filtering
// <VideoGallery
//   videos={largeVideoCollection}
//   infiniteScroll={true}
//   search={true}
//   filter={true}
//   sort={true}
// />`}
//           previewContent={
//             <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
//               <p className="text-gray-500 dark:text-gray-400">
//                 Infinite scroll gallery with search and filtering
//               </p>
//             </div>
//           }
//           className="mb-8"
//         />
//       </section>

//       {/* VideoData Interface Section */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-4">VideoData Interface</h2>
//         <CodeBlock
//           language="typescript"
//           code={`interface VideoData {
//   id: string;
//   src: string;
//   poster?: string;
//   title?: string;
//   description?: string;
//   duration?: number;
//   author?: string;
//   publishDate?: string;
//   tags?: string[];
//   views?: number;
//   likes?: number;
//   category?: string;
//   thumbnail?: string;
//   quality?: 'auto' | '720p' | '1080p' | '4k';
//   subtitles?: { src: string; label: string; language: string }[];
//   chapters?: { time: number; title: string }[];
// }`}
//         />
//       </section>

//       {/* ResponsiveConfig Interface Section */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-4">
//           ResponsiveConfig Interface
//         </h2>
//         <CodeBlock
//           language="typescript"
//           code={`interface ResponsiveConfig {
//   xs?: number;  // < 480px
//   sm?: number;  // 480px - 640px
//   md?: number;  // 640px - 768px
//   lg?: number;  // 768px - 1024px
//   xl?: number;  // 1024px - 1280px
//   '2xl'?: number; // > 1280px
// }`}
//         />
//       </section>

//       {/* ThemeConfig Interface Section */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-4">ThemeConfig Interface</h2>
//         <CodeBlock
//           language="typescript"
//           code={`interface ThemeConfig {
//   primary?: string;
//   secondary?: string;
//   accent?: string;
//   background?: string;
//   surface?: string;
//   text?: string;
//   textSecondary?: string;
//   border?: string;
//   shadow?: string;
//   gradient?: string;
//   borderRadius?: string;
// }`}
//         />
//       </section>

//       {/* Behavior Section */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
//         <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
//           <li>
//             The gallery automatically adapts to screen size with responsive
//             columns
//           </li>
//           <li>
//             Videos can be viewed in a lightbox with full controls when clicked
//           </li>
//           <li>
//             Keyboard navigation (arrows, escape) works when lightbox is open
//           </li>
//           <li>
//             Swipe gestures on mobile allow navigating between videos in lightbox
//           </li>
//           <li>Infinite scroll loads more videos as the user scrolls down</li>
//           <li>Search filters videos by title, description, and tags</li>
//           <li>Category filtering shows only videos from selected category</li>
//           <li>Sorting options include by date, title, views, and likes</li>
//         </ul>
//       </section>

//       {/* Customization Section */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-4">Customization</h2>
//         <p className="text-gray-700 dark:text-gray-300 mb-4">
//           The VideoGallery can be extensively customized through props:
//         </p>
//         <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
//           <li>
//             <strong>Layout:</strong> Choose from grid, masonry, list, or
//             carousel layouts
//           </li>
//           <li>
//             <strong>Theme:</strong> Fully customize colors, borders, shadows,
//             and more
//           </li>
//           <li>
//             <strong>Controls:</strong> Toggle which controls are visible
//           </li>
//           <li>
//             <strong>Behavior:</strong> Configure autoplay, looping, preloading,
//             etc.
//           </li>
//           <li>
//             <strong>Features:</strong> Enable/disable search, filtering,
//             sorting, etc.
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default VideoGalleryDocs;
