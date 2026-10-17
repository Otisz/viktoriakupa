import "./instrument";
import "../css/app.css";

import { createInertiaApp, type ResolvedComponent } from "@inertiajs/react";
import { reactErrorHandler } from "@sentry/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { createRoot } from "react-dom/client";
import { CookieConsentProvider } from "@/components/cookie-consent";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const posthogProjectToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;

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

    if (!posthogProjectToken) {
      root.render(<App {...props} />);

      return;
    }

    posthog.init(posthogProjectToken, {
      api_host: import.meta.env.VITE_POSTHOG_HOST,
      defaults: "2026-05-30",
      opt_out_capturing_by_default: true,
      opt_out_persistence_by_default: true,
      debug: import.meta.env.MODE === "development",
    });

    root.render(
      <PostHogProvider client={posthog}>
        <CookieConsentProvider>
          <App {...props} />
        </CookieConsentProvider>
      </PostHogProvider>,
    );
  },
  progress: {
    color: "#4B5563",
  },
});
