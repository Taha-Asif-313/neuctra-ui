import { useState } from "react";
import { retrieveComponents } from "./utils/retrieve";

export default function NeuctraUiChatbot() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  async function handleGenerate() {
    // Step 1: Retrieve
    const relevantComponents = retrieveComponents(prompt);

    // Step 2: Build augmented prompt
    const systemPrompt = `
      You are a UI generator.
      Use ONLY these components:
      ${JSON.stringify(relevantComponents, null, 2)}
    `;

    // Step 3: Call your serverless API
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, systemPrompt })
    });

    const data = await res.json();
    setGeneratedCode(data.code);
  }

  return (
    <div className="p-4">
      <textarea
        className="w-full border p-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type UI request..."
      />
      <button className="mt-2 bg-blue-500 text-white p-2" onClick={handleGenerate}>
        Generate
      </button>

      {generatedCode && (
        <pre className="mt-4 bg-black text-white p-2">{generatedCode}</pre>
      )}
    </div>
  );
}