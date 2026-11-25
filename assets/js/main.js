const countries = [
  {
    id: "840",
    status: "lived",
    meta: "United States / home base",
    title: "United States",
    detail: "Since 2021. Robotics labs, Bay Area hardware spaces, road trips, demo days, and national parks.",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "604",
    status: "visited",
    meta: "Peru / mountains and cities",
    title: "Peru",
    detail: "Andes, Lima, the Sacred Valley, stonework, and high-altitude terrain.",
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80&sat=-10",
    ],
  },
  {
    id: "124",
    status: "visited",
    meta: "Canada / long routes",
    title: "Canada",
    detail: "Cities, coastlines, mountains, and long road trips.",
    images: [
      "https://images.unsplash.com/photo-1503614472-8c93d56cd587?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "484",
    status: "visited",
    meta: "Mexico / cities and coast",
    title: "Mexico",
    detail: "Cities, food, coastlines, plazas, ruins, and bright public spaces.",
    images: [
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "044",
    status: "visited",
    meta: "Bahamas / island time",
    title: "Bahamas",
    detail: "Clear water, reefs, beaches, and slow days by the coast.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "388",
    status: "visited",
    meta: "Jamaica / coast and hills",
    title: "Jamaica",
    detail: "Coast, music, food, mountain roads, and green landscapes.",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "076",
    status: "visited",
    meta: "Brazil / cities and coast",
    title: "Brazil",
    detail: "Cities, coastline, rainforest edges, music, football, and a lot of distance.",
    images: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "032",
    status: "visited",
    meta: "Argentina / city and open country",
    title: "Argentina",
    detail: "Buenos Aires, open landscapes, mountains, good food, architecture, and Patagonia.",
    images: [
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "554",
    status: "visited",
    meta: "New Zealand / roads and terrain",
    title: "New Zealand",
    detail: "Alpine roads, water, volcanic terrain, and coastal towns.",
    images: [
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "242",
    status: "visited",
    title: "Fiji",
  },
  {
    id: "540",
    status: "visited",
    title: "New Caledonia",
  },
  {
    id: "548",
    status: "visited",
    title: "Vanuatu",
  },
  {
    id: "036",
    status: "lived",
    meta: "Australia / lived here",
    title: "Australia",
    detail: "A former home. Cities, routines, favorite places, and everyday life belong here.",
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "528",
    status: "lived",
    meta: "Netherlands / lived here",
    title: "Netherlands",
    detail: "A former home. School years, daily routes, canals, bikes, and small design details.",
    images: [
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "442",
    status: "visited",
    title: "Luxembourg",
  },
  {
    id: "344",
    status: "visited",
    title: "Hong Kong",
  },
  {
    id: "702",
    status: "visited",
    title: "Singapore",
  },
  {
    id: "300",
    status: "lived",
    meta: "Greece / lived here",
    title: "Greece",
    detail: "A former home. Family, coastlines, ruins, islands, food, and everyday routines.",
    images: [
      "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "356",
    status: "lived",
    title: "India",
  },
  {
    id: "826",
    status: "visited",
    title: "United Kingdom",
  },
  {
    id: "620",
    status: "visited",
    title: "Portugal",
  },
  {
    id: "724",
    status: "visited",
    title: "Spain",
  },
  {
    id: "380",
    status: "visited",
    title: "Italy",
  },
  {
    id: "276",
    status: "visited",
    title: "Germany",
  },
  {
    id: "056",
    status: "visited",
    title: "Belgium",
  },
  {
    id: "578",
    status: "visited",
    title: "Norway",
  },
  {
    id: "752",
    status: "visited",
    title: "Sweden",
  },
  {
    id: "040",
    status: "visited",
    title: "Austria",
  },
  {
    id: "756",
    status: "visited",
    title: "Switzerland",
  },
  {
    id: "008",
    status: "visited",
    title: "Albania",
  },
  {
    id: "191",
    status: "visited",
    title: "Croatia",
  },
  {
    id: "499",
    status: "visited",
    title: "Montenegro",
  },
  {
    id: "070",
    status: "visited",
    title: "Bosnia and Herzegovina",
  },
  {
    id: "792",
    status: "visited",
    title: "Turkey",
  },
  {
    id: "392",
    status: "visited",
    title: "Japan",
  },
  {
    id: "250",
    status: "visited",
    title: "France",
  },
];

const scrollMeter = document.querySelector(".scroll-meter");
const popoverTitle = document.querySelector("#popoverTitle");
const mapPopover = document.querySelector("#mapPopover");
const interactiveCountryIds = new Set(countries.map((country) => country.id));
const livedCountryIds = new Set(countries.filter((country) => country.status === "lived").map((country) => country.id));
const visitedCountryIds = new Set(countries.filter((country) => country.status !== "lived").map((country) => country.id));

async function updateArchiveStats() {
  const countriesStat = document.querySelector("#stat-countries");
  if (countriesStat) countriesStat.textContent = String(countries.length).padStart(2, "0");

  const projectsStat = document.querySelector("#stat-projects");
  if (projectsStat) {
    try {
      const response = await fetch("projects.html", { cache: "no-store" });
      if (!response.ok) return;
      const page = new DOMParser().parseFromString(await response.text(), "text/html");
      projectsStat.textContent = String(page.querySelectorAll(".project-case-card").length).padStart(2, "0");
    } catch {
      // The static count remains visible if a page cannot be loaded.
    }
  }

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
}

function updateScrollMeter() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollMeter.style.width = `${progress * 100}%`;
}

function initSectionNav() {
  const links = [...document.querySelectorAll("[data-section-nav]")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const footer = document.querySelector(".site-footer");
  if (!links.length || !sections.length) return;

  let isScheduled = false;
  const updateSectionNav = () => {
    isScheduled = false;
    const viewportCenter = window.innerHeight / 2;
    const centeredSection = sections.find((section) => {
      const { top, bottom } = section.getBoundingClientRect();
      return top <= viewportCenter && bottom > viewportCenter;
    });
    const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 32;
    const isFooterVisible = footer && footer.getBoundingClientRect().top <= window.innerHeight;
    const currentSection = isFooterVisible || isAtPageBottom ? sections.at(-1) : centeredSection;

    links.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${currentSection?.id}`);
    });
  };

  const scheduleUpdate = () => {
    if (!isScheduled) {
      isScheduled = true;
      window.requestAnimationFrame(updateSectionNav);
    }
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return;

      event.preventDefault();
      const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
      const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - 36;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

      window.history.pushState(null, "", `#${section.id}`);
      window.scrollTo({ top: Math.max(0, top), behavior });
    });
  });

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  updateSectionNav();
}

function cloneMediaFrame(frame) {
  const clone = frame.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  clone.querySelector("img")?.setAttribute("alt", "");
  return clone;
}

function initMediaRoll(viewport, stage, reducedMotion, playback) {
  let frames = [];
  let distance = 0;
  let offset = 0;
  let hovering = false;
  let drag;
  let lastTimestamp = 0;

  function render() {
    stage.style.transform = `translateX(${-offset}px)`;
  }

  function removeCopy(copy) {
    const video = copy.querySelector("video");
    if (video) {
      playback.unobserve(video);
      video.pause();
    }
    copy.remove();
  }

  function sync() {
    if (!frames.length || !viewport.clientWidth) return;
    const first = frames[0].getBoundingClientRect();
    const last = frames[frames.length - 1].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(stage).columnGap);
    distance = (last.right - first.left) / (stage.currentCSSZoom || 1) + gap;
    if (distance <= 0) return;

    // Keep a full viewport of frames beyond the point where the track wraps.
    const copies = 1 + Math.ceil((viewport.clientWidth + gap) / distance);
    const length = copies * frames.length;
    while (stage.children.length > length) removeCopy(stage.lastElementChild);
    while (stage.children.length < length) {
      const copy = cloneMediaFrame(frames[stage.children.length % frames.length]);
      stage.append(copy);
      const video = copy.querySelector("video");
      if (video) playback.observe(video);
    }
    offset %= distance;
    render();
  }

  function setFrames(items) {
    frames = items;
    viewport.hidden = frames.length === 0;
    stage.querySelectorAll('figure[aria-hidden="true"]').forEach(removeCopy);
    stage.replaceChildren(...frames);
    offset = 0;
    distance = 0;
    hovering = viewport.matches(":hover") && window.matchMedia("(hover: hover)").matches;
  }

  viewport.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") hovering = true;
  });
  viewport.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") hovering = false;
  });
  viewport.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || !distance) return;
    drag = { id: event.pointerId, x: event.clientX };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
  });
  viewport.addEventListener("pointermove", (event) => {
    if (event.pointerId !== drag?.id) return;
    const delta = (drag.x - event.clientX) / (stage.currentCSSZoom || 1);
    offset = ((offset + delta) % distance + distance) % distance;
    drag.x = event.clientX;
    render();
  });
  viewport.addEventListener("lostpointercapture", (event) => {
    if (event.pointerId !== drag?.id) return;
    drag = undefined;
    if (event.pointerType === "mouse") hovering = viewport.matches(":hover");
    viewport.classList.remove("is-dragging");
  });
  viewport.addEventListener("dragstart", (event) => event.preventDefault());

  function animate(timestamp) {
    if (lastTimestamp && distance && !hovering && !drag && !reducedMotion.matches &&
        !document.hidden && viewport.isConnected && !viewport.hidden) {
      offset = (offset + (timestamp - lastTimestamp) * 0.024) % distance;
      render();
    }
    lastTimestamp = timestamp;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
  return { setFrames, sync };
}

