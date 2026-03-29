"use client";

import React from "react";
import { Avatar } from "@neuctra/ui"; // adjust import path
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import DocsFooter from "../../components/Docs/DocsFooter";
import Metadata from "../../MetaData";

const AvatarDocs = () => {
  const sampleAvatars = [
    {
      src: "https://randomuser.me/api/portraits/men/32.jpg",
      alt: "James Carter",
      isOnline: true,
    },
    {
      src: "https://randomuser.me/api/portraits/women/44.jpg",
      alt: "Ava Smith",
    },
    {
      src: "https://randomuser.me/api/portraits/men/45.jpg",
      alt: "Daniel Brown",
      isOffline: true,
    },
    {
      src: "https://randomuser.me/api/portraits/women/36.jpg",
      alt: "Sofia Miller",
    },
    {
      src: "https://randomuser.me/api/portraits/men/78.jpg",
      alt: "Michael Adams",
    },
  ];

  return (
    <>
      <Metadata
        title="Avatar Component — Neuctra UI"
        description="Learn how to use the Avatar component in Neuctra UI — display user profiles, online/offline status, rings, and groups with modern React UI."
        keywords="Neuctra UI Avatar, React avatar component, user profile UI, online offline avatar, React UI library, Neuctra components"
        image="https://ui.neuctra.com/og/avatar-docs.png"
        ogTitle="Avatar Component — Neuctra UI"
        ogDescription="Display elegant user profile images, initials, and groups using the Avatar component from Neuctra UI — built for modern React developers."
        twitterTitle="Avatar Component — Neuctra UI"
        twitterDescription="Explore the Avatar component from Neuctra UI — customizable, responsive, and perfect for modern React interfaces."
        canonical="https://ui.neuctra.com/docs/avatar"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Avatar Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Avatar</span>{" "}
              component displays user profile images, initials, or placeholders.
              It supports online/offline indicators, shapes, rings, sizes, and
              fallback options.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>
            <p className="text-gray-300 mb-3">
              Display a simple avatar with an image, initials, or fallback.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="https://randomuser.me/api/portraits/men/45.jpg" alt="John Doe" />
<Avatar fallback="JD" size="lg" />
<Avatar alt="Emily Watson" />`}
              previewContent={
                <div className="flex items-center gap-4">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="John Doe"
                  />
                  <Avatar fallback="JD" size="lg" />
                  <Avatar alt="Emily Watson" />
                </div>
              }
            />
          </section>

          {/* Shape Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Shape Variants
            </h2>
            <p className="text-gray-300 mb-3">
              Change the avatar shape using{" "}
              <code className="text-primary">variant</code>:{" "}
              <code>circular</code>, <code>rounded</code>, or{" "}
              <code>square</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="..." variant="circular" />
<Avatar src="..." variant="rounded" />
<Avatar src="..." variant="square" />`}
              previewContent={
                <div className="flex items-center gap-4">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/34.jpg"
                    variant="circular"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/50.jpg"
                    variant="rounded"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/23.jpg"
                    variant="square"
                  />
                </div>
              }
            />
          </section>

          {/* Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Sizes</h2>
            <p className="text-gray-300 mb-3">
              Control avatar size using the{" "}
              <code className="text-primary">size</code> prop: <code>xs</code>,{" "}
              <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>
              , <code>2xl</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="..." size="xs" />
<Avatar src="..." size="sm" />
<Avatar src="..." size="md" />
<Avatar src="..." size="lg" />
<Avatar src="..." size="xl" />
<Avatar src="..." size="2xl" />`}
              previewContent={
                <div className="flex items-center gap-4">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/11.jpg"
                    size="xs"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/12.jpg"
                    size="sm"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/13.jpg"
                    size="md"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/14.jpg"
                    size="lg"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/15.jpg"
                    size="xl"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/16.jpg"
                    size="2xl"
                  />
                </div>
              }
            />
          </section>

          {/* Status */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Online & Offline Status
            </h2>
            <p className="text-gray-300 mb-3">
              Show user status using{" "}
              <code className="text-primary">isOnline</code> or{" "}
              <code className="text-primary">isOffline</code>. Control position
              with <code>statusPosition</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="..." isOnline statusPosition="top-right" />
<Avatar src="..." isOffline statusPosition="bottom-left" />`}
              previewContent={
                <div className="flex items-center gap-4">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/60.jpg"
                    isOnline
                    statusPosition="top-right"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/72.jpg"
                    isOffline
                    statusPosition="bottom-left"
                  />
                </div>
              }
            />
          </section>

          {/* Ring & Hover Effects */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Ring & Clickable Avatars
            </h2>
            <p className="text-gray-300 mb-3">
              Highlight avatars with <code className="text-primary">ring</code>{" "}
              and <code className="text-primary">ringColor</code>. Add{" "}
              <code>onClick</code> for interactive avatars.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="..." ring ringColor="#22c55e" onClick={() => alert("Clicked!")} />
<Avatar src="..." ring ringColor="#3b82f6" />`}
              previewContent={
                <div className="flex items-center gap-4">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/43.jpg"
                    ring
                    ringColor="#22c55e"
                    onClick={() => alert("Clicked!")}
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/38.jpg"
                    ring
                    ringColor="#3b82f6"
                  />
                </div>
              }
            />
          </section>

          {/* Fallback Initials */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Fallback Initials
            </h2>
            <p className="text-gray-300 mb-3">
              Display user initials or custom fallback if image fails to load or
              is missing.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar alt="Jane Doe" />
<Avatar fallback="JD" />
<Avatar fallback="A" size="xl" />`}
              previewContent={
                <div className="flex items-center gap-4">
                  <Avatar alt="Jane Doe" />
                  <Avatar fallback="JD" />
                  <Avatar fallback="A" size="xl" />
                </div>
              }
            />
          </section>

          {/* Props Table */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Props Table
            </h2>
            <p className="text-gray-300 mb-3">
              All available props for the Avatar component.
            </p>

            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-400">
                  <tr>
                    <th className="text-left p-3">Prop</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="p-3">src</td>
                    <td className="p-3">string</td>
                    <td>Image URL for avatar</td>
                  </tr>
                  <tr>
                    <td className="p-3">alt</td>
                    <td className="p-3">string</td>
                    <td>Alt text for accessibility</td>
                  </tr>
                  <tr>
                    <td className="p-3">fallback</td>
                    <td className="p-3">string</td>
                    <td>Initials or fallback text if image fails</td>
                  </tr>
                  <tr>
                    <td className="p-3">size</td>
                    <td className="p-3">
                      xs | sm | md | lg | xl | 2xl | responsive
                    </td>
                    <td>Avatar dimensions</td>
                  </tr>
                  <tr>
                    <td className="p-3">variant</td>
                    <td className="p-3">circular | rounded | square</td>
                    <td>Avatar shape</td>
                  </tr>
                  <tr>
                    <td className="p-3">isOnline</td>
                    <td className="p-3">boolean</td>
                    <td>Show green online indicator</td>
                  </tr>
                  <tr>
                    <td className="p-3">isOffline</td>
                    <td className="p-3">boolean</td>
                    <td>Show gray offline indicator</td>
                  </tr>
                  <tr>
                    <td className="p-3">statusPosition</td>
                    <td className="p-3">
                      top-left | top-right | bottom-left | bottom-right
                    </td>
                    <td>Position of status dot</td>
                  </tr>
                  <tr>
                    <td className="p-3">ring</td>
                    <td className="p-3">boolean</td>
                    <td>Show accent ring around avatar</td>
                  </tr>
                  <tr>
                    <td className="p-3">ringColor</td>
                    <td className="p-3">string</td>
                    <td>Custom ring color</td>
                  </tr>
                  <tr>
                    <td className="p-3">onClick</td>
                    <td className="p-3">() ={">"} void</td>
                    <td>Click handler for avatar</td>
                  </tr>
                  <tr>
                    <td className="p-3">className</td>
                    <td className="p-3">string</td>
                    <td>Custom container class</td>
                  </tr>
                  <tr>
                    <td className="p-3">statusClassName</td>
                    <td className="p-3">string</td>
                    <td>Custom class for status dot</td>
                  </tr>
                  <tr>
                    <td className="p-3">style</td>
                    <td className="p-3">CSSProperties</td>
                    <td>Inline styles for avatar</td>
                  </tr>
                  <tr>
                    <td className="p-3">statusStyle</td>
                    <td className="p-3">CSSProperties</td>
                    <td>Inline styles for status dot</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default AvatarDocs;
