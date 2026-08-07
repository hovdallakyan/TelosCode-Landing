import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { faqs } from './App';

/**
 * Renders the page to static HTML at build time. Every effect (reveal observer,
 * tagline scroll, menu state) runs only on the client, so this produces the same
 * markup the client renders on its first pass and hydration matches cleanly.
 */
export function render() {
  return renderToString(<App />);
}
