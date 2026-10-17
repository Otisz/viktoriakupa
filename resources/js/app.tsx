import "./instrument";
import "../css/app.css";

import { createInertiaApp, type ResolvedComponent } from "@inertiajs/react";
import { reactErrorHandler } from "@sentry/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PostHogProvider } from "posthog-js/react";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob<ResolvedComponent>("./pages/**/*.tsx", { import: "default" }),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el, {
      onUncaughtError: reactErrorHandler(),
      onCaughtError: reactErrorHandler(),
      onRecoverableError: reactErrorHandler(),
    });

    root.render(
      <PostHogProvider
        apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN}
        options={{
          api_host: import.meta.env.VITE_POSTHOG_HOST,
          defaults: "2026-05-30",
          debug: import.meta.env.MODE === "development",
        }}
      >
        <App {...props} />
      </PostHogProvider>,
    );
  },
  progress: {
    color: "#4B5563",
  },
});
