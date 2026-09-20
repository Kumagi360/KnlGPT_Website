function initAmbientBackground() {
  let background = document.querySelector(".schematic-bg");

  if (!background) {
    background = document.createElement("div");
    background.className = "schematic-bg";
    background.setAttribute("aria-hidden", "true");
    document.body.prepend(background);
  }

  if (background.querySelector(".ambient-geometry")) return;

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

function refreshAutoplayVideos({ reload = false } = {}) {
  document.querySelectorAll("video[autoplay][loop]").forEach((video) => {
    const isInactiveProjectSlide = video.matches("[data-project-video]") && !video.closest(".project-media-slide")?.classList.contains("is-active");
    if (document.hidden || isInactiveProjectSlide) return;

    video.muted = true;
    video.defaultMuted = true;
    if (reload) video.load();

    const play = () => video.play().catch(() => {});
    play();
    window.requestAnimationFrame(play);
    window.setTimeout(play, 250);
  });
}

function initAutoplayVideos() {
  document.querySelectorAll("video[autoplay][loop]").forEach((video) => {
    video.addEventListener("loadeddata", refreshAutoplayVideos, { once: true });
    video.addEventListener("canplay", refreshAutoplayVideos, { once: true });
  });

  refreshAutoplayVideos();
}

function setActiveSection(active) {
  document.querySelectorAll("[data-section-nav]").forEach((link) => {
    link.classList.toggle("is-current", link.dataset.sectionNav === active);
  });
}

function setActiveSectionFromHash() {
  const hash = window.location.hash.replace("#", "");
  const active = { work: "projects", atlas: "travel", notes: "thoughts" }[hash] || hash;
  if (!active) return false;
  const link = document.querySelector(`[data-section-nav="${active}"]`);
  if (!link) return false;
  setActiveSection(active);
  return true;
}

function initProjectCardFocus() {
  const cards = [...document.querySelectorAll(".project-case-card")];
  if (!cards.length) return;

  const setExpanded = (card, expanded) => {
    card.classList.toggle("is-expanded", expanded);
    const briefToggle = card.querySelector("[data-project-brief-toggle]");
    if (briefToggle) {
      briefToggle.setAttribute("aria-expanded", String(expanded));
      briefToggle.setAttribute("aria-label", expanded ? "Close system brief" : "Open system brief");
      briefToggle.firstChild.nodeValue = expanded ? "Close system brief " : "Open system brief ";
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const briefToggle = event.target.closest("[data-project-brief-toggle]");
      if (briefToggle) {
        event.preventDefault();
        const expanded = !card.classList.contains("is-expanded");
        setExpanded(card, expanded);
        if (!expanded) briefToggle.blur();
      }
    });
  });

  const openHashTarget = () => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target && cards.includes(target)) setExpanded(target, true);
  };

  window.addEventListener("hashchange", openHashTarget);
  window.requestAnimationFrame(openHashTarget);
}

function initProjectMediaCarousels() {
  document.querySelectorAll("[data-project-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".project-media-slide")];
    const track = carousel.querySelector(".project-media-track");
    const count = carousel.querySelector("[data-carousel-count]");
    const previous = carousel.querySelector("[data-carousel-previous]");
    const next = carousel.querySelector("[data-carousel-next]");
    const videoControls = carousel.querySelector(".project-video-controls");
    if (!track || slides.length < 2 || !previous || !next) return;

    let current = 0;
    const setSlide = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === current;
        slide.classList.toggle("is-active", isActive);
        if (!isActive) slide.querySelectorAll("video").forEach((video) => video.pause());
      });
      const hasActiveVideo = Boolean(slides[current].querySelector("video"));
      carousel.classList.toggle("has-active-video", hasActiveVideo);
      if (!hasActiveVideo) carousel.classList.remove("is-video-controls-visible");
      videoControls?.toggleAttribute("hidden", !hasActiveVideo);
      if (count) count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      carousel.dispatchEvent(new CustomEvent("projectcarouselchange"));
    };

    previous.addEventListener("click", (event) => {
      event.stopPropagation();
      setSlide(current - 1);
    });
    next.addEventListener("click", (event) => {
      event.stopPropagation();
      setSlide(current + 1);
    });
    setSlide(0);
  });
}

