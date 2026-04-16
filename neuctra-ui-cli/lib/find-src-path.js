import fs from "fs-extra";
import path from "path";

export const findSrcPath = async (cwd) => {
  const candidates = ["src", "app"];
  for (const candidate of candidates) {
    const full = path.join(cwd, candidate);
    if (await fs.pathExists(full)) return full;
  }

  return path.join(cwd, "src");
};