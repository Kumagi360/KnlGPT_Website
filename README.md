# KnlGPT Website

Static personal website for Kunal Gupta, built for GitHub Pages.

## Structure

- `index.html` - homepage
- `projects.html` - project card archive
- `blog.html` - blog index
- `til.html` - TIL index
- `assets/js/cards.js` - Gist-backed card archive and detail-page renderer
- `assets/css/` - site styling
- `assets/js/` - shared navigation, homepage interactions, and Atlas map
- `assets/vendor/` - vendored browser libraries
- `assets/data/` - map data
- `assets/images/` - committed local image assets

## Image Replacement

- `assets/images/placeholders/` contains the replaceable non-TIL site images.
- Filenames describe where the image is used, for example `home-hero-portrait.jpg` or `projects-crm-analytics-wide.jpg`.
- Replace an image by overwriting the file and keeping the same filename.
- TIL card and TIL page images intentionally remain remote and are not mirrored into the repo.

## Local Preview

From the repo root:

```sh
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## GitHub Pages

This site is intended to publish from the repository root on the `main` branch.

## Card Content

TIL and Thought card content lives in the public [content Gist](https://gist.github.com/Kumagi360/da7646f9c738a931fec4c48bcf528343), not this repository. It contains a lightweight `manifest.json`, one `til--YYYY-MM.json` file per month, and `thoughts.json`. Publishing a card updates the Gist only, so it needs no website commit or Pages deployment.
