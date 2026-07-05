function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  let active = "";

  if (path === "index.html" || path === "") active = "home";
  if (path.startsWith("projects")) active = "projects";
  if (path === "blog.html") active = "blog";

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-current", link.dataset.nav === active);
  });
}

function setActiveSection(active) {
  document.querySelectorAll("[data-section-nav]").forEach((link) => {
    link.classList.toggle("is-current", link.dataset.sectionNav === active);
  });
}

function setActiveSectionFromHash() {
  const active = window.location.hash.replace("#", "");
  if (!active) return false;
  const link = document.querySelector(`[data-section-nav="${active}"]`);
  if (!link) return false;
  setActiveSection(active);
  return true;
}

function activateProjectPanel(id) {
  if (!id) return;
  document.querySelectorAll("[data-project-panel]").forEach((tile) => {
    tile.classList.toggle("is-active", tile.dataset.projectPanel === id);
  });
  document.querySelectorAll("[data-project-detail]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.projectDetail === id);
  });
}

function initProjectPanels() {
  document.querySelectorAll("[data-project-panel]").forEach((tile) => {
    tile.addEventListener("mouseenter", () => {
      document.querySelectorAll("[data-project-panel]").forEach((otherTile) => {
        otherTile.classList.toggle("is-active", otherTile === tile);
      });
    });
  });
}

function initProjectCardFocus() {
  const cards = [...document.querySelectorAll(".project-case-card")];
  const collection = document.querySelector(".project-card-collection");
  if (!cards.length || !collection) return;

  collection.classList.add("has-focus");

  const setCurrentCard = (card) => {
    cards.forEach((item) => item.classList.toggle("is-current", item === card));
  };

  const cardObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrentCard(visible.target);
    },
    { rootMargin: "-22% 0px -38% 0px", threshold: [0.18, 0.34, 0.52, 0.7] }
  );

  cards.forEach((card) => cardObserver.observe(card));
  setCurrentCard(cards[0]);
}

function initBlogFilters() {
  const filters = [...document.querySelectorAll("[data-blog-filter]")];
  const cards = [...document.querySelectorAll("[data-blog-tags]")];
  if (!filters.length || !cards.length) return;

  const setFilter = (filter) => {
    filters.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.blogFilter === filter);
    });
    cards.forEach((card) => {
      const tags = (card.dataset.blogTags || "").split(/\s+/);
      card.classList.toggle("is-filtered-out", filter !== "all" && !tags.includes(filter));
    });
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.blogFilter));
  });
}

setActiveNav();
initProjectPanels();
initProjectCardFocus();
initBlogFilters();
window.addEventListener("hashchange", setActiveNav);
window.addEventListener("hashchange", setActiveSectionFromHash);

if ((window.location.pathname.split("/").pop() || "index.html") === "index.html" || window.location.pathname.endsWith("/")) {
  const sectionNav = {
    latest: "latest",
    work: "work",
    timeline: "timeline",
    atlas: "atlas",
    notes: "notes",
  };
  const observedSections = Object.keys(sectionNav)
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (observedSections.length) {
    let sectionTicking = false;

    const updateSectionFromScroll = () => {
      sectionTicking = false;

      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight - 8;
      if (scrollBottom >= pageBottom) {
        setActiveSection("notes");
        return;
      }

      const targetLine = window.innerHeight * 0.42;
      const current = observedSections
        .map((section) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height * 0.38;
          return {
            id: section.id,
            distance: Math.abs(sectionCenter - targetLine),
            visible: rect.bottom > 96 && rect.top < window.innerHeight - 96,
          };
        })
        .filter((section) => section.visible)
        .sort((a, b) => a.distance - b.distance)[0];

      if (current) setActiveSection(sectionNav[current.id]);
    };

    const requestSectionUpdate = () => {
      if (sectionTicking) return;
      sectionTicking = true;
      window.requestAnimationFrame(updateSectionFromScroll);
    };

    if (!setActiveSectionFromHash()) {
      setActiveSection("latest");
    }
    updateSectionFromScroll();
    window.addEventListener("scroll", requestSectionUpdate, { passive: true });
    window.addEventListener("resize", requestSectionUpdate);
  }
}

document.querySelectorAll("[data-section-nav]").forEach((link) => {
  link.addEventListener("click", () => {
    setActiveSection(link.dataset.sectionNav);
  });
});
