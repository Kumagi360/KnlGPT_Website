# Site Structure

This is a static site with no build step. Keep root entry pages at the project root so `index.html` can be opened directly in a browser.

## Root

- `index.html`: home entry point
- `projects.html`: projects index
- `blog.html`: blog index
- `til.html`: TIL index

## Assets

- `assets/css/`: stylesheets
- `assets/js/header.js`: shared header and persistent same-origin page navigation
- `assets/js/`: remaining local application scripts
- `assets/vendor/`: vendored third-party browser scripts
- `assets/data/`: local data payloads
- `assets/images/`: committed owned/local image assets
- `assets/images/placeholders/`: replaceable non-TIL image slots, named by page and placement

## Content Automation

TIL and Thought content lives in the public content Gist. `manifest.json` contains archive-card metadata and a `contentFile` for every entry. Full TIL bodies live in monthly `til--YYYY-MM.json` files; full Thought bodies live in `thoughts.json`. Add a card's full record and its manifest entry in the same Gist revision. On a month boundary, add the new monthly file there too. `pageCss` is optional content metadata for a card's page-specific styles.

The root `til.html` and `blog.html` pages use `assets/js/cards.js` to render archive and detail views. New cards update the Gist only, never this website repository.

TIL images are intentionally remote-only. Do not mirror newsletter/article card images into committed assets unless ownership changes.
