"use client";

import React, { forwardRef, useId, useRef } from "react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { CopyButton } from "./CopyButton";

/** A labelled code sample shown as a tab in a {@link CodeBlock}. */
export interface CodeBlockTab {
  /** Tab label. */
  label: string;
  /** Source shown when the tab is active. */
  code: string;
  /** Language label for this tab. */
  language?: string;
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Source code displayed in the block (used when no `tabs` are given). */
  code: string;
  /** Language label shown in the header. */
  language?: string;
  /** Filename shown in the header instead of the language. */
  filename?: string;
  /** Shows a line number beside each line. */
  showLineNumbers?: boolean;
  /** 1-based line numbers to highlight. */
  highlightLines?: number[];
  /** Shows a copy button in the header. */
  copyable?: boolean;
  /** Wraps long lines instead of scrolling horizontally. */
  wrap?: boolean;
  /** Caps the code area height; longer code scrolls vertically. */
  maxHeight?: number | string;
  /** Text size preset for the code. */
  size?: "sm" | "md";
  /** Optional labelled source variants, shown as tabs in the header. */
  tabs?: CodeBlockTab[];
  /** Controlled index of the active tab. */
  activeTab?: number;
  /** Initial active tab in uncontrolled mode. */
  defaultTab?: number;
  /** Fired when the active tab changes. */
  onTabChange?: (index: number) => void;
  /** Styles the header bar. */
  headerClassName?: string;
  /** Styles the scrollable `<pre>` element. */
  preClassName?: string;
  /** Styles every code line. */
  lineClassName?: string;
  /** Styles the line number gutter cells. */
  lineNumberClassName?: string;
}

const sizeConfig = {
  sm: "text-xs leading-relaxed",
  md: "text-sm leading-relaxed",
} as const;

const TOKEN_PATTERN =
  /(\/\/[^\n]*|\/\*.*?\*\/|#[^\n]*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|import|export|default|from|class|extends|new|if|else|for|while|switch|case|async|await|try|catch|throw|typeof|instanceof|interface|type|as|null|undefined|true|false)\b|\b\d+(?:\.\d+)?\b)/g;

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "import", "export", "default",
  "from", "class", "extends", "new", "if", "else", "for", "while", "switch",
  "case", "async", "await", "try", "catch", "throw", "typeof", "instanceof",
  "interface", "type", "as", "null", "undefined", "true", "false",
]);

const HASH_COMMENT_LANGS = new Set(["bash", "sh", "shell", "zsh", "python", "py", "yaml", "yml", "toml"]);

/** Lightweight, dependency-free token colouring using semantic theme tokens. */
function tokenize(line: string, language: string): React.ReactNode[] {
  const hashComments = HASH_COMMENT_LANGS.has(language.toLowerCase());
  return line.split(TOKEN_PATTERN).map((part, index) => {
    if (!part) return null;
    let className: string | undefined;
    if (part.startsWith("//") || part.startsWith("/*") || (hashComments && part.startsWith("#"))) {
      className = "italic text-muted-foreground";
    } else if (part.startsWith("#")) {
      className = undefined;
    } else if (/^["'`]/.test(part)) {
      className = "text-success";
    } else if (KEYWORDS.has(part)) {
      className = "text-primary";
    } else if (/^\d/.test(part)) {
      className = "text-info";
    }
    return className ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    );
  });
}

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  function CodeBlock(
    {
      code,
      language = "text",
      filename,
      showLineNumbers = false,
      highlightLines,
      copyable = true,
      wrap = false,
      maxHeight,
      size = "sm",
      tabs,
      activeTab: activeTabProp,
      defaultTab = 0,
      onTabChange,
      className,
      style,
      headerClassName,
      preClassName,
      lineClassName,
      lineNumberClassName,
      ...rest
    },
    ref,
  ) {
    const baseId = useId();
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [activeTab, setActiveTab] = useControllableState<number>({
      value: activeTabProp,
      defaultValue: defaultTab,
      onChange: onTabChange,
    });

    const hasTabs = Boolean(tabs?.length);
    const tabIndex = hasTabs ? Math.min(Math.max(activeTab, 0), tabs!.length - 1) : 0;
    const active = tabs?.[tabIndex];
    const currentCode = active?.code ?? code ?? "";
    const currentLanguage = active?.language ?? language;
    const lines = currentCode.replace(/\n$/, "").split("\n");
    const highlighted = new Set(highlightLines ?? []);
    const gutterWidth = `${String(lines.length).length + 1}ch`;
    const showHeader = Boolean(filename || currentLanguage || hasTabs || copyable);

    const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!tabs?.length) return;
      let next: number | null = null;
      if (event.key === "ArrowRight") next = (tabIndex + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (tabIndex - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      setActiveTab(next);
      tabRefs.current[next]?.focus();
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label={filename ? `${filename} code` : "Code block"}
        className={cn(
          "min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
          className,
        )}
        style={style}
        {...rest}
      >
        {showHeader && (
          <div
            className={cn(
              "flex min-h-10 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
              headerClassName,
            )}
          >
            <div
              role={hasTabs ? "tablist" : undefined}
              aria-label={hasTabs ? "Code variants" : undefined}
              className="flex min-w-0 items-center gap-1 overflow-x-auto"
            >
              {hasTabs ? (
                tabs!.map((tab, index) => {
                  const selected = index === tabIndex;
                  return (
                    <button
                      key={`${tab.label}-${index}`}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`${baseId}-tab-${index}`}
                      aria-selected={selected}
                      aria-controls={`${baseId}-panel`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveTab(index)}
                      onKeyDown={onTabKeyDown}
                      className={cn(
                        "shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })
              ) : (
                <span className="truncate text-xs font-medium text-muted-foreground">
                  {filename ?? currentLanguage.toUpperCase()}
                </span>
              )}
            </div>
            {copyable && (
              <CopyButton
                value={currentCode}
                size="sm"
                aria-label="Copy code"
                className="shrink-0"
              />
            )}
          </div>
        )}

        <pre
          id={`${baseId}-panel`}
          role={hasTabs ? "tabpanel" : undefined}
          aria-labelledby={hasTabs ? `${baseId}-tab-${tabIndex}` : undefined}
          // Scrollable regions must be keyboard reachable.
          tabIndex={0}
          className={cn(
            "overflow-auto py-4 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
            sizeConfig[size] ?? sizeConfig.sm,
            wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre",
            preClassName,
          )}
          style={maxHeight !== undefined ? { maxHeight } : undefined}
        >
          <code className="block min-w-fit">
            {lines.map((line, index) => (
              <span
                key={index}
                className={cn(
                  "flex min-h-5 px-4",
                  highlighted.has(index + 1) && "bg-primary/10",
                  lineClassName,
                )}
              >
                {showLineNumbers && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mr-4 shrink-0 select-none text-right tabular-nums text-muted-foreground",
                      lineNumberClassName,
                    )}
                    style={{ width: gutterWidth }}
                  >
                    {index + 1}
                  </span>
                )}
                <span className="min-w-0 flex-1">{tokenize(line, currentLanguage)}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    );
  },
);

CodeBlock.displayName = "CodeBlock";
