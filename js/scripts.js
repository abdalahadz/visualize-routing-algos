const container = d3.select(".network-disp");

// svg
const width = container.node().getBoundingClientRect().width;
const height = container.node().getBoundingClientRect().height;
const svg = container.append("svg")
  .attr("width", width)
  .attr("height", height);

// nodes and links
const nodes = [{id: "A"}, {id: "B"}, {id: "C"}, {id: "D"}, {id: "E"}];
const links = [
  {source: "A", target: "B", cost: 2},
  {source: "A", target: "C", cost: 4},
  {source: "B", target: "C", cost: 1},
  {source: "B", target: "D", cost: 7},
  {source: "C", target: "D", cost: 3},
  {source: "C", target: "E", cost: 5},
  {source: "D", target: "E", cost: 1}
];

// setup simulation
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody().strength(-3000))
  .force("center", d3.forceCenter(width / 2, height / 2));

// add links to svg
const link = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links)
  .enter().append("line")
  .attr("stroke-width", d => d.cost)

// add nodes to svg
const node = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 25);

// add labels for the nodes
const label = svg.selectAll(".label")
  .data(nodes)
  .enter().append("text")
  .attr("class", "label")
  .attr("text-anchor", "middle")
  .attr("dy", ".35em")
  .style("stroke","white")
  .text(d => d.id);

// tick function
function ticked() {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
  label
    .attr("x", d => d.x)
    .attr("y", d => d.y);
}

// update simulation every tick
simulation.on("tick", ticked);

