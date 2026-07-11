function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  let active = "";

  if (path === "index.html" || path === "") active = "home";
  if (path.startsWith("projects") || document.body.classList.contains("projects-page")) active = "projects";
  if (path === "blog.html" || document.body.classList.contains("blog-post-page")) active = "blog";
  if (path === "til.html" || document.body.classList.contains("til-index-page") || document.body.classList.contains("til-post-page")) active = "til";

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-current", link.dataset.nav === active);
  });
}

function initAmbientBackground() {
  let background = document.querySelector(".schematic-bg");

  if (!background) {
    background = document.createElement("div");
    background.setAttribute("aria-hidden", "true");
    document.body.prepend(background);
  }

  const body = document.body.classList;
  const pageKey = body.contains("til-index-page")
    ? "til"
    : body.contains("blog-index-page")
      ? "blog"
      : body.contains("blog-post-page") || body.contains("til-post-page")
        ? "post"
        : body.contains("projects-page")
          ? "projects"
          : "home";

  if (background.dataset.ambientKey === pageKey) return;
  background.dataset.ambientKey = pageKey;
  background.className = `schematic-bg schematic-bg-${pageKey}`;

  const labels = (a, b, c, d = "loop closure residual &lt; gate") => `
    <span class="bg-label bg-label-a">${a}</span>
    <span class="bg-label bg-label-b">${b}</span>
    <span class="bg-label bg-label-c">${c}</span>
    <span class="bg-label bg-label-d">${d}</span>
  `;

  const blockDiagram = (a, b, c, d) => `
    <div class="bg-block bg-block-a">
      <span>${a}</span>
      <span>${b}</span>
      <span>${c}</span>
      <span>${d}</span>
    </div>
  `;

  const pcb = (classes, titleA = "FUSION MCU", titleB = "SENSOR BUS") => `
    <svg class="bg-drawing bg-entity ${classes}" viewBox="0 0 760 460" aria-hidden="true">
      <path d="M54 58h652v342H54z" />
      <path d="M104 106h128v82H104zM332 88h126v142H332zM548 124h92v92h-92zM124 294h176v54H124z" />
      <path d="M232 148h100M458 158h90M640 170h44M392 230v92H300M202 294V188M548 216v112H392M104 148H68" />
      <path d="M88 254h98l26-36h106l30 44h94l32-58h92l36 50h88" />
      <path d="M156 106V74M204 106V74M396 88V54M592 124V84M300 322h172M124 348H78" />
      <circle cx="232" cy="148" r="8" /><circle cx="332" cy="148" r="8" /><circle cx="458" cy="158" r="8" /><circle cx="548" cy="170" r="8" /><circle cx="300" cy="322" r="8" /><circle cx="472" cy="322" r="8" /><circle cx="684" cy="170" r="8" />
      <circle cx="154" cy="254" r="5" /><circle cx="252" cy="218" r="5" /><circle cx="348" cy="262" r="5" /><circle cx="474" cy="204" r="5" /><circle cx="604" cy="254" r="5" />
      <text x="104" y="96">${titleB}</text><text x="332" y="78">${titleA}</text><text x="548" y="114">CAN FD</text><text x="124" y="286">POWER ISLAND</text>
    </svg>
  `;

  const gearbox = (classes) => `
    <svg class="bg-drawing bg-entity ${classes}" viewBox="0 0 740 440" aria-hidden="true">
      <path d="M58 222h624" />
      <path d="M84 176h122l36-58h220l34 58h98v92h-96l-36 58H242l-38-58H84z" />
      <path d="M124 198h458v48H124zM250 148h90v148h-90zM424 148h90v148h-90z" />
      <path d="M98 176v-34h92v34M98 268v34h92v-34M546 176v-34h82v34M546 268v34h82v-34" />
      <circle cx="296" cy="222" r="54" /><circle cx="296" cy="222" r="32" /><circle cx="296" cy="222" r="12" />
      <circle cx="468" cy="222" r="46" /><circle cx="468" cy="222" r="27" /><circle cx="468" cy="222" r="10" />
      <path d="M166 192h34M166 252h34M546 192h30M546 252h30" />
      <path d="M250 148l90 148M340 148l-90 148M424 148l90 148M514 148l-90 148" />
      <path d="M86 336h536M86 336v20M622 336v20M106 356h496" />
      <path d="M248 92h92M424 92h90M294 92v54M468 92v54" />
      <path d="M150 142l18-44h70M590 142l-18-44h-70M118 302l-36 54h88M548 302l30 54h84" />
      <circle cx="116" cy="160" r="9" /><circle cx="622" cy="160" r="9" /><circle cx="116" cy="284" r="9" /><circle cx="622" cy="284" r="9" />
      <text x="250" y="84">6205 bearing pair</text><text x="424" y="84">output seal stack</text><text x="94" y="372">section A-A / machined housing</text>
    </svg>
  `;

  const linkage = (classes) => `
    <svg class="bg-drawing bg-entity ${classes}" viewBox="0 0 680 400" aria-hidden="true">
      <path d="M70 310h442M138 310 242 118 386 158 512 310" />
      <path d="M242 118 320 310M386 158 320 310M178 86c98-50 238-42 344 30" />
      <path d="M118 340h112M474 340h96M214 100l-56-62M410 140l88-56M320 310l46 52" />
      <circle cx="138" cy="310" r="30" /><circle cx="242" cy="118" r="22" /><circle cx="386" cy="158" r="22" /><circle cx="512" cy="310" r="30" /><circle cx="320" cy="310" r="17" />
      <text x="104" y="296">ground pivot</text><text x="214" y="104">input link</text><text x="394" y="152">coupler</text><text x="482" y="296">rocker</text>
    </svg>
  `;

  const waveform = (classes) => `
    <svg class="bg-drawing bg-entity ${classes}" viewBox="0 0 760 400" aria-hidden="true">
      <path d="M82 88h560M82 152h560M82 216h560M82 280h560" />
      <path d="M126 88c52 64 84 66 138 0s90-58 142 0 84 62 142 0" />
      <path d="M126 152h88l26-34 32 68 34-68 32 68 28-34h130" />
      <path d="M126 216h98l24-38h104l30 54h96l38-48h110" />
      <path d="M126 280h138v-52h102v52h140v-82h98v82" />
      <text x="82" y="76">CLK</text><text x="82" y="140">ADC</text><text x="82" y="204">PWM</text><text x="82" y="268">FSM</text>
    </svg>
  `;

  const stateMachine = (classes) => `
    <svg class="bg-drawing bg-entity ${classes}" viewBox="0 0 660 360" aria-hidden="true">
      <circle cx="112" cy="184" r="50" /><circle cx="286" cy="104" r="54" /><circle cx="446" cy="226" r="58" /><circle cx="566" cy="116" r="42" />
      <path d="M158 164 236 126M332 130 398 190M500 194 538 142M402 252 158 208M162 200c90 70 250 78 372 18" />
      <path d="M222 122l18 4-11 15M386 182l18 8-17 11M530 138l17 2-8 15M174 210l-17-4 12-14" />
      <text x="88" y="188">IDLE</text><text x="254" y="108">SEEK</text><text x="412" y="230">TRACK</text><text x="542" y="120">ACT</text>
    </svg>
  `;

  const schematic = (classes) => `
    <svg class="bg-drawing bg-entity ${classes}" viewBox="0 0 700 390" aria-hidden="true">
      <path d="M50 196h50M122 196h60M182 166v60M198 166v60M198 196h50" />
      <path d="M248 196h58l18-30 24 60 24-60 24 60 18-30h60" />
      <path d="M474 128v136l126-68zM414 196h60M600 196h52" />
      <path d="M532 112v-48h74M532 280v46h74M356 116v-52h78M356 276v50h78" />
      <path d="M306 114h50M306 278h50M606 64h34M606 326h34" />
      <path d="M250 196v-78h56M250 196v82h56M652 196v-68h-46M652 196v76h-46" />
      <circle cx="50" cy="196" r="7" /><circle cx="248" cy="196" r="6" /><circle cx="414" cy="196" r="6" /><circle cx="600" cy="196" r="6" /><circle cx="652" cy="196" r="7" />
      <path d="M530 156h52M556 140v32M530 236h52M556 220v32" />
      <path d="M118 248v38M102 286h32M108 298h20M114 310h8M626 128v38M610 166h32M616 178h20M622 190h8" />
      <text x="52" y="184">IN</text><text x="308" y="106">R9</text><text x="388" y="56">C4 100n</text><text x="500" y="118">U2A</text><text x="612" y="184">OUT</text>
    </svg>
  `;

  const densePcb = (classes) => `
    <svg class="bg-drawing bg-entity ${classes}" viewBox="0 0 720 420" aria-hidden="true">
      <path d="M54 54h612v306H54z" />
      <path d="M74 78h552v34H74zM74 320h552v24H74z" />
      <path d="M116 140h76v54h-76zM270 104h100v114H270zM474 132h96v72h-96zM142 260h132v42H142zM430 256h122v48H430z" />
      <path d="M192 166h78M370 154h104M570 168h52M320 218v62H274M204 260v-66M474 204v78h-44M552 282h58M116 166H78" />
      <path d="M90 230h72l20-24h86l28 34h76l28-44h82l34 34h104" />
      <path d="M100 148h-26v118h68M150 140V84M180 140V84M320 104V76M344 104V76M516 132V92M536 132V92" />
      <path d="M246 282h52v48M346 218h44v104M430 282h-40M570 204h34v76" />
      <path d="M142 302H96v-42M274 302h42v38M552 304h56v-72" />
      <circle cx="192" cy="166" r="6" /><circle cx="270" cy="166" r="6" /><circle cx="370" cy="154" r="6" /><circle cx="474" cy="168" r="6" /><circle cx="274" cy="280" r="6" /><circle cx="390" cy="282" r="6" /><circle cx="610" cy="282" r="6" />
      <circle cx="162" cy="230" r="4" /><circle cx="268" cy="206" r="4" /><circle cx="372" cy="240" r="4" /><circle cx="482" cy="196" r="4" /><circle cx="620" cy="230" r="4" /><circle cx="96" cy="302" r="4" /><circle cx="316" cy="340" r="4" />
      <text x="116" y="132">QFN ADC</text><text x="270" y="96">MCU 64</text><text x="474" y="124">DRV</text><text x="142" y="252">DECOUPLING</text>
    </svg>
  `;

  const backgrounds = {
    home: `
      ${linkage("bg-entity-a")}
      ${pcb("bg-entity-b", "FUSION MCU", "IMU ARRAY")}
      ${gearbox("bg-entity-c")}
      ${waveform("bg-entity-d")}
      ${schematic("bg-entity-e")}
      ${densePcb("bg-entity-f")}
      <pre class="bg-code bg-code-a">pose_t predict(pose_t x, imu_t u) {
  x.v += rotate(u.accel) * dt;
  x.p += x.v * dt;
}</pre>
      <pre class="bg-code bg-code-b">constraint.solve({
  jacobian: J,
  damping: 0.04,
  residual: eps
});</pre>
      <pre class="bg-code bg-code-c">servo.loop({
  mode: "impedance",
  observer: kalman,
  contact: guarded
});</pre>
      ${blockDiagram("SENSE", "LOCALIZE", "PLAN", "ACTUATE")}
      ${labels("DH theta / alpha / r", "netclass: SENSOR_DIFF_90R", "EKF residual &lt; gate", "fixture datum B2")}
    `,
    projects: `
      ${gearbox("bg-entity-a")}
      ${pcb("bg-entity-b", "BMS AFE", "BUCK 5V")}
      ${linkage("bg-entity-c")}
      ${stateMachine("bg-entity-d")}
      ${densePcb("bg-entity-e")}
      ${schematic("bg-entity-f")}
      <pre class="bg-code bg-code-a">test.run(\"thermal-soak\", {
  load: 0.82,
  duration: 1800,
  fixture: \"A/B/C\"
});</pre>
      <pre class="bg-code bg-code-b">daq.stream({
  phase_current: true,
  encoder_ticks: 4096,
  fault_latch: rising
});</pre>
      <pre class="bg-code bg-code-c">robot.cell.validate({
  e_stop: latched,
  backlash: "&lt; 0.18deg",
  repeatability: "P95"
});</pre>
      ${blockDiagram("FIXTURE", "CALIBRATE", "LOAD TEST", "SHIP")}
      ${labels("GD&amp;T: flatness 0.08", "stackup: 4L / GND pour", "torque margin 1.7x", "CAN heartbeat 100 Hz")}
    `,
    blog: `
      ${stateMachine("bg-entity-a")}
      ${linkage("bg-entity-b")}
      ${waveform("bg-entity-c")}
      ${pcb("bg-entity-d", "NOTE INDEX", "SOURCE BUS")}
      ${schematic("bg-entity-e")}
      ${densePcb("bg-entity-f")}
      <pre class="bg-code bg-code-a">note.index({
  tag: selected,
  status: \"draft|shipped\",
  evidence: linked
});</pre>
      <pre class="bg-code bg-code-b">frontier.rank(entry) =
  novelty * evidence
  - handwave_penalty;</pre>
      <pre class="bg-code bg-code-c">analysis.trace({
  actuator: "series elastic",
  claim: grounded,
  revision: open
});</pre>
      ${blockDiagram("OBSERVE", "ABSTRACT", "ARGUE", "REVISE")}
      ${labels("field note / revision lane", "source graph: robotics_founder_travel", "quote block checksum", "outline depth <= 3")}
    `,
    til: `
      ${waveform("bg-entity-a")}
      ${pcb("bg-entity-b", "INGEST MCU", "NEWSLETTER BUS")}
      ${stateMachine("bg-entity-c")}
      ${gearbox("bg-entity-d")}
      ${schematic("bg-entity-e")}
      ${densePcb("bg-entity-f")}
      <pre class="bg-code bg-code-a">gear.window.reduce({
  critical: top(2),
  happenings: cap(6),
  ideas: threshold(0.72)
});</pre>
      <pre class="bg-code bg-code-b">dedupe.cluster({
  source_hash,
  claim_vector,
  timebox: \"daily\"
});</pre>
      <pre class="bg-code bg-code-c">robotics.watch({
  autonomy: rising,
  manipulation: tracked,
  hardware: tagged
});</pre>
      ${blockDiagram("INGEST", "FILTER", "CLUSTER", "BRIEF")}
      ${labels("aggregation lane / first gear", "topic vector: AI robotics markets", "idea score > shipping threshold", "source freshness: 24h")}
    `,
    post: `
      ${waveform("bg-entity-a")}
      ${stateMachine("bg-entity-b")}
      ${pcb("bg-entity-c", "REFERENCE MCU", "SOURCE BUS")}
      ${linkage("bg-entity-d")}
      ${schematic("bg-entity-e")}
      ${densePcb("bg-entity-f")}
      <pre class="bg-code bg-code-a">source.window.filter({
  novelty: \">= medium\",
  evidence: \"linked\",
  actionability: true
});</pre>
      <pre class="bg-code bg-code-b">draft.render({
  claims: verified,
  media: remote,
  next_action: explicit
});</pre>
      <pre class="bg-code bg-code-c">post.audit({
  subsystem: "robotics stack",
  citations: checked,
  images: remote
});</pre>
      ${blockDiagram("SOURCE", "VERIFY", "SYNTHESIZE", "PUBLISH")}
      ${labels("post background / shared", "citation graph locked", "media remains remote", "revision state: editable")}
    `,
  };

  background.innerHTML = backgrounds[pageKey];
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
