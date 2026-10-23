import Link from "next/link";
import { ArrowRight } from "lucide-react";

const notices = [
  {
    title: "Documentation and examples",
    paragraphs: [
      "Documentation, examples, and setup instructions are provided to help you work with Neuctra UI. Package APIs and third-party tools can change, so check the version installed in your project and verify examples before using them in production.",
      "Examples are starting points. Review generated or copied code for your own product requirements, accessibility needs, and security practices.",
    ],
  },
  {
    title: "Software and licenses",
    paragraphs: [
      "The rights and conditions for using, modifying, and redistributing Neuctra UI software are described by the license files included with the relevant packages. Third-party tools and dependencies may have their own terms.",
    ],
  },
  {
    title: "External services",
    paragraphs: [
      "This site may link to external projects and services. Their availability, content, privacy practices, and terms are controlled by their respective operators.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-28 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-4xl border-b border-border pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Site information</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Disclaimer</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
            A short guide to the scope of the information published on the Neuctra UI website.
          </p>
        </header>

        <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(180px,0.7fr)_2fr]">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">About this notice</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
              This page explains how to interpret the site's product information and links.
            </p>
          </div>
          <div className="max-w-3xl divide-y divide-border border-y border-border">
            {notices.map((notice) => (
              <section key={notice.title} className="py-7 first:pt-8 last:pb-8">
                <h2 className="text-lg font-semibold">{notice.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-secondary sm:text-base">
                  {notice.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-7">
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">
            Contact Neuctra UI <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
