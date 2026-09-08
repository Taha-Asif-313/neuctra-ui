"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import { PinInput } from "@neuctra/ui";
import CodeBlock from "@/components/CodeBlock";
import { Accessibility } from "lucide-react";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

// Recomputed locally rather than imported from ./layout.js: layout.js is a
// Server Component module and this page.js is a Client Component — pulling
// a value across that boundary via import would drag the whole server
// module (including its default export) into the client bundle. Both files
// call the same pure function with the same args, so they stay in sync.
const pinInputFaq = buildComponentFaq("PinInput", {
  sizes: ["sm", "md", "lg"],
});

const OtpDemo = () => {
  const [done, setDone] = useState("");
  return (
    <div className="flex flex-col items-start gap-2">
      <PinInput length={6} onComplete={setDone} />
      <span className="text-xs text-gray-400">
        {done ? `Completed: ${done}` : "Fill all six boxes (paste works too)"}
      </span>
    </div>
  );
};

const PinInputDocs = () => {
  return (
    <article className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            PinInput Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            React PIN / OTP input with auto-advance, smart Backspace,
            full-code paste, numeric or alphanumeric modes, masking and
            one-time-code autofill.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="PinInput-import">
          <h2
            id="PinInput-import"
            className="text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            Import
          </h2>
          <CodeBlock code={`import { PinInput } from "@neuctra/ui";`} />
        </section>

        {/* Basic Usage */}
        <section aria-labelledby="PinInput-example-0">
          <h2
            id="PinInput-example-0"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Typing auto-advances; Backspace clears and steps back; pasting
            distributes the whole code.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<PinInput length={6} onComplete={(code) => verify(code)} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <OtpDemo />
              </div>
            }
          />
        </section>

        {/* Masked & Alphanumeric */}
        <section aria-labelledby="PinInput-example-1">
          <h2
            id="PinInput-example-1"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Masked & Alphanumeric
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<PinInput length={4} mask />
<PinInput length={5} type="alphanumeric" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <PinInput length={4} mask />
                  <PinInput length={5} type="alphanumeric" />
                </div>
              </div>
            }
          />
        </section>

        {/* Sizes & Error */}
        <section aria-labelledby="PinInput-example-2">
          <h2
            id="PinInput-example-2"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Sizes & Error
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<PinInput length={4} size="sm" />
<PinInput length={4} size="lg" />
<PinInput length={4} error defaultValue="1234" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <PinInput length={4} size="sm" />
                  <PinInput length={4} size="lg" />
                  <PinInput length={4} error defaultValue="1234" />
                </div>
              </div>
            }
          />
        </section>

        {/* Props table */}
        <section aria-labelledby="PinInput-props">
          <h2
            id="PinInput-props"
            className="text-xl sm:text-2xl font-semibold mb-2 text-white"
          >
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the PinInput component.
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
                    length
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    number
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">4</td>
                  <td className="p-3">Number of character boxes</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    value / defaultValue
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    &quot;&quot;
                  </td>
                  <td className="p-3">Controlled / uncontrolled code</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onChange
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (value: string) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired on every keystroke</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    onComplete
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    (value: string) =&gt; void
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Fired once all boxes are filled</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    type
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    &quot;numeric&quot; | &quot;alphanumeric&quot;
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    &quot;numeric&quot;
                  </td>
                  <td className="p-3">
                    Accepted characters (sets the mobile keyboard too)
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    mask
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Render dots instead of characters</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    size
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    &quot;md&quot;
                  </td>
                  <td className="p-3">Box size</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    error
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Destructive border state</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    autoFocus
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Focus the first box on mount</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    disabled
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    boolean
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    false
                  </td>
                  <td className="p-3">Lock all boxes</td>
                </tr>

                <tr>
                  <td className="p-3 font-medium text-primary whitespace-nowrap">
                    boxClassName
                  </td>
                  <td className="p-3 font-mono text-xs text-gray-300">
                    string
                  </td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">—</td>
                  <td className="p-3">Styles each individual character box.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="PinInput-a11y">
          <h2
            id="PinInput-a11y"
            className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white"
          >
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              Each box has an aria-label (&quot;Character 2 of 6&quot;) inside
              a labelled group.
            </li>
            <li>
              The first box sets autocomplete=&quot;one-time-code&quot; so
              iOS/Android offer SMS autofill.
            </li>
            <li>
              Arrow keys move between boxes; focus selects the existing
              character for easy overwrite.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <ComponentFaq qa={pinInputFaq} />

        {/* Footer */}
        <DocsFooter />
      </div>
    </article>
  );
};

export default PinInputDocs;
