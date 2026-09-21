# Homepage Hero Thoughts Statistic Template

Restore this cell after the Thoughts page has at least one published entry. Insert the markup after the Projects cell inside `.portrait-ledger` in `index.html`:

```html
<div>
  <strong id="stat-thoughts">00</strong>
  <span>Thoughts</span>
</div>
```

Restore this block at the end of `updateArchiveStats()` in `assets/js/main.js`:

```js
const thoughtsStat = document.querySelector("#stat-thoughts");
if (!thoughtsStat) return;

try {
  const response = await fetch("https://gist.githubusercontent.com/Kumagi360/da7646f9c738a931fec4c48bcf528343/raw/manifest.json", { cache: "no-store" });
  if (!response.ok) return;
  const manifest = await response.json();
  const count = manifest.entries.filter((entry) => entry.type === "thought").length;
  thoughtsStat.textContent = String(count).padStart(2, "0");
} catch {
  // The static count remains visible if the content manifest cannot be loaded.
}
```
