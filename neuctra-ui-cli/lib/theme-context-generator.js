import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const generateThemeContextFile = async (srcPath) => {
  const themeContextPath = path.join(srcPath, "contexts");
  const themeFilePath = path.join(themeContextPath, "ThemeContext.jsx");

  if (await fs.pathExists(themeFilePath)) {
    return { created: false, path: themeFilePath };
  }

  await fs.ensureDir(themeContextPath);

  const templatePath = path.join(__dirname, "..", "templates", "ThemeContext.jsx");
  if (!(await fs.pathExists(templatePath))) {
    throw new Error(`Missing template: ${templatePath}`);
  }

  const content = await fs.readFile(templatePath, "utf-8");
  await fs.writeFile(themeFilePath, content);

  return { created: true, path: themeFilePath };
};