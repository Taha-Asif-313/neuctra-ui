import fs from "fs-extra";

const THEME_MARKER_START = "/* NEUCTRA_THEME_START */";
const THEME_MARKER_END = "/* NEUCTRA_THEME_END */";

const themeSnippet = `
${THEME_MARKER_START}

/* =============================
   BASE THEME (LIGHT)
============================= */
:root {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --primary-soft: color-mix(in srgb, var(--primary) 10%, white);
  --primary-muted: color-mix(in srgb, var(--primary) 20%, white);
  --primary-border: color-mix(in srgb, var(--primary) 30%, white);
  --primary-ring: color-mix(in srgb, var(--primary) 50%, transparent);

  --background: #ffffff;
  --foreground: #0f172a;

  --muted: color-mix(in srgb, var(--primary) 6%, #f1f5f9);
  --muted-foreground: #64748b;

  --accent: color-mix(in srgb, var(--primary) 8%, #f1f5f9);
  --accent-foreground: #0f172a;

  --border: color-mix(in srgb, var(--primary) 12%, #e2e8f0);
  --input: #e2e8f0;
  --ring: color-mix(in srgb, var(--primary) 60%, transparent);

  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
}

/* =============================
   DARK THEME
============================= */
.dark {
  --primary: #00c214;
  --primary-foreground: #ffffff;

  --background: #0a0a0a;
  --foreground: #ffffff;

  --primary-soft: color-mix(in srgb, var(--primary) 15%, black);
  --primary-muted: color-mix(in srgb, var(--primary) 25%, black);
  --primary-border: color-mix(in srgb, var(--primary) 35%, black);

  --muted: #1f2937;
  --muted-foreground: #9ca3af;

  --accent: #1f2937;
  --accent-foreground: #ffffff;

  --border: color-mix(in srgb, var(--primary) 20%, #1f2937);
  --input: #1f2937;
  --ring: color-mix(in srgb, var(--primary) 60%, transparent);

  --destructive: #7f1d1d;
  --destructive-foreground: #ffffff;
}

/* =============================
   SYSTEM DARK MODE
============================= */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ffffff;
  }
}

/* =============================
   TAILWIND v4 THEME TOKENS
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
}

${THEME_MARKER_END}
`;

export const updateCssFile = async (cssFile) => {
  let content = await fs.readFile(cssFile, "utf-8");
  let updated = false;

  // =============================
  // ENSURE TAILWIND IMPORT
  // =============================
  if (!content.includes('@import "tailwindcss"')) {
    content = `@import "tailwindcss";\n` + content;
    updated = true;
  }

  // =============================
  // ENSURE @SOURCE
  // =============================
  if (!content.includes("@source")) {
    content = content.replace(
      /@import\s+["']tailwindcss["'];?/,
      (match) => `${match}\n@source "../node_modules/@neuctra/ui";`
    );

    if (!content.includes("@source")) {
      content = `@source "../node_modules/@neuctra/ui";\n` + content;
    }

    updated = true;
  }

  // =============================
  // REMOVE OLD THEME (FULL RESET APPROACH)
  // =============================
  const themeRegex =
    /\/\* NEUCTRA_THEME_START \*\/[\s\S]*?\/\* NEUCTRA_THEME_END \*\//g;

  content = content.replace(themeRegex, "");

  // =============================
  // ADD CLEAN THEME ALWAYS (NO DUP CHECK NEEDED)
  // =============================
  content = content.trim() + "\n\n" + themeSnippet;

  updated = true;

  // =============================
  // WRITE FILE
  // =============================
  if (updated) {
    await fs.writeFile(cssFile, content);
  }

  return { updated, content };
};