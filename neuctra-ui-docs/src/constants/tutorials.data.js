import {
  Home,
  LayoutDashboard,
  Shield,
  Bot,
  Plug,
} from "lucide-react";

export const tutorials = [
  {
    name: "Tutorial Home",
    path: "/tutorials",
    icon: Home,
    end: true,
  },
  {
    name: "Build Dashboard",
    path: "/tutorials/build-saas-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Authentication",
    path: "/tutorials/authentication",
    icon: Shield,
  },
  {
    name: "AI Chat App",
    path: "/tutorials/ai-chat-app",
    icon: Bot,
  },
  {
    name: "API Integration",
    path: "/tutorials/api-integration",
    icon: Plug,
  },
];