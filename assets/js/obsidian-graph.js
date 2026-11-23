(() => {
  const host = document.querySelector("#knowledgeGraph");
  const readout = document.querySelector("#graphReadout");
  const resetButton = document.querySelector(".graph-reset");
  if (!host || !window.d3) return;

  const setReadout = (message) => {
    if (readout) readout.textContent = message;
  };

  async function render() {
    try {
      let graph = window.OBSIDIAN_GRAPH_DATA;
      if (window.OBSIDIAN_GRAPH_SOURCE) {
        try {
          graph = await d3.json(`${window.OBSIDIAN_GRAPH_SOURCE}?v=${Date.now()}`);
        } catch {
          // Local previews continue with the checked-out graph data.
        }
      }
      if (!graph) graph = await d3.json("assets/data/obsidian-graph.json");
      const nodes = graph.nodes || [];
      const links = graph.links || [];

      if (!nodes.length) {
        host.innerHTML = '<p class="graph-empty">No notes have been selected for this graph yet.</p>';
        setReadout("Awaiting selected notes");
        return;
      }

      host.textContent = "";
      const width = 1200;
      const height = 750;
      const nodeById = new Map(nodes.map((node) => [node.id, { ...node }]));
      const graphLinks = links
        .filter((link) => nodeById.has(link.source) && nodeById.has(link.target))
        .map((link) => ({ ...link }));
      const graphNodes = [...nodeById.values()];
      const graphEdges = graphLinks.map((link) => ({
        source: nodeById.get(link.source),
        target: nodeById.get(link.target),
      }));
      const neighbors = new Map(graphNodes.map((node) => [node.id, new Set([node.id])]));
      graphLinks.forEach((link) => {
        neighbors.get(link.source).add(link.target);
        neighbors.get(link.target).add(link.source);
      });

      const svg = d3.select(host).append("svg")
        .attr("class", "knowledge-graph-svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");
      const viewport = svg.append("g");
      const link = viewport.append("g").attr("class", "graph-links").selectAll("line")
        .data(graphEdges).join("line");
      const node = viewport.append("g").attr("class", "graph-nodes").selectAll("g")
        .data(graphNodes).join("g").attr("tabindex", 0).attr("role", "button")
        .attr("aria-label", (item) => item.title);
      const nodeContent = node.append("g").attr("class", "graph-node-content");
      nodeContent.append("circle").attr("r", 5);
      const labelGroup = nodeContent.append("g").attr("class", "graph-node-label-group");
      labelGroup.append("text").text((item) => item.title);
      nodeContent.each(function (item) {
        const content = d3.select(this);
        const labelGroup = content.select(".graph-node-label-group");
        const text = labelGroup.select("text");
        const textWidth = text.node().getComputedTextLength();
        const width = textWidth * 1.25;
        item.labelWidth = width + 12;
        item.collisionRadius = Math.min(62, Math.max(34, textWidth / 3 + 18));
        content.insert("rect", "circle")
          .attr("class", "graph-node-hitbox")
          .attr("x", -(width + 12) * 0.65)
          .attr("y", -5)
          .attr("width", (width + 12) * 1.3)
          .attr("height", 36);
        const textBounds = text.node().getBBox();
        labelGroup.insert("rect", "text")
          .attr("class", "graph-node-label")
          .attr("x", textBounds.x - 7)
          .attr("y", textBounds.y - 5)
          .attr("width", textBounds.width + 14)
          .attr("height", textBounds.height + 10)
          .attr("rx", 2);
        labelGroup.attr("transform", "translate(0, 24)");
      });

      const simulation = d3.forceSimulation(graphNodes)
        .force("link", d3.forceLink(graphEdges).id((item) => item.id).distance(132).strength(0.6))
        .force("charge", d3.forceManyBody().strength(-130))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide((item) => item.collisionRadius))
        .alphaDecay(0.045);
      simulation.stop();
      for (let step = 0; step < 180; step += 1) simulation.tick();

      let zoomTransform = d3.zoomIdentity;
      const positionLabel = (item, x = 0, y = 24) => {
        const content = node.filter((other) => other.id === item.id).select(".graph-node-content");
        const labelGroup = content.select(".graph-node-label-group");
        const text = labelGroup.select("text");
        const label = labelGroup.select(".graph-node-label");

        const textBounds = text.node().getBBox();
        label
          .attr("x", textBounds.x - 7)
          .attr("y", textBounds.y - 5)
          .attr("width", textBounds.width + 14)
          .attr("height", textBounds.height + 10);
        item.labelTargetX = x;
        item.labelTargetY = y;
      };
      const moveLabelAwayFromPointer = (event, item) => {
        const [pointerX, pointerY] = d3.pointer(event, svg.node());
        const [nodeX, nodeY] = zoomTransform.apply([item.x, item.y]);
        const deltaX = pointerX - nodeX;
        const deltaY = pointerY - nodeY;
        const distance = Math.hypot(deltaX, deltaY) || 1;
        positionLabel(item, -deltaX / distance * 28, -deltaY / distance * 28);
      };
      const reset = (item) => {
        if (item) item.isFrozen = false;
        link.classed("is-active", false);
        node.classed("is-active", false);
        if (item) positionLabel(item);
        setReadout(`${graphNodes.length} notes / ${graphLinks.length} connections`);
      };
      const focus = (item) => {
        item.isFrozen = true;
        const related = neighbors.get(item.id);
        node.classed("is-active", (other) => related.has(other.id));
        node.filter((other) => related.has(other.id)).each(function (other) {
          positionLabel(other);
        });
        node.filter((other) => other.id === item.id).raise();
        link.classed("is-active", (other) => other.source.id === item.id || other.target.id === item.id);
        setReadout(`${item.title} / ${related.size - 1} connection${related.size === 2 ? "" : "s"}`);
      };

      node.on("mouseenter", (event, item) => {
        focus(item);
        moveLabelAwayFromPointer(event, item);
      })
        .on("mousemove", (event, item) => moveLabelAwayFromPointer(event, item))
        .on("focus", (_, item) => focus(item))
        .on("mouseleave", function (_, item) {
          if (document.activeElement === this) this.blur();
          else reset(item);
        })
        .on("blur", (_, item) => reset(item))
        .on("click", (_, item) => focus(item));

      const zoom = d3.zoom()
        .scaleExtent([0.35, 3])
        .on("zoom", (event) => {
          zoomTransform = event.transform;
          viewport.attr("transform", event.transform);
          nodeContent.attr("transform", `scale(${Math.pow(event.transform.k, -0.5)})`);
        });
      svg.call(zoom);
      svg.on("click.clear-selection", (event) => {
        if (!window.matchMedia("(max-width: 720px)").matches || event.defaultPrevented) return;
        if (event.target.closest(".graph-nodes > g")) return;
        graphNodes.forEach((item) => { item.isFrozen = false; });
        reset();
      });
      const initialScale = window.matchMedia("(max-width: 480px)").matches ? 1.4
        : window.matchMedia("(max-width: 720px)").matches ? 1.2 : 1;
      if (initialScale > 1) {
        svg.call(zoom.transform, d3.zoomIdentity
          .translate(width * (1 - initialScale) / 2, height * (1 - initialScale) / 2)
          .scale(initialScale));
      }
      resetButton?.addEventListener("click", () => {
        svg.transition().duration(180).call(zoom.transform, d3.zoomIdentity);
      });
      const renderPositions = () => {
        link.attr("x1", (item) => item.source.x).attr("y1", (item) => item.source.y)
          .attr("x2", (item) => item.target.x).attr("y2", (item) => item.target.y);
        node.attr("transform", (item) => `translate(${item.x},${item.y})`);
      };
      renderPositions();
      graphNodes.forEach((item) => {
        item.baseX = item.x;
        item.baseY = item.y;
        item.labelX = 0;
        item.labelY = 24;
        item.labelTargetX = 0;
        item.labelTargetY = 24;
        item.driftX = 6 + Math.random() * 14;
        item.driftY = 6 + Math.random() * 14;
        item.driftSpeed = 0.00018 + Math.random() * 0.00022;
        item.driftPhase = Math.random() * Math.PI * 2;
        item.driftPhaseY = Math.random() * Math.PI * 2;
      });
      d3.timer((elapsed) => {
        graphNodes.forEach((item) => {
          item.labelX += (item.labelTargetX - item.labelX) * 0.22;
          item.labelY += (item.labelTargetY - item.labelY) * 0.22;
          if (item.isFrozen) return;
          item.x = item.baseX + Math.sin(elapsed * item.driftSpeed + item.driftPhase) * item.driftX;
          item.y = item.baseY + Math.cos(elapsed * item.driftSpeed * 0.83 + item.driftPhaseY) * item.driftY;
        });
        renderPositions();
        node.select(".graph-node-label-group")
          .attr("transform", (item) => `translate(${item.labelX}, ${item.labelY})`);
      });
      reset();
    } catch {
      host.innerHTML = '<p class="graph-empty">The graph could not load right now.</p>';
      setReadout("Graph unavailable");
    }
  }

  render();
})();
