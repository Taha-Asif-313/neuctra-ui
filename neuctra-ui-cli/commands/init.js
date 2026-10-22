import fs from "fs-extra";
import path from "path";
import kleur from "kleur";
import ora from "ora";

import { findCSS } from "../lib/find-css-file.js";
import { installPackage } from "../lib/install-package.js";
import { ensureReact, ensureTailwind } from "../lib/ensure-deps.js";
import { updateCssFile } from "../lib/update-css.js";
import { detectFramework } from "../lib/detect-framework.js";
import { detectLanguage } from "../lib/detect-language.js";
import { promptSetup } from "../lib/setup-prompts.js";
import { setupFramework } from "../lib/framework-setup.js";

// =============================
// LOGGER HELPERS
// =============================
const log = {
  title: (msg) => console.log("\n" + kleur.bold().cyan("◆ " + msg) + "\n"),
  success: (msg) => console.log(kleur.green("✔ " + msg)),
  warn: (msg) => console.log(kleur.yellow("⚠ " + msg)),
  error: (msg) => console.log(kleur.red("✖ " + msg)),
  info: (msg) => console.log(kleur.gray("ℹ " + msg)),
  space: () => console.log(""),
};

// =============================
// INIT
// =============================
export const init = async () => {
  const cwd = process.cwd();

  log.title("Neuctra UI Setup");

  try {
    const detectedFramework = await detectFramework(cwd);
    const detectedLanguage = await detectLanguage(cwd);
    const { framework, language, primaryColor } = await promptSetup({ detectedFramework, detectedLanguage });
    log.info(`Framework: ${framework} · Language: ${language === "ts" ? "TypeScript" : "JavaScript"} · Primary color: ${primaryColor}`);

    // =============================
    // INSTALL PACKAGE (already spinner inside)
    // =============================
    await installPackage("@neuctra/ui");

    log.space();

    // =============================
    // CHECK / INSTALL PEER DEPS (React >=18, Tailwind >=4)
    // =============================
    await ensureReact(cwd);
    await ensureTailwind(cwd);

    log.space();

    // =============================
    // FIND CSS
    // =============================
    const cssSpinner = ora("Locating CSS file...").start();
    const cssFile = await findCSS(cwd);

    if (!cssFile) {
      cssSpinner.fail("No CSS file found");

      log.info("Create one of the following:");
      console.log(kleur.gray(`
   - src/index.css
   - src/app.css
   - app/globals.css
   - index.css
      `));

      process.exit(1);
    }

    cssSpinner.succeed("CSS file found");

    // =============================
    // UPDATE CSS
    // =============================
    const updateSpinner = ora("Configuring CSS...").start();

    const { updated } = await updateCssFile(cssFile, cwd, primaryColor);
    const relativePath = path.relative(cwd, cssFile);

    if (updated) {
      updateSpinner.succeed(`CSS configured → ${relativePath}`);
    } else {
      updateSpinner.warn(`Already configured → ${relativePath}`);
    }

    log.space();

    // =============================
    // THEME SETUP
    // =============================
    const themeSpinner = ora("Setting up theme system...").start();

    const frameworkSetup = await setupFramework({ cwd, framework, language });
    const themeContext = frameworkSetup.context;

    if (themeContext.created) {
      const relativePath = path.relative(cwd, themeContext.path);
      themeSpinner.succeed(`Theme context created → ${relativePath}`);
    } else {
      themeSpinner.succeed("Theme system ready");
    }

    // =============================
    // UPDATE ENTRY FILE
    // =============================
    const entrySpinner = ora("Updating entry file...").start();

    const mainUpdate = frameworkSetup.provider;

    if (mainUpdate.updated) {
      const relativePath = path.relative(cwd, mainUpdate.filePath);
      entrySpinner.succeed(`ThemeProvider injected → ${relativePath}`);
    } else if (mainUpdate.filePath) {
      const relativePath = path.relative(cwd, mainUpdate.filePath);
      entrySpinner.warn(`Not updated → ${relativePath}`);
      log.info(`Reason: ${mainUpdate.reason}`);
    } else {
      entrySpinner.warn("No entry file found");
      log.info(`Wrap ThemeProvider manually in the ${framework} application root.`);
    }

    // =============================
    // DONE
    // =============================
    log.title("Setup Complete");

    log.success("Happy coding 🚀\n");

  } catch (error) {
    log.error("Initialization failed");
    console.error(kleur.red(error.message));
    process.exit(1);
  }
};
