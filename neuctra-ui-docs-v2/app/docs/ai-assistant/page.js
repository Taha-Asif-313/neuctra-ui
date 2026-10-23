import Link from "next/link";
import { Bot, Boxes, Terminal, Globe, ArrowRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";

const options = [
  { icon: Terminal, title: "Local MCP server", href: "/docs/mcp", text: "Run @neuctra/ui-mcp on your computer over stdio. Your MCP client starts the process when needed." },
  { icon: Globe, title: "Hosted HTTP server", href: "/docs/mcp-http", text: "Connect to the hosted endpoint, or deploy the stateless HTTP server as a Cloudflare Worker." },
  { icon: Boxes, title: "Neuctra UI CLI", href: "/docs/cli", text: "Prepare a supported React project with the library, theme CSS, context, and provider integration." },
];

export default function AiAssistantPage() {
  return <div className="min-h-screen space-y-10">
    <header className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary"><Bot size={14}/> AI developer workflow</div>
      <h1 className="text-4xl font-bold text-white">Neuctra UI Assistant</h1>
      <p className="max-w-3xl text-zinc-300 leading-7">Neuctra UI is more than a React component library. Its MCP tools give compatible AI coding assistants structured knowledge they can use to plan interfaces, find components, inspect real APIs, follow design guidance, configure themes, and handle public page SEO.</p>
    </header>
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Choose how to connect</h2>
      <div className="grid gap-4 md:grid-cols-3">{options.map(({icon: Icon,title,href,text})=><Link key={href} href={href} className="rounded-xl border border-border bg-background/40 p-5 hover:border-primary/50"><Icon className="mb-4 text-primary" size={20}/><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p><span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">Read guide <ArrowRight size={14}/></span></Link>)}</div>
    </section>
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">What the assistant can access</h2>
      <ul className="grid gap-3 sm:grid-cols-2 text-sm text-zinc-300">
        {["Component names, categories, props, defaults, and examples","Search by interface need and inspect matching components","Semantic theme tokens and design rules","SEO, AEO, and GEO guidance for public pages","Page planning guidance for common product and content layouts"].map(x=><li key={x} className="rounded-lg border border-border p-4">{x}</li>)}
      </ul>
      <p className="text-sm leading-6 text-zinc-400">The assistant uses these references to inform its work. It still edits files through the coding environment and model provided by your chosen AI client. MCP works alongside a project; it does not require the project to be React, although the component registry itself describes the React library.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Start with a local connection</h2>
      <p className="text-sm text-zinc-300">For an MCP client that supports local stdio servers, add this entry to its MCP configuration:</p>
      <CodeBlock language="json" code={`{
  "mcpServers": {
    "neuctra-ui": {
      "command": "npx",
      "args": ["-y", "@neuctra/ui-mcp"]
    }
  }
}`} />
    </section>
  </div>;
}
