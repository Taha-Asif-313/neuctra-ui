"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Carousel } from "@neuctra/ui";

const Slide = ({ n, color }) => (
  <div
    className={`flex h-40 w-full items-center justify-center text-2xl font-bold text-white ${color}`}
  >
    Slide {n}
  </div>
);

const CarouselDocs = () => (
  <ComponentDocPage
    name="Carousel"
    title="Carousel Component — React Slider & Slideshow | Neuctra UI"
    description="React carousel with arrows, dots, looping, autoplay with hover pause, touch swipe, keyboard navigation and reduced-motion support."
    keywords="react carousel component, image slider react, slideshow ui, autoplay carousel, swipe slider tailwind, neuctra ui carousel"
    importCode={`import { Carousel } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description: "Each child becomes a slide. Arrow keys, swipe and the dots all navigate.",
        code: `<Carousel label="Feature tour">
  <img src="/slide-1.jpg" alt="Dashboard overview" />
  <img src="/slide-2.jpg" alt="Team settings" />
  <img src="/slide-3.jpg" alt="Billing page" />
</Carousel>`,
        preview: (
          <div className="w-full max-w-md">
            <Carousel label="Demo carousel">
              <Slide n={1} color="bg-zinc-800" />
              <Slide n={2} color="bg-zinc-700" />
              <Slide n={3} color="bg-zinc-600" />
            </Carousel>
          </div>
        ),
      },
      {
        title: "Autoplay",
        description: "autoPlay advances on an interval and pauses on hover or focus.",
        code: `<Carousel autoPlay={3000} label="Testimonials">
  {testimonials.map((t) => <TestimonialCard key={t.id} {...t} />)}
</Carousel>`,
        preview: (
          <div className="w-full max-w-md">
            <Carousel autoPlay={3000} label="Autoplay demo">
              <Slide n={1} color="bg-primary/60" />
              <Slide n={2} color="bg-primary/40" />
              <Slide n={3} color="bg-primary/20" />
            </Carousel>
          </div>
        ),
      },
      {
        title: "Minimal (no arrows, no loop)",
        code: `<Carousel showArrows={false} loop={false}>…</Carousel>`,
        preview: (
          <div className="w-full max-w-md">
            <Carousel showArrows={false} loop={false} label="Minimal demo">
              <Slide n={1} color="bg-zinc-800" />
              <Slide n={2} color="bg-zinc-700" />
            </Carousel>
          </div>
        ),
      },
    ]}
    propsTable={[
      { prop: "children", type: "ReactNode", default: "—", description: "Slides (required)" },
      { prop: "defaultIndex", type: "number", default: "0", description: "Initial slide" },
      { prop: "onIndexChange", type: "(index: number) => void", default: "—", description: "Fired on every slide change" },
      { prop: "autoPlay", type: "number", default: "0", description: "Interval in ms; 0 disables. Pauses on hover/focus" },
      { prop: "loop", type: "boolean", default: "true", description: "Wrap around at the ends" },
      { prop: "showArrows", type: "boolean", default: "true", description: "Prev/next buttons" },
      { prop: "showDots", type: "boolean", default: "true", description: "Dot indicators" },
      { prop: "label", type: "string", default: '"Carousel"', description: "Accessible region name" },
      { prop: "trackClassName", type: "string", default: "—", description: "Styles the overflow-hidden track wrapper." },
      { prop: "slidesClassName", type: "string", default: "—", description: "Styles the sliding flex container that holds all slides." },
      { prop: "slideClassName", type: "string", default: "—", description: "Styles each individual slide wrapper." },
      { prop: "arrowClassName", type: "string", default: "—", description: "Styles both the previous and next arrow buttons." },
      { prop: "prevArrowClassName", type: "string", default: "—", description: "Styles the previous arrow button." },
      { prop: "nextArrowClassName", type: "string", default: "—", description: "Styles the next arrow button." },
      { prop: "arrowIconClassName", type: "string", default: "—", description: "Styles the chevron icons inside the arrow buttons." },
      { prop: "dotsClassName", type: "string", default: "—", description: "Styles the dots container." },
      { prop: "dotClassName", type: "string", default: "—", description: "Styles each individual dot button." },
    ]}
    a11y={[
      'Renders role="region" with aria-roledescription="carousel"; each slide is a labelled group ("Slide 2 of 5").',
      "Hidden slides are inert and aria-hidden, so their links are unreachable until active.",
      "Arrow keys navigate while focused; the slide transition is disabled under prefers-reduced-motion.",
      "Autoplay pauses on hover and keyboard focus (WCAG 2.2.2).",
    ]}
  />
);

export default CarouselDocs;
