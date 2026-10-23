import Link from "next/link";
import { ArrowRight, Bot, Boxes, Terminal } from "lucide-react";

const toolkit = [
  {
    icon: Boxes,
    number: "01",
    title: "A component library",
    description:
      "@neuctra/ui provides reusable React components with a shared semantic theme system. Use the component docs to check each API and example.",
    href: "/docs",
    link: "Browse components",
  },
  {
    icon: Terminal,
    number: "02",
    title: "A project setup CLI",
    description:
      "The CLI helps configure supported React projects with the library, theme stylesheet, theme context, and provider wiring.",
    href: "/docs/cli",
    link: "Explore the CLI",
  },
  {
    icon: Bot,
    number: "03",
    title: "AI assistant connections",
    description:
      "Local and hosted MCP servers give compatible AI coding tools structured component, design, theme, and SEO guidance.",
    href: "/docs/ai-assistant",
    link: "Meet the assistant",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-28 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-4xl border-b border-border pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            About Neuctra UI
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Practical tools for building and improving product interfaces.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
            Neuctra UI brings together a React component library, a project
            setup CLI, and MCP integrations for AI coding assistants. Each part
            helps developers move through a different stage of interface work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              Explore the documentation <ArrowRight size={17} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-5 py-3 font-medium text-foreground hover:bg-accent"
            >
              Contact the team
            </Link>
          </div>
        </header>

        <section className="grid gap-8 border-b border-border py-10 sm:py-14 lg:grid-cols-[minmax(180px,0.7fr)_2fr]">
          <h2 className="text-xl font-semibold sm:text-2xl">Why we built it</h2>
          <div className="max-w-3xl space-y-4 text-secondary leading-7">
            <p>
              Common interface work often means repeating setup, rebuilding
              familiar patterns, and checking component details across multiple
              references. Neuctra UI puts those resources in one ecosystem.
            </p>
            <p>
              Use the React library directly, prepare a supported project with
              the CLI, or connect an MCP-compatible coding assistant to search
              the component registry and follow the documented design system.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-[minmax(180px,0.7fr)_2fr] sm:items-end">
            <h2 className="text-xl font-semibold sm:text-2xl">The toolkit</h2>
            <p className="max-w-2xl text-secondary leading-7">
              Choose the part that matches the work in front of you. The tools
              can be used independently or together.
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {toolkit.map(({ icon: Icon, number, title, description, href, link }) => (
              <article key={title} className="grid gap-4 py-6 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:py-8">
                <div className="flex items-center gap-3 text-primary sm:flex-col sm:items-start">
                  <Icon size={20} aria-hidden="true" />
                  <span className="text-xs font-medium tracking-wider text-muted-foreground">{number}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary sm:text-base">{description}</p>
                </div>
                <Link href={href} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary sm:justify-self-end">
                  {link} <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2 sm:gap-8">
          <div>
            <h2 className="text-lg font-semibold">Open source</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-secondary">
              The Neuctra UI packages are published for developers to use in
              their projects. See the repository for source code, issues, and
              contribution details.
            </p>
          </div>
          <div className="sm:text-right">
            <a
              href="https://github.com/Taha-Asif-313/neuctra-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
            >
              View the GitHub repository <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
