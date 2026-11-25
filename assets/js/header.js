(() => {
  const script = document.currentScript;
  if (!script) return;

  const siteRoot = new URL("../../", script.src);
  const href = (path) => new URL(path, siteRoot).href;
  const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = href("assets/images/kg-mark.svg?v=20261123-dark-palette");
  if (!favicon.isConnected) document.head.append(favicon);
  const template = document.createElement("template");
  const pageCache = new Map();
  const loadedScripts = new Set([...document.scripts].map((item) => item.src).filter(Boolean));
  const pageKey = ({ pathname, search }) => `${pathname === "/" ? "/index.html" : pathname}${search}`;
  let currentPageKey = pageKey(window.location);
  let navigationController;

  document.head.querySelectorAll("style").forEach((item) => {
    item.dataset.pageStyle = "";
  });

  template.innerHTML = `
    <header class="site-header">
      <a class="brand-mark" href="${href("index.html#top")}" aria-label="Kunal Gupta home">
        <svg class="brand-cell" viewBox="0 0 80 80" aria-hidden="true">
          <rect class="brand-mark-outline" x="1" y="1" width="78" height="78" stroke-width="2"/>
          <g class="brand-wordmark" text-anchor="middle">
            <text x="40" y="34"><tspan class="brand-mark-signal">K</tspan><tspan class="brand-mark-ink">U</tspan><tspan class="brand-mark-signal">N</tspan><tspan class="brand-mark-ink">A</tspan><tspan class="brand-mark-signal">L</tspan></text>
            <text x="40" y="56.5"><tspan class="brand-mark-signal">G</tspan><tspan class="brand-mark-ink">U</tspan><tspan class="brand-mark-signal" dx="0.5">P</tspan><tspan class="brand-mark-signal">T</tspan><tspan class="brand-mark-ink" dx="-0.5">A</tspan></text>
          </g>
        </svg>
      </a>
      <div class="header-controls">
        <nav class="primary-nav global-nav" aria-label="Primary navigation">
          <a href="${href("index.html#top")}" data-nav="home">Home</a>
          <a href="${href("projects.html")}" data-nav="projects">Projects</a>
          <a href="${href("blog.html")}" data-nav="blog">Thoughts</a>
          <a href="${href("til.html")}" data-nav="til">TIL</a>
        </nav>
        <button class="theme-toggle" type="button" role="switch" aria-checked="false" aria-label="Switch to dark mode">
          <span class="theme-toggle-track" aria-hidden="true"></span>
          <svg class="theme-toggle-icon theme-toggle-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.28 5.28l1.42 1.42M17.3 17.3l1.42 1.42M18.72 5.28 17.3 6.7M6.7 17.3l-1.42 1.42"/></svg>
          <svg class="theme-toggle-icon theme-toggle-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.1A8.7 8.7 0 0 1 8.9 3.5a8.7 8.7 0 1 0 11.6 11.6Z"/></svg>
          <span class="visually-hidden">Toggle color theme</span>
        </button>
      </div>
    </header>
  `;

  const header = template.content.querySelector(".site-header");
  const scrollMeter = document.createElement("div");
  scrollMeter.className = "scroll-meter";
  scrollMeter.setAttribute("aria-hidden", "true");

  function updateScrollMeter() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    scrollMeter.style.width = `${progress * 100}%`;
  }

  window.addEventListener("scroll", updateScrollMeter, { passive: true });
  window.addEventListener("resize", updateScrollMeter);

  let lastScrollY = window.scrollY;
  function updateHeaderVisibility() {
    const scrollY = window.scrollY;
    const shouldShow = scrollY < 96 || scrollY < lastScrollY;

    if (shouldShow || header.querySelector(":focus-visible")) {
      header.classList.remove("is-controls-hidden");
    } else if (scrollY > lastScrollY) {
      header.classList.add("is-controls-hidden");
    }

    lastScrollY = scrollY;
  }

  window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
  header.addEventListener("focusin", (event) => {
    if (event.target.matches(":focus-visible")) {
      header.classList.remove("is-controls-hidden");
    }
  });

  function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    let active = "";

    if (path === "index.html") active = "home";
    if (path === "projects.html" || document.body.classList.contains("projects-page")) active = "projects";
    if (path === "blog.html" || document.body.classList.contains("blog-post-page")) active = "blog";
    if (path === "til.html" || document.body.classList.contains("til-index-page") || document.body.classList.contains("til-post-page")) active = "til";

    header.querySelectorAll("[data-nav]").forEach((link) => {
      const isCurrent = link.dataset.nav === active;
      link.classList.toggle("is-current", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function setTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    const toggle = header.querySelector(".theme-toggle");
    toggle.setAttribute("aria-checked", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Theme selection remains available when storage is unavailable.
    }
  }

  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    // Dark mode is the site's default when storage is unavailable.
  }
  setTheme(savedTheme);

  header.querySelector(".theme-toggle").addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  function socialLinks() {
    return `
      <nav class="social-links" aria-label="Social profiles">
        <a href="https://www.linkedin.com/in/kunalgupta360/" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9.5h3ZM6.5 8.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3h.1a3.1 3.1 0 0 1 2.8-1.5c3 0 3.5 2 3.5 4.5Z"/></svg>
        </a>
        <a href="https://github.com/Kumagi360" aria-label="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.61-3.37-1.19-3.37-1.19-.46-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.83c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.76c0 .26.18.57.69.47A10 10 0 0 0 12 2Z"/></svg>
        </a>
        <a href="https://x.com/Kumagi360" aria-label="X">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.9 2.8H21l-6.8 7.8 8 10.6H16l-4.9-6.4-5.6 6.4H2.4l7.3-8.4L2 2.8h6.4l4.4 5.8Zm-1.1 16.5h1.7L7.5 4.6H5.7Z"/></svg>
        </a>
      </nav>`;
  }

  function populatePageLinks() {
    const hero = document.querySelector("[data-hero-socials]");
    if (hero && !hero.firstElementChild) hero.innerHTML = socialLinks();

    const footer = document.querySelector(".site-footer");
    if (footer && !footer.firstElementChild) {
      footer.innerHTML = `
        <div>
          <p>© Kunal Gupta, 2026</p>
          <span>Robots / Travel / Writing</span>
        </div>
        <div class="footer-links">
          ${hero ? '<a href="#top">Back to top ↑</a>' : ""}
          ${socialLinks()}
        </div>`;
    }
  }

  function readPageStyles(source = document) {
    return [...source.head.querySelectorAll("style")].map((item) => item.textContent);
  }

  function setPageStyles(styles) {
    document.head.querySelectorAll("style[data-page-style]").forEach((item) => item.remove());
    styles.forEach((css) => {
      const style = document.createElement("style");
      style.dataset.pageStyle = "";
      style.textContent = css;
      document.head.append(style);
    });
  }

  function captureCurrentPage() {
    const content = document.createDocumentFragment();
    [...document.body.childNodes].forEach((node) => {
      if (node !== header && node !== scrollMeter && !(node instanceof HTMLScriptElement)) content.append(node);
    });

    pageCache.set(currentPageKey, {
      bodyClass: document.body.className,
      content,
      description: document.querySelector('meta[name="description"]')?.content || "",
      lang: document.documentElement.lang,
      styles: readPageStyles(),
      title: document.title,
    });
  }

  function makePageUrlsAbsolute(documentSource, pageUrl) {
    documentSource.querySelectorAll("[href], [src]").forEach((element) => {
      ["href", "src"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value && !value.startsWith("#")) element.setAttribute(attribute, new URL(value, pageUrl).href);
      });
    });
  }

  function createPage(documentSource, pageUrl) {
    const content = document.createDocumentFragment();
    makePageUrlsAbsolute(documentSource, pageUrl);

    [...documentSource.body.childNodes].forEach((node) => {
      const isElement = node.nodeType === Node.ELEMENT_NODE;
      const isHeader = isElement && (node.matches(".site-header") || node.matches('script[src*="assets/js/header.js"]'));
      const isScript = isElement && node.matches("script");
      if (!isHeader && !isScript) content.append(document.importNode(node, true));
    });

    return {
      bodyClass: documentSource.body.className,
      content,
      description: documentSource.querySelector('meta[name="description"]')?.content || "",
      lang: documentSource.documentElement.lang,
      styles: readPageStyles(documentSource),
      title: documentSource.title,
    };
  }

  function applyPage(page) {
    document.body.className = page.bodyClass;
    document.documentElement.lang = page.lang || "en";
    document.title = page.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = page.description;

    setPageStyles(page.styles);
    document.body.append(page.content);
    populatePageLinks();
  }

  async function loadPageScripts(documentSource, pageUrl) {
    const scripts = [...documentSource.body.querySelectorAll("script[src]")];

    for (const sourceScript of scripts) {
      const source = new URL(sourceScript.getAttribute("src"), pageUrl).href;
      if (/\/(header|site)\.js(?:\?|$)/.test(source) || loadedScripts.has(source)) continue;

      await new Promise((resolve, reject) => {
        const nextScript = document.createElement("script");
        nextScript.src = source;
        nextScript.onload = resolve;
        nextScript.onerror = reject;
        document.body.append(nextScript);
      });
      loadedScripts.add(source);
    }
  }

  function scrollToDestination(url) {
    if (url.hash) {
      document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  async function navigate(url, addHistory) {
    const nextPageKey = pageKey(url);
    if (nextPageKey === currentPageKey) {
      scrollToDestination(url);
      return;
    }

    navigationController?.abort();
    navigationController = new AbortController();
    header.setAttribute("aria-busy", "true");

    try {
      let nextPage = pageCache.get(nextPageKey);
      let nextDocument;

      if (!nextPage) {
        const response = await fetch(url, { signal: navigationController.signal });
        if (!response.ok) throw new Error(`Navigation failed with ${response.status}`);
        nextDocument = new DOMParser().parseFromString(await response.text(), "text/html");
        nextPage = createPage(nextDocument, url);
      }

      const update = async () => {
        captureCurrentPage();
        if (addHistory) window.history.pushState({}, "", url);
        currentPageKey = nextPageKey;
        applyPage(nextPage);
        setActiveNav();

        if (nextDocument) {
          await loadPageScripts(nextDocument, url);
          window.initializeSitePage?.();
          if (document.body.classList.contains("til-index-page")) window.initializeCards?.("til");
          if (document.body.classList.contains("blog-index-page") && !document.body.classList.contains("til-index-page")) window.initializeCards?.("thought");
        }

        scrollToDestination(url);
        updateScrollMeter();
      };

      if (document.startViewTransition) await document.startViewTransition(update).finished;
      else await update();

      window.initializeHomePage?.();
      window.refreshAutoplayVideos?.({ reload: true });
    } catch (error) {
      if (error.name !== "AbortError") window.location.assign(url);
    } finally {
      header.removeAttribute("aria-busy");
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target || link.download || link.origin !== window.location.origin) return;

    const url = new URL(link.href);
    const isHtmlPage = url.pathname.endsWith(".html") || url.pathname.endsWith("/");
    const isSamePage = url.pathname === window.location.pathname && url.search === window.location.search;
    if (!isHtmlPage || isSamePage) return;

    event.preventDefault();
    navigate(url, true);
  }, { capture: true });

  window.addEventListener("popstate", () => navigate(new URL(window.location.href), false));

  window.updateSiteHeader = setActiveNav;
  setActiveNav();
  script.replaceWith(scrollMeter, header);
  updateScrollMeter();
  document.addEventListener("DOMContentLoaded", populatePageLinks, { once: true });
})();
