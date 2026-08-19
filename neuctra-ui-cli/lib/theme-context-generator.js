import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const detectTypeScript = async (cwd, srcPath) => {
  if (await fs.pathExists(path.join(cwd, "tsconfig.json"))) return true;

  const tsEntryCandidates = ["main.tsx", "main.ts", "index.tsx", "index.ts"];
  for (const candidate of tsEntryCandidates) {
    if (await fs.pathExists(path.join(srcPath, candidate))) return true;
  }

  return false;
};

export const generateThemeContextFile = async (srcPath, cwd = process.cwd()) => {
  const isTypeScript = await detectTypeScript(cwd, srcPath);
  const ext = isTypeScript ? "tsx" : "jsx";
  const otherExt = isTypeScript ? "jsx" : "tsx";

  const themeContextPath = path.join(srcPath, "contexts");
  const themeFilePath = path.join(themeContextPath, `ThemeContext.${ext}`);
  const otherFilePath = path.join(themeContextPath, `ThemeContext.${otherExt}`);

  if (await fs.pathExists(themeFilePath)) {
    return { created: false, path: themeFilePath };
  }

  if (await fs.pathExists(otherFilePath)) {
    return { created: false, path: otherFilePath };
  }

  await fs.ensureDir(themeContextPath);

  const templatePath = path.join(__dirname, "..", "templates", `ThemeContext.${ext}`);
  if (!(await fs.pathExists(templatePath))) {
    throw new Error(`Missing template: ${templatePath}`);
  }

  const content = await fs.readFile(templatePath, "utf-8");
  await fs.writeFile(themeFilePath, content);

  return { created: true, path: themeFilePath };
};
