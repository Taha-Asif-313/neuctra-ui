import { execSync } from "child_process";
import ora from "ora";
import kleur from "kleur";
import { platform } from "os";

export const installPackage = async (packageName) => {
  const spinner = ora({
    text: `Installing ${kleur.bold(packageName)}...`,
    spinner: "dots",
  }).start();

  try {
    const isWindows = platform() === "win32";
    const shell = isWindows ? "cmd.exe" : undefined;
    const cmd = `npm install ${packageName}`;

    execSync(cmd, { 
      stdio: "ignore",
      shell: shell,
      ...(isWindows && { env: { ...process.env } })
    });

    spinner.succeed(kleur.green(`${packageName} installed`));
  } catch (error) {
    spinner.fail(kleur.red(`Failed to install ${packageName}`));
    console.log(kleur.gray(`Run manually: npm install ${packageName}`));
  }
};