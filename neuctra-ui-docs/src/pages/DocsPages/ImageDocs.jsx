"use client";

import React from "react";
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Image } from "@neuctra/ui";
import { CircuitBoard } from "lucide-react";
import Metadata from "../../MetaData";

const ImageDocs = () => {
  return (
    <>
      <Metadata
        title="Image Component — Neuctra UI"
        description="Learn how to use the Image component from Neuctra UI — a flexible, accessible, and SEO-friendly React image solution with hover effects, overlays, responsive modes, and SVG support."
        keywords="Neuctra UI Image, React Image Component, responsive images, React UI library, Tailwind CSS image, SVG React component, hover effects, overlay text, Neuctra components"
        image="https://ui.neuctra.com/og/image-docs-preview.png"
        ogTitle="Image Component — Neuctra UI"
        ogDescription="Display optimized, responsive, and animated images in React using the Image component from Neuctra UI — built with Tailwind and TypeScript."
        twitterTitle="Image Component | Neuctra UI"
        twitterDescription="A modern, accessible React image component from Neuctra UI with responsive layouts, hover animations, and overlay support."
        canonical="https://ui.neuctra.com/docs/image"
      />

      <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl font-extrabold mb-3 text-white">
              Image Component
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              The <span className="text-primary font-semibold">Image</span>{" "}
              component provides a flexible, accessible, and SEO-friendly way to
              display images, SVGs, and overlays. Built-in features include
              hover effects, shadows, borders, rounded corners, and responsive
              layouts.
            </p>
          </header>

          {/* Basic Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Usage
            </h2>
            <p className="text-gray-300 mb-3">
              Display a standard image with a fixed width and height.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Image
  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  alt="Ocean"
  width={320}
  height={200}
/>`}
              previewContent={
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                  alt="Ocean"
                  width={320}
                  height={200}
                />
              }
            />
          </section>

          {/* Rounded Corners & Shadow */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Rounded Corners & Shadow
            </h2>
            <p className="text-gray-300 mb-3">
              Customize the border radius and add shadows for a polished look.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Image
  src="https://images.unsplash.com/photo-1517816428104-797678c7cf0c"
  alt="Mountains"
  width={320}
  height={200}
  rounded="16px"
  shadow
/>`}
              previewContent={
                <Image
                  src="https://images.unsplash.com/photo-1517816428104-797678c7cf0c"
                  alt="Mountains"
                  width={320}
                  height={200}
                  rounded="16px"
                  shadow
                />
              }
            />
          </section>

          {/* Hover Effects */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Hover Effects
            </h2>
            <p className="text-gray-300 mb-3">
              Add smooth animations on hover using <code className="text-primary">hoverScale</code>, <code className="text-primary">hoverOpacity</code>, <code className="text-primary">hoverRotate</code>, and <code className="text-primary">hoverShadow</code>.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Image
  src="https://images.unsplash.com/photo-1521747116042-5a810fda9664"
  alt="Workspace"
  width={320}
  height={200}
  shadow
  hoverOpacity={0.8}
  hoverScale={1.05}
  hoverShadow
/>`}
              previewContent={
                <Image
                  src="https://images.unsplash.com/photo-1521747116042-5a810fda9664"
                  alt="Workspace"
                  width={320}
                  height={200}
                  shadow
                  hoverOpacity={0.8}
                  hoverScale={1.05}
                  hoverShadow
                />
              }
            />
          </section>

          {/* Overlay Text */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Overlay Text
            </h2>
            <p className="text-gray-300 mb-3">
              Add a text overlay with a semi-transparent background using <code className="text-primary">overlayText</code> and <code className="text-primary">overlayColor</code>.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Image
  src="https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg"
  alt="Team"
  width={320}
  height={200}
  overlayText="Collaborate. Build. Grow."
  overlayColor="rgba(0,0,0,0.4)"
/>`}
              previewContent={
                <Image
                  src="https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg"
                  alt="Team"
                  width={320}
                  height={200}
                  overlayText="Collaborate. Build. Grow."
                  overlayColor="rgba(0,0,0,0.4)"
                />
              }
            />
          </section>

          {/* Responsive Images */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Responsive Images
            </h2>
            <p className="text-gray-300 mb-3">
              Set <code className="text-primary">responsive</code> to true for fluid images that adapt to parent width.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Image
  src="https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg"
  alt="Responsive Example"
  responsive
/>`}
              previewContent={
                <div className="w-full max-w-md">
                  <Image
                    src="https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg"
                    alt="Responsive Example"
                    responsive
                  />
                </div>
              }
            />
          </section>

          {/* SVG & Placeholder Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              SVG or Placeholder Mode
            </h2>
            <p className="text-gray-300 mb-3">
              Render an SVG icon or React element instead of a standard image using <code className="text-primary">svgIcon</code>.
            </p>
            <CodePreviewBlock
              language="jsx"
              code={`<Image
  svgIcon={<CircuitBoard size={50} />}
/>`}
              previewContent={<Image svgIcon={<CircuitBoard size={50} />} />}
            />
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            <p>
              Built with <span className="text-primary">React</span>,{" "}
              <span className="text-primary">Tailwind CSS</span>, &{" "}
              <span className="text-primary">TypeScript</span>.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ImageDocs;