function initLatestMedia(media, reducedMotion) {
  const firstStage = media.querySelector(".media-roll");
  const frames = [...firstStage.children];
  // Only decode playing video frames when the video is visible in its clipped row.
  const playback = new IntersectionObserver((entries) => {
    entries.forEach(({ target, intersectionRatio }) => {
      if (intersectionRatio >= 0.05) target.play().catch(() => {});
      else target.pause();
    });
  }, { threshold: 0.05 });
  firstStage.querySelectorAll("video").forEach((video) => playback.observe(video));
  if (frames.length < 2) return;

  const rows = document.createElement("div");
  rows.className = "media-rolls";
  media.append(rows);
  const secondStage = document.createElement("div");
  secondStage.className = "media-roll";
  const rolls = [firstStage, secondStage].map((stage) => {
    const viewport = document.createElement("div");
    viewport.className = "media-roll-row";
    viewport.append(stage);
    rows.append(viewport);
    return initMediaRoll(viewport, stage, reducedMotion, playback);
  });
  let twoRows;

  function layout() {
    if (!media.clientHeight) return;
    const styles = getComputedStyle(media);
    const baseHeight = parseFloat(styles.minHeight) - 2 * parseFloat(styles.paddingTop);
    const gap = parseFloat(getComputedStyle(rows).rowGap);
    const split = baseHeight <= media.clientHeight * 0.7;
    const rowHeight = split ? Math.min(baseHeight, (media.clientHeight - 3 * gap) / 2) : baseHeight;
    media.style.setProperty("--media-height", `${rowHeight}px`);

    if (split !== twoRows) {
      twoRows = split;
      const midpoint = Math.ceil(frames.length / 2);
      const top = split ? frames.slice(0, midpoint) : frames;
      const bottom = split ? frames.slice(midpoint) : [];
      rolls[0].setFrames(top);
      rolls[1].setFrames(bottom);
    }
    rolls.forEach((roll) => roll.sync());
  }

  frames.forEach((frame) => {
    const asset = frame.firstElementChild;
    asset.addEventListener(asset instanceof HTMLVideoElement ? "loadedmetadata" : "load", layout);
  });
  new ResizeObserver(layout).observe(media);
  layout();
}

