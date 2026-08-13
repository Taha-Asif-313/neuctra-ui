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
export type {
  BulletVariant,
  ListDensity,
  ListItemProps,
  ListItemType,
  ListProps,
  ListRenderItemParams,
  ListSize,
  ListType,
  ListVariant,
  NestedMode,
} from "./components/basic/List";

// Dropdown Component Completed!
export { Dropdown } from "./components/basic/Dropdown";
export type { DropdownProps, DropdownItem } from "./components/basic/Dropdown";

// Alerts & Notifications
export { ToastProvider, useToast } from "./components/basic/Alert"; // ✅ Modern ShadCN-style toast
export type {
  AlertType,
  Toast,
  ToastVariant,
  ToastFunction,
  ToastContextProps,
  ToastProviderProps,
} from "./components/basic/Alert";

// Accordions
export { Accordion } from "./components/basic/Accordion"; // ✅ Finalized
export type {
  AccordionItem,
  AccordionProps,
} from "./components/basic/Accordion";

// ✅ Checkbox, Radio & Switch Components
export { Checkbox } from "./components/basic/Checkbox";
export type { CheckboxGroupProps } from "./components/basic/Checkbox";
export { RadioGroup } from "./components/basic/RadioGroup";
export type { RadioGroupProps } from "./components/basic/RadioGroup";
export { Switch } from "./components/basic/Switch";
export type { SwitchGroupProps } from "./components/basic/Switch";

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

// Selects
export { Select } from "./components/basic/Select"; // ✅ Finalized
export type { SelectProps, SelectOption } from "./components/basic/Select";

// Forms & Inputs
export { Input } from "./components/basic/Input"; // ✅ Finalized
export type { InputFieldProps } from "./components/basic/Input";
export { Textarea } from "./components/basic/Textarea"; // ✅ Finalized
export type { TextareaProps } from "./components/basic/Textarea";

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
export type {
  ModalProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalButtonProps,
  ModalTriggerButtonProps,
} from "./components/basic/Modal";

// Tables
export { Table, TBody, TD, THead, TH, TRow } from "./components/basic/Table"; // ✅ Finalized
export type {
  TableProps,
  TableSectionProps,
  TableCellProps,
  TRowProps,
} from "./components/basic/Table";

// Tabs
export {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "./components/basic/Tabs"; // ✅ Finalized
export type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelsProps,
  TabPanelProps,
} from "./components/basic/Tabs";

// Theme Toggle Button
export { ThemeToggleButton } from "./components/basic/ThemeToggleButton"; // ✅ Finalized
export type { ThemeToggleContext, ThemeToggleProps } from "./components/basic/ThemeToggleButton";

// ==============================
// ✅ DATA DISPLAY COMPONENTS
// ==============================

export { Card, CardHeader, CardBody, CardFooter } from "./components/basic/Card";
export type {
  CardProps,
  CardHeaderProps,
  CardSectionProps,
} from "./components/basic/Card";

export { Divider } from "./components/basic/Divider";
export type { DividerProps } from "./components/basic/Divider";

export { Chip } from "./components/basic/Chip";
export type { ChipProps } from "./components/basic/Chip";

export { Kbd } from "./components/basic/Kbd";
export type { KbdProps } from "./components/basic/Kbd";

export { Skeleton } from "./components/basic/Skeleton";
export type { SkeletonProps } from "./components/basic/Skeleton";

export { Spinner } from "./components/basic/Spinner";
export type { SpinnerProps } from "./components/basic/Spinner";

export { Progress } from "./components/basic/Progress";
export type { ProgressProps } from "./components/basic/Progress";

export { Stat } from "./components/basic/Stat";
export type { StatProps } from "./components/basic/Stat";

export { EmptyState } from "./components/basic/EmptyState";
export type { EmptyStateProps } from "./components/basic/EmptyState";

export { Timeline } from "./components/basic/Timeline";
export type { TimelineProps, TimelineItem } from "./components/basic/Timeline";

// ==============================
// ✅ NAVIGATION COMPONENTS
// ==============================

export { Breadcrumb } from "./components/basic/Breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbItem,
} from "./components/basic/Breadcrumb";

export { Pagination } from "./components/basic/Pagination";
export type { PaginationProps } from "./components/basic/Pagination";

export { Stepper } from "./components/basic/Stepper";
export type { StepperProps, StepperStep } from "./components/basic/Stepper";

// ==============================
// ✅ OVERLAY COMPONENTS
// ==============================

export { Tooltip } from "./components/basic/Tooltip";
export type { TooltipProps } from "./components/basic/Tooltip";

export { Popover } from "./components/basic/Popover";
export type { PopoverProps } from "./components/basic/Popover";

// ==============================
// ✅ EXTENDED FORM COMPONENTS
// ==============================

export { Slider } from "./components/basic/Slider";
export type { SliderProps } from "./components/basic/Slider";

export { NumberInput } from "./components/basic/NumberInput";
export type { NumberInputProps } from "./components/basic/NumberInput";

export { Rating } from "./components/basic/Rating";
export type { RatingProps } from "./components/basic/Rating";

export { TagInput } from "./components/basic/TagInput";
export type { TagInputProps } from "./components/basic/TagInput";

export { PinInput } from "./components/basic/PinInput";
export type { PinInputProps } from "./components/basic/PinInput";

export { FileUpload } from "./components/basic/FileUpload";
export type { FileUploadProps } from "./components/basic/FileUpload";

// ==============================
// ✅ v0.4.0 COMPONENTS
// ==============================

export { Callout } from "./components/basic/Callout";
export type { CalloutProps } from "./components/basic/Callout";

export { Toggle } from "./components/basic/Toggle";
export type { ToggleProps } from "./components/basic/Toggle";

export { ToggleGroup } from "./components/basic/ToggleGroup";
export type {
  ToggleGroupProps,
  ToggleGroupOption,
} from "./components/basic/ToggleGroup";

export { CopyButton } from "./components/basic/CopyButton";
export type { CopyButtonProps } from "./components/basic/CopyButton";

export { AvatarGroup } from "./components/basic/AvatarGroup";
export type { AvatarGroupProps } from "./components/basic/AvatarGroup";

export { Calendar } from "./components/basic/Calendar";
export type { CalendarProps } from "./components/basic/Calendar";

export { DatePicker } from "./components/basic/DatePicker";
export type { DatePickerProps } from "./components/basic/DatePicker";

export { Carousel } from "./components/basic/Carousel";
export type { CarouselProps } from "./components/basic/Carousel";

// Utilities
export { cn } from "./lib/cn";

