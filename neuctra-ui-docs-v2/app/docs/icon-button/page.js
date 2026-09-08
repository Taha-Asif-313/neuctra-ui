"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import { IconButton } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { Check, X, Heart, Trash2, Settings, Plus, Search } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const iconButtonFaq = buildComponentFaq("IconButton", {
  variants: [
    "default",
    "soft",
    "outline",
    "ghost",
    "secondary",
    "destructive",
    "success",
    "warning",
    "info",
    "link",
  ],
  sizes: ["xs", "sm", "md", "lg", "xl"],
});

const IconButtonDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Icon Button Component
          </h1>

          <p className="text-sm leading-relaxed">
            The{" "}
            <span className="text-primary font-semibold">IconButton</span>{" "}
            component is a compact, icon-only button built for toolbars,
            tables, cards, and dashboard actions. It shares the same
            variant system as <code>Button</code> for visual consistency,
            while sizing the icon and touch target together so the icon
            never looks lost inside the button.
          </p>

          <p className="text-sm text-gray-300 mt-3 leading-relaxed">
            Always pass an <code>aria-label</code> since there is no
            visible text — it's the only way assistive tech can describe
            the action. Use <code>size</code> to scale the button and icon
            together, and <code>variant</code> to match the surrounding UI.
          </p>
        </header>

        {/* Import */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            Import Component From Library
          </h2>
          <CodeBlock code={`import { IconButton } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Usage Code
          </h2>
          <p className="text-gray-300 mb-4">
            Pass any icon as the <code>icon</code> prop and always provide
            an <code>aria-label</code> describing the action.
          </p>
          <CodeBlock
            tabs={[
              {
                name: "JavaScript",
                language: "jsx",
                code: `import { IconButton } from '@neuctra/ui';
import { Heart } from 'lucide-react';

function BasicExample() {
  return (
    <IconButton
      icon={<Heart />}
      aria-label="Like"
      onClick={() => console.log('Liked')}
    />
  );
}`,
              },
              {
                name: "TypeScript",
                language: "tsx",
                code: `import { IconButton } from '@neuctra/ui';
import { Heart } from 'lucide-react';

function BasicExample(): JSX.Element {
  return (
    <IconButton
      icon={<Heart />}
      aria-label="Like"
      onClick={() => console.log('Liked')}
    />
  );
}`,
              },
            ]}
          />
        </section>

        {/* Basic Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<IconButton icon={<Heart size={16} />} aria-label="Like" />`}
            previewContent={
              <IconButton
                icon={<Heart size={16} />}
                aria-label="Like"
                onClick={() => alert("Liked!")}
              />
            }
          />
        </section>

        {/* Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Variants
          </h2>
          <p className="text-gray-300 mb-4">
            Ten variants cover brand, neutral, and semantic (status)
            actions — the same set used by <code>Button</code>.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<IconButton variant="default" icon={<Settings size={16} />} aria-label="Settings" />
<IconButton variant="soft" icon={<Settings size={16} />} aria-label="Settings" />
<IconButton variant="outline" icon={<Settings size={16} />} aria-label="Settings" />
<IconButton variant="ghost" icon={<Settings size={16} />} aria-label="Settings" />
<IconButton variant="secondary" icon={<Settings size={16} />} aria-label="Settings" />
<IconButton variant="destructive" icon={<Trash2 size={16} />} aria-label="Delete" />
<IconButton variant="success" icon={<Check size={16} />} aria-label="Confirm" />
<IconButton variant="warning" icon={<Settings size={16} />} aria-label="Settings" />
<IconButton variant="info" icon={<Search size={16} />} aria-label="Search" />
<IconButton variant="link" icon={<Plus size={16} />} aria-label="Add" />`}
            previewContent={
              <div className="flex flex-wrap gap-2">
                <IconButton
                  variant="default"
                  icon={<Settings size={16} />}
                  aria-label="Settings"
                />
                <IconButton
                  variant="soft"
                  icon={<Settings size={16} />}
                  aria-label="Settings"
                />
                <IconButton
                  variant="outline"
                  icon={<Settings size={16} />}
                  aria-label="Settings"
                />
                <IconButton
                  variant="ghost"
                  icon={<Settings size={16} />}
                  aria-label="Settings"
                />
                <IconButton
                  variant="secondary"
                  icon={<Settings size={16} />}
                  aria-label="Settings"
                />
                <IconButton
                  variant="destructive"
                  icon={<Trash2 size={16} />}
                  aria-label="Delete"
                />
                <IconButton
                  variant="success"
                  icon={<Check size={16} />}
                  aria-label="Confirm"
                />
                <IconButton
                  variant="warning"
                  icon={<Settings size={16} />}
                  aria-label="Settings"
                />
                <IconButton
                  variant="info"
                  icon={<Search size={16} />}
                  aria-label="Search"
                />
                <IconButton
                  variant="link"
                  icon={<Plus size={16} />}
                  aria-label="Add"
                />
              </div>
            }
          />
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Sizes</h2>
          <p className="text-gray-300 mb-4">
            Five sizes scale both the button footprint and the icon
            together — no need to size the icon separately.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<IconButton size="xs" icon={<Heart />} aria-label="Like" />
<IconButton size="sm" icon={<Heart />} aria-label="Like" />
<IconButton size="md" icon={<Heart />} aria-label="Like" />
<IconButton size="lg" icon={<Heart />} aria-label="Like" />
<IconButton size="xl" icon={<Heart />} aria-label="Like" />`}
            previewContent={
              <>
                <IconButton size="xs" icon={<Heart />} aria-label="Like" />
                <IconButton size="sm" icon={<Heart />} aria-label="Like" />
                <IconButton size="md" icon={<Heart />} aria-label="Like" />
                <IconButton size="lg" icon={<Heart />} aria-label="Like" />
                <IconButton size="xl" icon={<Heart />} aria-label="Like" />
              </>
            }
          />
        </section>

        {/* Disabled */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Disabled State
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="destructive" disabled />`}
            previewContent={
              <IconButton
                icon={<Trash2 size={16} />}
                aria-label="Delete"
                variant="destructive"
                disabled
              />
            }
          />
        </section>

        {/* Props Table */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Props Table
          </h2>
          <p className="text-gray-400 mb-3">
            All available props for the IconButton component.
          </p>

          <div className="border border-zinc-800 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-zinc-900 text-gray-200">
                <tr>
                  <th className="text-left p-3">Prop</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Default</th>
                  <th className="text-left p-3">Description</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800 text-gray-300">
                <tr>
                  <td className="p-3">icon</td>
                  <td className="p-3">React.ReactNode</td>
                  <td className="p-3">—</td>
                  <td className="p-3">
                    The icon displayed inside the button. Required.
                  </td>
                </tr>

                <tr>
                  <td className="p-3">variant</td>
                  <td className="p-3 font-mono text-xs">
                    "default" | "soft" | "outline" | "ghost" | "secondary" |
                    "destructive" | "success" | "warning" | "info" | "link"
                  </td>
                  <td className="p-3">"default"</td>
                  <td className="p-3">
                    Controls the visual style of the button.
                  </td>
                </tr>

                <tr>
                  <td className="p-3">size</td>
                  <td className="p-3">"xs" | "sm" | "md" | "lg" | "xl"</td>
                  <td className="p-3">"sm"</td>
                  <td className="p-3">
                    Controls the button footprint and the icon size
                    together.
                  </td>
                </tr>

                <tr>
                  <td className="p-3">aria-label</td>
                  <td className="p-3">string</td>
                  <td className="p-3">—</td>
                  <td className="p-3">
                    Accessible label describing the action. Required since
                    the button has no visible text.
                  </td>
                </tr>

                <tr>
                  <td className="p-3">disabled</td>
                  <td className="p-3">boolean</td>
                  <td className="p-3">false</td>
                  <td className="p-3">Disables the button.</td>
                </tr>

                <tr>
                  <td className="p-3">className</td>
                  <td className="p-3">string</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Root button classes.</td>
                </tr>

                <tr>
                  <td className="p-3">iconClassName</td>
                  <td className="p-3">string</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Classes for the icon wrapper.</td>
                </tr>

                <tr>
                  <td className="p-3">iconStyle</td>
                  <td className="p-3">React.CSSProperties</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Inline styles for the icon wrapper.</td>
                </tr>

                <tr>
                  <td className="p-3">...rest</td>
                  <td className="p-3">
                    React.ButtonHTMLAttributes&lt;HTMLButtonElement&gt;
                  </td>
                  <td className="p-3">—</td>
                  <td className="p-3">
                    Native button props like onClick, type, disabled.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Mistakes */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Common Mistakes
          </h2>

          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start gap-2 text-red-500">
              <X size={16} className="mt-1" />
              <div>
                <code>{'<IconButton icon={<Heart />} />'}</code>
                <p className="text-gray-400 text-xs mt-1">
                  Missing aria-label — screen readers can't describe an
                  icon-only button without it.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-red-500">
              <X size={16} className="mt-1" />
              <div>
                <code>{'<IconButton icon={<Heart />}>Like</IconButton>'}</code>
                <p className="text-gray-400 text-xs mt-1">
                  IconButton doesn't render children — use aria-label for
                  the accessible name, and Button if you need visible text.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-red-500">
              <X size={16} className="mt-1" />
              <div>
                <code>{'<IconButton size="20px" icon={<Heart />} aria-label="Like" />'}</code>
                <p className="text-gray-400 text-xs mt-1">
                  Only predefined sizes are allowed: xs, sm, md, lg, xl
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-green-500">
              <Check size={16} className="mt-1" />
              <div>
                <code>
                  {'<IconButton icon={<Heart />} aria-label="Like" />'}
                </code>
                <p className="text-gray-400 text-xs mt-1">
                  Always pair the icon with a descriptive aria-label.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">Pro Tips</h2>

          <div className="text-gray-300 space-y-3">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Always set <code>aria-label</code> — it's the only
                accessible name an icon-only button has.
              </li>

              <li>
                Pass icons unsized (e.g. <code>{"<Heart />"}</code>) and let{" "}
                <code>size</code> control the icon dimensions consistently.
              </li>

              <li>
                Use <code>ghost</code> or <code>soft</code> variants for
                toolbar and table row actions, and <code>destructive</code>{" "}
                for delete/remove actions.
              </li>

              <li>
                Match <code>size</code> with nearby inputs or buttons to
                keep the row's touch targets visually aligned.
              </li>

              <li>
                Use <code>iconClassName</code> / <code>iconStyle</code> only
                for fine-tuning icon rendering — prefer{" "}
                <code>className</code> for layout and spacing.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={iconButtonFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default IconButtonDocs;
