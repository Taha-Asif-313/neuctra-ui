"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMotionPreference, useMotionStill } from "./MotionPreference";

/**
 * A terminal that replays a real session: commands type out, output lines
 * appear, then it holds and starts again. Every line is rendered from the
 * start and only hidden, so the box never changes height. The static HTML,
 * reduced motion, and JavaScript off all show the full transcript.
 *
 * title:  window title, such as "~/my-app"
 * lines:  [{ type: "cmd" | "out" | "ok", text }]
 *         Use commands and output the product really produces.
 * typeMs: delay per typed character
 * holdMs: pause on the finished transcript before replaying
 */
export default function TerminalReplay({
  title = "terminal",
  lines,
  typeMs = 38,
  holdMs = 3200,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { reduced } = useMotionPreference();
  const still = useMotionStill();
  const finished = { line: lines.length, chars: 0 };
  const [position, setPosition] = useState(finished);
  const shown = reduced ? finished : position;

  useEffect(() => {
    if (still || !inView) return undefined;

    const current = lines[position.line];
    let delay;
    let next;
    if (!current) {
      delay = holdMs;
      next = { line: 0, chars: 0 };
    } else if (current.type === "cmd" && position.chars < current.text.length) {
      delay = typeMs;
      next = { line: position.line, chars: position.chars + 1 };
    } else {
      delay = current.type === "cmd" ? 420 : 240;
      next = { line: position.line + 1, chars: 0 };
    }

    const timer = setTimeout(() => setPosition(next), delay);
    return () => clearTimeout(timer);
  }, [position, still, inView, lines, typeMs, holdMs]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-border bg-card font-mono text-[13px] leading-6"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 text-xs text-muted-foreground">{title}</span>
      </div>
      <ol className="p-4" aria-label="Terminal session">
        {lines.map((line, index) => {
          const done = index < shown.line;
          const typing = index === shown.line;
          const text =
            line.type === "cmd" && typing ? line.text.slice(0, shown.chars) : line.text;
          // Future lines keep their space but stay hidden.
          const hidden = !done && !(typing && line.type === "cmd");

          return (
            <li
              key={`${index}-${line.text}`}
              className={`whitespace-pre-wrap break-words ${hidden ? "invisible" : ""}`}
            >
              {line.type === "cmd" && <span className="text-primary">$ </span>}
              {line.type === "ok" && <span className="text-primary">✓ </span>}
              <span
                className={line.type === "cmd" ? "text-foreground" : "text-secondary"}
              >
                {text}
              </span>
              {typing && line.type === "cmd" && (
                <span className="ml-px inline-block h-4 w-2 translate-y-0.5 bg-primary" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
