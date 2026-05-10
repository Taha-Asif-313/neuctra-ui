import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-zinc-950 text-gray-100 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Privacy Policy
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-300 mb-4">
              When you use Neuctra UI, we may collect certain information about your 
              device and usage patterns to improve our services.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Basic usage statistics</li>
              <li>Anonymous interaction data</li>
              <li>Error reports (if enabled)</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-300 mb-4">
              The information we collect helps us:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Improve product performance</li>
              <li>Fix bugs and issues</li>
              <li>Understand usage patterns</li>
              <li>Develop new features</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-300">
              We implement industry-standard security measures to protect your 
              information. All data is encrypted in transit and we follow best 
              practices for data protection.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. The latest 
              version will always be available on this page.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <Link 
            to="/contact"
            className="text-primary hover:text-primary/80 text-sm mt-2 inline-block"
          >
            Contact us with privacy concerns
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
