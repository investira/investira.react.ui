import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        core: resolve(__dirname, "lib/core.js"),
        mui: resolve(__dirname, "lib/mui.js"),
        styles: resolve(__dirname, "lib/styles.js"),
        // lib: resolve(__dirname, "lib/lib.js"),
        // charts: resolve(__dirname, "lib/charts.js"),
        // reports: resolve(__dirname, "lib/reports.js"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    threads: false,
    deps: {
      inline: ["vite-lib"],
    },
  },
});
