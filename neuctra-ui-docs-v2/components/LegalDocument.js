import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LegalDocument({ title, intro, sections, footerLabel, footerHref = "/contact" }) {
  return (
    <div className="min-h-screen bg-background pb-20 pt-28 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-4xl border-b border-border pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            Neuctra UI policies
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-secondary">{intro}</p>
        </header>

        <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label={`${title} sections`} className="h-fit lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm lg:flex-col lg:gap-3">
              {sections.map(({ id, heading }) => (
                <li key={id}><a className="text-secondary hover:text-primary" href={`#${id}`}>{heading}</a></li>
              ))}
            </ul>
          </nav>

          <article className="max-w-3xl divide-y divide-border border-y border-border">
            {sections.map(({ id, heading, content }) => (
              <section key={id} id={id} className="scroll-mt-24 py-7 first:pt-8 last:pb-8">
                <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
                <div className="mt-3 space-y-4 text-sm leading-7 text-secondary sm:text-base">{content}</div>
              </section>
            ))}
          </article>
        </div>

        <div className="border-t border-border pt-7">
          <Link href={footerHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">
            {footerLabel} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
