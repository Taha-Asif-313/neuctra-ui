"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import {
  Copy,
  Code as CodeIcon,
  Monitor,
  Smartphone,
  Tablet,
  Maximize,
  Layout,
} from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  theme?: string;
  previewContent: React.ReactNode;
  className?: string;
}

type Breakpoint = "mobile" | "sm" | "md" | "lg" | "full";

interface BreakpointOption {
  id: Breakpoint;
  label: string;
  icon: React.ReactNode;
}

export default function CodePreviewBlock({
  code,
  language,
  theme = "night-owl",
  previewContent,
  className,
}: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [breakpoint, setBreakpoint] = useState<
    "mobile" | "sm" | "md" | "lg" | "full"
  >("full");

  useEffect(() => {
    const highlight = async () => {
      const html = await codeToHtml(code, { lang: language, theme });
      setHighlightedCode(html);
    };
    highlight();
  }, [code, language, theme]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const breakpoints: BreakpointOption[] = [
    { id: "mobile", label: "Mobile", icon: <Smartphone size={20} /> },
    { id: "sm", label: "SM", icon: <Tablet size={20} /> },
    { id: "md", label: "MD", icon: <Monitor size={20} /> },
    { id: "lg", label: "LG", icon: <Monitor size={20} /> },
    { id: "full", label: "Full Screen", icon: <Maximize size={20} /> },
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
      className={`${
        className ?? ""
      } w-full border border-gray-900 rounded-md overflow-hidden shadow-sm bg-gray-950 text-white`}
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-3 text-sm py-4 bg-[#011627] gap-3 sm:gap-0">
        {/* Left controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-950 rounded overflow-hidden">
            <button
              className={`flex items-center gap-1 px-3 py-1 transition-colors whitespace-nowrap ${
                view === "preview"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 bg-gray-950 hover:bg-gray-800"
              }`}
              onClick={() => setView("preview")}
            >
              <Layout size={16} /> Preview
            </button>
            <button
              className={`flex items-center gap-1 px-3 py-1 transition-colors whitespace-nowrap ${
                view === "code"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 bg-gray-950 hover:bg-gray-800"
              }`}
              onClick={() => setView("code")}
            >
              <CodeIcon size={16} /> Code
            </button>
          </div>

          {/* Copy button */}
          <button
            onClick={copyCode}
            className="flex items-center gap-1 px-3 py-1 rounded text-gray-300 hover:bg-gray-800 whitespace-nowrap"
          >
            <Copy size={16} /> Copy
          </button>
        </div>

        {/* Breakpoints */}
        {view === "preview" && (
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {breakpoints.map((bp) => (
              <button
                key={bp.id}
                onClick={() => setBreakpoint(bp.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  breakpoint === bp.id
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
                title={bp.label}
              >
                {bp.icon}
                {/* Hide label on very small screens to save space */}
                <span className="hidden xs:inline">{bp.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex justify-center bg-[#011627] p-4 overflow-x-auto">
        <div
          className={`w-full ${
            view === "code" ? "max-w-full" : breakpointClasses[breakpoint]
          }`}
        >
          {view === "preview" && (
            <div className="border border-gray-700 overflow-y-auto bg-gray-950 rounded-lg shadow p-4">
              {previewContent}
            </div>
          )}
          {view === "code" && highlightedCode && (
            <div
              className="rounded-md p-5 custom-scrollbar overflow-auto font-mono text-xs sm:text-sm bg-[#011627] text-white border border-gray-700 whitespace-pre"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
          {view === "code" && !highlightedCode && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}
