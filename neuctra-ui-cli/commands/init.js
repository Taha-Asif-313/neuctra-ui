import fs from "fs-extra";
import path from "path";
import kleur from "kleur";
import ora from "ora";

import { findCSS } from "../lib/find-css-file.js";
import { findSrcPath } from "../lib/find-src-path.js";
import { installPackage } from "../lib/install-package.js";
import { generateThemeContextFile } from "../lib/theme-context-generator.js";
import { updateCssFile } from "../lib/update-css.js";
import { updateMainEntryFile } from "../lib/update-main.js";

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
    // =============================
    // INSTALL PACKAGE (already spinner inside)
    // =============================
    await installPackage("@neuctra/ui");

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

    const { updated } = await updateCssFile(cssFile);
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

    const srcPath = await findSrcPath(cwd);
    const themeContext = await generateThemeContextFile(srcPath);

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

    const mainUpdate = await updateMainEntryFile(srcPath);

    if (mainUpdate.updated) {
      const relativePath = path.relative(cwd, mainUpdate.filePath);
      entrySpinner.succeed(`ThemeProvider injected → ${relativePath}`);
    } else if (mainUpdate.filePath) {
      const relativePath = path.relative(cwd, mainUpdate.filePath);
      entrySpinner.warn(`Not updated → ${relativePath}`);
      log.info(`Reason: ${mainUpdate.reason}`);
    } else {
      entrySpinner.warn("No entry file found");
      log.info("Wrap ThemeProvider manually in main.jsx or App.jsx");
    }

    // =============================
    // DONE
    // =============================
    log.title("Setup Complete");

    console.log(kleur.bold("Next Steps:\n"));

    console.log(kleur.cyan("1. Wrap your App:"));
    console.log(kleur.gray(`
   import { ThemeProvider } from "./contexts/ThemeContext";

   function App() {
     return (
       <ThemeProvider>
         <YourAppContent />
       </ThemeProvider>
     );
   }
    `));

    console.log(kleur.cyan("2. Use theme hook:"));
    console.log(kleur.gray(`
   import { useTheme } from "./contexts/ThemeContext";

   export function ThemeToggle() {
     const { isDark, toggleTheme } = useTheme();
     return (
       <button onClick={toggleTheme}>
         {isDark ? "☀ Light" : "🌙 Dark"}
       </button>
     );
   }
    `));

    console.log(kleur.cyan("3. Features:"));
    console.log(kleur.gray(`
   ✨ System theme detection
   💾 LocalStorage persistence
   🔁 Toggle hook
   🌗 .dark class sync
    `));

    log.success("Happy coding 🚀\n");

  } catch (error) {
    log.error("Initialization failed");
    console.error(kleur.red(error.message));
    process.exit(1);
  }
};