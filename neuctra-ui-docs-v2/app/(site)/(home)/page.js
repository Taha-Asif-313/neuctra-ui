import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AssemblyHero from "@/components/landing/AssemblyHero";
import AudienceMap from "@/components/landing/AudienceMap";
import ClosingSection from "@/components/landing/ClosingSection";
import LiveShowcase from "@/components/landing/LiveShowcase";
import PipelineSection from "@/components/landing/PipelineSection";
import ScrollRail from "@/components/landing/ScrollRail";
import SectionHeading from "@/components/landing/SectionHeading";
import UntangleSection from "@/components/landing/UntangleSection";
import { MotionPreferenceProvider } from "@/components/patterns/MotionPreference";
import { blogPosts } from "@/lib/blogPosts";

const FAQS = [
  {
    question: "What is Neuctra UI?",
    answer:
      "Neuctra UI is a React component library and design system with reusable UI components, semantic theme tokens, setup guidance, and AI-assisted development tools.",
  },
  {
    question: "Is Neuctra UI free to use?",
    answer:
      "Yes. It is published under the MIT license, which allows personal and commercial use.",
  },
  {
    question: "Does Neuctra UI include complete dashboard or authentication templates?",
    answer:
      "Neuctra UI provides components you can compose into dashboards and authentication screens. Your app supplies the page structure, data, validation, authentication, and business logic.",
  },
  {
    question: "Which React frameworks can the Neuctra UI CLI set up?",
    answer:
      "The CLI supports Vite React, Next.js App Router, Remix, and React Router, with JavaScript and TypeScript setup options.",
  },
  {
    question: "How does Tailwind CSS find Neuctra UI component styles?",
    answer:
      "Tailwind must scan the installed component package. Tailwind v4 uses an @source directive in the global stylesheet; Tailwind v3 uses the content configuration. The path depends on your stylesheet location.",
  },
  {
    question: "Can the Neuctra UI assistant help with a project using another UI library?",
    answer:
      "Yes. Its general UI engineering, design-system, accessibility, responsive design, and SEO guidance can be applied across projects. Neuctra-specific component APIs and tokens apply when a project uses @neuctra/ui.",
  },
];

export default function LandingPage() {
  return (
    <MotionPreferenceProvider>
      {/* Framer Motion renders entrance states as hidden in the static HTML,
          and the sideways track needs its own scrolling without JavaScript. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-draw]{stroke-dasharray:none!important}[data-track]{overflow-x:auto}`}</style>
      </noscript>

      <ScrollRail />

      <div className="relative bg-background text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[60rem] opacity-[0.05] [mask-image:linear-gradient(to_bottom,#000,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <AssemblyHero />
        <UntangleSection />
        <PipelineSection />
        <LiveShowcase />
        <AudienceMap />

        <section
          aria-labelledby="neuctra-faq-heading"
          className="relative z-10 mx-auto max-w-4xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"
        >
          <SectionHeading id="neuctra-faq-heading" title="Questions" />
          <div className="mt-10 divide-y divide-border border-y border-border">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-xl font-normal text-primary transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-2 pr-8 text-sm leading-7 text-secondary sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="react-ui-guides-heading"
          className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              id="react-ui-guides-heading"
              center={false}
              eyebrow="Guides"
              title="Learn as you build"
            />
            <Link
              href="/blog"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-primary"
            >
              All articles <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {post.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-secondary">{post.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <ClosingSection />
      </div>
    </MotionPreferenceProvider>
  );
}
