"use client";

import React from "react";
import PageBlock from "./PageBlock";

// Example component to demonstrate PageBlock usage
const PageBlockExample = () => {
  const sampleCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Page</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to PageBlock Demo</h1>
        <div class="card">
            <h2>Interactive Component</h2>
            <p>This is a sample page demonstrating the PageBlock component capabilities.</p>
            <button onclick="alert('Hello from PageBlock!')" style="
                background: #4CAF50;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            ">Click Me!</button>
        </div>
    </div>
</body>
</html>`;

  const reactPreview = (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">React Component Preview</h2>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-gray-600 mb-3">This is a custom React component rendered inside PageBlock.</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">PageBlock Component Examples</h1>
        <p className="text-gray-400">Demonstrating different ways to use the PageBlock component</p>
      </div>

      {/* Basic Example with URL */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">External Website Example</h2>
        <PageBlock
          title="Google Homepage"
          description="External website loaded in iframe"
          url="https://www.google.com"
          height="400px"
          expandable={true}
        />
      </div>

      {/* Code Example */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">HTML Code Example</h2>
        <PageBlock
          title="Sample HTML Page"
          description="Interactive HTML page with styling"
          code={sampleCode}
          language="html"
          height="450px"
          expandable={true}
        />
      </div>

      {/* React Component Example */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">React Component Example</h2>
        <PageBlock
          title="React Component"
          description="Custom React component preview"
          preview={reactPreview}
          code={`// React Component Code
import React from 'react';

const MyComponent = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        React Component Preview
      </h2>
      <div className="bg-white rounded-lg p-4 shadow-md">
        <p className="text-gray-600 mb-3">
          This is a custom React component rendered inside PageBlock.
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;`}
          language="jsx"
          height="350px"
          expandable={true}
        />
      </div>

      {/* Minimal Example */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Minimal Example</h2>
        <PageBlock
          title="Simple Page"
          description="Basic PageBlock with minimal configuration"
          code={`<div>
  <h1>Hello World</h1>
  <p>This is a simple example.</p>
</div>`}
          height="200px"
        />
      </div>

      {/* Preview Only Example */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Preview Only Example</h2>
        <PageBlock
          title="Preview Only"
          description="Only showing preview, no code tab"
          preview={
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Design Preview</h3>
              <p className="text-gray-600">This is a preview-only PageBlock</p>
            </div>
          }
          showCode={false}
          height="300px"
        />
      </div>
    </div>
  );
};

export default PageBlockExample;
