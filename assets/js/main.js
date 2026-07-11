const focusItems = [
  {
    code: "KG-01",
    title: "MAP Rover",
    body:
      "Mobile Autonomous Pathfinder combines a web and GPS-enabled rover, onboard low-resolution object detection, SLAM, EKF, and mile-scale endurance.",
    accent: "var(--oxide)",
    range: "1+ mile",
    stack: "SLAM / EKF",
    evidence: "field rover",
  },
  {
    code: "KG-02",
    title: "MARTHA",
    body:
      "Monitoring and Restriction-Tracking Hotspot Application was a distancing and de-densification iOS app and webpage for mitigating Covid-19 spreader events.",
    accent: "var(--cyan)",
    range: "campus",
    stack: "iOS / web",
    evidence: "finalist",
  },
  {
    code: "KG-03",
    title: "SAFE",
    body:
      "Smart Assistance for Elders combined an app, AI model, and sensor pod to predict and prevent temperature-stress conditions in elderly households.",
    accent: "var(--violet)",
    range: "pilot",
    stack: "ML / sensor",
    evidence: "papers",
  },
];

const countries = [
  {
    id: "840",
    status: "lived",
    meta: "United States / build base",
    title: "United States",
    detail: "Travel dates: 2021-present. Sights: robotics labs, Bay Area hardware spaces, road trips, demo days, national parks.",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "604",
    status: "visited",
    meta: "Peru / altitude",
    title: "Peru",
    detail: "Travel dates: add dates. Sights: Andes, Lima, Sacred Valley, altitude, stonework, terrain, and movement through scale.",
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80&sat=-10",
    ],
  },
  {
    id: "124",
    status: "visited",
    meta: "Canada / northward routes",
    title: "Canada",
    detail: "Travel dates: add dates. Sights: city texture, coastlines, engineering corridors, mountain scale, and long-distance road movement.",
    images: [
      "https://images.unsplash.com/photo-1503614472-8c93d56cd587?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "484",
    status: "visited",
    meta: "Mexico / built texture",
    title: "Mexico",
    detail: "Travel dates: add dates. Sights: layered cities, food, coastline, plazas, ruins, and color-rich public space.",
    images: [
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "044",
    status: "visited",
    meta: "Bahamas / island water",
    title: "Bahamas",
    detail: "Travel dates: add dates. Sights: shallow water gradients, island pace, reefs, beaches, and coastal light.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "388",
    status: "visited",
    meta: "Jamaica / Caribbean rhythm",
    title: "Jamaica",
    detail: "Travel dates: add dates. Sights: coast, music, food, mountain roads, beaches, and humid green landscapes.",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "076",
    status: "visited",
    meta: "Brazil / scale and motion",
    title: "Brazil",
    detail: "Travel dates: add dates. Sights: city scale, coastline, rainforest edges, music, football, and vast geographic range.",
    images: [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "032",
    status: "visited",
    meta: "Argentina / southbound scale",
    title: "Argentina",
    detail: "Travel dates: add dates. Sights: Buenos Aires, open landscapes, mountains, steak, architecture, and Patagonian distance.",
    images: [
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "554",
    status: "visited",
    meta: "New Zealand / terrain",
    title: "New Zealand",
    detail: "Travel dates: add dates. Sights: alpine roads, water, volcanic terrain, coastal towns, and cinematic landscape shifts.",
    images: [
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "036",
    status: "lived",
    meta: "Australia / lived chapter",
    title: "Australia",
    detail: "Lived-in chapter. Add dates, cities, routines, favorite places, and the everyday context that made the country feel personal.",
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "528",
    status: "lived",
    meta: "Netherlands / lived chapter",
    title: "Netherlands",
    detail: "Lived-in chapter. Add dates, cities, school years, daily routes, canals, bikes, public systems, and design details.",
    images: [
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "300",
    status: "lived",
    meta: "Greece / lived chapter",
    title: "Greece",
    detail: "Lived-in chapter. Add dates, cities, family context, coastlines, ruins, islands, food, and routines that shaped memory.",
    images: [
      "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

const scrollMeter = document.querySelector(".scroll-meter");
const focusStage = document.querySelector("#focusStage");
const focusCode = document.querySelector("#focusCode");
const focusTitle = document.querySelector("#focusTitle");
const popoverMeta = document.querySelector("#popoverMeta");
const popoverTitle = document.querySelector("#popoverTitle");
const popoverDetail = document.querySelector("#popoverDetail");
const popoverImageA = document.querySelector("#popoverImageA");
const popoverImageB = document.querySelector("#popoverImageB");
const mapPopover = document.querySelector("#mapPopover");
const interactiveCountryIds = new Set(countries.map((country) => country.id));
const livedCountryIds = new Set(countries.filter((country) => country.status === "lived").map((country) => country.id));
const visitedCountryIds = new Set(countries.filter((country) => country.status !== "lived").map((country) => country.id));

function updateScrollMeter() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollMeter.style.width = `${progress * 100}%`;
}

function setFocus(index) {
  const item = focusItems[index];
  if (focusCode) focusCode.textContent = item.code;
  if (focusTitle) focusTitle.textContent = item.title;
  focusStage.style.setProperty("--stage-accent", item.accent);
}

function initLatestCarousel() {
  const carousel = document.querySelector("[data-latest-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector(".latest-track");
  const cards = [...carousel.querySelectorAll("[data-latest-card]")];
  const dots = [...carousel.querySelectorAll("[data-latest-dot]")];
  if (!track || cards.length < 2) return;

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
    });
    if (shouldScroll) {
      track.scrollTo({ left: track.clientWidth * activeIndex, behavior: "smooth" });
    }
  };

  const restartAuto = () => {
    window.clearInterval(autoTimer);
    autoTimer = window.setInterval(() => {
      if (!document.hidden && !isPaused) setLatest(activeIndex + 1);
    }, 15000);
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
  popoverMeta.textContent = country.meta;
  popoverTitle.textContent = country.title;
  popoverDetail.textContent = country.detail;
  popoverImageA.src = country.images[0];
  popoverImageB.src = country.images[1];
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
      .attr("aria-label", (feature) => (interactiveCountryIds.has(String(feature.id)) ? `${countries.find((country) => country.id === String(feature.id))?.title} travel details` : "Country border"))
      .attr("d", path);

    countryPaths.each(function (feature) {
      const id = String(feature.id);
      if (!interactiveCountryIds.has(id)) return;
      const activate = () => setCountry(id);
      this.addEventListener("mouseenter", activate);
      this.addEventListener("mouseover", activate);
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
initLatestCarousel();

document.querySelectorAll(".project-tile").forEach((tile) => {
  const activateTile = () => {
    const index = Number(tile.dataset.focus);
    setFocus(index);
    document.querySelectorAll(".project-tile").forEach((otherTile) => {
      otherTile.classList.toggle("is-active", otherTile === tile);
    });
  };
  tile.addEventListener("mouseenter", activateTile);
  tile.addEventListener("focus", activateTile);
});

setFocus(0);

document.querySelectorAll(".hero-interactions span").forEach((signal) => {
  const activateSignal = () => {
    document.querySelectorAll(".hero-interactions span").forEach((item) => {
      item.classList.toggle("is-active", item === signal);
    });
  };
  signal.addEventListener("mouseenter", activateSignal);
  signal.addEventListener("focus", activateSignal);
});

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
