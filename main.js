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
    meta: "Peru / altitude",
    title: "Peru",
    detail: "Travel dates: add dates. Sights: Andes, Lima, Sacred Valley, altitude, stonework, terrain, and movement through scale.",
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80&sat=-10",
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
const visitedCountryIds = new Set(countries.map((country) => country.id));

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
    const world = window.WORLD_COUNTRIES_TOPOLOGY || (await d3.json("assets/countries-110m.json"));
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
        return `country${visitedCountryIds.has(id) ? " is-visited" : ""}`;
      })
      .attr("data-country", (feature) => String(feature.id))
      .attr("tabindex", (feature) => (visitedCountryIds.has(String(feature.id)) ? 0 : -1))
      .attr("aria-label", (feature) => (visitedCountryIds.has(String(feature.id)) ? `${countries.find((country) => country.id === String(feature.id))?.title} travel details` : "Country border"))
      .attr("d", path);

    countryPaths.each(function (feature) {
      const id = String(feature.id);
      if (!visitedCountryIds.has(id)) return;
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
      if (target && visitedCountryIds.has(target.dataset.country)) {
        setCountry(target.dataset.country);
      }
    });

    mapHost.addEventListener("click", (event) => {
      const target = event.target.closest?.(".country");
      if (target && visitedCountryIds.has(target.dataset.country)) {
        setCountry(target.dataset.country);
      }
    });

    mapHost.addEventListener("focusin", (event) => {
      const target = event.target.closest?.(".country");
      if (target && visitedCountryIds.has(target.dataset.country)) {
        setCountry(target.dataset.country);
      }
    });

    mapHost.addEventListener("keydown", (event) => {
      const target = event.target.closest?.(".country");
      if (target && visitedCountryIds.has(target.dataset.country) && (event.key === "Enter" || event.key === " ")) {
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
