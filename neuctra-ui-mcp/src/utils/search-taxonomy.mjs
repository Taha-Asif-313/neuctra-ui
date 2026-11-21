// Curated semantic layer for deep component search.
//
// The upstream registry only knows `category` and `module`. That is enough to
// render docs, but not to answer intents like "give me every form component",
// "components for displaying data", or "everything related to modals and
// drawers". This file adds those intents on top of the raw registry so the
// generated data/components.json carries the same meaning everywhere it is
// consumed (stdio server, HTTP worker, direct JSON readers).
//
// Everything here is deterministic: enrichRegistry(raw) can be re-run at any
// time and produces the same result, which is what keeps sync-registry safe.

const STOP_WORDS = new Set([
  "a", "an", "and", "any", "are", "as", "at", "be", "by", "can", "for", "from",
  "has", "have", "i", "in", "into", "is", "it", "its", "of", "on", "or", "our",
  "that", "the", "their", "this", "to", "ui", "use", "used", "using", "with",
]);

export const SYNONYMS = {
  "action": "actions button icon-button copy-button",
  "alert": "toast callout notification feedback",
  "auth": "authentication login signup password otp",
  "card": "card panel surface container",
  "check": "checkbox switch radio toggle",
  "choose": "select radio-group dropdown options",
  "confirm": "modal dialog confirmation",
  "confirmation": "modal dialog",
  "create": "form input textarea select upload",
  "dismissible": "toast callout close",
  "dropdown": "menu select popover",
  "fields": "form input textarea select",
  "grid": "table data-table rows columns",
  "hint": "tooltip popover",
  "input": "input textarea number-input tag-input pin-input",
  "list": "list table timeline menu",
  "loading": "spinner skeleton progress",
  "login": "authentication form input pin-input button",
  "menu": "dropdown list popover tabs",
  "modal": "dialog popup confirmation overlay",
  "notification": "toast callout alert",
  "otp": "pin-input verification code authentication",
  "picker": "date-picker time-picker calendar select",
  "popup": "modal dropdown popover tooltip",
  "range": "slider number-input",
  "select": "select radio-group dropdown",
  "sheet": "drawer side-panel overlay",
  "show": "display table list card stat",
  "signup": "authentication form input checkbox button",
  "slider": "carousel range slider-input",
  "status": "badge chip progress callout toast",
  "table": "data-table rows columns grid",
  "tabs": "tab tab-list tab-panel navigation",
  "tags": "tag-input chip",
  "toggle": "switch checkbox toggle-group",
  "tooltip": "hint popover",
  "upload": "file-upload attachment input",
  "validation": "error input callout toast",
};

// Local extension vocabulary for the 44 modern components added to this fork.
Object.assign(SYNONYMS, {
  "accessibility": "skip-link visually-hidden live-announcer a11y screen reader",
  "ai": "chat-message message-list chat assistant streaming",
  "app shell": "app-shell sidebar topbar dashboard shell admin layout",
  "command": "command-palette cmdk cmd+k palette search actions",
  "commerce": "price price-tag product checkout storefront cart",
  "context menu": "context-menu right-click menu",
  "data grid": "data-table table sorting filtering selection pagination",
  "docs": "code-block table-of-contents documentation api reference",
  "filter": "filter-bar chip select combobox facets",
  "heatmap": "activity-heatmap contribution graph calendar",
  "lightbox": "lightbox image-gallery zoom carousel",
  "notifications": "notification-center toast inbox bell",
  "onboarding": "onboarding-tour wizard tour walkthrough spotlight",
  "range": "range-slider slider min max price range",
  "resizable": "resizable-panel split pane drag resize handle",
  "theme": "theme-provider theme-toggle dark mode light mode system",
  "tree": "tree-view tree file folder hierarchy",
});

const FAMILY_INFO = {
  "toast": { label: "Toasts", aliases: ["notification", "alert", "flash message"] },
  "avatar": { label: "Avatars", aliases: ["profile image", "user photo"] },
  "avatar-group": { label: "Avatar groups", aliases: ["stacked avatars", "team avatars"] },
  "card": { label: "Cards", aliases: ["panel", "surface"] },
  "carousel": { label: "Carousels", aliases: ["slides", "gallery"] },
  "date-picker": { label: "Date pickers", aliases: ["calendar input", "date input"] },
  "drawer": { label: "Drawers & side panels", aliases: ["sheet", "sidebar", "side panel"] },
  "dropdown": { label: "Dropdown menus", aliases: ["menu", "action menu"] },
  "empty-state": { label: "Empty states", aliases: ["no results", "blank slate"] },
  "file-upload": { label: "File uploads", aliases: ["dropzone", "attachment"] },
  "icon-button": { label: "Icon buttons", aliases: ["toolbar button"] },
  "list": { label: "Lists", aliases: ["menu list", "item list", "tree"] },
  "modal": { label: "Modals & dialogs", aliases: ["dialog", "popup", "confirmation"] },
  "number-input": { label: "Number inputs", aliases: ["stepper", "quantity input"] },
  "pin-input": { label: "PIN & OTP inputs", aliases: ["otp", "verification code", "one time code"] },
  "popover": { label: "Popovers", aliases: ["floating panel"] },
  "progress": { label: "Progress", aliases: ["loading bar", "completion"] },
  "radio-group": { label: "Radio groups", aliases: ["single choice", "options"] },
  "rating": { label: "Ratings", aliases: ["stars", "review"] },
  "select": { label: "Selects", aliases: ["dropdown select", "combobox"] },
  "skeleton": { label: "Skeletons", aliases: ["loading placeholder"] },
  "slider": { label: "Sliders", aliases: ["range input"] },
  "spinner": { label: "Spinners", aliases: ["loader"] },
  "stat": { label: "Stats & KPIs", aliases: ["metric", "kpi"] },
  "table": { label: "Data tables", aliases: ["data grid", "datagrid", "rows and columns"] },
  "tabs": { label: "Tabs", aliases: ["tabbed navigation", "segmented views"] },
  "tag-input": { label: "Tag inputs", aliases: ["chips input", "tags field"] },
  "theme-toggle-button": { label: "Theme toggles", aliases: ["dark mode", "light mode switch"] },
  "timeline": { label: "Timelines", aliases: ["activity feed", "changelog", "order tracking"] },
  "time-picker": { label: "Time pickers", aliases: ["time input", "schedule"] },
  "toggle": { label: "Toggles", aliases: ["toggle button", "segmented control"] },
  "tooltip": { label: "Tooltips", aliases: ["hint", "hover help"] },
};

// Local extension families. Existing families above are reused where a new
// component is a true variant (AlertDialog -> modal, Combobox -> select, etc.).
Object.assign(FAMILY_INFO, {
  "theme-toggle-button": { label: "Themes & theme toggles", aliases: ["dark mode", "light mode switch", "theme provider", "color mode"] },
  "command-palette": { label: "Command palettes", aliases: ["cmdk", "cmd+k menu", "action palette", "spotlight search"] },
  "app-shell": { label: "App shells", aliases: ["dashboard shell", "admin frame", "application layout"] },
  "sidebar": { label: "Sidebars", aliases: ["side navigation", "nav rail", "app menu"] },
  "error-boundary": { label: "Error boundaries", aliases: ["render error fallback", "crash guard"] },
  "onboarding": { label: "Onboarding & tours", aliases: ["product tour", "walkthrough", "coach marks"] },
  "accessibility": { label: "Accessibility utilities", aliases: ["a11y", "screen reader", "skip link", "sr-only"] },
  "notification-center": { label: "Notification centers", aliases: ["inbox", "notification bell", "notification list"] },
  "code-block": { label: "Code blocks", aliases: ["syntax block", "code sample", "snippet"] },
  "chat": { label: "AI chat & messaging", aliases: ["conversation", "messages", "assistant transcript", "chatbot"] },
  "filter-bar": { label: "Filter bars", aliases: ["facets", "query filters", "active filters"] },
  "commerce": { label: "Commerce primitives", aliases: ["pricing", "product price", "storefront money"] },
  "tree-view": { label: "Tree views", aliases: ["file tree", "hierarchy", "nested nodes"] },
  "table-of-contents": { label: "Tables of contents", aliases: ["toc", "on this page", "doc outline"] },
  "scroll-area": { label: "Scroll areas", aliases: ["custom scrollbar", "scroll container"] },
  "color-picker": { label: "Color pickers", aliases: ["hex input", "swatches", "brand color"] },
  "bottom-navigation": { label: "Bottom navigation", aliases: ["mobile tab bar", "app tab bar"] },
  "swipe-actions": { label: "Swipe actions", aliases: ["touch actions", "mobile row actions"] },
  "attachment-card": { label: "Attachment cards", aliases: ["file chip", "upload item", "file preview"] },
  "form-section": { label: "Form sections", aliases: ["fieldset", "settings group", "form group"] },
  "floating-toolbar": { label: "Floating toolbars", aliases: ["selection toolbar", "context toolbar"] },
  "menubar": { label: "Menubars", aliases: ["application menu", "top menu", "menu bar"] },
  "resizable-panel": { label: "Resizable panels", aliases: ["split pane", "drag resize", "panel group"] },
});

