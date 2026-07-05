# KnlGPT Website

Static personal website for Kunal Gupta, built for GitHub Pages.

## Structure

- `index.html` - homepage
- `projects.html` - project card archive
- `blog.html` - blog index
- `blog-*.html` - individual blog post templates
- `styles.css` - site styling
- `site.js` - shared navigation/page interactions
- `main.js` - homepage interactions and Atlas map
- `assets/` - map data and local visual/runtime assets

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
