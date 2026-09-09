// Runs as part of the "postbuild" chain, right after next-sitemap.
//
// next-sitemap is configured (see next-sitemap.config.js) to write
// sitemap.xml/sitemap-0.xml/robots.txt into ./public instead of ./out, so
// they're checked into the repo like llms.txt rather than only existing
// inside the gitignored build output. But next-sitemap necessarily runs
// after `next build` (it discovers routes from the finished build), and by
// then ./out is already a standalone copy of ./public taken during the
// build step — writing into ./public afterward doesn't reach it. This
// copies the 3 files next-sitemap just generated into ./out too, so the
// actual static export still serves them.
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const OUT_DIR = path.join(__dirname, "..", "out");

const FILES = ["sitemap.xml", "sitemap-0.xml", "robots.txt"];

if (!fs.existsSync(OUT_DIR)) {
  console.error(`copy-seo-files-to-out: ${OUT_DIR} doesn't exist — run "next build" first.`);
  process.exit(1);
}

for (const file of FILES) {
  const src = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(src)) {
    console.error(`copy-seo-files-to-out: missing ${src} — did next-sitemap run first?`);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(OUT_DIR, file));
  console.log(`copy-seo-files-to-out: copied ${file} -> out/`);
}
