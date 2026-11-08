import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

const PLACEHOLDER = '"__THEME_CSS__"';

/**
 * Moves the emitted CSS into the JS bundle, replacing the placeholder in
 * src/theme.tsx, so lib/index.js is a single self-contained module.
 */
function inlineCss(): Plugin {
  return {
    name: "inline-theme-css",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const assets = Object.values(bundle).filter(
        (f) => f.type === "asset" && f.fileName.endsWith(".css")
      );
      if (assets.length === 0) this.error("No CSS was emitted for the theme");

      const css = assets
        .map((a) => (a.type === "asset" ? String(a.source) : ""))
        .join("\n");
      for (const a of assets) delete bundle[a.fileName];

      let replaced = false;
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === "chunk" && chunk.code.includes(PLACEHOLDER)) {
          chunk.code = chunk.code.replaceAll(PLACEHOLDER, JSON.stringify(css));
          replaced = true;
        }
      }
      if (!replaced) this.error(`CSS placeholder ${PLACEHOLDER} not found`);
    },
  };
}

// Builds the JSON Resume theme (src/theme.tsx) to lib/index.js.
export default defineConfig({
  plugins: [react(), inlineCss()],
  publicDir: false,
  build: {
    ssr: "src/theme.tsx",
    outDir: "lib",
    emptyOutDir: true,
    ssrEmitAssets: true,
    cssCodeSplit: false,
    assetsInlineLimit: () => true, // inline the woff2 fonts into the CSS
    rollupOptions: { output: { entryFileNames: "index.js" } },
  },
});
