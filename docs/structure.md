# Site Structure

This is a static site with no build step. Keep root entry pages at the project root so `index.html` can be opened directly in a browser.

## Root

- `index.html`: home entry point
- `projects.html`: projects index
- `blog.html`: blog index
- `til.html`: TIL index

## Content Pages

- `blog/<post-heading-slug>.html`: long-form blog detail pages, named from the visible blog card heading
- `til/YYYY-MM-DD-<gear>-gear.html`: dated TIL detail pages

## Assets

- `assets/css/`: stylesheets
- `assets/js/`: local application scripts
- `assets/vendor/`: vendored third-party browser scripts
- `assets/data/`: local data payloads
- `assets/images/`: committed owned/local image assets
- `assets/images/placeholders/`: replaceable non-TIL image slots, named by page and placement

## Content Manifests

- `content/blog/posts.json`: blog metadata and paths
- `content/til/posts.json`: TIL metadata and paths

The manifests are intentionally simple JSON so future automation can generate indexes later without changing URLs.

TIL images are intentionally remote-only. Do not mirror newsletter/article card images into committed assets unless ownership changes.
