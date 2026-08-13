"use client";

import React from "react";
import ComponentDocPage from "../components/ComponentDocPage";
import { Stat } from "@neuctra/ui";
import { DollarSign, Users, Activity } from "lucide-react";

const StatDocs = () => (
  <ComponentDocPage
    name="Stat"
    title="Stat Component — React KPI & Metric Cards | Neuctra UI"
    description="React stat component for dashboards: KPI value, label, icon, trend indicator with up/down arrows and helper text — built with Tailwind CSS."
    keywords="react stat component, kpi card react, metric card dashboard, trend indicator ui, dashboard stats react, neuctra ui stat"
    importCode={`import { Stat } from "@neuctra/ui";`}
    examples={[
      {
        title: "Basic Usage",
        code: `<Stat
  label="Total Revenue"
  value="$45,231"
  icon={<DollarSign />}
  trend="up"
  trendValue="+20.1%"
  description="vs last month"
/>`,
        preview: (
          <Stat
            className="w-64"
            label="Total Revenue"
            value="$45,231"
            icon={<DollarSign />}
            trend="up"
            trendValue="+20.1%"
            description="vs last month"
          />
        ),
      },
      {
        title: "Dashboard Grid",
        description: "Stats compose naturally into a responsive grid.",
        code: `<div className="grid gap-4 sm:grid-cols-3">
  <Stat label="Revenue" value="$45,231" icon={<DollarSign />} trend="up" trendValue="+20.1%" />
  <Stat label="Active Users" value="2,338" icon={<Users />} trend="down" trendValue="-4.3%" />
  <Stat label="Uptime" value="99.98%" icon={<Activity />} trend="neutral" trendValue="0.0%" />
</div>`,
        preview: (
          <div className="grid w-full gap-4 sm:grid-cols-3">
            <Stat label="Revenue" value="$45,231" icon={<DollarSign />} trend="up" trendValue="+20.1%" />
            <Stat label="Active Users" value="2,338" icon={<Users />} trend="down" trendValue="-4.3%" />
            <Stat label="Uptime" value="99.98%" icon={<Activity />} trend="neutral" trendValue="0.0%" />
          </div>
        ),
      },
      {
        title: "Borderless",
        code: `<Stat bordered={false} label="Downloads" value="18.2k" trend="up" trendValue="+8%" />`,
        preview: (
          <Stat bordered={false} label="Downloads" value="18.2k" trend="up" trendValue="+8%" />
        ),
      },
    ]}
    propsTable={[
      { prop: "label", type: "ReactNode", default: "—", description: "Metric name (required)" },
      { prop: "value", type: "ReactNode", default: "—", description: "Metric value (required)" },
      { prop: "icon", type: "ReactNode", default: "—", description: "Icon shown in a tinted square" },
      { prop: "trend", type: '"up" | "down" | "neutral"', default: "—", description: "Direction of change; controls arrow and color" },
      { prop: "trendValue", type: "ReactNode", default: "—", description: "Change amount, e.g. \"+12.5%\"" },
      { prop: "description", type: "ReactNode", default: "—", description: "Muted helper text next to the trend" },
      { prop: "bordered", type: "boolean", default: "true", description: "Wrap the stat in a card surface" },
    ]}
    a11y={[
      "Values use tabular numerals so columns of stats align.",
      "Trend colors pair with arrow icons, so meaning never relies on color alone.",
    ]}
  />
);

export default StatDocs;
