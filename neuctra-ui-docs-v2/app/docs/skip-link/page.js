"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Search } from "lucide-react";
import { SkipLink, Button, Input, VisuallyHidden } from "@neuctra/ui";

const skipLinkFaq = buildComponentFaq("SkipLink");

const navLinks = ["Pricing", "Customers", "Changelog", "Docs"];

const docsLinks = ["Guides", "API reference", "Changelog"];

const PROPS = [
  ["targetId", "string", '"main-content"', "Id of the element that receives focus when the link is activated."],
  ["children", "ReactNode", '"Skip to content"', "Link text."],
  ["position", '"fixed" | "absolute"', '"fixed"', "fixed pins the revealed link to the viewport; absolute pins it to the nearest positioned ancestor."],
  ["href", "string", '"#" + targetId', "Overrides the link target."],
  ["onClick", "MouseEventHandler<HTMLAnchorElement>", "-", "Runs before focus moves; call preventDefault to cancel the jump."],
  ["className", "string", "-", "Styles the link."],
  ["style", "CSSProperties", "-", "Inline styles for the link."],
];

const PropsTable = ({ rows }) => (
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
        {rows.map(([name, type, def, description]) => (
          <tr key={name}>
            <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
            <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
            <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
            <td className="p-3">{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SkipLinkDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            SkipLink Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Accessible React skip link that stays visually hidden until
            focused, then jumps keyboard focus to the main content landmark.
          </p>
        </header>

        <section aria-labelledby="SkipLink-import">
          <h2 id="SkipLink-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { SkipLink } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="SkipLink-example-0">
          <h2 id="SkipLink-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Render it as the first focusable element of the page and point it
            at your main region. In this preview it uses position="absolute"
            so it appears inside the frame: click the frame&apos;s top bar,
            press Shift+Tab then Tab to reveal it, and Enter to skip the nav.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="relative overflow-hidden rounded-xl border border-border bg-background">
  <SkipLink targetId="pricing-main" position="absolute" />
  <header className="flex flex-wrap items-center gap-4 border-b border-border px-4 py-3">
    <span className="text-sm font-semibold text-foreground">Acme</span>
    <nav aria-label="Site" className="flex flex-wrap gap-3">
      {navLinks.map((link) => (
        <a key={link} href="#" onClick={(event) => event.preventDefault()} className="rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {link}
        </a>
      ))}
    </nav>
  </header>
  <section id="pricing-main" aria-label="Pricing" className="space-y-2 p-4">
    <h3 className="text-base font-semibold text-foreground">Simple pricing for growing teams</h3>
    <p className="text-sm text-secondary">Start free, upgrade when you need SSO and audit logs.</p>
    <Button size="sm">Start free trial</Button>
  </section>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="relative w-full overflow-hidden rounded-xl border border-border bg-background">
                  <SkipLink targetId="pricing-main" position="absolute" />
                  <header className="flex flex-wrap items-center gap-4 border-b border-border px-4 py-3">
                    <span className="text-sm font-semibold text-foreground">Acme</span>
                    <nav aria-label="Site" className="flex flex-wrap gap-3">
                      {navLinks.map((link) => (
                        <a
                          key={link}
                          href="#"
                          onClick={(event) => event.preventDefault()}
                          className="rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {link}
                        </a>
                      ))}
                    </nav>
                  </header>
                  <section id="pricing-main" aria-label="Pricing" className="space-y-2 p-4">
                    <h3 className="text-base font-semibold text-foreground">
                      Simple pricing for growing teams
                    </h3>
                    <p className="text-sm text-secondary">
                      Start free, upgrade when you need SSO and audit logs.
                    </p>
                    <Button size="sm">Start free trial</Button>
                  </section>
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="SkipLink-example-1">
          <h2 id="SkipLink-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Page-Level Setup
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            In a real layout keep the default position="fixed" and put the
            link at the top of the body, before any navigation. The target
            does not need a tabindex: SkipLink adds tabindex="-1" when the
            element cannot take focus on its own. AppShell already renders a
            main landmark with id main-content.
          </p>
          <CodeBlock
            code={`// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}`}
          />
        </section>

        <section aria-labelledby="SkipLink-example-2">
          <h2 id="SkipLink-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Custom Label and Multiple Targets
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Long pages can offer several skip targets, such as search or the
            footer. Each link is revealed in turn as it receives focus: click
            the frame&apos;s top bar and press Tab to step through them.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="relative w-full space-y-4 overflow-hidden rounded-xl border border-border bg-background p-4">
  <SkipLink targetId="skip-demo-main" position="absolute">Skip to main content</SkipLink>
  <SkipLink targetId="skip-demo-search" position="absolute">Skip to search</SkipLink>
  <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-3">
    <span className="text-sm font-semibold text-foreground">Acme Docs</span>
    <nav aria-label="Docs" className="flex flex-wrap gap-3">
      {docsLinks.map((link) => (
        <a key={link} href="#" onClick={(event) => event.preventDefault()} className="whitespace-nowrap rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {link}
        </a>
      ))}
    </nav>
  </header>
  <div className="max-w-xs">
    <VisuallyHidden as="label" htmlFor="skip-demo-search">Search docs</VisuallyHidden>
    <Input id="skip-demo-search" type="search" placeholder="Search docs" prefixIcon={Search} />
  </div>
  <section id="skip-demo-main" aria-label="Article" className="space-y-1">
    <h3 className="text-base font-semibold text-foreground">Webhooks</h3>
    <p className="text-sm text-secondary">Webhooks let your app react to events as they happen.</p>
  </section>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="relative w-full space-y-4 overflow-hidden rounded-xl border border-border bg-background p-4">
                  <SkipLink targetId="skip-demo-main" position="absolute">Skip to main content</SkipLink>
                  <SkipLink targetId="skip-demo-search" position="absolute">Skip to search</SkipLink>
                  <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-3">
                    <span className="text-sm font-semibold text-foreground">Acme Docs</span>
                    <nav aria-label="Docs" className="flex flex-wrap gap-3">
                      {docsLinks.map((link) => (
                        <a key={link} href="#" onClick={(event) => event.preventDefault()} className="whitespace-nowrap rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          {link}
                        </a>
                      ))}
                    </nav>
                  </header>
                  <div className="max-w-xs">
                    <VisuallyHidden as="label" htmlFor="skip-demo-search">Search docs</VisuallyHidden>
                    <Input id="skip-demo-search" type="search" placeholder="Search docs" prefixIcon={Search} />
                  </div>
                  <section id="skip-demo-main" aria-label="Article" className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">Webhooks</h3>
                    <p className="text-sm text-secondary">Webhooks let your app react to events as they happen.</p>
                  </section>
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="SkipLink-props">
          <h2 id="SkipLink-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the SkipLink component. Other anchor
            attributes are forwarded to the link.
          </p>
          <PropsTable rows={PROPS} />
        </section>

        <section aria-labelledby="SkipLink-a11y">
          <h2 id="SkipLink-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Hidden with sr-only until it receives focus, so it is the first stop for keyboard users without affecting the visual design.</li>
            <li>On activation it moves real focus to the target, adding tabindex="-1" to non-interactive targets such as main, then scrolls it into view and updates the URL hash.</li>
            <li>The revealed link uses high-contrast primary colors with a focus ring and ring offset.</li>
            <li>Satisfies WCAG 2.4.1 Bypass Blocks when placed before repeated navigation.</li>
          </ul>
        </section>

        <ComponentFaq qa={skipLinkFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default SkipLinkDocs;
