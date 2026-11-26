"""Refresh the static TIL preview from a local copy of the public manifest."""

import argparse
from html import escape
import json
from pathlib import Path
import re
from urllib.parse import quote


def til_preview(manifest, html):
    entries = [entry for entry in manifest["entries"] if entry["type"] == "til"][:12]
    if not entries:
        raise ValueError("The TIL manifest has no entries")
    cards = "\n".join(
        f'  <a class="blog-card" href="til.html?post={quote(entry["id"], safe="")}">'
        f'<span>{escape(entry["label"])}</span><h2>{escape(entry["title"])}</h2>'
        f'<p>{escape(entry["excerpt"])}</p></a>'
        for entry in entries
    )
    return re.sub(r"(<!-- til-preview:start -->\n).*?(\n?<!-- til-preview:end -->)",
                  lambda match: match[1] + cards + "\n" + match[2].lstrip("\n"), html, flags=re.S)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    args = parser.parse_args()
    page = Path(__file__).resolve().parents[1] / "til.html"
    page.write_text(til_preview(json.loads(args.manifest.read_text()), page.read_text()))
