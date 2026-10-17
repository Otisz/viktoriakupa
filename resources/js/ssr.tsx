import { createInertiaApp, type ResolvedComponent } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PostHogProvider } from "posthog-js/react";
import ReactDOMServer from "react-dom/server";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
      resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob<ResolvedComponent>("./pages/**/*.tsx", { import: "default" }),
      ),
    setup: ({ App, props }) => {
      return (
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
          options={{
            api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
            defaults: "2025-05-24",
            debug: import.meta.env.MODE === "development",
          }}
        >
          <App {...props} />
        </PostHogProvider>
      );
    },
  }),
);
