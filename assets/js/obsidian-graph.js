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
      nodeContent.append("text").attr("y", 24).text((item) => item.title);
      nodeContent.each(function (item) {
        const text = d3.select(this).select("text");
        const textWidth = text.node().getComputedTextLength();
        const width = textWidth * 1.25;
        item.labelWidth = width + 12;
        item.collisionRadius = Math.min(62, Math.max(34, textWidth / 3 + 18));
        d3.select(this).insert("rect", "circle")
          .attr("class", "graph-node-hitbox")
          .attr("x", -(width + 12) * 0.75)
          .attr("y", -5)
          .attr("width", (width + 12) * 1.5)
          .attr("height", 42);
        d3.select(this).insert("rect", "text")
          .attr("x", -width / 2 - 6)
          .attr("y", 9)
          .attr("width", width + 12)
          .attr("height", 23)
          .attr("rx", 2);
      });

      const simulation = d3.forceSimulation(graphNodes)
        .force("link", d3.forceLink(graphEdges).id((item) => item.id).distance(132).strength(0.6))
        .force("charge", d3.forceManyBody().strength(-130))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide((item) => item.collisionRadius))
        .alphaDecay(0.045);
      simulation.stop();
      for (let step = 0; step < 180; step += 1) simulation.tick();

      const reset = (item) => {
        if (item) item.isFrozen = false;
        link.classed("is-active", false);
        node.classed("is-active", false);
        setReadout(`${graphNodes.length} notes / ${graphLinks.length} connections`);
      };
      const focus = (item) => {
        item.isFrozen = true;
        const related = neighbors.get(item.id);
        node.classed("is-active", (other) => related.has(other.id));
        node.filter((other) => other.id === item.id).raise();
        link.classed("is-active", (other) => other.source.id === item.id || other.target.id === item.id);
        setReadout(`${item.title} / ${related.size - 1} connection${related.size === 2 ? "" : "s"}`);
      };

      node.on("mouseenter focus", (_, item) => focus(item))
        .on("mouseleave blur", (_, item) => reset(item))
        .on("click", (_, item) => focus(item));

      const zoom = d3.zoom()
        .scaleExtent([0.35, 3])
        .on("zoom", (event) => {
          viewport.attr("transform", event.transform);
          nodeContent.attr("transform", `scale(${1 / event.transform.k})`);
        });
      svg.call(zoom);
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
        item.driftX = 6 + Math.random() * 14;
        item.driftY = 6 + Math.random() * 14;
        item.driftSpeed = 0.00018 + Math.random() * 0.00022;
        item.driftPhase = Math.random() * Math.PI * 2;
        item.driftPhaseY = Math.random() * Math.PI * 2;
      });
      d3.timer((elapsed) => {
        graphNodes.forEach((item) => {
          if (item.isFrozen) return;
          item.x = item.baseX + Math.sin(elapsed * item.driftSpeed + item.driftPhase) * item.driftX;
          item.y = item.baseY + Math.cos(elapsed * item.driftSpeed * 0.83 + item.driftPhaseY) * item.driftY;
        });
        renderPositions();
      });
      reset();
    } catch {
      host.innerHTML = '<p class="graph-empty">The graph could not load right now.</p>';
      setReadout("Graph unavailable");
    }
  }

  render();
})();
