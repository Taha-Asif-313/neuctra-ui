import fs from "fs-extra";
import path from "path";
import { generateThemeContextFile } from "./theme-context-generator.js";
import { updateMainEntryFile } from "./update-main.js";

const existsFirst = async (cwd, paths) => {
  for (const item of paths) if (await fs.pathExists(path.join(cwd, item))) return path.join(cwd, item);
  return null;
};

const findAppDir = async (cwd) => {
  const app = await existsFirst(cwd, ["src/app", "app"]);
  return app || path.join(cwd, "app");
};

const wrapRootFile = async (rootFile, contextImport, wrapper, element) => {
  if (!rootFile) return { updated: false, reason: "Framework root file not found" };
  let content = await fs.readFile(rootFile, "utf8");
  if (content.includes(`<${wrapper}>`)) return { updated: false, filePath: rootFile, reason: "Already wrapped" };
  const importLine = `import { ${wrapper} } from "${contextImport}";`;
  if (!content.includes(importLine)) content = `${importLine}\n${content}`;
  const wrapped = element(content);
  if (!wrapped) return { updated: false, filePath: rootFile, reason: "Could not find the framework root element" };
  await fs.writeFile(rootFile, content.replace(wrapped.before, wrapped.after));
  return { updated: true, filePath: rootFile };
};

export const setupFramework = async ({ cwd, framework, language = "js" }) => {
  if (framework === "vite") {
    const srcPath = (await existsFirst(cwd, ["src"])) || path.join(cwd, "src");
    const context = await generateThemeContextFile(srcPath, cwd, language);
    return { context, provider: await updateMainEntryFile(srcPath) };
  }

  const appDir = await findAppDir(cwd);
  const context = await generateThemeContextFile(appDir, cwd, language);
  const contextRel = (fromFile) => `./${path.relative(path.dirname(fromFile), context.path).replace(/\\/g, "/").replace(/\.(tsx|jsx)$/, "")}`;

  if (framework === "next") {
    const layout = await existsFirst(cwd, ["src/app/layout.tsx", "src/app/layout.jsx", "src/app/layout.js", "src/app/layout.ts", "app/layout.tsx", "app/layout.jsx", "app/layout.js", "app/layout.ts"]);
    if (!layout) return { context, provider: { updated: false, reason: "Next.js App Router layout not found" } };
    const ext = language === "ts" ? "tsx" : "jsx";
    const providersPath = path.join(appDir, `providers.${ext}`);
    const contextImport = contextRel(providersPath);
    const childrenType = language === "ts" ? ": { children: ReactNode }" : "";
    const providersContent = `"use client";\n\n${language === "ts" ? 'import type { ReactNode } from "react";\n' : ""}import { ThemeProvider } from "${contextImport}";\nimport { ToastProvider } from "@neuctra/ui";\n\nexport function Providers({ children }${childrenType}) {\n  return (\n    <ToastProvider>\n      <ThemeProvider>{children}</ThemeProvider>\n    </ToastProvider>\n  );\n}\n`;
    if (!(await fs.pathExists(providersPath))) await fs.writeFile(providersPath, providersContent);
    const providerImport = `import { Providers } from "./providers";`;
    let content = await fs.readFile(layout, "utf8");
    if (!content.includes("<Providers>")) {
      const bodyChildren = /(<body\b[^>]*>)([\s\S]*?)(<\/body>)/;
      if (!bodyChildren.test(content)) return { context, provider: { updated: false, filePath: layout, reason: "Could not find body in layout" } };
      content = content.replace(bodyChildren, (_, open, children, close) => `${open}\n        <Providers>${children.trim()}</Providers>\n      ${close}`);
      content = `${providerImport}\n${content}`;
      await fs.writeFile(layout, content);
      return { context, provider: { updated: true, filePath: layout, providersPath } };
    }
    return { context, provider: { updated: false, filePath: layout, reason: "Already wrapped", providersPath } };
  }

  const rootFile = framework === "remix"
    ? await existsFirst(cwd, ["app/root.tsx", "app/root.jsx", "app/root.js", "app/root.ts"])
    : await existsFirst(cwd, ["src/root.tsx", "src/root.jsx", "src/root.js", "src/root.ts", "app/root.tsx", "app/root.jsx", "app/root.js", "app/root.ts"]);
  if (!rootFile) return { context, provider: { updated: false, reason: `${framework} root route file not found` } };
  const rel = contextRel(rootFile);
  const result = await wrapRootFile(rootFile, rel, "ThemeProvider", (content) => {
    const match = content.match(/<Outlet\s*\/>|<Outlet\s*><\/Outlet>/);
    if (!match) return null;
    return { before: match[0], after: `<ToastProvider><ThemeProvider>${match[0]}</ThemeProvider></ToastProvider>` };
  });
  if (result.updated) {
    let content = await fs.readFile(rootFile, "utf8");
    if (!content.includes('from "@neuctra/ui"')) content = `import { ToastProvider } from "@neuctra/ui";\n${content}`;
    await fs.writeFile(rootFile, content);
  }
  return { context, provider: result };
};
