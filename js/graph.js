export * from "https://d3js.org/d3.v5.min.js";

const container = d3.select(".network-disp");

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//LINK RETRIEVAL
export async function getLink(nodeA, nodeB) {

    const linkTagAB = 'link' + nodeA + nodeB;
    const linkTagBA = 'link' + nodeB + nodeA;

    const link = d3.select(".links").selectAll("."+linkTagAB, "."+linkTagBA);
    return link
}

export async function getAllLinks() {

    const links = d3.select(".links").selectAll("line")
    return links
}

export async function getAllLinksAsList() {

    const links = await getAllLinks()
    return links.data().map(item => {
        return {
            source: item.source.id,
            target: item.target.id,
            cost: item.cost
        }});
}

//NODE RETRIEVAL
export async function getNode(node) {


    const link = d3.select(".nodes").selectAll(".node"+node);
    return link
}

export async function getAllNodes() {

    const nodes = d3.select(".nodes").selectAll("circle")
    return nodes
}

export async function getAllNodesAsList() {

    const nodes = await getAllNodes()
    return nodes.data().map(({ id }) => ({ id }));
}

//HIGHLIGHT FUNCTIONS
export async function highlightLink(nodeA, nodeB, color) {
    const link = await getLink(nodeA,nodeB);
    link
        .style("stroke", color)
        .style("stroke-width", 7)
        .style("opacity", 1);
    ;
}

export async function expireLinkHighlight(nodeA, nodeB) {
    const link = await getLink(nodeA,nodeB);
    link
        .style("stroke", 'black')
        .style("stroke-width", 7)
        .style("opacity", 1);
    ;
}

export async function resetLinkHighlight(nodeA, nodeB) {
    const link = await getLink(nodeA,nodeB);
    link
        .style("stroke", 'black')
        .style("stroke-width", 2)
        .style("opacity", 1);
    ;
}

export async function resetLinkHighlights() {
    const links = await getAllLinks();
    links
        .style("stroke", 'black')
        .style("stroke-width", 2)
        .style("opacity", 1);
    ;
}

export async function shortestPath(graph) {
    const INF = Number.MAX_SAFE_INTEGER;
    
    const nodes = graph.nodes.map(node => node.id);
    const distance = {};
    
    for (let i = 0; i < nodes.length; i++) {
      distance[nodes[i]] = {};
      
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) {
          distance[nodes[i]][nodes[j]] = 0;
        } else {
          distance[nodes[i]][nodes[j]] = INF;
        }
      }
    }
    
    graph.links.forEach(link => {
      const { source, target, cost } = link;
      distance[source][target] = cost;
      distance[target][source] = cost;
    });
    
    for (let k = 0; k < nodes.length; k++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          distance[nodes[i]][nodes[j]] = Math.min(distance[nodes[i]][nodes[j]], distance[nodes[i]][nodes[k]] + distance[nodes[k]][nodes[j]]);
        }
      }
    }
    
    return distance;
  }
  


export async function floydWarshall(nodes, links) {
    const n = nodes.length;
    const dist = new Array(n).fill().map(() => new Array(n).fill(Infinity));
  
    links.forEach(link => {
      const { source, target, cost } = link;
      dist[source.index][target.index] = cost;
    });
  
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }
  
    return dist;
  }



//DRAW GRAPH

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
        .attr("class", d => 'link' + d.source.id + d.target.id);

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
        .style("stroke", "white")
        .text(d => d.id);

    //add text to link edges
    const linkLabel = svg.append("g")
        .attr("class", "linklabels")
        .selectAll("text")
        .data(links)
        .enter()
        .append("text")
        .attr("class", d => 'linkLabel' + d.source.id + d.target.id)
        .text(d => d.cost);

    // tick function
    function ticked() {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
        label.attr("x", d => d.x)
            .attr("y", d => d.y);
        linkLabel.attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2);
    }
    
    // update simulation every tick
    simulation.on("tick", ticked);
}