// Per-component meaning that cannot be inferred from the name alone. Keys are
// component names (the exact export), so aliases stay close to the API.
const COMPONENT_HINTS = {
  Alert: { family: "toast" },
  toast: { family: "toast", aliases: ["notify", "flash message"], useCases: ["transient notifications", "success and error feedback"] },
  ToastProvider: { family: "toast", aliases: ["toast viewport", "notification host"], useCases: ["app-wide toast setup"] },
  useToast: { family: "toast", aliases: ["toast hook"], useCases: ["programmatic notifications"] },
  Callout: { aliases: ["inline alert", "banner"], useCases: ["persistent messages", "form validation summary"] },
  Modal: { aliases: ["dialog", "popup", "confirmation dialog"], useCases: ["confirmations", "focused tasks", "nested forms"] },
  Drawer: { aliases: ["sheet", "side panel", "sidebar"], useCases: ["mobile navigation", "filters", "settings panels"] },
  Dropdown: { aliases: ["action menu", "overflow menu", "more menu", "export menu", "user menu"], useCases: ["row actions", "overflow menus"] },
  Popover: { aliases: ["floating panel", "popper"], useCases: ["rich content on click", "small forms"] },
  Tooltip: { aliases: ["hint", "hover help"], useCases: ["icon explanations", "short help text"] },
  Slider: { aliases: ["range input"], useCases: ["volume and price ranges", "settings"] },
  Carousel: { aliases: ["slides", "gallery", "image slider"], useCases: ["product images", "feature tours"] },
  Rating: { aliases: ["stars", "review"], useCases: ["reviews", "feedback"] },
  PinInput: { aliases: ["otp", "verification code", "one time code"], useCases: ["two factor authentication", "verification"] },
  DatePicker: { aliases: ["date input", "calendar field"], useCases: ["due dates", "booking"] },
  TimePicker: { aliases: ["time input", "schedule"], useCases: ["meeting times", "booking"] },
  FileUpload: { aliases: ["dropzone", "attachment"], useCases: ["uploading documents", "image uploads"] },
  TagInput: { aliases: ["chips input", "tags field"], useCases: ["keywords", "filters"] },
  Select: { aliases: ["combobox", "dropdown select"], useCases: ["choosing one option", "multi-select"] },
  Checkbox: { aliases: ["check box", "multi select"], useCases: ["consent", "multi-select lists"] },
  Switch: { aliases: ["toggle switch", "on off"], useCases: ["settings", "feature flags"] },
  Textarea: { aliases: ["multiline input"], useCases: ["descriptions", "chat input"] },
  Container: { aliases: ["wrapper", "page width"], useCases: ["page sections", "centering content"] },
  Divider: { aliases: ["separator", "rule"], useCases: ["grouping sections"] },
  EmptyState: { aliases: ["no results", "blank slate"], useCases: ["empty lists", "no search results"] },
  Stepper: { aliases: ["wizard", "progress steps"], useCases: ["checkout", "onboarding"] },
  Breadcrumb: { aliases: ["breadcrumbs", "trail"], useCases: ["deep navigation"] },
  Pagination: { aliases: ["pager", "page controls"], useCases: ["large lists", "tables"] },
  Skeleton: { aliases: ["loading placeholder"], useCases: ["content loading"] },
  Spinner: { aliases: ["loader"], useCases: ["busy states"] },
  CopyButton: { aliases: ["clipboard button"], useCases: ["copying commands", "copying links"] },
  Stat: { aliases: ["kpi card", "metric card", "stat card", "kpi tile"], useCases: ["dashboard KPIs", "headline numbers"] },
  ThemeToggleButton: { aliases: ["dark mode", "theme switch"], useCases: ["light and dark mode"] },
};

