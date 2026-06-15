import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    styles: "src/styles.css",
  },
  format: ["esm", "cjs"],
  dts: { entry: "src/index.ts" },
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom"],
  // Components use hooks/state, so mark the JS bundles as client modules
  // for React Server Component consumers (e.g. Next.js App Router).
  banner: { js: '"use client";' },
});
