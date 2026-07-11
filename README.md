# KnlGPT Website

Static personal website for Kunal Gupta, built for GitHub Pages.

## Structure

- `index.html` - homepage
- `projects.html` - project card archive
- `blog.html` - blog index
- `til.html` - TIL index
- `blog/` - individual blog post pages
- `til/` - dated TIL pages
- `content/` - JSON metadata for future content automation
- `assets/css/` - site styling
- `assets/js/` - shared navigation, homepage interactions, and Atlas map
- `assets/vendor/` - vendored browser libraries
- `assets/data/` - map data
- `assets/images/` - committed local image assets

## Image Replacement

- `assets/images/placeholders/` contains the replaceable non-TIL site images.
- Filenames describe where the image is used, for example `home-project-map-rover.jpg` or `projects-crm-analytics-wide.jpg`.
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
