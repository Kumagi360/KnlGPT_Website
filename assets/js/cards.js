const CONTENT_BASE = "https://gist.githubusercontent.com/Kumagi360/da7646f9c738a931fec4c48bcf528343/raw/";
const CONTENT_CACHE_NAME = "knlgpt-card-content-v1";
const contentCache = new Map();

function contentUrl(path, version) {
  const url = new URL(path, CONTENT_BASE);
  if (version) url.searchParams.set("v", version);
  return url.href;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Unable to load ${url}`);
  return response.json();
}

function readManifest() {
  return fetchJson(contentUrl("manifest.json", Date.now()), { cache: "no-store" });
}

async function fetchCardContent(path, version) {
  const url = contentUrl(path, version);
  if (!version || !("caches" in window)) return fetchJson(url, { cache: version ? "force-cache" : "no-store" });

  let cache;
  try {
    cache = await caches.open(CONTENT_CACHE_NAME);
    const cached = await cache.match(url);
    if (cached) return cached.json();
  } catch {
    cache = undefined;
  }

  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  cache?.put(url, response.clone()).catch(() => {});
  return response.json();
}

function readCardContent(path, version) {
  const key = `${path}?v=${version || ""}`;
  if (!contentCache.has(key)) {
    const request = fetchCardContent(path, version);
    contentCache.set(key, request);
    request.catch(() => contentCache.delete(key));
  }
  return contentCache.get(key);
}

function contentVersion(manifest, path) {
  return manifest.contentVersions?.[path] || "";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function refreshPage() {
  window.initializeSitePage?.();
}

function showLoadError(root) {
  const target = root.isConnected ? root : document.querySelector("[data-card-loading]");
  if (target) target.innerHTML = '<p class="content-load-error">The archive could not load. Please refresh and try again.</p>';
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

function cardDataAttributes(entry, manifest) {
  return `data-card-content-file="${escapeHtml(entry.contentFile)}" data-card-content-version="${escapeHtml(contentVersion(manifest, entry.contentFile))}"`;
}

function renderTilIndex(root, entries, manifest) {
  root.innerHTML = entries
    .filter((entry) => entry.type === "til")
    .map((entry) => `<a class="blog-card" href="til.html?post=${encodeURIComponent(entry.id)}" data-blog-tags="${escapeHtml(entry.tags.join(" "))}" ${cardDataAttributes(entry, manifest)}><span>${escapeHtml(entry.label)}</span><h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.excerpt)}</p></a>`)
    .join("");
}

function renderThoughtIndex(root, entries, manifest) {
  root.innerHTML = entries
    .filter((entry) => entry.type === "thought")
    .map((entry) => `<a class="blog-card lead-card" href="blog.html?post=${encodeURIComponent(entry.id)}" data-blog-tags="${escapeHtml(entry.tags.join(" "))}" ${cardDataAttributes(entry, manifest)}><div class="blog-card-heading"><span>${escapeHtml(entry.category)}</span><h2>${escapeHtml(entry.title)}</h2></div><img src="${escapeHtml(entry.cover.src)}" alt="${escapeHtml(entry.cover.alt)}" /></a>`)
    .join("");
}

function enableCardPrefetch(root) {
  root.querySelectorAll("[data-card-content-file]").forEach((card) => {
    const prefetch = () => readCardContent(card.dataset.cardContentFile, card.dataset.cardContentVersion).catch(() => {});
    card.addEventListener("pointerenter", prefetch, { once: true });
    card.addEventListener("focus", prefetch, { once: true });
  });
}

function prefetchCurrentTil(entries, manifest) {
  if (navigator.connection?.saveData) return;
  const newest = entries.find((entry) => entry.type === "til");
  if (!newest) return;

  const prefetch = () => readCardContent(newest.contentFile, contentVersion(manifest, newest.contentFile)).catch(() => {});
  if ("requestIdleCallback" in window) window.requestIdleCallback(prefetch, { timeout: 1200 });
  else window.setTimeout(prefetch, 400);
}

function renderDetailShell(entry, kind) {
  const backLabel = kind === "til" ? "TIL" : "all thoughts";
  const label = kind === "til" ? entry.label : entry.category;
  const heroClass = kind === "til" ? "post-hero til-gear-hero" : "post-hero simple-post-hero";
  document.body.className = kind === "til" ? "blog-post-page til-post-page" : "blog-post-page";
  document.title = `${entry.title} | ${kind === "til" ? "TIL" : "Thoughts"} | Kunal Gupta`;
  document.querySelector("main").innerHTML = `<a class="back-link" href="${kind === "til" ? "til.html" : "blog.html"}">&larr; Back to ${backLabel}</a><article class="post-page"><header class="${heroClass}"><span>${escapeHtml(label)}</span><h1>${escapeHtml(entry.title)}</h1></header><p class="content-loading" data-card-loading>Loading card&hellip;</p></article>`;
}

async function renderDetail(entry, kind, version) {
  const content = await readCardContent(entry.contentFile, version);
  const item = content.entries.find((candidate) => candidate.id === entry.id);
  if (!item) throw new Error(`Missing content for ${entry.id}`);

  setPageCss(item.pageCss);
  document.body.className = item.pageClass || `${kind}-post-page`;
  document.title = `${item.title || entry.title} | ${kind === "til" ? "TIL" : "Thoughts"} | Kunal Gupta`;
  const backLabel = kind === "til" ? "TIL" : "all thoughts";
  document.querySelector("main").innerHTML = `<a class="back-link" href="${kind === "til" ? "til.html" : "blog.html"}">&larr; Back to ${backLabel}</a><article class="post-page">${normalizeArticleHtml(item.articleHtml)}</article>`;
}

async function initializeCards(kind) {
  const root = document.querySelector("[data-card-root]");
  if (!root) return;
  setPageCss();
  try {
    const manifest = await readManifest();
    const post = new URLSearchParams(window.location.search).get("post");
    const entry = manifest.entries.find((candidate) => candidate.id === post && candidate.type === kind);
    if (post && entry) {
      renderDetailShell(entry, kind);
      await renderDetail(entry, kind, contentVersion(manifest, entry.contentFile));
    } else if (kind === "til") {
      renderTilIndex(root, manifest.entries, manifest);
      enableCardPrefetch(root);
      prefetchCurrentTil(manifest.entries, manifest);
    } else {
      renderThoughtIndex(root, manifest.entries, manifest);
      enableCardPrefetch(root);
    }
    refreshPage();
  } catch (error) {
    console.error(error);
    showLoadError(root);
  }
}

window.initializeCards = initializeCards;
