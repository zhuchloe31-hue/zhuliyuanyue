import vinext from "vinext";
import { defineConfig } from "vite";
import { cdnAdapter } from "@vinext/cloudflare/cache/cdn-adapter";
import { cloudflare } from "@cloudflare/vite-plugin";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig(() => {
  return {
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext({
        cache: { cdn: cdnAdapter() },
      }),
      cloudflare({
        viteEnvironment: {
          name: "rsc",
          childEnvironments: ["ssr"],
        },
      }),
    ],
  };
});
