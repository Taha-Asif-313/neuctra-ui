import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { blogPosts } from "@/lib/blogPosts";
import { blogContent } from "@/lib/blogContent";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle || `${post.title} | Neuctra UI Blog`,
    description: post.summary,
    keywords: post.keywords || `${post.category}, Neuctra UI, React UI`,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  const content = blogContent[slug];
  if (!post || !content) notFound();

  const path = `/blog/${post.slug}`;
  const datePublished = `${post.published}T00:00:00Z`;

  return (
    <div className="min-h-screen bg-background pb-20 pt-28 text-foreground">
      <JsonLd data={[
        breadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
          { label: post.title, path },
        ]),
        {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished,
          dateModified: datePublished,
          url: `${SITE_URL}${path}`,
          mainEntityOfPage: `${SITE_URL}${path}`,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@id": `${SITE_URL}/#organization` },
          isPartOf: { "@id": `${SITE_URL}/#website` },
          inLanguage: "en",
        },
      ]} />

      <article className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-secondary hover:text-primary">
          <ArrowLeft size={15} /> All articles
        </Link>
        <header className="mt-8 max-w-4xl border-b border-border pb-8 sm:pb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">{post.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-secondary sm:text-lg">{content.intro}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span>By Neuctra UI</span>
            <time dateTime={post.published}>{new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(datePublished))}</time>
            <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{post.readingTime}</span>
          </p>
        </header>

        <div className="grid gap-10 py-8 sm:py-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Article sections" className="h-fit lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">In this article</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm lg:flex-col lg:gap-3">
              {content.sections.map((section, index) => (
                <li key={section.heading}><a href={`#section-${index + 1}`} className="text-secondary hover:text-primary">{section.heading}</a></li>
              ))}
            </ul>
          </nav>

          <div className="max-w-3xl divide-y divide-border border-y border-border">
            {content.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-24 space-y-4 py-7 first:pt-8 last:pb-8">
                <h2 className="text-xl font-semibold sm:text-2xl">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-secondary sm:text-base">{paragraph}</p>)}
                {section.list && <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-secondary sm:text-base">{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.code && <pre className="max-w-full overflow-x-auto border border-border bg-accent p-4 text-xs leading-6 text-foreground sm:text-sm"><code>{section.code}</code></pre>}
              </section>
            ))}
          </div>
        </div>

        {content.faqs?.length > 0 && (
          <section className="mx-auto max-w-3xl border-t border-border py-8 sm:py-10" aria-labelledby="article-faq-heading">
            <h2 id="article-faq-heading" className="mb-5 text-2xl font-semibold">Frequently asked questions</h2>
            <div className="divide-y divide-border border-y border-border">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-medium marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                    {faq.question}
                    <span aria-hidden="true" className="shrink-0 text-xl font-normal text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary sm:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="grid gap-4 border-t border-border pt-7 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-16">
          <h2 className="text-lg font-semibold">Continue reading</h2>
          <ul className="divide-y divide-border border-y border-border">
            {content.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-12 items-center justify-between gap-4 py-3 text-sm text-secondary hover:text-primary">
                  {item.title}<ArrowRight size={15} className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
