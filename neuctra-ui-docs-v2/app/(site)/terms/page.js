import LegalDocument from "@/components/LegalDocument";

const sections = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using Neuctra UI, you agree to be bound by these Terms
        of Service. If you disagree with any part, you may not use our
        services.
      </p>
    ),
  },
  {
    id: "license",
    heading: "License and Use",
    content: (
      <>
        <p>Neuctra UI is provided under the MIT license. You may:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the library in personal and commercial projects</li>
          <li>Modify and adapt the source code</li>
          <li>Redistribute the software</li>
        </ul>
      </>
    ),
  },
  {
    id: "restrictions",
    heading: "Restrictions",
    content: (
      <>
        <p>You may not:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Hold us liable for any damages</li>
          <li>Use the software for illegal purposes</li>
          <li>Remove or alter license notices</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to Terms",
    content: (
      <p>
        We reserve the right to modify these terms at any time. Continued use
        constitutes acceptance of the new terms.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      intro="Review the terms and usage guidelines for the Neuctra UI website and software."
      sections={sections}
      footerLabel="Contact us with questions about these terms"
    />
  );
}
