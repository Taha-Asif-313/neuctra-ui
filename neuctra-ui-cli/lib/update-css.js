import fs from "fs-extra";

const THEME_MARKER_START = "/* NEUCTRA_THEME_START */";
const THEME_MARKER_END = "/* NEUCTRA_THEME_END */";

const cssFileTemplate = `
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

@import "tailwindcss";

@source "../node_modules/@neuctra/ui";

/* Tailwind v4's default \`dark:\` variant keys off prefers-color-scheme, but the
   theme below swaps on a \`.dark\` class (what <ThemeToggleButton /> toggles).
   Without this the two disagree and you get half a theme. */
@custom-variant dark (&:where(.dark, .dark *));

/* =============================
   BASE GLOBAL STYLES
============================= */

body {
  font-family: "Poppins", sans-serif;
  background-color: var(--background);
  color: var(--foreground);
}

button {
  cursor: pointer;
}

/* ===== Custom Scrollbar ===== */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background-color: #000;
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary);
}

/* =============================
   THEME SYSTEM
============================= */
${THEME_MARKER_START}

/* =========================
   LIGHT THEME (default)
   Every token is defined here AND overridden in .dark below —
   the .dark class (toggled by <ThemeToggleButton />) is what
   switches the whole UI between the two.
========================= */
:root {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --background: #ffffff;
  --foreground: #09090b;

  --muted: #f4f4f5;
  --muted-foreground: #71717a;

  --accent: #e4e4e7;
  --accent-foreground: #09090b;

  --border: #e4e4e7;
  --input: #f4f4f5;
  --ring: #a1a1aa;

  --destructive: #d40000;
  --destructive-foreground: #fafafa;

  /* Surfaces used by Card, List (card / menu variants) and popovers. */
  --card: #ffffff;
  --card-foreground: #09090b;

  --popover: #ffffff;
  --popover-foreground: #09090b;

  /* Status palette (Callout, toasts, form states, Avatar presence). */
  --success: #16a34a;
  --success-foreground: #fafafa;

  --warning: #d97706;
  --warning-foreground: #fafafa;

  --info: #2563eb;
  --info-foreground: #fafafa;
}

/* =========================
   DARK THEME
========================= */
.dark {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --background: #09090b;
  --foreground: #fafafa;

  --muted: #27272a;
  --muted-foreground: #a1a1aa;

  --accent: #18181b;
  --accent-foreground: #fafafa;

  --border: #27272a;
  --input: #18181b;
  --ring: #3f3f46;

  --destructive: #e7000b;
  --destructive-foreground: #fafafa;

  --card: #09090b;
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

${THEME_MARKER_END}

/* =============================
   TAILWIND TOKENS
============================= */
@theme {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-background: var(--background);
  --color-foreground: var(--foreground);

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
`;

export const updateCssFile = async (cssFile) => {
  let updated = false;

  // ALWAYS REBUILD FULL FILE (shadcn style)
  await fs.writeFile(cssFile, cssFileTemplate.trim());

  updated = true;

  return { updated };
};