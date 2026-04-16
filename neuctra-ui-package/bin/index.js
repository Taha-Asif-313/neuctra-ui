#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";

const cwd = process.cwd();

const detectTailwindVersion = async () => {
  const pkgPath = path.join(cwd, "package.json");

  if (!(await fs.pathExists(pkgPath))) return null;

  const pkg = await fs.readJson(pkgPath);
  const version =
    pkg.dependencies?.tailwindcss || pkg.devDependencies?.tailwindcss;

  if (!version) return null;

  if (version.startsWith("^4") || version.startsWith("4")) return 4;
  return 3;
};

const findGlobalCSS = async () => {
  const possible = [
    "app/globals.css",
    "src/index.css",
    "src/app.css",
    "index.css",
  ];

  for (const file of possible) {
    const full = path.join(cwd, file);
    if (await fs.pathExists(full)) return full;
  }

  return null;
};

const init = async () => {
  console.log("🚀 Initializing Neuctra UI...\n");

  const version = await detectTailwindVersion();

  if (!version) {
    console.log("❌ Tailwind not found. Please install Tailwind first.");
    process.exit(1);
  }

  const cssFile = await findGlobalCSS();

  if (!cssFile) {
    console.log("❌ No global CSS file found.");
    process.exit(1);
  }

  let content = await fs.readFile(cssFile, "utf-8");

  // =============================
  // TAILWIND v4
  // =============================
  if (version === 4) {
    if (!content.includes('@import "tailwindcss"')) {
      content = `@import "tailwindcss";\n` + content;
    }

    if (!content.includes("@source")) {
      content = content.replace(
        '@import "tailwindcss";',
        `@import "tailwindcss";\n@source "../node_modules/@neuctra/ui";`
      );
    }

    if (!content.includes("--primary")) {
      const theme = await fs.readFile(
        path.join(import.meta.dirname, "../templates/tailwind-v4.css"),
        "utf-8"
      );

      content += `\n\n${theme}`;
    }

    await fs.writeFile(cssFile, content);

    console.log("✅ Tailwind v4 detected");
    console.log("✅ @import + @source added");
    console.log("✅ Theme variables injected");
  }

  // =============================
  // TAILWIND v3
  // =============================
  else {
    if (!content.includes("@tailwind base")) {
      content =
        `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n` +
        content;
    }

    await fs.writeFile(cssFile, content);

    // Update config
    const configPath = path.join(cwd, "tailwind.config.js");

    if (await fs.pathExists(configPath)) {
      let config = await fs.readFile(configPath, "utf-8");

      if (!config.includes("@neuctra/ui")) {
        config = config.replace(
          "content: [",
          `content: [
    "./node_modules/@neuctra/ui/**/*.{js,ts,jsx,tsx}",`
        );

        await fs.writeFile(configPath, config);
      }
    }

    console.log("✅ Tailwind v3 detected");
    console.log("✅ Config updated");
  }

  console.log("\n🎉 Neuctra UI setup complete!");
};

const command = process.argv[2];

if (command === "init") {
  init();
} else {
  console.log("Usage: npx @neuctra/ui init");
}