"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
// Aliased: the docs site's own CodeBlock would clash with the library component.
import DocsCodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { CodeBlock } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const codeBlockFaq = buildComponentFaq("CodeBlock", { sizes: ["sm", "md"] });

const fetchUser = `import { createClient } from "@acme/sdk";

const client = createClient({ apiKey: process.env.ACME_KEY });

export async function getUser(id) {
  // Retries twice on network errors
  const user = await client.users.get(id, { retries: 2 });
  return user ?? null;
}`;

const installTabs = [
  { label: "npm", code: "npm install @neuctra/ui", language: "bash" },
  { label: "pnpm", code: "pnpm add @neuctra/ui", language: "bash" },
  { label: "yarn", code: "yarn add @neuctra/ui", language: "bash" },
];

function ControlledTabsDemo() {
  const [tab, setTab] = useState(1);
  return (
    <div className="w-full max-w-xl space-y-3">
      <CodeBlock code="" tabs={installTabs} activeTab={tab} onTabChange={setTab} />
      <p className="text-xs text-muted-foreground">
        Package manager: {installTabs[tab].label}
      </p>
    </div>
  );
}

function PropsTable({ rows }) {
  return (
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
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const codeBlockProps = [
  ["code", "string", "-", "Source code to display (required; used when no tabs are given)."],
  ["language", "string", '"text"', "Language label in the header. bash, python and yaml also color # comments."],
  ["filename", "string", "-", "Filename shown in the header instead of the language."],
  ["showLineNumbers", "boolean", "false", "Shows a line number gutter."],
  ["highlightLines", "number[]", "-", "1-based line numbers to highlight."],
  ["copyable", "boolean", "true", "Shows a copy button in the header."],
  ["wrap", "boolean", "false", "Wraps long lines instead of scrolling horizontally."],
  ["maxHeight", "number | string", "-", "Caps the code area height; longer code scrolls."],
  ["size", '"sm" | "md"', '"sm"', "Code text size preset."],
  ["tabs", "CodeBlockTab[]", "-", "Labelled variants ({ label, code, language? }) shown as tabs."],
  ["activeTab", "number", "-", "Controlled active tab index."],
  ["defaultTab", "number", "0", "Initial active tab in uncontrolled mode."],
  ["onTabChange", "(index: number) => void", "-", "Fired when the active tab changes."],
  ["className", "string", "-", "Styles the root card."],
  ["style", "CSSProperties", "-", "Inline styles for the root card."],
  ["headerClassName", "string", "-", "Styles the header bar."],
  ["preClassName", "string", "-", "Styles the scrollable pre element."],
  ["lineClassName", "string", "-", "Styles every code line."],
  ["lineNumberClassName", "string", "-", "Styles the line number cells."],
  ["...rest", "HTMLAttributes<HTMLDivElement>", "-", "Any other div attribute, forwarded to the root."],
];

const CodeBlockDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            CodeBlock Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A dependency-free code snippet with lightweight token coloring from
            your theme, line numbers, highlighted lines, tabs, a copy button and
            filename headers.
          </p>
        </header>

        <section aria-labelledby="CodeBlock-import">
          <h2 id="CodeBlock-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <DocsCodeBlock code={`import { CodeBlock } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="CodeBlock-example-0">
          <h2 id="CodeBlock-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Strings, keywords, numbers and comments are colored with semantic
            tokens. The header shows the language and a copy button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const fetchUser = \`import { createClient } from "@acme/sdk";

const client = createClient({ apiKey: process.env.ACME_KEY });

export async function getUser(id) {
  // Retries twice on network errors
  const user = await client.users.get(id, { retries: 2 });
  return user ?? null;
}\`;

<CodeBlock code={fetchUser} language="js" />`}
            previewContent={
              <div className="w-full max-w-2xl py-4">
                <CodeBlock code={fetchUser} language="js" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="CodeBlock-example-1">
          <h2 id="CodeBlock-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Filename, Line Numbers and Highlights
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Point readers at the lines that matter in a tutorial or changelog.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<CodeBlock
  code={fetchUser}
  language="js"
  filename="lib/users.js"
  showLineNumbers
  highlightLines={[6, 7]}
/>`}
            previewContent={
              <div className="w-full max-w-2xl py-4">
                <CodeBlock
                  code={fetchUser}
                  language="js"
                  filename="lib/users.js"
                  showLineNumbers
                  highlightLines={[6, 7]}
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="CodeBlock-example-2">
          <h2 id="CodeBlock-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Tabs
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Show the same step in several variants. The tabs follow the WAI-ARIA
            tabs pattern with arrow key navigation.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const installTabs = [
  { label: "npm", code: "npm install @neuctra/ui", language: "bash" },
  { label: "pnpm", code: "pnpm add @neuctra/ui", language: "bash" },
  { label: "yarn", code: "yarn add @neuctra/ui", language: "bash" },
];

<CodeBlock code="" tabs={installTabs} />`}
            previewContent={
              <div className="w-full max-w-xl py-4">
                <CodeBlock code="" tabs={installTabs} />
              </div>
            }
          />
        </section>

        <section aria-labelledby="CodeBlock-example-3">
          <h2 id="CodeBlock-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled Tabs
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Keep the selected package manager in state, for example to sync it
            across every snippet on the page.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [tab, setTab] = useState(1);

<div className="w-full max-w-xl space-y-3">
  <CodeBlock code="" tabs={installTabs} activeTab={tab} onTabChange={setTab} />
  <p className="text-xs text-muted-foreground">
    Package manager: {installTabs[tab].label}
  </p>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledTabsDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="CodeBlock-example-4">
          <h2 id="CodeBlock-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Wrapping, Height and Size
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            wrap breaks long lines, maxHeight caps tall snippets, and size="md"
            uses a larger font. Set copyable to false to hide the copy button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<CodeBlock
  language="bash"
  size="md"
  wrap
  maxHeight={160}
  copyable={false}
  code={\`# Deploy the web app to production with a canary rollout
neuctra deploy --project web-dashboard --env production --strategy canary --canary-percent 10 --wait
neuctra logs --project web-dashboard --follow\`}
/>`}
            previewContent={
              <div className="w-full max-w-xl py-4">
                <CodeBlock
                  language="bash"
                  size="md"
                  wrap
                  maxHeight={160}
                  copyable={false}
                  code={`# Deploy the web app to production with a canary rollout
neuctra deploy --project web-dashboard --env production --strategy canary --canary-percent 10 --wait
neuctra logs --project web-dashboard --follow`}
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="CodeBlock-props">
          <h2 id="CodeBlock-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the CodeBlock component.</p>
          <PropsTable rows={codeBlockProps} />
        </section>

        <section aria-labelledby="CodeBlock-a11y">
          <h2 id="CodeBlock-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>The root is a labelled region ("lib/users.js code" or "Code block").</li>
            <li>
              Tabs use role="tablist", "tab" and "tabpanel" with aria-selected.
              Arrow Left / Right, Home and End move between tabs (roving tabindex).
            </li>
            <li>The scrollable code area is focusable, so keyboard users can scroll it, and shows a focus ring.</li>
            <li>Line numbers are aria-hidden and not selectable, so copying text skips them.</li>
            <li>The copy button has an accessible label, "Copy code".</li>
          </ul>
        </section>

        <ComponentFaq qa={codeBlockFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default CodeBlockDocs;
