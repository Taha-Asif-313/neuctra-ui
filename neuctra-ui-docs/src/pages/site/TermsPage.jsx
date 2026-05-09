import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="bg-zinc-950 text-gray-100 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Terms of Service
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {/* Acceptance of Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-300">
              By accessing or using Neuctra UI, you agree to be bound by these 
              Terms of Service. If you disagree with any part, you may not use 
              our services.
            </p>
          </section>

          {/* License and Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              License and Use
            </h2>
            <p className="text-gray-300 mb-4">
              Neuctra UI is provided under the MIT license. You may:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Use the library in personal and commercial projects</li>
              <li>Modify and adapt the source code</li>
              <li>Redistribute the software</li>
            </ul>
          </section>

          {/* Restrictions */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Restrictions
            </h2>
            <p className="text-gray-300 mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Hold us liable for any damages</li>
              <li>Use the software for illegal purposes</li>
              <li>Remove or alter license notices</li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-300">
              We reserve the right to modify these terms at any time. Continued 
              use constitutes acceptance of the new terms.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Effective date: {new Date().toLocaleDateString()}
          </p>
          <Link
            to="/contact"
            className="text-primary hover:text-primary/80 text-sm mt-2 inline-block"
          >
            Contact us for questions about these terms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
