import fs from "fs-extra";
import path from "path";
import { findCSS } from "../lib/find-css-file.js";
import { findSrcPath } from "../lib/find-src-path.js";
import { installPackage } from "../lib/install-package.js";
import { generateThemeContextFile } from "../lib/theme-context-generator.js";
import { updateCssFile } from "../lib/update-css.js";
import { updateMainEntryFile } from "../lib/update-main.js";

export const init = async () => {
  const cwd = process.cwd();

  console.log("\n🚀 Initializing Neuctra UI...\n");

  try {
    await installPackage("@neuctra/ui");
    const cssFile = await findCSS(cwd);

    if (!cssFile) {
      console.error(
        "❌ No CSS file found. Please create a CSS file in one of these locations:",
      );
      console.error("   - src/index.css");
      console.error("   - src/app.css");
      console.error("   - app/globals.css");
      console.error("   - index.css\n");
      process.exit(1);
    }

    const { updated } = await updateCssFile(cssFile);

    if (updated) {
      const relativePath = path.relative(cwd, cssFile);
      console.log(`✅ Updated: ${relativePath}`);
    } else {
      console.log("⚠️  Already configured. No changes made.");
    }

    // =============================
    // GENERATE THEME CONTEXT
    // =============================
    const srcPath = await findSrcPath(cwd);
    const themeContext = await generateThemeContextFile(srcPath);

    if (themeContext.created) {
      const relativePath = path.relative(cwd, themeContext.path);
      console.log(`✅ Created: ${relativePath}`);
    }

    const mainUpdate = await updateMainEntryFile(srcPath);
    if (mainUpdate.updated) {
      const relativePath = path.relative(cwd, mainUpdate.filePath);
      console.log(`✅ Wrapped entrypoint with ThemeProvider: ${relativePath}`);
    } else if (mainUpdate.filePath) {
      const relativePath = path.relative(cwd, mainUpdate.filePath);
      console.log(`⚠️  Entry file found but not updated: ${relativePath}`);
      console.log(`   Reason: ${mainUpdate.reason}`);
    } else {
      console.log("⚠️  No main entry file found to auto-wrap with ThemeProvider.");
      console.log("   Please add ThemeProvider manually to your main.jsx/main.js or App.jsx/App.js.");
    }

    console.log(
      "\n✨ Setup complete! Your CSS file is now configured for Neuctra UI.",
    );
    console.log("\n📚 Next steps:");
    console.log("   1. Wrap your App with ThemeProvider:");
    console.log("");
    console.log("      // main.jsx or App.jsx");
    console.log(
      '      import { ThemeProvider } from "./contexts/ThemeContext";',
    );
    console.log("");
    console.log("      function App() {");
    console.log("        return (");
    console.log("          <ThemeProvider>");
    console.log("            <YourAppContent />");
    console.log("          </ThemeProvider>");
    console.log("        );");
    console.log("      }");
    console.log("");
    console.log("   2. Use theme hook in your components:");
    console.log("");
    console.log('      import { useTheme } from "./contexts/ThemeContext";');
    console.log("");
    console.log("      export function ThemeToggle() {");
    console.log("        const { isDark, toggleTheme } = useTheme();");
    console.log("        return (");
    console.log("          <button onClick={toggleTheme}>");
    console.log("            {isDark ? '☀️ Light' : '🌙 Dark'}");
    console.log("          </button>");
    console.log("        );");
    console.log("      }");
    console.log("");
    console.log("   3. Features:");
    console.log("      ✨ Auto-detects system theme preference");
    console.log("      ✨ Persists user choice to localStorage");
    console.log("      ✨ Easy theme toggle hook");
    console.log("      ✨ Syncs with .dark class on document\n");
    console.log("🎉 Happy coding!\n");
  } catch (error) {
    console.error("❌ Error during initialization:", error.message);
    process.exit(1);
  }
};
