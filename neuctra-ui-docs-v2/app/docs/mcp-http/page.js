import Link from "next/link";
import { Globe, Terminal, Cloud, ArrowRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";

const endpoint = "https://mcp.ui.neuctra.com/mcp";
export default function HttpMcpPage() {
  return <div className="min-h-screen space-y-10">
    <header className="space-y-4"><div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-zinc-300"><Globe size={14} className="text-primary"/> Hosted connection</div><h1 className="text-4xl font-bold">Remote MCP over HTTP</h1><p className="max-w-3xl text-zinc-300 leading-7">Use the hosted Neuctra UI MCP endpoint from a compatible client, or deploy the HTTP server package as your own Cloudflare Worker. It exposes the same Neuctra UI assistant tools as the local MCP package.</p></header>
    <section className="space-y-4"><h2 className="text-xl font-semibold">Connect to the hosted server</h2><p className="text-sm leading-6 text-zinc-300">Add this Streamable HTTP endpoint in your AI tool&apos;s remote MCP settings:</p><CodeBlock language="text" code={endpoint}/><p className="text-sm text-zinc-400">For client-specific connection instructions, see the <Link href="/docs/mcp" className="text-primary underline">MCP setup guide</Link>.</p></section>
    <section className="space-y-4"><h2 className="text-xl font-semibold">Connect with a JSON configuration</h2><CodeBlock language="json" code={`{
  "mcpServers": {
    "neuctra-ui": {
      "url": "${endpoint}"
    }
  }
}`} /><p className="text-sm leading-6 text-zinc-400">Client configuration keys vary. Use the endpoint value in the remote server or connector settings your client provides.</p></section>
    <section className="space-y-4"><h2 className="text-xl font-semibold">Run the HTTP server locally</h2><p className="text-sm text-zinc-300">The HTTP package is a Cloudflare Worker app that imports the published MCP server package. Start its local Workers runtime with:</p><CodeBlock language="bash" code={`cd neuctra-ui-mcp-http\nnpm install\nnpm run dev`} /><p className="text-sm text-zinc-400">The local endpoint defaults to <code className="text-primary">http://localhost:8787/mcp</code>. It uses stateless Streamable HTTP transport and creates a fresh MCP server for each request.</p></section>
    <section className="space-y-4"><h2 className="text-xl font-semibold">Deploy your own Worker</h2><CodeBlock language="bash" code={`npx wrangler login\nnpm run deploy`} /><p className="text-sm leading-6 text-zinc-400">The Worker package handles HTTP transport and hosting. Tool behavior and component registry data live in <code className="text-primary">@neuctra/ui-mcp</code>; update that dependency to pick up a published MCP release.</p><div className="rounded-xl border border-border p-5"><Cloud size={18} className="mb-3 text-primary"/><h3 className="font-semibold">When to use HTTP</h3><p className="mt-2 text-sm leading-6 text-zinc-400">Choose HTTP when a client supports remote MCP endpoints or when you want to serve the tools without asking every user to launch a local stdio process. The server provides public UI reference data and currently has no authentication.</p></div><Link href="/docs/mcp" className="inline-flex items-center gap-2 text-sm text-primary">Compare local MCP setup <ArrowRight size={14}/></Link></section>
  </div>;
}
