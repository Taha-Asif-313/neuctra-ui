// Single source of truth for site structure: every real route + the docs
// sidebar's section grouping. Consumed by components/Sidebar.js (nav UI),
// next-sitemap (route discovery/priority) and scripts/generate-llms-txt.js.
// CommonJS on purpose — next-sitemap.config.js and the prebuild script load
// this via plain `require()` outside of Next's bundler.

const siteRoutes = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/blog", label: "Blog" },
  { path: "/blog/react-saas-dashboard-components-cards-stats-tables", label: "Build a React SaaS dashboard with reusable UI components" },
  { path: "/blog/react-tailwind-dark-mode-semantic-theme-tokens", label: "Set up dark mode in React with Tailwind CSS theme tokens" },
  { path: "/blog/tailwind-v4-react-component-library-styles", label: "Fix missing Tailwind CSS styles in a React component library" },
  { path: "/blog/react-form-components-saas-signup-verification", label: "Compose React form components for SaaS signup and verification" },
  { path: "/blog/connect-neuctra-ui-to-your-ai-assistant", label: "Connect Neuctra UI to your AI coding assistant" },
  { path: "/blog/start-a-react-project-with-the-neuctra-ui-cli", label: "Start a React project with the Neuctra UI CLI" },
  { path: "/blog/get-reliable-results-from-component-documentation", label: "Get reliable results from component documentation" },
  { path: "/terms", label: "Terms of Service" },
  { path: "/privacypolicy", label: "Privacy Policy" },
  { path: "/disclaimer", label: "Disclaimer" },
];

