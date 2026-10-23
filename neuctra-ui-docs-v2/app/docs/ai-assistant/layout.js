import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";

const title = "Neuctra UI Assistant - AI Workflow and MCP Guide";
const description = "Connect compatible AI coding assistants to Neuctra UI using local or hosted MCP. Explore component discovery, design guidance, the CLI, and supported workflows.";
export const metadata = buildMetadata({ title, description, keywords: "Neuctra UI AI assistant, MCP coding assistant, local MCP server, React UI assistant, Neuctra MCP", path: "/docs/ai-assistant" });
export default function Layout({ children }) { return <><JsonLd data={[breadcrumbSchema([{label:"Home",path:"/"},{label:"Docs",path:"/docs"},{label:"AI Assistant",path:"/docs/ai-assistant"}]),techArticleSchema({name:title,description,path:"/docs/ai-assistant"})]}/>{children}</>; }
