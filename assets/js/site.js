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
  const tracePulseC = reducedMotion ? "" : '<animateMotion dur="21s" repeatCount="indefinite" path="M150 850H500V890H650" />';
  const tracePulseD = reducedMotion ? "" : '<animateMotion dur="27s" repeatCount="indefinite" path="M210 900V720H480V640H700" />';
  const orbitMotion = reducedMotion ? "" : '<animateMotion dur="32s" repeatCount="indefinite" path="M1110 250a150 84 0 1 0 300 0a150 84 0 1 0-300 0" />';

  background.innerHTML = `
    <svg class="ambient-geometry" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g class="ambient-traces">
        <path d="M110 680H430V790H690" /><path d="M80 760H300V590H530V680H760" />
        <path d="M150 850H500V890H650" /><path d="M210 900V720H480V640H700" />
        <circle cx="210" cy="760" r="5" /><circle cx="430" cy="720" r="5" /><circle cx="210" cy="850" r="5" /><circle cx="500" cy="850" r="5" />
      </g>
      <g class="ambient-pcb-network">
        <path d="M90 300H210L300 210H450L525 285H690" />
        <path d="M130 390H250L340 300H490L565 375H730" />
        <path d="M130 468H270L340 398H500L575 473H720" />
        <path d="M300 210V118H390V210M340 300v92h90v-92" />
        <path d="M210 300V468H380V392H610" />
        <path d="M450 210v-54h86M490 300v-54h86" />
        <path d="M565 375v72h108M525 285v72h108" />
        <circle cx="210" cy="300" r="5" /><circle cx="300" cy="210" r="5" /><circle cx="450" cy="210" r="5" />
        <circle cx="340" cy="300" r="5" /><circle cx="490" cy="300" r="5" /><circle cx="565" cy="375" r="5" /><circle cx="340" cy="398" r="5" /><circle cx="500" cy="398" r="5" />
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
        <circle class="ambient-pulse ambient-pulse-alt" r="3">${tracePulseC}</circle>
        <circle class="ambient-pulse" r="4">${tracePulseD}</circle>
      </g>
    </svg>
  `;
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

function initTilDateFilter() {
  if (!document.body.classList.contains("til-index-page")) return;

  const cards = [...document.querySelectorAll(".til-index-page .blog-card")];
  const minInput = document.querySelector("[data-til-date-min]");
  const maxInput = document.querySelector("[data-til-date-max]");
  const startOutput = document.querySelector("[data-til-date-start]");
  const endOutput = document.querySelector("[data-til-date-end]");
  const selection = document.querySelector("[data-til-date-selection]");
  if (!cards.length || !minInput || !maxInput || !startOutput || !endOutput || !selection) return;

  const dayMs = 86_400_000;
  const dateForCard = (card) => {
    const match = card.getAttribute("href")?.match(/(\d{4})-(\d{2})-(\d{2})/);
    return match ? Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
  };
  const pacificToday = () => {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts();
    const value = (type) => parts.find((part) => part.type === type)?.value;
    return Date.UTC(Number(value("year")), Number(value("month")) - 1, Number(value("day")));
  };
  const cardDates = cards.map(dateForCard).filter(Boolean);
  const firstDate = Math.min(...cardDates);
  let today = pacificToday();
  let span = Math.max(1, Math.round((today - firstDate) / dayMs));
  const formatDate = (offset) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(firstDate + offset * dayMs));

  [minInput, maxInput].forEach((input) => {
    input.min = "0";
    input.max = String(span);
    input.step = "0.001";
  });
  minInput.value = "0";
  maxInput.value = String(span);

  const update = (changedInput) => {
    const minimumGap = Math.min(1, span);
    let start = Number(minInput.value);
    let end = Number(maxInput.value);
    if (end - start < minimumGap) {
      if (changedInput === minInput) start = Math.max(0, end - minimumGap);
      else end = Math.min(span, start + minimumGap);
    }
    minInput.value = String(start);
    maxInput.value = String(end);
    const lower = (start / span) * 100;
    const upper = (end / span) * 100;
    selection.style.left = `${lower}%`;
    selection.style.width = `${upper - lower}%`;
    const startDay = Math.round(start);
    const endDay = Math.round(end);
    startOutput.value = formatDate(startDay);
    endOutput.value = formatDate(endDay);
    cards.forEach((card) => {
      const date = dateForCard(card);
      card.classList.toggle("is-filtered-out", !date || date < firstDate + startDay * dayMs || date > firstDate + endDay * dayMs);
    });
  };

  minInput.addEventListener("input", () => update(minInput));
  maxInput.addEventListener("input", () => update(maxInput));
  if (window.tilDateFilterTimer) window.clearInterval(window.tilDateFilterTimer);
  window.tilDateFilterTimer = window.setInterval(() => {
    const nextToday = pacificToday();
    if (nextToday === today) return;
    const endWasToday = Math.abs(Number(maxInput.value) - span) < 0.001;
    today = nextToday;
    span = Math.max(1, Math.round((today - firstDate) / dayMs));
    [minInput, maxInput].forEach((input) => { input.max = String(span); });
    if (endWasToday) maxInput.value = String(span);
    update();
  }, 60_000);
  update();
}

function initializeSitePage() {
  initAmbientBackground();
  initProjectCardFocus();
  initProjectMediaCarousels();
  initBlogFilters();
  initTilDateFilter();
}

window.initializeSitePage = initializeSitePage;
initializeSitePage();
