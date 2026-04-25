"use client";

import React, { useState } from "react";
import ReactPageBlock from "./ReactPageBlock";

// Example React components for demonstration
const ButtonComponent = ({ text = "Click me", variant = "primary" }) => (
  <button
    className={`px-6 py-3 rounded-lg font-medium transition-all ${
      variant === "primary"
        ? "bg-blue-500 hover:bg-blue-600 text-white"
        : variant === "secondary"
        ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
        : "bg-green-500 hover:bg-green-600 text-white"
    }`}
  >
    {text}
  </button>
);

const CardComponent = ({ title, content }) => (
  <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </div>
);

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  return (
    <form className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

const ReactPageBlockExample = () => {
  const buttonCode = `import React from 'react';

const ButtonComponent = ({ text = "Click me", variant = "primary" }) => (
  <button
    className={\`px-6 py-3 rounded-lg font-medium transition-all \${
      variant === "primary"
        ? "bg-blue-500 hover:bg-blue-600 text-white"
        : variant === "secondary"
        ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
        : "bg-green-500 hover:bg-green-600 text-white"
    }\`}
  >
    {text}
  </button>
);

export default ButtonComponent;`;

  const cardCode = `import React from 'react';

const CardComponent = ({ title, content }) => (
  <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </div>
);

export default CardComponent;`;

  const formCode = `import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  return (
    <form className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;`;

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">ReactPageBlock Component Examples</h1>
        <p className="text-gray-400">Demonstrating React-specific features and live component rendering</p>
      </div>

      {/* Basic React Component */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Basic React Component</h2>
        <ReactPageBlock
          title="Button Component"
          description="Simple reusable button with variants"
          reactComponent={ButtonComponent}
          props={{ text: "Hello React!", variant: "primary" }}
          code={buttonCode}
          language="jsx"
          livePreview={true}
          height="300px"
          expandable={true}
        />
      </div>

      {/* Card Component */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Card Component</h2>
        <ReactPageBlock
          title="Card Component"
          description="Reusable card component with title and content"
          reactComponent={CardComponent}
          props={{
            title: "React Card",
            content: "This is a beautiful card component built with React and Tailwind CSS."
          }}
          code={cardCode}
          language="jsx"
          livePreview={true}
          height="350px"
          expandable={true}
        />
      </div>

      {/* Interactive Form Component */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Interactive Form Component</h2>
        <ReactPageBlock
          title="Form Component"
          description="Interactive form with state management"
          reactComponent={FormComponent}
          code={formCode}
          language="jsx"
          livePreview={true}
          height="400px"
          expandable={true}
        />
      </div>

      {/* Multiple Components in Preview */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Multiple Components</h2>
        <ReactPageBlock
          title="Component Showcase"
          description="Multiple React components in one preview"
          preview={
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <ButtonComponent text="Primary" variant="primary" />
                <ButtonComponent text="Secondary" variant="secondary" />
                <ButtonComponent text="Success" variant="success" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardComponent
                  title="Feature One"
                  content="This is the first feature card with some description text."
                />
                <CardComponent
                  title="Feature Two"
                  content="This is the second feature card with different content."
                />
              </div>
            </div>
          }
          code={`// Multiple components showcase
import ButtonComponent from './Button';
import CardComponent from './Card';

const Showcase = () => (
  <div className="space-y-6">
    <div className="flex gap-4">
      <ButtonComponent text="Primary" variant="primary" />
      <ButtonComponent text="Secondary" variant="secondary" />
      <ButtonComponent text="Success" variant="success" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <CardComponent title="Feature One" content="..." />
      <CardComponent title="Feature Two" content="..." />
    </div>
  </div>
);`}
          language="jsx"
          height="450px"
          expandable={true}
        />
      </div>

      {/* Code Only Example */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Code Only Example</h2>
        <ReactPageBlock
          title="Utility Hook"
          description="Custom React hook for API calls"
          showPreview={false}
          code={`import { useState, useEffect } from 'react';

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useApi;`}
          language="jsx"
          height="400px"
          expandable={true}
        />
      </div>
    </div>
  );
};

export default ReactPageBlockExample;
