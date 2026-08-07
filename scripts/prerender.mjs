/**
 * Injects the build-time render of App into dist/index.html.
 *
 * Runs after both Vite builds: the client build produces dist/index.html with the
 * hashed asset tags, the SSR build produces the renderable module. The page is
 * fully static, so one render at build time replaces the empty #root that used to
 * ship and removes JS from the critical path for first paint.
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const SERVER_DIR = path.join(DIST, 'server');
const SITE_URL = 'https://teloscode.com';

const FAQ_MARKER =
  '<!-- FAQPage JSON-LD is injected at build time from the same array the page\n         renders, so the structured data cannot drift from the visible copy. -->';

/** Escapes the sequences that would let content break out of a script tag. */
function safeJsonLd(value) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

async function run() {
  const { render, faqs } = await import(
    pathToFileURL(path.resolve(SERVER_DIR, 'entry-server.js')).href
  );

  const templatePath = path.join(DIST, 'index.html');
  const template = await readFile(templatePath, 'utf8');
  const appHtml = render();

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Could not find the empty #root div to prerender into.');
  }
  if (!template.includes(FAQ_MARKER)) {
    throw new Error('Could not find the FAQ JSON-LD marker comment in index.html.');
  }

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(
      FAQ_MARKER,
      `<script type="application/ld+json">\n${safeJsonLd(faqSchema(faqs))}\n    </script>`,
    );

  await writeFile(templatePath, html);

  // The SSR bundle is a build artifact, not something to deploy.
  await rm(SERVER_DIR, { recursive: true, force: true });

  console.log(
    `prerendered ${(appHtml.length / 1024).toFixed(1)} kB into index.html, ` +
      `${faqs.length} FAQs in structured data`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
