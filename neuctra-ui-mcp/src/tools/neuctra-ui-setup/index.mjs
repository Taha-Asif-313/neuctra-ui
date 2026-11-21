import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const FRAMEWORKS = ["nextjs", "vite", "remix", "react-router"];
const ignored = new Set(["node_modules", ".git", ".next", "dist", "build"]);

async function walk(dir, depth = 0) {
  if (depth > 4) return [];
  let entries;
  try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return []; }
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isFile()) files.push(path.relative(dir, full));
    else if (entry.isDirectory()) files.push(...(await walk(full, depth + 1)).map((f) => path.join(entry.name, f)));
  }
  return files;
}

async function analyze(projectPath) {
  const files = await walk(projectPath);
  let pkg = {};
  try { pkg = JSON.parse(await fs.readFile(path.join(projectPath, "package.json"), "utf8")); } catch {}
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const scripts = Object.values(pkg.scripts ?? {}).join(" ");
  const neuctraDep = deps["@neuctra/ui"] ?? deps["@neuctra/ui-mcp"] ?? null;
  const neuctraUiVersion = typeof neuctraDep === "string" ? neuctraDep.replace(/^[\^~]/, "") : null;
  const themeFiles = files
    .filter((file) => /(^|\/)(globals\.css|theme\.css|tokens\.css|app\.css|tailwind\.config\.[cm]?[jt]s)/i.test(file))
    .slice(0, 12);
  let framework = null;
  if (deps.next || files.some((f) => /(^|\/)next\.config\./.test(f))) framework = "nextjs";
  else if (deps["@remix-run/react"] || deps["@remix-run/dev"]) framework = "remix";
  else if (deps["react-router"] || deps["@react-router/dev"] || /react-router/.test(scripts)) framework = "react-router";
  else if (deps.vite && deps.react) framework = "vite";
  const rootItems = await fs.readdir(projectPath).catch(() => []);
  return {
    projectPath,
    framework,
    packageName: pkg.name ?? null,
    hasNeuctraUi: Boolean(neuctraUiVersion),
    neuctraUiVersion,
    themeFiles,
    hasPackageJson: Boolean(pkg.name || Object.keys(pkg).length),
    filesFound: files.length,
    rootItems: rootItems.filter((name) => name !== "node_modules" && name !== ".git").slice(0, 40),
    state: framework ? "framework-detected" : files.length ? "unrecognized-or-partial-project" : "empty-directory",
  };
}

async function emptyDirectory(projectPath) {
  const resolved = path.resolve(projectPath);
  if (resolved === path.parse(resolved).root || resolved === process.cwd()) {
    throw new Error("Refusing to clear a filesystem root or the MCP server working directory.");
  }
  for (const entry of await fs.readdir(resolved, { withFileTypes: true })) {
    await fs.rm(path.join(resolved, entry.name), { recursive: true, force: true });
  }
}


