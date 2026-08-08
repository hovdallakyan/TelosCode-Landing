import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from './App';

export { faqs } from './App';
export { legalDocs, LAST_UPDATED } from './legal';

/**
 * Renders one route to static HTML at build time. Every effect (reveal observer,
 * tagline scroll, menu state) runs only on the client, so this produces the same
 * markup the client renders on its first pass and hydration matches cleanly.
 */
export function render(path = '/') {
  return renderToString(<Root path={path} />);
}
