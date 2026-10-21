import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadDataFromDisk } from "./load-data.mjs";
import { registerNeuctraUiSetupTool } from "./tools/neuctra-ui-setup/register.mjs";
import { registerGetNeuctraUiComponentTool } from "./tools/get-neuctra-ui-component/index.mjs";
import { registerNeuctraUiPageBuilderTool } from "./tools/neuctra-ui-page-builder/index.mjs";
import { registerNeuctraUiThemeSetupTool } from "./tools/neuctra-ui-theme-setup/index.mjs";
import { registerGetDesignRulesTool } from "./tools/get-design-rules/index.mjs";
import { registerNeuctraUiSeoSetupTool } from "./tools/neuctra-ui-seo-setup/index.mjs";

export function createServer(data = loadDataFromDisk()) {
  const server = new McpServer({ name: "neuctra-ui", version: "0.5.0" });

  registerNeuctraUiSetupTool(server);
  registerGetNeuctraUiComponentTool(server, data.registry);
  registerNeuctraUiPageBuilderTool(server, data);
  registerNeuctraUiThemeSetupTool(server, { theme: data.theme });
  registerGetDesignRulesTool(server, {
    theme: data.theme,
    aiDesignRules: data.aiDesignRules,
  });
  registerNeuctraUiSeoSetupTool(server, { seoGuide: data.seoGuide });

  return server;
}
