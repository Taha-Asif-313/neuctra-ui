"use client";

import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { useLoopingStages } from "./useLoopingStages";

const SIZE = 480;
const CENTER = SIZE / 2;
const MAX_RADIUS = 230;
// Farthest a node centre may sit from the middle on either axis, so the node
// itself stays inside the diagram at any item count.
const MAX_AXIS_REACH = 190;
const START_ANGLE = -135;
const CURVE_NEAR_HUB = 90;
const CURVE_NEAR_NODE = 83;

const toRadians = (degrees) => (degrees * Math.PI) / 180;

// Rounded so the server and every browser engine produce identical markup.
const round = (value) => Number(value.toFixed(2));

const offset = (x, y, degrees, distance) => [
  round(x + Math.cos(toRadians(degrees)) * distance),
  round(y + Math.sin(toRadians(degrees)) * distance),
];

/** Spaces the nodes evenly and curves each spoke the same way round the hub. */
function buildSpokes(count) {
  const angles = Array.from(
    { length: count },
    (_, index) => START_ANGLE + (index * 360) / count,
  );
  const widestAxis = Math.max(
    ...angles.flatMap((angle) => [
      Math.abs(Math.cos(toRadians(angle))),
      Math.abs(Math.sin(toRadians(angle))),
    ]),
  );
  const radius = Math.min(MAX_RADIUS, MAX_AXIS_REACH / widestAxis);

  return angles.map((angle) => {
    const [x, y] = offset(CENTER, CENTER, angle, radius);
    const [c1x, c1y] = offset(CENTER, CENTER, angle + 45, CURVE_NEAR_HUB);
    const [c2x, c2y] = offset(x, y, angle + 135, CURVE_NEAR_NODE);

    return {
      path: `M${CENTER} ${CENTER} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x} ${y}`,
      position: {
        left: `${round((x / SIZE) * 100)}%`,
        top: `${round((y / SIZE) * 100)}%`,
      },
    };
  });
}

/**
 * Hub with one node per item and a list beside it. Cycles until the visitor
 * picks an item. Works best with 3 to 6 items.
 *
 * items:  [{ icon, title, subtitle, description }]
 * center: what sits in the hub, usually an <img> that fills its parent
 * intro:  optional text above the list
 */
export default function HubDiagram({
  items,
  center,
  intro,
  cycleMs = 4200,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const { stage: active, select } = useLoopingStages({
    count: items.length,
    durationMs: cycleMs,
    inView,
    stopOnSelect: true,
  });
  const spokes = useMemo(() => buildSpokes(items.length), [items.length]);

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16"
    >
      <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          <circle
            className="nx-orbit"
            cx={CENTER}
            cy={CENTER}
            r="222"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
          <circle cx={CENTER} cy={CENTER} r="120" stroke="var(--border)" />
          {spokes.map((spoke, index) => (
            <g key={spoke.path}>
              <path
                d={spoke.path}
                stroke={index === active ? "var(--primary)" : "var(--border)"}
                strokeOpacity={index === active ? 0.35 : 1}
                strokeWidth="1.5"
                className="transition-all duration-500"
              />
              {index === active && (
                <path
                  key={active}
                  d={spoke.path}
                  pathLength={1}
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="nx-comet"
                />
              )}
            </g>
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-28 sm:w-28">
          <span className="nx-pulse absolute inset-0 rounded-full border border-primary/50" />
          {center}
        </div>

        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === active;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => select(index)}
              aria-label={`Show ${item.title}`}
              aria-pressed={isActive}
              style={spokes[index].position}
              className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border bg-card transition-all duration-300 sm:h-16 sm:w-16 ${
                isActive
                  ? "scale-110 border-primary text-primary shadow-[0_0_40px_-8px] shadow-primary/60"
                  : "border-border text-secondary hover:border-primary/50"
              }`}
            >
              <Icon className="h-6 w-6" />
            </button>
          );
        })}
      </div>

      <div>
        {intro && (
          <p className="mb-6 text-base text-secondary sm:text-lg">{intro}</p>
        )}
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => {
            const isActive = index === active;

            return (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-expanded={isActive}
                  className={`w-full rounded-2xl border p-5 text-left transition-colors duration-300 ${
                    isActive
                      ? "border-primary/40 bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {item.title}
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      {item.subtitle}
                    </span>
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-3 text-sm text-secondary">
                        {item.description}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
