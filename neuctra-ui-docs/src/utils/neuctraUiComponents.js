export const Components = [
  {
    name: "Button",
    description:
      "Flexible button component supporting variants, sizes, icons, loading state, and full width layout",
    props: {
      variant: ["default", "outline", "ghost"],
      size: ["sm", "md", "lg"],
      loading: "boolean",
      loadingText: "string",
      fullWidth: "boolean",
      iconBefore: "ReactNode",
      iconAfter: "ReactNode",
      weight: "number",
      primaryColor: "string",
      disabled: "boolean",
      type: ["button", "submit", "reset"],
      className: "string",
    },
    example: `<Button variant="default" size="md" iconBefore={<Icon />} loading>Submit</Button>`,
  },
  {
    name: "Container",
    description:
      "Responsive layout wrapper with max width, padding, and centering. Use this as the base wrapper. Apply flex or grid classes via className for layout control.",
    props: {
      size: ["sm", "md", "lg", "xl", "2xl", "full"],
      padding: ["none", "sm", "md", "lg", "xl"],
      center: "boolean",
      className: "string",
    },
    example: `<Container size="lg" padding="md" className="flex items-center justify-between">...</Container>`,
  },
  {
  name: "Input",
  description: "Advanced input field supporting text, password, email, number, and textarea with validation states, icons, prefixes, and customizable styling",
  props: {
    label: "string",
    name: "string",
    type: ["text", "password", "email", "number", "textarea"],
    placeholder: "string",

    value: "string",
    defaultValue: "string",
    onChange: "function",

    required: "boolean",
    disabled: "boolean",
    readOnly: "boolean",

    error: ["string", "boolean"],
    success: "boolean",
    helperText: "string",

    icon: "ReactElement",
    prefix: "string",
    prefixIcon: "ReactElement",
    suffixIcon: "ReactNode",

    min: "number",
    max: "number",
    step: "number",

    rows: "number",

    primaryTheme: "boolean",
    primaryColor: "string",

    className: "string"
  },
  example: `<Input label="Email" type="email" placeholder="Enter your email" required helperText="We'll never share your email" />`
},
{
  name: "Image",
  description: "Flexible image component with support for overlays, hover effects, responsive behavior, custom sizing, and fallback icons",
  props: {
    src: "string",
    alt: "string",
    title: "string",

    width: ["string", "number"],
    height: ["string", "number"],

    rounded: "string",
    borderColor: "string",
    borderWidth: ["string", "number"],
    shadow: "boolean",
    opacity: "number",

    objectFit: ["cover", "contain", "fill", "none", "scale-down"],

    overlayText: "string",
    overlayColor: "string",

    svgIcon: "ReactNode",

    responsive: "boolean",
    p: "string",
    m: "string",

    hoverScale: "number",
    hoverRotate: "number",
    hoverOpacity: "number",
    hoverShadow: "boolean",
    transitionDuration: "string",

    overflow: ["hidden", "scroll", "auto", "visible", "x", "y"],

    className: "string",
    style: "object",

    onClick: "function",
    onLoad: "function",
    onError: "function"
  },
  example: `<Image src="/image.jpg" alt="Preview" rounded="rounded-xl" shadow hoverScale={1.1} overlayText="View" />`
},
{
  name: "Text",
  description: "Flexible typography component for rendering text with different HTML tags, sizes, weights, alignment, and text styles. Automatically styles links when using anchor tag",
  props: {
    as: ["p", "span", "div", "label", "a", "h1", "h2", "h3", "h4", "h5", "h6"],
    size: ["xs", "sm", "md", "lg", "xl", "2xl", "string"],
    weight: "number",
    align: ["left", "center", "right", "justify"],

    transform: ["uppercase", "lowercase", "capitalize"],
    italic: "boolean",
    underline: "boolean",
    strikethrough: "boolean",

    truncate: "boolean",

    className: "string",
    style: "object"
  },
  example: `<Text as="h1" size="2xl" weight={700} align="center">Hello World</Text>`
},
{
  name: "Table",
  description: "Complete table system including wrapper, header, body, rows, and cells. Supports responsive layout, hover effects, and interactive rows",
  props: {
    className: "string",
    style: "object"
  },
  subComponents: [
    {
      name: "THead",
      description: "Table header section for column headings",
      props: {
        className: "string",
        style: "object"
      }
    },
    {
      name: "TBody",
      description: "Table body section for rows",
      props: {
        className: "string",
        style: "object"
      }
    },
    {
      name: "TRow",
      description: "Table row with optional click and hover behavior",
      props: {
        onClick: "function",
        hoverBgColor: "string",
        darkMode: "boolean",
        className: "string",
        style: "object"
      }
    },
    {
      name: "TH",
      description: "Header cell for column titles",
      props: {
        className: "string",
        style: "object"
      }
    },
    {
      name: "TD",
      description: "Data cell for table content",
      props: {
        className: "string",
        style: "object"
      }
    }
  ],
  rules: [
    "THead and TBody must be inside Table",
    "TRow must be inside THead or TBody",
    "TH must be inside TRow within THead",
    "TD must be inside TRow within TBody",
    "Do not place TD or TH outside TRow"
  ],
  example: `<Table>
  <THead>
    <TRow>
      <TH>Name</TH>
      <TH>Age</TH>
    </TRow>
  </THead>
  <TBody>
    <TRow onClick={() => alert("clicked")}>
      <TD>John</TD>
      <TD>25</TD>
    </TRow>
  </TBody>
</Table>`
},
{
  name: "Tabs",
  description: "Full-featured responsive tabs system with variants, vertical/horizontal positions, mobile-friendly behavior (drawer, scroll, stack), and interactive panels",
  props: {
    className: "string",
    style: "object",
    defaultActive: "number",
    position: "top | bottom | left | right",
    variant: "solid | outline | underline | pill",
    fullWidth: "boolean",
    radius: "number",
    transitionDuration: "number",
    bordered: "boolean",
    mobileBreakpoint: "number",
    mobileVariant: "drawer | scroll | stack | collapse",
    primaryColor: "string",
    activeColor: "string",
    textColor: "string",
    hoverColor: "string",
    borderColor: "string",
    disabledColor: "string",
    backgroundColor: "string",
    onTabChange: "function",
    tabCount: "number"
  },
  subComponents: [
    {
      name: "TabList",
      description: "Container for Tab buttons; supports mobile drawer, scroll strip, or stacked layout",
      props: {
        children: "ReactNode",
        gap: "number",
        drawerLabel: "ReactNode",
        drawerIcon: "ReactNode",
        style: "object",
        className: "string"
      }
    },
    {
      name: "Tab",
      description: "Individual tab button; supports variants, icons, disabled state, active/inactive styles, hover effects, and keyboard navigation",
      props: {
        children: "ReactNode",
        index: "number",
        icon: "ReactNode",
        disabled: "boolean",
        ariaLabel: "string",
        style: "object",
        className: "string",
        activeStyle: "object",
        inactiveStyle: "object"
      }
    },
    {
      name: "TabPanels",
      description: "Wrapper for all tab panels",
      props: {
        children: "ReactNode",
        style: "object",
        className: "string"
      }
    },
    {
      name: "TabPanel",
      description: "Content panel for each tab; supports keeping inactive panels mounted",
      props: {
        children: "ReactNode",
        index: "number",
        keepMounted: "boolean",
        style: "object",
        className: "string"
      }
    }
  ],
  rules: [
    "TabList must be inside Tabs",
    "Tab must be inside TabList",
    "TabPanels must be inside Tabs",
    "TabPanel must be inside TabPanels",
    "TabPanel index must correspond to Tab index",
    "Do not place Tab or TabPanel outside their respective containers"
  ],
  example: `<Tabs defaultActive={0} variant="solid" position="top" mobileVariant="drawer">
  <TabList>
    <Tab index={0}>Home</Tab>
    <Tab index={1}>Profile</Tab>
    <Tab index={2} disabled>Settings</Tab>
  </TabList>
  <TabPanels>
    <TabPanel index={0}>Welcome Home!</TabPanel>
    <TabPanel index={1}>User Profile Details</TabPanel>
    <TabPanel index={2}>Settings Content</TabPanel>
  </TabPanels>
</Tabs>`
},
{
  name: "Select",
  description: "Custom dropdown/select input supporting single/multiple selection, themes, icons, helper text, validation states, and controlled/uncontrolled usage",
  props: {
    label: "string",
    name: "string",
    value: "string | string[]",
    defaultValue: "string | string[]",
    onValueChange: "(value: string | string[], name?: string) => void",
    options: "Array<{ label: string, value: string, icon?: ReactNode }>",
    placeholder: "string",
    required: "boolean",
    disabled: "boolean",
    error: "string | boolean",
    success: "boolean",
    helperText: "string",
    multiple: "boolean",
    labelIcon: "React.ElementType",
    prefixIcon: "React.ElementType",
    variant: "'dark' | 'light'",
    primaryTheme: "boolean",
    primaryColor: "string",
    containerClassName: "string",
    labelClassName: "string",
    triggerClassName: "string",
    dropdownClassName: "string",
    itemClassName: "string",
    className: "string"
  },
  behaviors: [
    "Supports controlled (`value`) and uncontrolled (`defaultValue`) modes",
    "Single or multiple selection (`multiple` prop)",
    "Customizable theme (`dark` or `light`) with optional primary color override",
    "Prefix and label icons supported via `prefixIcon` and `labelIcon`",
    "Error and success states with helper text feedback",
    "Dropdown closes when clicking outside or when single selection is made",
    "Selected items are highlighted, with checkmark for multiple selections"
  ],
  example: `<Select
  label="Choose Fruits"
  name="fruits"
  multiple
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" }
  ]}
  placeholder="Select fruits..."
  onValueChange={(val) => console.log(val)}
  variant="light"
  primaryColor="#10b981"
/>`
},
{
  name: "Badge",
  description: "Compact status or notification indicator with optional text, icon, count, and notification dot. Supports sizes, shapes, colors, and click interaction",
  props: {
    text: "string",
    icon: "ReactNode",
    iconPosition: "'left' | 'right'",
    primaryColor: "string",
    size: "'sm' | 'md' | 'lg'",
    rounded: "boolean",
    notificationDot: "boolean",
    dotColor: "string",
    count: "number | string",
    pulse: "boolean",
    className: "string",
    onClick: "() => void"
  },
  behaviors: [
    "Shows optional text and/or icon",
    "Icon can appear left or right (`iconPosition`)",
    "Supports small, medium, and large sizes",
    "Custom primary color applied as background",
    "Optional rounded shape (full or medium radius)",
    "Notification dot can pulse and has customizable color",
    "Count badge overlays top-right corner",
    "Clickable badge changes opacity on hover if `onClick` is provided"
  ],
  example: `<Badge
  text="New"
  icon={<SomeIcon />}
  iconPosition="left"
  size="md"
  rounded
  primaryColor="#10b981"
  notificationDot
  dotColor="#ef4444"
  count={5}
  pulse
  onClick={() => alert('Clicked')}
/>`
},
{
  name: "Drawer",
  description: "Slide-in panel for additional content, notifications, or menus. Supports overlay click, positions, sizes, and optional close button",
  props: {
    open: "boolean",
    onClose: "() => void",
    position: "'left' | 'right' | 'top' | 'bottom'",
    size: "string",
    className: "string",
    overlayClassName: "string",
    children: "ReactNode",
    showCloseButton: "boolean",
    closeButtonClassName: "string"
  },
  behaviors: [
    "Slides in from specified position (left, right, top, bottom)",
    "Overlay dims background and closes drawer on click",
    "Supports smooth open/close animation",
    "Optional close button in top-right corner",
    "Panel dimensions controlled via `size` prop",
    "Content scrollable if overflow occurs",
    "Can be fully customized via `className` and overlay classes"
  ],
  example: `<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  position="right"
  size="320px"
  showCloseButton
>
  <p>Your drawer content here</p>
</Drawer>`
},
{
  name: "List",
  description: "Flexible list component supporting nested items, icons, click events, inline/ordered/unordered types, and theme customization.",
  props: {
    title: "string",
    titleIcon: "ReactNode",
    items: "ListItemType[]",
    type: "'unordered' | 'ordered' | 'inline'",
    primaryTheme: "boolean",
    primaryColor: "string",
    className: "string",
    itemClassName: "string",
    titleClassName: "string",
    bulletClassName: "string"
  },
  itemType: {
    text: "string",
    icon: "ReactNode",
    onClick: "() => void",
    subItems: "ListItemType[]"
  },
  behaviors: [
    "Supports nested lists via `subItems` property",
    "List type can be unordered, ordered, or inline",
    "Supports optional icons per item",
    "Clickable items invoke `onClick`",
    "Dynamic theming using `primaryTheme` and `primaryColor`",
    "Bullets or icons adapt to theme",
    "Custom classes for container, items, bullets, and title"
  ],
  example: `<List
  title="Features"
  titleIcon={<SomeIcon />}
  type="unordered"
  primaryTheme
  items={[
    { text: "Fast", icon: <SpeedIcon />, onClick: () => console.log("Fast") },
    { text: "Reliable", subItems: [
      { text: "24/7 Support" },
      { text: "Monitoring" }
    ]},
    { text: "Secure" }
  ]}
/>`
}

];
