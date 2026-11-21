import fs from "fs-extra";
import path from "path";
import { backupOnce } from "./fs-utils.js";

export const THEME_MARKER_START = "/* NEUCTRA_THEME_START */";
export const THEME_MARKER_END = "/* NEUCTRA_THEME_END */";

const HEX = /^#(?:[\da-f]{3}|[\da-f]{6})$/i;

const expandHex = (hex) => (hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex).toLowerCase();

const luminance = (hex) => {
  const [r, g, b] = expandHex(hex).slice(1).match(/.{2}/g).map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** White or near-black text, whichever reads better on `hex`. */
export const readableOn = (hex) => (contrast(hex, "#ffffff") >= contrast(hex, "#09090b") ? "#ffffff" : "#09090b");

// Resolves the @source path from the CSS file's own folder to
// node_modules/@neuctra/ui so Tailwind scans the library's class names.
export const resolveNeuctraSourcePath = (cssFile, cwd) => {
  const relPath = path
    .relative(path.dirname(cssFile), path.join(cwd, "node_modules", "@neuctra", "ui"))
    .split(path.sep)
    .join("/");
  return relPath.startsWith(".") ? relPath : `./${relPath}`;
};

/** The managed block: tokens for both themes, the Tailwind mapping and base colors. */
export const buildThemeBlock = (primaryColor) => {
  const primary = expandHex(primaryColor);
  const onPrimary = readableOn(primary);
  return `${THEME_MARKER_START}
/* Managed by @neuctra/ui-cli. Edit the values freely; re-running
   "npx @neuctra/ui-cli init" only replaces what is between these markers. */

/* Light theme (default) */
:root {
  --primary: ${primary};
  --primary-foreground: ${onPrimary};

  --background: #fafafa;
  --foreground: #18181b;
  --secondary: #52525b;

  --muted: #f4f4f5;
  --muted-foreground: #71717a;

  --accent: #f4f4f5;
  --accent-foreground: #18181b;

  --border: #e4e4e7;
  --input: #f4f4f5;
  --ring: ${primary};

  --destructive: #dc2626;
  --destructive-foreground: #ffffff;

  --card: #ffffff;
  --card-foreground: #18181b;

  --popover: #ffffff;
  --popover-foreground: #18181b;

  --success: #15803d;
  --success-foreground: #ffffff;

  --warning: #b45309;
  --warning-foreground: #ffffff;

  --info: #2563eb;
  --info-foreground: #ffffff;
}

/* Dark theme: applied by the .dark class on <html> */
.dark {
  --primary: ${primary};
  --primary-foreground: ${onPrimary};

  --background: #09090b;
  --foreground: #fafafa;
  --secondary: #d4d4d8;

  --muted: #27272a;
  --muted-foreground: #a1a1aa;

  --accent: #1c1c1f;
  --accent-foreground: #fafafa;

  --border: #27272a;
  --input: #1c1c1f;
  --ring: ${primary};

  --destructive: #ef4444;
  --destructive-foreground: #fafafa;

  --card: #121214;
  --card-foreground: #fafafa;

  --popover: #18181b;
  --popover-foreground: #fafafa;

  --success: #22c55e;
  --success-foreground: #052e16;

  --warning: #f59e0b;
  --warning-foreground: #451a03;

  --info: #3b82f6;
  --info-foreground: #eff6ff;
}

/* Tailwind v4: expose the tokens as utilities (bg-primary, text-foreground, ...) */
@theme {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-secondary: var(--secondary);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);

  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);

  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}

@layer base {
  body {
    background-color: var(--background);
    color: var(--foreground);
  }

  button:not(:disabled),
  [role="button"]:not([aria-disabled="true"]) {
    cursor: pointer;
  }
}
${THEME_MARKER_END}`;
};

const DARK_VARIANT = "@custom-variant dark (&:where(.dark, .dark *));";

/**
 * Merges the Neuctra setup into an existing stylesheet without discarding the
 * project's own CSS:
 *   - Tailwind v3 `@tailwind ...;` directives become `@import "tailwindcss";`
 *   - `@import "tailwindcss"`, the `@source` for @neuctra/ui and the class-based
 *     dark variant are added once (existing ones are updated in place)
 *   - the managed theme block is replaced between its markers, or appended
 *   - a token-only `@theme` block left outside the markers by older CLI
 *     versions is removed so tokens are not declared twice
 * The original file is backed up once to `<file>.neuctra-backup`.
 */
export const updateCssFile = async (cssFile, cwd = process.cwd(), primaryColor = "#00c214") => {
  if (!HEX.test(primaryColor)) {
    throw new Error("Primary color must be a 3- or 6-digit hex color, such as #2563eb.");
  }
  const original = (await fs.pathExists(cssFile)) ? await fs.readFile(cssFile, "utf8") : "";
  let css = original.replace(/\r\n/g, "\n");
  const notes = [];

  // 1. Tailwind v3 directives -> v4 import.
  if (/@tailwind\s+(base|components|utilities)\s*;/.test(css)) {
    css = css.replace(/^\s*@tailwind\s+(base|components|utilities)\s*;\s*$/gm, "");
    notes.push("Replaced Tailwind v3 @tailwind directives with @import \"tailwindcss\"");
  }

  // 2. Pull out the managed block (it is re-added in full at the end).
  const start = css.indexOf(THEME_MARKER_START);
  const end = css.indexOf(THEME_MARKER_END);
  const hadBlock = start !== -1 && end > start;
  if (hadBlock) css = css.slice(0, start) + css.slice(end + THEME_MARKER_END.length);

  // 3. Remove a leftover token-mapping @theme block from older CLI versions.
  css = css.replace(/@theme\s*\{[^{}]*--color-primary:\s*var\(--primary\)[^{}]*\}\s*/g, () => {
    notes.push("Removed a duplicate token @theme block from an older setup");
    return "";
  });
  // Older templates also hardcoded a black scrollbar track, wrong in light mode.
  css = css.replace(/(::-webkit-scrollbar-track\s*\{\s*background-color:\s*)#000(?:000)?\s*;/g, "$1var(--background);");

  // 4. Header: @import "tailwindcss", @source, dark variant. CSS requires
  //    @import rules to come first, so they are placed after any existing ones.
  const sourcePath = resolveNeuctraSourcePath(cssFile, cwd);
  css = css.replace(/^\s*@import\s+["']tailwindcss["'][^;]*;\s*$/gm, "");
  css = css.replace(/^\s*@source\s+["'][^"']*@neuctra\/ui[^"']*["']\s*;\s*$/gm, "");
  css = css.replace(/^\s*@custom-variant\s+dark\b[^;]*;\s*$/gm, "");

  const lines = css.split("\n");
  let insertAt = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.startsWith("@import") || line.startsWith("@charset") || line === "" || line.startsWith("/*") || line.startsWith("*") || line.endsWith("*/")) {
      if (line.startsWith("@import") || line.startsWith("@charset")) insertAt = i + 1;
      continue;
    }
    break;
  }
  const header = [
    '@import "tailwindcss";',
    `@source "${sourcePath}";`,
    "",
    "/* Dark mode follows the .dark class that ThemeProvider sets on <html>. */",
    DARK_VARIANT,
    "",
  ];
  lines.splice(insertAt, 0, ...(insertAt > 0 ? ["", ...header] : header));
  css = lines.join("\n");

  // 5. Managed theme block at the end, so project styles above can still
  //    reference the tokens and later rules keep their order.
  css = `${css.replace(/\n{3,}/g, "\n\n").trimEnd()}\n\n${buildThemeBlock(primaryColor)}\n`;

  if (css === original) return { updated: false, notes, backup: null };
  const backup = original.trim() ? await backupOnce(cssFile) : null;
  await fs.writeFile(cssFile, css);
  return { updated: true, notes, backup, replacedBlock: hadBlock };
};
