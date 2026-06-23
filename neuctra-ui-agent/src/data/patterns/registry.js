const patternBase = [
  {
    name: "Hero Section",
    section: "Hero",
    description: "A focused top-of-page marketing hero with large heading, supporting copy, and CTA actions.",
    suggestedComponents: ["Container", "Text", "Button", "Image", "Badge"],
    designTokens: ["bg-background", "text-foreground", "bg-primary", "text-primary-foreground"],
    layoutHints: ["Use a two-column layout on desktop and stack on mobile.", "Keep one dominant CTA."],
    examplePrompt: "Create a SaaS hero section with clear value proposition and strong call to action.",
    exampleStructure: ["Container", "Text", "Button", "Image", "Badge"],
    promptTags: ["landing", "marketing", "hero"],
  },
  {
    name: "Pricing Section",
    section: "Pricing",
    description: "A pricing grid with clear plans, emphasized recommended tier, and conversion-focused CTA placement.",
    suggestedComponents: ["Container", "Badge", "Button", "Text", "Table"],
    designTokens: ["bg-background", "border-border", "bg-accent", "text-foreground"],
    layoutHints: ["Use three cards for standard SaaS pricing.", "Highlight the middle tier as recommended."],
    examplePrompt: "Create a pricing page with monthly and yearly plans.",
    exampleStructure: ["Container", "Text", "Badge", "Button"],
    promptTags: ["pricing", "plans", "subscription"],
  },
  {
    name: "Features Grid",
    section: "Features",
    description: "A responsive feature grid that highlights product capabilities with icons, short descriptions, and spacing.",
    suggestedComponents: ["Container", "Text", "Badge", "Image", "List"],
    designTokens: ["bg-background", "text-foreground", "text-muted-foreground"],
    layoutHints: ["Use 2 to 3 columns on desktop and single column on mobile."],
    examplePrompt: "Create a features grid for a modern product landing page.",
    exampleStructure: ["Container", "Text", "List"],
    promptTags: ["features", "grid", "capabilities"],
  },
  {
    name: "Testimonials",
    section: "Testimonials",
    description: "A trust-building testimonial strip or card grid with customer quotes and profile details.",
    suggestedComponents: ["Container", "Avatar", "Text", "Badge", "Card"],
    designTokens: ["bg-muted", "text-foreground", "border-border"],
    layoutHints: ["Pair quotes with avatars and short attribution."],
    examplePrompt: "Create a testimonials section with customer quotes.",
    exampleStructure: ["Container", "Avatar", "Text"],
    promptTags: ["social-proof", "testimonials", "reviews"],
  },
  {
    name: "Dashboard Layout",
    section: "Dashboard",
    description: "An admin dashboard shell with navigation, summary cards, and data presentation areas.",
    suggestedComponents: ["Container", "Drawer", "List", "Table", "Badge", "Avatar"],
    designTokens: ["bg-background", "bg-accent", "border-border", "text-foreground"],
    layoutHints: ["Use sidebar navigation and a dense main content area."],
    examplePrompt: "Create an admin dashboard with sidebar and metrics.",
    exampleStructure: ["Drawer", "List", "Table"],
    promptTags: ["dashboard", "admin", "analytics"],
  },
  {
    name: "Settings Page",
    section: "Settings",
    description: "A profile or app settings layout with form sections and clean spacing.",
    suggestedComponents: ["Container", "Input", "Textarea", "Select", "Switch", "Checkbox", "Button"],
    designTokens: ["bg-background", "border-border", "text-foreground"],
    layoutHints: ["Group related settings into visible sections.", "Use clear helper text for form controls."],
    examplePrompt: "Create a profile settings page with account and notification settings.",
    exampleStructure: ["Container", "Input", "Switch", "Button"],
    promptTags: ["settings", "profile", "forms"],
  },
  {
    name: "Login Form",
    section: "Login",
    description: "A focused authentication layout with email and password fields, trust cues, and a primary CTA.",
    suggestedComponents: ["Container", "Input", "Checkbox", "Button", "Text"],
    designTokens: ["bg-background", "text-foreground", "bg-primary", "text-primary-foreground"],
    layoutHints: ["Keep the form centered and visually compact.", "Use one strong submit CTA."],
    examplePrompt: "Create a modern login page.",
    exampleStructure: ["Container", "Input", "Button"],
    promptTags: ["auth", "login", "signin"],
  },
];

export const patternRegistry = patternBase.map((pattern) => ({
  ...pattern,
  documentType: "pattern",
  searchText: [
    pattern.name,
    pattern.section,
    pattern.description,
    pattern.suggestedComponents.join(" "),
    (pattern.designTokens ?? []).join(" "),
    (pattern.layoutHints ?? []).join(" "),
    (pattern.promptTags ?? []).join(" "),
  ]
    .filter(Boolean)
    .join("\n"),
}));

export function getPatternsBySection(section) {
  return patternRegistry.filter((pattern) => pattern.section.toLowerCase() === String(section ?? "").toLowerCase());
}