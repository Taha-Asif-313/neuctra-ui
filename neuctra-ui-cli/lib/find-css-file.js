import fs from "fs-extra";
import path from "path";

export const findCSS = async (cwd) => {
  const files = [
    "app/globals.css",
    "src/index.css",
    "src/app.css",
    "index.css",
    "app/layout.css",
    "styles/globals.css",
  ];

  for (const file of files) {
    const full = path.join(cwd, file);
    if (await fs.pathExists(full)) return full;
  }

  return null;
};