// The MCP server talks JSON-RPC over stdout, so child processes must never
// inherit it: their output is captured and returned instead.
function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
      env: { ...process.env, CI: "1", npm_config_yes: "true" },
    });
    let output = "";
    const collect = (chunk) => { output = (output + chunk.toString()).slice(-20000); };
    child.stdout.on("data", collect);
    child.stderr.on("data", collect);
    child.once("error", reject);
    child.once("close", (code) => {
      const clean = output.replace(/\x1b\[[0-9;?]*[A-Za-z]/g, "");
      if (code === 0) resolve(clean);
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}\n${clean.split("\n").slice(-25).join("\n")}`));
    });
  });
}

// MCP framework ids -> @neuctra/ui-cli ids.
const CLI_FRAMEWORK = { nextjs: "next", vite: "vite", remix: "remix", "react-router": "react-router" };

async function createFramework(projectPath, framework, language) {
  const ts = language !== "js";
  if (framework === "nextjs") {
    await run("npx", ["-y", "create-next-app@latest", ".", ts ? "--ts" : "--js", "--tailwind", "--eslint", "--app", "--src-dir", "--use-npm", "--yes", "--disable-git"], projectPath);
  } else if (framework === "vite") {
    await run("npm", ["create", "-y", "vite@latest", ".", "--", "--template", ts ? "react-ts" : "react"], projectPath);
    await run("npm", ["install", "--no-audit", "--no-fund"], projectPath);
  } else if (framework === "remix") {
    await run("npx", ["-y", "create-remix@latest", ".", "--template", "remix-run/remix/templates/spa", "--no-git-init", "--install", "--yes"], projectPath);
  } else {
    await run("npx", ["-y", "create-react-router@latest", ".", "--no-git-init", "--install", "--yes"], projectPath);
  }
}

/**
 * Adds `output: "export"` to an existing next.config without discarding the
 * rest of it (Next.js 16 templates keep their Tailwind Turbopack rule there).
 */
async function enableStaticExport(projectPath) {
  for (const name of ["next.config.ts", "next.config.mjs", "next.config.js"]) {
    const file = path.join(projectPath, name);
    let content;
    try { content = await fs.readFile(file, "utf8"); } catch { continue; }
    if (/output\s*:\s*["']export["']/.test(content)) return { file: name, changed: false };
    const updated = content.replace(/(const\s+nextConfig[^=]*=\s*\{)/, `$1\n  output: "export",`);
    if (updated === content) return { file: name, changed: false, manual: `Add output: "export" to ${name} to enable static export.` };
    await fs.writeFile(file, updated);
    return { file: name, changed: true };
  }
  await fs.writeFile(path.join(projectPath, "next.config.mjs"), 'const nextConfig = { output: "export" };\n\nexport default nextConfig;\n');
  return { file: "next.config.mjs", changed: true };
}

/** The same token CSS the CLI writes, built from data/theme.json, for manual setups. */
function buildManualCss(theme, primaryColor) {
  const tokens = theme?.tokens ?? [];
  const value = (token, mode) => {
    if (token.token === "primary" || token.token === "ring") return primaryColor ?? token[mode];
    return token[mode];
  };
  const block = (mode) => tokens.map((t) => `  --${t.token}: ${value(t, mode)};`).join("\n");
  const mapping = tokens.map((t) => `  --color-${t.token}: var(--${t.token});`).join("\n");
  return `@import "tailwindcss";
@source "../node_modules/@neuctra/ui"; /* path from THIS css file to node_modules/@neuctra/ui */

@custom-variant dark (&:where(.dark, .dark *));

/* NEUCTRA_THEME_START */
:root {
${block("light")}
}

.dark {
${block("dark")}
}

@theme {
${mapping}
}

@layer base {
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
/* NEUCTRA_THEME_END */`;
}

function manualInstructions(framework, theme, primaryColor) {
  const tailwind = framework === "nextjs"
    ? 'Next.js: npm install -D tailwindcss @tailwindcss/postcss, then postcss.config.mjs = export default { plugins: { "@tailwindcss/postcss": {} } }. (Next.js 16 templates that already use @tailwindcss/turbopack in next.config need nothing more.)'
    : 'Vite / React Router / Remix: npm install -D tailwindcss @tailwindcss/vite, then add `import tailwindcss from "@tailwindcss/vite"` and `tailwindcss()` to the plugins array in vite.config.';
  const provider = {
    nextjs: 'Create app/providers.tsx ("use client") exporting Providers that renders <ThemeProvider><ToastProvider>{children}</ToastProvider></ThemeProvider> (both from "@neuctra/ui"); wrap {children} in <Providers> inside <body> of app/layout.tsx; add suppressHydrationWarning to <html>; put <script dangerouslySetInnerHTML={{ __html: <getThemeScript() output> }} /> in <head>.',
    vite: 'In src/main.tsx wrap <App /> in <ThemeProvider><ToastProvider>…</ToastProvider></ThemeProvider> from "@neuctra/ui"; paste the getThemeScript() output into a <script> at the top of <head> in index.html.',
    remix: 'In app/root.tsx wrap <Outlet /> in <ThemeProvider><ToastProvider>…</ToastProvider></ThemeProvider> from "@neuctra/ui"; add suppressHydrationWarning to <html> and the getThemeScript() output as an inline <script> in <head>.',
    "react-router": 'In app/root.tsx wrap <Outlet /> in <ThemeProvider><ToastProvider>…</ToastProvider></ThemeProvider> from "@neuctra/ui"; add suppressHydrationWarning to <html> and the getThemeScript() output as an inline <script> in <head>.',
  }[framework];
  return {
    steps: [
      "Install: npm install @neuctra/ui lucide-react (React 18+ required).",
      `Tailwind CSS v4: ${tailwind}`,
      "Global CSS: make sure the app root imports your global stylesheet, then merge in `css` below (keep your own rules; set @source relative to the CSS file).",
      `Theme provider: ${provider}`,
      'Theme toggle: <ThemeToggleButton /> from "@neuctra/ui" reads the provider; no props needed.',
      'getThemeScript() is exported by "@neuctra/ui" (call it in a script or copy its output). It sets the .dark class before paint so there is no theme flash.',
    ],
    css: buildManualCss(theme, primaryColor),
    recommended: "Running `npx @neuctra/ui-cli@latest init` performs all of these steps automatically and keeps existing CSS (backups end in .neuctra-backup).",
  };
}

/** Analyze first; setup actions require a subsequent explicit call with framework and choices. */
export async function setupNeuctraUi(input, { theme } = {}) {
  const projectPath = path.resolve(input.projectPath || process.cwd());
  const report = await analyze(projectPath);
  if (input.action !== "setup") {
    return { ...report, nextStep: report.framework ? "Choose whether to use CLI setup or manual setup." : "Choose a framework; if clearing is required, explicitly confirm it." };
  }

  const framework = input.framework ?? report.framework ?? "nextjs";
  if (!FRAMEWORKS.includes(framework)) {
    return { ...report, needsInput: "framework", allowedFrameworks: FRAMEWORKS, message: "Select a supported framework before setup can continue." };
  }
  // Existing projects keep their language; new projects default to TypeScript.
  const hasTsconfig = await fs.access(path.join(projectPath, "tsconfig.json")).then(() => true, () => false);
  const language = input.language ?? (hasTsconfig || !report.hasPackageJson ? "ts" : "js");
  const primaryColor = input.primaryColor;
  if (primaryColor && !/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(primaryColor)) {
    return { ...report, needsInput: "primaryColor", message: "primaryColor must be a 3- or 6-digit hex color such as #2563eb." };
  }
  if (!input.setupMode) {
    return { ...report, selectedFramework: framework, needsInput: "setupMode", allowedSetupModes: ["cli", "manual"], message: "Choose whether to run the Neuctra UI CLI setup or get manual setup instructions." };
  }
  const setupMode = input.setupMode;
  if (!["cli", "manual"].includes(setupMode)) throw new Error("setupMode must be cli or manual.");
  if (setupMode === "manual") {
    return { ...report, selectedFramework: framework, setupMode, ...manualInstructions(framework, theme, primaryColor) };
  }

  const projectExists = report.filesFound > 0;
  if (report.framework && report.framework !== framework && !input.confirmReplace) {
    return { ...report, needsInput: "confirmReplace", message: `Detected ${report.framework}. Confirm replacing this project before selecting ${framework}.` };
  }
  const replaceProject = projectExists && (!report.framework || report.framework !== framework);
  if (replaceProject && !input.confirmClear) {
    return { ...report, needsInput: "confirmClear", message: "This directory contains files. Explicitly confirm clearing it to initialize a new framework." };
  }

  if (replaceProject) await emptyDirectory(projectPath);
  await fs.mkdir(projectPath, { recursive: true });
  const scaffolded = !report.framework || replaceProject;
  if (scaffolded) await createFramework(projectPath, framework, language);

  // The CLI installs @neuctra/ui and lucide-react, configures Tailwind v4,
  // merges the theme tokens into the global CSS and wires the providers.
  const cliArgs = ["-y", "@neuctra/ui-cli@latest", "init", "--yes", `--framework=${CLI_FRAMEWORK[framework]}`, `--language=${language}`];
  if (primaryColor) cliArgs.push(`--primary-color=${primaryColor}`);
  const cliOutput = await run("npx", cliArgs, projectPath);

  let staticExport = null;
  if (framework === "nextjs" && input.staticExport) staticExport = await enableStaticExport(projectPath);

  const summary = cliOutput.split("\n").filter((line) => /^\s*[•→]/.test(line)).map((line) => line.trim());
  return {
    ...(await analyze(projectPath)),
    setupMode,
    setupComplete: true,
    scaffolded,
    themeInitializedBy: "@neuctra/ui-cli init",
    cliSummary: summary,
    ...(staticExport ? { staticExport } : {}),
    nextSteps: [
      'Use components from "@neuctra/ui"; <ThemeToggleButton /> works with no props inside the ThemeProvider.',
      "Run the dev server and check the page in light and dark mode.",
    ],
  };
}
