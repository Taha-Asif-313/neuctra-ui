"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Copy,
  Check,
  Eye,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  Maximize,
  FileCode,
} from "lucide-react";

export default function CodePreviewBlock({
  code = "",
  language = "javascript",
  previewContent = null,
  showLineNumbers = true,
  className = "",
}) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("preview"); // "preview" | "code"
  const [breakpoint, setBreakpoint] = useState("full"); // "mobile" | "sm" | "md" | "lg" | "full"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("❌ Copy failed:", err);
    }
  };

  const breakpoints = [
    { id: "mobile", label: "Mobile", icon: <Smartphone size={16} /> },
    { id: "sm", label: "SM", icon: <Tablet size={16} /> },
    { id: "md", label: "MD", icon: <Monitor size={16} /> },
    { id: "lg", label: "LG", icon: <Monitor size={16} /> },
    { id: "full", label: "Full", icon: <Maximize size={16} /> },
  ];

  const breakpointClasses = {
    mobile: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "max-w-full",
  };

  return (
    <div
      className={`rounded-xl overflow-hidden bg-gray-900/70 backdrop-blur-sm border border-gray-800 shadow-md text-white ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950 px-3 py-3 sm:py-2 gap-3 sm:gap-0">
        {/* Left controls */}
        <div className="flex items-center gap-3">
          {/* macOS window dots */}
          <div className="flex gap-1.5 px-3 py-1.5 rounded-md border border-gray-800 bg-gray-950">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Tabs: Preview / Code */}
          <div className="flex rounded-md overflow-hidden border border-gray-800">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors ${
                view === "preview"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-950 text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Eye size={14} /> Preview
            </button>
            <button
              onClick={() => setView("code")}
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors ${
                view === "code"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-950 text-gray-400 hover:bg-gray-800"
              }`}
            >
              <FileCode size={14} /> Code
            </button>
          </div>

          {/* Copy */}
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Breakpoint controls */}
        {view === "preview" && (
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {breakpoints.map((bp) => (
              <button
                key={bp.id}
                onClick={() => setBreakpoint(bp.id)}
                className={`flex items-center gap-1 px-2 py-1.5 text-xs rounded-md transition-colors ${
                  breakpoint === bp.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {bp.icon}
                <span className="hidden xs:inline">{bp.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="bg-[#0b1120] p-4 sm:p-6 overflow-x-auto flex justify-center">
        <div
          className={`w-full transition-all duration-300 ${
            view === "code" ? "max-w-full" : breakpointClasses[breakpoint]
          }`}
        >
          {/* PREVIEW */}
          {view === "preview" && (
            <div className="border border-gray-800 rounded-lg bg-gray-950 overflow-hidden shadow-inner p-4">
              {previewContent || (
                <div className="text-gray-500 text-center py-8 text-sm">
                  🧩 No preview available
                </div>
              )}
            </div>
          )}

          {/* CODE */}
          {view === "code" && (
            <div className="relative rounded-lg border border-gray-800 overflow-hidden">
              <SyntaxHighlighter
                language={language}
                style={nightOwl}
                showLineNumbers={showLineNumbers}
                wrapLines
                customStyle={{
                  margin: 0,
                  padding: "20px",
                  background: "transparent",
                  fontSize: "14px",
                  fontFamily:
                    '"Fira Code", "Cascadia Code", "Monaco", monospace',
                }}
                lineNumberStyle={{
                  minWidth: "2.5em",
                  textAlign: "right",
                  color: "#6B7280",
                  userSelect: "none",
                }}
              >
                {code.trim()}
              </SyntaxHighlighter>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-gray-900/20 opacity-30"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
