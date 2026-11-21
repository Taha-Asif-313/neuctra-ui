import fs from "fs-extra";
import path from "path";
import kleur from "kleur";
import ora from "ora";

import { detectFramework } from "../lib/detect-framework.js";
import { detectLanguage } from "../lib/detect-language.js";
import { detectPackageManager, install, readInstalledVersion } from "../lib/package-manager.js";
import { ensureReact, ensureTailwind } from "../lib/ensure-deps.js";
import { resolveCssFile } from "../lib/find-css-file.js";
import { updateCssFile } from "../lib/update-css.js";
import { setupFramework } from "../lib/framework-setup.js";
import { promptSetup, parseArgs } from "../lib/setup-prompts.js";

const log = {
  title: (msg) => console.log(`\n${kleur.bold().cyan(`◆ ${msg}`)}\n`),
  info: (msg) => console.log(kleur.gray(`ℹ ${msg}`)),
  item: (msg) => console.log(`  ${kleur.green("•")} ${msg}`),
  todo: (msg) => console.log(`  ${kleur.yellow("→")} ${msg}`),
};

const step = async (label, run) => {
  const spinner = ora(label).start();
  try {
    const result = await run();
    if (result?.status === "warn") spinner.warn(result.message);
    else spinner.succeed(result?.message ?? label);
    return result;
  } catch (error) {
    spinner.fail(label);
    throw error;
  }
};

export const init = async (argv = process.argv.slice(3)) => {
  const cwd = process.cwd();
  const args = parseArgs(argv);
  const changes = [];
  const manual = [];

  log.title("Neuctra UI setup");

  if (!(await fs.pathExists(path.join(cwd, "package.json")))) {
    throw new Error(
      "No package.json in this folder. Create a React project first, for example:\n" +
        "  npx create-next-app@latest my-app\n" +
        "  npm create vite@latest my-app -- --template react-ts\n" +
        "then run \"npx @neuctra/ui-cli init\" inside it.",
    );
  }

  const manager = await detectPackageManager(cwd);
  const detectedFramework = await detectFramework(cwd);
  const detectedLanguage = await detectLanguage(cwd);
  const { framework, language, primaryColor } = await promptSetup({ detectedFramework, detectedLanguage, args });
  log.info(`Framework: ${framework} · ${language === "ts" ? "TypeScript" : "JavaScript"} · Primary: ${primaryColor} · Package manager: ${manager}`);
  console.log("");

  // 1. Library + icons. lucide-react is installed directly so it is importable
  //    in strict package managers (pnpm), where transitive deps are hidden.
  if (args["skip-install"]) {
    const missing = [];
    if (!(await readInstalledVersion(cwd, "@neuctra/ui"))) missing.push("@neuctra/ui");
    if (!(await readInstalledVersion(cwd, "lucide-react"))) missing.push("lucide-react");
    if (missing.length) manual.push(`Install: ${manager === "npm" ? "npm install" : `${manager} add`} ${missing.join(" ")}`);
  } else {
    await step("Installing @neuctra/ui and lucide-react", async () => {
      install(cwd, manager, ["@neuctra/ui@latest", "lucide-react"]);
      const version = await readInstalledVersion(cwd, "@neuctra/ui");
      changes.push(`Installed @neuctra/ui ${version ?? ""}`.trim());
      return { message: `@neuctra/ui ${version ?? ""} installed`.trim() };
    });
  }

  // 2. React 18+ and Tailwind CSS v4 wired into the bundler.
  await step("Checking React", () => ensureReact({ cwd, manager, skipInstall: args["skip-install"] }));
  const tailwind = await step("Setting up Tailwind CSS v4", () => ensureTailwind({ cwd, manager, framework, skipInstall: args["skip-install"] }));
  changes.push(...tailwind.changes);
  manual.push(...tailwind.manual);

  // 3. Global stylesheet: found (or created) and imported by the app root.
  const css = await step("Locating the global stylesheet", async () => {
    const result = await resolveCssFile({ cwd, framework, cssOption: args.css });
    const rel = path.relative(cwd, result.cssFile);
    if (result.created) changes.push(`Created ${rel}`);
    if (result.importAdded) changes.push(`Imported ${rel} in ${path.relative(cwd, result.entryFile)}`);
    return { ...result, message: `Stylesheet: ${rel}` };
  });

  await step("Writing theme tokens", async () => {
    const result = await updateCssFile(css.cssFile, cwd, primaryColor);
    const rel = path.relative(cwd, css.cssFile);
    if (result.updated) {
      changes.push(`${result.replacedBlock ? "Updated" : "Added"} the Neuctra theme in ${rel}${result.backup ? ` (backup: ${path.basename(result.backup)})` : ""}`);
      changes.push(...result.notes);
    }
    return { message: result.updated ? `Theme tokens written to ${rel}` : `Theme tokens already up to date in ${rel}` };
  });

  // 4. ThemeProvider + ToastProvider from @neuctra/ui, plus the no-flash script.
  const frameworkResult = await step("Wiring ThemeProvider and ToastProvider", async () => {
    const result = await setupFramework({ cwd, framework, language, entryFile: css.entryFile });
    return { ...result, message: "Providers wired" };
  });
  changes.push(...frameworkResult.changes);
  manual.push(...frameworkResult.manual);

  // Summary
  log.title("Setup complete");
  if (changes.length) {
    console.log(kleur.bold("Changed"));
    changes.forEach((c) => log.item(c));
    console.log("");
  }
  if (manual.length) {
    console.log(kleur.bold("Needs your attention"));
    manual.forEach((m) => log.todo(m));
    console.log("");
  }
  console.log(kleur.bold("Next"));
  console.log(kleur.gray(`  import { Button, ThemeToggleButton } from "@neuctra/ui";

  <ThemeToggleButton />           // reads the ThemeProvider, no props needed
  <Button>Get started</Button>`));
  console.log(kleur.gray("\n  Docs: https://ui.neuctra.com/docs · Backups of changed files end in .neuctra-backup\n"));
};
