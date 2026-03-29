"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Eye, FileCode } from "lucide-react";

export default function CodePreviewBlock({
  code = "",
  language = "javascript",
  previewContent = null,
}) {
  const [view, setView] = useState("preview");
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="
        border border-zinc-800 bg-zinc-900 rounded-xl shadow-lg
        relative overflow-visible
      "
    >
      {/* Terminal Header */}
      <div
        className="
          flex items-center justify-between px-3 py-2
          rounded-t-xl
          border-b border-zinc-800 bg-zinc-900
          max-md:flex-col max-md:items-start max-md:gap-2
        "
      >
        {/* macOS Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Tabs + Copy */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tabs */}
          <div className="flex rounded-md overflow-hidden border border-zinc-800">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "preview"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              <Eye size={12} /> Preview
            </button>
            <button
              onClick={() => setView("code")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "code"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              <FileCode size={12} /> Code
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyCode}
            className="
              flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium
              text-zinc-400 hover:text-white hover:bg-zinc-800
              rounded-md transition-colors
            "
          >
            {copied ? (
              <>
                <Check size={12} className="text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="
          relative bg-zinc-950 text-zinc-200 font-poppins
          p-4 sm:p-6 overflow-visible rounded-b-xl
        "
      >
        {view === "preview" ? (
          <div className="relative z-10">
            {previewContent || (
              <div className="text-center text-zinc-500 py-10">
                🧩 No preview available
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md">
            <SyntaxHighlighter
              language={language}
              style={nightOwl}
              showLineNumbers
              customStyle={{
                background: "transparent",
                margin: 0,
                padding: "16px",
                fontSize: "16px",
                fontFamily:
                  '"Fira Code", "Cascadia Code", "Monaco", monospace',
              }}
              lineNumberStyle={{
                color: "#6B7280",
                minWidth: "2em",
                textAlign: "right",
              }}
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}
