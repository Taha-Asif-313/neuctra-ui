"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { TableOfContents, Card, CardBody } from "@neuctra/ui";

const tocFaq = buildComponentFaq("TableOfContents", { sizes: ["sm", "md"] });

const guideHeadings = [
  { id: "toc-demo-install", text: "Installation", level: 2 },
  { id: "toc-demo-config", text: "Configuration", level: 2 },
  { id: "toc-demo-env", text: "Environment variables", level: 3 },
  { id: "toc-demo-deploy", text: "Deploying", level: 2 },
];

const settingsHeadings = [
  { id: "toc-settings-profile", text: "Profile", level: 1 },
  { id: "toc-settings-security", text: "Security", level: 1 },
  { id: "toc-settings-2fa", text: "Two-factor authentication", level: 2 },
  { id: "toc-settings-sessions", text: "Active sessions", level: 2 },
  { id: "toc-settings-danger", text: "Danger zone", level: 1 },
];

function ControlledTocDemo() {
  const [active, setActive] = useState("toc-settings-security");
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-[12rem_minmax(0,1fr)]">
      <TableOfContents
        headings={settingsHeadings}
        activeId={active}
        onHeadingClick={setActive}
        sticky={false}
        title="Settings"
        ariaLabel="Settings sections"
      />
      <Card className="min-w-0 self-start">
        <CardBody className="space-y-1">
          <p className="text-xs text-muted-foreground">Selected section</p>
          <p className="text-sm font-medium text-foreground">
            {settingsHeadings.find((heading) => heading.id === active)?.text}
          </p>
          <p className="text-sm text-secondary">
            Clicking an entry updates activeId, so the highlight follows your state instead of the scroll position.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

const PROPS = [
  ["headings", "TocHeading[]", "-", "Ordered list of headings to show (required)."],
  ["activeId", "string", "-", "Id of the active heading. When omitted, the active entry follows the scroll position."],
  ["onHeadingClick", "(id: string) => void", "-", "Called when an entry is clicked, before scrolling."],
  ["onActiveChange", "(id: string) => void", "-", "Called when the scroll-tracked active heading changes."],
  ["offsetTop", "number", "24", "Pixels kept above the target when scrolling, e.g. a sticky header height."],
  ["title", "ReactNode", '"On this page"', "Heading above the list; pass null to hide it."],
  ["sticky", "boolean", "true", "Sticks the nav to the top of its scroll container."],
  ["size", '"sm" | "md"', '"md"', "Text scale of the entries."],
  ["ariaLabel", "string", '"On this page"', "Accessible label for the navigation landmark."],
  ["className", "string", "-", "Styles the nav element."],
  ["style", "CSSProperties", "-", "Inline styles for the nav element."],
  ["titleClassName", "string", "-", "Styles the title."],
  ["listClassName", "string", "-", "Styles the list element."],
  ["linkClassName", "string", "-", "Styles every link."],
  ["activeLinkClassName", "string", "-", "Styles the active link, applied after linkClassName."],
];

const HEADING_PROPS = [
  ["id", "string", "-", "Id of the heading element this entry links to (required)."],
  ["text", "string", "-", "Visible link text (required)."],
  ["level", "number", "-", "Heading depth; indentation is relative to the smallest level in the list (required)."],
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

const TableOfContentsDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            TableOfContents Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A lightweight sticky table of contents with built-in scroll spy,
            indentation by heading level and smooth, offset-aware scrolling
            that also moves keyboard focus.
          </p>
        </header>

        <section aria-labelledby="TableOfContents-import">
          <h2 id="TableOfContents-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { TableOfContents } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="TableOfContents-example-0">
          <h2 id="TableOfContents-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass headings that match ids on the page. Without activeId the
            component tracks the scroll position itself. Scroll this page to
            watch the highlight move, or click an entry to jump to it. On small
            screens the list sits above the article; from sm up it moves into
            a right rail.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const guideHeadings = [
  { id: "toc-demo-install", text: "Installation", level: 2 },
  { id: "toc-demo-config", text: "Configuration", level: 2 },
  { id: "toc-demo-env", text: "Environment variables", level: 3 },
  { id: "toc-demo-deploy", text: "Deploying", level: 2 },
];

<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_13rem]">
  <TableOfContents
    headings={guideHeadings}
    offsetTop={80}
    sticky={false}
    className="sm:order-last"
  />
  <article className="min-w-0 space-y-6">
    <div className="space-y-1">
      <h3 id="toc-demo-install" className="text-base font-semibold text-foreground">Installation</h3>
      <p className="text-sm text-secondary">Run npm install @neuctra/ui and import the stylesheet once in your root layout.</p>
    </div>
    <div className="space-y-1">
      <h3 id="toc-demo-config" className="text-base font-semibold text-foreground">Configuration</h3>
      <p className="text-sm text-secondary">Theme tokens live in CSS variables, so light and dark themes switch without a rebuild.</p>
    </div>
    <div className="space-y-1">
      <h4 id="toc-demo-env" className="text-sm font-semibold text-foreground">Environment variables</h4>
      <p className="text-sm text-secondary">Set NEXT_PUBLIC_API_URL before building so client components can reach your API.</p>
    </div>
    <div className="space-y-1">
      <h3 id="toc-demo-deploy" className="text-base font-semibold text-foreground">Deploying</h3>
      <p className="text-sm text-secondary">Any platform that runs Next.js works. Static exports are supported too.</p>
    </div>
  </article>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_13rem]">
                  <TableOfContents
                    headings={guideHeadings}
                    offsetTop={80}
                    sticky={false}
                    className="sm:order-last"
                  />
                  <article className="min-w-0 space-y-6">
                    <div className="space-y-1">
                      <h3 id="toc-demo-install" className="text-base font-semibold text-foreground">Installation</h3>
                      <p className="text-sm text-secondary">Run npm install @neuctra/ui and import the stylesheet once in your root layout.</p>
                    </div>
                    <div className="space-y-1">
                      <h3 id="toc-demo-config" className="text-base font-semibold text-foreground">Configuration</h3>
                      <p className="text-sm text-secondary">Theme tokens live in CSS variables, so light and dark themes switch without a rebuild.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 id="toc-demo-env" className="text-sm font-semibold text-foreground">Environment variables</h4>
                      <p className="text-sm text-secondary">Set NEXT_PUBLIC_API_URL before building so client components can reach your API.</p>
                    </div>
                    <div className="space-y-1">
                      <h3 id="toc-demo-deploy" className="text-base font-semibold text-foreground">Deploying</h3>
                      <p className="text-sm text-secondary">Any platform that runs Next.js works. Static exports are supported too.</p>
                    </div>
                  </article>
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="TableOfContents-example-1">
          <h2 id="TableOfContents-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled Active Heading
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass activeId to drive the highlight yourself, for example from
            your own IntersectionObserver or a router. Scroll spy is turned
            off in controlled mode.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const settingsHeadings = [
  { id: "toc-settings-profile", text: "Profile", level: 1 },
  { id: "toc-settings-security", text: "Security", level: 1 },
  { id: "toc-settings-2fa", text: "Two-factor authentication", level: 2 },
  { id: "toc-settings-sessions", text: "Active sessions", level: 2 },
  { id: "toc-settings-danger", text: "Danger zone", level: 1 },
];

