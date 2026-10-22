import readline from "readline";

export const FRAMEWORKS = [
  { id: "vite", label: "Vite React" },
  { id: "next", label: "Next.js App Router" },
  { id: "remix", label: "Remix" },
  { id: "react-router", label: "React Router" },
];

export const COLORS = [
  { label: "Neuctra Green", value: "#00c214" },
  { label: "Blue", value: "#2563eb" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Rose", value: "#e11d48" },
  { label: "Amber", value: "#d97706" },
  { label: "Teal", value: "#0d9488" },
  { label: "Custom hex color", value: "custom" },
];

const ask = (rl, question) => new Promise((resolve) => rl.question(question, resolve));

export const promptSetup = async ({ detectedFramework, argv = process.argv.slice(3), input = process.stdin, output = process.stdout } = {}) => {
  const args = Object.fromEntries(argv.filter((arg) => arg.startsWith("--")).map((arg) => {
    const [key, ...value] = arg.slice(2).split("=");
    return [key, value.join("=") || true];
  }));
  const frameworkDefault = FRAMEWORKS.some(({ id }) => id === detectedFramework) ? detectedFramework : "next";
  const colorDefault = "#00c214";
  const interactive = Boolean(input.isTTY && output.isTTY && !args.yes && !process.env.CI);

  if (!interactive) {
    const framework = args.framework || frameworkDefault;
    const primaryColor = args["primary-color"] || colorDefault;
    if (!FRAMEWORKS.some(({ id }) => id === framework)) throw new Error(`Unsupported framework: ${framework}`);
    if (!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(primaryColor)) throw new Error("Primary color must be a 3- or 6-digit hex color, such as #2563eb.");
    return { framework, primaryColor };
  }

  const rl = readline.createInterface({ input, output });
  try {
    output.write("\nChoose your React framework:\n");
    FRAMEWORKS.forEach(({ label, id }, i) => output.write(`  ${i + 1}. ${label}${id === frameworkDefault ? " (detected/default)" : ""}\n`));
    let framework;
    while (!framework) {
      const answer = (await ask(rl, `Framework [${FRAMEWORKS.findIndex(({ id }) => id === frameworkDefault) + 1}]: `)).trim();
      const chosen = answer ? FRAMEWORKS[Number(answer) - 1] || FRAMEWORKS.find(({ id }) => id === answer) : FRAMEWORKS.find(({ id }) => id === frameworkDefault);
      if (chosen) framework = chosen.id;
      else output.write("Choose a listed number or framework id.\n");
    }

    output.write("\nChoose a primary color:\n");
    COLORS.forEach(({ label, value }, i) => output.write(`  ${i + 1}. ${label}${value === colorDefault ? ` (${value}, default)` : value === "custom" ? "" : ` (${value})`}\n`));
    let primaryColor;
    while (!primaryColor) {
      const answer = (await ask(rl, "Primary color [1]: ")).trim();
      const choice = answer ? COLORS[Number(answer) - 1] : COLORS[0];
      if (choice?.value === "custom") {
        const custom = (await ask(rl, "Enter a hex color (for example #2563eb): ")).trim();
        if (/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(custom)) primaryColor = custom;
        else output.write("Enter a valid 3- or 6-digit hex color.\n");
      } else if (choice) primaryColor = choice.value;
      else if (/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(answer)) primaryColor = answer;
      else output.write("Choose a listed number or enter a 3- or 6-digit hex color.\n");
    }
    return { framework, primaryColor };
  } finally {
    rl.close();
  }
};
