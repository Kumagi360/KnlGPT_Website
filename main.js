const focusItems = [
  {
    code: "KG-01",
    title: "Robotics Build",
    body:
      "Start with a small number of high-resolution stories. Each one can open into drawings, prototypes, clips, diagrams, and reflections.",
    accent: "var(--oxide)",
  },
  {
    code: "KG-02",
    title: "Founder File",
    body:
      "Venture pages should feel like operating history: why the problem mattered, what was built, what changed, and what you learned.",
    accent: "var(--cyan)",
  },
  {
    code: "KG-03",
    title: "Motion Lab",
    body:
      "Smaller experiments can still feel magnetic when they are framed as test logs, constraints, failures, and physical proof.",
    accent: "var(--violet)",
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
const focusBody = document.querySelector("#focusBody");
const focusCode = document.querySelector("#focusCode");
const focusTitle = document.querySelector("#focusTitle");
const popoverMeta = document.querySelector("#popoverMeta");
const popoverTitle = document.querySelector("#popoverTitle");
const popoverDetail = document.querySelector("#popoverDetail");
const popoverImageA = document.querySelector("#popoverImageA");
const popoverImageB = document.querySelector("#popoverImageB");
const mapPopover = document.querySelector("#mapPopover");
const portraitLabel = document.querySelector(".portrait-label");
const videoChip = document.querySelector(".video-chip");
const visitedCountryIds = new Set(countries.map((country) => country.id));

function updateScrollMeter() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  scrollMeter.style.width = `${progress * 100}%`;
}

function setFocus(index) {
  const item = focusItems[index];
  focusCode.textContent = item.code;
  focusTitle.textContent = item.title;
  focusBody.textContent = item.body;
  focusStage.style.setProperty("--stage-accent", item.accent);
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

document.querySelectorAll(".hero-interactions span").forEach((signal) => {
  const activateSignal = () => {
    document.querySelectorAll(".hero-interactions span").forEach((item) => {
      item.classList.toggle("is-active", item === signal);
    });
    if (portraitLabel) portraitLabel.textContent = signal.dataset.consoleLabel;
    if (videoChip) videoChip.textContent = signal.dataset.consoleChip;
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
