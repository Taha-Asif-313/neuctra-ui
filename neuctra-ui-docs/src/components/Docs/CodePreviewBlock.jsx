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
    if (view !== "code") return; // prevent copying in preview mode

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code.trim());
      } else {
        // fallback for older browsers / non-https
        const textarea = document.createElement("textarea");
        textarea.value = code.trim();
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
      setCopied(false);
    }
  };

  return (
    <div
      className="
        border border-zinc-800
        bg-zinc-900 text-white
        rounded-xl shadow-lg
        relative overflow-visible
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center justify-between px-3 py-2
          rounded-t-xl
          border-b border-zinc-800
          bg-zinc-900
          max-md:flex-col max-md:items-start max-md:gap-2
        "
      >
        {/* macOS Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tabs */}
          <div className="flex rounded-md overflow-hidden border border-zinc-800">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition ${
                view === "preview"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              <Eye size={12} /> Preview
            </button>

            <button
              onClick={() => setView("code")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition ${
                view === "code"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              <FileCode size={12} /> Code
            </button>
          </div>

          {/* Copy */}
          <button
            onClick={copyCode}
            disabled={view !== "code"}
            className={`
    flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium
    rounded-md transition
    ${
      view !== "code"
        ? "text-zinc-600 cursor-not-allowed"
        : "text-zinc-200 hover:text-white hover:bg-zinc-800"
    }
  `}
          >
            {copied ? (
              <>
                <Check size={12} className="text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-zinc-950 text-zinc-200 font-poppins rounded-b-xl">
        {view === "preview" ? (
          <div className="p-4">
            {previewContent || (
              <div className="text-center text-zinc-500 py-10">
                🧩 No preview available
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md bg-black border border-zinc-800">
            <SyntaxHighlighter
              language={language}
              style={nightOwl}
              showLineNumbers
              customStyle={{
                background: "transparent",
                margin: 0,
                padding: "16px",
                fontSize: "16px",
                fontFamily: '"Fira Code", "Cascadia Code", "Monaco", monospace',
              }}
              lineNumberStyle={{
                color: "#9CA3AF",
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
