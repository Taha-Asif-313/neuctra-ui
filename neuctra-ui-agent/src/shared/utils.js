export function stripCodeFences(value) {
  const trimmed = String(value ?? "").trim();

  if (!trimmed.startsWith("```")) {
    return trimmed;
  }

  return trimmed.replace(/^```[a-zA-Z]*\s*/, "").replace(/\s*```$/, "").trim();
}

export function extractFirstJsonBlock(value) {
  const source = String(value ?? "");
  const start = source.indexOf("{");

  if (start === -1) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (character === "\\") {
      escaped = true;
      continue;
    }

    if (character === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (character === "{") {
      depth += 1;
    }

    if (character === "}") {
      depth -= 1;

      if (depth === 0) {
        return source.slice(start, index + 1);
      }
    }
  }

  return null;
}

export function safeJsonParse(value, fallback) {
  const block = extractFirstJsonBlock(stripCodeFences(value));

  if (!block) {
    return fallback;
  }

  try {
    return JSON.parse(block);
  } catch {
    return fallback;
  }
}

export function dedupeStrings(values) {
  return Array.from(
    new Set(
      (values ?? [])
        .map((value) => String(value ?? "").trim())
        .filter(Boolean),
    ),
  );
}

export function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeWhitespace(value) {
  return String(value ?? "").replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}

export function messageContentToText(content) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((chunk) => {
        if (!chunk) {
          return "";
        }

        if (typeof chunk === "string") {
          return chunk;
        }

        if (typeof chunk === "object") {
          if (typeof chunk.text === "string") {
            return chunk.text;
          }

          if (typeof chunk.content === "string") {
            return chunk.content;
          }
        }

        return "";
      })
      .join("");
  }

  return String(content ?? "");
}