const [active, setActive] = useState("toc-settings-security");

<div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-[12rem_minmax(0,1fr)]">
  <TableOfContents
    headings={settingsHeadings}
    activeId={active}
    onHeadingClick={setActive}
    sticky={false}
    title="Settings"
    ariaLabel="Settings sections"
  />
  <Card className="min-w-0 self-start">
    <CardBody className="space-y-1">
      <p className="text-xs text-muted-foreground">Selected section</p>
      <p className="text-sm font-medium text-foreground">
        {settingsHeadings.find((heading) => heading.id === active)?.text}
      </p>
      <p className="text-sm text-secondary">
        Clicking an entry updates activeId, so the highlight follows your state instead of the scroll position.
      </p>
    </CardBody>
  </Card>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledTocDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="TableOfContents-example-2">
          <h2 id="TableOfContents-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            size="sm" tightens the list for narrow rails. title={"{null}"} hides
            the heading when your layout already labels the column.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
  <div className="min-w-0 space-y-3">
    <p className="text-xs font-medium text-muted-foreground">size="sm"</p>
    <TableOfContents headings={guideHeadings} size="sm" sticky={false} ariaLabel="Guide sections, small" />
  </div>
  <div className="min-w-0 space-y-3">
    <p className="text-xs font-medium text-muted-foreground">size="md", title=null</p>
    <TableOfContents headings={guideHeadings} size="md" title={null} sticky={false} ariaLabel="Guide sections, medium" />
  </div>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="min-w-0 space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">size="sm"</p>
                    <TableOfContents headings={guideHeadings} size="sm" sticky={false} ariaLabel="Guide sections, small" />
                  </div>
                  <div className="min-w-0 space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">size="md", title=null</p>
                    <TableOfContents headings={guideHeadings} size="md" title={null} sticky={false} ariaLabel="Guide sections, medium" />
                  </div>
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="TableOfContents-props">
          <h2 id="TableOfContents-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the TableOfContents component. Other HTML
            attributes are forwarded to the nav element.
          </p>
          <PropsTable rows={PROPS} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">TocHeading</h3>
          <PropsTable rows={HEADING_PROPS} />
        </section>

        <section aria-labelledby="TableOfContents-a11y">
          <h2 id="TableOfContents-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Renders a nav landmark named by ariaLabel containing a list of real anchor links.</li>
            <li>The active entry gets aria-current="location".</li>
            <li>Clicking an entry scrolls to the heading, updates the URL hash, and moves focus to the heading so screen readers continue from there.</li>
            <li>Smooth scrolling is replaced by an instant jump when the user prefers reduced motion. Modifier clicks still open links in a new tab.</li>
            <li>Links show an inset focus ring.</li>
          </ul>
        </section>

        <ComponentFaq qa={tocFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default TableOfContentsDocs;
