/**
 * Lazy wrapper around PostHog.
 *
 * posthog-js is 244 kB raw / 80 kB gzip — 59% of the bundle, and Lighthouse
 * measured effectively all of it as unused during first paint. Importing it
 * dynamically moves it into its own chunk that loads once the page goes idle,
 * so it never competes with the critical path.
 *
 * No events are lost: a capture() before the chunk arrives triggers the load and
 * fires once it resolves. Import this rather than ./posthog anywhere in the UI.
 */
let clientPromise = null;

function loadClient() {
  if (!clientPromise) {
    // Failing to load analytics must never take the page down with it.
    clientPromise = import('./posthog')
      .then((mod) => mod.default)
      .catch(() => null);
  }
  return clientPromise;
}

export function capture(event, properties) {
  if (typeof window === 'undefined') return;
  loadClient().then((client) => client?.capture(event, properties));
}

/**
 * Warms the chunk on the first sign of engagement, or after a delay if none comes.
 *
 * Parsing posthog costs ~160ms of main-thread time. Loading it on idle put that
 * inside the first-paint window and pushed Total Blocking Time from 50ms to
 * 210ms, so it waits for a real interaction instead. Anyone who scrolls, clicks,
 * or types gets analytics immediately; a motionless visitor triggers the timer.
 */
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
const IDLE_FALLBACK_MS = 6000;

export function startAnalytics() {
  if (typeof window === 'undefined') return;

  let started = false;
  let timer = 0;

  const start = () => {
    if (started) return;
    started = true;
    window.clearTimeout(timer);
    INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, start));
    loadClient();
  };

  INTERACTION_EVENTS.forEach((name) =>
    window.addEventListener(name, start, { once: true, passive: true }),
  );
  timer = window.setTimeout(start, IDLE_FALLBACK_MS);
}
