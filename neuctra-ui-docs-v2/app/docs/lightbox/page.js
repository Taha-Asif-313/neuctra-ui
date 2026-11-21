"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Images } from "lucide-react";
import { Lightbox, ImageGallery, Button, Card, CardBody } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const lightboxFaq = buildComponentFaq("Lightbox");

const photos = [
  {
    src: "https://picsum.photos/seed/neuctra-studio/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-studio/240/240",
    alt: "Studio desk with a laptop and plants",
    caption: "Studio, north wall. Shot for the careers page.",
  },
  {
    src: "https://picsum.photos/seed/neuctra-office/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-office/240/240",
    alt: "Open office with long tables",
    caption: "Open office, second floor.",
  },
  {
    src: "https://picsum.photos/seed/neuctra-lounge/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-lounge/240/240",
    alt: "Lounge area with sofas",
    caption: "Lounge and coffee bar.",
  },
  {
    src: "https://picsum.photos/seed/neuctra-rooftop/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-rooftop/240/240",
    alt: "Rooftop terrace at sunset",
    caption: "Rooftop terrace, used for Friday demos.",
  },
];

function LightboxDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" iconBefore={<Images size={16} />} onClick={() => setOpen(true)}>
        View office photos
      </Button>
      <Lightbox images={photos} open={open} onOpenChange={setOpen} zoomable />
    </>
  );
}

function ListingGalleryDemo() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <Card className="w-full max-w-md">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full overflow-hidden rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open photo gallery"
      >
        <img src={photos[index].src} alt={photos[index].alt} className="aspect-video w-full object-cover" />
      </button>
      <CardBody className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">Downtown studio, 120 m²</p>
          <p className="text-xs text-muted-foreground">Photo {index + 1} of {photos.length}</p>
        </div>
        <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
          All photos
        </Button>
      </CardBody>
      <Lightbox
        images={photos}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
        loop={false}
        ariaLabel="Listing photos"
      />
    </Card>
  );
}

const LightboxDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Lightbox Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A full-screen image viewer with arrow-key and swipe navigation, optional zoom, captions and a thumbnail strip. It traps focus, locks page scroll and fades in and out. ImageGallery pairs it with a responsive thumbnail grid.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Lightbox-import">
          <h2
            id="Lightbox-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Lightbox, ImageGallery } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="Lightbox-example-0">
          <h2
            id="Lightbox-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass an images array and control open. zoomable adds a zoom button and click-to-zoom on the image. Captions render under the image. The photos array is shared by all examples below.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const photos = [
  {
    src: "https://picsum.photos/seed/neuctra-studio/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-studio/240/240",
    alt: "Studio desk with a laptop and plants",
    caption: "Studio, north wall. Shot for the careers page.",
  },
  {
    src: "https://picsum.photos/seed/neuctra-office/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-office/240/240",
    alt: "Open office with long tables",
    caption: "Open office, second floor.",
  },
  {
    src: "https://picsum.photos/seed/neuctra-lounge/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-lounge/240/240",
    alt: "Lounge area with sofas",
    caption: "Lounge and coffee bar.",
  },
  {
    src: "https://picsum.photos/seed/neuctra-rooftop/1600/1000",
    thumbnail: "https://picsum.photos/seed/neuctra-rooftop/240/240",
    alt: "Rooftop terrace at sunset",
    caption: "Rooftop terrace, used for Friday demos.",
  },
];

function LightboxDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" iconBefore={<Images size={16} />} onClick={() => setOpen(true)}>
        View office photos
      </Button>
      <Lightbox images={photos} open={open} onOpenChange={setOpen} zoomable />
    </>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <LightboxDemo />
              </div>
            }
          />
        </section>

        {/* Example: Image Gallery */}
        <section aria-labelledby="Lightbox-example-1">
          <h2
            id="Lightbox-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Image Gallery
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            ImageGallery renders a thumbnail grid that opens the lightbox at the clicked image. It accepts every Lightbox prop.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ImageGallery images={photos} gridClassName="w-full max-w-xl" zoomable />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ImageGallery images={photos} gridClassName="w-full max-w-xl" zoomable />
              </div>
            }
          />
        </section>

        {/* Example: Controlled Index */}
        <section aria-labelledby="Lightbox-example-2">
          <h2
            id="Lightbox-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Controlled Index
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Drive both open and index to sync the viewer with a cover image, as on a listing page. loop=&#123;false&#125; stops at the first and last photo.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function ListingGalleryDemo() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <Card className="w-full max-w-md">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full overflow-hidden rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open photo gallery"
      >
        <img src={photos[index].src} alt={photos[index].alt} className="aspect-video w-full object-cover" />
      </button>
      <CardBody className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">Downtown studio, 120 m²</p>
          <p className="text-xs text-muted-foreground">Photo {index + 1} of {photos.length}</p>
        </div>
        <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
          All photos
        </Button>
      </CardBody>
      <Lightbox
        images={photos}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
        loop={false}
        ariaLabel="Listing photos"
      />
    </Card>
  );
}`}
            previewContent={
              <div className="flex w-full items-center justify-center py-4">
                <ListingGalleryDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="Lightbox-props">
          <h2
            id="Lightbox-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Lightbox components.
          </p>


          <h3 className="text-lg font-semibold text-white mb-3">
            Lightbox
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    images
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    LightboxImage[]
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Ordered list of images to browse (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    open
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Controlled visibility of the overlay.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    defaultOpen
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Initial visibility when uncontrolled.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onOpenChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (open: boolean) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called whenever the overlay opens or closes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    index
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Controlled index of the active image.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    defaultIndex
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">0</td>
                  <td className="p-3">Initial active index when uncontrolled.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onIndexChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (index: number) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Called with the next index on navigation.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    zoomable
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Adds a zoom toggle and click-to-zoom on the image.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    loop
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Wraps from the last image to the first and back.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    showThumbnails
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Shows the thumbnail strip when there is more than one image.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ariaLabel
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Image gallery"</td>
                  <td className="p-3">Accessible name of the dialog.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the fixed overlay root.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the overlay root.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    backdropClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the dimmed backdrop.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    imageClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the active image.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    controlClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to the close, previous, next and zoom buttons.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    thumbnailClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every thumbnail button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    captionClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the caption under the image.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            ImageGallery
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ...LightboxProps
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    LightboxProps
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Accepts every Lightbox prop, forwarded to the viewer.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    gridClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the thumbnail grid.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    gridStyle
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the thumbnail grid.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    tileClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Applied to every grid tile button.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-white mt-8 mb-3">
            LightboxImage
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    src
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Full-resolution image URL (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    alt
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Alternative text; defaults to "Image N of M".</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    thumbnail
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Smaller source for thumbnails; falls back to src.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    caption
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Caption shown under the image.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Lightbox-a11y">
          <h2
            id="Lightbox-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The viewer is a modal dialog (role="dialog", aria-modal) named by ariaLabel. Focus is trapped inside and returns to the opener on close.</li>
            <li>Arrow Left and Right move between images, Home and End jump to the ends and Escape closes. Clicking the backdrop also closes.</li>
            <li>The position counter is a polite live region, so screen readers hear "2 / 4" as you navigate.</li>
            <li>All controls are labelled buttons with visible focus rings; the zoom button exposes aria-pressed and the active thumbnail aria-current.</li>
            <li>Always pass alt text for meaningful images. Animations are removed with reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={lightboxFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default LightboxDocs;
