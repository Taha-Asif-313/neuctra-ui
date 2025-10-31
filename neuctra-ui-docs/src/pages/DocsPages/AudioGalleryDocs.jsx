"use client";
import React from "react";
import { AudioGallery } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const AudioGalleryDocs = () => {
  return (
    <>
      <Metadata
        title="AudioGallery Component — Neuctra UI"
        description="Explore the AudioGallery component in Neuctra UI — a modern, customizable React audio player with playlist support, shuffle, loop, likes, volume control, and rich UI themes."
        keywords="Neuctra UI AudioGallery, React Audio Gallery, audio player component, music player UI, playlist component, Neuctra UI docs, customizable audio player, React media components"
        image="https://ui.neuctra.com/og-images/audiogallery.png"
        ogTitle="AudioGallery Component — Neuctra UI"
        ogDescription="Discover the AudioGallery component from Neuctra UI — a sleek, responsive React audio player for playlists with advanced controls and modern styling."
        twitterTitle="AudioGallery Component — Neuctra UI"
        twitterDescription="Build elegant audio experiences with Neuctra UI’s AudioGallery component — playlist support, shuffle, loop, and beautiful responsive controls for React."
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              AudioGallery Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The{" "}
              <span className="text-primary font-semibold">AudioGallery</span>{" "}
              component allows you to display a playlist of audio tracks with a
              full-featured player. It supports play/pause, skip, shuffle, loop,
              volume control, liking tracks, fullscreen view, and custom
              styling.
            </p>
          </header>

          {/* Basic Gallery */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Audio Gallery
            </h2>
            <p className="text-gray-300 mb-3">
              Display a playlist of audio tracks using default styling.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<AudioGallery
  tracks={[
    { src: "/audio/song1.mp3", title: "Song 1", artist: "Artist 1" },
    { src: "/audio/song2.mp3", title: "Song 2", artist: "Artist 2" },
  ]}
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <AudioGallery
                    tracks={[
                      {
                        src: "/audio/song1.mp3",
                        title: "Song 1",
                        artist: "Artist 1",
                      },
                      {
                        src: "/audio/song2.mp3",
                        title: "Song 2",
                        artist: "Artist 2",
                      },
                    ]}
                  />
                </div>
              }
            />
          </section>

          {/* Gallery with Custom Colors */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Custom Colors & Styling
            </h2>
            <p className="text-gray-300 mb-3">
              Customize <code className="text-primary">primaryColor</code>,{" "}
              <code>backgroundColor</code>,<code>secondaryColor</code>,{" "}
              <code>textColor</code>, <code>border</code> and
              <code>maxWidth</code> for a personalized gallery.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<AudioGallery
  galleryTitle="My Playlist"
  primaryColor="#10b981"
  backgroundColor="#111827"
  secondaryColor="#1f2937"
  textColor="#f3f4f6"
  border={1}
  borderColor="#10b981"
  maxWidth={500}
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <AudioGallery
                    galleryTitle="My Playlist"
                    primaryColor="#10b981"
                    backgroundColor="#111827"
                    secondaryColor="#1f2937"
                    textColor="#f3f4f6"
                    border={1}
                    borderColor="#10b981"
                    maxWidth={500}
                  />
                </div>
              }
            />
          </section>

          {/* Gallery with Autoplay & Loop */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Autoplay & Loop
            </h2>
            <p className="text-gray-300 mb-3">
              Automatically play the first track with{" "}
              <code className="text-primary">autoplay</code>
              and enable looping using{" "}
              <code className="text-primary">loop</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<AudioGallery
  autoplay
  loop
  tracks={[
    { src: "/audio/song1.mp3", title: "Song 1", artist: "Artist 1" },
    { src: "/audio/song2.mp3", title: "Song 2", artist: "Artist 2" },
  ]}
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <AudioGallery
                    autoplay
                    loop
                    tracks={[
                      {
                        src: "/audio/song1.mp3",
                        title: "Song 1",
                        artist: "Artist 1",
                      },
                      {
                        src: "/audio/song2.mp3",
                        title: "Song 2",
                        artist: "Artist 2",
                      },
                    ]}
                  />
                </div>
              }
            />
          </section>

          {/* Gallery with Shuffle & Likes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Shuffle & Like Features
            </h2>
            <p className="text-gray-300 mb-3">
              Users can shuffle tracks or mark them as liked using the built-in
              controls.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<AudioGallery
  autoplay
  loop
  tracks={defaultTracks}
  primaryColor="#f43f5e"
/>`}
              previewContent={
                <div className="p-6 bg-zinc-900 rounded-xl">
                  <AudioGallery
                    autoplay
                    loop
                    tracks={undefined} // will use defaultTracks internally
                    primaryColor="#f43f5e"
                  />
                </div>
              }
            />
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default AudioGalleryDocs;
