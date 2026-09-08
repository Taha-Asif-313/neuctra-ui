import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { breadcrumbSchema } from "@/lib/seo/schemas/breadcrumbSchema";
import { techArticleSchema } from "@/lib/seo/schemas/techArticleSchema";
import { faqSchema, buildComponentFaq } from "@/lib/seo/schemas/faqSchema";

const TITLE = "PinInput Component — React OTP Code Field | Neuctra UI";
const DESCRIPTION =
  "React PIN / OTP input with auto-advance, smart Backspace, full-code paste, numeric or alphanumeric modes, masking and one-time-code autofill.";

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "react otp input, pin code component, verification code ui, one time password react, otp boxes tailwind, neuctra ui pin input",
  path: "/docs/pin-input",
});

const pinInputFaq = buildComponentFaq("PinInput", {
  sizes: ["sm", "md", "lg"],
});

export default function PinInputLayout({ children }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { label: "Home", path: "/" },
            { label: "Docs", path: "/docs" },
            { label: "Pin Input", path: "/docs/pin-input" },
          ]),
          techArticleSchema({
            name: "PinInput",
            description: DESCRIPTION,
            path: "/docs/pin-input",
          }),
          faqSchema(pinInputFaq),
        ]}
      />
      {children}
    </>
  );
}
