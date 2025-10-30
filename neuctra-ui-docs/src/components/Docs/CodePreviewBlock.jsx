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
    <div className="border border-gray-800 bg-[#0d1117] rounded-xl overflow-hidden shadow-lg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2 px-3 py-2 border-b border-gray-800 bg-[#161b22]">
        {/* Left side - macOS dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Right side - tabs + copy */}
        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex rounded-md overflow-hidden border border-gray-800">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "preview"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Eye size={12} /> Preview
            </button>
            <button
              onClick={() => setView("code")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors ${
                view === "code"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <FileCode size={12} /> Code
            </button>
          </div>

          {/* Copy */}
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
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

      {/* Content Area */}
      <div className="p-4 sm:p-6 bg-zinc-950 text-gray-200 font-poppins">
        {view === "preview" ? (
          previewContent || (
            <div className="text-center text-gray-500 py-10">
              🧩 No preview available
            </div>
          )
        ) : (
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
              color: "#6B7280",
              minWidth: "2em",
              textAlign: "right",
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
