import "dotenv/config";
import { generateUI } from "./src/services/generateUI.js";

const prompt =
  process.argv.slice(2).join(" ").trim() ||
  `Create a modern SaaS dashboard UI using Neuctra UI components. Use Lucide React icons throughout the interface and use high-quality Unsplash images only where they add meaningful visual value.

The dashboard should feel premium, modern, and production-ready, with strong visual hierarchy, generous spacing, clean card layouts, and excellent responsiveness across desktop, tablet, and mobile devices.

Include:

* Responsive sidebar navigation
* Top navigation bar with search, notifications, and user profile
* KPI/statistics cards
* Revenue, analytics, or performance charts
* Recent activity section
* Data table with realistic content
* Quick actions panel
* Team or user management widgets
* Project, task, or workflow overview cards
* Status indicators and progress tracking
* Empty states where appropriate

Design requirements:

* Follow modern SaaS design patterns
* Use subtle shadows and balanced spacing
* Use clean typography with clear hierarchy
* Make important metrics immediately visible
* Create visually appealing dashboard widgets
* Ensure all sections feel connected and cohesive
* Optimize layout for productivity and readability
* Avoid clutter and unnecessary decorations

Generate a complete dashboard experience that looks comparable to modern products such as analytics platforms, CRM systems, project management tools, or AI SaaS applications.`;
const result = await generateUI(prompt);

console.log(result.code);
