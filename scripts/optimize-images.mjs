/**
 * Generates the web-ready team photos from the full-size originals.
 *
 * Originals live in assets-source/team/ and are never shipped. Output lands in
 * src/assets/team/ as AVIF plus a JPEG fallback, sized for the largest slot the
 * avatar can occupy: 306x360 CSS px at 2x DPR.
 *
 * Run with `npm run images` after adding or replacing a photo.
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'assets-source/team';
const OUT_DIR = 'src/assets/team';

// .team-avatar renders at most 306x360 CSS px (aspect-ratio 0.85, max-height 360px).
const TARGET = { width: 612, height: 720 };

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const file of files) {
    const slug = path.parse(file).name;
    const input = path.join(SOURCE_DIR, file);

    // `outside` scales the image to cover the target box without cropping, so the
    // object-position framing tuned in CSS is preserved.
    const base = sharp(input).resize(TARGET.width, TARGET.height, {
      fit: 'outside',
      withoutEnlargement: true,
    });

    const { width, height } = await base
      .clone()
      .avif({ quality: 58 })
      .toFile(path.join(OUT_DIR, `${slug}.avif`));

    await base
      .clone()
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(path.join(OUT_DIR, `${slug}.jpg`));

    // Printed so the width/height in the App team array can be kept in sync.
    console.log(`${slug}: ${width}x${height}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
