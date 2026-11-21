"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility, CalendarDays, GitBranch, Star, GitPullRequest } from "lucide-react";
import { HoverCard, Button, Avatar, Badge } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component.
const hoverCardFaq = buildComponentFaq("HoverCard");

function RepoPreviewDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <HoverCard
        open={open}
        onOpenChange={setOpen}
        side="right"
        contentClassName="w-80"
        trigger={
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            <GitBranch size={14} className="text-muted-foreground" />
            acme/checkout-service
          </span>
        }
      >
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-foreground">checkout-service</p>
            <p className="text-sm text-secondary">Handles carts, taxes and payment intents for the storefront.</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Star size={12} /> 1.2k</span>
            <span className="inline-flex items-center gap-1"><GitPullRequest size={12} /> 8 open</span>
            <Badge text="TypeScript" variant="soft" size="sm" />
          </div>
        </div>
      </HoverCard>
      <span className="text-xs text-muted-foreground">Open: {String(open)}</span>
    </div>
  );
}

const HoverCardDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            HoverCard Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Reveals a richer preview when someone hovers or focuses a trigger, like a profile or repository card. Open and close delays prevent flicker, the panel flips when there is no room, stays clamped inside the viewport and follows the trigger while the page scrolls.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="HoverCard-import">
          <h2
            id="HoverCard-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { HoverCard } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic Usage */}
        <section aria-labelledby="HoverCard-example-0">
          <h2
            id="HoverCard-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass a trigger and the preview as children. Moving the pointer from the trigger into the card keeps it open.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="text-sm text-secondary">
  Reviewed by{" "}
  <HoverCard
    trigger={<span className="font-medium text-primary underline-offset-4 hover:underline">@ava.chen</span>}
    triggerClassName="rounded-sm"
  >
    <div className="flex gap-3">
      <Avatar size="md" fallback="AC" />
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold text-foreground">Ava Chen</p>
        <p className="text-sm text-secondary">Design lead on the Payments team. Owns the checkout flow.</p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays size={12} /> Joined March 2022
        </p>
      </div>
    </div>
  </HoverCard>{" "}
  two hours ago.
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="text-sm text-secondary">
                  Reviewed by{" "}
                  <HoverCard
                    trigger={<span className="font-medium text-primary underline-offset-4 hover:underline">@ava.chen</span>}
                    triggerClassName="rounded-sm"
                  >
                    <div className="flex gap-3">
                      <Avatar size="md" fallback="AC" />
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm font-semibold text-foreground">Ava Chen</p>
                        <p className="text-sm text-secondary">Design lead on the Payments team. Owns the checkout flow.</p>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays size={12} /> Joined March 2022
                        </p>
                      </div>
                    </div>
                  </HoverCard>{" "}
                  two hours ago.
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Placement, Delays and Disabled */}
        <section aria-labelledby="HoverCard-example-1">
          <h2
            id="HoverCard-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Placement, Delays and Disabled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            side picks the preferred side and align the edge along it. Top and bottom flip automatically near the viewport edge. openDelay and closeDelay are in milliseconds.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<HoverCard side="top" trigger={<Button size="xs" variant="outline">Top</Button>}>
  <p className="text-sm text-secondary">Opens above the trigger.</p>
</HoverCard>
<HoverCard side="right" align="start" trigger={<Button size="xs" variant="outline">Right / start</Button>}>
  <p className="text-sm text-secondary">Opens to the right, aligned to the top edge.</p>
</HoverCard>
<HoverCard side="bottom" align="end" trigger={<Button size="xs" variant="outline">Bottom / end</Button>}>
  <p className="text-sm text-secondary">Opens below, aligned to the right edge.</p>
</HoverCard>
<HoverCard openDelay={0} closeDelay={0} trigger={<Button size="xs" variant="outline">No delay</Button>}>
  <p className="text-sm text-secondary">openDelay and closeDelay set to 0.</p>
</HoverCard>
<HoverCard disabled trigger={<Button size="xs" variant="outline">Disabled</Button>}>
  <p className="text-sm text-secondary">Never opens.</p>
