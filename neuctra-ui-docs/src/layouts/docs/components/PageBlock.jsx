"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Copy,
  Check,
  Eye,
  FileCode,
  Globe,
  FileText,
  ExternalLink,
  Maximize2,
  Minimize2,
} from "lucide-react";

const PageBlock = ({
  title,
  description,
  url,
  preview = null,
  code = "",
  language = "html",
  showCode = true,
  showPreview = true,
  defaultView = "preview",
  className = "",
  height = "400px",
  expandable = false,
}) => {
  const [view, setView] = useState(defaultView);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyCode = async () => {
    if (view !== "code") return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code.trim());
      } else {
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

  const openInNewTab = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`
        border border-zinc-800
        bg-zinc-900 text-white
        rounded-xl shadow-lg
        relative overflow-hidden
        transition-all duration-300
        hover:border-zinc-700
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Page Icon */}
          <div className="flex items-center gap-2">
            {url ? (
              <Globe className="w-5 h-5 text-blue-400" />
            ) : (
              <FileText className="w-5 h-5 text-zinc-400" />
            )}
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{title}</h3>
            {description && (
              <p className="text-xs text-zinc-400 truncate">{description}</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* External Link */}
          {url && (
            <button
              onClick={openInNewTab}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={14} />
            </button>
          )}

          {/* Expand/Collapse */}
          {expandable && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}

          {/* View Tabs */}
          {(showPreview && showCode) && (
            <div className="flex rounded-md overflow-hidden border border-zinc-800">
              {showPreview && (
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
              )}

              {showCode && (
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
              )}
            </div>
          )}

          {/* Copy Button */}
          {showCode && (
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
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`
          relative bg-zinc-950 text-zinc-200
          ${isExpanded ? "min-h-[600px]" : ""}
          transition-all duration-300
        `}
        style={!isExpanded ? { height } : {}}
      >
        {view === "preview" ? (
          <div className="h-full overflow-auto">
            {preview ? (
              <div className="p-4 h-full">
                {preview}
              </div>
            ) : url ? (
              <iframe
                src={url}
                className="w-full h-full border-0"
                title={title}
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500">
                <div className="text-center">
                  <FileText size={48} className="mx-auto mb-3 opacity-50" />
                  <p>🧩 No preview available</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language={language}
                style={nightOwl}
                showLineNumbers
                customStyle={{
                  background: "transparent",
                  margin: 0,
                  padding: "16px",
                  fontSize: "14px",
                  fontFamily: '"Fira Code", "Cascadia Code", "Monaco", monospace',
                  minHeight: isExpanded ? "560px" : height,
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
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBlock;
