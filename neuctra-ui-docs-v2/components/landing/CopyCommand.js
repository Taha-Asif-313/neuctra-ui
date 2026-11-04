"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export default function CopyCommand({ command, className = "" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`flex min-w-0 items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-4 pr-1.5 ${className}`}
    >
      <Terminal size={15} aria-hidden="true" className="shrink-0 text-primary" />
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-left font-mono text-xs text-secondary sm:text-sm">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Command copied" : "Copy setup command"}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check size={15} className="text-primary" /> : <Copy size={15} />}
      </button>
    </div>
  );
}
