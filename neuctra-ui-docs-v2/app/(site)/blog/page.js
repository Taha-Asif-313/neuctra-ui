import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { blogPosts } from "@/lib/blogPosts";

const publishedDate = (value) => new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

export default function BlogIndexPage() {
  const [featured, ...morePosts] = blogPosts;

  return (
    <div className="min-h-screen bg-background pb-20 pt-28 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-4xl border-b border-border pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Neuctra UI journal</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Notes for building product UI</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
            Practical guides to the Neuctra UI component library, project setup, and AI-assisted development workflows.
          </p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 sm:py-14 lg:grid-cols-[minmax(180px,0.7fr)_2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Featured article</p>
          </div>
          <article>
            <p className="text-sm font-medium text-primary">{featured.category}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              <Link href={`/blog/${featured.slug}`} className="hover:text-primary">{featured.title}</Link>
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-secondary">{featured.summary}</p>
            <ArticleMeta post={featured} />
            <Link href={`/blog/${featured.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">
              Read the article <ArrowRight size={15} />
            </Link>
          </article>
        </section>

        <section className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(180px,0.7fr)_2fr]">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">More articles</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">Guides for the tools and workflows in the Neuctra UI ecosystem.</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {morePosts.map((post) => (
              <article key={post.slug} className="py-6 first:pt-7 last:pb-7">
                <p className="text-sm font-medium text-primary">{post.category}</p>
                <h3 className="mt-2 text-xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary">{post.summary}</p>
                <ArticleMeta post={post} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ArticleMeta({ post }) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span>By Neuctra UI</span>
      <time dateTime={post.published}>{publishedDate(post.published)}</time>
      <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{post.readingTime}</span>
    </p>
  );
}
