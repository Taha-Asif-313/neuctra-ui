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
    hasPackageJson: Boolean(pkg.name || Object.keys(pkg).length),
    filesFound: files.length,
    rootItems: rootItems.filter((name) => name !== "node_modules" && name !== ".git").slice(0, 40),
    state: framework ? "framework-detected" : files.length ? "unrecognized-or-partial-project" : "empty-directory",
  };
}

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
    child.once("error", reject);
    child.once("close", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`)));
  });
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

async function createFramework(projectPath, framework) {
  if (framework === "nextjs") {
    await run("npx", ["create-next-app@latest", ".", "--js", "--tailwind", "--app", "--src-dir", "--use-npm", "--yes"], projectPath);
    const config = path.join(projectPath, "next.config.mjs");
    await fs.writeFile(config, 'const nextConfig = { output: "export" };\n\nexport default nextConfig;\n');
  } else if (framework === "vite") {
    await run("npm", ["create", "vite@latest", ".", "--", "--template", "react"], projectPath);
    await run("npm", ["install"], projectPath);
  } else if (framework === "remix") {
    await run("npx", ["create-remix@latest", ".", "--template", "remix-run/remix/templates/spa"], projectPath);
  } else {
    await run("npx", ["create-react-router@latest", "."], projectPath);
  }
}

/** Analyze first; setup actions require a subsequent explicit call with framework and choices. */
export async function setupNeuctraUi(input) {
  const projectPath = path.resolve(input.projectPath || process.cwd());
  const report = await analyze(projectPath);
  if (input.action !== "setup") {
    return { ...report, nextStep: report.framework ? "Choose whether to use CLI setup or manual setup." : "Choose a framework; if clearing is required, explicitly confirm it." };
  }

  const framework = input.framework ?? report.framework ?? "nextjs";
  if (!FRAMEWORKS.includes(framework)) {
    return { ...report, needsInput: "framework", allowedFrameworks: FRAMEWORKS, message: "Select a supported framework before setup can continue." };
  }
  if (!input.setupMode) {
    return { ...report, selectedFramework: framework, needsInput: "setupMode", allowedSetupModes: ["cli", "manual"], message: "Choose whether to run the Neuctra UI CLI setup or get manual setup instructions." };
  }
  const setupMode = input.setupMode;
  if (!["cli", "manual"].includes(setupMode)) throw new Error("setupMode must be cli or manual.");
  if (setupMode === "manual") {
    return { ...report, selectedFramework: framework, setupMode, instructions: ["Install @neuctra/ui.", "Configure Tailwind CSS v4 for the selected framework.", "Add @import \"tailwindcss\" and @source \"../node_modules/@neuctra/ui\" to global CSS.", "Run npx @neuctra/ui-cli@latest init to generate theme setup.", "Install lucide-react."] };
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
  if (!report.framework || replaceProject) await createFramework(projectPath, framework);
  await run("npx", ["@neuctra/ui-cli@latest", "init"], projectPath);
  await run("npm", ["install", "lucide-react"], projectPath);
  return { ...(await analyze(projectPath)), setupMode, setupComplete: true, installed: ["@neuctra/ui", "lucide-react"], themeInitializedBy: "@neuctra/ui-cli init", staticExport: framework === "nextjs" };
}
