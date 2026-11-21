import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";

// Lockfile → package manager. Checked in this order so a repo that was
// migrated (and still has a stale package-lock.json) uses the newer tool.
const LOCKFILES = [
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["package-lock.json", "npm"],
];

export const detectPackageManager = async (cwd) => {
  for (const [file, manager] of LOCKFILES) {
    if (await fs.pathExists(path.join(cwd, file))) return manager;
  }
  // `npm_config_user_agent` is set when the CLI itself was started through
  // pnpm dlx / yarn dlx / bunx, which is a good hint for brand-new projects.
  const agent = process.env.npm_config_user_agent || "";
  if (agent.startsWith("pnpm")) return "pnpm";
  if (agent.startsWith("yarn")) return "yarn";
  if (agent.startsWith("bun")) return "bun";
  return "npm";
};

export const installCommand = (manager, packages, { dev = false } = {}) => {
  const list = packages.join(" ");
  switch (manager) {
    case "pnpm": return `pnpm add ${dev ? "-D " : ""}${list}`;
    case "yarn": return `yarn add ${dev ? "-D " : ""}${list}`;
    case "bun": return `bun add ${dev ? "-d " : ""}${list}`;
    default: return `npm install ${dev ? "-D " : ""}${list}`;
  }
};

/**
 * Installs packages and throws (with the exact command to run by hand) when
 * the install fails, so setup never continues on top of a missing dependency.
 */
export const install = (cwd, manager, packages, options = {}) => {
  const command = installCommand(manager, packages, options);
  try {
    execSync(command, {
      cwd,
      stdio: process.env.NEUCTRA_CLI_VERBOSE ? "inherit" : "pipe",
      shell: process.platform === "win32" ? "cmd.exe" : undefined,
      env: process.env,
    });
  } catch (error) {
    const output = [error.stdout, error.stderr].filter(Boolean).map(String).join("\n").trim();
    const tail = output.split("\n").slice(-12).join("\n");
    const err = new Error(`Install failed: ${command}${tail ? `\n${tail}` : ""}\nRun it manually, then run "npx @neuctra/ui-cli init" again.`);
    err.command = command;
    throw err;
  }
  return command;
};

export const readInstalledVersion = async (cwd, pkgName) => {
  const pkgJsonPath = path.join(cwd, "node_modules", ...pkgName.split("/"), "package.json");
  if (!(await fs.pathExists(pkgJsonPath))) return null;
  try {
    return (await fs.readJson(pkgJsonPath)).version || null;
  } catch {
    return null;
  }
};

export const majorVersion = (version) => {
  const match = version && String(version).match(/(\d+)\./);
  return match ? parseInt(match[1], 10) : null;
};
