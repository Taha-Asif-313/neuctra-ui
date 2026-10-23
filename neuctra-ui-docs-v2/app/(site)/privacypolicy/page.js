import LegalDocument from "@/components/LegalDocument";

const sections = [
  {
    id: "collection",
    heading: "Information We Collect",
    content: (
      <>
        <p>
          When you use Neuctra UI, we may collect certain information about
          your device and usage patterns to improve our services.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Basic usage statistics</li>
          <li>Anonymous interaction data</li>
          <li>Error reports (if enabled)</li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    heading: "How We Use Your Information",
    content: (
      <>
        <p>The information we collect helps us:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Improve product performance</li>
          <li>Fix bugs and issues</li>
          <li>Understand usage patterns</li>
          <li>Develop new features</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    heading: "Data Security",
    content: (
      <p>
        We implement industry-standard security measures to protect your
        information. All data is encrypted in transit and we follow best
        practices for data protection.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. The latest version
        will always be available on this page.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="Read how Neuctra UI describes the collection and use of data, its stated security practices, and policy updates."
      sections={sections}
      footerLabel="Contact us with privacy concerns"
    />
  );
}
