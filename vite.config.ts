import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" is required so the build works inside Electron (file://) and Capacitor.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", chunkSizeWarningLimit: 900 },
});
