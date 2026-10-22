import fs from "fs-extra";
import path from "path";

export const detectFramework = async (cwd) => {
  const pkg = await fs.readJson(path.join(cwd, "package.json")).catch(() => ({}));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps.next || await fs.pathExists(path.join(cwd, "next.config.js")) || await fs.pathExists(path.join(cwd, "next.config.mjs"))) return "next";
  if (deps["@remix-run/react"] || deps["@remix-run/dev"]) return "remix";
  if (deps["react-router"] || deps["@react-router/dev"]) return "react-router";
  if (deps.vite) return "vite";
  return null;
};
