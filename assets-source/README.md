# Image sources

Full-size originals live here. They are **not** shipped to the browser.

`npm run images` reads this directory and writes the web-ready AVIF + JPEG pairs
into `src/assets/team/`, which is what `App.jsx` imports.

## Replacing a photo

Put the new original **here**, then run `npm run images`.

Do not edit `src/assets/team/` by hand. Everything in that directory is generated
and will be overwritten the next time the script runs — a photo dropped there
without updating the original in this directory silently reverts.

If the script reports a different pixel size for a photo, update the matching
`width`/`height` in the `team` array in `src/App.jsx` so the markup keeps
reserving the right space.
