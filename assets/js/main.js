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

function updateScrollMeter() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollMeter.style.width = `${progress * 100}%`;
}

function initSectionNav() {
  const links = [...document.querySelectorAll("[data-section-nav]")];
  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionNav))
    .filter(Boolean);
  if (!links.length || !sections.length) return;

  let isScheduled = false;
  const updateSectionNav = () => {
    isScheduled = false;
    const viewportCenter = window.innerHeight / 2;
    const centeredSection = sections.find((section) => {
      const { top, bottom } = section.getBoundingClientRect();
      return top <= viewportCenter && bottom > viewportCenter;
    });
    const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const currentSection = centeredSection || (isAtPageBottom ? sections.at(-1) : null);

    links.forEach((link) => {
      link.classList.toggle("is-current", link.dataset.sectionNav === currentSection?.id);
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
      const section = document.getElementById(link.dataset.sectionNav);
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

function initLatestCarousel() {
  const carousel = document.querySelector("[data-latest-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector(".latest-track");
  const cards = [...carousel.querySelectorAll("[data-latest-card]")];
  const dots = [...carousel.querySelectorAll("[data-latest-dot]")];
  const previous = carousel.querySelector("[data-latest-previous]");
  const next = carousel.querySelector("[data-latest-next]");
  const current = carousel.querySelector("#latestCurrent");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!track || cards.length < 2) return;

  const mediaStages = [...carousel.querySelectorAll(".media-roll")];

  const startMediaRoll = (stage) => {
    const frames = [...stage.querySelectorAll("figure")];
    if (frames.length < 2 || stage.dataset.duplicated) return;

    frames.forEach((frame) => {
      const duplicate = frame.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.querySelector("img")?.setAttribute("alt", "");
      stage.append(duplicate);
    });

    stage.dataset.duplicated = "true";

    const syncMediaRoll = () => {
      const duplicateStart = stage.children[frames.length];
      const distance = duplicateStart.offsetLeft - stage.children[0].offsetLeft;
      stage.style.setProperty("--media-roll-distance", `${distance}px`);
      stage.style.setProperty("--media-roll-duration", `${Math.max(45, distance / 24)}s`);
      stage.classList.toggle("is-scrolling", distance > 0 && !prefersReducedMotion);
    };

    window.addEventListener("resize", syncMediaRoll, { passive: true });
    window.addEventListener("load", syncMediaRoll, { once: true });
    syncMediaRoll();
  };

  mediaStages.forEach(startMediaRoll);

  let activeIndex = 0;
  let autoTimer;
  let isPaused = false;

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
      if (!document.hidden && !isPaused) setLatest(activeIndex + 1);
    }, 10000);
  };

  const pauseAuto = () => {
    isPaused = true;
  };

  const resumeAuto = () => {
    isPaused = false;
    restartAuto();
  };

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

  carousel.addEventListener("mouseenter", pauseAuto);
  carousel.addEventListener("mouseleave", resumeAuto);
  carousel.addEventListener("focusin", pauseAuto);
  carousel.addEventListener("focusout", resumeAuto);
  carousel.addEventListener("touchstart", pauseAuto, { passive: true });
  carousel.addEventListener("touchend", resumeAuto, { passive: true });

  track.addEventListener(
    "scroll",
    () => {
      const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      if (index !== activeIndex) setLatest(index, false);
    },
    { passive: true }
  );

  setLatest(0, false);
  restartAuto();
}

function setCountry(countryId) {
  const country = countries.find((entry) => entry.id === String(countryId));
  if (!country) return;
  mapPopover.classList.add("is-visible");
  popoverTitle.textContent = country.title;
  document.querySelectorAll(".country").forEach((countryShape) => {
    countryShape.classList.toggle("is-active", countryShape.dataset.country === String(countryId));
  });
}

function clearCountry() {
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

  mapHost.replaceChildren();

  const width = 960;
  const height = 460;
  const svg = d3
    .select(mapHost)
    .append("svg")
    .attr("class", "world-map")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Hoverable real country outlines");

  try {
    const world = window.WORLD_COUNTRIES_TOPOLOGY || (await d3.json("assets/data/countries-110m.json"));
    const features = topojson.feature(world, world.objects.countries).features;
    const projection = d3.geoNaturalEarth1().fitExtent([[8, 10], [width - 8, height - 16]], {
      type: "Sphere",
    });
    const path = d3.geoPath(projection);

    const countryPaths = svg
      .append("g")
      .selectAll("path")
      .data(features)
      .join("path")
      .attr("class", (feature) => {
        const id = String(feature.id);
        const state = livedCountryIds.has(id) ? " is-lived" : visitedCountryIds.has(id) ? " is-visited" : "";
        return `country${state}`;
      })
      .attr("data-country", (feature) => String(feature.id))
      .attr("tabindex", (feature) => (interactiveCountryIds.has(String(feature.id)) ? 0 : -1))
      .attr("aria-label", (feature) => (interactiveCountryIds.has(String(feature.id)) ? `${countries.find((country) => country.id === String(feature.id))?.title} country name` : "Country border"))
      .attr("d", path);

    countryPaths.each(function (feature) {
      const id = String(feature.id);
      if (!interactiveCountryIds.has(id)) return;
      const activate = () => setCountry(id);
      this.addEventListener("mouseenter", activate);
      this.addEventListener("mouseover", activate);
      this.addEventListener("mouseleave", clearCountry);
      this.addEventListener("focus", activate);
      this.addEventListener("click", activate);
      this.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });

    mapHost.addEventListener("mouseover", (event) => {
      const target = event.target.closest?.(".country");
      if (target && interactiveCountryIds.has(target.dataset.country)) {
        setCountry(target.dataset.country);
      }
    });

    mapHost.addEventListener("mousemove", (event) => {
      const target = event.target.closest?.(".country");
      if (!target || !interactiveCountryIds.has(target.dataset.country)) {
        clearCountry();
      }
    });

    mapHost.addEventListener("click", (event) => {
      const target = event.target.closest?.(".country");
      if (target && interactiveCountryIds.has(target.dataset.country)) {
        setCountry(target.dataset.country);
      }
    });

    mapHost.addEventListener("focusin", (event) => {
      const target = event.target.closest?.(".country");
      if (target && interactiveCountryIds.has(target.dataset.country)) {
        setCountry(target.dataset.country);
      }
    });

    mapHost.addEventListener("focusout", () => {
      clearCountry();
    });

    mapHost.addEventListener("keydown", (event) => {
      const target = event.target.closest?.(".country");
      if (target && interactiveCountryIds.has(target.dataset.country) && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        setCountry(target.dataset.country);
      }
    });

    mapHost.addEventListener("mouseleave", () => {
      clearCountry();
    });

  } catch (error) {
    mapHost.classList.add("map-fallback");
  }
}

window.addEventListener("scroll", updateScrollMeter, { passive: true });
updateScrollMeter();
initSectionNav();
initLatestCarousel();

document.querySelectorAll(".timeline-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    document.querySelectorAll(".timeline-item").forEach((otherItem) => {
      otherItem.classList.toggle("is-active", otherItem === item);
    });
  });
});

renderWorldMap();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section, .hero-console, .project-tile").forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});
