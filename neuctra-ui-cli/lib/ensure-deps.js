import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import { platform } from "os";
import ora from "ora";
import kleur from "kleur";

const MIN_REACT_MAJOR = 18;
const MIN_TAILWIND_MAJOR = 4;

const getInstalledVersion = async (cwd, pkgName) => {
  const pkgJsonPath = path.join(cwd, "node_modules", ...pkgName.split("/"), "package.json");
  if (!(await fs.pathExists(pkgJsonPath))) return null;

  const pkgJson = await fs.readJson(pkgJsonPath);
  return pkgJson.version || null;
};

const majorVersion = (version) => {
  const match = version && version.match(/^(\d+)\./);
  return match ? parseInt(match[1], 10) : null;
};

const runInstall = (packages, { dev = false } = {}) => {
  const isWindows = platform() === "win32";
  const shell = isWindows ? "cmd.exe" : undefined;
  const flag = dev ? "-D " : "";
  const cmd = `npm install ${flag}${packages.join(" ")}`;

  execSync(cmd, {
    stdio: "ignore",
    shell,
    ...(isWindows && { env: { ...process.env } }),
  });
};

// =============================
// REACT (peer dependency, >=18)
// =============================
export const ensureReact = async (cwd) => {
  const spinner = ora("Checking React...").start();

  const reactVersion = await getInstalledVersion(cwd, "react");
  const reactDomVersion = await getInstalledVersion(cwd, "react-dom");

  const outdated =
    majorVersion(reactVersion) === null || majorVersion(reactVersion) < MIN_REACT_MAJOR ||
    majorVersion(reactDomVersion) === null || majorVersion(reactDomVersion) < MIN_REACT_MAJOR;

  if (!outdated) {
    spinner.succeed(`React ${reactVersion} OK`);
    return { installed: false, version: reactVersion };
  }

  spinner.text = reactVersion
    ? `Upgrading React ${reactVersion} → latest...`
    : "Installing React...";

  try {
    runInstall(["react@latest", "react-dom@latest"]);
    const newVersion = await getInstalledVersion(cwd, "react");
    spinner.succeed(`React ${newVersion} ready`);
    return { installed: true, version: newVersion };
  } catch (error) {
    spinner.fail("Failed to install React");
    console.log(kleur.gray("Run manually: npm install react@latest react-dom@latest"));
    return { installed: false, version: reactVersion, error };
  }
};

// =============================
// TAILWIND CSS (>=4, required for @theme/@source/@custom-variant)
// =============================
export const ensureTailwind = async (cwd) => {
  const spinner = ora("Checking Tailwind CSS...").start();

  const tailwindVersion = await getInstalledVersion(cwd, "tailwindcss");
  const outdated = majorVersion(tailwindVersion) === null || majorVersion(tailwindVersion) < MIN_TAILWIND_MAJOR;

  if (!outdated) {
    spinner.succeed(`Tailwind CSS ${tailwindVersion} OK`);
    return { installed: false, version: tailwindVersion };
  }

  spinner.text = tailwindVersion
    ? `Upgrading Tailwind CSS ${tailwindVersion} → v4...`
    : "Installing Tailwind CSS v4...";

  try {
    runInstall(["tailwindcss@latest", "@tailwindcss/postcss@latest"], { dev: true });
    const newVersion = await getInstalledVersion(cwd, "tailwindcss");
    spinner.succeed(`Tailwind CSS ${newVersion} ready`);
    return { installed: true, version: newVersion };
  } catch (error) {
    spinner.fail("Failed to install Tailwind CSS");
    console.log(kleur.gray("Run manually: npm install -D tailwindcss@latest @tailwindcss/postcss@latest"));
    return { installed: false, version: tailwindVersion, error };
  }
};