function initLatestCarousel() {
  const carousel = document.querySelector("[data-latest-carousel]");
  if (!carousel) return;
  if (carousel.refreshAutoRotation) {
    carousel.refreshAutoRotation();
    return;
  }

  const track = carousel.querySelector(".latest-track");
  const cards = [...carousel.querySelectorAll("[data-latest-card]")].sort((first, second) => {
    const firstDate = first.querySelector("time")?.dateTime || "";
    const secondDate = second.querySelector("time")?.dateTime || "";
    return secondDate.localeCompare(firstDate);
  });
  cards.forEach((card) => track.append(card));
  const dots = [...carousel.querySelectorAll("[data-latest-dot]")];
  const previous = carousel.querySelector("[data-latest-previous]");
  const next = carousel.querySelector("[data-latest-next]");
  const current = carousel.querySelector("#latestCurrent");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!track || cards.length < 2) return;

  carousel.querySelectorAll(".latest-media").forEach((media) => {
    initLatestMedia(media, reducedMotion);
  });

  let activeIndex = 0;
  let autoTimer;

  const setLatest = (index, shouldScroll = true) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
    });
    if (current) current.textContent = String(activeIndex + 1).padStart(2, "0");
    if (shouldScroll) {
      track.scrollTo({ left: track.clientWidth * activeIndex, behavior: "smooth" });
    }
  };

  const restartAuto = () => {
    window.clearInterval(autoTimer);
    autoTimer = window.setInterval(() => {
      if (!document.hidden && !carousel.matches(":hover") && !carousel.contains(document.activeElement)) {
        setLatest(activeIndex + 1);
      }
    }, 10000);
  };

  carousel.refreshAutoRotation = restartAuto;

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setLatest(Number(dot.dataset.latestDot));
      restartAuto();
    });
  });

  previous?.addEventListener("click", () => {
    setLatest(activeIndex - 1);
    restartAuto();
  });

  next?.addEventListener("click", () => {
    setLatest(activeIndex + 1);
    restartAuto();
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) restartAuto();
  });

  track.addEventListener(
    "scroll",
    () => {
      const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      if (index !== activeIndex) setLatest(index, false);
    },
    { passive: true }
  );

  setLatest(0);
  restartAuto();
}

