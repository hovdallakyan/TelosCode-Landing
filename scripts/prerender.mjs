/**
 * Renders every static route into dist/ at build time.
 *
 * The client build produces dist/index.html with the hashed asset tags; that file
 * is the template for all routes. The SSR build produces the renderable module.
 * Each route gets the same shell with its own <title>, description, canonical,
 * and social tags, so the pages are individually linkable and indexable.
 *
 * Routes are written as directories (dist/privacy/index.html) so hosts serve them
 * at clean paths like /privacy.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = 'dist';
const SERVER_DIR = path.join(DIST, 'server');
const SITE_URL = 'https://teloscode.com';

const FAQ_MARKER =
  '<!-- FAQPage JSON-LD is injected at build time from the same array the page\n         renders, so the structured data cannot drift from the visible copy. -->';

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Escapes the sequences that would let content break out of a script tag. */
const safeJsonLd = (value) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');

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

/**
 * Replaces a tag in the shell, failing loudly if it is missing. A silent no-op
 * here would ship a legal page carrying the landing page's canonical URL.
 */
function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find ${label} in the HTML shell`);
  }
  return html.replace(pattern, replacement);
}

const metaPattern = (attr, name) =>
  new RegExp(`<meta\\s+${attr}="${name}"[\\s\\S]*?/>`);

function applyMeta(html, { title, description, url }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  let out = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`, 'title');
  out = replaceTag(
    out,
    metaPattern('name', 'description'),
    `<meta name="description" content="${safeDescription}" />`,
    'description',
  );
  out = replaceTag(
    out,
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${url}" />`,
    'canonical',
  );
  out = replaceTag(
    out,
    metaPattern('property', 'og:url'),
    `<meta property="og:url" content="${url}" />`,
    'og:url',
  );
  out = replaceTag(
    out,
    metaPattern('property', 'og:title'),
    `<meta property="og:title" content="${safeTitle}" />`,
    'og:title',
  );
  out = replaceTag(
    out,
    metaPattern('property', 'og:description'),
    `<meta property="og:description" content="${safeDescription}" />`,
    'og:description',
  );
  out = replaceTag(
    out,
    metaPattern('name', 'twitter:title'),
    `<meta name="twitter:title" content="${safeTitle}" />`,
    'twitter:title',
  );
  out = replaceTag(
    out,
    metaPattern('name', 'twitter:description'),
    `<meta name="twitter:description" content="${safeDescription}" />`,
    'twitter:description',
  );
  return out;
}

async function run() {
  const { render, faqs, legalDocs, LAST_UPDATED } = await import(
    pathToFileURL(path.resolve(SERVER_DIR, 'entry-server.js')).href
  );

  const templatePath = path.join(DIST, 'index.html');
  const template = await readFile(templatePath, 'utf8');

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('prerender: could not find the empty #root div');
  }
  if (!template.includes(FAQ_MARKER)) {
    throw new Error('prerender: could not find the FAQ JSON-LD marker comment');
  }

  const routes = [
    {
      path: '/',
      out: 'index.html',
      title: 'TelosCode | Custom Software & AI Agents for Service Businesses',
      description:
        'Booking systems, client portals, AI automation, and internal tools for hotels, restaurants, clinics, and professional firms. Fixed pricing. Senior engineers.',
      jsonLd: faqSchema(faqs),
    },
    ...Object.values(legalDocs).map((doc) => ({
      path: `/${doc.slug}`,
      out: path.join(doc.slug, 'index.html'),
      title: `${doc.title} | TelosCode`,
      description: doc.description,
      jsonLd: null,
    })),
  ];

  for (const route of routes) {
    const url = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;

    let html = applyMeta(template, {
      title: route.title,
      description: route.description,
      url,
    });

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${render(route.path)}</div>`,
    );
    html = html.replace(
      FAQ_MARKER,
      route.jsonLd
        ? `<script type="application/ld+json">\n${safeJsonLd(route.jsonLd)}\n    </script>`
        : '',
    );

    const outPath = path.join(DIST, route.out);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html);
    console.log(`prerendered ${route.path} -> ${route.out}`);
  }

  // The SSR bundle is a build artifact, not something to deploy.
  await rm(SERVER_DIR, { recursive: true, force: true });

  console.log(
    `${routes.length} routes, ${faqs.length} FAQs in structured data, legal updated ${LAST_UPDATED}`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
