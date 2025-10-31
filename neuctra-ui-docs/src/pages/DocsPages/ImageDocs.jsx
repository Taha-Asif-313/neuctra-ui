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
              display images, SVGs, and overlays with built-in hover effects,
              borders, shadows, and responsive support. Perfect for product
              displays, UI galleries, and dynamic media elements.
            </p>
          </header>

          {/* Example 1: Basic Image */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Basic Example
            </h2>
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

          {/* Example 2: Rounded and Shadowed */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Rounded Corners & Shadow
            </h2>
            <p className="text-gray-300 mb-3">
              Customize border radius and shadows for a more aesthetic look.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Image
  src="https://images.unsplash.com/photo-1517816428104-797678c7cf0c"
  alt="Mountains"
  width={320}
  height={200}
  borderRadius="16px"
  shadow
/>`}
              previewContent={
                <Image
                  src="https://images.unsplash.com/photo-1517816428104-797678c7cf0c"
                  alt="Mountains"
                  width={320}
                  height={200}
                  borderRadius="16px"
                  shadow
                />
              }
            />
          </section>

          {/* Example 3: Hover Interactions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Hover Effects
            </h2>
            <p className="text-gray-300 mb-3">
              Use hover props like{" "}
              <code className="text-primary">hoverOpacity</code>,{" "}
              <code className="text-primary">hoverScale</code>, and{" "}
              <code className="text-primary">hoverShadow</code> to create
              smooth, modern animations.
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

          {/* Example 4: Overlay Text */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Overlay Text
            </h2>
            <p className="text-gray-300 mb-3">
              Add a text overlay with background color using{" "}
              <code className="text-primary">overlayText</code> and{" "}
              <code className="text-primary">overlayColor</code>.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Image
  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
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

          {/* Example 5: Responsive */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Responsive Layout
            </h2>
            <p className="text-gray-300 mb-3">
              Enable responsiveness by setting{" "}
              <code className="text-primary">responsive</code> to true.
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

          {/* Example 6: SVG Icon Mode */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              SVG or Placeholder Mode
            </h2>
            <p className="text-gray-300 mb-3">
              You can also pass an SVG or React element instead of an image.
            </p>

            <CodePreviewBlock
              language="jsx"
              code={`<Image
  svgIcon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#60a5fa" strokeWidth="2"/>
    <path d="M8 12h8" stroke="#60a5fa" strokeWidth="2"/>
  </svg>}
/>`}
              previewContent={<Image svgIcon={<CircuitBoard size={50} />} />}
            />
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-gray-800 text-sm text-gray-400">
            <p>
              Built with <span className="text-primary">React</span>,{" "}
              <span className="text-primary">Tailwind CSS</span> &{" "}
              <span className="text-primary">TypeScript</span>.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ImageDocs;
