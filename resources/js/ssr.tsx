import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PostHogProvider } from "posthog-js/react";
import ReactDOMServer from "react-dom/server";
import { type Config, type RouteName, type RouteParams, route } from "ziggy-js";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
    setup: ({ App, props }) => {
      const ziggy = page.props.ziggy as Config & { location: string };
      (globalThis as Record<string, unknown>).route = (
        name: RouteName,
        params?: RouteParams<RouteName>,
        absolute?: boolean,
      ) => route(name, params, absolute, { ...ziggy, location: new URL(ziggy.location) });

      return (
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
          options={{
            api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
            defaults: "2025-05-24",
            capture_exceptions: true,
            debug: import.meta.env.MODE === "development",
          }}
        >
          <App {...props} />
        </PostHogProvider>
      );
    },
  }),
);
