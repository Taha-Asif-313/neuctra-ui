"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { Carousel } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const carouselFaq = buildComponentFaq("Carousel");

const Slide = ({ n, color }) => (
  <div
    className={`flex h-40 w-full items-center justify-center text-2xl font-bold text-white ${color}`}
  >
    Slide {n}
  </div>
);

const CarouselDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Carousel Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React carousel with arrows, dots, looping, autoplay with hover
            pause, touch swipe, keyboard navigation and reduced-motion
            support.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="Carousel-import">
          <h2
            id="Carousel-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { Carousel } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="Carousel-example-0">
          <h2
            id="Carousel-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Each child becomes a slide. Arrow keys, swipe and the dots all
            navigate.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Carousel label="Feature tour">
  <img src="/slide-1.jpg" alt="Dashboard overview" />
  <img src="/slide-2.jpg" alt="Team settings" />
  <img src="/slide-3.jpg" alt="Billing page" />
</Carousel>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-md">
                  <Carousel label="Demo carousel">
                    <Slide n={1} color="bg-zinc-800" />
                    <Slide n={2} color="bg-zinc-700" />
                    <Slide n={3} color="bg-zinc-600" />
                  </Carousel>
                </div>
              </div>
            }
          />
        </section>

        {/* Autoplay */}
        <section aria-labelledby="Carousel-example-1">
          <h2
            id="Carousel-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Autoplay
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            autoPlay advances on an interval and pauses on hover or focus.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Carousel autoPlay={3000} label="Testimonials">
  {testimonials.map((t) => <TestimonialCard key={t.id} {...t} />)}
</Carousel>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-md">
                  <Carousel autoPlay={3000} label="Autoplay demo">
                    <Slide n={1} color="bg-primary/60" />
                    <Slide n={2} color="bg-primary/40" />
                    <Slide n={3} color="bg-primary/20" />
                  </Carousel>
                </div>
              </div>
            }
          />
        </section>

        {/* Minimal (no arrows, no loop) */}
        <section aria-labelledby="Carousel-example-2">
          <h2
            id="Carousel-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Minimal (no arrows, no loop)
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Carousel showArrows={false} loop={false}>…</Carousel>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-md">
                  <Carousel showArrows={false} loop={false} label="Minimal demo">
                    <Slide n={1} color="bg-zinc-800" />
                    <Slide n={2} color="bg-zinc-700" />
                  </Carousel>
                </div>
              </div>
            }
          />
        </section>

        {/* Props Table */}
        <section aria-labelledby="Carousel-props">
          <h2
            id="Carousel-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the Carousel component.
          </p>

          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">Prop</th>
                  <th scope="col" className="text-left p-3">Type</th>
                  <th scope="col" className="text-left p-3">Default</th>
                  <th scope="col" className="text-left p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">children</td>
                  <td className="p-3 font-mono text-xs text-gray-300">ReactNode</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Slides (required)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">defaultIndex</td>
                  <td className="p-3 font-mono text-xs text-gray-300">number</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">0</td>
                  <td className="p-3">Initial slide</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">onIndexChange</td>
                  <td className="p-3 font-mono text-xs text-gray-300">(index: number) =&gt; void</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired on every slide change</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">autoPlay</td>
                  <td className="p-3 font-mono text-xs text-gray-300">number</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">0</td>
                  <td className="p-3">Interval in ms; 0 disables. Pauses on hover/focus</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">loop</td>
                  <td className="p-3 font-mono text-xs text-gray-300">boolean</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Wrap around at the ends</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">showArrows</td>
                  <td className="p-3 font-mono text-xs text-gray-300">boolean</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Prev/next buttons</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">showDots</td>
                  <td className="p-3 font-mono text-xs text-gray-300">boolean</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">true</td>
                  <td className="p-3">Dot indicators</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">label</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"Carousel"</td>
                  <td className="p-3">Accessible region name</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">trackClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the overflow-hidden track wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">slidesClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the sliding flex container that holds all slides.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">slideClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each individual slide wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">arrowClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles both the previous and next arrow buttons.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">prevArrowClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the previous arrow button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">nextArrowClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the next arrow button.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">arrowIconClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the chevron icons inside the arrow buttons.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">dotsClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles the dots container.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">dotClassName</td>
                  <td className="p-3 font-mono text-xs text-gray-300">string</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each individual dot button.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="Carousel-a11y">
          <h2
            id="Carousel-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Renders role="region" with aria-roledescription="carousel";
              each slide is a labelled group ("Slide 2 of 5").
            </li>
            <li>
              Hidden slides are inert and aria-hidden, so their links are
              unreachable until active.
            </li>
            <li>
              Arrow keys navigate while focused; the slide transition is
              disabled under prefers-reduced-motion.
            </li>
            <li>Autoplay pauses on hover and keyboard focus (WCAG 2.2.2).</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={carouselFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default CarouselDocs;
