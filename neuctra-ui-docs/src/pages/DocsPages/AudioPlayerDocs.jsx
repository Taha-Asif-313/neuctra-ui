"use client";
import React from "react";
import { AudioPlayer } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";

const AudioPlayerDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            AudioPlayer Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">AudioPlayer</span> component
            provides a fully customizable audio player with play/pause, skip, volume control,
            loop, fullscreen, seek bar, and optional thumbnail support.
          </p>
        </header>

        {/* Basic Player */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Basic Audio Player</h2>
          <p className="text-gray-300 mb-3">
            Create a simple audio player with minimal setup using the <code className="text-primary">src</code> prop.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<AudioPlayer
  src="/audio/sample.mp3"
  width="300px"
  padding="16px"
  backgroundColor="#111"
  primaryColor="#10b981"
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <AudioPlayer
                  src="/audio/sample.mp3"
                  width="300px"
                  padding="16px"
                  backgroundColor="#111"
                  primaryColor="#10b981"
                />
              </div>
            }
          />
        </section>

        {/* Player with Thumbnail */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Audio Player with Thumbnail</h2>
          <p className="text-gray-300 mb-3">
            Display an image or album art using the <code className="text-primary">thumbnail</code> prop.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<AudioPlayer
  src="/audio/sample.mp3"
  thumbnail="/images/cover.jpg"
  width="320px"
  backgroundColor="#1f2937"
  primaryColor="#3b82f6"
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <AudioPlayer
                  src="/audio/sample.mp3"
                  thumbnail="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                  width="320px"
                  backgroundColor="#1f2937"
                  primaryColor="#3b82f6"
                />
              </div>
            }
          />
        </section>

        {/* Player with Custom Colors */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Custom Colors & Styling</h2>
          <p className="text-gray-300 mb-3">
            Use <code className="text-primary">primaryColor</code>, <code>secondaryColor</code>, <code>borderRadius</code>, and <code>padding</code> to customize the player's appearance.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<AudioPlayer
  src="/audio/sample.mp3"
  width="300px"
  backgroundColor="#111"
  primaryColor="#facc15"
  secondaryColor="#fff"
  borderRadius="16px"
  padding="20px"
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <AudioPlayer
                  src="/audio/sample.mp3"
                  width="300px"
                  backgroundColor="#111"
                  primaryColor="#facc15"
                  secondaryColor="#fff"
                  borderRadius="16px"
                  padding="20px"
                />
              </div>
            }
          />
        </section>

        {/* Player with Loop & AutoPlay */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Loop & AutoPlay</h2>
          <p className="text-gray-300 mb-3">
            Enable automatic playback with <code className="text-primary">autoPlay</code> and loop the audio using <code className="text-primary">loop</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<AudioPlayer
  src="/audio/sample.mp3"
  autoPlay
  loop
  width="300px"
  primaryColor="#10b981"
/>`}
            previewContent={
              <div className="p-6 bg-zinc-900 rounded-xl">
                <AudioPlayer
                  src="/audio/sample.mp3"
                  autoPlay
                  loop
                  width="300px"
                  primaryColor="#10b981"
                />
              </div>
            }
          />
        </section>

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default AudioPlayerDocs;
