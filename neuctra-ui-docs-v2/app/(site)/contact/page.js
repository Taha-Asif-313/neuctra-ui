import Link from "next/link";
import { ArrowRight, Bug, Mail, MessageSquareText } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const contactOptions = [
  {
    icon: Mail,
    title: "Product and general questions",
    description: "Ask about Neuctra UI, the CLI, or the MCP integrations.",
    href: "mailto:contact@neuctraui.com?subject=Neuctra%20UI%20question",
    action: "Email Neuctra UI",
  },
  {
    icon: Bug,
    title: "Report a bug or request a feature",
    description: "Share a reproducible issue or suggest an improvement in GitHub.",
    href: "https://github.com/Taha-Asif-313/neuctra-ui/issues",
    action: "Open GitHub issues",
  },
  {
    icon: MessageSquareText,
    title: "Contribute to the project",
    description: "Review the source and open a discussion or pull request.",
    href: "https://github.com/Taha-Asif-313/neuctra-ui",
    action: "Visit the repository",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-28 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-4xl border-b border-border pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            Contact
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            How can we help?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-secondary sm:text-lg">
            Choose the right route for product questions, bug reports, feature
            requests, or contributions. Support requests can include the
            package and version, framework, and steps needed to reproduce the
            issue.
          </p>
        </header>

        <section className="grid gap-8 border-b border-border py-10 sm:py-14 lg:grid-cols-[minmax(180px,0.7fr)_2fr] lg:gap-10">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Send a message</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
              Share your question or feedback. Your email app will open so you can review and send the message.
            </p>
          </div>
          <div className="max-w-3xl">
            <ContactForm />
          </div>
        </section>

        <section className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(180px,0.7fr)_2fr]">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Get in touch</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
              Pick the channel that best matches what you need.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {contactOptions.map(({ icon: Icon, title, description, href, action }) => (
              <article key={title} className="grid gap-3 py-6 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:py-7">
                <Icon className="mt-1 text-primary" size={20} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-secondary">{description}</p>
                </div>
                <a
                  href={href}
                  target={href.startsWith("https://") ? "_blank" : undefined}
                  rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary sm:justify-self-end"
                >
                  {action} <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-secondary">
            Looking for setup instructions or component examples? The docs may
            have the answer already.
          </p>
          <Link href="/docs" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">
            Browse documentation <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </div>
  );
}
