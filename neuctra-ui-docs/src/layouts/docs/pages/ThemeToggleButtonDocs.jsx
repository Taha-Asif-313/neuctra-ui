import React from "react";
import CodeBlock from "../components/CodeBlock";
import Metadata from "../../../MetaData";
import {
  Palette,
  Lightbulb,
  Code2,
  Sparkles,
  Check,
  Moon,
  Sun,
} from "lucide-react";

const ThemeToggleDocsPage = () => {
  return (
    <>
      <Metadata
        title="Theme Toggle — Dark Mode Switch Component | Neuctra UI"
        description="Learn how to use the Theme Toggle component in Neuctra UI. A modern animated dark mode switch with Sun & Moon icons, fully reusable and context-driven."
        keywords="theme toggle react, dark mode switch react, lucide theme toggle, react theme context, neuctra ui theme, dark mode button react, custom toggle component"
      />

      <div className="bg-transparent text-white min-h-screen">
        <div className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-white">
              Theme Toggle Component
            </h1>

            <p className="text-gray-200 mt-2">
              A modern, animated dark mode toggle built for SaaS applications.
              It supports Sun/Moon icon transitions, smooth thumb animation,
              and works with a context-driven theme system.
            </p>
          </div>

          {/* STEP 1 */}
          <Step
            icon={Palette}
            title="Overview"
            description="The Theme Toggle is a reusable UI component that connects to your theme context and switches between light and dark modes."
          >
            <ul className="text-gray-200 text-sm list-disc ml-5 space-y-1">
              <li>Fully controlled via context</li>
              <li>Supports dark & light mode</li>
              <li>Smooth animated transitions</li>
              <li>Optimized for design systems</li>
            </ul>
          </Step>

          {/* STEP 2 */}
          <Step
            icon={Code2}
            title="Installation (Package Usage)"
            description="Import the ThemeToggle component from your UI package."
          >
            <CodeBlock
              language="tsx"
              code={`import { ThemeToggleButton } from "@neuctra/ui";`}
            />

            <p className="text-gray-200 text-sm">
              It is fully standalone and does not require internal hooks.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step
            icon={Lightbulb}
            title="Context Setup"
            description="ThemeToggle receives theme state through a context object."
          >
            <CodeBlock
              language="tsx"
              code={`type ThemeToggleContext = {
  isDark: boolean;
  toggleTheme: () => void;
};`}
            />

            <p className="text-gray-200 text-sm">
              You pass the context directly into the component.
            </p>
          </Step>

          {/* STEP 4 */}
          <Step
            icon={Code2}
            title="Basic Usage"
            description="Use ThemeToggleButton inside your app with ThemeContext."
          >
            <CodeBlock
              tabs={[
                {
                  name: "JavaScript",
                  language: "jsx",
                  code: `import { ThemeToggleButton } from "@neuctra/ui";
import { useTheme } from "./contexts/ThemeContext";

export default function App() {
  const theme = useTheme();

  return (
    <div className="p-10">
      <ThemeToggleButton context={theme} />
    </div>
  );
}`,
                },
                {
                  name: "TypeScript",
                  language: "tsx",
                  code: `import { ThemeToggleButton } from "@neuctra/ui";
import { useTheme } from "./contexts/ThemeContext";

export default function App(): JSX.Element {
  const theme = useTheme();

  return (
    <div className="p-10">
      <ThemeToggleButton context={theme} />
    </div>
  );
}`,
                },
              ]}
            />
          </Step>

          {/* STEP 4.5 */}
          <Step
            icon={Palette}
            title="Customization"
            description="Every part of the toggle accepts its own className, on top of the root className."
          >
            <CodeBlock
              language="tsx"
              code={`<ThemeToggleButton
  context={theme}
  className="h-10 w-10"
  sunClassName="text-amber-400"
  moonClassName="text-indigo-400"
/>`}
            />

            <p className="text-gray-200 text-sm">
              <code>sunClassName</code> and <code>moonClassName</code> style
              the Sun/Moon icons independently — useful for matching the
              toggle's colors to your brand instead of the default{" "}
              <code>text-warning</code> / <code>text-info</code> tokens.
            </p>
          </Step>

          {/* STEP 5 */}
          <Step
            icon={Sparkles}
            title="UI Behavior"
            description="The toggle includes animated icons and a sliding thumb for modern UX."
          >
            <div className="space-y-2 text-gray-200 text-sm">
              <p className="flex items-center gap-2">
                <Sun size={14} className="text-yellow-400" />
                Light mode shows Sun icon
              </p>

              <p className="flex items-center gap-2">
                <Moon size={14} className="text-blue-400" />
                Dark mode shows Moon icon
              </p>

              <p>✔ Smooth transition animations</p>
              <p>✔ Compact SaaS-style design</p>
              <p>✔ Fully responsive UI</p>
            </div>
          </Step>

          {/* STEP 6 */}
          <Step
            icon={Check}
            title="Best Practices"
            description="Recommended usage patterns for production apps."
          >
            <ul className="text-gray-200 text-sm list-disc ml-5 space-y-1">
              <li>Keep ThemeProvider at root level</li>
              <li>Use toggle in navbar or settings panel</li>
              <li>Persist theme in localStorage</li>
              <li>Sync with system preference</li>
            </ul>

            <p className="text-green-500 flex items-center gap-2 text-sm mt-2">
              <Check size={14} />
              Recommended for all SaaS dashboards
            </p>
          </Step>
        </div>
      </div>
    </>
  );
};

/* ---------------- STEP COMPONENT ---------------- */

const Step = ({ icon: Icon, title, description, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Icon className="text-primary" size={18} />
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>

    <p className="text-gray-200 text-sm">{description}</p>

    <div className="space-y-3">{children}</div>
  </div>
);

export default ThemeToggleDocsPage;