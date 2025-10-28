"use client";

import React from "react";
import { VideoPlayer } from "@neuctra/ui"; // adjust path
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const VideoPlayerDocs: React.FC = () => {
  // Props Table Columns
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Props data
  const data = [
    {
      prop: "src",
      type: "string",
      default: "—",
      description: "Video source URL.",
    },
    {
      prop: "poster",
      type: "string",
      default: "undefined",
      description: "Thumbnail before playback.",
    },
    {
      prop: "title",
      type: "string",
      default: "undefined",
      description: "Video title displayed in controls.",
    },
    {
      prop: "theme",
      type: `"dark" | "glass" | "neon"`,
      default: `"dark"`,
      description: "UI theme for the player.",
    },
    {
      prop: "primaryColor",
      type: "string",
      default: '"#3b82f6"',
      description: "Primary color for buttons and progress.",
    },
    {
      prop: "height",
      type: "string",
      default: '"200px"',
      description: "Height of the video player.",
    },
    {
      prop: "showProgress",
      type: "boolean",
      default: "true",
      description: "Show the progress bar.",
    },
    {
      prop: "showVolumeSlider",
      type: "boolean",
      default: "true",
      description: "Show volume slider.",
    },
    {
      prop: "showSettings",
      type: "boolean",
      default: "true",
      description: "Show settings menu.",
    },
    {
      prop: "showDownload",
      type: "boolean",
      default: "false",
      description: "Show download button.",
    },
    {
      prop: "showShare",
      type: "boolean",
      default: "false",
      description: "Show share button.",
    },
    {
      prop: "showPiP",
      type: "boolean",
      default: "false",
      description: "Show picture-in-picture toggle.",
    },
    {
      prop: "showPlaybackSpeed",
      type: "boolean",
      default: "false",
      description: "Show playback speed controls.",
    },
    {
      prop: "showQuality",
      type: "boolean",
      default: "false",
      description: "Show quality selector.",
    },
    {
      prop: "previewThumbnails",
      type: "boolean",
      default: "false",
      description: "Show thumbnail previews on hover.",
    },
    {
      prop: "customControls",
      type: "boolean",
      default: "true",
      description: "Enable custom control UI.",
    },
    {
      prop: "onPlay",
      type: "() => void",
      default: "undefined",
      description: "Callback when video starts playing.",
    },
    {
      prop: "onPause",
      type: "() => void",
      default: "undefined",
      description: "Callback when video is paused.",
    },
    {
      prop: "onEnded",
      type: "() => void",
      default: "undefined",
      description: "Callback when video ends.",
    },
    {
      prop: "onTimeUpdate",
      type: "(time: number) => void",
      default: "undefined",
      description: "Callback when current time updates.",
    },
    {
      prop: "onVolumeChange",
      type: "(volume: number) => void",
      default: "undefined",
      description: "Callback when volume changes.",
    },
  ];

  return (
    <div className="py-10 max-w-6xl font-primary mx-auto bg-zinc-950 text-gray-100">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">VideoPlayer</span> Component
        Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { VideoPlayer } from "@neuctra/ui";`}
        />
      </section>

      {/* Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th key={key} className="px-3 py-2 border border-primary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ prop, type, default: def, description }) => (
              <tr key={prop} className="even:bg-zinc-800 odd:bg-zinc-900">
                <td className="border border-primary px-3 py-2 font-mono">
                  {prop}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {type}
                </td>
                <td className="border border-primary px-3 py-2 font-mono">
                  {def}
                </td>
                <td className="border border-primary px-3 py-2">
                  {description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Usage Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>

        <CodePreviewBlock
          language="tsx"
          code={`<VideoPlayer
  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
  title="Big Buck Bunny"
  theme="dark"
  primaryColor="#3b82f6"
  showProgress
  showVolumeSlider
  showSettings
  showDownload
  showShare
  showPiP
  showPlaybackSpeed
  showQuality
  previewThumbnails
  customControls
  onPlay={() => console.log("Video started playing")}
  onPause={() => console.log("Video paused")}
  onEnded={() => console.log("Video ended")}
  onTimeUpdate={(time) => console.log("Time:", time)}
  onVolumeChange={(volume) => console.log("Volume:", volume)}
/>`}
          previewContent={
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                title="Big Buck Bunny - Sample Video"
                theme="dark"
                primaryColor="#3b82f6"
                showProgress={true}
                showVolumeSlider={true}
                showSettings={true}
                showDownload={true}
                showShare={true}
                showPiP={true}
                showPlaybackSpeed={true}
                showQuality={true}
                previewThumbnails={true}
                customControls={true}
                onPlay={() => console.log("Video started playing")}
                onPause={() => console.log("Video paused")}
                onEnded={() => console.log("Video ended")}
                onTimeUpdate={(time) => console.log("Time:", time)}
                onVolumeChange={(volume) => console.log("Volume:", volume)}
              />
            </div>
          }
          className="mb-8"
        />
      </section>

      {/* Behavior Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Supports multiple themes: dark, glass, neon.</li>
          <li>Fully responsive layout with adjustable height and width.</li>
          <li>
            Customizable control options like play/pause, volume, PiP, playback
            speed, quality, download, share, and settings.
          </li>
          <li>Preview thumbnails available on hover if enabled.</li>
          <li>
            Supports custom callbacks for play, pause, ended, time updates, and
            volume changes.
          </li>
          <li>
            Integrates clean UI with modern styling and color customization.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default VideoPlayerDocs;
