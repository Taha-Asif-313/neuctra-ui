import "./style.css"; // 🔹 Global styles import (keep this as the only CSS import)

// ==============================
// ✅ BASIC COMPONENT EXPORTS
// ==============================

// Text Component Completed!
export { Text } from "./components/basic/Text";
export type { TextProps } from "./components/basic/Text";

// Button Component Completed!
export { Button } from "./components/basic/Button";
export type { ButtonProps } from "./components/basic/Button";

// Image Component Completed!
export { Image } from "./components/basic/Image";
export type { ImageProps } from "./components/basic/Image";

// Container Component Completed!
export { Container } from "./components/basic/Container";
export type { ContainerProps } from "./components/basic/Container";

// Avatar Component Completed!
export { Avatar } from "./components/basic/Avatar";
export type { AvatarProps } from "./components/basic/Avatar";

// Badge Component Completed!
export { Badge } from "./components/basic/Badge";
export type { BadgeProps } from "./components/basic/Badge";

// List Component Completed!
export { List, ListItem } from "./components/basic/List";
export type { ListProps, ListItemType } from "./components/basic/List";

// Dropdown Component Completed!
export { Dropdown } from "./components/basic/Dropdown";
export type { DropdownProps, DropdownItem } from "./components/basic/Dropdown";

// Alerts & Notifications
export { ToastProvider, useToast } from "./components/basic/Alert"; // ✅ Modern ShadCN-style toast

// Accordions
export { Accordion } from "./components/basic/Accordion"; // ✅ Finalized

// ✅ Checkbox, Radio & Switch Components
export { CheckboxGroup } from "./components/basic/CheckboxGroup";
export { RadioGroup } from "./components/basic/RadioGroup";
export { Switch } from "./components/basic/Switch";

// Drawers
export {
  Drawer,
  DrawerButton,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerTriggerButton,
} from "./components/basic/Drawer"; // ✅ Finalized
export type {
  DrawerProps,
  DrawerButtonProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTriggerProps,
} from "./components/basic/Drawer";

// Dropdowns
export { Select } from "./components/basic/Select"; // ✅ Finalized

// Forms & Inputs
export { Input } from "./components/basic/Input"; // ✅ Finalized
export { Textarea } from "./components/basic/Textarea"; // ✅ Finalized

// Modals
export {
  Modal,
  ModalTriggerButton,
  ModalButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "./components/basic/Modal"; // ✅ Finalized

// Tables
export { Table, TBody, TD, THead, TH, TRow } from "./components/basic/Table"; // ✅ Finalized

// Tabs
export {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "./components/basic/Tabs"; // ✅ Finalized
