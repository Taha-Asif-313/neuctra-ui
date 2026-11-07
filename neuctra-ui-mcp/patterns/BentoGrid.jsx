"use client";

import { motion } from "framer-motion";

// Spans on the 6-column desktop grid. Mix sizes; never use one size for all.
const SIZES = {
  hero: "lg:col-span-4 lg:row-span-2",
  tall: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-4",
  half: "lg:col-span-3",
  small: "lg:col-span-2",
};

// Each tile enters from the side it sits on, so the grid assembles inwards
// instead of every tile fading up the same way.
const FROM = {
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  below: { x: 0, y: 28 },
};

/**
 * An uneven grid of feature tiles, each holding a small live scene instead of
 * an icon. Tiles assemble inwards when seen. Scenes can react to hover with
 * Tailwind group-hover classes, because every tile is a group.
 *
 * heading: node shown above
 * tiles:   [{ id, size, from, title, desc, Scene }]
 *          size: hero | tall | wide | half | small
 *          from: left | right | below, the side the tile sits on
 *          Scene: a component; loop it with nx- CSS classes so the pause
 *          button stops it, and keep it under 7 seconds
 */
export default function BentoGrid({ heading, tiles }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      {heading}
      <div className="mt-12 grid auto-rows-[minmax(15rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {tiles.map((tile, index) => {
          const Scene = tile.Scene;
          const from = FROM[tile.from] ?? FROM.below;
          return (
            <motion.article
              key={tile.id}
              data-reveal
              initial={{ opacity: 0, ...from }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: index * 0.06 }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 hover:border-primary/60 ${
                SIZES[tile.size] ?? SIZES.small
              }`}
            >
              <div aria-hidden="true" inert className="relative min-h-36 flex-1">
                <Scene />
              </div>
              <div className="border-t border-border p-5">
                <h3 className="text-base font-semibold text-foreground">{tile.title}</h3>
                <p className="mt-1 text-sm leading-6 text-secondary">{tile.desc}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
