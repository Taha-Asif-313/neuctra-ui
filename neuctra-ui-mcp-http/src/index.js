import { Hono } from "hono";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createServer } from "@neuctra/ui-mcp";
import registry from "@neuctra/ui-mcp/data/components.json";
import theme from "@neuctra/ui-mcp/data/theme.json";

const app = new Hono();

app.get("/", (c) =>
  c.text("neuctra-ui MCP server. Point your MCP client at POST /mcp."),
);

// Stateless: every call to createServer()+transport pairs a fresh server
// instance with a fresh transport for exactly one request. This server has
// no per-session state (every tool just reads the same static data), and
// the transport itself enforces this — a stateless transport throws if
// reused across more than one request, by design of the Streamable HTTP spec.
app.all("/mcp", async (c) => {
  const server = createServer({ registry, theme });
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  await server.connect(transport);
  return transport.handleRequest(c.req.raw);
});

export default app;