function initProjectMediaVideos() {
  document.querySelectorAll(".project-case-media").forEach((media) => {
    const videos = [...media.querySelectorAll("[data-project-video]")];
    if (!videos.length) return;
    const playButton = media?.querySelector("[data-project-video-play]");
    const muteButton = media?.querySelector("[data-project-video-mute]");
    if (!media || !playButton || !muteButton) return;

    const getActiveVideo = () => media.querySelector(".project-media-slide.is-active [data-project-video]");

    const playActiveVideo = () => {
      const video = getActiveVideo();
      if (video) video.play().catch(() => {});
    };

    const syncControls = () => {
      const video = getActiveVideo();
      if (!video) return;
      const isPaused = video.paused;
      playButton.textContent = isPaused ? "Play" : "Pause";
      playButton.setAttribute("aria-pressed", String(!isPaused));
      muteButton.textContent = video.muted ? "Unmute" : "Mute";
      muteButton.setAttribute("aria-pressed", String(video.muted));
    };

    const togglePlayback = () => {
      const video = getActiveVideo();
      if (!video) return;
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    };

    media.addEventListener("pointerdown", () => {
      if (media.classList.contains("has-active-video")) media.classList.add("is-video-controls-visible");
    });
    playButton.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePlayback();
    });
    muteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const video = getActiveVideo();
      if (!video) return;
      video.muted = !video.muted;
      syncControls();
    });
    videos.forEach((video) => {
      video.addEventListener("click", () => {
        if (video.closest(".project-media-slide")?.classList.contains("is-active")) togglePlayback();
      });
      video.addEventListener("play", syncControls);
      video.addEventListener("pause", syncControls);
      video.addEventListener("volumechange", syncControls);
    });
    media.addEventListener("projectcarouselchange", () => {
      playActiveVideo();
      syncControls();
    });
    playActiveVideo();
    syncControls();
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

function initHomeSectionTracking() {
  if ((window.location.pathname.split("/").pop() || "index.html") !== "index.html" && !window.location.pathname.endsWith("/")) return;

  const sectionNav = {
    latest: "latest",
    work: "projects",
    timeline: "timeline",
    atlas: "travel",
    notes: "thoughts",
  };
  const observedSections = Object.keys(sectionNav)
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const footer = document.querySelector(".site-footer");

  if (observedSections.length) {
    let sectionTicking = false;

    const updateSectionFromScroll = () => {
      sectionTicking = false;

      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight - 32;
      const isFooterVisible = footer && footer.getBoundingClientRect().top <= window.innerHeight;
      if (isFooterVisible || scrollBottom >= pageBottom) {
        setActiveSection("thoughts");
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

  document.querySelectorAll("[data-section-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      setActiveSection(link.dataset.sectionNav);
    });
  });
}

function initProjectYearTracking() {
  if (!document.body.classList.contains("projects-page")) return;

  const yearNav = document.querySelector("[data-project-year-nav]");
  const milestones = [...document.querySelectorAll("[data-project-year]")];
  if (!yearNav || !milestones.length) return;

  const setYear = (year) => {
    yearNav.querySelectorAll("[data-project-year-link]").forEach((link) => {
      link.classList.toggle("is-current", link.dataset.projectYearLink === year);
    });
  };

  const updateYear = () => {
    const threshold = 132;
    const current = milestones
      .map((milestone) => ({ year: milestone.dataset.projectYear, top: milestone.getBoundingClientRect().top }))
      .filter((milestone) => milestone.top <= threshold)
      .sort((a, b) => b.top - a.top)[0];
    setYear(current?.year || "today");
  };

  let ticking = false;
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      updateYear();
    });
  };

  updateYear();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function initializeSitePage() {
  initAmbientBackground();
  initAutoplayVideos();
  initProjectCardFocus();
  initProjectMediaCarousels();
  initProjectMediaVideos();
  initBlogFilters();
  initTilDateFilter();
  initHomeSectionTracking();
  initProjectYearTracking();
}

window.initializeSitePage = initializeSitePage;
window.refreshAutoplayVideos = refreshAutoplayVideos;
initializeSitePage();
