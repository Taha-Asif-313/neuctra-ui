import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Copy,
  Check,
  FileCode,
  Eye,
  EyeOff,
  FileJson,
  Braces,
  Boxes,
  Cpu,
  Globe,
  Code2,
  FileCode2,
  Palette,
  TerminalSquare,
} from "lucide-react";
import { LiveProvider, LivePreview, LiveError } from "react-live";

/**
 * 💻 CodeBlock with Live React Preview
 * Supports:
 * - Syntax Highlighting
 * - Copy Button
 * - Tabs
 * - Live Preview for React (JSX/TSX)
 */
const CodeBlock = ({
  code = "",
  language = "javascript",
  showLineNumbers = true,
  className = "",
  tabs = null, // Array of { name, code, language }
  activeTab: externalActiveTab,
  onTabChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const activeTab =
    externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

  const setActiveTab = (index) => {
    if (onTabChange) onTabChange(index);
    else setInternalActiveTab(index);
  };

  const currentCode = tabs ? tabs[activeTab]?.code || "" : code;
  const currentLanguage = tabs ? tabs[activeTab]?.language || language : language;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentCode.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("❌ Failed to copy code:", err);
    }
  };

  const getLanguageIcon = (lang) => {
    const icons = {
      javascript: <Braces className="w-5 h-5 text-yellow-400" />,
      typescript: <Boxes className="w-5 h-5 text-sky-400" />,
      react: <Cpu className="w-5 h-5 text-cyan-400" />,
      vue: <Globe className="w-5 h-5 text-green-400" />,
      python: <Code2 className="w-5 h-5 text-blue-400" />,
      html: <FileCode2 className="w-5 h-5 text-orange-400" />,
      css: <Palette className="w-5 h-5 text-pink-400" />,
      shell: <TerminalSquare className="w-5 h-5 text-gray-300" />,
      json: <FileJson className="w-5 h-5 text-amber-300" />,
    };
    return icons[lang?.toLowerCase?.()] || (
      <FileCode className="w-5 h-5 text-gray-400" />
    );
  };

  return (
    <div
      className={`relative group rounded-xl overflow-hidden bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800/80">
        <div className="flex items-center flex-1 min-w-0">
          {/* macOS dots */}
          <div className="flex gap-1.5 px-4 py-3 border-r border-gray-800/60">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {tabs ? (
            <div className="flex space-x-1 px-2 overflow-x-auto scrollbar-none">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === index
                      ? "text-[#00c420] bg-gray-800/50"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/40"
                  }`}
                >
                  <FileCode size={14} />
                  {tab.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3">
              {getLanguageIcon(currentLanguage)}
              <span className="text-sm font-medium text-gray-400 uppercase">
                {currentLanguage}
              </span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 px-4 py-3">
          <button
            onClick={() => setShowPreview((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200"
          >
            {showPreview ? (
              <>
                <EyeOff size={14} />
                <span>Hide Preview</span>
              </>
            ) : (
              <>
                <Eye size={14} />
                <span>Preview</span>
              </>
            )}
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#00c420]" />
                <span className="text-[#00c420]">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code / Preview Section */}
      {showPreview ? (
        <div className="bg-gray-950/50 p-4 border-t border-gray-800">
          {/* 🧠 React Live Preview */}
          {["jsx", "tsx"].includes(currentLanguage) ? (
            <LiveProvider code={currentCode} noInline>
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <LivePreview className="text-white" />
              </div>
              <LiveError className="text-red-400 text-sm mt-2 font-mono" />
            </LiveProvider>
          ) : ["html"].includes(currentLanguage) ? (
            <iframe
              srcDoc={currentCode}
              className="w-full h-64 rounded-lg border border-gray-800 bg-white"
              sandbox="allow-scripts allow-same-origin"
              title="HTML Preview"
            />
          ) : (
            <div className="text-gray-400 text-sm text-center py-6">
              ⚠️ Live preview only works for JSX/TSX or HTML.
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <SyntaxHighlighter
            language={currentLanguage}
            style={nightOwl}
            showLineNumbers={showLineNumbers}
            wrapLines
            customStyle={{
              margin: 0,
              padding: "20px 16px",
              fontSize: "14px",
              lineHeight: "1.5",
              background: "transparent",
              border: "none",
            }}
            lineNumberStyle={{
              minWidth: "3em",
              paddingRight: "1em",
              textAlign: "right",
              color: "#6B7280",
              userSelect: "none",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  '"Fira Code", "Cascadia Code", "Monaco", monospace',
                fontWeight: 400,
              },
            }}
          >
            {currentCode.trim()}
          </SyntaxHighlighter>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-gray-900/20 opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