// Local extension hints. Keys are exact package exports so deep search can
// resolve modern intents without depending on name guessing.
Object.assign(COMPONENT_HINTS, {
  ThemeProvider: { family: "theme-toggle-button", aliases: ["theme context", "color mode provider"], useCases: ["system dark mode", "persisted theme preference"] },
  useTheme: { family: "theme-toggle-button", aliases: ["theme hook", "use color mode"], useCases: ["reading and changing theme"] },
  CommandPalette: { family: "command-palette", aliases: ["cmd+k", "ctrl+k", "command menu", "spotlight", "global search", "quick search"], useCases: ["global search", "keyboard navigation", "quick actions"] },
  AppShell: { family: "app-shell", aliases: ["dashboard frame", "admin shell", "dashboard layout", "admin layout", "app layout"], useCases: ["SaaS apps", "admin panels", "responsive app navigation"] },
  Sidebar: { family: "sidebar", aliases: ["side nav", "nav rail"], useCases: ["workspace navigation", "docs navigation"] },
  AlertDialog: { family: "modal", aliases: ["confirmation dialog", "destructive dialog", "confirm delete", "confirm dialog", "are you sure dialog", "delete confirmation"], useCases: ["delete confirmation", "irreversible actions"] },
  ContextMenu: { family: "dropdown", aliases: ["right click menu"], useCases: ["row actions", "file actions"] },
  LoadingOverlay: { family: "spinner", aliases: ["busy overlay", "saving overlay"], useCases: ["blocking a region during save", "async refetch"] },
  ErrorBoundary: { family: "error-boundary", aliases: ["crash fallback"], useCases: ["render errors", "widget isolation"] },
  OnboardingTour: { family: "onboarding", aliases: ["product tour", "spotlight tour"], useCases: ["first-run guidance", "feature walkthroughs"] },
  AnnouncementBar: { family: "callout", aliases: ["global notice", "maintenance banner"], useCases: ["app-wide announcements", "dismissible notices"] },
  SkipLink: { family: "accessibility", aliases: ["skip to content"], useCases: ["keyboard navigation", "WCAG compliance"] },
  DataTable: { family: "table", aliases: ["data grid", "datagrid", "sortable table", "selectable table", "paginated table", "records table"], useCases: ["sortable records", "selectable rows", "paginated tables"] },
  DateRangePicker: { family: "date-picker", aliases: ["range calendar", "date range", "period picker", "date filter"], useCases: ["analytics filters", "booking ranges"] },
  FilterBar: { family: "filter-bar", aliases: ["facets", "query builder", "table filters", "list filters", "filter chips", "advanced filters"], useCases: ["data filtering", "saved views"] },
  Combobox: { family: "select", aliases: ["async select", "searchable select", "typeahead", "autocomplete", "multi select with search", "user picker"], useCases: ["large option sets", "model pickers", "creatable options"] },
  RangeSlider: { family: "slider", aliases: ["dual slider", "min max slider"], useCases: ["price ranges", "numeric thresholds"] },
  Wizard: { family: "stepper", aliases: ["guided form", "multi-step form", "multi step", "step by step form", "onboarding flow", "setup flow"], useCases: ["checkout", "onboarding", "validated steps"] },
  NotificationCenter: { family: "notification-center", aliases: ["inbox", "notification bell"], useCases: ["persistent notifications", "read unread history"] },
  Sparkline: { family: "stat", aliases: ["mini chart", "inline trend", "trend line", "kpi trend"], useCases: ["KPI trends", "dense dashboards"] },
  BulkActionBar: { family: "table", aliases: ["selection bar", "mass actions"], useCases: ["bulk delete", "bulk export"] },
  HoverCard: { family: "popover", aliases: ["hover preview"], useCases: ["user previews", "link previews"] },
  CodeBlock: { family: "code-block", aliases: ["snippet", "syntax block"], useCases: ["documentation", "AI answers", "developer tools"] },
  ChatMessage: { family: "chat", aliases: ["message bubble", "assistant message"], useCases: ["AI transcripts", "chat threads"] },
  MessageList: { family: "chat", aliases: ["message thread", "conversation list"], useCases: ["auto-scrolling chat", "streaming responses"] },
  VirtualList: { family: "list", aliases: ["virtualized list", "windowed list"], useCases: ["large lists", "logs", "inboxes"] },
  TreeView: { family: "tree-view", aliases: ["file tree", "nested list"], useCases: ["folders", "permission trees", "categories"] },
  TableOfContents: { family: "table-of-contents", aliases: ["toc", "on this page"], useCases: ["documentation navigation", "long articles"] },
  ScrollArea: { family: "scroll-area", aliases: ["custom scrollbar", "kanban board", "kanban columns", "horizontal rail"], useCases: ["tall panels", "wide tables"] },
  ColorPicker: { family: "color-picker", aliases: ["hex picker", "swatch picker"], useCases: ["theme builders", "white-label settings"] },
  DateTimePicker: { family: "date-picker", aliases: ["date time field"], useCases: ["scheduling", "event forms"] },
  TimeRangePicker: { family: "time-picker", aliases: ["start end time", "opening hours", "business hours", "working hours", "time range", "shift hours"], useCases: ["availability", "booking hours"] },
  ActionSheet: { family: "drawer", aliases: ["mobile action list", "bottom action sheet"], useCases: ["mobile choices", "destructive actions"] },
  BottomNavigation: { family: "bottom-navigation", aliases: ["mobile tabs", "bottom tabs", "mobile navigation", "tab bar"], useCases: ["PWA navigation", "mobile apps"] },
  SwipeActions: { family: "swipe-actions", aliases: ["touch row actions"], useCases: ["mobile inbox", "touch lists"] },
  Lightbox: { family: "image", aliases: ["image zoom", "gallery modal"], useCases: ["product images", "media viewing"] },
  ImageGallery: { family: "image", aliases: ["gallery", "lightbox"], useCases: ["image collections", "commerce media"] },
  AttachmentCard: { family: "attachment-card", aliases: ["file chip", "upload item"], useCases: ["chat attachments", "upload progress"] },
  FormSection: { family: "form-section", aliases: ["fieldset", "settings group"], useCases: ["grouped forms", "settings pages"] },
  SettingRow: { family: "form-section", aliases: ["settings line", "preference row"], useCases: ["settings", "preferences"] },
  Price: { family: "commerce", aliases: ["price tag", "currency"], useCases: ["product pricing", "savings display"] },
  PriceTag: { family: "commerce", aliases: ["price badge"], useCases: ["commerce pricing"] },
  ActivityHeatmap: { family: "stat", aliases: ["contribution graph", "usage calendar"], useCases: ["activity density", "streaks"] },
  LiveAnnouncer: { family: "accessibility", aliases: ["aria live", "screen reader announcement"], useCases: ["route changes", "filter counts"] },
  VisuallyHidden: { family: "accessibility", aliases: ["sr-only", "screen reader only"], useCases: ["icon labels", "extra context"] },
  FloatingToolbar: { family: "floating-toolbar", aliases: ["selection toolbar"], useCases: ["editors", "canvas tools"] },
  Menubar: { family: "menubar", aliases: ["application menu"], useCases: ["desktop-style apps", "pro tools"] },
  ResizablePanelGroup: { family: "resizable-panel", aliases: ["split pane", "panel group"], useCases: ["IDE layouts", "chat sidebars"] },
  ResizablePanel: { family: "resizable-panel", aliases: ["resize pane"], useCases: ["flexible panels"] },
  ResizableHandle: { family: "resizable-panel", aliases: ["drag handle", "splitter"], useCases: ["resizing panels"] },
});

// ---------------------------------------------------------------------------
// Component usage guidance
// ---------------------------------------------------------------------------
// The component design rules are embedded in data/components.json (both in
// search.componentRules and inside each component's guidance.rules), so a
// component search alone is enough to use the component correctly. These maps
// attach the right rule numbers plus short "why / where / how / don't" notes.
// Full rule text is injected by enrichRegistry(); design-rules.json no longer
// needs to carry a "components" block.
const BASE_GUIDANCE = { ruleIds: [40, 44, 47, 48, 50] };

// Applies to every component, so it is stored once at the top level and
// returned once per search instead of duplicated on every component entry.
const GUIDANCE_BASELINE = {
  ruleIds: BASE_GUIDANCE.ruleIds,
  requirements: [
    "Never add a shadow yourself, and never strip a component's built-in one.",
    "Keep built-in spacing, radius, and colors; use props first and !important overrides only to prevent a real layout conflict.",
  ],
};

const FORM_GUIDANCE = {
  ruleIds: [15],
  composition: "Form Section > Label > Input > Description > Error",
  requirements: [
    "Every Input, Textarea, Select, Number Input, Date Picker, Time Picker and search field must have a placeholder.",
    "The placeholder shows an example or format, stays short and sentence case, and never replaces the visible Label or repeats it word for word.",
  ],
  avoid: ["Putting every field in a separate Card"],
};

const TYPOGRAPHY_GUIDANCE = {
  ruleIds: [10, 51, 52, 53],
  composition: "Page title > Section title > Component title > Body text > Metadata",
  requirements: [
    "text-foreground for headings, text-secondary for all paragraphs and descriptions, text-muted-foreground only for metadata and hints.",
    "Line-height comes from the text-size class (text-sm, text-base, ...); do not add a separate leading-* utility on top.",
  ],
  avoid: [
    "Excessive bold text or too many font sizes",
    "All-caps body text, huge headings everywhere, centering everything",
    "text-muted-foreground for paragraphs or bg-secondary as a background",
  ],
};