</HoverCard>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <HoverCard side="top" trigger={<Button size="xs" variant="outline">Top</Button>}>
                  <p className="text-sm text-secondary">Opens above the trigger.</p>
                </HoverCard>
                <HoverCard side="right" align="start" trigger={<Button size="xs" variant="outline">Right / start</Button>}>
                  <p className="text-sm text-secondary">Opens to the right, aligned to the top edge.</p>
                </HoverCard>
                <HoverCard side="bottom" align="end" trigger={<Button size="xs" variant="outline">Bottom / end</Button>}>
                  <p className="text-sm text-secondary">Opens below, aligned to the right edge.</p>
                </HoverCard>
                <HoverCard openDelay={0} closeDelay={0} trigger={<Button size="xs" variant="outline">No delay</Button>}>
                  <p className="text-sm text-secondary">openDelay and closeDelay set to 0.</p>
                </HoverCard>
                <HoverCard disabled trigger={<Button size="xs" variant="outline">Disabled</Button>}>
                  <p className="text-sm text-secondary">Never opens.</p>
                </HoverCard>
              </div>
            }
          />
        </section>

        {/* Example: Controlled */}
        <section aria-labelledby="HoverCard-example-2">
          <h2
            id="HoverCard-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Controlled
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass open and onOpenChange to track or drive the state. contentClassName widens the panel for denser content.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`function RepoPreviewDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <HoverCard
        open={open}
        onOpenChange={setOpen}
        side="right"
        contentClassName="w-80"
        trigger={
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            <GitBranch size={14} className="text-muted-foreground" />
            acme/checkout-service
          </span>
        }
      >
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-foreground">checkout-service</p>
            <p className="text-sm text-secondary">Handles carts, taxes and payment intents for the storefront.</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Star size={12} /> 1.2k</span>
            <span className="inline-flex items-center gap-1"><GitPullRequest size={12} /> 8 open</span>
            <Badge text="TypeScript" variant="soft" size="sm" />
          </div>
        </div>
      </HoverCard>
      <span className="text-xs text-muted-foreground">Open: {String(open)}</span>
    </div>
  );
}`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <RepoPreviewDemo />
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="HoverCard-props">
          <h2
            id="HoverCard-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the HoverCard component.
          </p>

          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th scope="col" className="text-left p-3">
                    Prop
                  </th>
                  <th scope="col" className="text-left p-3">
                    Type
                  </th>
                  <th scope="col" className="text-left p-3">
                    Default
                  </th>
                  <th scope="col" className="text-left p-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    trigger
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Element that reveals the panel on hover or focus (required).</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    content
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Panel content; takes precedence over children.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    children
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    ReactNode
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Panel content used when content is omitted.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    openDelay
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">300</td>
                  <td className="p-3">Delay before opening, in milliseconds.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    closeDelay
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">150</td>
                  <td className="p-3">Delay before closing, in milliseconds.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    side
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "top" | "bottom" | "left" | "right"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"bottom"</td>
                  <td className="p-3">Preferred side; top and bottom flip when there is no room.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    align
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    "start" | "center" | "end"
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">"center"</td>
                  <td className="p-3">Alignment of the panel along that side.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    open
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Controlled open state.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    defaultOpen
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Initial open state in uncontrolled mode.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onOpenChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (open: boolean) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Fired whenever the open state changes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">false</td>
                  <td className="p-3">Prevents the card from opening.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    className
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the root wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    style
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the root wrapper.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    triggerClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the wrapper around the trigger.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    contentClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Styles the floating panel.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    contentStyle
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    CSSProperties
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Inline styles for the panel, merged with its position.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    ...rest
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    HTMLAttributes&lt;HTMLDivElement&gt;
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">-</td>
                  <td className="p-3">Other attributes and handlers are spread on the root wrapper.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="HoverCard-a11y">
          <h2
            id="HoverCard-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>A plain trigger (text, an avatar) is wrapped in a focusable role="button" with aria-haspopup="dialog", aria-expanded and aria-controls and a visible focus ring. When the trigger is already focusable (a Button or link), the wrapper adds no extra tab stop or role.</li>
            <li>Keyboard focus opens the card immediately; moving focus out of the trigger and card closes it after closeDelay.</li>
            <li>Escape closes the card wherever focus is.</li>
            <li>Hover cards are supplementary: keep essential actions reachable elsewhere, since touch users may never see the card.</li>
            <li>The fade-in animation is disabled with reduced motion.</li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={hoverCardFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default HoverCardDocs;
