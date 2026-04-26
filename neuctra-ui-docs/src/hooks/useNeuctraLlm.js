import { useCallback, useMemo, useState } from "react";

const DEFAULT_BASE_URL =
  import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com";
const DEFAULT_MODEL =
  import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini";
const DEFAULT_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

const STORAGE_KEY = "neuctra-ui-bot-config-v1";

const parseJsonFromModel = (rawContent) => {
  const text = String(rawContent || "").trim();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    // Try markdown code block extraction
  }

  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (!match?.[1]) return null;

  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
};

const extractCodeBlock = (text) => {
  const source = String(text || "");
  const match = source.match(/```(?:tsx|jsx|typescript|javascript)?\s*([\s\S]*?)```/i);
  return match?.[1]?.trim() || "";
};

const readStoredConfig = () => {
  if (typeof window === "undefined") {
    return {
      baseUrl: DEFAULT_BASE_URL,
      apiKey: DEFAULT_API_KEY,
      model: DEFAULT_MODEL,
    };
  }

  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      baseUrl: data.baseUrl || DEFAULT_BASE_URL,
      apiKey: data.apiKey || DEFAULT_API_KEY,
      model: data.model || DEFAULT_MODEL,
    };
  } catch {
    return {
      baseUrl: DEFAULT_BASE_URL,
      apiKey: DEFAULT_API_KEY,
      model: DEFAULT_MODEL,
    };
  }
};

export const useNeuctraLlm = ({ systemPrompt, referenceJson }) => {
  const [config, setConfig] = useState(readStoredConfig);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizedBaseUrl = useMemo(
    () => String(config.baseUrl || "").replace(/\/+$/, ""),
    [config.baseUrl]
  );

  const updateConfig = useCallback((partial) => {
    setConfig((prev) => {
      const next = { ...prev, ...partial };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const generate = useCallback(
    async ({ userPrompt, history = [], signal }) => {
      const safePrompt = String(userPrompt || "").trim();
      if (!safePrompt) {
        throw new Error("Prompt is required.");
      }

      if (!config.apiKey) {
        throw new Error("Missing API key. Add it in bot settings.");
      }

      setError("");
      setLoading(true);

      try {
        const payload = {
          model: config.model || DEFAULT_MODEL,
          temperature: 0.2,
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "system",
              content: `Neuctra UI AI reference JSON:\n${JSON.stringify(
                referenceJson
              )}`,
            },
            ...history.map((item) => ({
              role: item.role,
              content: item.content,
            })),
            { role: "user", content: safePrompt },
          ],
        };

        const response = await fetch(`${normalizedBaseUrl}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
          body: JSON.stringify(payload),
          signal,
        });

        if (!response.ok) {
          let message = `Request failed (${response.status})`;
          try {
            const data = await response.json();
            message = data?.error?.message || message;
          } catch {
            // ignore json parse failure
          }
          throw new Error(message);
        }

        const data = await response.json();
        const rawContent =
          data?.choices?.[0]?.message?.content ||
          "I could not generate a response.";

        const parsed = parseJsonFromModel(rawContent);
        const code =
          parsed?.code ||
          extractCodeBlock(parsed?.message || "") ||
          extractCodeBlock(rawContent);
        const message =
          parsed?.message ||
          (code
            ? "Here is a Neuctra UI implementation for your prompt."
            : String(rawContent));
        const title = parsed?.title || "Generated UI";

        return {
          title,
          message,
          code: String(code || ""),
          raw: rawContent,
          parsed: parsed || null,
        };
      } catch (err) {
        const message = err?.message || "Failed to connect to model.";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [config.apiKey, config.model, normalizedBaseUrl, referenceJson, systemPrompt]
  );

  return {
    config,
    updateConfig,
    loading,
    error,
    generate,
  };
};

