"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { ScrollArea, Avatar, Badge, Card, CardBody, Progress } from "@neuctra/ui";

const scrollAreaFaq = buildComponentFaq("ScrollArea", { sizes: ["sm", "md"] });

const activity = [
  { name: "Ava Chen", action: "merged pull request #482", time: "2m ago" },
  { name: "Noah Patel", action: "commented on Billing redesign", time: "14m ago" },
  { name: "Lena Ortiz", action: "deployed api to production", time: "1h ago" },
  { name: "Sam Lee", action: "opened issue Checkout timeout", time: "2h ago" },
  { name: "Ava Chen", action: "updated the release notes", time: "3h ago" },
  { name: "Noah Patel", action: "invited 3 members", time: "5h ago" },
  { name: "Lena Ortiz", action: "rotated the API key", time: "Yesterday" },
  { name: "Sam Lee", action: "closed 6 issues", time: "Yesterday" },
];

const projects = [
  { name: "Billing redesign", status: "In review", updated: "2h ago" },
  { name: "Mobile onboarding", status: "In progress", updated: "Today" },
  { name: "API v2 migration", status: "Blocked", updated: "Yesterday" },
  { name: "Help center", status: "Shipped", updated: "Mon" },
  { name: "Usage alerts", status: "Planned", updated: "Last week" },
];

const initials = (name) => name.split(" ").map((part) => part[0]).join("");

function ScrollPositionDemo() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">Terms of service</p>
        <span className="whitespace-nowrap text-xs text-muted-foreground">{progress}% read</span>
      </div>
      <Progress value={progress} size="sm" label="Reading progress" />
      <ScrollArea
        height={176}
        scrollbars="y"
        ariaLabel="Terms of service"
        onViewportScroll={(event) => {
          const el = event.currentTarget;
          const max = el.scrollHeight - el.clientHeight;
          setProgress(max > 0 ? Math.round((el.scrollTop / max) * 100) : 100);
        }}
      >
        <div className="space-y-3 p-4 text-sm text-secondary">
          <p>By creating an account you agree to use the service in line with these terms and any policies referenced here.</p>
          <p>You are responsible for the activity on your workspace, including content uploaded by invited members.</p>
          <p>We may update these terms from time to time. Material changes will be announced by email at least 30 days in advance.</p>
          <p>Paid plans renew automatically until cancelled. You can cancel at any time from the billing page.</p>
        </div>
      </ScrollArea>
    </div>
  );
}