const FAMILY_GUIDANCE = {
  card: {
    ruleIds: [7],
    composition: "Card > CardHeader? > CardBody > CardFooter?",
    useFor: ["Dashboard statistics", "Settings groups", "Product previews", "Related information", "Independent content blocks"],
    avoid: ["Wrapping everything in Cards", "Nested Cards (keep rare)", "Content placed directly in <Card> without <CardBody>"],
    requirements: [
      "CardBody is compulsory whenever there is body content; CardHeader and CardFooter are optional.",
      "Use a real Card instead of a hand-styled card-like div; if whitespace already groups the content, a Card may be unnecessary.",
    ],
  },
  modal: {
    ruleIds: [16],
    composition: "Modal > ModalHeader > ModalBody > ModalFooter",
    useFor: ["Confirm deletion", "Create or edit an item", "Important settings", "Focused forms"],
    avoid: ["Long documentation", "Large dashboards", "Complex workflows", "Information that deserves its own page"],
    requirements: [
      "Cap the body height (e.g. max-h-[70vh]) and give ModalBody overflow-y-auto.",
      "Only the body scrolls: keep header and footer fixed and always visible; never clip actions or add horizontal scroll.",
    ],
  },
  drawer: {
    ruleIds: [17],
    useFor: ["Filters", "Detail views", "Editing", "Mobile navigation", "Secondary settings"],
    requirements: ["Keep the underlying page context connected and visible while the drawer is open."],
  },
  dropdown: {
    ruleIds: [18],
    useFor: ["Compact action menus", "Row actions", "Overflow menus"],
    avoid: ["Comparing multiple persistent options"],
    requirements: ["Use Select instead for form selection."],
  },
  tooltip: {
    ruleIds: [19],
    useFor: ["Explaining icon-only buttons", "Short clarification"],
    avoid: ["Hiding essential instructions or essential information inside a tooltip"],
    requirements: ["Use a Tooltip when an icon's meaning is not immediately obvious."],
  },
  popover: {
    ruleIds: [20],
    useFor: ["Advanced filters", "Color selection", "Small configuration panels", "Additional metadata", "Contextual actions"],
    requirements: ["Keep popover content lightweight."],
  },
  tabs: {
    ruleIds: [21],
    useFor: ["Related views that share the same context", "Overview / Activity / Settings"],
    avoid: ["Using Tabs just because a page has multiple sections", "Hiding sections users should see together"],
  },
  table: {
    ruleIds: [22, 59],
    composition: "Table > THead > TBody > TRow > TH / TD",
    useFor: ["Users", "Orders", "Transactions", "Logs", "Products", "Comparing structured records"],
    avoid: ["Overly dense tables unless the product requires high information density"],
    requirements: [
      "Provide clear column hierarchy, adequate spacing, row hover where useful, pagination when necessary, and empty/loading states.",
      "Wrap tables in overflow-x-auto at small breakpoints so the page never scrolls horizontally.",
    ],
  },
  list: {
    ruleIds: [23],
    useFor: ["Notifications", "Tasks", "Activities", "Messages", "Search results"],
    avoid: ["Records that need column-based comparison (use Table)"],
    requirements: ["Prefer List over Table when records are naturally read vertically."],
  },
  "empty-state": {
    ruleIds: [24],
    useFor: ["Empty lists", "No search results", "First-run screens"],
    avoid: ["Empty states that only say \"No data found.\""],
    requirements: ["Explain what is empty, why it matters, and the next action the user should take."],
  },
  callout: {
    ruleIds: [25],
    useFor: ["Important information", "Warnings", "Success and error states", "Notices", "System status", "Migration messages"],
    avoid: ["Using a Callout for every notification", "Temporary notifications (use the toast system)"],
    requirements: ["Use semantic types correctly: Error > Warning > Success > Info > Neutral."],
  },
  toast: {
    ruleIds: [25, 44],
    useFor: ["Temporary notifications", "Success and error feedback"],
    avoid: ["Persistent in-page messages (use Callout)"],
    requirements: ["Import { toast, ToastProvider } from \"@neuctra/ui\" — there is no \"Toast\" component."],
  },
  progress: {
    ruleIds: [26],
    useFor: ["Upload progress", "Onboarding", "Course completion", "Project progress", "Storage usage"],
    avoid: ["Decorative progress bars"],
    requirements: ["Progress must represent measurable completion."],
  },
  skeleton: {
    ruleIds: [27],
    useFor: ["Loading content whose final layout is known"],
    avoid: ["Replacing the whole page with a generic spinner when layout can be preserved"],
    requirements: ["Make the skeleton resemble the final content structure."],
  },
  spinner: {
    ruleIds: [28],
    useFor: ["Short, localized operations", "Saving or busy buttons"],
    avoid: ["Full-page spinners for normal page loading (use Skeleton)"],
  },
  accordion: {
    ruleIds: [29],
    useFor: ["FAQs", "Advanced settings", "Documentation sections", "Additional details"],
    avoid: ["Hiding primary information inside Accordions"],
  },
  breadcrumb: {
    ruleIds: [30],
    useFor: ["Hierarchies such as Documentation / Components / Forms / Input"],
    avoid: ["Simple pages without useful hierarchy"],
    requirements: ["Use Breadcrumb only when the page has meaningful hierarchy."],
  },
  pagination: {
    ruleIds: [31],
    useFor: ["Tables", "Search results", "Large lists"],
    avoid: ["Paginating small datasets unnecessarily"],
  },
  stepper: {
    ruleIds: [32],
    useFor: ["Checkout", "Onboarding", "Multi-step processes"],
    avoid: ["Ordinary navigation"],
    requirements: ["Each step must represent a meaningful stage."],
  },
  avatar: {
    ruleIds: [33],
    useFor: ["People and profiles"],
    avoid: ["Decorative images added just to fill empty space"],
  },
  "avatar-group": {
    ruleIds: [33],
    useFor: ["Teams and participants"],
    avoid: ["Decorative images added just to fill empty space"],
  },
  image: {
    ruleIds: [33, 59],
    useFor: ["Visual content"],
    avoid: ["Decorative images added just to fill empty space"],
    requirements: ["Use an aspect-* class with object-cover so nothing shifts while loading."],
  },
  carousel: {
    ruleIds: [34],
    useFor: ["Product screenshots", "Testimonials", "Image galleries", "Featured content"],
    avoid: ["Content users need to compare simultaneously"],
  },
  badge: {
    ruleIds: [11],
    useFor: ["v1.0", "New", "Beta", "Active", "Deprecated", "Success", "Warning"],
    avoid: ["Every navigation item, card, paragraph, or heading"],
    requirements: ["A Badge communicates information, not decoration."],
  },
  chip: {
    ruleIds: [12],
    useFor: ["Categories", "Filters", "Tags"],
    avoid: ["Using Badge and Chip interchangeably"],
    requirements: ["Use a Chip when users perceive the value as a category, filter, or tag."],
  },
  button: {
    ruleIds: [13],
    useFor: ["Primary, secondary, tertiary, and destructive actions"],
    avoid: ["Multiple primary buttons competing with each other"],
    requirements: ["When an important action exists, give the page one visually dominant primary action."],
  },
  "icon-button": {
    ruleIds: [14, 19],
    useFor: ["Close", "Search", "Settings", "More", "Edit", "Delete", "Copy", "Previous", "Next"],
    avoid: ["Sacrificing usability for minimalism"],
    requirements: ["Use Tooltip when the icon's meaning is not immediately obvious."],
  },
  container: {
    ruleIds: [8],
    useFor: ["Page sections", "Centering content"],
    avoid: ["Adding every section automatically (less UI is often better UI)"],
  },
  divider: {
    ruleIds: [9],
    useFor: ["Grouping sections"],
    avoid: ["Dividers that do not improve scanning"],
  },
  "copy-button": {
    ruleIds: [64],
    useFor: ["Copying commands and links", "Code block headers"],
    requirements: ["Show code with react-syntax-highlighter (Prism, correct language, copy button, overflow-x-auto); never hand-roll <pre> coloring."],
  },
  stat: {
    ruleIds: [65],
    useFor: ["Dashboard KPIs", "Stat tiles"],
    requirements: [
      "Keep KPI tiles numbers first; add a chart only where a trend or comparison helps.",
      "Dashboard charts must use apexcharts + react-apexcharts with theme CSS variables, inside a Card with CardHeader and CardBody.",
    ],
  },
  ...Object.fromEntries(
    ["calendar", "checkbox", "date-picker", "file-upload", "input", "number-input", "pin-input", "radio-group", "select", "slider", "switch", "tag-input", "textarea", "time-picker", "toggle", "toggle-group"]
      .map((family) => [family, FORM_GUIDANCE]),
  ),
};

