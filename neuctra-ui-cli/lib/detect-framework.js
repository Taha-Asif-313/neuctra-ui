import fs from "fs-extra";
import path from "path";

const exists = (cwd, file) => fs.pathExists(path.join(cwd, file));

/**
 * Returns "next" | "remix" | "react-router" | "vite" | null.
 *
 * React Router counts as the *framework* only when its dev tooling
 * (@react-router/dev) or a react-router.config file is present. A plain Vite
 * app that merely uses the react-router library for routing is still "vite";
 * treating it as the framework made setup look for a root.tsx that does not
 * exist.
 */
export const detectFramework = async (cwd) => {
  const pkg = await fs.readJson(path.join(cwd, "package.json")).catch(() => ({}));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  if (deps.next || (await exists(cwd, "next.config.js")) || (await exists(cwd, "next.config.mjs")) || (await exists(cwd, "next.config.ts"))) {
    return "next";
  }
  if (deps["@remix-run/react"] || deps["@remix-run/dev"]) return "remix";
  if (deps["@react-router/dev"] || (await exists(cwd, "react-router.config.ts")) || (await exists(cwd, "react-router.config.js"))) {
    return "react-router";
  }
  if (deps.vite || (await exists(cwd, "vite.config.js")) || (await exists(cwd, "vite.config.ts")) || (await exists(cwd, "vite.config.mjs"))) {
    return "vite";
  }
  return null;
};
