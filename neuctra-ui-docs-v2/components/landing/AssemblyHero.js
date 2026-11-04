"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, DollarSign, Plus, Receipt, Users } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Stat,
  TBody,
  TD,
  TH,
  THead,
  TRow,
  Table,
} from "@neuctra/ui";
import CopyCommand from "./CopyCommand";
import { useScrub } from "./useScrub";

// Both offsets run over the section's full height, so the layers finish
// together with the pin on desktop and part way down the section on mobile.
const OFFSET = ["start start", "end start"];
const ASSEMBLED = 0.55;
const LAYER_GAP = 110;

const SAMPLE_CUSTOMERS = [
  { name: "Acme Studio", status: "Paid", amount: "$1,240" },
  { name: "Blue Harbor", status: "Paid", amount: "$320" },
  { name: "Cedar & Co", status: "Pending", amount: "$980" },
];

// Fixed heights keep all three layers lined up when they meet.
const SLOT = {
  bar: "h-9",
  header: "h-8",
  stat: "h-[6.5rem]",
};

export default function AssemblyHero() {
  const ref = useRef(null);
  const { progress, reduced } = useScrub(ref, OFFSET);

  const rotateX = useTransform(progress, [0, ASSEMBLED], [52, 0]);
  const rotateZ = useTransform(progress, [0, ASSEMBLED], [-32, 0]);
  const scale = useTransform(progress, [0, ASSEMBLED], [0.86, 1]);
  const cueOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      id="assemble"
      className={`relative z-10 overflow-x-clip ${reduced ? "" : "lg:h-[240vh]"}`}
    >
      <div
        className={`mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6 lg:px-8 lg:py-0 ${
          reduced ? "lg:py-32" : "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]"
        }`}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Free, open-source React UI library
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
            Build products from parts that{" "}
            <span className="text-primary">already fit.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-secondary sm:text-lg">
            Think LEGO for websites. Neuctra UI gives you ready-made React
            components, one-command setup, and an AI connection that works from
            the real docs.
          </p>

          <div className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/docs"
              className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            >
              Get started <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <CopyCommand
              command="npx @neuctra/ui-cli@latest init"
              className="w-full sm:max-w-sm"
            />
          </div>

          {!reduced && (
            <motion.p
              style={{ opacity: cueOpacity }}
              className="mt-8 hidden items-center gap-2 text-sm text-muted-foreground lg:flex"
            >
              <ArrowDown size={15} aria-hidden="true" className="text-primary" />
              Scroll to put it together
            </motion.p>
          )}
        </div>

        <div
          aria-hidden="true"
          inert
          className="relative mx-auto w-full max-w-2xl py-8 [perspective:1800px] lg:py-0"
        >
          <div className="pointer-events-none absolute inset-8 rounded-full bg-primary/15 blur-[80px]" />
          <motion.div
            style={{ rotateX, rotateZ, scale, transformStyle: "preserve-3d" }}
            className="relative aspect-square w-full sm:aspect-[16/10]"
          >
            <Layer index={0} progress={progress} label="Theme tokens">
              <ThemeLayer />
            </Layer>
            <Layer index={1} progress={progress} label="Layout">
              <LayoutLayer />
            </Layer>
            <Layer index={2} progress={progress} label="Components">
              <ComponentLayer />
            </Layer>
          </motion.div>
          <p className="relative mt-8 text-center text-xs text-muted-foreground">
            Real @neuctra/ui components with sample data
          </p>
        </div>
      </div>
    </section>
  );
}

function Layer({ index, progress, label, children }) {
  const z = useTransform(progress, [0, ASSEMBLED], [index * LAYER_GAP, 0]);
  const labelOpacity = useTransform(progress, [0, ASSEMBLED * 0.6], [1, 0]);

  return (
    <motion.div style={{ z }} className="absolute inset-0">
      <motion.div
        data-reveal
        className="relative h-full"
        initial={{ opacity: 0, y: -48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.15 + index * 0.12,
        }}
      >
        {children}
        <motion.span
          style={{ opacity: labelOpacity }}
          className="absolute -bottom-3 left-8 rounded bg-primary px-2.5 py-1 font-mono text-sm font-medium text-primary-foreground"
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function ThemeLayer() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background">
      <div className={`flex items-center gap-1.5 border-b border-border px-3 ${SLOT.bar}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground">
          yourproduct.com
        </span>
      </div>
    </div>
  );
}

const Slots = ({ children }) => (
  <div className="absolute inset-0 flex flex-col">
    <div className={`shrink-0 ${SLOT.bar}`} />
    <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5">{children}</div>
  </div>
);

function LayoutLayer() {
  return (
    <Slots>
      <div className={`shrink-0 ${SLOT.header}`} />
      <div className="grid shrink-0 grid-cols-3 gap-2">
        {[0, 1, 2].map((cell) => (
          <Card key={cell} padding="none" className={SLOT.stat} />
        ))}
      </div>
      <Card padding="none" className="min-h-0 flex-1" />
    </Slots>
  );
}

function ComponentLayer() {
  return (
    <Slots>
      <div className={`flex shrink-0 items-center justify-between gap-2 ${SLOT.header}`}>
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground">Sales overview</p>
          <Badge text="Sample data" variant="soft" size="sm" />
        </div>
        <Button size="xs" iconBefore={<Plus size={13} />}>
          New invoice
        </Button>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-2">
        <SampleStat label="Revenue" value="$45,231" icon={<DollarSign />} trend="up" trendValue="+20.1%" />
        <SampleStat label="Customers" value="1,284" icon={<Users />} trend="up" trendValue="+4.3%" />
        <SampleStat label="Invoices" value="18" icon={<Receipt />} trend="neutral" trendValue="Flat" />
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <Table dense hoverable={false} className="border-0 bg-transparent">
          <THead>
            <TRow>
              <TH>Customer</TH>
              <TH>Status</TH>
              <TH>Amount</TH>
            </TRow>
          </THead>
          <TBody>
            {SAMPLE_CUSTOMERS.map((customer) => (
              <TRow key={customer.name}>
                <TD>{customer.name}</TD>
                <TD>
                  <Badge
                    text={customer.status}
                    variant={customer.status === "Paid" ? "soft" : "outline"}
                    size="sm"
                  />
                </TD>
                <TD>{customer.amount}</TD>
              </TRow>
            ))}
          </TBody>
        </Table>
      </div>
    </Slots>
  );
}

const SampleStat = (props) => (
  <Stat
    {...props}
    bordered={false}
    className={`min-w-0 overflow-hidden bg-transparent p-2.5 ${SLOT.stat}`}
    iconClassName="hidden"
    valueClassName="text-lg sm:text-xl"
  />
);