Object.assign(FAMILY_GUIDANCE, {
  "theme-toggle-button": {
    ruleIds: [44],
    useFor: ["Dark mode", "Persisted theme preference", "System theme following"],
    requirements: ["ThemeProvider owns the `dark` class; ThemeToggleButton stays presentational."],
  },
  "command-palette": {
    ruleIds: [16, 18, 44],
    useFor: ["Global navigation", "Quick actions", "Keyboard-first search"],
    avoid: ["Long forms", "Primary page content"],
    requirements: ["Always expose Cmd/Ctrl+K and keep results keyboard navigable."],
  },
  "app-shell": {
    ruleIds: [3, 8, 44],
    useFor: ["SaaS applications", "Admin panels", "Responsive dashboards"],
    requirements: ["Keep one main landmark and a visible skip target."],
  },
  sidebar: {
    ruleIds: [4, 44],
    useFor: ["Persistent app navigation", "Workspace sections", "Docs navigation"],
    avoid: ["Duplicating every navigation item in the topbar"],
  },
  "error-boundary": {
    ruleIds: [24, 44],
    useFor: ["Isolating widget crashes", "Themed retry fallbacks"],
    requirements: ["Give the user a retry or next action; never show a blank screen."],
  },
  onboarding: {
    ruleIds: [32, 44],
    useFor: ["First-run guidance", "Feature announcements", "Guided setup"],
    avoid: ["Blocking every screen with a tour"],
  },
  accessibility: {
    ruleIds: [44],
    useFor: ["Keyboard navigation", "Screen reader context", "Icon-only labels"],
    requirements: ["Use semantic HTML first; these utilities enhance it, never replace it."],
  },
  "notification-center": {
    ruleIds: [23, 25],
    useFor: ["Persistent notification history", "Read/unread inboxes"],
    avoid: ["Transient success feedback (use toast)"],
  },
  "code-block": {
    ruleIds: [64],
    useFor: ["Documentation", "API examples", "AI code answers"],
    requirements: ["Keep copy behavior and overflow handling; syntax colors must come from theme tokens."],
  },
  chat: {
    ruleIds: [23, 44],
    useFor: ["AI assistants", "Support chat", "Streaming responses"],
    requirements: ["Expose role, streaming, and thinking states explicitly; never fake completion."],
  },
  "filter-bar": {
    ruleIds: [12, 22],
    useFor: ["Data filtering", "Saved views", "Faceted search"],
    requirements: ["Show active filters as removable chips and provide clear-all."],
  },
  commerce: {
    ruleIds: [11, 65],
    useFor: ["Product pricing", "Savings display", "Checkout summaries"],
    requirements: ["Format currency with locale and keep compare-at values visually secondary."],
  },
  "tree-view": {
    ruleIds: [23],
    useFor: ["Hierarchies", "File trees", "Nested permissions"],
    requirements: ["Support keyboard expansion and roving focus."],
  },
  "table-of-contents": {
    ruleIds: [4, 30],
    useFor: ["Long documentation", "Guides", "Articles"],
    requirements: ["Track the active heading and keep heading levels meaningful."],
  },
  "scroll-area": {
    ruleIds: [8],
    useFor: ["Tall panels", "Wide tables", "Bounded content regions"],
    avoid: ["Scroll traps with no visible scroll affordance"],
  },
  "color-picker": FORM_GUIDANCE,
  "bottom-navigation": {
    ruleIds: [4],
    useFor: ["Mobile primary navigation", "PWAs"],
    avoid: ["More than five destinations"],
  },
  "swipe-actions": {
    ruleIds: [13],
    useFor: ["Mobile list actions", "Inbox rows"],
    requirements: ["Every swipe action must also be reachable by keyboard."],
  },
  "attachment-card": {
    ruleIds: [26],
    useFor: ["Upload progress", "Chat attachments", "File retry and removal"],
  },
  "form-section": FORM_GUIDANCE,
  "floating-toolbar": {
    ruleIds: [14, 18],
    useFor: ["Selection formatting", "Canvas actions"],
  },
  menubar: {
    ruleIds: [18],
    useFor: ["Desktop-style application menus", "Pro tools"],
    requirements: ["Use roving focus and Escape-to-close."],
  },
  "resizable-panel": {
    ruleIds: [3, 8],
    useFor: ["IDE layouts", "Chat with sidebar", "Admin builders"],
    requirements: ["Expose keyboard resizing and min/max sizes."],
  },
});

const COMPONENT_GUIDANCE = {
  Card: {
    useFor: ["Grouping related settings or content", "Feature and product blocks"],
    requirements: ["<Card> has no padding of its own — all spacing lives in CardHeader / CardBody / CardFooter."],
  },
  CardBody: { requirements: ["Use whenever a Card has body content; content directly in <Card> renders flush against the border."] },
  Text: TYPOGRAPHY_GUIDANCE,
  Kbd: TYPOGRAPHY_GUIDANCE,
  ToastProvider: { requirements: ["Wrap the app so toast() can render notifications app-wide."] },
  useToast: { requirements: ["Call the hook to trigger programmatic notifications; there is no \"Toast\" component."] },
};

