"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, Search, Trash2, Star, Download } from "lucide-react";
import { VisuallyHidden, Button, Card, CardBody, Badge, Input, Kbd } from "@neuctra/ui";

const visuallyHiddenFaq = buildComponentFaq("VisuallyHidden");

function FavoriteDemo() {
  const [saved, setSaved] = useState(false);
  return (
    <Card className="w-full max-w-md">
      <CardBody className="space-y-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">Inbox</p>
          <Badge text="3" size="sm" />
          <VisuallyHidden>3 unread messages</VisuallyHidden>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" aria-pressed={saved} onClick={() => setSaved(!saved)}>
            <Star className={saved ? "h-4 w-4 fill-current text-warning" : "h-4 w-4"} aria-hidden="true" />
            <VisuallyHidden>{saved ? "Remove from favorites" : "Add to favorites"}</VisuallyHidden>
          </Button>
          <p className="min-w-0 truncate text-sm text-secondary">Acme Design System</p>
          <div role="status" aria-live="polite">
            <VisuallyHidden>{saved ? "Saved to favorites" : ""}</VisuallyHidden>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const PROPS = [
  ["children", "ReactNode", "-", "Content kept available to screen readers but hidden visually (required)."],
  ["as", '"span" | "div" | "p" | "label" | "legend" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"', '"span"', "Element used for the hidden wrapper."],
  ["htmlFor", "string", "-", "Associates a hidden label with a control; only used when as is label."],
  ["focusable", "boolean", "false", "Reveals the content while it, or something inside it, has keyboard focus."],
  ["className", "string", "-", "Classes merged onto the visually hidden styles."],
  ["style", "CSSProperties", "-", "Inline styles for the hidden wrapper."],
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

const VisuallyHiddenDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            VisuallyHidden Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Hide content visually while keeping it available to screen readers
            with a polymorphic, accessible sr-only primitive for labels, hints
            and live announcements.
          </p>
        </header>

        <section aria-labelledby="VisuallyHidden-import">
          <h2 id="VisuallyHidden-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { VisuallyHidden } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="VisuallyHidden-example-0">
          <h2 id="VisuallyHidden-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Icon Button Labels
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Give icon-only buttons a name that screen readers announce without
            adding visible text. Turn on a screen reader to hear "Download
            invoice" and "Delete invoice".
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card className="w-full max-w-md">
  <CardBody className="flex items-center justify-between gap-3">
    <div className="min-w-0">
      <p className="text-sm font-medium text-foreground">Invoice INV-2041</p>
      <p className="text-xs text-muted-foreground">Due Dec 1 · $1,240.00</p>
    </div>
    <div className="flex shrink-0 gap-1">
      <Button size="sm" variant="ghost">
        <Download className="h-4 w-4" aria-hidden="true" />
        <VisuallyHidden>Download invoice</VisuallyHidden>
      </Button>
      <Button size="sm" variant="ghost">
        <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
        <VisuallyHidden>Delete invoice</VisuallyHidden>
      </Button>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Card className="w-full max-w-md">
                  <CardBody className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">Invoice INV-2041</p>
                      <p className="text-xs text-muted-foreground">Due Dec 1 · $1,240.00</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" aria-hidden="true" />
                        <VisuallyHidden>Download invoice</VisuallyHidden>
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                        <VisuallyHidden>Delete invoice</VisuallyHidden>
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            }
          />
        </section>

        <section aria-labelledby="VisuallyHidden-example-1">
          <h2 id="VisuallyHidden-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Hidden Form Labels
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Use as="label" with htmlFor when the design shows only a search
            icon and placeholder. A placeholder alone is not a reliable label.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="w-full max-w-sm">
  <VisuallyHidden as="label" htmlFor="customer-search">Search customers</VisuallyHidden>
  <Input id="customer-search" type="search" placeholder="Search customers" prefixIcon={Search} />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <VisuallyHidden as="label" htmlFor="customer-search">Search customers</VisuallyHidden>
                  <Input id="customer-search" type="search" placeholder="Search customers" prefixIcon={Search} />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="VisuallyHidden-example-2">
          <h2 id="VisuallyHidden-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Extra Context and Live Announcements
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Add context that sighted users get from layout, like "3 unread" on
            a badge, and pair it with a polite live region to announce state
            changes such as saving a favorite.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [saved, setSaved] = useState(false);

<Card className="w-full max-w-md">
  <CardBody className="space-y-4">
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium text-foreground">Inbox</p>
      <Badge text="3" size="sm" />
      <VisuallyHidden>3 unread messages</VisuallyHidden>
    </div>
    <div className="flex items-center gap-3">
      <Button size="sm" variant="outline" aria-pressed={saved} onClick={() => setSaved(!saved)}>
        <Star className={saved ? "h-4 w-4 fill-current text-warning" : "h-4 w-4"} aria-hidden="true" />
        <VisuallyHidden>{saved ? "Remove from favorites" : "Add to favorites"}</VisuallyHidden>
      </Button>
      <p className="min-w-0 truncate text-sm text-secondary">Acme Design System</p>
      <div role="status" aria-live="polite">
        <VisuallyHidden>{saved ? "Saved to favorites" : ""}</VisuallyHidden>
      </div>
    </div>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <FavoriteDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="VisuallyHidden-example-3">
          <h2 id="VisuallyHidden-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Focusable Content
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            With focusable, the wrapper becomes visible while something
            inside it has keyboard focus, which is how in-page shortcut links
            stay out of the way until a keyboard user needs them.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card className="w-full max-w-md">
  <CardBody className="space-y-2">
    <p className="text-sm text-secondary">
      Click here, then press <Kbd size="sm">Tab</Kbd> to reveal the hidden link below.
    </p>
    <VisuallyHidden as="div" focusable>
      <a href="#keyboard-shortcuts" className="rounded-md text-sm text-primary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        View keyboard shortcuts
      </a>
    </VisuallyHidden>
  </CardBody>
</Card>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <Card className="w-full max-w-md">
                  <CardBody className="space-y-2">
                    <p className="text-sm text-secondary">
                      Click here, then press <Kbd size="sm">Tab</Kbd> to reveal the hidden link below.
                    </p>
                    <VisuallyHidden as="div" focusable>
                      <a href="#keyboard-shortcuts" className="rounded-md text-sm text-primary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        View keyboard shortcuts
                      </a>
                    </VisuallyHidden>
                  </CardBody>
                </Card>
              </div>
            }
          />
        </section>

        <section aria-labelledby="VisuallyHidden-props">
          <h2 id="VisuallyHidden-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the VisuallyHidden component. Other HTML
            attributes such as id are forwarded to the element.
          </p>
          <PropsTable rows={PROPS} />
        </section>

        <section aria-labelledby="VisuallyHidden-a11y">
          <h2 id="VisuallyHidden-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Uses the sr-only technique (1px clipped box), not display:none or visibility:hidden, so screen readers still read the content.</li>
            <li>Do not hide focusable controls without focusable: a keyboard user would tab to something invisible.</li>
            <li>as="label" with htmlFor creates a real programmatic label, which beats aria-label for translation tools.</li>
            <li>Combine with role="status" or aria-live to announce changes that have no visible text.</li>
          </ul>
        </section>

        <ComponentFaq qa={visuallyHiddenFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default VisuallyHiddenDocs;
