import "./style.css"; // 🔹 Global styles import (keep this as the only CSS import)

// ==============================
// ✅ BASIC COMPONENT EXPORTS
// ==============================

// Alerts & Notifications
export { ToastProvider, useToast } from "./components/basic/Alert"; // ✅ Modern ShadCN-style toast

// Accordions
export { Accordion } from "./components/basic/Accordion"; // ✅ Finalized

// Avatars
export { Avatar } from "./components/basic/Avatar"; // ✅ Finalized

// Badges
export { Badge } from "./components/basic/Badge"; // ✅ Finalized

// Buttons
export { Button } from "./components/basic/Button";
export type { ButtonProps } from "./components/basic/Button";

// ✅ Checkbox, Radio & Switch Components
export { CheckboxGroup } from "./components/basic/CheckboxGroup";
export { RadioGroup } from "./components/basic/RadioGroup";
export { SwitchGroup } from "./components/basic/SwitchGroup";

// Containers & Layout
export { Container } from "./components/basic/Container"; // ✅ Finalized

// Drawers
export { Drawer, DrawerButton } from "./components/basic/Drawer"; // ✅ Finalized

// Dropdowns
export { Select } from "./components/basic/Select"; // ✅ Finalized

// Forms & Inputs
export { Input } from "./components/basic/Input"; // ✅ Finalized
export { Textarea } from "./components/basic/Textarea"; // ✅ Finalized

// Images
export { Image } from "./components/basic/Image"; // ✅ Finalized

// Lists
export { List } from "./components/basic/List"; // ✅ Finalized

// Modals
export {
  Modal,
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

// Text
export { Text } from "./components/basic/Text"; // ✅ Finalized