// Decision guidance for the extension components: when to choose each one over
// its simpler sibling, what it is composed of, and what to pair it with. This is
// what lets a model pick DataTable over Table, Combobox over Select, etc.
Object.assign(COMPONENT_GUIDANCE, {
  AppShell: {
    composition: "AppShell sidebar={<Sidebar … />} header={…} footer? > page content",
    useFor: ["The outer frame of any SaaS, admin or dashboard app"],
    requirements: [
      "Pass a Sidebar as `sidebar`; AppShell turns it into a slide-in panel below lg and renders the menu button for you.",
      "Use `contained` only when the shell must live inside a bounded box (previews, embedded panes).",
    ],
    avoid: ["Hand-building the aside/header/main frame and the mobile drawer yourself"],
  },
  Sidebar: {
    composition: "Sidebar sections=[{ title, items: [{ id, label, icon, badge, href, disabled }] }] header? footer?",
    useFor: ["Grouped app navigation", "Icon rail (collapsed)", "Workspace navigation with a switcher in `header`"],
    requirements: ["Keep 2 to 5 items per section; counts go in the item `badge` field.", "Collapsed mode shows labels in a Tooltip automatically."],
    avoid: ["Hand-building nav items from Buttons", "Large cards or descriptions inside the sidebar"],
  },
  BottomNavigation: {
    useFor: ["Primary navigation of mobile-first apps and PWAs"],
    requirements: ["3 to 5 destinations, each with icon and short label; give main content bottom padding so the bar never covers it."],
    avoid: ["Using it on desktop layouts (switch to Sidebar from sm/lg up)"],
  },
  CommandPalette: {
    useFor: ["Cmd/Ctrl+K search across pages and actions in apps with many destinations"],
    requirements: ["Group commands (Navigation, Actions); set `hotkey=\"k\"`; show a visible trigger with a Kbd hint in the header."],
  },
  Menubar: { useFor: ["Editors and pro tools with File / Edit / View menus"], avoid: ["Marketing sites and simple dashboards"] },
  DataTable: {
    composition: "FilterBar? > DataTable columns data (sortable, selectable, pagination, loading, emptyState) > BulkActionBar when rows are selected",
    useFor: ["Records users sort, select, page through or act on in bulk"],
    requirements: [
      "Prefer DataTable over hand-assembling Table + sorting + checkboxes; row selection already uses the Neuctra Checkbox.",
      "Pass `getRowLabel` so each row checkbox has an accessible name; wide tables scroll inside their own container.",
    ],
    avoid: ["Using it for 3 static rows (a plain Table or List is enough)"],
  },
  FilterBar: {
    useFor: ["Showing and editing active filters above a DataTable or List", "Saved views"],
    requirements: ["Keep filters in state and apply them to your data; pair with an EmptyState that offers Clear filters."],
  },
  BulkActionBar: {
    useFor: ["Actions on the rows selected in a DataTable"],
    requirements: ["Render only while count > 0; pass `total` + `onSelectAll` to offer select-all; mark destructive actions."],
  },
  Combobox: {
    useFor: ["Long or async option lists", "Multi-select with chips", "Creatable values (labels, tags)"],
    requirements: ["Use Select instead for short fixed lists (under ~10 options) that need no search."],
  },
  DateRangePicker: {
    useFor: ["Analytics periods", "Booking ranges"],
    requirements: ["Offer presets (Last 7 days, Last 30 days, This quarter) on dashboards; use DatePicker for a single date."],
  },
  DateTimePicker: { useFor: ["Scheduling an exact moment (publish at, meeting start)"], requirements: ["Built from Calendar + TimePicker; use DatePicker when the time does not matter."] },
  TimePicker: { useFor: ["Choosing a time of day"], requirements: ["Use `step` for slot length, `minTime`/`maxTime` or `isTimeDisabled` for bounds and booked slots, `hour12` for 12-hour locales."] },
  TimeRangePicker: { useFor: ["Opening hours, availability, quiet hours"], requirements: ["Built from two TimePickers; end times before the start are disabled automatically."] },
  RangeSlider: { useFor: ["Min and max numeric filters (price, size)"], requirements: ["Use Slider for a single value; set `minDistance` so the handles keep a sensible gap."] },
  ColorPicker: { useFor: ["Brand or theme color settings", "Labels and tags"], requirements: ["Provide `swatches` with the product's preset colors."] },
  Wizard: {
    useFor: ["Validated multi-step forms: onboarding, checkout, setup"],
    requirements: ["Use Wizard (it renders Stepper + Back/Next + async validation) instead of wiring Stepper and buttons by hand.", "Each step must be a meaningful stage."],
  },
  FormSection: { composition: "FormSection title description actions? > fields", useFor: ["Grouping related fields on settings and edit pages"], avoid: ["Wrapping every single field in its own section"] },
  SettingRow: { composition: "SettingRow label description control={<Switch|Select|Button …/>}", useFor: ["Preference lists on settings pages"], requirements: ["Use `stackOnMobile` when the control is wide (Select, Input)."] },
  AlertDialog: { useFor: ["Confirming destructive or irreversible actions"], requirements: ["Prefer AlertDialog over a custom Modal for confirmations; use `requireText` for high-risk deletes."] },
  ActionSheet: { useFor: ["Mobile list of actions for one item"], avoid: ["Desktop menus (use Dropdown or ContextMenu)"] },
  ContextMenu: { useFor: ["Right-click actions on files, rows and canvas objects"], requirements: ["Every action must also be reachable from a visible button or Dropdown."] },
  HoverCard: { useFor: ["Previewing a user, repo or link on hover or focus"], avoid: ["Essential actions that touch users cannot reach"] },
  NotificationCenter: { useFor: ["Bell with unread count and persistent notification history in the app header"], avoid: ["Transient confirmations (use toast)"] },
  AnnouncementBar: { useFor: ["App-wide notices: incidents, launches, billing problems"], avoid: ["Page-specific messages (use Callout)"] },
  LoadingOverlay: { useFor: ["Blocking one region while it saves or refetches"], avoid: ["Initial page loads (use Skeleton)"] },
  OnboardingTour: { useFor: ["First-run walkthrough of existing UI"], avoid: ["Explaining what a clearer label could explain"] },
  Sparkline: { useFor: ["Inline trend under a KPI number"], requirements: ["Pick the tone from whether the trend is good, not from its sign."] },
  ActivityHeatmap: { useFor: ["Daily activity density over weeks (contributions, deploys, usage)"] },
  Price: { useFor: ["Formatted prices, sale prices and savings"], requirements: ["Pass `currency` and `locale`; never format money by hand."] },
  ChatMessage: { composition: "MessageList > ChatMessage role=user|assistant|system", useFor: ["AI assistant and support chat transcripts"] },
  MessageList: { useFor: ["Auto-scrolling chat transcripts that follow streaming output"] },
  AttachmentCard: { useFor: ["Files in upload queues and chat composers with progress, error and retry"] },
  CodeBlock: { useFor: ["Short snippets inside product UI (install commands, AI answers)"] },
  VirtualList: { useFor: ["Thousands of rows: logs, contacts, inboxes"], requirements: ["Give it a fixed `height` and an `estimateSize` close to the real row height."] },
  TreeView: { useFor: ["File explorers, nested categories, permission trees"] },
  TableOfContents: { useFor: ["On-this-page navigation for long docs and articles"] },
  ScrollArea: { useFor: ["Bounded scroll regions: kanban columns, card rails, side panels"] },
  ResizablePanelGroup: { composition: "ResizablePanelGroup direction stackBelow? > ResizablePanel > ResizableHandle > ResizablePanel", useFor: ["IDE, inbox and builder layouts with adjustable panes"], requirements: ["Set `stackBelow` so panes stack instead of squeezing on phones."] },
  SwipeActions: { useFor: ["Archive/delete on touch list rows"], requirements: ["Actions stay reachable with Tab for keyboard users."] },
  FloatingToolbar: { useFor: ["Formatting or bulk actions that appear on selection"] },
  Lightbox: { useFor: ["Full-screen viewing of product or listing photos"] },
  ImageGallery: { useFor: ["Thumbnail grids that open a Lightbox"] },
  ErrorBoundary: { useFor: ["Isolating a widget so one crash does not blank the page"] },
  ThemeProvider: { useFor: ["App-wide light/dark/system mode with persistence"], requirements: ["Wrap the app once at the root; read and change the mode with useTheme."] },
  SkipLink: { useFor: ["First focusable element of every app or site, pointing at main"] },
});

// ActionSheet is a mobile overlay, not a side panel: give it its own family so
// it does not inherit the drawer family's "sidebar" aliases.
FAMILY_INFO["action-sheet"] = { label: "Action sheets", aliases: ["bottom sheet", "mobile action menu"] };
COMPONENT_HINTS.ActionSheet = { family: "action-sheet", aliases: ["mobile action list", "bottom action sheet"], useCases: ["mobile choices", "destructive actions"] };
FAMILY_GUIDANCE["action-sheet"] = { ruleIds: [17, 18], useFor: ["Short lists of actions for one item on mobile"], avoid: ["Desktop menus"] };

const LAYOUT_GUIDANCE = {
  forms: FORM_GUIDANCE,
  display: { ruleIds: [7, 22, 23, 33], useFor: ["Structured records", "Lists", "Cards", "Media and status at a glance"] },
  dialogs: { ruleIds: [16, 17, 18, 19, 20] },
  "data-tables": { ruleIds: [22, 31, 59] },
  navigation: { ruleIds: [4, 5, 6, 44] },
  feedback: { ruleIds: [24, 25, 26, 27, 28] },
  layout: { ruleIds: [3, 8, 9] },
  actions: { ruleIds: [13, 14] },
  typography: TYPOGRAPHY_GUIDANCE,
  dashboards: { ruleIds: [65, 7, 44], requirements: ["Visualize dashboard stats with ApexCharts, not divs or static images."] },
  authentication: { ruleIds: [15, 44] },
  settings: { ruleIds: [7, 15] },
  "app-shells": { ruleIds: [3, 4, 8, 44] },
  "ai-chat": { ruleIds: [23, 44], useFor: ["Assistant transcripts", "Streaming responses", "Prompt composers"] },
  onboarding: { ruleIds: [32, 44] },
  commerce: { ruleIds: [11, 33, 65] },
  docs: { ruleIds: [30, 64], useFor: ["API references", "Guides", "Long-form documentation"] },
  "mobile-apps": { ruleIds: [4, 13, 17, 47], useFor: ["Phone-first navigation", "Touch row actions", "Mobile action menus"], requirements: ["Touch targets of at least 44px; content keeps bottom padding above a fixed BottomNavigation."] },
  "workspace-tools": { ruleIds: [3, 8, 14, 18], useFor: ["Editors", "IDEs", "Builders", "File managers"], requirements: ["Keyboard shortcuts for frequent actions, shown with Kbd in menus and the command palette."] },
};

