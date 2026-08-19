"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { CopyButton, Kbd } from "@neuctra/ui";

const CopyButtonDocs = () => (
  <ComponentDocPage
    name="CopyButton"
    title="CopyButton Component — React Copy to Clipboard | Neuctra UI"
    description="React copy-to-clipboard button with success feedback, secure-context fallback, sizes and label support — built with Tailwind CSS."
    keywords="react copy button, copy to clipboard component, clipboard react, copy code button, neuctra ui copy button"
    importCode={`import { CopyButton } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        description: "Click to copy; the icon flips to a check for 1.5s.",
        code: `<CopyButton value="npm install @neuctra/ui" label="Copy command" />`,
        preview: (
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5">
            <code className="text-xs text-gray-300">npm install @neuctra/ui</code>
            <CopyButton size="sm" value="npm install @neuctra/ui" />
          </div>
        ),
      },
      {
        title: "With Label & Callback",
        code: `<CopyButton
  value="https://ui.neuctra.com"
  label="Copy link"
  onCopied={(v) => console.log("copied", v)}
/>`,
        preview: (
          <CopyButton value="https://ui.neuctra.com" label="Copy link" />
        ),
      },
    ]}
    propsTable={[
      { prop: "value", type: "string", default: "—", description: "Text placed on the clipboard (required)" },
      { prop: "label", type: "ReactNode", default: "—", description: 'Visible label; becomes "Copied" during feedback' },
      { prop: "feedbackDuration", type: "number", default: "1500", description: "How long the check state shows (ms)" },
      { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Button scale" },
      { prop: "onCopied", type: "(value: string) => void", default: "—", description: "Fired after a successful copy" },
      { prop: "iconClassName", type: "string", default: "—", description: "Styles the copy/check icon." },
      { prop: "labelClassName", type: "string", default: "—", description: "Styles the visible label text." },
    ]}
    a11y={[
      "aria-label switches between “Copy to clipboard” and “Copied”, with aria-live so the change is announced.",
      "Falls back to a hidden textarea + execCommand outside secure contexts.",
      "The feedback timer is cleaned up on unmount.",
    ]}
  />
);

export default CopyButtonDocs;
