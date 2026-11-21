#!/usr/bin/env node

import process from "process";
import { readFileSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));

const [major] = process.versions.node.split(".").map(Number);
if (major < 18) {
  console.error(`❌ @neuctra/ui-cli needs Node.js 18 or newer (you have ${process.versions.node}).`);
  process.exit(1);
}

const command = process.argv[2];

const showHelp = () => {
  console.log(`\nNeuctra UI CLI v${pkg.version}\n`);
  console.log("Usage:");
  console.log("  npx @neuctra/ui-cli init [options]\n");
  console.log("Sets up @neuctra/ui in an existing React project (Next.js App Router, Vite,");
  console.log("React Router or Remix): installs the library, configures Tailwind CSS v4,");
  console.log("writes the theme tokens into your global CSS (keeping your own styles),");
  console.log("and wraps the app in ThemeProvider + ToastProvider with no theme flash.\n");
  console.log("Commands:");
  console.log("  init                     Set up Neuctra UI in the current project");
  console.log("  -h, --help               Show this help");
  console.log("  -v, --version            Show the version\n");
  console.log("Options for init:");
  console.log("  -y, --yes                Use detected/default answers, no prompts");
  console.log("  --framework <id>         next | vite | react-router | remix");
  console.log("  --language <id>          ts | js");
  console.log("  --primary-color <hex>    Brand color, e.g. #2563eb (default #00c214)");
  console.log("  --css <path>             Global stylesheet to configure");
  console.log("  --skip-install           Do not install packages; print what to install\n");
  console.log("Examples:");
  console.log("  npx @neuctra/ui-cli init");
  console.log("  npx @neuctra/ui-cli init --yes --primary-color=#0f766e\n");
};

if (!command || command === "-h" || command === "--help") {
  showHelp();
  process.exit(0);
}

if (command === "-v" || command === "--version") {
  console.log(`v${pkg.version}`);
  process.exit(0);
}

if (command === "init") {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    showHelp();
    process.exit(0);
  }
  import(pathToFileURL(join(__dirname, "../commands/init.js")).href)
    .then((m) => m.init(process.argv.slice(3)))
    .catch((err) => {
      console.error(`\n❌ ${err.message}`);
      process.exit(1);
    });
} else {
  console.error(`❌ Unknown command: ${command}\n`);
  showHelp();
  process.exit(1);
}
