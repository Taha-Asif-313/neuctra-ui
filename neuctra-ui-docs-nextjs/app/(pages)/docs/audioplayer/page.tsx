"use client";

import React from "react";
import { AudioPlayer } from "@neuctra/ui"; // Adjust import path as needed
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";

const AudioPlayerDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    {
      prop: "src",
      type: "string",
      default: "—",
      description: "The audio source URL.",
    },
    {
      prop: "thumbnail",
      type: "string",
      default: "undefined",
      description: "Optional image URL displayed above the controls.",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Whether the audio should start playing automatically.",
    },
    {
      prop: "loop",
      type: "boolean",
      default: "false",
      description: "Whether the audio should loop when ended.",
    },
    {
      prop: "backgroundColor",
      type: "string",
      default: '"#000000"',
      description: "Background color of the audio player container.",
    },
    {
      prop: "primaryColor",
      type: "string",
      default: '"#10b981"',
      description: "Primary color used for controls and progress bar.",
    },
    {
      prop: "secondaryColor",
      type: "string",
      default: '"#ffffff"',
      description: "Secondary color used for text and icons.",
    },
    {
      prop: "borderRadius",
      type: "string",
      default: '"12px"',
      description: "Border radius applied to the audio player container.",
    },
    {
      prop: "padding",
      type: "string",
      default: '"16px"',
      description: "Padding inside the audio player container.",
    },
    {
      prop: "width",
      type: "string",
      default: '"100%"',
      description: "Width of the audio player container.",
    },
    {
      prop: "className",
      type: "string",
      default: "undefined",
      description: "Optional CSS class for the outer container.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">AudioPlayer</span> Component Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { AudioPlayer } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<AudioPlayer
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  thumbnail="https://www.techsmith.com/wp-content/uploads/2022/03/resize-image.png"
  autoPlay={false}
  loop={false}
  primaryColor="#007bff"
/>`}
          previewContent={
            <div style={{ maxWidth: 600 }}>
              <AudioPlayer
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_G9U9095poYEIvtg8fnA2Ef3dcjLEebptQ&s"
                autoPlay={false}
                loop={false}
                primaryColor="#007bff"
              />
            </div>
          }
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="text-gray-300 leading-relaxed">
          The <code>AudioPlayer</code> component is a fully customizable audio player
          with controls for play/pause, skip forward/backward, seek, mute/unmute,
          loop toggle, and fullscreen mode. It supports optional thumbnails, color
          customization, and responsive design for modern UIs.
        </p>
      </section>

      {/* Props Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <table className="w-full text-left text-xs text-gray-200 border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map(({ label, key }) => (
                <th
                  key={key}
                  className="px-3 py-2 border border-primary"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ prop, type, default: def, description }) => (
              <tr
                key={prop}
                className="even:bg-zinc-800 odd:bg-zinc-900"
              >
                <td className="border border-primary px-3 py-2 font-mono">{prop}</td>
                <td className="border border-primary px-3 py-2 font-mono">{type}</td>
                <td className="border border-primary px-3 py-2 font-mono">{def}</td>
                <td className="border border-primary px-3 py-2">{description}</td>
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
          code={`<AudioPlayer
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  autoPlay
  loop
  primaryColor="#10b981"
/>`}
          previewContent={
            <div style={{ maxWidth: 600 }}>
              <AudioPlayer
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                autoPlay
                loop
                primaryColor="#10b981"
              />
            </div>
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`<AudioPlayer
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  thumbnail="https://www.techsmith.com/wp-content/uploads/2022/03/resize-image.png"
  backgroundColor="#1e1e1e"
  primaryColor="#ef4444"
  secondaryColor="#ffffff"
  borderRadius="20px"
  padding="24px"
  width="500px"
/>`}
          previewContent={
            <div style={{ maxWidth: 600 }}>
              <AudioPlayer
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
                thumbnail="https://www.techsmith.com/wp-content/uploads/2022/03/resize-image.png"
                backgroundColor="#1e1e1e"
                primaryColor="#ef4444"
                secondaryColor="#ffffff"
                borderRadius="20px"
                padding="24px"
                width="500px"
              />
            </div>
          }
        />
      </section>

      {/* Behavior */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Play/Pause toggle with a prominent central button.</li>
          <li>Skip forward/backward by 10 seconds.</li>
          <li>Seek bar with current time and total duration.</li>
          <li>Mute/unmute and volume control (starts at 50% by default).</li>
          <li>Loop toggle for continuous playback.</li>
          <li>Fullscreen mode toggle for an immersive experience.</li>
          <li>Optional thumbnail display above the controls.</li>
          <li>Customizable via <code>primaryColor</code>, <code>backgroundColor</code>, <code>borderRadius</code>, and <code>padding</code>.</li>
          <li>Fully responsive with clean, minimal UI design.</li>
        </ul>
      </section>
    </div>
  );
};

export default AudioPlayerDocs;
