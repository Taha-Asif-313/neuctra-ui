"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  PinInput,
  Progress,
  Rating,
  Slider,
  Stat,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ToastProvider,
  ToggleGroup,
  Tooltip,
  toast,
} from "@neuctra/ui";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { BRAND_COLORS, LIGHT_TOKENS, themeScope } from "./themeScope";

const WIRES = [
  "M600 0 C 600 60, 200 30, 200 90",
  "M600 0 V90",
  "M600 0 C 600 60, 1000 30, 1000 90",
];

const MODES = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

export default function LiveShowcase() {
  const [brand, setBrand] = useState(BRAND_COLORS[0]);
  const [mode, setMode] = useState("dark");
  const tokens = {
    ...(mode === "light" ? LIGHT_TOKENS : {}),
    primary: brand.value,
    ring: brand.value,
  };

  return (
    <ToastProvider>
      <section
        id="try"
        aria-labelledby="live-components-heading"
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <SectionHeading
          id="live-components-heading"
          eyebrow="Try it here"
          title="Change one value. Everything follows."
          text="These are real @neuctra/ui components running on this page. Pick a color, switch the theme, then click around."
        />

        <div className="relative mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-primary/40 bg-card px-5 py-4 sm:mx-auto sm:w-fit sm:flex-row sm:gap-6">
          <div
            role="group"
            aria-label="Choose a brand color"
            className="flex items-center gap-2"
          >
            {BRAND_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setBrand(color)}
                aria-pressed={brand.value === color.value}
                aria-label={color.label}
                title={color.label}
                style={{ backgroundColor: color.value }}
                className={`h-11 w-11 rounded-full border-4 transition-transform duration-200 hover:scale-105 ${
                  brand.value === color.value
                    ? "scale-105 border-foreground"
                    : "border-background"
                }`}
              />
            ))}
          </div>
          <ToggleGroup
            aria-label="Choose a theme"
            options={MODES}
            value={mode}
            onChange={(value) => value && setMode(value)}
          />
        </div>

        <TokenWires pulse={`${brand.value}-${mode}`} color={brand.value} />

        <div
          style={themeScope(tokens)}
          className="mt-8 rounded-3xl md:mt-0 border border-border bg-background p-3 text-foreground transition-colors duration-300 sm:p-5"
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DemoCard title="Forms" href="/docs/input" delay={0}>
              <FormsDemo />
            </DemoCard>
            <DemoCard title="Data display" href="/docs/stat" delay={0.08}>
              <DataDemo />
            </DemoCard>
            <DemoCard title="Feedback" href="/docs/alert" delay={0.16}>
              <FeedbackDemo />
            </DemoCard>
            <DemoCard title="Navigation" href="/docs/tabs" delay={0}>
              <NavigationDemo />
            </DemoCard>
            <DemoCard title="Inputs and controls" href="/docs/slider" delay={0.08}>
              <ControlsDemo />
            </DemoCard>
            <DemoCard title="Overlays" href="/docs/modal" delay={0.16}>
              <OverlayDemo />
            </DemoCard>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Figures and names shown here are sample data.
        </p>
      </section>
    </ToastProvider>
  );
}

/** Wires from the token picker into the three columns of components below. */
function TokenWires({ pulse, color }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      fill="none"
      className="hidden h-[5.6rem] w-full md:block"
    >
      {WIRES.map((wire) => (
        <g key={wire}>
          <path d={wire} stroke="var(--border)" strokeWidth="1.5" />
          <path
            key={pulse}
            d={wire}
            pathLength={1}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            className="nx-wire-pulse"
          />
        </g>
      ))}
    </svg>
  );
}

function DemoCard({ title, href, delay, children }) {
  return (
    <Reveal delay={delay} className="min-w-0">
      <Card padding="none" className="flex h-full flex-col">
        <div className="flex min-h-48 flex-1 flex-col justify-center gap-4 p-5">
          {children}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <Link
            href={href}
            className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-primary"
          >
            <span className="sr-only">{title}: </span>Docs
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </Card>
    </Reveal>
  );
}

function FormsDemo() {
  return (
    <>
      <Input
        label="Work email"
        type="email"
        size="sm"
        placeholder="you@company.com"
      />
      <PinInput
        length={4}
        size="sm"
        label="Verification code"
        className="self-start"
        boxClassName="border-border"
      />
    </>
  );
}

function DataDemo() {
  return (
    <>
      <Stat
        label="Monthly revenue"
        value="$12,480"
        icon={<DollarSign />}
        trend="up"
        trendValue="+8.2%"
      />
      <AvatarGroup max={3} size="sm">
        <Avatar fallback="A" alt="Ana Silva" size="sm" />
        <Avatar fallback="B" alt="Ben Cole" size="sm" />
        <Avatar fallback="C" alt="Cara Diaz" size="sm" />
        <Avatar fallback="D" alt="Dev Patel" size="sm" />
      </AvatarGroup>
    </>
  );
}

function FeedbackDemo() {
  return (
    <>
      <Progress value={65} showValue label="Upload progress" />
      <Button size="sm" onClick={() => toast.success("Changes saved")}>
        Show a toast
      </Button>
    </>
  );
}

function NavigationDemo() {
  const [page, setPage] = useState(2);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab index={0}>Overview</Tab>
          <Tab index={1}>Billing</Tab>
        </TabList>
        <TabPanels>
          <TabPanel index={0}>
            <p className="p-3 text-sm text-secondary">Your account at a glance.</p>
          </TabPanel>
          <TabPanel index={1}>
            <p className="p-3 text-sm text-secondary">Invoices and payment details.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Pagination page={page} totalPages={5} onPageChange={setPage} size="sm" />
    </>
  );
}

function ControlsDemo() {
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      <Slider
        label="Team seats"
        defaultValue={40}
        showValue
      />
      <Rating defaultValue={4} label="Sample rating" />
      <Switch
        mode="single"
        label="Email alerts"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
    </>
  );
}

function OverlayDemo() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Tooltip content="Tooltips work too">
        <Button size="sm" variant="outline">
          Hover me
        </Button>
      </Tooltip>

      <Modal isOpen={open} onClose={close}>
        <ModalContent onClose={close}>
          <ModalHeader title="Publish changes?" onClose={close} />
          <ModalBody>
            <p className="text-sm text-secondary">
              This dialog is the real Modal component.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button size="sm" onClick={close}>
              Publish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
