# neuctra-ui-mcp-http

The remote (HTTP) deployment of the Neuctra UI MCP server — the same tools as
`@neuctra/ui-mcp`, reachable at a URL instead of launched locally with `npx`. Deploys
as a Cloudflare Worker.

This is not an npm package (`"private": true`) — it is a small application meant to be
deployed, the same way `neuctra-ui-docs` is a folder that gets deployed to Vercel rather
than published to npm.

---

## What this is, and what it is not

This folder contains no tool logic of its own. It imports `createServer` from
`@neuctra/ui-mcp` (the published npm package — linked locally here via a `file:`
dependency in this repository) and wires it to an HTTP transport instead of the stdio
transport `bin/cli.mjs` uses there. If you need to change what a tool does, add a tool,
or update the component data, do it in `@neuctra/ui-mcp`, not here — see that package's
README ("For contributors" section) for how its data is generated and kept in sync.
This folder only ever needs to change when something about *how it's served over HTTP*
changes: auth, rate limiting, routing, the deployment target itself.

---

## Why Hono, and why Cloudflare Workers

Hono is built on the Fetch API (`Request`/`Response`) rather than Node's `http` module,
which is what lets the exact same code run on Cloudflare Workers, Vercel Edge, Deno, or
plain Node. `@modelcontextprotocol/sdk` ships a transport built for that same standard —
`WebStandardStreamableHTTPServerTransport` — so the two compose directly with no
adapter layer in between.

This server has no per-request session state: every tool call reads the same static
JSON regardless of who's asking. That happens to be exactly the shape serverless wants
(no persistent process to hold state between requests), which is why Workers is a
strong default here rather than a compromise.

### Why a fresh server per request

`WebStandardStreamableHTTPServerTransport` runs in one of two modes: stateful (it
tracks a session ID across multiple requests) or stateless (`sessionIdGenerator:
undefined`). This server uses stateless mode, and the transport enforces, by design,
that a stateless transport can only handle **one** request — reusing it across requests
would let one caller's in-flight response mix with another caller's message IDs. That's
why `src/index.js` constructs a new `createServer()` and a new transport inside the
route handler, on every request, rather than once at module load.

---

## Local development

```bash
npm install
npm run dev   # runs `wrangler dev` — starts the real Workers runtime locally
```

This runs the actual `workerd` runtime (the same one Cloudflare deploys to) on your
machine, not a Node simulation of it — so a request that works here will work once
deployed.

Try it:
```bash
curl -X POST http://localhost:8787/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_component","arguments":{"name":"Button"}}}'
```
(Default `wrangler dev` port is 8787 unless overridden with `--port`.)

---

## Deploying

```bash
npx wrangler login    # once, per machine — authenticates with your Cloudflare account
npm run deploy
```

This publishes the Worker to a `*.workers.dev` URL first. To put it behind
`mcp.ui.neuctra.com`:

1. Make sure the `ui.neuctra.com` zone is on Cloudflare (it needs to be, for Cloudflare
   to issue the route).
2. In the Cloudflare dashboard, add a DNS record for the `mcp` subdomain (or let step 3
   below manage it automatically, depending on your plan).
3. Uncomment the `routes` block in `wrangler.jsonc`:
   ```jsonc
   "routes": [
     { "pattern": "mcp.ui.neuctra.com/*", "custom_domain": true }
   ]
   ```
4. `npm run deploy` again.

---

## Connecting a client to the deployed server

Once live, any MCP client that supports remote servers points at the URL directly, no
local process involved:

```json
{
  "mcpServers": {
    "neuctra-ui": {
      "url": "https://mcp.ui.neuctra.com/mcp"
    }
  }
}
```

---

## What is intentionally not here yet

- **Auth.** The server is open — reasonable for what it serves (public component specs,
  no different from a public docs API), but worth revisiting if usage patterns change.
- **Rate limiting.** Cloudflare offers this at the platform level (WAF / rate limiting
  rules) without needing application code, which is the natural place to add it later.
- **CORS.** Not configured, since MCP clients call this server-side, not from browser
  JS. Add it in `src/index.js` with Hono's `cors` middleware if a browser-based client
  ever needs direct access.
