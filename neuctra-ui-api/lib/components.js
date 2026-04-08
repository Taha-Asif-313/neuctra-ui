export const components = [
  {
    name: "Button",
    description:
      "Clickable button component with support for variants, sizes, icons, and loading state.",
    props: {
      iconBefore: {
        type: "ReactNode",
        required: false,
        description: "Element displayed before the button label",
      },
      iconAfter: {
        type: "ReactNode",
        required: false,
        description: "Element displayed after the button label",
      },
      loading: {
        type: "boolean",
        required: false,
        default: false,
        description:
          "Whether the button shows a loading spinner and disables interaction",
      },
      loadingText: {
        type: "string",
        required: false,
        default: "Loading...",
        description: "Text displayed when the button is in loading state",
      },
      fullWidth: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether the button takes full width of its container",
      },
      variant: {
        type: "string",
        required: false,
        default: "default",
        enum: ["default", "outline", "ghost"],
        description: "Visual style variant of the button",
      },
      size: {
        type: "string",
        required: false,
        default: "md",
        enum: ["sm", "md", "lg"],
        description: "Size of the button",
      },
      weight: {
        type: "string",
        required: false,
        default: 400,
        description: "Font weight of the button text",
      },
      primaryColor: {
        type: "string",
        required: false,
        default: "var(--primary)",
        description: "Primary color used for styling the button",
      },
      disabled: {
        type: "boolean",
        required: false,
        description: "Disables the button interaction",
      },
      type: {
        type: "string",
        required: false,
        default: "button",
        description: "HTML button type attribute",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for styling",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles applied to the button",
      },
    },
    slots: {
      children: {
        description: "Main content or label of the button",
        allowedComponents: ["*"],
      },
    },
  },
  {
    name: "Accordion",
    description:
      "Expandable accordion component for displaying collapsible content sections.",
    props: {
      items: {
        type: "array",
        required: true,
        description: "List of accordion items with title and content",
      },
      allowMultiple: {
        type: "boolean",
        required: false,
        default: false,
        description:
          "Whether multiple accordion items can be open at the same time",
      },
      defaultOpen: {
        type: "array",
        required: false,
        default: [],
        description: "Indexes of items that are open by default",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the root container",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the root container",
      },
      itemClassName: {
        type: "string",
        required: false,
        description: "CSS classes for each accordion item",
      },
      itemStyle: {
        type: "object",
        required: false,
        description: "Inline styles for each accordion item",
      },
      headerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the header section",
      },
      headerStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the header section",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the title element",
      },
      titleStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the title element",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the toggle icon",
      },
      iconStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the toggle icon",
      },
      contentWrapperClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the content wrapper",
      },
      contentWrapperStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the content wrapper",
      },
      contentClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the content section",
      },
      contentStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the content section",
      },
      hoverClassName: {
        type: "string",
        required: false,
        description: "CSS classes applied on hover state of header",
      },
      hoverStyle: {
        type: "object",
        required: false,
        description: "Inline styles applied on hover state of header",
      },
      borderColor: {
        type: "string",
        required: false,
        default: "#e5e7eb",
        description: "Border color of accordion items",
      },
      radius: {
        type: "string",
        required: false,
        default: "0.5rem",
        description: "Border radius of accordion items",
      },
      shadow: {
        type: "string",
        required: false,
        default: "0 1px 4px rgba(0,0,0,0.08)",
        description: "Box shadow applied to accordion items",
      },
      duration: {
        type: "number",
        required: false,
        default: 300,
        description: "Animation duration for expand/collapse in milliseconds",
      },
      iconOpen: {
        type: "ReactNode",
        required: false,
        description: "Custom icon displayed when item is open",
      },
      iconClose: {
        type: "ReactNode",
        required: false,
        description: "Custom icon displayed when item is closed",
      },
      renderItem: {
        type: "function",
        required: false,
        description: "Custom render function for each accordion item",
      },
    },
  },
  {
    name: "Avatar",
    description:
      "User avatar component displaying an image or fallback with optional status indicator and customization.",
    props: {
      src: {
        type: "string",
        required: false,
        description: "Image source URL for the avatar",
      },
      alt: {
        type: "string",
        required: false,
        default: "User avatar",
        description: "Alternative text for the avatar image",
      },
      size: {
        type: "string",
        required: false,
        default: "md",
        enum: ["xs", "sm", "md", "lg", "xl", "2xl", "responsive"],
        description: "Size of the avatar",
      },
      variant: {
        type: "string",
        required: false,
        default: "circular",
        enum: ["circular", "rounded", "square"],
        description: "Shape style of the avatar",
      },
      isOnline: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to show online status indicator",
      },
      isOffline: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to show offline status indicator",
      },
      ring: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to display a ring around the avatar",
      },
      ringColor: {
        type: "string",
        required: false,
        default: "#3b82f6",
        description: "Color of the ring around the avatar",
      },
      fallback: {
        type: "string",
        required: false,
        description: "Fallback text displayed when image is unavailable",
      },
      onClick: {
        type: "function",
        required: false,
        description: "Callback triggered when avatar is clicked",
      },
      statusPosition: {
        type: "string",
        required: false,
        default: "bottom-right",
        enum: ["top-left", "top-right", "bottom-left", "bottom-right"],
        description: "Position of the status indicator dot",
      },
      className: {
        type: "string",
        required: false,
        default: "",
        description: "Additional CSS classes for the avatar container",
      },
      statusClassName: {
        type: "string",
        required: false,
        default: "",
        description: "Additional CSS classes for the status indicator",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the avatar container",
      },
      statusStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the status indicator",
      },
    },
  },
  {
    name: "Badge",
    description:
      "Small badge component for displaying text, icons, and notification indicators.",
    props: {
      text: {
        type: "string",
        required: false,
        description: "Text content displayed inside the badge",
      },
      icon: {
        type: "ReactNode",
        required: false,
        description: "Icon element displayed inside the badge",
      },
      iconPosition: {
        type: "string",
        required: false,
        default: "left",
        enum: ["left", "right"],
        description: "Position of the icon relative to the text",
      },
      primaryColor: {
        type: "string",
        required: false,
        default: "var(--primary)",
        description: "Background color of the badge",
      },
      size: {
        type: "string",
        required: false,
        default: "md",
        enum: ["sm", "md", "lg"],
        description: "Size of the badge",
      },
      rounded: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether the badge has fully rounded corners",
      },
      notificationDot: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether to display a notification dot",
      },
      dotColor: {
        type: "string",
        required: false,
        default: "#ef4444",
        description: "Color of the notification dot",
      },
      count: {
        type: "number",
        required: false,
        description: "Numeric or string value displayed as a count indicator",
      },
      pulse: {
        type: "boolean",
        required: false,
        default: false,
        description: "Whether the notification dot has a pulsing animation",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the badge container",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the badge container",
      },
      dotClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the notification dot",
      },
      dotStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the notification dot",
      },
      countClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the count indicator",
      },
      countStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the count indicator",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the icon",
      },
      iconStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the icon",
      },
      onClick: {
        type: "function",
        required: false,
        description: "Callback triggered when the badge is clicked",
      },
    },
  },
  {
    name: "CheckboxGroup",
    description:
      "Group of selectable checkboxes with customizable rendering, styles, and behavior.",
    props: {
      name: {
        type: "string",
        required: false,
        description: "Name attribute for the checkbox inputs",
      },
      options: {
        type: "array",
        required: true,
        description:
          "List of checkbox options with label, value, and optional disabled state",
      },
      selectedValues: {
        type: "array",
        required: false,
        default: [],
        description: "Array of currently selected values",
      },
      onChange: {
        type: "function",
        required: false,
        description: "Callback triggered when selected values change",
      },
      disabled: {
        type: "boolean",
        required: false,
        default: false,
        description: "Disables all checkboxes",
      },
      readOnly: {
        type: "boolean",
        required: false,
        default: false,
        description: "Prevents changes to selection",
      },
      required: {
        type: "boolean",
        required: false,
        default: false,
        description: "Marks the inputs as required",
      },
      error: {
        type: "string",
        required: false,
        description: "Error message displayed below the group",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for the root container",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the container wrapper",
      },
      itemClassName: {
        type: "string",
        required: false,
        description: "CSS classes for each checkbox item",
      },
      labelClassName: {
        type: "string",
        required: false,
        description: "CSS classes for each label element",
      },
      textClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the label text",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the checkbox icon",
      },
      errorClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the error message",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the root container",
      },
      containerStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the container wrapper",
      },
      itemStyle: {
        type: "object",
        required: false,
        description: "Inline styles for each checkbox item",
      },
      labelStyle: {
        type: "object",
        required: false,
        description: "Inline styles for each label element",
      },
      textStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the label text",
      },
      iconStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the checkbox icon",
      },
      errorStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the error message",
      },
      customIcon: {
        type: "function",
        required: false,
        description: "Custom renderer for checkbox icon",
      },
      iconSize: {
        type: "number",
        required: false,
        default: 20,
        description: "Size of the checkbox icon",
      },
      checkedColor: {
        type: "string",
        required: false,
        description: "Color of the checked state",
      },
      uncheckedColor: {
        type: "string",
        required: false,
        description: "Color of the unchecked state",
      },
      checkmarkColor: {
        type: "string",
        required: false,
        description: "Color of the checkmark icon",
      },
      textColor: {
        type: "string",
        required: false,
        description: "Color of the label text",
      },
      darkMode: {
        type: "boolean",
        required: false,
        default: false,
        description: "Enables dark mode styling",
      },
      renderItem: {
        type: "function",
        required: false,
        description: "Custom render function for each checkbox item",
      },
    },
  },
  {
    name: "Container",
    description:
      "Layout container component for controlling width, padding, and horizontal alignment.",
    props: {
      size: {
        type: "string",
        required: false,
        default: "full",
        enum: ["sm", "md", "lg", "xl", "2xl", "full"],
        description: "Maximum width of the container",
      },
      padding: {
        type: "string",
        required: false,
        default: "none",
        enum: ["none", "sm", "md", "lg", "xl"],
        description: "Padding inside the container",
      },
      center: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to center the container horizontally",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles applied to the container",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes for styling",
      },
    },
    slots: {
      children: {
        description: "Content inside the container",
        allowedComponents: ["*"],
      },
    },
  },
  {
    name: "DrawerButton",
    description:
      "A button component to trigger opening a drawer with optional icon.",
    props: {
      label: {
        type: "string",
        required: false,
        default: "Open Drawer",
        description: "Text displayed on the button",
      },
      icon: {
        type: "ReactNode",
        required: false,
        description: "Optional icon to display inside the button",
      },
      iconPosition: {
        type: "string",
        required: false,
        default: "left",
        enum: ["left", "right"],
        description: "Position of the icon relative to the label",
      },
      onClick: {
        type: "function",
        required: false,
        description: "Callback invoked when the button is clicked",
      },
      className: {
        type: "string",
        required: false,
        description: "CSS classes applied to the button",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the button",
      },
      labelClassName: {
        type: "string",
        required: false,
        description: "CSS classes applied to the label text",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "CSS classes applied to the icon",
      },
    },
  },
  {
    name: "Drawer",
    description:
      "A sliding panel component that can appear from any screen edge with optional overlay and close button.",
    props: {
      open: {
        type: "boolean",
        required: true,
        description: "Controls whether the drawer is open",
      },
      onClose: {
        type: "function",
        required: false,
        description: "Callback invoked when the drawer requests to close",
      },
      position: {
        type: "string",
        required: false,
        default: "right",
        enum: ["left", "right", "top", "bottom"],
        description: "Edge from which the drawer slides in",
      },
      size: {
        type: "string",
        required: false,
        default: "320px",
        description: "Width or height of the drawer depending on position",
      },
      showCloseButton: {
        type: "boolean",
        required: false,
        default: true,
        description: "Whether to display a close button inside the drawer",
      },
      className: {
        type: "string",
        required: false,
        description: "CSS classes applied to the drawer wrapper",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the drawer wrapper",
      },
      overlayClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the overlay background",
      },
      overlayStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the overlay background",
      },
      panelClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the sliding panel",
      },
      panelStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the sliding panel",
      },
      contentClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the drawer content container",
      },
      contentStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the drawer content container",
      },
      closeButtonClassName: {
        type: "string",
        required: false,
        description: "CSS classes for the close button",
      },
      closeButtonStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the close button",
      },
      zIndex: {
        type: "number",
        required: false,
        default: 50,
        description: "Z-index of the drawer wrapper",
      },
      renderContent: {
        type: "function",
        required: false,
        description:
          "Custom render function for drawer content; receives a close callback",
      },
    },
    slots: {
      children: {
        description:
          "Content inside the drawer panel if renderContent is not provided",
        allowedComponents: ["*"],
      },
    },
  },
  {
    name: "Image",
    description:
      "Displays an image with optional overlay, styling, and interactive behavior.",
    props: {
      src: {
        type: "string",
        required: false,
        description: "URL of the image to display",
      },
      alt: {
        type: "string",
        required: false,
        default: "",
        description: "Alt text for the image",
      },
      title: {
        type: "string",
        required: false,
        description: "Tooltip text displayed on hover",
      },
      width: {
        type: "string | number | object",
        required: false,
        default: "100%",
        description: "Width of the image or responsive widths",
      },
      height: {
        type: "string | number | object",
        required: false,
        description: "Height of the image or responsive heights",
      },
      aspectRatio: {
        type: "number",
        required: false,
        description: "Aspect ratio of the image",
      },
      radius: {
        type: "string | number",
        required: false,
        description: "Border radius of the image container",
      },
      border: {
        type: "string",
        required: false,
        description: "CSS border of the image container",
      },
      shadow: {
        type: "boolean",
        required: false,
        description: "Whether to apply a shadow",
      },
      opacity: {
        type: "number",
        required: false,
        default: 1,
        description: "Opacity of the image",
      },
      objectFit: {
        type: "string",
        required: false,
        default: "cover",
        description: "CSS object-fit property for the image",
      },
      overlay: {
        type: "ReactNode",
        required: false,
        description: "Content rendered on top of the image",
      },
      overlayColor: {
        type: "string",
        required: false,
        default: "rgba(0,0,0,0.4)",
        description: "Background color for the overlay",
      },
      clickable: {
        type: "boolean",
        required: false,
        description: "Whether the image is clickable",
      },
      onClick: {
        type: "function",
        required: false,
        description: "Callback invoked when the image is clicked",
      },
      fallback: {
        type: "ReactNode",
        required: false,
        description: "Content displayed when the image source is not available",
      },
      loading: {
        type: "string",
        required: false,
        default: "lazy",
        enum: ["lazy", "eager"],
        description: "Image loading behavior",
      },
      style: {
        type: "object",
        required: false,
        description: "Custom inline styles for the wrapper",
      },
      className: {
        type: "string",
        required: false,
        description: "CSS classes for the wrapper",
      },
    },
    slots: {
      overlay: {
        description: "Custom content rendered over the image",
        allowedComponents: ["*"],
      },
      fallback: {
        description: "Fallback content when image source is missing",
        allowedComponents: ["*"],
      },
    },
  },
  {
    name: "Input",
    description:
      "A flexible input or textarea component with support for labels, icons, validation, and theming.",
    props: {
      label: {
        type: "string",
        required: false,
        description: "Label displayed above the input",
      },
      name: {
        type: "string",
        required: false,
        default: "",
        description: "Name attribute of the input",
      },
      type: {
        type: "string",
        required: false,
        default: "text",
        enum: ["text", "password", "email", "number", "textarea"],
        description: "Type of input or textarea",
      },
      placeholder: {
        type: "string",
        required: false,
        default: "",
        description: "Placeholder text for the input",
      },
      value: {
        type: "string",
        required: false,
        description: "Controlled value of the input",
      },
      defaultValue: {
        type: "string",
        required: false,
        description: "Initial value of the input for uncontrolled usage",
      },
      onChange: {
        type: "function",
        required: false,
        description: "Callback fired on input value change",
      },
      required: {
        type: "boolean",
        required: false,
        description: "Marks the input as required",
      },
      disabled: {
        type: "boolean",
        required: false,
        description: "Disables the input",
      },
      readOnly: {
        type: "boolean",
        required: false,
        description: "Makes the input read-only",
      },
      error: {
        type: "string | boolean",
        required: false,
        description: "Error message or boolean flag for invalid state",
      },
      success: {
        type: "boolean",
        required: false,
        description: "Marks the input as valid",
      },
      helperText: {
        type: "string",
        required: false,
        description: "Additional helper text displayed below the input",
      },
      icon: {
        type: "function",
        required: false,
        description: "Icon component displayed alongside the label",
      },
      prefix: {
        type: "string",
        required: false,
        description: "Text displayed as a prefix inside the input",
      },
      prefixIcon: {
        type: "function",
        required: false,
        description: "Icon component displayed as a prefix inside the input",
      },
      suffixIcon: {
        type: "ReactNode",
        required: false,
        description: "Content displayed as a suffix inside the input",
      },
      min: {
        type: "number",
        required: false,
        description: "Minimum value for number input",
      },
      max: {
        type: "number",
        required: false,
        description: "Maximum value for number input",
      },
      step: {
        type: "number",
        required: false,
        description: "Step value for number input",
      },
      rows: {
        type: "number",
        required: false,
        default: 4,
        description: "Number of rows for textarea",
      },
      primaryTheme: {
        type: "boolean",
        required: false,
        default: true,
        description: "Determines whether to use primary theme colors",
      },
      primaryColor: {
        type: "string",
        required: false,
        default: "#3b82f6",
        description:
          "Primary color for focus and text styling when primaryTheme is false",
      },
      className: {
        type: "string",
        required: false,
        default: "",
        description: "Additional CSS classes applied to the wrapper",
      },
    },
  },
  {
    name: "List",
    description:
      "A flexible list component that supports nested items, icons, inline/ordered/unordered layouts, and theming.",
    props: {
      title: {
        type: "string",
        required: false,
        description: "Optional title displayed above the list",
      },
      titleIcon: {
        type: "ReactNode",
        required: false,
        description: "Icon displayed alongside the title",
      },
      items: {
        type: "array",
        required: true,
        description: "Array of list items",
      },
      type: {
        type: "string",
        required: false,
        default: "unordered",
        enum: ["unordered", "ordered", "inline"],
        description: "Determines the list style",
      },
      primaryTheme: {
        type: "boolean",
        required: false,
        default: true,
        description: "Use primary theme colors",
      },
      primaryColor: {
        type: "string",
        required: false,
        default: "#3b82f6",
        description:
          "Primary color for text and bullets when primaryTheme is false",
      },
      className: {
        type: "string",
        required: false,
        description: "CSS class for the list wrapper",
      },
      itemClassName: {
        type: "string",
        required: false,
        description: "CSS class applied to individual list items",
      },
      titleClassName: {
        type: "string",
        required: false,
        description: "CSS class applied to the title section",
      },
      bulletClassName: {
        type: "string",
        required: false,
        description: "CSS class applied to custom bullets",
      },
    },
    slots: {
      items: {
        description: "List items, which can include nested sub-items and icons",
        allowedComponents: ["ListItem", "*"],
      },
    },
  },
  {
    name: "Modal",
    description:
      "A modal system consisting of overlay, content, header, body, and footer with close handling.",
    props: {
      isOpen: {
        type: "boolean",
        required: true,
        description: "Controls whether the modal is visible",
      },
      onClose: {
        type: "function",
        required: true,
        description: "Callback when modal requests to close",
      },
      disableOverlayClose: {
        type: "boolean",
        required: false,
        default: false,
        description: "Disable closing the modal when clicking the overlay",
      },
    },
    slots: {
      children: {
        description:
          "Content rendered inside the modal overlay, typically including ModalContent and its parts",
        allowedComponents: [
          "ModalContent",
          "ModalHeader",
          "ModalBody",
          "ModalFooter",
          "*",
        ],
      },
    },
    subComponents: {
      ModalContent: {
        description:
          "Wrapper for modal inner content with optional close button",
        props: {
          onClose: {
            type: "function",
            required: false,
            description: "Callback to close the modal from the content area",
          },
          className: {
            type: "string",
            required: false,
            description: "Custom class names for styling",
          },
        },
        slots: {
          children: {
            description: "Inner content of the modal",
            allowedComponents: ["*"],
          },
        },
      },
      ModalHeader: {
        description:
          "Header section of the modal displaying a title and optional icon",
        props: {
          title: {
            type: "string",
            required: false,
            description: "Title text displayed in the header",
          },
          icon: {
            type: "ReactNode",
            required: false,
            description: "Icon displayed alongside the title",
          },
          className: {
            type: "string",
            required: false,
            description: "Custom class names for styling",
          },
        },
      },
      ModalBody: {
        description: "Body section of the modal for main content",
        props: {
          className: {
            type: "string",
            required: false,
            description: "Custom class names for styling",
          },
        },
        slots: {
          children: {
            description: "Content rendered inside the modal body",
            allowedComponents: ["*"],
          },
        },
      },
      ModalFooter: {
        description: "Footer section of the modal for actions or buttons",
        props: {
          className: {
            type: "string",
            required: false,
            description: "Custom class names for styling",
          },
        },
        slots: {
          children: {
            description:
              "Content rendered inside the modal footer, typically buttons",
            allowedComponents: ["*"],
          },
        },
      },
    },
  },
  {
    name: "RadioGroup",
    description:
      "A group of selectable radio buttons with optional custom rendering and styling.",
    props: {
      name: {
        type: "string",
        required: false,
        description: "Name attribute for the radio inputs",
      },
      options: {
        type: "array",
        required: true,
        description: "Array of radio options with label and value",
      },
      selectedValue: {
        type: "string",
        required: false,
        description: "Currently selected value",
      },
      onChange: {
        type: "function",
        required: false,
        description: "Callback fired when selection changes",
      },
      disabled: {
        type: "boolean",
        required: false,
        default: false,
        description: "Disable all radio buttons",
      },
      readOnly: {
        type: "boolean",
        required: false,
        default: false,
        description: "Make the radio group read-only",
      },
      required: {
        type: "boolean",
        required: false,
        default: false,
        description: "Marks the radio group as required",
      },
      error: {
        type: "string",
        required: false,
        description: "Error message to display below the radio group",
      },
      className: {
        type: "string",
        required: false,
        description: "Custom class names for the root container",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the root container",
      },
      itemClassName: {
        type: "string",
        required: false,
        description: "Custom class names for each radio item wrapper",
      },
      itemStyle: {
        type: "object",
        required: false,
        description: "Inline styles for each radio item wrapper",
      },
      labelClassName: {
        type: "string",
        required: false,
        description: "Custom class names for radio labels",
      },
      labelStyle: {
        type: "object",
        required: false,
        description: "Inline styles for radio labels",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the radio icon wrapper",
      },
      iconStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the radio icon wrapper",
      },
      indicatorClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the inner checked dot",
      },
      indicatorStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the inner checked dot",
      },
      errorClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the error message",
      },
      errorStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the error message",
      },
      iconSize: {
        type: "number",
        required: false,
        default: 20,
        description: "Size of the radio icon",
      },
      iconCheckedBgColor: {
        type: "string",
        required: false,
        description: "Background color when radio is checked",
      },
      iconUncheckedBorderColor: {
        type: "string",
        required: false,
        description: "Border color when radio is unchecked",
      },
      renderItem: {
        type: "function",
        required: false,
        description: "Custom render function for each radio item",
      },
    },
  },
  {
    name: "Select",
    description:
      "A customizable dropdown select component supporting single or multiple selection, icons, and dark mode.",
    props: {
      label: {
        type: "string",
        required: false,
        description: "Optional label displayed above the select",
      },
      name: {
        type: "string",
        required: false,
        description: "Name attribute for the select input",
      },
      value: {
        type: "string | array",
        required: false,
        description: "Controlled value(s) of the select",
      },
      defaultValue: {
        type: "string | array",
        required: false,
        description: "Initial uncontrolled value(s) of the select",
      },
      onValueChange: {
        type: "function",
        required: false,
        description: "Callback triggered when the value changes",
      },
      options: {
        type: "array",
        required: false,
        default: [],
        description: "Array of options for the select dropdown",
      },
      placeholder: {
        type: "string",
        required: false,
        default: "Select...",
        description: "Placeholder text when no value is selected",
      },
      required: {
        type: "boolean",
        required: false,
        description: "Marks the select as required",
      },
      disabled: {
        type: "boolean",
        required: false,
        description: "Disables the select",
      },
      error: {
        type: "string | boolean",
        required: false,
        description: "Error state or message",
      },
      success: {
        type: "boolean",
        required: false,
        description: "Success state indicator",
      },
      helperText: {
        type: "string",
        required: false,
        description: "Optional helper text displayed below the select",
      },
      multiple: {
        type: "boolean",
        required: false,
        default: false,
        description: "Allows multiple selection",
      },
      labelIcon: {
        type: "object",
        required: false,
        description: "Icon component displayed next to the label",
      },
      prefixIcon: {
        type: "object",
        required: false,
        description:
          "Icon component displayed inside the select input before the value",
      },
      dropdownIcon: {
        type: "object",
        required: false,
        default: "ChevronDown",
        description: "Icon component for the dropdown toggle",
      },
      className: {
        type: "string",
        required: false,
        description: "Custom class names for the root container",
      },
      containerClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the outer container",
      },
      labelClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the label",
      },
      triggerClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the select trigger button",
      },
      valueClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the displayed value text",
      },
      dropdownClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the dropdown list container",
      },
      itemClassName: {
        type: "string",
        required: false,
        description: "Custom class names for each dropdown item",
      },
      iconClassName: {
        type: "string",
        required: false,
        description: "Custom class names for icons inside the select",
      },
      helperClassName: {
        type: "string",
        required: false,
        description: "Custom class names for helper or error text",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the root container",
      },
      triggerStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the trigger button",
      },
      dropdownStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the dropdown container",
      },
      itemStyle: {
        type: "object",
        required: false,
        description: "Inline styles for each dropdown item",
      },
      darkMode: {
        type: "boolean",
        required: false,
        description: "Force dark mode on the select",
      },
      primaryColor: {
        type: "string",
        required: false,
        default: "var(--primary)",
        description: "Primary theme color used for highlights",
      },
    },
    slots: {
      children: {
        description:
          "Renderable content for option icons inside dropdown items",
        allowedComponents: ["*", "ReactNode"],
      },
    },
  },
  {
    name: "SwitchGroup",
    description:
      "A group of toggle switches allowing single or multiple selection with optional error display.",
    props: {
      name: {
        type: "string",
        required: false,
        description: "Name attribute applied to each switch input",
      },
      options: {
        type: "array",
        required: true,
        description: "Array of switch options with label and value",
      },
      selectedValues: {
        type: "array",
        required: false,
        default: [],
        description: "Currently selected values",
      },
      onChange: {
        type: "function",
        required: false,
        description: "Callback triggered when the selection changes",
      },
      disabled: {
        type: "boolean",
        required: false,
        default: false,
        description: "Disables all switches",
      },
      readOnly: {
        type: "boolean",
        required: false,
        default: false,
        description: "Prevents changing switch values",
      },
      required: {
        type: "boolean",
        required: false,
        default: false,
        description: "Marks switches as required",
      },
      error: {
        type: "string",
        required: false,
        description: "Error message to display below the switches",
      },
      className: {
        type: "string",
        required: false,
        description: "Custom class names for the root container",
      },
      itemClassName: {
        type: "string",
        required: false,
        description: "Custom class names for each switch item",
      },
      labelClassName: {
        type: "string",
        required: false,
        description: "Custom class names for item label container",
      },
      textClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the label text",
      },
      switchClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the switch background",
      },
      thumbClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the switch thumb",
      },
      errorClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the error message",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the root container",
      },
      itemStyle: {
        type: "object",
        required: false,
        description: "Inline styles for each switch item",
      },
      labelStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the item label container",
      },
      textStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the label text",
      },
      switchStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the switch background",
      },
      thumbStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the switch thumb",
      },
      errorStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the error message",
      },
      iconSize: {
        type: "number",
        required: false,
        default: 20,
        description: "Size of the switch thumb in pixels",
      },
    },
  },
  {
    name: "Table",
    description:
      "A responsive table container with customizable styling and children content.",
    props: {
      children: {
        type: "ReactNode",
        required: true,
        description: "Table content including rows and cells",
      },
      className: {
        type: "string",
        required: false,
        description: "Custom class names for the root container",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the root container",
      },
      tableClassName: {
        type: "string",
        required: false,
        description: "Custom class names for the table element",
      },
      tableStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the table element",
      },
      responsive: {
        type: "boolean",
        required: false,
        default: true,
        description: "Enable horizontal scrolling for responsive tables",
      },
    },
    slots: {
      children: {
        description:
          "Rows and table sections (THead, TBody, TRow, TH, TD) to render inside the table",
        allowedComponents: ["THead", "TBody", "TRow", "TH", "TD", "*"],
      },
    },
  },
  {
    name: "Text",
    description:
      "A flexible text component with responsive size, weight, alignment, transform, and styling options.",
    props: {
      as: {
        type: "string",
        required: false,
        description: "The HTML element or tag to render the text as",
      },
      children: {
        type: "ReactNode",
        required: true,
        description: "Content to render inside the text component",
      },
      size: {
        type: "string | object",
        required: false,
        default: "md",
        description:
          "Text size, either a predefined size key or responsive object",
      },
      weight: {
        type: "number | string | object",
        required: false,
        default: 400,
        description: "Font weight, can be responsive",
      },
      align: {
        type: "string | object",
        required: false,
        default: "left",
        enum: ["left", "center", "right"],
        description: "Text alignment, can be responsive",
      },
      transform: {
        type: "string | object",
        required: false,
        enum: ["uppercase", "lowercase", "capitalize"],
        description: "Text transformation, can be responsive",
      },
      italic: {
        type: "boolean",
        required: false,
        description: "Whether text is italicized",
      },
      underline: {
        type: "boolean",
        required: false,
        description: "Whether text is underlined",
      },
      strikethrough: {
        type: "boolean",
        required: false,
        description: "Whether text has a line through it",
      },
      truncate: {
        type: "boolean | number",
        required: false,
        description:
          "Whether text should be truncated, or number of lines for multiline truncation",
      },
      darkMode: {
        type: "boolean",
        required: false,
        default: false,
        description: "Enable dark mode styling",
      },
      color: {
        type: "string",
        required: false,
        default: "default",
        enum: ["default", "muted", "primary"],
        description: "Text color variant or custom color string",
      },
      className: {
        type: "string",
        required: false,
        description: "Custom class names for the text element",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the text element",
      },
    },
    slots: {
      children: {
        description: "Content inside the text component",
        allowedComponents: ["*", "string"],
      },
    },
  },
  {
    name: "Textarea",
    description:
      "A styled textarea component with label, icon, helper text, validation states, and optional character count.",
    props: {
      label: {
        type: "string",
        required: false,
        description: "Label text displayed above the textarea",
      },
      icon: {
        type: "function",
        required: false,
        description: "Optional icon component displayed alongside the label",
      },
      error: {
        type: "boolean",
        required: false,
        description: "Marks the textarea as having an error",
      },
      success: {
        type: "boolean",
        required: false,
        description: "Marks the textarea as successful/valid",
      },
      helperText: {
        type: "string",
        required: false,
        description:
          "Helper text or error message displayed below the textarea",
      },
      maxLength: {
        type: "number",
        required: false,
        description: "Maximum allowed number of characters",
      },
      rows: {
        type: "number",
        required: false,
        default: 3,
        description: "Number of visible text lines",
      },
      value: {
        type: "string",
        required: false,
        description: "Textarea value",
      },
      onChange: {
        type: "function",
        required: false,
        description: "Change event handler for the textarea",
      },
      placeholder: {
        type: "string",
        required: false,
        description: "Placeholder text for the textarea",
      },
      required: {
        type: "boolean",
        required: false,
        description: "Marks the field as required",
      },
      disabled: {
        type: "boolean",
        required: false,
        description: "Disables the textarea input",
      },
      className: {
        type: "string",
        required: false,
        default: "",
        description: "Custom class names for the textarea",
      },
      containerClassName: {
        type: "string",
        required: false,
        default: "",
        description: "Custom class names for the container div",
      },
      labelClassName: {
        type: "string",
        required: false,
        default: "",
        description: "Custom class names for the label",
      },
      helperClassName: {
        type: "string",
        required: false,
        default: "",
        description: "Custom class names for the helper/error text",
      },
      countClassName: {
        type: "string",
        required: false,
        default: "",
        description: "Custom class names for the character count",
      },
      style: {
        type: "object",
        required: false,
        description: "Inline styles for the textarea",
      },
      containerStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the container div",
      },
      labelStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the label",
      },
      helperStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the helper/error text",
      },
      countStyle: {
        type: "object",
        required: false,
        description: "Inline styles for the character count",
      },
      darkMode: {
        type: "boolean",
        required: false,
        description: "Force dark or light theme; defaults to system preference",
      },
    },
    slots: {
      children: {
        description: "Not applicable; the textarea uses props for content",
        allowedComponents: [],
      },
    },
  },
];

export default components;
