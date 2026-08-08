// The slim build halves the analytics chunk (243 kB -> 119 kB raw, 80 kB -> 41 kB
// gzipped). The API surface is identical and autocapture still runs; the heavy
// optional pieces (session replay recorder, surveys UI) are fetched from
// PostHog's CDN only if those features are actually switched on.
import posthog from 'posthog-js/dist/module.slim';

const apiKey = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST;

// posthog-js only works in a browser. The build-time prerender imports this
// module in Node, where the default export has no init(), so every path below
// has to no-op there rather than throw and fail the build.
const isBrowser = typeof window !== 'undefined';

if (isBrowser && (!apiKey || !apiHost) && import.meta.env.DEV) {
  const missingVariable = !apiKey ? 'VITE_POSTHOG_KEY' : 'VITE_POSTHOG_HOST';

  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}

const posthogClient = isBrowser && apiKey && apiHost ? posthog : null;

if (posthogClient) {
  posthogClient.init(apiKey, {
    api_host: apiHost,
    defaults: '2026-05-30',
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  });
}

export default posthogClient;