function setCountry(countryId) {
  const country = countries.find((entry) => entry.id === String(countryId));
  if (!country || (mapPopover.classList.contains("is-visible") && popoverTitle.textContent === country.title)) return;
  mapPopover.classList.add("is-visible");
  mapPopover.classList.toggle("is-lived", country.status === "lived");
  popoverTitle.textContent = country.title;
  document.querySelectorAll(".country").forEach((countryShape) => {
    countryShape.classList.toggle("is-active", countryShape.dataset.country === String(countryId));
  });
}

function clearCountry() {
  if (!mapPopover.classList.contains("is-visible")) return;
  mapPopover.classList.remove("is-visible");
  document.querySelectorAll(".country").forEach((shape) => {
    shape.classList.remove("is-active");
  });
}

window.setCountry = setCountry;
window.clearCountry = clearCountry;

async function renderWorldMap() {
  const mapHost = document.querySelector("#worldMap");
  if (!mapHost || !window.d3 || !window.topojson) return;

  try {
    mapHost.textContent = "";

    const width = 960;
    const height = 460;
    const svg = d3
      .select(mapHost)
      .append("svg")
      .attr("class", "world-map")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "group")
      .attr("tabindex", 0)
      .attr("aria-label", "World map. Scroll or pinch to zoom, and drag to pan. With the map focused, use plus, minus, or the arrow keys.");

    const world = window.WORLD_COUNTRIES_TOPOLOGY || (await d3.json("assets/data/countries-110m.json"));
    const features = topojson.feature(world, world.objects.countries).features;
    const countryIds = new Set(features.map((feature) => String(feature.id)));
    features.push(...(window.WORLD_ATLAS_SMALL_TERRITORIES || []).filter((feature) => !countryIds.has(feature.id)));
    const projection = d3.geoNaturalEarth1().fitExtent([[4, 4], [width - 4, height - 4]], {
      type: "Sphere",
    });
    const path = d3.geoPath(projection);

    // Every country outline and highlight uses the same projected path and camera.
    const mapLayer = svg.append("g");
    const countryPaths = mapLayer.selectAll("path")
      .data(features)
      .join("path")
      .attr("class", (feature) => {
        const id = String(feature.id);
        const state = livedCountryIds.has(id) ? " is-lived" : visitedCountryIds.has(id) ? " is-visited" : "";
        return `country${state}`;
      })
      .attr("data-country", (feature) => String(feature.id))
      .attr("tabindex", (feature) => (interactiveCountryIds.has(String(feature.id)) ? 0 : null))
      .attr("aria-label", (feature) => {
        const country = countries.find((entry) => entry.id === String(feature.id));
        return country ? `${country.title}, ${country.status === "lived" ? "lived" : "visited"}` : "Country border";
      })
      .attr("d", path);

    countryPaths.filter((feature) => interactiveCountryIds.has(String(feature.id))).raise();

    let dragging = false;

    function showCountry(target) {
      const country = target?.closest(".country");
      if (country && mapHost.contains(country) && interactiveCountryIds.has(country.dataset.country)) {
        setCountry(country.dataset.country);
      } else {
        clearCountry();
      }
    }

    function updateHover(event) {
      if (event && Number.isFinite(event.clientX)) {
        showCountry(document.elementFromPoint(event.clientX, event.clientY));
      }
    }

    const zoom = d3.zoom()
      .scaleExtent([1, 24])
      .translateExtent([[0, 0], [width, height]])
      .filter((event) => (!event.ctrlKey || event.type === "wheel") && !event.button &&
        (event.type !== "touchstart" || event.touches.length > 1 || d3.zoomTransform(svg.node()).k > 1))
      .on("start", ({ sourceEvent }) => {
        dragging = sourceEvent?.type === "mousedown" || sourceEvent?.type === "touchstart";
      })
      .on("zoom", ({ transform, sourceEvent }) => {
        mapLayer.attr("transform", transform);
        svg.classed("is-zoomed", transform.k > 1);
        if (dragging) clearCountry();
        else updateHover(sourceEvent);
      })
      .on("end", ({ sourceEvent }) => {
        dragging = false;
        updateHover(sourceEvent);
      });

    svg.call(zoom);

    mapHost.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "touch" && !dragging) showCountry(event.target);
    });
    mapHost.addEventListener("pointerdown", (event) => {
      if (event.isPrimary && event.button === 0) showCountry(event.target);
    });
    mapHost.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "touch") clearCountry();
    });
    mapHost.addEventListener("click", (event) => showCountry(event.target));
    mapHost.addEventListener("focusin", (event) => showCountry(event.target));
    mapHost.addEventListener("focusout", clearCountry);
    mapHost.addEventListener("keydown", (event) => {
      if (event.target !== svg.node()) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showCountry(event.target);
        }
        return;
      }

      const directions = { ArrowLeft: [1, 0], ArrowRight: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
      const direction = directions[event.key];
      if (direction) {
        event.preventDefault();
        const step = 40 / d3.zoomTransform(svg.node()).k;
        svg.call(zoom.translateBy, direction[0] * step, direction[1] * step);
      } else if (event.key === "+" || event.key === "=" || event.key === "-") {
        event.preventDefault();
        svg.call(zoom.scaleBy, event.key === "-" ? 0.8 : 1.25);
      }
    });

    const mapFrame = mapHost.parentElement;
    function resetMapView() {
      clearCountry();
      svg.interrupt().call(zoom.transform, d3.zoomIdentity);
    }

    mapFrame.querySelector(".map-reset").addEventListener("click", resetMapView);
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) resetMapView();
    }).observe(mapFrame);
  } catch (error) {
    mapHost.classList.add("map-fallback");
  }
}

