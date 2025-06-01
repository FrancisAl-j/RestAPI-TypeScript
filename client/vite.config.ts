import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Below syntax are all necessary for SSR
  build: {
    ssr: true,
    rollupOptions: {
      input: "./server/Profile.ts",
    },
  },
  ssr: {
    noExternal: ["react", "react-dom"],
  },
});
