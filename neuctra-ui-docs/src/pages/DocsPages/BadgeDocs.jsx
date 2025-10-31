import React from "react";
import { Badge } from "@neuctra/ui"; // or wherever your Badge is exported
import CodePreviewBlock from "../../components/Docs/CodePreviewBlock";
import { Bell, Star, Info, Heart } from "lucide-react";
import DocsFooter from "../../components/Docs/DocsFooter";

const BadgeDocs = () => {
  return (
    <div className="bg-zinc-950 text-gray-200 font-primary min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-extrabold mb-3 text-white">
            Badge Component
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            The <span className="text-primary font-semibold">Badge</span>{" "}
            component is a versatile element used to highlight information,
            statuses, or notifications. It supports icons, colors, borders,
            rounded shapes, and even animated notification dots.
          </p>
        </header>

        {/* Basic Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Basic Example
          </h2>

          <CodePreviewBlock
            language="jsx"
            code={`<Badge text="New" />
<Badge text="Success" color="#16a34a" />
<Badge text="Alert" color="#dc2626" />`}
            previewContent={
              <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                <Badge text="New" />
                <Badge text="Success" color="#16a34a" />
                <Badge text="Alert" color="#dc2626" />
              </div>
            }
          />
        </section>

        {/* Icon Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Badges with Icons
          </h2>
          <p className="text-gray-300 mb-3">
            You can easily include icons from{" "}
            <code className="text-primary">lucide-react</code> or any other
            library. Position them using{" "}
            <code className="text-primary">iconPosition</code>.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Badge text="Info" icon={<Info size={14} />} />
<Badge text="Starred" color="#facc15" icon={<Star size={14} />} iconPosition="right" />`}
            previewContent={
              <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                <Badge text="Info" icon={<Info size={14} />} />
                <Badge
                  text="Starred"
                  color="#facc15"
                  textColor="#111"
                  icon={<Star size={14} />}
                  iconPosition="right"
                />
              </div>
            }
          />
        </section>

        {/* Notification Dots */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Notification & Count Badges
          </h2>
          <p className="text-gray-300 mb-3">
            Use{" "}
            <code className="text-primary">notificationDot</code> or{" "}
            <code className="text-primary">count</code> to show alerts, unread
            messages, or activity indicators.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Badge text="Inbox" icon={<Bell size={14} />} notificationDot />
<Badge icon={<Heart size={14} />} count={3} color="#ef4444" />`}
            previewContent={
              <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                <Badge
                  text="Inbox"
                  icon={<Bell size={14} />}
                  notificationDot
                />
                <Badge icon={<Heart size={14} />} count={3} color="#ef4444" />
              </div>
            }
          />
        </section>

        {/* Styling Options */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Custom Styling
          </h2>
          <p className="text-gray-300 mb-3">
            The Badge component supports full customization — colors, borders,
            shadows, radius, and text styles.
          </p>

          <CodePreviewBlock
            language="jsx"
            code={`<Badge
  text="Rounded"
  color="#0ea5e9"
  textColor="#fff"
  rounded
  shadow="0 0 10px rgba(14,165,233,0.4)"
/>
<Badge
  text="Outlined"
  color="transparent"
  textColor="#22c55e"
  borderColor="#22c55e"
  borderWidth="2px"
/>`}
            previewContent={
              <div className="flex flex-wrap gap-3 p-6 bg-zinc-900 rounded-xl">
                <Badge
                  text="Rounded"
                  color="#0ea5e9"
                  textColor="#fff"
                  rounded
                  shadow="0 0 10px rgba(14,165,233,0.4)"
                />
                <Badge
                  text="Outlined"
                  color="transparent"
                  textColor="#22c55e"
                  borderColor="#22c55e"
                  borderWidth="2px"
                />
              </div>
            }
          />
        </section>

        {/* Footer */}
        <DocsFooter />
      </div>
    </div>
  );
};

export default BadgeDocs;
