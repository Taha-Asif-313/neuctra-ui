"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import {
  Accessibility,
  BarChart3,
  Bell,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import {
  AppShell,
  Sidebar,
  SkipLink,
  Button,
  IconButton,
  Avatar,
  Badge,
  Card,
  CardBody,
} from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (server module).
const appShellFaq = buildComponentFaq("AppShell");

const sections = [
  {
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", icon: <LayoutDashboard /> },
      { id: "projects", label: "Projects", icon: <FolderKanban />, badge: 4 },
      { id: "reports", label: "Reports", icon: <BarChart3 /> },
    ],
  },
  {
    title: "Account",
    items: [
      { id: "team", label: "Team", icon: <Users /> },
      { id: "settings", label: "Settings", icon: <Settings /> },
    ],
  },
];

const Brand = () => (
  <span className="text-sm font-semibold text-foreground">Acme Cloud</span>
);

const StatCard = ({ label, value, hint }) => (
  <Card>
    <CardBody>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-secondary">{hint}</p>
    </CardBody>
  </Card>
);

function NavigationShellDemo() {
  const [active, setActive] = useState("overview");
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl border border-border">
      <AppShell
        contained
        sidebar={
          <Sidebar
            sections={sections}
            activeId={active}
            onSelect={setActive}
            header={<Brand />}
            className="w-full border-r-0"
          />
        }
        header={<h2 className="text-sm font-semibold text-foreground">Overview</h2>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard label="Monthly revenue" value="$48,210" hint="Up 12% from last month" />
          <StatCard label="Active projects" value="18" hint="4 due this week" />
        </div>
      </AppShell>
    </div>
  );
}

function ControlledShellDemo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" variant="outline" onClick={() => setMobileOpen(true)}>
          Open mobile navigation
        </Button>
        <span className="text-xs text-muted-foreground">
          Mobile navigation is {mobileOpen ? "open" : "closed"}
        </span>
      </div>
      <div className="relative h-96 w-full overflow-hidden rounded-xl border border-border">
        <AppShell
          contained
          mobileSidebarOpen={mobileOpen}
          onMobileSidebarOpenChange={setMobileOpen}
          mobileNavLabel="Workspace menu"
          sidebar={
            <Sidebar sections={sections} activeId="projects" className="w-full border-r-0" />
          }
          header={<h2 className="text-sm font-semibold text-foreground">Projects</h2>}
        >
          <p className="text-sm text-secondary">
            On screens narrower than 1024px the sidebar moves into a panel that
            slides in from the left.
          </p>
        </AppShell>
      </div>
    </div>
  );
}

