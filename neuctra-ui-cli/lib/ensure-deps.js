import fs from "fs-extra";
import path from "path";
import { install, readInstalledVersion, majorVersion } from "./package-manager.js";
import { backupOnce } from "./fs-utils.js";

const MIN_REACT_MAJOR = 18;
const MIN_TAILWIND_MAJOR = 4;

// =============================
// REACT (peer dependency, >= 18)
// =============================
export const ensureReact = async ({ cwd, manager, skipInstall }) => {
  const react = await readInstalledVersion(cwd, "react");
  const reactDom = await readInstalledVersion(cwd, "react-dom");
  const ok = majorVersion(react) >= MIN_REACT_MAJOR && majorVersion(reactDom) >= MIN_REACT_MAJOR;
  if (ok) return { status: "ok", message: `React ${react}` };
  if (skipInstall) return { status: "warn", message: `React ${react ?? "missing"}: @neuctra/ui needs React 18 or newer` };
  // React is missing or older than 18: install the current release, which all
  // supported frameworks (Next.js, Vite, React Router, Remix) accept.
  install(cwd, manager, ["react@latest", "react-dom@latest"]);
  return { status: "changed", message: `React ${await readInstalledVersion(cwd, "react")} installed` };
};

// =============================
// TAILWIND CSS v4 + bundler integration
// =============================
const VITE_CONFIGS = ["vite.config.ts", "vite.config.mts", "vite.config.js", "vite.config.mjs"];
const POSTCSS_CONFIGS = ["postcss.config.mjs", "postcss.config.js", "postcss.config.cjs", "postcss.config.ts", ".postcssrc", ".postcssrc.json"];
const TAILWIND_V3_CONFIGS = ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs"];

const firstExisting = async (cwd, names) => {
  for (const name of names) {
    const full = path.join(cwd, name);
    if (await fs.pathExists(full)) return full;
  }
  return null;
};

/** Next.js (and non-Vite builds) load Tailwind v4 through @tailwindcss/postcss. */
const POSTCSS_V4 = `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`;

const configurePostcss = async (cwd, changes) => {
  const existing = await firstExisting(cwd, POSTCSS_CONFIGS);
  if (existing) {
    const content = await fs.readFile(existing, "utf8");
    if (content.includes("@tailwindcss/postcss")) return;
    // A v3 config (`tailwindcss: {}` / require("tailwindcss")) breaks the v4
    // build, so replace it, keeping a backup of the original.
    const backup = await backupOnce(existing);
    await fs.remove(existing);
    changes.push(`Replaced ${path.basename(existing)} with a Tailwind v4 PostCSS config${backup ? ` (backup: ${path.basename(backup)})` : ""}`);
  } else {
    changes.push("Created postcss.config.mjs for Tailwind v4");
  }
  await fs.writeFile(path.join(cwd, "postcss.config.mjs"), POSTCSS_V4);
};

/** Vite-based apps (Vite, React Router, Remix on Vite) use the @tailwindcss/vite plugin. */
const configureVite = async (cwd, viteConfig, changes, manual) => {
  let content = await fs.readFile(viteConfig, "utf8");
  if (content.includes("@tailwindcss/vite")) return;

  const pluginsArray = /plugins\s*:\s*\[/;
  if (!pluginsArray.test(content)) {
    manual.push(`Add the Tailwind plugin to ${path.basename(viteConfig)}: import tailwindcss from "@tailwindcss/vite" and put tailwindcss() in plugins.`);
    return;
  }
  const importLine = 'import tailwindcss from "@tailwindcss/vite";\n';
  const imports = content.match(/^(?:import[^\n]*\n)+/m);
  content = imports
    ? content.slice(0, imports.index + imports[0].length) + importLine + content.slice(imports.index + imports[0].length)
    : importLine + content;
  content = content.replace(pluginsArray, (match) => `${match}tailwindcss(), `);
  await backupOnce(viteConfig);
  await fs.writeFile(viteConfig, content);
  changes.push(`Added the Tailwind v4 plugin to ${path.basename(viteConfig)}`);
};

const NEXT_CONFIGS = ["next.config.ts", "next.config.mjs", "next.config.js", "next.config.cjs"];

/** Next.js 16+ templates load Tailwind with a Turbopack loader rule instead of PostCSS. */
const usesTurbopackLoader = async (cwd) => {
  const config = await firstExisting(cwd, NEXT_CONFIGS);
  return Boolean(config && (await fs.readFile(config, "utf8")).includes("@tailwindcss/turbopack"));
};

export const ensureTailwind = async ({ cwd, manager, framework, skipInstall }) => {
  const changes = [];
  const manual = [];
  const version = await readInstalledVersion(cwd, "tailwindcss");
  const viteConfig = framework === "next" ? null : await firstExisting(cwd, VITE_CONFIGS);
  const usesVite = Boolean(viteConfig);
  const turbopack = framework === "next" && (await usesTurbopackLoader(cwd));
  // Keep whatever v4 integration the project already uses; adding a second
  // one (e.g. PostCSS next to the Turbopack loader) processes CSS twice.
  const integration = usesVite ? "@tailwindcss/vite" : turbopack ? "@tailwindcss/turbopack" : "@tailwindcss/postcss";

  const needsTailwind = majorVersion(version) === null || majorVersion(version) < MIN_TAILWIND_MAJOR;
  const integrationVersion = await readInstalledVersion(cwd, integration);
  if (needsTailwind || !integrationVersion) {
    if (skipInstall) {
      manual.push(`Install Tailwind CSS v4: ${["tailwindcss@latest", `${integration}@latest`].join(" ")} (dev dependencies)`);
    } else {
      install(cwd, manager, ["tailwindcss@latest", `${integration}@latest`], { dev: true });
      changes.push(`Installed Tailwind CSS ${await readInstalledVersion(cwd, "tailwindcss")} with ${integration}`);
    }
  }

  if (usesVite) await configureVite(cwd, viteConfig, changes, manual);
  else if (!turbopack) await configurePostcss(cwd, changes);

  const legacyConfig = await firstExisting(cwd, TAILWIND_V3_CONFIGS);
  if (legacyConfig) {
    manual.push(`${path.basename(legacyConfig)} is a Tailwind v3 config. Tailwind v4 ignores it unless the CSS loads it with @config; move any custom theme values into the CSS @theme block, then delete the file.`);
  }

  return {
    status: changes.length ? "changed" : "ok",
    message: changes.length ? changes.join("; ") : `Tailwind CSS ${version} with ${integration}`,
    changes,
    manual,
  };
};
