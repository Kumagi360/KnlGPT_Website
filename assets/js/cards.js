const CONTENT_BASE = "https://gist.githubusercontent.com/Kumagi360/da7646f9c738a931fec4c48bcf528343/raw/";
const contentCache = new Map();

function contentUrl(path) {
  return new URL(path, CONTENT_BASE).href;
}

async function readContent(path) {
  if (!contentCache.has(path)) {
    contentCache.set(path, fetch(contentUrl(path), { cache: "no-store" }).then((response) => {
      if (!response.ok) throw new Error(`Unable to load ${path}`);
      return response.json();
    }));
  }
  return contentCache.get(path);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function refreshPage() {
  window.initializeSitePage?.();
}

function showLoadError(root) {
  root.innerHTML = '<p class="content-load-error">The archive could not load. Please refresh and try again.</p>';
}

function setPageCss(css) {
  document.querySelector("[data-card-page-css]")?.remove();
  if (!css) return;

  const style = document.createElement("style");
  style.dataset.cardPageCss = "";
  style.textContent = css;
  document.head.append(style);
}

function normalizeArticleHtml(html) {
  return html.replaceAll('"../assets/', '"assets/');
}

function renderTilIndex(root, entries) {
  root.innerHTML = entries
    .filter((entry) => entry.type === "til")
    .map((entry) => `<a class="blog-card" href="til.html?post=${encodeURIComponent(entry.id)}" data-blog-tags="${escapeHtml(entry.tags.join(" "))}"><span>${escapeHtml(entry.label)}</span><h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.excerpt)}</p></a>`)
    .join("");
}

function renderThoughtIndex(root, entries) {
  root.innerHTML = entries
    .filter((entry) => entry.type === "thought")
    .map((entry) => `<a class="blog-card lead-card" href="blog.html?post=${encodeURIComponent(entry.id)}" data-blog-tags="${escapeHtml(entry.tags.join(" "))}"><div class="blog-card-heading"><span>${escapeHtml(entry.category)}</span><h2>${escapeHtml(entry.title)}</h2></div><img src="${escapeHtml(entry.cover.src)}" alt="${escapeHtml(entry.cover.alt)}" /></a>`)
    .join("");
}

async function renderDetail(entry, kind) {
  const content = await readContent(entry.contentFile);
  const item = content.entries.find((candidate) => candidate.id === entry.id);
  if (!item) throw new Error(`Missing content for ${entry.id}`);

  setPageCss(item.pageCss);
  document.body.className = item.pageClass || `${kind}-post-page`;
  document.title = `${item.title} | ${kind === "til" ? "TIL" : "Thoughts"} | Kunal Gupta`;
  const backLabel = kind === "til" ? "TIL" : "all thoughts";
  document.querySelector("main").innerHTML = `<a class="back-link" href="${kind === "til" ? "til.html" : "blog.html"}">&larr; Back to ${backLabel}</a><article class="post-page">${normalizeArticleHtml(item.articleHtml)}</article>`;
}

async function initializeCards(kind) {
  const root = document.querySelector("[data-card-root]");
  if (!root) return;
  setPageCss();
  try {
    const manifest = await readContent("manifest.json");
    const post = new URLSearchParams(window.location.search).get("post");
    const entry = manifest.entries.find((candidate) => candidate.id === post && candidate.type === kind);
    if (post && entry) await renderDetail(entry, kind);
    else if (kind === "til") renderTilIndex(root, manifest.entries);
    else renderThoughtIndex(root, manifest.entries);
    refreshPage();
  } catch (error) {
    console.error(error);
    showLoadError(root);
  }
}

window.initializeCards = initializeCards;
