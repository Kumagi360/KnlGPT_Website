(() => {
  const script = document.currentScript;
  if (!script) return;

  const siteRoot = new URL("../../", script.src);
  const href = (path) => new URL(path, siteRoot).href;
  const template = document.createElement("template");

  template.innerHTML = `
    <header class="site-header">
      <a class="brand-mark" href="${href("index.html#top")}">
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
  });

  script.replaceWith(header);
})();
