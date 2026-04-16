import { execSync } from "child_process";

export const installPackage = async (packageName) => {
  try {
    console.log(`📦 Installing ${packageName}...`);
    execSync(`npm install ${packageName}`, { stdio: "inherit" });
    console.log(`✅ ${packageName} installed\n`);
  } catch (error) {
    console.warn(`⚠️  Could not install ${packageName}. Please install manually: npm install ${packageName}`);
  }
};