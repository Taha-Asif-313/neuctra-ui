import readline from "readline";
import kleur from "kleur";

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

const colorSwatch = (hex) => {
  if (!hex || hex === "custom") return "";
  const normalized = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;
  const channels = normalized.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16));
  return `\x1b[48;2;${channels.join(";")}m  \x1b[0m`;
};

const selectOption = ({ title, options, defaultIndex = 0, input, output, formatOption = (option) => option.label }) => new Promise((resolve, reject) => {
  readline.emitKeypressEvents(input);
  const wasRaw = input.isRaw;
  let selected = defaultIndex;
  let finished = false;

  const draw = (moveUp = false) => {
    if (moveUp) output.write(`\x1b[${options.length}A\r\x1b[J`);
    options.forEach((option, index) => {
      const marker = index === selected ? kleur.cyan().bold("❯") : " ";
      const label = formatOption(option);
      output.write(` ${marker} ${index === selected ? kleur.cyan().bold(label) : label}\n`);
    });
  };

  const cleanup = () => {
    if (finished) return;
    finished = true;
    input.removeListener("keypress", onKeypress);
    if (typeof input.setRawMode === "function") input.setRawMode(Boolean(wasRaw));
    output.write("\x1b[?25h");
  };

  const onKeypress = (_character, key = {}) => {
    if (key.ctrl && key.name === "c") {
      cleanup();
      output.write("\n");
      reject(new Error("Setup cancelled."));
      return;
    }
    if (key.name === "up" || key.name === "k") selected = (selected - 1 + options.length) % options.length;
    else if (key.name === "down" || key.name === "j") selected = (selected + 1) % options.length;
    else if (key.name === "return" || key.name === "enter") {
      cleanup();
      output.write("\n");
      resolve(options[selected]);
      return;
    } else return;
    draw(true);
  };

  output.write(`\n${kleur.bold(title)} ${kleur.gray("(↑/↓ to move, Enter to select)")}\n`);
  output.write("\x1b[?25l");
  draw();
  input.setRawMode(true);
  input.resume();
  input.on("keypress", onKeypress);
});

export const promptSetup = async ({ detectedFramework, detectedLanguage = "js", argv = process.argv.slice(3), input = process.stdin, output = process.stdout } = {}) => {
  const args = Object.fromEntries(argv.filter((arg) => arg.startsWith("--")).map((arg) => {
    const [key, ...value] = arg.slice(2).split("=");
    return [key, value.join("=") || true];
  }));
  const frameworkDefault = FRAMEWORKS.some(({ id }) => id === detectedFramework) ? detectedFramework : "next";
  const languageDefault = detectedLanguage === "ts" ? "ts" : "js";
  const colorDefault = "#00c214";
  const interactive = Boolean(input.isTTY && output.isTTY && !args.yes && !process.env.CI);

  if (!interactive) {
    const framework = args.framework || frameworkDefault;
    const language = args.language || languageDefault;
    const primaryColor = args["primary-color"] || colorDefault;
    if (!FRAMEWORKS.some(({ id }) => id === framework)) throw new Error(`Unsupported framework: ${framework}`);
    if (!["js", "ts"].includes(language)) throw new Error("Language must be js or ts.");
    if (!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(primaryColor)) throw new Error("Primary color must be a 3- or 6-digit hex color, such as #2563eb.");
    return { framework, language, primaryColor };
  }

  try {
    const frameworkOption = await selectOption({
      title: "Choose your React framework",
      options: FRAMEWORKS.map((item) => ({ ...item, detected: item.id === frameworkDefault })),
      defaultIndex: Math.max(0, FRAMEWORKS.findIndex(({ id }) => id === frameworkDefault)), input, output,
      formatOption: ({ label, detected }) => `${label}${detected ? kleur.gray(" · detected/default") : ""}`,
    });
    const languageOption = await selectOption({
      title: "Choose JavaScript or TypeScript",
      options: [{ id: "js", label: "JavaScript" }, { id: "ts", label: "TypeScript" }],
      defaultIndex: languageDefault === "ts" ? 1 : 0, input, output,
    });
    const colorOption = await selectOption({
      title: "Choose a primary color",
      options: COLORS,
      defaultIndex: 0, input, output,
      formatOption: ({ label, value }) => value === "custom"
        ? label
        : `${colorSwatch(value)}  ${label}  ${kleur.gray(value)}${value === colorDefault ? kleur.gray(" · default") : ""}`,
    });

    let primaryColor = colorOption.value;
    if (primaryColor === "custom") {
      const rl = readline.createInterface({ input, output });
      try {
        while (!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(primaryColor)) {
          primaryColor = (await ask(rl, "Enter a hex color (for example #2563eb): ")).trim();
          if (!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(primaryColor)) output.write("Enter a valid 3- or 6-digit hex color.\n");
        }
      } finally {
        rl.close();
      }
    }
    return { framework: frameworkOption.id, language: languageOption.id, primaryColor };
  } finally {
    if (typeof input.setRawMode === "function" && input.isRaw) input.setRawMode(false);
  }
};
