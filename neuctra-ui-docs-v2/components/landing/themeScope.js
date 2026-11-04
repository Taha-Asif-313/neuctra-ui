// Tailwind resolves `--color-primary: var(--primary)` once, at :root, so
// overriding only `--primary` on an element would not reach utilities such as
// `bg-primary`. Setting both restyles everything inside one element.
export function themeScope(tokens) {
  return Object.fromEntries(
    Object.entries(tokens).flatMap(([name, value]) => [
      [`--${name}`, value],
      [`--color-${name}`, value],
    ]),
  );
}

// The primary colors offered by @neuctra/ui-cli.
export const BRAND_COLORS = [
  { label: "Neuctra Green", value: "#00c214" },
  { label: "Blue", value: "#2563eb" },
  { label: "Violet", value: "#7c3aed" },
  { label: "Rose", value: "#e11d48" },
  { label: "Amber", value: "#d97706" },
  { label: "Teal", value: "#0d9488" },
];

// The light theme from the @neuctra/ui README.
export const LIGHT_TOKENS = {
  background: "#ffffff",
  foreground: "#09090b",
  secondary: "#3f3f46",
  muted: "#f4f4f5",
  "muted-foreground": "#71717a",
  accent: "#e4e4e7",
  "accent-foreground": "#09090b",
  border: "#e4e4e7",
  input: "#f4f4f5",
  ring: "#a1a1aa",
  card: "#ffffff",
  "card-foreground": "#09090b",
  popover: "#ffffff",
  "popover-foreground": "#09090b",
  success: "#16a34a",
  warning: "#d97706",
};
