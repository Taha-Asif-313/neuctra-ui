export const createUITool = (generateCompletion) => ({
  name: "ui-generator",
  description: "Generate React UI using provided components",
  func: async (input) => {
    const content = await generateCompletion(`
You are a senior React engineer.

Generate a clean React + Tailwind component.

Rules:
- use "use client"
- reuse given components if relevant
- clean structure
- modern UI

User Request:
${input}
    `);

    return content;
  },
});