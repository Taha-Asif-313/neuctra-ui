const DEFAULT_API_BASE_URL =
  import.meta.env.VITE_UI_CREATOR_API_BASE_URL || "http://localhost:4000";

const toBaseUrl = (value) => String(value || "").replace(/\/+$/, "");

const readErrorMessage = async (response) => {
  try {
    const data = await response.json();
    if (data?.error) return String(data.error);
  } catch {
    // ignore json parsing failures
  }

  return `Request failed with status ${response.status}`;
};

export const createUiCreationClient = (apiBaseUrl = DEFAULT_API_BASE_URL) => {
  const baseUrl = toBaseUrl(apiBaseUrl);

  const generate = async (prompt, options = {}) => {
    const safePrompt = String(prompt || "").trim();
    if (!safePrompt) {
      throw new Error("Prompt is required.");
    }

    const response = await fetch(`${baseUrl}/api/ui/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: safePrompt }),
      signal: options.signal,
    });

    if (!response.ok) {
      const errorMessage = await readErrorMessage(response);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data?.code) {
      throw new Error("No generated code returned by API.");
    }

    return {
      code: String(data.code),
      raw: data,
    };
  };

  return {
    baseUrl,
    generate,
  };
};

export const uiCreationClient = createUiCreationClient();