function mergeGuidance(...parts) {
  const merged = {
    ruleIds: [],
    useFor: [],
    avoid: [],
    requirements: [],
    composition: null,
  };
  for (const part of parts) {
    if (!part) continue;
    merged.ruleIds.push(...(part.ruleIds ?? []));
    merged.useFor.push(...(part.useFor ?? []));
    merged.avoid.push(...(part.avoid ?? []));
    merged.requirements.push(...(part.requirements ?? []));
    if (part.composition) merged.composition = part.composition;
  }
  const out = {};
  const ids = [...new Set(merged.ruleIds)].sort((a, b) => a - b);
  if (ids.length) out.ruleIds = ids;
  for (const key of ["useFor", "avoid", "requirements"]) {
    const values = [...new Set(merged[key])];
    if (values.length) out[key] = values;
  }
  if (merged.composition) out.composition = merged.composition;
  return out;
}

function normalizeComponentRules(rules) {
  const byNumber = new Map();
  for (const rule of rules ?? []) {
    if (!Number.isFinite(Number(rule?.number))) continue;
    byNumber.set(Number(rule.number), {
      number: Number(rule.number),
      title: rule.title ?? `Rule ${rule.number}`,
      content: rule.content ?? "",
      block: "components",
    });
  }
  return [...byNumber.values()].sort((a, b) => a.number - b.number);
}

// Resolve the full prose for every rule a component points at. The short notes
// stay in the guidance maps; the generated registry gets the actual rule text
// so a component result can explain both how and why to use it.
function withRuleText(guidance, designRules) {
  if (!guidance) return null;
  const rules = (guidance.ruleIds ?? [])
    .map((id) => designRules[String(id)])
    .filter(Boolean);
  return {
    ...guidance,
    ...(rules.length ? { rules } : {}),
  };
}

function buildDesignRuleIndex(aiDesignRules, componentRules = []) {
  const needed = new Set(BASE_GUIDANCE.ruleIds);
  for (const source of [FAMILY_GUIDANCE, COMPONENT_GUIDANCE, LAYOUT_GUIDANCE]) {
    for (const value of Object.values(source)) for (const id of value?.ruleIds ?? []) needed.add(id);
  }
  const index = {};
  for (const [block, sections] of Object.entries(aiDesignRules?.blocks ?? {})) {
    for (const rule of sections ?? []) {
      if (!needed.has(rule.number)) continue;
      index[String(rule.number)] = {
        number: rule.number,
        title: rule.title,
        block,
        content: rule.content,
      };
    }
  }
  // Component rules are authoritative even if design-rules.json still carries
  // an older copy of the block.
  for (const rule of componentRules) {
    if (needed.has(rule.number)) index[String(rule.number)] = rule;
  }
  return Object.fromEntries(Object.entries(index).sort(([a], [b]) => Number(a) - Number(b)));
}

// Layouts are intent buckets: "the set of components you reach for when
// building this kind of screen". `signals` drive natural-language matching;
// categories/families/components decide membership and stay in sync with the
// registry because they are resolved when the data is enriched.
const LAYOUTS = [
  {
    id: "forms",
    label: "Forms & data entry",
    description: "Every control for collecting input, plus the form shell and validation feedback.",
    signals: ["form", "forms", "creating a form", "create a form", "build a form", "form field", "form fields", "data entry", "input", "inputs", "signup", "sign up", "login", "log in", "register", "contact form", "checkout form", "user details"],
    categories: ["form"],
    families: ["card", "toast"],
    components: ["Button", "Callout"],
  },
  {
    id: "display",
    label: "Display & data views",
    description: "Components for showing collections, records, media, and status at a glance.",
    signals: ["display", "display data", "show data", "showing data", "data display", "view data", "display component", "display components", "content display", "list", "lists", "cards", "table and list"],
    families: ["table", "list", "card", "stat", "timeline", "carousel", "accordion", "avatar", "avatar-group", "badge", "chip", "image", "progress", "rating"],
  },
  {
    id: "dialogs",
    label: "Dialogs, modals & drawers",
    description: "Everything that opens on top of the page: modals, side panels, menus, popovers, and tooltips.",
    signals: ["modal", "modals", "dialog", "dialogs", "popup", "popups", "confirmation", "confirm", "drawer", "drawers", "side panel", "sheet", "overlay", "overlays", "menu", "menus", "tooltip", "popover"],
    families: ["modal", "drawer", "dropdown", "popover", "tooltip"],
  },
  {
    id: "data-tables",
    label: "Data tables",
    description: "Table structure plus the controls used around real tables: search, filtering, paging, and empty states.",
    signals: ["data table", "data grid", "datagrid", "table", "tables", "rows and columns", "pagination", "sorting", "filtering a table"],
    families: ["table", "filter-bar"],
    components: ["Pagination", "Input", "Select", "Checkbox", "Button", "EmptyState", "Skeleton", "Dropdown", "VirtualList"],
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Moving between pages, sections, and steps.",
    signals: ["navigation", "navigate", "menu navigation", "breadcrumb", "tabs", "pagination", "wizard steps"],
    category: "navigation",
    categories: ["navigation"],
  },
  {
    id: "feedback",
    label: "Feedback & status",
    description: "Loading, success, error, empty, and progress states.",
    signals: ["feedback", "status", "loading", "notification", "notifications", "toast", "alert", "error message", "empty state", "progress"],
    category: "feedback",
    categories: ["feedback"],
    families: ["toast"],
  },
  {
    id: "layout",
    label: "Page layout & structure",
    description: "Containers, cards, and dividers that establish page structure.",
    signals: ["layout", "layouting", "container", "page structure", "grid layout", "section", "card"],
    category: "layout",
    categories: ["layout"],
  },
  {
    id: "actions",
    label: "Buttons & actions",
    description: "Primary, icon, copy, and theme buttons.",
    signals: ["button", "buttons", "action", "actions", "click", "submit", "copy", "clipboard"],
    category: "actions",
    categories: ["actions"],
  },
  {
    id: "typography",
    label: "Text & typography",
    description: "Body copy, headings, and keyboard shortcuts.",
    signals: ["text", "typography", "heading", "paragraph", "keyboard shortcut", "kbd"],
    category: "typography",
    categories: ["typography"],
  },
  {
    id: "dashboards",
    label: "Dashboards & analytics",
    description: "KPI cards, charts-adjacent stats, tables, and progress for admin screens.",
    signals: ["dashboard", "admin panel", "analytics", "metrics", "kpi", "stats", "overview page", "saas dashboard"],
    families: ["stat", "card", "table", "progress", "timeline", "tabs", "app-shell", "sidebar", "filter-bar", "notification-center", "command-palette"],
    components: ["Button", "Select", "DatePicker", "DateRangePicker", "Badge", "Avatar", "Dropdown", "EmptyState", "Skeleton"],
  },
  {
    id: "authentication",
    label: "Authentication",
    description: "Login, signup, and verification screens.",
    signals: ["authentication", "auth", "login", "signup", "sign up", "password", "otp", "verification code", "forgot password"],
    components: ["Input", "Checkbox", "Button", "PinInput", "Container", "Card", "CardHeader", "CardBody", "CardFooter", "Callout", "ThemeToggleButton", "ToastProvider"],
  },
  {
    id: "settings",
    label: "Settings & preferences",
    description: "Grouped controls, toggles, and save actions for configuration screens.",
    signals: ["settings", "preferences", "configuration", "profile settings", "account settings"],
    families: ["tabs", "card", "form-section", "color-picker", "theme-toggle-button"],
    components: ["Input", "Select", "Switch", "Checkbox", "RadioGroup", "Slider", "Button", "ToastProvider", "Callout", "Divider", "TimePicker", "TimeRangePicker", "AlertDialog", "FileUpload", "Avatar"],
  },
];

