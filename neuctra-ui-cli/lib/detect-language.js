import fs from "fs-extra";
import path from "path";

export const detectLanguage = async (cwd) => {
  const candidates = [
    "tsconfig.json", "src/main.tsx", "src/main.ts", "src/index.tsx", "src/index.ts",
    "src/app/layout.tsx", "app/layout.tsx", "app/root.tsx", "src/root.tsx",
  ];
  for (const candidate of candidates) {
    if (await fs.pathExists(path.join(cwd, candidate))) return "ts";
  }
  return "js";
};
