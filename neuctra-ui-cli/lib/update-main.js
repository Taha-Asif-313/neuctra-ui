import fs from "fs-extra";
import path from "path";

const ENTRY_CANDIDATES = [
  "main.jsx",
  "main.tsx",
  "main.js",
  "main.ts",
  "index.jsx",
  "index.tsx",
  "index.js",
  "index.ts",
];

// ✅ flexible import detection
const hasThemeImport = (content) =>
  /ThemeProvider\s*from\s*["']\.\/contexts\/ThemeContext["']/.test(content);

const hasToastImport = (content) =>
  /ToastProvider\s*from\s*["']@neuctra\/ui["']/.test(content);

// =============================
// INSERT IMPORT SAFELY
// =============================
const insertThemeImport = (content) => {
  if (hasThemeImport(content)) return content;

  const importStatement =
    'import { ThemeProvider } from "./contexts/ThemeContext";\n';

  const importMatch = content.match(/^(?:import[^\n]*\n)+/);

  if (importMatch) {
    const index = importMatch[0].length;
    return content.slice(0, index) + importStatement + content.slice(index);
  }

  return importStatement + content;
};

const insertToastImport = (content) => {
  if (hasToastImport(content)) return content;

  const importStatement = 'import { ToastProvider } from "@neuctra/ui";\n';

  const importMatch = content.match(/^(?:import[^\n]*\n)+/);

  if (importMatch) {
    const index = importMatch[0].length;
    return content.slice(0, index) + importStatement + content.slice(index);
  }

  return importStatement + content;
};

// =============================
// CHECK WRAP ALREADY EXISTS
// =============================
const isAlreadyWrapped = (content) =>
  content.includes("<ToastProvider>") && content.includes("<ThemeProvider>");

// =============================
// WRAP ROOT SAFE (MULTI PATTERN)
// =============================
const wrapRenderTree = (content) => {
  if (isAlreadyWrapped(content)) {
    return { content, updated: false };
  }

  let updated = false;
  let newContent = content;

  // Vite style: createRoot(...).render(...)
  newContent = newContent.replace(
    /(root\.render\s*\(\s*)(<[^>]+>[\s\S]*<\/[^>]+>|<[^>]+\/>)(\s*\))/,
    (match, start, app) => {
      updated = true;
      return `${start}<ToastProvider><ThemeProvider>${app}</ThemeProvider></ToastProvider>)`;
    }
  );

  // StrictMode style
  newContent = newContent.replace(
    /(<StrictMode>)([\s\S]*?)(<\/StrictMode>)/,
    (match, open, inner, close) => {
      if (inner.includes("<ToastProvider>") || inner.includes("<ThemeProvider>")) return match;
      updated = true;
      return `${open}<ToastProvider><ThemeProvider>${inner}</ThemeProvider></ToastProvider>${close}`;
    }
  );

  // fallback App render
  newContent = newContent.replace(
    /(render\s*\(\s*)(<App\b[\s\S]*?<\/App>|<App\b[^>]*\/>)(\s*\))/,
    (match, start, app) => {
      updated = true;
      return `${start}<ToastProvider><ThemeProvider>${app}</ThemeProvider></ToastProvider>)`;
    }
  );

  return { content: newContent, updated };
};

// =============================
// FIND ENTRY FILE
// =============================
const findEntryFile = async (srcPath) => {
  for (const candidate of ENTRY_CANDIDATES) {
    const filePath = path.join(srcPath, candidate);
    if (await fs.pathExists(filePath)) return filePath;
  }
  return null;
};

// =============================
// MAIN FUNCTION
// =============================
export const updateMainEntryFile = async (srcPath) => {
  const entryFile = await findEntryFile(srcPath);

  if (!entryFile) {
    return { updated: false, reason: "No entry file found" };
  }

  let content = await fs.readFile(entryFile, "utf-8");
  const original = content;

  // already wrapped
  if (isAlreadyWrapped(content)) {
    return {
      updated: false,
      filePath: entryFile,
      reason: "ToastProvider and ThemeProvider already exist",
    };
  }

  // inject imports
  content = insertThemeImport(content);
  content = insertToastImport(content);

  // wrap app
  const wrapped = wrapRenderTree(content);
  content = wrapped.content;

  if (!wrapped.updated) {
    return {
      updated: false,
      filePath: entryFile,
      reason: "Could not detect render structure",
    };
  }

  if (content !== original) {
    await fs.writeFile(entryFile, content);
    return {
      updated: true,
      filePath: entryFile,
    };
  }

  return {
    updated: false,
    filePath: entryFile,
    reason: "No changes required",
  };
};