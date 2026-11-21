import fs from "fs-extra";
import path from "path";
import { insertImport } from "./fs-utils.js";

const firstExisting = async (cwd, names) => {
  for (const name of names) {
    const full = path.join(cwd, name);
    if (await fs.pathExists(full)) return full;
  }
  return null;
};

const withExts = (base) => ["tsx", "jsx", "ts", "js"].map((ext) => `${base}.${ext}`);

/** The file that owns the app root for each framework (where CSS and providers go). */
export const findEntryFile = async (cwd, framework) => {
  if (framework === "next") return firstExisting(cwd, [...withExts("src/app/layout"), ...withExts("app/layout")]);
  if (framework === "remix" || framework === "react-router") {
    return firstExisting(cwd, [...withExts("app/root"), ...withExts("src/root")]);
  }
  return firstExisting(cwd, [...withExts("src/main"), ...withExts("src/index"), ...withExts("main"), ...withExts("index")]);
};

const defaultCssFor = async (cwd, framework, entryFile) => {
  if (entryFile) {
    const dir = path.dirname(entryFile);
    if (framework === "next") return path.join(dir, "globals.css");
    if (framework === "remix" || framework === "react-router") return path.join(dir, "app.css");
    return path.join(dir, "index.css");
  }
  if (framework === "next") return path.join(cwd, (await fs.pathExists(path.join(cwd, "src/app"))) ? "src/app/globals.css" : "app/globals.css");
  if (framework === "remix" || framework === "react-router") return path.join(cwd, "app/app.css");
  return path.join(cwd, "src/index.css");
};

/** CSS files imported by the entry file, resolved to absolute paths that exist. */
const importedCss = async (entryFile) => {
  const content = await fs.readFile(entryFile, "utf8");
  const found = [];
  for (const match of content.matchAll(/import\s+(?:[\w{}\s,*]+\s+from\s+)?["']([^"']+\.css)(?:\?url)?["']/g)) {
    const spec = match[1];
    if (!spec.startsWith(".")) continue;
    const full = path.resolve(path.dirname(entryFile), spec);
    if (await fs.pathExists(full)) found.push(full);
  }
  return found;
};

/**
 * Finds the global stylesheet the app really loads. Preference order:
 *   1. an explicit --css path,
 *   2. a CSS file the entry/layout file already imports,
 *   3. a conventional location,
 *   4. a new file next to the entry, which is then imported by the entry.
 */
export const resolveCssFile = async ({ cwd, framework, cssOption }) => {
  const entryFile = await findEntryFile(cwd, framework);
  const result = { entryFile, cssFile: null, created: false, importAdded: false };

  if (cssOption) {
    result.cssFile = path.resolve(cwd, cssOption);
  } else if (entryFile) {
    const imported = await importedCss(entryFile);
    // Prefer the obvious global sheet when several are imported.
    result.cssFile = imported.find((file) => /(globals|index|app|tailwind|styles?)\.css$/.test(file)) ?? imported[0] ?? null;
  }
  if (!result.cssFile) {
    result.cssFile = await firstExisting(cwd, [
      "src/app/globals.css", "app/globals.css", "src/index.css", "src/app.css", "app/app.css",
      "app/tailwind.css", "src/styles/globals.css", "styles/globals.css", "index.css",
    ]);
  }
  if (!result.cssFile) result.cssFile = await defaultCssFor(cwd, framework, entryFile);

  if (!(await fs.pathExists(result.cssFile))) {
    await fs.ensureFile(result.cssFile);
    result.created = true;
  }

  // Make sure the entry actually loads the stylesheet; a perfectly configured
  // CSS file that nothing imports is the most common "styles don't work" bug.
  if (entryFile) {
    const content = await fs.readFile(entryFile, "utf8");
    let spec = path.relative(path.dirname(entryFile), result.cssFile).split(path.sep).join("/");
    if (!spec.startsWith(".")) spec = `./${spec}`;
    const alreadyImported = (await importedCss(entryFile)).includes(result.cssFile);
    if (!alreadyImported) {
      await fs.writeFile(entryFile, insertImport(content, `import "${spec}";`));
      result.importAdded = true;
    }
  }
  return result;
};
