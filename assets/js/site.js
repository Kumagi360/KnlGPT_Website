function initAmbientBackground() {
  let background = document.querySelector(".schematic-bg");

  if (!background) {
    background = document.createElement("div");
    background.className = "schematic-bg";
    background.setAttribute("aria-hidden", "true");
    document.body.prepend(background);
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tracePulseA = reducedMotion ? "" : '<animateMotion dur="18s" repeatCount="indefinite" path="M110 680H430V790H690" />';
  const tracePulseB = reducedMotion ? "" : '<animateMotion dur="24s" repeatCount="indefinite" path="M80 760H300V590H530V680H760" />';
  const orbitMotion = reducedMotion ? "" : '<animateMotion dur="32s" repeatCount="indefinite" path="M1110 250a150 84 0 1 0 300 0a150 84 0 1 0-300 0" />';

  background.innerHTML = `
    <svg class="ambient-geometry" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g class="ambient-traces">
        <path d="M110 680H430V790H690" /><path d="M80 760H300V590H530V680H760" />
        <path d="M150 850H500V890H650" /><circle cx="430" cy="680" r="5" /><circle cx="300" cy="760" r="5" /><circle cx="530" cy="680" r="5" />
      </g>
      <g class="ambient-pcb-network">
        <path d="M90 300H210L300 210H450L525 285H690" />
        <path d="M130 390H250L340 300H490L565 375H730" />
        <path d="M300 210V118H390V210M340 300v92h90v-92" />
        <path d="M450 210v-54h86M490 300v-54h86" />
        <path d="M565 375v72h108M525 285v72h108" />
        <circle cx="210" cy="300" r="5" /><circle cx="300" cy="210" r="5" /><circle cx="450" cy="210" r="5" />
        <circle cx="340" cy="300" r="5" /><circle cx="490" cy="300" r="5" /><circle cx="565" cy="375" r="5" />
        <g class="ambient-pad-cluster"><rect x="648" y="430" width="18" height="18" /><rect x="678" y="430" width="18" height="18" /><rect x="708" y="430" width="18" height="18" /></g>
      </g>
      <g class="ambient-orbit">
        <ellipse cx="1260" cy="250" rx="150" ry="84" /><ellipse cx="1260" cy="250" rx="92" ry="148" transform="rotate(28 1260 250)" />
        <circle class="ambient-satellite" r="4">${orbitMotion}</circle>
      </g>
      <g class="ambient-study" transform="translate(1230 650)">
        <circle r="112" /><circle r="76" /><rect x="-78" y="-78" width="156" height="156" />
        <path d="M-112 0H112M0-112V112" />
        <g class="ambient-arm"><path d="M-94 0L94 0M0-94L0 94" />${reducedMotion ? "" : '<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="90s" repeatCount="indefinite" />'}</g>
        <circle r="8" />
      </g>
      <g class="ambient-pulses">
        <circle class="ambient-pulse" r="4">${tracePulseA}</circle>
        <circle class="ambient-pulse ambient-pulse-alt" r="3">${tracePulseB}</circle>
      </g>
    </svg>
  `;
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

  const canHover = window.matchMedia("(hover: hover)").matches;

  cards.forEach((card) => {
    const briefToggle = card.querySelector("[data-project-brief-toggle]");
    const setExpanded = (expanded) => {
      card.classList.toggle("is-expanded", expanded);
      if (briefToggle) briefToggle.setAttribute("aria-expanded", String(expanded));
    };

    card.addEventListener("mouseenter", () => setExpanded(true));
    card.addEventListener("mouseleave", () => {
      if (canHover) setExpanded(false);
    });
    card.addEventListener("focusin", (event) => {
      if (!event.target.closest("button, a")) setExpanded(true);
    });
    card.addEventListener("focusout", () => setExpanded(false));
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-project-brief-toggle]")) {
        event.preventDefault();
        setExpanded(!card.classList.contains("is-expanded"));
        return;
      }
      if (event.target.closest("button, a")) return;
      setExpanded(!card.classList.contains("is-expanded"));
    });
  });

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

function initProjectMediaCarousels() {
  document.querySelectorAll("[data-project-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".project-media-slide")];
    const track = carousel.querySelector(".project-media-track");
    const count = carousel.querySelector("[data-carousel-count]");
    const previous = carousel.querySelector("[data-carousel-previous]");
    const next = carousel.querySelector("[data-carousel-next]");
    if (!track || slides.length < 2 || !previous || !next) return;

    let current = 0;
    const setSlide = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === current));
      if (count) count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };

    previous.addEventListener("click", (event) => {
      event.stopPropagation();
      setSlide(current - 1);
    });
    next.addEventListener("click", (event) => {
      event.stopPropagation();
      setSlide(current + 1);
    });
  });
}

function initBlogFilters() {
  const filters = [...document.querySelectorAll("[data-blog-filter]")];
  const cards = [...document.querySelectorAll("[data-blog-tags]")];
  if (!filters.length || !cards.length) return;

  const setFilter = (filter) => {
    filters.forEach((button) => {
      const isActive = button.dataset.blogFilter === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
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

initAmbientBackground();
initProjectPanels();
initProjectCardFocus();
initProjectMediaCarousels();
initBlogFilters();
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
