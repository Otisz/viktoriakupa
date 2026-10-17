import inertia from "@inertiajs/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = { ...loadEnv(mode, process.cwd(), "SENTRY_"), ...process.env };
  const uploadsToSentry = Boolean(env.SENTRY_AUTH_TOKEN) && !isSsrBuild;

  return {
    build: {
      sourcemap: uploadsToSentry ? "hidden" : false,
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
        project: ["viktoriakupa-react", "viktoriakupa-laravel"],
        authToken: env.SENTRY_AUTH_TOKEN,
        release: {
          name: env.SENTRY_RELEASE,
          setCommits: { auto: true, ignoreMissing: true },
          deploy: { env: "production" },
        },
        sourcemaps: {
          filesToDeleteAfterUpload: ["public/build/**/*.map"],
        },
        disable: !uploadsToSentry,
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
  };
});
