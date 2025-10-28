"use client";

import React from "react";
import { AudioGallery } from "@neuctra/ui"; // Adjust import path if needed
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
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const AudioGalleryDocs: React.FC = () => {
  // Table columns
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  // Props data for AudioGallery
  const data = [
    {
      prop: "tracks",
      type: "Array<{ src: string; title: string; thumbnail?: string }>",
      default: "—",
      description:
        "Array of audio track objects with source, title, and optional thumbnail.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Custom CSS class for the gallery container.",
    },
    {
      prop: "primaryColor",
      type: "string",
      default: `"#3b82f6"`,
      description: "Primary theme color used for active track and controls.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: `"#fff"`,
      description: "Background color of the gallery container.",
    },
    {
      prop: "textColor",
      type: "string",
      default: `"#222"`,
      description: "Primary text color.",
    },
    {
      prop: "secondaryColor",
      type: "string",
      default: `"#e5e7eb"`,
      description:
        "Secondary background color for inactive track items and controls background.",
    },
    {
      prop: "autoplay",
      type: "boolean",
      default: "false",
      description: "If true, starts playing selected track automatically.",
    },
    {
      prop: "loop",
      type: "boolean",
      default: "false",
      description: "If true, the current audio track loops when finished.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">AudioGallery</span> Component
        Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="typescript"
          code={`import { AudioGallery } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="typescript"
          code={`<AudioGallery
  tracks={[
    { src: "/audio1.mp3", title: "Track One", thumbnail: "/thumb1.jpg" },
    { src: "/audio2.mp3", title: "Track Two" },
    { src: "/audio3.mp3", title: "Track Three", thumbnail: "/thumb3.jpg" }
  ]}
/>`}
          previewContent={
            <AudioGallery
              primaryColor="#00c214"
              secondaryColor="#042e00"
              borderColor="transparent"
              maxWidth={500}
              tracks={[
                {
                  src: "/sample1.mp3",
                  title: "Sample Track 1",
                  thumbnail:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykzoZeCE0p7LeuyHnLYCdPP2jju9d5PaMeA&s",
                  artist: "taha",
                  duration: "10m",
                },
                { src: "/sample2.mp3", title: "Sample Track 2" },
                { src: "/sample3.mp3", title: "Sample Track 3" },
              ]}
            />
          }
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>AudioGallery</code> component renders a list of audio tracks
          with play/pause controls. It supports autoplay, looping, and
          customizable theming through colors. Users can click tracks to play or
          pause them, and view optional thumbnails. Playback controls include
          skip ±10 seconds, volume mute toggle, loop toggle, and fullscreen
          mode.
        </p>
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
          language="typescript"
          code={`<AudioGallery
  tracks={[
    { src: "/audio1.mp3", title: "Relaxing Tune" },
    { src: "/audio2.mp3", title: "Upbeat Song", thumbnail: "/cover.jpg" },
  ]}
  autoplay
  loop
  primaryColor="#ef4444"
/>`}
          previewContent={
            <AudioGallery
              tracks={[
                { src: "/sample1.mp3", title: "Relaxing Tune" },
                {
                  src: "/sample2.mp3",
                  title: "Upbeat Song",
                  thumbnail: "/cover.jpg",
                },
              ]}
              autoplay
              loop
              primaryColor="#ef4444"
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="typescript"
          code={`<AudioGallery
  tracks={[
    { src: "/audio1.mp3", title: "Track One" },
    { src: "/audio2.mp3", title: "Track Two" },
  ]}
  backgroundColor="#111"
  textColor="#eee"
  secondaryColor="#333"
/>`}
          previewContent={
            <AudioGallery
              tracks={[
                { src: "/sample1.mp3", title: "Track One" },
                { src: "/sample2.mp3", title: "Track Two" },
              ]}
              backgroundColor="#111"
              textColor="#eee"
              secondaryColor="#333"
            />
          }
          className="mb-8"
        />
      </section>

      {/* Behavior Details */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Clicking a track toggles play/pause of that specific audio.</li>
          <li>
            Only one track plays at a time; selecting another track stops the
            current one.
          </li>
          <li>
            Playback controls include skip ±10 seconds, mute/unmute, loop
            toggle, and fullscreen mode.
          </li>
          <li>
            Keyboard accessible: tracks can be focused and toggled with Enter or
            Space keys.
          </li>
          <li>
            Supports theming with customizable colors for primary, background,
            text, and secondary elements.
          </li>
          <li>Volume and playback position updates live during playback.</li>
          <li>Seek bar supports click and keyboard arrow key adjustments.</li>
        </ul>
      </section>
    </div>
  );
};

export default AudioGalleryDocs;