// Local extension intents. They are appended rather than merged into the
// upstream list so the original 12 buckets stay byte-stable.
LAYOUTS.push(
  {
    id: "app-shells",
    label: "App shells & admin frames",
    description: "Responsive application frames with persistent navigation and a main content region.",
    signals: ["app shell", "application shell", "dashboard shell", "admin layout", "saas shell", "sidebar layout", "topbar layout"],
    families: ["app-shell", "sidebar", "menubar", "resizable-panel"],
    components: ["SkipLink", "Breadcrumb", "ThemeProvider", "ThemeToggleButton"],
  },
  {
    id: "ai-chat",
    label: "AI chat & assistant interfaces",
    description: "Message transcripts, streaming responses, prompt inputs, and attachments.",
    signals: ["ai chat", "chat ui", "chatbot", "assistant", "messages", "conversation", "streaming response", "prompt"],
    families: ["chat", "code-block", "attachment-card", "file-upload"],
    components: ["Textarea", "Button", "CopyButton", "IconButton", "Spinner"],
  },
  {
    id: "onboarding",
    label: "Onboarding & guided flows",
    description: "Tours, wizards, and validated multi-step setup.",
    signals: ["onboarding", "product tour", "walkthrough", "guided setup", "wizard", "multi-step form"],
    families: ["onboarding", "stepper"],
    components: ["Button", "Modal", "Callout", "Progress"],
  },
  {
    id: "commerce",
    label: "Commerce & pricing",
    description: "Product prices, savings, ratings, and storefront surfaces.",
    signals: ["commerce", "storefront", "product", "pricing", "price", "cart", "checkout", "savings"],
    families: ["commerce", "image", "rating", "badge"],
    components: ["Card", "Button", "Chip", "Stat"],
  },
  {
    id: "docs",
    label: "Documentation & developer content",
    description: "Code blocks, tables of contents, breadcrumbs, and reference navigation.",
    signals: ["docs", "documentation", "api reference", "guide", "table of contents", "code sample", "developer content"],
    families: ["table-of-contents", "code-block", "breadcrumb", "chat"],
    components: ["Tabs", "Callout", "Kbd", "CopyButton", "Accordion"],
  },
  {
    id: "mobile-apps",
    label: "Mobile apps & PWAs",
    description: "Touch-first navigation, action sheets and swipeable rows for phone-sized screens.",
    signals: ["mobile app", "mobile first", "mobile-first", "pwa", "phone", "touch", "bottom tabs", "tab bar", "ios", "android"],
    families: ["bottom-navigation", "action-sheet", "swipe-actions", "drawer"],
    components: ["IconButton", "Button", "List", "Avatar", "Badge", "EmptyState", "Skeleton"],
  },
  {
    id: "workspace-tools",
    label: "Editors & workspace tools",
    description: "Pro-tool layouts: menubars, resizable panes, file trees, toolbars and command menus.",
    signals: ["editor", "ide", "builder", "canvas", "design tool", "workspace", "file manager", "explorer", "split pane", "pro tool", "studio"],
    families: ["menubar", "resizable-panel", "tree-view", "floating-toolbar", "command-palette", "scroll-area"],
    components: ["ContextMenu", "Tabs", "IconButton", "Tooltip", "Kbd", "CodeBlock"],
  },
);

function tokens(text) {
  return String(text ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function familyFromModule(module) {
  return tokens(module).join("-") || "other";
}

function prettyFamily(family) {
  const info = FAMILY_INFO[family];
  if (info) return info.label;
  return tokens(family).map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

function resolveLayoutMembers(layout, byName, byCategory, byFamily) {
  const names = new Set();
  for (const category of layout.categories ?? (layout.category ? [layout.category] : [])) {
    for (const component of byCategory.get(category) ?? []) names.add(component.name);
  }
  for (const family of layout.families ?? []) {
    for (const component of byFamily.get(family) ?? []) names.add(component.name);
  }
  for (const name of layout.components ?? []) {
    const resolved = byName.get(String(name).toLowerCase());
    if (resolved) names.add(resolved.name);
  }
  for (const name of layout.exclude ?? []) names.delete(name);
  return [...names].sort((a, b) => a.localeCompare(b));
}

/**
 * Add a machine-readable semantic layer to a raw component registry.
 * Additive only: all upstream fields are preserved unchanged, and running this
 * twice produces the same output.
 */
export function enrichRegistry(registry, options = {}) {
  // Component rules live with the component data now. Fall back to the old
  // design-rules.json block only for callers that have not migrated yet.
  const componentRules = normalizeComponentRules(
    options.componentRules
    ?? options.aiDesignRules?.blocks?.components
    ?? registry?.search?.componentRules,
  );
  const designRules = buildDesignRuleIndex(options.aiDesignRules, componentRules);
  const guidanceBaseline = withRuleText(GUIDANCE_BASELINE, designRules);
  const components = (registry?.components ?? []).map((component) => {
    const { search: _ignored, ...raw } = component;
    return raw;
  });
  const { search: _ignoredTop, ...rest } = registry ?? {};

  const byName = new Map(components.map((component) => [component.name.toLowerCase(), component]));

  const familyOf = (component) => COMPONENT_HINTS[component.name]?.family ?? familyFromModule(component.module);
  const byFamily = new Map();
  for (const component of components) {
    const family = familyOf(component);
    const members = byFamily.get(family) ?? [];
    members.push(component);
    byFamily.set(family, members);
  }
  const byCategory = new Map();
  for (const component of components) {
    const members = byCategory.get(component.category) ?? [];
    members.push(component);
    byCategory.set(component.category, members);
  }

  const genericProps = new Set(["className", "style", "children", "id", "onClick", "value", "onChange", "size", "variant"]);
  const enrichedComponents = components.map((component) => {
    const hint = COMPONENT_HINTS[component.name] ?? {};
    const family = familyOf(component);
    const familyInfo = FAMILY_INFO[family] ?? {};
    const aliases = unique([...(hint.aliases ?? []), ...(familyInfo.aliases ?? [])]);
    const useCases = unique(hint.useCases ?? []);
    const keywords = unique([
      ...tokens(component.name),
      ...tokens(component.module),
      ...aliases.flatMap(tokens),
      ...useCases.flatMap(tokens),
      ...tokens(component.description),
      ...(component.props ?? [])
        .map((prop) => prop.name)
        .filter((name) => !genericProps.has(name))
        .flatMap(tokens),
    ]);
    const related = (byFamily.get(family) ?? [])
      .filter((candidate) => candidate.name !== component.name)
      .map((candidate) => candidate.name);

    const guidance = withRuleText(
      mergeGuidance(
        BASE_GUIDANCE,
        FAMILY_GUIDANCE[family],
        COMPONENT_GUIDANCE[component.name],
      ),
      designRules,
    );

    return {
      ...component,
      search: { family, aliases, useCases, keywords, related, guidance },
    };
  });

  const families = Object.fromEntries(
    [...byFamily.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([family, members]) => [
        family,
        {
          label: prettyFamily(family),
          aliases: unique((FAMILY_INFO[family] ?? {}).aliases ?? []),
          guidance: withRuleText(mergeGuidance(BASE_GUIDANCE, FAMILY_GUIDANCE[family]), designRules),
          componentCount: members.length,
          components: members.map((component) => component.name).sort((a, b) => a.localeCompare(b)),
        },
      ]),
  );

  const categories = Object.fromEntries(
    [...byCategory.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, members]) => [
        category,
        {
          componentCount: members.length,
          components: members.map((component) => component.name).sort((a, b) => a.localeCompare(b)),
        },
      ]),
  );

  const layouts = Object.fromEntries(
    LAYOUTS.map((layout) => [
      layout.id,
      {
        id: layout.id,
        label: layout.label,
        description: layout.description,
        signals: layout.signals,
        categories: layout.categories ?? (layout.category ? [layout.category] : []),
        families: layout.families ?? [],
        guidance: withRuleText(mergeGuidance(BASE_GUIDANCE, LAYOUT_GUIDANCE[layout.id]), designRules),
        components: resolveLayoutMembers(layout, byName, byCategory, byFamily),
      },
    ]),
  );

  return {
    ...rest,
    componentCount: components.length,
    components: enrichedComponents,
    search: {
      version: 3,
      synonyms: SYNONYMS,
      categories,
      families,
      layouts,
      guidanceBaseline,
      componentRules,
      designRules,
    },
  };
}
