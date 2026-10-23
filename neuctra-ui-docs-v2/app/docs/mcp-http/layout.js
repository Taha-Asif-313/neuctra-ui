import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";

const title = "Neuctra UI Remote MCP HTTP Server";
const description = "Connect Neuctra UI Assistant over Streamable HTTP or run the MCP HTTP server locally and deploy it to Cloudflare Workers.";
export const metadata = buildMetadata({ title, description, keywords: "Neuctra UI remote MCP, MCP HTTP server, Cloudflare Worker, Streamable HTTP MCP", path: "/docs/mcp-http" });
export default function Layout({ children }) { return <><JsonLd data={[breadcrumbSchema([{label:"Home",path:"/"},{label:"Docs",path:"/docs"},{label:"Remote MCP HTTP",path:"/docs/mcp-http"}]),techArticleSchema({name:title,description,path:"/docs/mcp-http"})]}/>{children}</>; }