// Mirrors the original Sidebar.jsx `navSections` array exactly (including
// the "About" link, which points at the top-level /about site page).
const sidebarSections = [
  {
    title: "Getting Started",
    links: [
      { label: "Overview", href: "/docs" },
      { label: "Full Setup Guide", href: "/docs/full-setup" },
      { label: "Theme Toggle", href: "/docs/theme-toggle" },
    ],
  },
  {
    title: "AI & Integrations",
    links: [
      { label: "AI Assistant Overview", href: "/docs/ai-assistant" },
      { label: "Neuctra UI MCP", href: "/docs/mcp" },
      { label: "Remote MCP (HTTP)", href: "/docs/mcp-http" },
      { label: "Neuctra UI CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Layout & Structure",
    links: [
      { label: "Container", href: "/docs/container" },
      { label: "Card", href: "/docs/card" },
      { label: "Divider", href: "/docs/divider" },
    ],
  },
  {
    title: "Typography & Media",
    links: [
      { label: "Text", href: "/docs/text" },
      { label: "Image", href: "/docs/image" },
      { label: "Avatar", href: "/docs/avatar" },
      { label: "Avatar Group", href: "/docs/avatar-group" },
      { label: "Badge", href: "/docs/badge" },
      { label: "Chip", href: "/docs/chip" },
      { label: "Kbd", href: "/docs/kbd" },
    ],
  },
  {
    title: "Data Display",
    links: [
      { label: "List", href: "/docs/list" },
      { label: "Table", href: "/docs/table" },
      { label: "Accordion", href: "/docs/accordion" },
      { label: "Stat", href: "/docs/stat" },
      { label: "Timeline", href: "/docs/timeline" },
      { label: "Empty State", href: "/docs/empty-state" },
      { label: "Carousel", href: "/docs/carousel" },
    ],
  },
  {
    title: "Feedback & Loading",
    links: [
      { label: "Alert", href: "/docs/alert" },
      { label: "Callout", href: "/docs/callout" },
      { label: "Progress", href: "/docs/progress" },
      { label: "Skeleton", href: "/docs/skeleton" },
      { label: "Spinner", href: "/docs/spinner" },
    ],
  },
  {
    title: "Overlay",
    links: [
      { label: "Modal", href: "/docs/modal" },
      { label: "Drawer", href: "/docs/drawer" },
      { label: "Dropdown", href: "/docs/dropdown" },
      { label: "Tooltip", href: "/docs/tooltip" },
      { label: "Popover", href: "/docs/popover" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Breadcrumb", href: "/docs/breadcrumb" },
      { label: "Pagination", href: "/docs/pagination" },
      { label: "Stepper", href: "/docs/stepper" },
    ],
  },
  {
    title: "Form Components",
    links: [
      { label: "Input", href: "/docs/input" },
      { label: "Textarea", href: "/docs/textarea" },
      { label: "Select", href: "/docs/select" },
      { label: "Checkbox", href: "/docs/checkbox" },
      { label: "Radio", href: "/docs/radio" },
      { label: "Switch", href: "/docs/switch" },
      { label: "Button", href: "/docs/button" },
      { label: "Icon Button", href: "/docs/icon-button" },
      { label: "Slider", href: "/docs/slider" },
      { label: "Number Input", href: "/docs/number-input" },
      { label: "Rating", href: "/docs/rating" },
      { label: "Tag Input", href: "/docs/tag-input" },
      { label: "Pin Input", href: "/docs/pin-input" },
      { label: "File Upload", href: "/docs/file-upload" },
      { label: "Date Picker", href: "/docs/date-picker" },
      { label: "Time Picker", href: "/docs/time-picker" },
      { label: "Toggle Group", href: "/docs/toggle" },
    ],
  },
  {
    title: "Modern Foundations",
    links: [
      { label: "Theme Provider", href: "/docs/theme-provider" },
      { label: "Command Palette", href: "/docs/command-palette" },
      { label: "App Shell", href: "/docs/app-shell" },
      { label: "Sidebar", href: "/docs/sidebar" },
      { label: "Alert Dialog", href: "/docs/alert-dialog" },
      { label: "Context Menu", href: "/docs/context-menu" },
      { label: "Loading Overlay", href: "/docs/loading-overlay" },
      { label: "Error Boundary", href: "/docs/error-boundary" },
      { label: "Onboarding Tour", href: "/docs/onboarding-tour" },
      { label: "Announcement Bar", href: "/docs/announcement-bar" },
      { label: "Skip Link", href: "/docs/skip-link" },
    ],
  },
  {
    title: "Advanced Data & Forms",
    links: [
      { label: "Data Table", href: "/docs/data-table" },
      { label: "Date Range Picker", href: "/docs/date-range-picker" },
      { label: "Filter Bar", href: "/docs/filter-bar" },
      { label: "Combobox", href: "/docs/combobox" },
      { label: "Range Slider", href: "/docs/range-slider" },
      { label: "Wizard", href: "/docs/wizard" },
      { label: "Notification Center", href: "/docs/notification-center" },
      { label: "Sparkline", href: "/docs/sparkline" },
      { label: "Bulk Action Bar", href: "/docs/bulk-action-bar" },
      { label: "Hover Card", href: "/docs/hover-card" },
      { label: "Code Block", href: "/docs/code-block" },
    ],
  },
  {
    title: "AI, Mobile & Content",
    links: [
      { label: "Chat Message", href: "/docs/chat-message" },
      { label: "Virtual List", href: "/docs/virtual-list" },
      { label: "Tree View", href: "/docs/tree-view" },
      { label: "Table Of Contents", href: "/docs/table-of-contents" },
      { label: "Scroll Area", href: "/docs/scroll-area" },
      { label: "Color Picker", href: "/docs/color-picker" },
      { label: "Date Time Picker", href: "/docs/date-time-picker" },
      { label: "Time Range Picker", href: "/docs/time-range-picker" },
      { label: "Action Sheet", href: "/docs/action-sheet" },
      { label: "Bottom Navigation", href: "/docs/bottom-navigation" },
      { label: "Swipe Actions", href: "/docs/swipe-actions" },
    ],
  },
  {
    title: "Advanced Layout & Commerce",
    links: [
      { label: "Lightbox", href: "/docs/lightbox" },
      { label: "Attachment Card", href: "/docs/attachment-card" },
      { label: "Form Section", href: "/docs/form-section" },
      { label: "Setting Row", href: "/docs/setting-row" },
      { label: "Price", href: "/docs/price" },
      { label: "Activity Heatmap", href: "/docs/activity-heatmap" },
      { label: "Live Announcer", href: "/docs/live-announcer" },
      { label: "Visually Hidden", href: "/docs/visually-hidden" },
      { label: "Floating Toolbar", href: "/docs/floating-toolbar" },
      { label: "Menubar", href: "/docs/menubar" },
      { label: "Resizable Panel", href: "/docs/resizable-panel" },
    ],
  },
  {
    title: "Utilities",
    links: [{ label: "Copy Button", href: "/docs/copy-button" }],
  },
  {
    title: "Resources",
    links: [{ label: "About", href: "/about" }],
  },
];

// Flat list of every real /docs/* route (derived from sidebarSections, plus
// the orphan layout-playground page which isn't linked from the sidebar).
const docsRoutes = sidebarSections
  .flatMap((section) => section.links)
  .map((link) => link.href)
  .filter((href) => href.startsWith("/docs"))
  .concat(["/docs/layout-playground"]);

module.exports = { siteRoutes, sidebarSections, docsRoutes };
