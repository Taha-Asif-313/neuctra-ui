import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadDataFromDisk } from "./load-data.mjs";
import { registerNeuctraUiSetupTool } from "./tools/neuctra-ui-setup/register.mjs";
import { registerGetNeuctraUiComponentTool } from "./tools/get-neuctra-ui-component/index.mjs";
import { registerNeuctraUiPageBuilderTool } from "./tools/neuctra-ui-page-builder/index.mjs";
import { registerNeuctraUiDesignFromPromptTool } from "./tools/neuctra-ui-design-from-prompt/index.mjs";
import { registerValidateUiCodeTool } from "./tools/validate-ui-code/index.mjs";
import { registerCheckNeuctraUiRegistryTool } from "./tools/check-neuctra-ui-registry/index.mjs";
import { registerNeuctraUiThemeSetupTool } from "./tools/neuctra-ui-theme-setup/index.mjs";
import { registerGetDesignRulesTool } from "./tools/get-design-rules/index.mjs";
import { registerNeuctraUiSeoSetupTool } from "./tools/neuctra-ui-seo-setup/index.mjs";
import { registerNeuctraUiLandingDesignTool } from "./tools/neuctra-ui-landing-design/index.mjs";

// Component design rules now live with the components. Expose them to the
// design-rules tools under the legacy "components" block so callers that ask
// for that block (including the page builder) keep receiving the same rules.
function withEmbeddedComponentRules(data) {
  const componentRules = data.registry?.search?.componentRules ?? [];
  if (!componentRules.length || data.aiDesignRules?.blocks?.components?.length) return data;
  return {
    ...data,
    aiDesignRules: {
      ...data.aiDesignRules,
      blocks: {
        ...(data.aiDesignRules?.blocks ?? {}),
        components: componentRules,
      },
    },
  };
}

export function createServer(inputData = loadDataFromDisk()) {
  const data = withEmbeddedComponentRules(inputData);
  const server = new McpServer({ name: "neuctra-ui", version: "0.5.0" });

  registerNeuctraUiSetupTool(server);
  registerGetNeuctraUiComponentTool(server, data.registry);
  registerNeuctraUiPageBuilderTool(server, data);
  registerNeuctraUiDesignFromPromptTool(server, data);
  registerValidateUiCodeTool(server, data);
  registerCheckNeuctraUiRegistryTool(server, data);
  registerNeuctraUiThemeSetupTool(server, { theme: data.theme });
  registerGetDesignRulesTool(server, {
    theme: data.theme,
    aiDesignRules: data.aiDesignRules,
  });
  registerNeuctraUiSeoSetupTool(server, { seoGuide: data.seoGuide });

  // Callers that pass imported data, such as the hosted Worker, may not supply
  // these two files yet. Skip the tool rather than failing every request.
  if (data.landingDesign && data.landingPatterns) {
    registerNeuctraUiLandingDesignTool(server, {
      landingDesign: data.landingDesign,
      landingPatterns: data.landingPatterns,
    });
  }

  return server;
}
