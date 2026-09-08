// Runs as a "prebuild" npm script, before `next build`. Writes public/llms.txt
// — a plain-text index of the site for LLM/answer-engine crawlers (the
// emerging "GEO" convention: https://llmstxt.org). Sourced from the same
// lib/docsNav.js used by the Sidebar and next-sitemap, so it can't drift
// from the real route list.
const fs = require("node:fs");
const path = require("node:path");
const { sidebarSections } = require("../lib/docsNav");

const SITE_URL = "https://ui.neuctra.com";
const OUT_FILE = path.join(__dirname, "..", "public", "llms.txt");

function buildLlmsTxt() {
  const lines = [];

  lines.push("# Neuctra UI");
  lines.push("");
  lines.push(
    "> Neuctra UI is a React component library for building SaaS dashboards and " +
      "applications, styled with Tailwind CSS. This file indexes the documentation " +
      "site for LLMs and AI coding assistants.",
  );
  lines.push("");
  lines.push(`Docs home: ${SITE_URL}/docs`);
  lines.push(`Full setup guide: ${SITE_URL}/docs/full-setup`);
  lines.push(`MCP server (AI tool integration): ${SITE_URL}/docs/mcp`);
  lines.push("");

  for (const section of sidebarSections) {
    if (section.title === "Resources") continue;
    lines.push(`## ${section.title}`);
    lines.push("");
    for (const link of section.links) {
      lines.push(`- [${link.label}](${SITE_URL}${link.href})`);
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, buildLlmsTxt(), "utf8");
console.log(`Wrote ${path.relative(process.cwd(), OUT_FILE)}`);
