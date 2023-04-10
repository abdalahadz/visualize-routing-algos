import * as graphM from './graph.js';

window.runDijkstra = function runDijkstra() {
  const nodes = graphM.getAllNodesAsList();
  const links = graphM.getAllLinksAsList();

  const graph = convert(links);
  const start = graph[Object.keys(graph)[0]]
  const end = graph[Object.keys(graph)[Object.keys(graph).length - 1]]

  dijkstra(graph, start, end);
}

// const links = [
//   {source: "a", target: "b", cost: 2},
//   {source: "a", target: "c", cost: 4},
//   {source: "b", target: "c", cost: 1},
//   {source: "b", target: "d", cost: 7},
//   {source: "c", target: "d", cost: 3},
//   {source: "c", target: "e", cost: 5},
//   {source: "d", target: "e", cost: 1}
// ];

const convertText = (text) => {
  // const links = [];
  text.split("\n").forEach(line => {
    const [source, costStr, target] = line.split(/->|\sthrough\s/);
    // const cost = parseInt(costStr);
    console.log(source, target)
    if(source === target)
      return;
    else
      graphM.highlightLink(source,target,'red');

    graphM.sleep(2000)
    graph.expireLinkHighlight(source,target);
      // graph.
    // links.push({source: source, target: target, cost: cost});
  });
  // links.shift();
  // return links;
} 
//covnerts file type for graphing to 
const convert = (links) => {
  const graph = {};
  links.forEach(link => {
    if (!graph[link.source]) {
      graph[link.source] = {};
    }
    if (!graph[link.target]) {
      graph[link.target] = {};
    }
    graph[link.source][link.target] = link.cost;
    graph[link.target][link.source] = link.cost;

    // console.log(link.source, link.target, link.cost)
  });
  return graph;
}

// const graph = {
//     a: { b: 5, c: 2 },
//     b: { a: 5, c: 7, d: 8 },
//     c: { a: 2, b: 7, d: 4, e: 8 },
//     d: { b: 8, c: 4, e: 6, f: 4 },
//     e: { c: 8, d: 6, f: 3 },
//     f: { e: 3, d: 4 },
//   };
  
const dijkstra = (graph, start, end) => {
  const temp = {};
  Object.keys(graph).forEach((key) => {
    const obj = graph[key];
    const arr = [];
    Object.keys(obj).forEach((vert) => arr.push({ vertex: vert, cost: obj[vert] }));
    temp[key] = arr;
  });

  var map = temp
  var visited = [];
  var unvisited = [start];
  var shrtDist = { [start]: { vertex: start, cost: 0 } };
  var vertex;
  //runs through all unvisited nodes
  while ((vertex = unvisited.shift())) {
    // check unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

    // Add neighbors to appropriate list
    unvisited.push(...neighbors.map((n) => n.vertex));

    var costToVertex = shrtDist[vertex].cost;

    //checks for better paths through selected neighbors
    for (let { vertex: to, cost } of neighbors) {
      var currCostToNeighbor =
        shrtDist[to] && shrtDist[to].cost;
      var newCostToNeighbor = costToVertex + cost;
      if (
        currCostToNeighbor == undefined ||
        newCostToNeighbor < currCostToNeighbor
      ) {
        // Update the table
        shrtDist[to] = { vertex, cost: newCostToNeighbor };
      }
    }

    // var keys
    // while((keys = Object.keys(shrtDist))){
    //   console.log(keys);
    // }
    const toPrint = Object.keys(shrtDist)
    .map((vertex) => {
      var { vertex: from, cost } = shrtDist[vertex];
      return `${vertex}-> ${cost} through ${from}`;
    })
    .join("\n");

    console.log(convertText(toPrint));
    // formatted output
    console.log("Table of costs:");
    console.log(toPrint);
    visited.push(vertex);
  }

    // console.log(convertText(toPrint)[0]);
  var path = [];
  var next = end;
  //changes text to reflect shortest path
  while (true) {
    path.unshift(next);
    if (next === start) {
      break;
    }
    next = shrtDist[next].vertex;
  }

  console.log(
    "Shortest path",
    path.join(" -> "),
    "using a cost of",
    shrtDist[end].cost
  );
  // return convertText(toPrint);
};
