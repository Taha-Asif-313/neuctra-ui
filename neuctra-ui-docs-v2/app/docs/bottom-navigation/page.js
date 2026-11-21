"use client";

import { useState } from "react";
import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import {
  Accessibility,
  Home,
  Search,
  ShoppingBag,
  Heart,
  User,
  MessageCircle,
  Bell,
  Wallet,
} from "lucide-react";
import { BottomNavigation, Card, CardBody, Badge } from "@neuctra/ui";

const bottomNavigationFaq = buildComponentFaq("BottomNavigation");

const shopItems = [
  { id: "home", label: "Home", icon: <Home /> },
  { id: "search", label: "Search", icon: <Search /> },
  { id: "cart", label: "Cart", icon: <ShoppingBag />, badge: 3 },
  { id: "saved", label: "Saved", icon: <Heart /> },
  { id: "account", label: "Account", icon: <User /> },
];

const socialItems = [
  { id: "feed", label: "Feed", icon: <Home /> },
  { id: "messages", label: "Messages", icon: <MessageCircle />, badge: 128 },
  { id: "alerts", label: "Alerts", icon: <Bell />, badge: true },
  { id: "wallet", label: "Wallet", icon: <Wallet />, disabled: true },
];

const PhoneFrame = ({ children }) => (
  <div className="relative h-96 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background">
    {children}
  </div>
);

function ShopDemo() {
  const [active, setActive] = useState("home");
  const current = shopItems.find((item) => item.id === active);
  return (
    <PhoneFrame>
      <div className="space-y-3 p-4 pb-20">
        <p className="text-base font-semibold text-foreground">{current?.label}</p>
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Linen overshirt</p>
              <Badge text="New" variant="soft" size="sm" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">$68 · Free returns</p>
          </CardBody>
        </Card>
      </div>
      <BottomNavigation
        position="absolute"
        items={shopItems}
        activeId={active}
        onChange={setActive}
      />
    </PhoneFrame>
  );
}

const PROPS = [
  ["items", "BottomNavigationItem[]", "-", "Destinations shown in the bar (required)."],
  ["activeId", "string", "-", "Id of the active item (controlled)."],
  ["defaultActiveId", "string", "first item id", "Initially active id in uncontrolled mode."],
  ["onChange", "(id: string) => void", "-", "Called with the id of a newly selected item."],
  ["position", '"fixed" | "absolute" | "sticky" | "static"', '"fixed"', "How the bar is positioned. fixed pins it to the viewport bottom."],
  ["showLabels", "boolean", "true", "Shows text labels; when false they stay screen-reader only."],
  ["maxBadgeCount", "number", "99", "Numeric badges above this value render as max+."],
  ["ariaLabel", "string", '"Primary"', "Accessible label for the navigation landmark."],
  ["className", "string", "-", "Styles the nav element."],
  ["style", "CSSProperties", "-", "Inline styles for the nav element."],
  ["itemClassName", "string", "-", "Styles every item button."],
  ["activeItemClassName", "string", "-", "Styles the active item, applied after itemClassName."],
  ["iconClassName", "string", "-", "Styles the icon pill."],
  ["labelClassName", "string", "-", "Styles the text label."],
  ["badgeClassName", "string", "-", "Styles the badge."],
];

const ITEM_PROPS = [
  ["id", "string", "-", "Stable id of the destination (required)."],
  ["label", "string", "-", "Visible label under the icon (required)."],
  ["icon", "ReactNode", "-", "Icon node (required)."],
  ["badge", "string | number | boolean", "-", "Count or text badge; true shows a dot."],
  ["disabled", "boolean", "false", "Prevents selecting the item."],
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

const BottomNavigationDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            BottomNavigation Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            A bottom navigation bar for mobile layouts with icons, labels,
            badges, active-page state and safe-area padding. Pin it to the
            viewport, a container, or keep it in flow.
          </p>
        </header>

        <section aria-labelledby="BottomNavigation-import">
          <h2 id="BottomNavigation-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { BottomNavigation } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="BottomNavigation-example-0">
          <h2 id="BottomNavigation-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            By default the bar is fixed to the bottom of the viewport. Here
            position="absolute" pins it to the phone frame instead. Leave
            bottom padding on your content so the bar never covers it.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`const [active, setActive] = useState("home");

const items = [
  { id: "home", label: "Home", icon: <Home /> },
  { id: "search", label: "Search", icon: <Search /> },
  { id: "cart", label: "Cart", icon: <ShoppingBag />, badge: 3 },
  { id: "saved", label: "Saved", icon: <Heart /> },
  { id: "account", label: "Account", icon: <User /> },
];

<div className="relative h-96 max-w-sm overflow-hidden rounded-xl border border-border bg-background">
  <div className="space-y-3 p-4 pb-20">
    {/* screen content */}
  </div>
  <BottomNavigation
    position="absolute"
    items={items}
    activeId={active}
    onChange={setActive}
  />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <ShopDemo />
              </div>
            }
          />
        </section>

        <section aria-labelledby="BottomNavigation-example-1">
          <h2 id="BottomNavigation-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Badges and Disabled Items
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            Numbers above maxBadgeCount collapse to 99+, badge: true shows a
            dot, and disabled destinations are dimmed. Without activeId the
            bar manages its own state starting at defaultActiveId.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="w-full max-w-sm overflow-hidden rounded-xl border border-border">
  <BottomNavigation
    position="static"
    defaultActiveId="feed"
    items={[
      { id: "feed", label: "Feed", icon: <Home /> },
      { id: "messages", label: "Messages", icon: <MessageCircle />, badge: 128 },
      { id: "alerts", label: "Alerts", icon: <Bell />, badge: true },
      { id: "wallet", label: "Wallet", icon: <Wallet />, disabled: true },
    ]}
  />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border">
                  <BottomNavigation position="static" defaultActiveId="feed" items={socialItems} />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="BottomNavigation-example-2">
          <h2 id="BottomNavigation-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Icon Only
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            showLabels=false hides the text visually but keeps it as the
            accessible name of each button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<div className="w-full max-w-sm overflow-hidden rounded-xl border border-border">
  <BottomNavigation
    position="static"
    showLabels={false}
    defaultActiveId="search"
    items={items}
  />
</div>`}
            previewContent={
              <div className="flex w-full flex-wrap items-center gap-4 py-4">
                <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border">
                  <BottomNavigation
                    position="static"
                    showLabels={false}
                    defaultActiveId="search"
                    items={shopItems}
                  />
                </div>
              </div>
            }
          />
        </section>

        <section aria-labelledby="BottomNavigation-props">
          <h2 id="BottomNavigation-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            All available props for the BottomNavigation component. Other HTML
            attributes are forwarded to the nav element.
          </p>
          <PropsTable rows={PROPS} />
          <h3 className="text-lg font-semibold mt-8 mb-3 text-white">BottomNavigationItem</h3>
          <PropsTable rows={ITEM_PROPS} />
        </section>

        <section aria-labelledby="BottomNavigation-a11y">
          <h2 id="BottomNavigation-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>Renders a nav landmark named by ariaLabel, with destinations in a list.</li>
            <li>The active destination gets aria-current="page".</li>
            <li>Count badges render with the Badge component inside the aria-hidden icon pill, and are announced as part of the button name instead, for example "Messages, 99+ new" or "Alerts, new activity".</li>
            <li>Each item is a native button at least 56px tall with an inset focus ring; disabled items are skipped by Tab.</li>
            <li>Bottom padding respects the device safe area on notched phones.</li>
          </ul>
        </section>

        <ComponentFaq qa={bottomNavigationFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default BottomNavigationDocs;
