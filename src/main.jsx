import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Root from './App';
import { startAnalytics } from './analytics';
import './fonts.css';
import './styles.css';

const container = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <Root path={window.location.pathname} />
  </React.StrictMode>
);

// Production builds are prerendered, so attach to the existing markup instead of
// throwing it away. Falls back to a fresh render in dev, where #root is empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}

// Deferred so the analytics chunk never competes with first paint.
startAnalytics();
