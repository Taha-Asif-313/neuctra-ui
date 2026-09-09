// Single source of truth for site structure: every real route + the docs
// sidebar's section grouping. Consumed by components/Sidebar.js (nav UI),
// next-sitemap (route discovery/priority) and scripts/generate-llms-txt.js.
// CommonJS on purpose — next-sitemap.config.js and the prebuild script load
// this via plain `require()` outside of Next's bundler.

const siteRoutes = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/terms", label: "Terms of Service" },
  { path: "/privacypolicy", label: "Privacy Policy" },
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
    links: [{ label: "Neuctra UI MCP", href: "/docs/mcp" }],
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
