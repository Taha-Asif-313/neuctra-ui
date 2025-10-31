"use client";
import React from "react";
import { Avatar, AvatarGroup } from "@neuctra/ui"; // adjust import path
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
        description="Learn how to use the Avatar and AvatarGroup components in Neuctra UI — display user profiles, online/offline status, and group avatars with modern React UI design."
        keywords="Neuctra UI Avatar, React avatar component, user profile UI, AvatarGroup React, Neuctra UI docs, online offline avatar, React UI library"
        image="https://ui.neuctra.com/og/avatar-docs.png"
        ogTitle="Avatar Component — Neuctra UI"
        ogDescription="Display elegant user profile images, initials, and groups using the Avatar and AvatarGroup components from Neuctra UI — built for modern React developers."
        twitterTitle="Avatar Component — Neuctra UI"
        twitterDescription="Explore the Avatar and AvatarGroup components from Neuctra UI — customizable, responsive, and perfect for modern React interfaces."
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
              It supports online/offline indicators, variants, responsive
              sizing, and group stacking.
            </p>
          </header>

          {/* Basic Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="https://randomuser.me/api/portraits/men/45.jpg" alt="John Doe" />
<Avatar fallback="JD" size="lg" />
<Avatar alt="Emily Watson" />`}
              previewContent={
                <div className="flex items-center gap-4 p-6 bg-zinc-900 rounded-xl">
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

          {/* Variants Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Shape Variants
            </h2>
            <p className="text-gray-300 mb-3">
              Change avatar shape using{" "}
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
                <div className="flex items-center gap-4 p-6 bg-zinc-900 rounded-xl">
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/34.jpg"
                    variant="circular"
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/50.jpg"
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

          {/* Status Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Online & Offline Indicators
            </h2>
            <p className="text-gray-300 mb-3">
              Add status indicators with{" "}
              <code className="text-primary">isOnline</code> or{" "}
              <code className="text-primary">isOffline</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="..." isOnline />
<Avatar src="..." isOffline />`}
              previewContent={
                <div className="flex items-center gap-4 p-6 bg-zinc-900 rounded-xl">
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/60.jpg"
                    alt="Maria"
                    isOnline
                  />
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/72.jpg"
                    alt="David"
                    isOffline
                  />
                </div>
              }
            />
          </section>

          {/* Group Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Avatar Group
            </h2>
            <p className="text-gray-300 mb-3">
              Combine multiple avatars into a compact group using{" "}
              <code className="text-primary">AvatarGroup</code>. You can also
              limit visible avatars using{" "}
              <code className="text-primary">max</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<AvatarGroup
  avatars={[
    { src: "user1.jpg", alt: "Alice" },
    { src: "user2.jpg", alt: "Bob" },
    { src: "user3.jpg", alt: "Clara" },
    { src: "user4.jpg", alt: "Daniel" },
  ]}
  max={3}
  size="md"
/>`}
              previewContent={
                <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                  <AvatarGroup avatars={sampleAvatars} max={4} />
                </div>
              }
            />
          </section>

          {/* Ring Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Ring & Hover Effects
            </h2>
            <p className="text-gray-300 mb-3">
              Use <code className="text-primary">ring</code> and{" "}
              <code className="text-primary">ringColor</code> for accent
              outlines.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Avatar src="..." ring ringColor="#22c55e" />
<Avatar src="..." ring ringColor="#3b82f6" />`}
              previewContent={
                <div className="flex items-center gap-4 p-6 bg-zinc-900 rounded-xl">
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/43.jpg"
                    ring
                    ringColor="#22c55e"
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

          {/* Footer */}
          <DocsFooter />
        </div>
      </div>
    </>
  );
};

export default AvatarDocs;
