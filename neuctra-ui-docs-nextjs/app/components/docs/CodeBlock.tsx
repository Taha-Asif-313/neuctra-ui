"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { Copy, CopyCheck } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  theme?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language,
  theme = "night-owl",
  className,
}: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const highlight = async () => {
      const html = await codeToHtml(code, { lang: language, theme });
      setHighlightedCode(html);
    };
    highlight();
  }, [code, language, theme]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`${
        className ?? ""
      } relative w-full rounded-md overflow-hidden bg-[#011627] text-white font-mono text-sm shadow-sm`}
    >
      {/* Flex container to align button and code block */}
      <div className="flex flex-col sm:flex-row sm:items-start">
       

        {/* Code block */}
        <pre
          className="overflow-auto px-4 max-sm:px-2 py-5 flex-1"
          dangerouslySetInnerHTML={{ __html: highlightedCode ?? "Loading..." }}
        />
         {/* Copy button - inline on mobile, absolute on sm+ */}
        <button
          onClick={copyCode}
          aria-label="Copy code"
          type="button"
          className={`
            mb-3 sm:mb-0 sm:absolute sm:top-3 sm:right-4
            flex items-center justify-center gap-1 h-8 rounded
            text-gray-300 hover:text-white hover:bg-gray-800 transition-colors select-none
            w-full sm:w-auto
          `}
        >
          {copied ? <CopyCheck size={20} /> : <Copy size={20} />}
          {/* Optional label on mobile */}
          <span className="sm:hidden ml-2 text-sm">Copy</span>
        </button>
      </div>
    </div>
  );
}
