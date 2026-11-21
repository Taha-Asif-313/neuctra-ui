import fs from "fs-extra";

/**
 * Copies `file` to `file.neuctra-backup` the first time the CLI touches it.
 * Re-running setup never overwrites the original backup.
 * Returns the backup path, or null when the file does not exist.
 */
export const backupOnce = async (file) => {
  if (!(await fs.pathExists(file))) return null;
  const backup = `${file}.neuctra-backup`;
  if (!(await fs.pathExists(backup))) await fs.copy(file, backup);
  return backup;
};

/**
 * Inserts `line` after the last top-of-file import (or after a leading
 * "use client" directive), unless an equivalent line is already present.
 */
export const insertImport = (content, line, alreadyPresent = (c) => c.includes(line)) => {
  if (alreadyPresent(content)) return content;
  const imports = [...content.matchAll(/^import\s[\s\S]*?(?:from\s+)?["'][^"']+["'];?[ \t]*$/gm)];
  if (imports.length) {
    const last = imports[imports.length - 1];
    const end = last.index + last[0].length;
    return `${content.slice(0, end)}\n${line}${content.slice(end)}`;
  }
  const directive = content.match(/^\s*["']use (?:client|server)["'];?\s*\n/);
  if (directive) return content.slice(0, directive[0].length) + `${line}\n` + content.slice(directive[0].length);
  return `${line}\n${content}`;
};

/** True when `content` already imports `name` from `source`. */
export const importsFrom = (content, name, source) => {
  const escaped = source.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  const re = new RegExp(`import\\s*(?:type\\s*)?\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*["']${escaped}["']`);
  return re.test(content);
};

/** Adds `name` to an existing `import { ... } from "source"` or inserts a new import. */
export const addNamedImport = (content, name, source) => {
  if (importsFrom(content, name, source)) return content;
  const escaped = source.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  const existing = new RegExp(`import\\s*\\{([^}]*)\\}\\s*from\\s*["']${escaped}["'];?`);
  const match = content.match(existing);
  if (match) {
    const names = match[1].split(",").map((part) => part.trim()).filter(Boolean);
    names.push(name);
    return content.replace(existing, `import { ${names.join(", ")} } from "${source}";`);
  }
  return insertImport(content, `import { ${name} } from "${source}";`);
};
