import inertia from "@inertiajs/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

const uploadsSourceMaps = Boolean(process.env.SENTRY_AUTH_TOKEN);

export default defineConfig({
  build: {
    sourcemap: uploadsSourceMaps ? "hidden" : false,
  },
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      ssr: "resources/js/ssr.tsx",
      refresh: true,
    }),
    inertia(),
    react(),
    tailwindcss(),
    sentryVitePlugin({
      org: "the-base-0v",
      project: "viktoriakupa-react",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: { name: process.env.SENTRY_RELEASE },
      sourcemaps: {
        filesToDeleteAfterUpload: ["public/build/**/*.map", "bootstrap/ssr/**/*.map"],
      },
      disable: !uploadsSourceMaps,
      telemetry: false,
    }),
  ],
  server: {
    allowedHosts: ["bun"],
    hmr: {
      host: "localhost",
    },
    watch: {
      usePolling: true,
    },
  },
});
