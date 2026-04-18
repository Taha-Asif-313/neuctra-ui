import { execSync } from "child_process";
import ora from "ora";
import kleur from "kleur";

export const installPackage = async (packageName) => {
  const spinner = ora({
    text: `Installing ${kleur.bold(packageName)}...`,
    spinner: "dots",
  }).start();

  try {
    execSync(`npm install ${packageName}`, { stdio: "ignore" });

    spinner.succeed(kleur.green(`${packageName} installed`));
  } catch (error) {
    spinner.fail(kleur.red(`Failed to install ${packageName}`));
    console.log(kleur.gray(`Run manually: npm install ${packageName}`));
  }
};