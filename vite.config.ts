import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ResumeSchema } from "./src/schema";

const RESUME_PATH = fileURLToPath(
  new URL("./src/assets/resume.json", import.meta.url)
);
const VIRTUAL_ID = "virtual:resume";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

/**
 * Exposes `virtual:resume`: resume.json validated and transformed against
 * ResumeSchema at build time. Invalid data fails `pnpm build` (and shows the
 * error overlay in dev) instead of rendering a blank page, and zod stays out
 * of the client bundle.
 */
function resume(): Plugin {
  return {
    name: "resume",
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      this.addWatchFile(RESUME_PATH);

      let json: unknown;
      try {
        json = JSON.parse(readFileSync(RESUME_PATH, "utf8"));
      } catch (e) {
        this.error(`resume.json is not valid JSON: ${(e as Error).message}`);
      }

      const result = ResumeSchema.safeParse(json);
      if (!result.success) {
        const issues = result.error.issues
          .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
          .join("\n");
        this.error(`resume.json failed validation:\n${issues}`);
      }

      return `export default ${JSON.stringify(result.data)};`;
    },
    hotUpdate({ file, server }) {
      if (file !== RESUME_PATH) return;
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) server.moduleGraph.invalidateModule(mod);
      server.ws.send({ type: "full-reload" });
      return [];
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), resume()],
});