const PROPS = [
  ["sidebar", "ReactNode", "-", "Sidebar content, reused in the mobile navigation panel (required)."],
  ["header", "ReactNode", "-", "Header content rendered next to the mobile menu button."],
  ["children", "ReactNode", "-", "Page content rendered inside the main landmark (required)."],
  ["footer", "ReactNode", "-", "Optional content pinned below the main region."],
  ["maxWidth", "string", '"max-w-7xl"', "Max-width class applied to the header, main, and footer wrappers."],
  ["stickyHeader", "boolean", "true", "Keeps the header visible while the content scrolls."],
  ["contained", "boolean", "false", "Fits the shell to its parent: internal scrolling, absolute mobile panel, no page scroll lock."],
  ["mobileSidebarOpen", "boolean", "-", "Controlled open state of the mobile navigation panel."],
  ["defaultMobileSidebarOpen", "boolean", "false", "Initial open state in uncontrolled mode."],
  ["onMobileSidebarOpenChange", "(open: boolean) => void", "-", "Called whenever the mobile panel opens or closes."],
  ["mainId", "string", '"main-content"', "Id of the main landmark, used as a SkipLink target."],
  ["mobileNavLabel", "string", '"Navigation"', "Heading and accessible name of the mobile panel."],
  ["menuButtonLabel", "string", '"Open navigation"', "Accessible label of the mobile menu button."],
  ["className", "string", "-", "Styles the root element."],
  ["sidebarClassName", "string", "-", "Styles the desktop sidebar column (default width w-64)."],
  ["headerClassName", "string", "-", "Styles the header bar."],
  ["mainClassName", "string", "-", "Styles the main landmark."],
  ["footerClassName", "string", "-", "Styles the footer bar."],
  ["menuButtonClassName", "string", "-", "Styles the mobile menu button."],
  ["mobileSidebarClassName", "string", "-", "Styles the mobile navigation panel."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
];

const PropsTable = ({ rows }) => (
  <div className="border border-zinc-800 rounded-xl overflow-x-auto">
    <table className="w-full min-w-[640px] text-sm">
      <thead className="bg-zinc-900 text-gray-200">
        <tr>
          <th scope="col" className="text-left p-3">Prop</th>
          <th scope="col" className="text-left p-3">Type</th>
          <th scope="col" className="text-left p-3">Default</th>
          <th scope="col" className="text-left p-3">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800 text-gray-300">
        {rows.map(([name, type, def, description]) => (
          <tr key={name}>
            <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
            <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
            <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
            <td className="p-3">{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AppShellDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            AppShell Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Responsive React app shell with a desktop sidebar, sticky header,
            mobile navigation drawer, and a main landmark for accessible
            dashboards. Use contained mode to embed it inside any bounded
            region.
          </p>
        </header>

        {/* Import */}
        <section aria-labelledby="AppShell-import">
          <h2 id="AppShell-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { AppShell } from "@neuctra/ui";`} />
        </section>

        {/* Example: Basic */}
        <section aria-labelledby="AppShell-example-0">
          <h2 id="AppShell-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Pass a Sidebar as sidebar and your page title as header. The
            preview uses contained so the shell stays inside its frame; omit
            it for a full-page layout.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [active, setActive] = useState("overview");

<div className="relative h-96 overflow-hidden rounded-xl border border-border">
  <AppShell
    contained
    sidebar={
      <Sidebar
        sections={sections}
        activeId={active}
        onSelect={setActive}
        header={<span className="text-sm font-semibold text-foreground">Acme Cloud</span>}
        className="w-full border-r-0"
      />
    }
    header={<h2 className="text-sm font-semibold text-foreground">Overview</h2>}
  >
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardBody>
          <p className="text-xs text-muted-foreground">Monthly revenue</p>
          <p className="mt-1 text-xl font-semibold text-foreground">$48,210</p>
          <p className="mt-1 text-xs text-secondary">Up 12% from last month</p>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <p className="text-xs text-muted-foreground">Active projects</p>
          <p className="mt-1 text-xl font-semibold text-foreground">18</p>
          <p className="mt-1 text-xs text-secondary">4 due this week</p>
        </CardBody>
      </Card>
    </div>
  </AppShell>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <NavigationShellDemo />
              </div>
            }
          />
        </section>

        {/* Example: Header actions + footer */}
        <section aria-labelledby="AppShell-example-1">
          <h2 id="AppShell-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Header Actions and Footer
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            The header slot is a flex row, so a title plus ml-auto actions
            lays out naturally. footer pins content below the main region.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="relative h-96 overflow-hidden rounded-xl border border-border">
  <AppShell
    contained
    sidebar={<Sidebar sections={sections} activeId="reports" className="w-full border-r-0" />}
    header={
      <>
        <h2 className="text-sm font-semibold text-foreground">Reports</h2>
        <div className="ml-auto flex items-center gap-2">
          <IconButton variant="ghost" icon={<Bell />} aria-label="Notifications" />
          <Avatar size="sm" fallback="JD" alt="Jordan Diaz" />
        </div>
      </>
    }
    footer={<p className="text-xs text-muted-foreground">Data refreshed 5 minutes ago</p>}
  >
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-medium text-foreground">Q3 performance</p>
      <Badge text="On track" variant="soft" size="sm" />
    </div>
    <p className="mt-2 text-sm text-secondary">
      Revenue is ahead of plan in every region except EMEA.
    </p>
  </AppShell>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="relative h-96 w-full overflow-hidden rounded-xl border border-border">
                  <AppShell
                    contained
                    sidebar={
                      <Sidebar sections={sections} activeId="reports" className="w-full border-r-0" />
                    }
                    header={
                      <>
                        <h2 className="text-sm font-semibold text-foreground">Reports</h2>
                        <div className="ml-auto flex items-center gap-2">
                          <IconButton variant="ghost" icon={<Bell />} aria-label="Notifications" />
                          <Avatar size="sm" fallback="JD" alt="Jordan Diaz" />
                        </div>
                      </>
                    }
                    footer={
                      <p className="text-xs text-muted-foreground">Data refreshed 5 minutes ago</p>
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">Q3 performance</p>
                      <Badge text="On track" variant="soft" size="sm" />
                    </div>
                    <p className="mt-2 text-sm text-secondary">
                      Revenue is ahead of plan in every region except EMEA.
                    </p>
                  </AppShell>
                </div>
              </div>
            }
          />
        </section>

        {/* Example: Controlled */}
        <section aria-labelledby="AppShell-example-2">
          <h2 id="AppShell-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Controlled Mobile Navigation
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Drive the mobile panel with mobileSidebarOpen and
            onMobileSidebarOpenChange. The panel only renders below 1024px, so
            narrow your browser to see it slide in. It closes automatically
            when the viewport grows past that breakpoint.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [mobileOpen, setMobileOpen] = useState(false);

<div className="w-full space-y-3">
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm" variant="outline" onClick={() => setMobileOpen(true)}>
      Open mobile navigation
    </Button>
    <span className="text-xs text-muted-foreground">
      Mobile navigation is {mobileOpen ? "open" : "closed"}
    </span>
  </div>
  <div className="relative h-96 overflow-hidden rounded-xl border border-border">
    <AppShell
      contained
      mobileSidebarOpen={mobileOpen}
      onMobileSidebarOpenChange={setMobileOpen}
      mobileNavLabel="Workspace menu"
      sidebar={<Sidebar sections={sections} activeId="projects" className="w-full border-r-0" />}
      header={<h2 className="text-sm font-semibold text-foreground">Projects</h2>}
    >
      <p className="text-sm text-secondary">
        On screens narrower than 1024px the sidebar moves into a panel that
        slides in from the left.
      </p>
    </AppShell>
  </div>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ControlledShellDemo />
              </div>
            }
          />
        </section>

        {/* Example: Skip link */}
        <section aria-labelledby="AppShell-example-3">
          <h2 id="AppShell-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            With a Skip Link
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Point a SkipLink at mainId so keyboard users can jump past the
            navigation. Click inside the frame, then press Tab to reveal it.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="relative h-96 overflow-hidden rounded-xl border border-border">
  <SkipLink targetId="billing-main" position="absolute" />
  <AppShell
    contained
    mainId="billing-main"
    sidebar={<Sidebar sections={sections} activeId="settings" className="w-full border-r-0" />}
    header={<h2 className="text-sm font-semibold text-foreground">Billing</h2>}
  >
    <p className="text-sm font-medium text-foreground">Pro plan</p>
    <p className="mt-1 text-sm text-secondary">$29 per seat, billed monthly. Next invoice on Dec 1.</p>
    <Button size="sm" className="mt-4">Manage plan</Button>
  </AppShell>
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="relative h-96 w-full overflow-hidden rounded-xl border border-border">
                  <SkipLink targetId="billing-main" position="absolute" />
                  <AppShell
                    contained
                    mainId="billing-main"
                    sidebar={
                      <Sidebar sections={sections} activeId="settings" className="w-full border-r-0" />
                    }
                    header={<h2 className="text-sm font-semibold text-foreground">Billing</h2>}
                  >
                    <p className="text-sm font-medium text-foreground">Pro plan</p>
                    <p className="mt-1 text-sm text-secondary">
                      $29 per seat, billed monthly. Next invoice on Dec 1.
                    </p>
                    <Button size="sm" className="mt-4">
                      Manage plan
                    </Button>
                  </AppShell>
                </div>
              </div>
            }
          />
        </section>

        {/* Props */}
        <section aria-labelledby="AppShell-props">
          <h2 id="AppShell-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the AppShell component. Other HTML
            attributes are forwarded to the root element.
          </p>
          <PropsTable rows={PROPS} />
        </section>

        {/* Accessibility */}
        <section aria-labelledby="AppShell-a11y">
          <h2 id="AppShell-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Page content lives in a main landmark with a stable id and tabIndex -1, ready to receive focus from a SkipLink.</li>
            <li>The mobile menu button exposes aria-haspopup="dialog", aria-expanded and aria-controls.</li>
            <li>The mobile panel is a modal dialog labelled by its heading, with a focus trap and Escape to close. Focus returns to the menu button on close.</li>
            <li>Page scroll is locked while the panel is open, except in contained mode where the shell does not own the page.</li>
            <li>Panel animations are disabled when the user prefers reduced motion.</li>
          </ul>
        </section>

        <ComponentFaq qa={appShellFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default AppShellDocs;
