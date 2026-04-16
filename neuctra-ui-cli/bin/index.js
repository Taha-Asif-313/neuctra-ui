#!/usr/bin/env node

import process from "process";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));

const command = process.argv[2];

const showHelp = () => {
  console.log(`\n📦 Neuctra UI CLI v${pkg.version}\n`);
  console.log("Usage:");
  console.log("  neuctra-ui <command> [options]\n");
  console.log("Commands:");
  console.log("  init              Initialize Neuctra UI in your project");
  console.log("  -h, --help        Show this help message");
  console.log("  -v, --version     Show version\n");
  console.log("Examples:");
  console.log("  npx @neuctra/cli init");
  console.log("  neuctra-ui init\n");
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
  import("../commands/init.js").then((m) => m.init()).catch((err) => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
} else {
  console.error(`❌ Unknown command: ${command}\n`);
  showHelp();
  process.exit(1);
}