const PROPS = [
  ["children", "ReactNode", "-", "Scrollable content (required)."],
  ["height", "number | string", "-", "Fixed viewport height; numbers are pixels."],
  ["maxHeight", "number | string", "-", "Maximum viewport height; numbers are pixels."],
  ["maxWidth", "number | string", "-", "Maximum viewport width; numbers are pixels."],
  ["scrollbars", '"both" | "x" | "y" | "none"', '"both"', "Which scrollbars may appear."],
  ["size", '"sm" | "md"', '"md"', "Thickness of the styled scrollbars."],
  ["bordered", "boolean", "true", "Draws the card frame. Set false for a bare scroller."],
  ["focusable", "boolean", "true", "Makes the viewport keyboard-focusable so it can be scrolled with the keyboard."],
  ["ariaLabel", "string", "-", "Accessible name; exposes the viewport as a labelled region."],
  ["viewportRef", "Ref<HTMLDivElement>", "-", "Ref to the scrollable viewport element."],
  ["onViewportScroll", "UIEventHandler<HTMLDivElement>", "-", "Scroll handler attached to the viewport."],
  ["className", "string", "-", "Styles the outer frame."],
  ["viewportClassName", "string", "-", "Styles the scrollable viewport."],
  ["style", "CSSProperties", "-", "Inline styles for the outer frame."],
  ["viewportStyle", "CSSProperties", "-", "Inline styles for the scrollable viewport."],
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

const ScrollAreaDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            ScrollArea Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A theme-aware scroll container with constrained dimensions,
            configurable axes, keyboard scrolling and subtly styled scrollbars
            using semantic Tailwind tokens.
          </p>
        </header>

        <section aria-labelledby="ScrollArea-import">
          <h2 id="ScrollArea-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { ScrollArea } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="ScrollArea-example-0">
          <h2 id="ScrollArea-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Cap the height with maxHeight and the content scrolls inside a
            card frame. Click in and use the arrow keys to scroll.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ScrollArea maxHeight={256} scrollbars="y" ariaLabel="Recent activity" className="w-full max-w-md">
  <ul className="divide-y divide-border">
    {activity.map((item, index) => (
      <li key={index} className="flex items-center gap-3 px-4 py-3">
        <Avatar size="sm" fallback={initials(item.name)} alt={item.name} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-foreground">
            <span className="font-medium">{item.name}</span> {item.action}
          </p>
          <p className="text-xs text-muted-foreground">{item.time}</p>
        </div>
      </li>
    ))}
  </ul>
</ScrollArea>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ScrollArea maxHeight={256} scrollbars="y" ariaLabel="Recent activity" className="w-full max-w-md">
                  <ul className="divide-y divide-border">
                    {activity.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 px-4 py-3">
                        <Avatar size="sm" fallback={initials(item.name)} alt={item.name} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-foreground">
                            <span className="font-medium">{item.name}</span> {item.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ScrollArea-example-1">
          <h2 id="ScrollArea-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Horizontal Scrolling
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            scrollbars="x" for card rails, chip rows or wide content. size="sm"
            gives a thinner scrollbar. The cards keep a fixed width and the rail
            scrolls instead of squeezing them on small screens.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<ScrollArea scrollbars="x" size="sm" ariaLabel="Recent projects" className="w-full max-w-lg">
  <ul className="flex w-max gap-3 p-4">
    {projects.map((project) => (
      <li key={project.name} className="w-48 shrink-0">
        <Card padding="sm">
          <CardBody className="space-y-2">
            <p className="truncate text-sm font-medium text-foreground" title={project.name}>{project.name}</p>
            <div className="flex items-center justify-between gap-2">
              <Badge text={project.status} variant="soft" size="sm" className="whitespace-nowrap" />
              <span className="whitespace-nowrap text-xs text-muted-foreground">{project.updated}</span>
            </div>
          </CardBody>
        </Card>
      </li>
    ))}
  </ul>
</ScrollArea>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ScrollArea scrollbars="x" size="sm" ariaLabel="Recent projects" className="w-full max-w-lg">
                  <ul className="flex w-max gap-3 p-4">
                    {projects.map((project) => (
                      <li key={project.name} className="w-48 shrink-0">
                        <Card padding="sm">
                          <CardBody className="space-y-2">
                            <p className="truncate text-sm font-medium text-foreground" title={project.name}>{project.name}</p>
                            <div className="flex items-center justify-between gap-2">
                              <Badge text={project.status} variant="soft" size="sm" className="whitespace-nowrap" />
                              <span className="whitespace-nowrap text-xs text-muted-foreground">{project.updated}</span>
                            </div>
                          </CardBody>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            }
          />
        </section>

        <section aria-labelledby="ScrollArea-example-2">
          <h2 id="ScrollArea-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Tracking Scroll Position
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            onViewportScroll fires on the inner scroller, so you can build
            reading progress, sticky shadows or infinite loading. Here it
            drives a Progress bar above the terms.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [progress, setProgress] = useState(0);

<div className="w-full max-w-md space-y-3">
  <div className="flex items-center justify-between gap-3">
    <p className="text-sm font-medium text-foreground">Terms of service</p>
    <span className="whitespace-nowrap text-xs text-muted-foreground">{progress}% read</span>
  </div>
  <Progress value={progress} size="sm" label="Reading progress" />
  <ScrollArea
    height={176}
    scrollbars="y"
    ariaLabel="Terms of service"
    onViewportScroll={(event) => {
      const el = event.currentTarget;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.round((el.scrollTop / max) * 100) : 100);
    }}
  >
    <div className="space-y-3 p-4 text-sm text-secondary">
      <p>By creating an account you agree to use the service in line with these terms and any policies referenced here.</p>
      <p>You are responsible for the activity on your workspace, including content uploaded by invited members.</p>
      <p>We may update these terms from time to time. Material changes will be announced by email at least 30 days in advance.</p>
      <p>Paid plans renew automatically until cancelled. You can cancel at any time from the billing page.</p>
    </div>
  </ScrollArea>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ScrollPositionDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="ScrollArea-props">
          <h2 id="ScrollArea-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the ScrollArea component. Other HTML
            attributes are forwarded to the outer frame.
          </p>
          <PropsTable rows={PROPS} />
        </section>

        <section aria-labelledby="ScrollArea-a11y">
          <h2 id="ScrollArea-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The viewport is focusable by default, so keyboard users can scroll it with the arrow keys, Page Up and Page Down.</li>
            <li>When ariaLabel is set, the viewport is exposed as role="region" with that name.</li>
            <li>Focus shows an inset ring that stays inside the rounded frame.</li>
            <li>Uses native scrolling, so wheel, touch, and assistive technology scrolling all work unchanged. overscroll-contain stops scroll chaining to the page.</li>
          </ul>
        </section>

        <ComponentFaq qa={scrollAreaFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default ScrollAreaDocs;