function initExperienceCarousel() {
  const board = document.querySelector(".timeline-board");
  if (!board || board.classList.contains("is-carousel")) return;

  const track = board.querySelector(".timeline-track");
  const entries = [...track.children];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const visibleRows = 3;
  const initialRow = entries.length;
  let rowHeight = 0;
  let timer = 0;
  let frame = 0;
  let inView = false;
  let hovering = false;
  let touchPaused = false;
  let drag;

  function copyEntries() {
    return entries.map((entry) => {
      const copy = entry.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      return copy;
    });
  }

  // The extra copies let both autoplay and manual scrolling wrap in either direction.
  track.replaceChildren(...copyEntries(), ...entries, ...copyEntries());
  board.classList.add("is-carousel");

  function wrapScroll() {
    if (!rowHeight) return;
    const offset = board.scrollTop;
    const cycle = entries.length * rowHeight;
    const first = cycle - (visibleRows - 1) * rowHeight;

    // A cached homepage can be reattached with its scroll container reset.
    if (!offset) board.scrollTop = initialRow * rowHeight;
    else if (offset < first - 1) board.scrollTop = offset + cycle;
    else if (offset > first + cycle + 1) board.scrollTop = offset - cycle;
  }

  function schedule() {
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    frame = 0;
    if (!inView || !rowHeight || !board.isConnected || document.hidden || reducedMotion.matches ||
        hovering || touchPaused || drag || board.matches(":focus-visible")) return;

    timer = window.setTimeout(() => {
      const from = board.scrollTop;
      const row = from / rowHeight;
      const to = Math.abs(row - Math.round(row)) * rowHeight < 1
        ? (Math.round(row) + 1) * rowHeight
        : Math.ceil(row) * rowHeight;
      const start = performance.now();

      function move(now) {
        const progress = Math.min(1, (now - start) / 420);
        board.scrollTop = from + (to - from) * (1 - (1 - progress) ** 3);
        if (progress < 1) frame = requestAnimationFrame(move);
        else {
          wrapScroll();
          schedule();
        }
      }

      frame = requestAnimationFrame(move);
    }, 1500);
  }

  function sizeCarousel() {
    if (!board.isConnected) return;
    let row = rowHeight && board.scrollTop ? board.scrollTop / rowHeight : initialRow;
    const nearestRow = Math.round(row);
    if (frame || Math.abs(row - nearestRow) * rowHeight < 2) row = nearestRow;
    const nextHeight = parseFloat(getComputedStyle(entries[0]).height);

    if (!nextHeight || Math.abs(nextHeight - rowHeight) < 0.01) return;
    rowHeight = nextHeight;
    board.style.setProperty("--timeline-height", `${rowHeight * visibleRows + 1}px`);
    board.scrollTop = row * rowHeight;
    wrapScroll();
    schedule();
  }

  // Cover breakpoint changes, font loads, and education content wrapping.
  const resize = new ResizeObserver(sizeCarousel);
  resize.observe(track);
  sizeCarousel();

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) {
      hovering = false;
      touchPaused = false;
    } else {
      wrapScroll();
    }
    schedule();
  }).observe(board);

  board.addEventListener("scroll", () => {
    if (!frame) wrapScroll();
  }, { passive: true });
  board.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    hovering = true;
    schedule();
  });
  board.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse") return;
    hovering = false;
    schedule();
  });
  board.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    if (event.pointerType === "touch") {
      touchPaused = true;
    } else {
      event.preventDefault();
      drag = { id: event.pointerId, y: event.clientY };
      board.setPointerCapture(event.pointerId);
      board.classList.add("is-dragging");
    }
    schedule();
  });
  board.addEventListener("pointermove", (event) => {
    if (event.pointerId !== drag?.id) return;
    board.scrollTop += (drag.y - event.clientY) / (board.currentCSSZoom || 1);
    drag.y = event.clientY;
    wrapScroll();
  });
  board.addEventListener("lostpointercapture", (event) => {
    if (event.pointerId !== drag?.id) return;
    drag = undefined;
    hovering = board.matches(":hover");
    board.classList.remove("is-dragging");
    schedule();
  });

  function releaseTouch() {
    if (!touchPaused) return;
    touchPaused = false;
    schedule();
  }

  document.addEventListener("pointerdown", (event) => {
    if (!board.contains(event.target)) releaseTouch();
  });
  window.addEventListener("scroll", releaseTouch, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  reducedMotion.addEventListener("change", schedule);
  board.addEventListener("focus", schedule);
  board.addEventListener("blur", schedule);
}

function initAtlasTicker() {
  const track = document.querySelector(".atlas-ticker-track");
  if (!track || track.hasChildNodes()) return;

  const list = document.createElement("ul");
  list.className = "atlas-ticker-list";
  list.setAttribute("role", "list");
  countries.forEach(({ title, status }) => {
    const item = document.createElement("li");
    const description = document.createElement("span");
    description.className = "visually-hidden";
    description.textContent = status === "lived" ? " (lived)" : " (visited)";
    item.classList.toggle("is-lived", status === "lived");
    item.append(title, description);
    list.append(item);
  });

  const repeat = list.cloneNode(true);
  repeat.setAttribute("aria-hidden", "true");
  track.append(list, repeat);
}

function initializeHomePage() {
  initLatestCarousel();
  initExperienceCarousel();
  initAtlasTicker();
}

window.addEventListener("scroll", updateScrollMeter, { passive: true });
updateScrollMeter();
updateArchiveStats();
initSectionNav();
initializeHomePage();
renderWorldMap();

window.initializeHomePage = initializeHomePage;
