export function registerNeuctraUiThemeSetupTool(server, { theme }) {
  server.registerTool(
    "neuctra-ui-theme-setup",
    {
      title: "Get Neuctra UI theme setup",
      description:
        "Return the Neuctra UI theme setup configuration: semantic color tokens, Tailwind CSS theme mappings, and theme initialization guidance. Use this to configure the theme system; use neuctra-ui-setup to run the CLI initializer in a project.",
      inputSchema: {},
    },
    async () => {
      const { rules, antiAiLookRules, ...themeSetup } = theme;
      return {
        content: [{ type: "text", text: JSON.stringify(themeSetup, null, 2) }],
      };
    },
  );
}
