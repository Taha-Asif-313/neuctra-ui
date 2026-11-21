"use client";

import CodePreviewBlock from "@/components/CodePreviewBlock";
import CodeBlock from "@/components/CodeBlock";
import DocsFooter from "@/components/DocsFooter";
import ComponentFaq from "@/components/ComponentFaq";
import { buildComponentFaq } from "@/lib/seo/schemas/faqSchema";
import { Accessibility } from "lucide-react";
import { Price, PriceTag, Card, CardBody, Button, Badge } from "@neuctra/ui";

// Recomputed locally rather than imported from ./layout.js (Server Component).
const priceFaq = buildComponentFaq("Price", { sizes: ["sm", "md", "lg"] });

function PropsTable({ rows }) {
  return (
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
          {rows.map(([name, type, def, desc]) => (
            <tr key={name}>
              <td className="p-3 font-medium text-primary whitespace-nowrap">{name}</td>
              <td className="p-3 font-mono text-xs text-gray-300">{type}</td>
              <td className="p-3 text-gray-400 whitespace-nowrap">{def}</td>
              <td className="p-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const priceProps = [
  ["value", "number", "-", "Amount in the major currency unit, e.g. 19.99 (required)."],
  ["currency", "string", '"USD"', "ISO 4217 currency code."],
  ["compareAt", "number", "-", "Original amount, shown struck through when higher than value."],
  ["showSavings", "boolean", "false", "Shows a Save badge when compareAt is higher than value."],
  ["savingsFormat", '"amount" | "percent"', '"amount"', "Savings badge shows the amount saved or the percent off."],
  ["locale", "string", '"en-US"', "BCP 47 locale used for formatting."],
  ["fractionDigits", "number", "-", "Fixed fraction digits. Defaults to the currency's standard digits."],
  ["period", "ReactNode", "-", 'Billing period after the amount, e.g. "/mo".'],
  ["installment", "ReactNode", "-", "Installment line under the price."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Text size preset."],
  ["className", "string", "-", "Styles the root element."],
  ["style", "CSSProperties", "-", "Inline styles for the root element."],
  ["amountClassName", "string", "-", "Styles the main amount."],
  ["compareAtClassName", "string", "-", "Styles the struck-through amount."],
  ["savingsClassName", "string", "-", "Styles the savings Badge."],
  ["periodClassName", "string", "-", "Styles the billing period."],
  ["installmentClassName", "string", "-", "Styles the installment line."],
];

const priceTagProps = [
  ["...PriceProps", "PriceProps", "-", "Every Price prop is forwarded to the inner Price."],
  ["label", "ReactNode", "-", 'Caption above the amount, e.g. "Sale price".'],
  ["labelClassName", "string", "-", "Styles the caption."],
  ["priceClassName", "string", "-", "Styles the inner Price root."],
  ["className", "string", "-", "Styles the card surface."],
  ["style", "CSSProperties", "-", "Inline styles for the card surface."],
];

const PriceDocs = () => {
  return (
    <div className="font-primary min-h-screen">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Price Component
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed max-w-3xl">
            Locale-aware price display for product pages, carts and pricing
            tables. Handles currencies, comparison prices, savings badges,
            billing periods and installment text.
          </p>
        </header>

        <section aria-labelledby="Price-import">
          <h2 id="Price-import" className="text-xl sm:text-2xl font-semibold mb-3 text-white">
            Import
          </h2>
          <CodeBlock code={`import { Price, PriceTag } from "@neuctra/ui";`} />
        </section>

        <section aria-labelledby="Price-example-0">
          <h2 id="Price-example-0" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Basic Usage
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            The amount is formatted with Intl.NumberFormat for the given
            currency and locale.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Price value={49} />
<Price value={1299.5} currency="EUR" locale="de-DE" />
<Price value={4800} currency="JPY" locale="ja-JP" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-baseline gap-x-8 gap-y-4 py-4">
                <Price value={49} />
                <Price value={1299.5} currency="EUR" locale="de-DE" />
                <Price value={4800} currency="JPY" locale="ja-JP" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Price-example-1">
          <h2 id="Price-example-1" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sizes
          </h2>
          <CodePreviewBlock
            language="jsx"
            code={`<Price value={19} size="sm" period="/mo" />
<Price value={19} size="md" period="/mo" />
<Price value={19} size="lg" period="/mo" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-baseline gap-x-8 gap-y-4 py-4">
                <Price value={19} size="sm" period="/mo" />
                <Price value={19} size="md" period="/mo" />
                <Price value={19} size="lg" period="/mo" />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Price-example-2">
          <h2 id="Price-example-2" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Sale Price and Savings
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            compareAt renders the original price struck through. showSavings
            adds a success badge with the amount or percent saved.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Price value={79} compareAt={129} showSavings />
<Price value={79} compareAt={129} showSavings savingsFormat="percent" installment="or 4 payments of $19.75" />`}
            previewContent={
              <div className="flex w-full flex-wrap items-start gap-x-10 gap-y-6 py-4">
                <Price value={79} compareAt={129} showSavings />
                <Price
                  value={79}
                  compareAt={129}
                  showSavings
                  savingsFormat="percent"
                  installment="or 4 payments of $19.75"
                />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Price-example-3">
          <h2 id="Price-example-3" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Pricing Card
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A plan card composed with Card, Badge and Button.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<Card className="w-full max-w-sm">
  <CardBody className="space-y-4">
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-semibold text-foreground">Team</p>
      <Badge variant="soft" text="Most popular" className="whitespace-nowrap" />
    </div>
    <Price value={24} compareAt={30} period="/user/mo" showSavings savingsFormat="percent" size="lg" installment="Billed annually at $288 per user" />
    <p className="text-sm text-secondary">Unlimited projects, SSO and priority support for growing teams.</p>
    <Button fullWidth>Start 14-day trial</Button>
  </CardBody>
</Card>`}
            previewContent={
              <div className="w-full py-4">
                <Card className="w-full max-w-sm">
                  <CardBody className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-foreground">Team</p>
                      <Badge variant="soft" text="Most popular" className="whitespace-nowrap" />
                    </div>
                    <Price
                      value={24}
                      compareAt={30}
                      period="/user/mo"
                      showSavings
                      savingsFormat="percent"
                      size="lg"
                      installment="Billed annually at $288 per user"
                    />
                    <p className="text-sm text-secondary">
                      Unlimited projects, SSO and priority support for growing teams.
                    </p>
                    <Button fullWidth>Start 14-day trial</Button>
                  </CardBody>
                </Card>
              </div>
            }
          />
        </section>

        <section aria-labelledby="Price-example-4">
          <h2 id="Price-example-4" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            PriceTag
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-3xl">
            A Price inside a compact Neuctra Card with a caption, for product
            listings and checkout summaries.
          </p>
          <CodePreviewBlock
            language="jsx"
            code={`<PriceTag label="Sale price" value={189} compareAt={249} showSavings size="sm" />
<PriceTag label="Order total" value={1043.2} />`}
            previewContent={
              <div className="flex w-full flex-wrap items-start gap-4 py-4">
                <PriceTag label="Sale price" value={189} compareAt={249} showSavings size="sm" />
                <PriceTag label="Order total" value={1043.2} />
              </div>
            }
          />
        </section>

        <section aria-labelledby="Price-props">
          <h2 id="Price-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">All available props for the Price component.</p>
          <PropsTable rows={priceProps} />
        </section>

        <section aria-labelledby="PriceTag-props">
          <h2 id="PriceTag-props" className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            PriceTag Props
          </h2>
          <p className="text-sm text-gray-400 mb-4">Extra props accepted by PriceTag.</p>
          <PropsTable rows={priceTagProps} />
        </section>

        <section aria-labelledby="Price-a11y">
          <h2 id="Price-a11y" className="flex items-center gap-2 text-xl sm:text-2xl font-semibold mb-3 text-white">
            <Accessibility className="text-primary" size={22} />
            Accessibility
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-300">
            <li>
              When a comparison price is shown, screen readers hear "Current
              price" and "Original price" labels, since strikethrough styling is
              not announced.
            </li>
            <li>The original amount uses a semantic {"<s>"} element.</li>
            <li>Amounts use tabular numbers so prices line up in lists and tables.</li>
            <li>An invalid currency code falls back to a plain number instead of crashing.</li>
          </ul>
        </section>

        <ComponentFaq qa={priceFaq} />
        <DocsFooter />
      </div>
    </div>
  );
};

export default PriceDocs;
