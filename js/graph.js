export * from "https://d3js.org/d3.v5.min.js";

const container = d3.select(".network-disp");

export async function getLink(source, destination) {

    const linkTag1 = 'link' + source + destination;
    const linkTag2 = 'link' + destination + source;

    const link = d3.selectAll("."+linkTag1, "."+linkTag2)
    return link
}

export async function highlightLink(link, color) {
    link
        .style("stroke", color)
        .style("stroke-width", 5)
        .style("opacity", 1);
    ;
}

export async function drawGraph(nodes, links) {
    // clear existing sim
    container.selectAll("*").remove();
        
    // svg
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);


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
    .attr("stroke-width", 2)
    .attr("class", d =>'link'+d.source.id + d.target.id);

    // add nodes to svg
    const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 25)
    .attr("class", d => "node" + d.id);

    // add labels for the nodes
    const label = svg.append("g")
    .attr("class", "nodelabels")
    .selectAll(".label")
    .data(nodes)
    .enter().append("text")
    .attr("class", d => "nodeLabel" + d.id)
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .style("stroke","white")
    .text(d => d.id);

    //add text to link edges
    const linkLabel = svg.append("g")
    .attr("class", "linklabels")
    .selectAll("text")
    .data(links)
    .enter()
    .append("text")
    .attr("class", d =>'linkLabel'+d.source.id + d.target.id)
    .text(d => d.cost);

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
        linkLabel
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2);
    }
    
    // update simulation every tick
    simulation.on("tick", ticked);
}


