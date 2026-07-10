function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  let active = "";

  if (path === "index.html" || path === "") active = "home";
  if (path.startsWith("projects")) active = "projects";
  if (path === "blog.html") active = "blog";
  if (path === "til.html" || path.startsWith("til-")) active = "til";

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-current", link.dataset.nav === active);
  });
}

function initAmbientBackground() {
  let background = document.querySelector(".schematic-bg");
  const createdBackground = !background;

  if (!background) {
    background = document.createElement("div");
    background.className = "schematic-bg";
    background.setAttribute("aria-hidden", "true");
    document.body.prepend(background);
  }

  if (background.dataset.ambientExpanded === "true") return;
  background.dataset.ambientExpanded = "true";

  if (createdBackground) {
    background.insertAdjacentHTML(
      "beforeend",
      `
        <svg class="bg-drawing bg-circuit" viewBox="0 0 520 260" aria-hidden="true">
          <path d="M20 130h80l24-34 34 68 34-68 34 68 24-34h56" />
          <path d="M306 74v112l112-56z" />
          <path d="M250 130h56M418 130h72" />
          <path d="M156 86v-46M156 174v48M348 56v-34M348 204v34" />
          <path d="M118 40h76M118 222h76M322 22h52M322 238h52" />
          <text x="24" y="118">VIN</text>
          <text x="386" y="96">OPA</text>
          <text x="454" y="118">VOUT</text>
        </svg>
        <svg class="bg-drawing bg-board" viewBox="0 0 620 360" aria-hidden="true">
          <path d="M52 54h516v252H52z" />
          <path d="M104 92h96v72h-96zM420 82h92v92h-92zM252 122h82v116h-82z" />
          <path d="M200 128h52M334 164h86M466 174v58h-96M104 164v82h148M512 128h54" />
          <path d="M122 246h130M292 238v54M334 210h36M104 92V58M200 92V58M466 82V48" />
          <circle cx="104" cy="246" r="8" /><circle cx="252" cy="246" r="8" /><circle cx="334" cy="164" r="8" /><circle cx="420" cy="164" r="8" />
          <text x="104" y="84">DRV8323</text>
          <text x="250" y="112">STM32</text>
        </svg>
        <svg class="bg-drawing bg-cad" viewBox="0 0 560 360" aria-hidden="true">
          <path d="M92 128 218 58h246l24 162-132 82H118z" />
          <path d="M218 58 246 220l-128 82M464 58 488 220l-132 82M246 220h242" />
          <ellipse cx="230" cy="150" rx="42" ry="56" />
          <ellipse cx="330" cy="145" rx="42" ry="56" />
          <ellipse cx="430" cy="140" rx="42" ry="56" />
          <path d="M174 262h212M150 286h178M116 124h338M130 104h310" />
          <text x="92" y="116">cast body</text>
          <text x="238" y="46">cylinder bank</text>
        </svg>
        <pre class="bg-code">module estimator (
  input  logic clk,
  input  logic [11:0] imu,
  output logic valid
);
  residual <= measurement - prediction;
end</pre>
        <pre class="bg-code bg-code-alt">if (frontier.visible) {
  plan.extend(frontier.pose);
  controller.track(plan);
}</pre>
      `,
    );
  }

  background.insertAdjacentHTML(
    "beforeend",
    `
      <svg class="bg-drawing bg-arm" viewBox="0 0 560 340" aria-hidden="true">
        <path d="M88 268h118l82-118 96 34 72-96" />
        <path d="M116 268 206 150 288 150 384 184 456 88" />
        <circle cx="116" cy="268" r="30" /><circle cx="206" cy="150" r="22" /><circle cx="288" cy="150" r="18" /><circle cx="384" cy="184" r="22" /><circle cx="456" cy="88" r="26" />
        <path d="M74 300h118M178 126l-56-52M408 164l72 38M432 68l48-38" />
        <text x="84" y="252">base</text>
        <text x="178" y="130">joint 2</text>
        <text x="398" y="170">wrist</text>
      </svg>
      <svg class="bg-drawing bg-routing" viewBox="0 0 620 360" aria-hidden="true">
        <path d="M56 62h508v236H56z" />
        <path d="M112 112h86v62h-86zM278 92h74v74h-74zM448 126h86v86h-86zM194 244h112v42H194z" />
        <path d="M198 144h80M352 130h96M492 212v54H306M250 244v-70M112 174v96h82M534 170h44" />
        <circle cx="198" cy="144" r="7" /><circle cx="278" cy="144" r="7" /><circle cx="352" cy="130" r="7" /><circle cx="448" cy="170" r="7" /><circle cx="306" cy="266" r="7" /><circle cx="578" cy="170" r="7" />
        <text x="112" y="104">SENSOR BUS</text>
        <text x="276" y="84">ROUTER</text>
        <text x="446" y="118">ACTUATOR</text>
      </svg>
      <svg class="bg-drawing bg-trajectory" viewBox="0 0 560 320" aria-hidden="true">
        <path d="M58 252c72-126 156-176 252-150s142 78 190 18" />
        <path d="M74 252h68M200 156h68M324 112h68M444 128h64" />
        <circle cx="74" cy="252" r="9" /><circle cx="200" cy="156" r="9" /><circle cx="324" cy="112" r="9" /><circle cx="444" cy="128" r="9" />
        <path d="M74 252l28 28M200 156l-24-32M324 112l18-38M444 128l42-26" />
        <text x="86" y="244">waypoint</text>
        <text x="316" y="104">spline</text>
      </svg>
      <svg class="bg-drawing bg-state" viewBox="0 0 500 300" aria-hidden="true">
        <path d="M72 88h102v54H72zM204 174h104v54H204zM338 88h102v54H338z" />
        <path d="M174 116c42 0 58 58 30 86M308 202c48 0 60-60 30-86M174 116h164" />
        <path d="M118 142v58h86M390 142v58h-82" />
        <text x="92" y="120">SEEK</text>
        <text x="226" y="206">TRACK</text>
        <text x="358" y="120">ACT</text>
      </svg>
      <pre class="bg-code bg-code-third">pose_t predict(pose_t x, imu_t u) {
  x.v += rotate(u.accel) * dt;
  x.p += x.v * dt;
  return correct_with_landmarks(x);
}</pre>
      <pre class="bg-code bg-code-fourth">graph.add_edge(scan, map, covariance);
solver.linearize();
if (residual < gate) commit(loop_closure);</pre>
    `,
  );
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
    card.addEventListener("mouseenter", () => card.classList.add("is-expanded"));
    card.addEventListener("mouseleave", () => {
      if (canHover) card.classList.remove("is-expanded");
    });
    card.addEventListener("focusin", () => card.classList.add("is-expanded"));
    card.addEventListener("focusout", () => card.classList.remove("is-expanded"));
    card.addEventListener("click", () => {
      card.classList.toggle("is-expanded");
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

initAmbientBackground();
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
