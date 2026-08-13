import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      outDir: "dist/types",
      insertTypesEntry: true,
    }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NeuctraUi",
      // `.cjs` (not `.cjs.js`) — package.json sets "type": "module", so Node
      // parses every `.js` here as ESM and would choke on the CommonJS build.
      fileName: (format) => (format === "es" ? "index.es.js" : "index.cjs"),
      formats: ["es", "cjs"],
      // Emit dist/style.css. Without this, a function `fileName` makes Vite
      // fall back to the sanitized package name (dist/ui.css).
      cssFileName: "style",
    },

    rollupOptions: {
      // Declared runtime dependencies stay external so consumers get a single
      // deduped copy. framer-motion is intentionally NOT here — it is a
      // devDependency and is bundled, so consumers don't have to install it.
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^lucide-react($|\/)/,
        "clsx",
        "tailwind-merge",
      ],
      output: {
        // Rollup drops module-level directives when concatenating into one
        // chunk. Every export in the entry is a client component, so re-add it
        // at the top of the bundle for the Next.js App Router.
        banner: '"use client";',
      },
    },

    sourcemap: true,
    emptyOutDir: true,
  },
});
