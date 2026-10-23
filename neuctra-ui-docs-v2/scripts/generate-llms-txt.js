// Runs as a "prebuild" npm script, before `next build`. Writes public/llms.txt
// — a plain-text index of the site for LLM/answer-engine crawlers (the
// emerging "GEO" convention: https://llmstxt.org). Sourced from the same
// lib/docsNav.js used by the Sidebar and next-sitemap, so it can't drift
// from the real route list.
const fs = require("node:fs");
const path = require("node:path");
const { siteRoutes, sidebarSections } = require("../lib/docsNav");

const SITE_URL = "https://ui.neuctra.com";
const OUT_FILE = path.join(__dirname, "..", "public", "llms.txt");

function buildLlmsTxt() {
  const lines = [];

  lines.push("# Neuctra UI");
  lines.push("");
  lines.push(
    "> Neuctra UI is a developer toolkit with a React component library, project setup CLI, and MCP integrations that give compatible AI coding assistants structured UI knowledge. This file indexes the documentation site.",
  );
  lines.push("");
  lines.push(`Docs home: ${SITE_URL}/docs`);
  lines.push(`Full setup guide: ${SITE_URL}/docs/full-setup`);
  lines.push(`MCP server (AI tool integration): ${SITE_URL}/docs/mcp`);
  lines.push(`AI assistant overview: ${SITE_URL}/docs/ai-assistant`);
  lines.push(`Remote MCP over HTTP: ${SITE_URL}/docs/mcp-http`);
  lines.push(`Neuctra UI CLI: ${SITE_URL}/docs/cli`);
  lines.push(`Blog: ${SITE_URL}/blog`);
  lines.push(`Disclaimer: ${SITE_URL}/disclaimer`);
  lines.push("");

  lines.push("## Site Pages");
  lines.push("");
  for (const route of siteRoutes) {
    if (route.path === "/" || route.path === "/blog" || route.path === "/disclaimer") continue;
    lines.push(`- [${route.label}](${SITE_URL}${route.path})`);
  }
  lines.push(`- [Blog](${SITE_URL}/blog)`);
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
