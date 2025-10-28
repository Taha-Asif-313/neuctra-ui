"use client";

import React from "react";
import CodeBlock from "@/app/components/docs/CodeBlock";
import CodePreviewBlock from "@/app/components/docs/CodePreviewBlock";
import { ImageGallery } from "@neuctra/ui";

const ImageGalleryDocs: React.FC = () => {
  const columns = [
    { key: "prop", label: "Prop", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "default", label: "Default", sortable: true },
    { key: "description", label: "Description", sortable: false },
  ];

  const data = [
    {
      prop: "images",
      type: `{ src: string; alt?: string }[]`,
      default: "—",
      description:
        "Array of image objects. Each must have a `src` and can optionally include `alt` text.",
    },
    {
      prop: "columns",
      type: `number | { sm?: number; md?: number; lg?: number; xl?: number; default?: number }`,
      default: `{ default: 3 }`,
      description:
        "Number of columns for the gallery. Can be a single number for all viewports, or an object specifying responsive breakpoints.",
    },
    {
      prop: "gap",
      type: "string",
      default: `"10px"`,
      description:
        "CSS gap between items. Accepts any valid CSS spacing unit (e.g., `10px`, `1rem`).",
    },
    {
      prop: "layout",
      type: `"grid" | "masonry"`,
      default: `"grid"`,
      description:
        "Layout style of the gallery. `grid` creates uniform rows/columns; `masonry` allows uneven image heights.",
    },
    {
      prop: "lightbox",
      type: "boolean",
      default: "true",
      description:
        "If true, clicking an image opens it in a fullscreen lightbox with navigation controls.",
    },
    {
      prop: "className",
      type: "string",
      default: `""`,
      description: "Optional additional CSS classes for the gallery container.",
    },
  ];

  return (
    <div className="py-10 max-w-5xl font-primary mx-auto bg-zinc-950 text-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-primary">ImageGallery</span> Component
        Documentation
      </h1>

      {/* Import */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock
          language="javascript"
          code={`import { ImageGallery } from "@neuctra/ui";`}
        />
      </section>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage Example</h2>
        <CodePreviewBlock
          language="tsx"
          code={`<ImageGallery
  images={[
    { src: "/img1.jpg", alt: "First image" },
    { src: "/img2.jpg" },
    { src: "/img3.jpg" }
  ]}
  columns={{ sm: 1, md: 2, lg: 3, xl: 4, default: 3 }}
  gap="15px"
/>`}
          previewContent={
            <ImageGallery
              images={[
                { src: "https://picsum.photos/id/1015/600/400", alt: "Image 1" },
                { src: "https://picsum.photos/id/1016/600/400", alt: "Image 2" },
                { src: "https://picsum.photos/id/1018/600/400" },
              ]}
              columns={{ sm: 1, md: 2, lg: 3, xl: 4, default: 3 }}
              gap="12px"
              layout="grid"
              lightbox
            />
          }
        />
      </section>

      {/* Description */}
      <section className="mb-16">
        <p className="leading-relaxed text-gray-300">
          The <code>ImageGallery</code> component displays a collection of
          images in either a <strong>grid</strong> or <strong>masonry</strong>{" "}
          layout, with optional responsive columns. You can control spacing,
          enable or disable the lightbox preview, and customize styles with{" "}
          <code>className</code>. When the lightbox is enabled, users can click
          an image to view it fullscreen and navigate between images.
        </p>
      </section>

      {/* Props */}
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
          code={`// Masonry layout without lightbox
<ImageGallery
  images={[{ src: "/img1.jpg" }, { src: "/img2.jpg" }, { src: "/img3.jpg" }]}
  columns={2}
  gap="8px"
  layout="masonry"
  lightbox={false}
/>`}
          previewContent={
            <ImageGallery
              images={[
                { src: "https://picsum.photos/id/1019/600/400" },
                { src: "https://picsum.photos/id/1020/600/400" },
                { src: "https://picsum.photos/id/1021/600/400" },
              ]}
              columns={2}
              gap="8px"
              layout="masonry"
              lightbox={false}
            />
          }
          className="mb-8"
        />

        <CodePreviewBlock
          language="tsx"
          code={`// Grid layout with responsive columns
<ImageGallery
  images={[{ src: "/img1.jpg" }, { src: "/img2.jpg" }, { src: "/img3.jpg" }]}
  columns={{ sm: 1, md: 3, default: 4 }}
  gap="20px"
  layout="grid"
/>`}
          previewContent={
            <ImageGallery
              images={[
                { src: "https://picsum.photos/id/1022/600/400" },
                { src: "https://picsum.photos/id/1023/600/400" },
                { src: "https://picsum.photos/id/1024/600/400" },
              ]}
              columns={{ sm: 1, md: 3, default: 4 }}
              gap="20px"
              layout="grid"
            />
          }
        />
      </section>

      {/* Behavior */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Behavior Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            Images open in a fullscreen lightbox (if enabled) with prev/next
            navigation.
          </li>
          <li>Lightbox supports circular navigation through images.</li>
          <li>
            Clicking outside the image or the close button will exit the
            lightbox.
          </li>
          <li>
            <strong>Masonry layout</strong> arranges images in a flowing
            vertical pattern with variable heights.
          </li>
          <li>
            <strong>Grid layout</strong> arranges images in evenly sized cells.
          </li>
          <li>
            Gaps between images can be set to any valid CSS spacing unit.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ImageGalleryDocs;
