(() => {
  const script = document.currentScript;
  if (!script) return;

  const siteRoot = new URL("../../", script.src);
  const href = (path) => new URL(path, siteRoot).href;
  const template = document.createElement("template");
  const pageCache = new Map();
  const loadedScripts = new Set([...document.scripts].map((item) => item.src).filter(Boolean));
  let currentPageKey = `${window.location.pathname}${window.location.search}`;
  let navigationController;

  document.head.querySelectorAll("style").forEach((item) => {
    item.dataset.pageStyle = "";
  });

  template.innerHTML = `
    <header class="site-header">
      <a class="brand-mark" href="${href("index.html#top")}" aria-label="Kunal Gupta home">
        <span class="brand-cell">KG</span>
        <span class="brand-text">Kunal Gupta</span>
      </a>
      <nav class="primary-nav global-nav" aria-label="Primary navigation">
        <a href="${href("index.html#top")}" data-nav="home">Home</a>
        <a href="${href("projects.html")}" data-nav="projects">Projects</a>
        <a href="${href("blog.html")}" data-nav="blog">Thoughts</a>
        <a href="${href("til.html")}" data-nav="til">TIL</a>
      </nav>
    </header>
  `;

  const header = template.content.querySelector(".site-header");

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
      if (node !== header && !(node instanceof HTMLScriptElement)) content.append(node);
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
    const nextPageKey = `${url.pathname}${url.search}`;
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
        }

        scrollToDestination(url);
      };

      if (document.startViewTransition) await document.startViewTransition(update).finished;
      else await update();
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
  });

  window.addEventListener("popstate", () => navigate(new URL(window.location.href), false));

  window.updateSiteHeader = setActiveNav;
  setActiveNav();
  script.replaceWith(header);
})();
