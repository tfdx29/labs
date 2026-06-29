import dotenv from "dotenv";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? undefined : ".env.development",
});

const target = process.env.VITE_SERVER_URL!;

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target,
        changeOrigin: true,
      },
      "/rpc": {
        target,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "labs",
        short_name: "labs",
        description: "labs - PWA Application",
        theme_color: "#0c0c0c",
      },
      pwaAssets: { disabled: false, config: true },
      devOptions: { enabled: true },
    }),
  ],
});
