/**
 * Renders public/og-image.jpg, the 1200x630 card used by og:image / twitter:image.
 *
 * Drawn from the same tokens as the site (black field, teal accent, TELOS/CODE
 * wordmark) so a shared link reads as the same brand as the page it opens.
 *
 * Run with `npm run og` after changing the wordmark or the headline.
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.78" cy="0.18" r="0.75">
      <stop offset="0" stop-color="#0d9488" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="#134e4a" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.08" cy="0.92" r="0.6">
      <stop offset="0" stop-color="#5eead4" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#000000"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- wordmark -->
  <g transform="translate(80, 96)">
    <text x="0" y="0" fill="#f4f7f6" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
          font-size="26" font-weight="600" letter-spacing="3.6">TELOS</text>
    <path d="M104 -20 L112 2" stroke="#5eead4" stroke-width="2.4" stroke-linecap="round"/>
    <text x="124" y="0" fill="#f4f7f6" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
          font-size="26" font-weight="600" letter-spacing="3.6">CODE</text>
  </g>

  <!-- headline -->
  <text x="80" y="270" fill="#f4f7f6" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="62" font-weight="700" letter-spacing="-1.6">Custom software and AI</text>
  <text x="80" y="344" fill="#f4f7f6" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="62" font-weight="700" letter-spacing="-1.6">agents for service</text>
  <text x="80" y="418" fill="#5eead4" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="62" font-weight="700" letter-spacing="-1.6">businesses.</text>

  <!-- rule -->
  <rect x="80" y="486" width="1040" height="1" fill="#313131"/>

  <!-- trust row -->
  <text x="80" y="536" fill="#9eb0ab" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="21" font-weight="500">Fixed pricing &#183; Senior engineers &#183; 30 day guarantee</text>
  <text x="1120" y="536" text-anchor="end" fill="#9eb0ab"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="21" font-weight="500" letter-spacing="1.2">teloscode.com</text>
</svg>`;

async function run() {
  await mkdir('public', { recursive: true });
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile('public/og-image.jpg');
  console.log('wrote public/og-image.jpg (1200x630)');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
