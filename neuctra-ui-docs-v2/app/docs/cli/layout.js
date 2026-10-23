import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";

const title = "Neuctra UI CLI - Install and Configure React Projects";
const description = "Set up Neuctra UI in Vite, Next.js App Router, Remix, or React Router with the official CLI, including theme styles and provider integration.";
export const metadata = buildMetadata({ title, description, keywords: "Neuctra UI CLI, install React UI library, @neuctra/ui-cli, setup Tailwind v4 React", path: "/docs/cli" });
export default function Layout({ children }) { return <><JsonLd data={[breadcrumbSchema([{label:"Home",path:"/"},{label:"Docs",path:"/docs"},{label:"Neuctra UI CLI",path:"/docs/cli"}]),techArticleSchema({name:title,description,path:"/docs/cli"})]}/>{children}</>; }
