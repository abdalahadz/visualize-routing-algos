import * as graphM from './graph.js';

const logr = document.getElementById("logleft");
console.log = function(...messages) {
  for (let i = 0; i < messages.length; i++) {
    logr.value += messages[i] + "\n";
  }
};

window.runDijkstra = async function runDijkstra() {
  graphM.resetLinkHighlights();

  const links = await graphM.getAllLinksAsList();

  const graph = convert(links);
  const start = Object.keys(graph)[0];
  const end = Object.keys(graph)[Object.keys(graph).length - 1];

  console.log(links);
  console.log(graph);

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

async function convertNew(source, target){
  // graphM.highlightLink('B',target,'green');
  console.log(source, target)
  if(source != target && source != undefined && target != undefined){
    // graphM.highlightLink(target,source,'green');
    graphM.highlightLink(source,target,'green');

    await graphM.sleep(2000);
    // graphM.expireLinkHighlight(target,source);
    graphM.expireLinkHighlight(source,target);
  }
}

async function convertNew2(text){
  graphM.resetLinkHighlights();
  const letters = text.split(" ").filter(word => word.length === 1);
  console.log(letters)
  for (let i = 0; i < letters.length - 1; i++) {
    if(letters[i+1] != 'a'){
      // graphM.highlightLink(letters[i],letters[i+1],'green');
      graphM.highlightLink(letters[i+1],letters[i],'green');

      await graphM.sleep(2000);
    }
  }
}


const convertText = (text) => {
  // const links = [];
  // console.log("convert");
  text.split("\n").forEach(async line => {
    const [source, costStr, target] = line.split(/->|\sthrough\s/);
    // const cost = parseInt(costStr);
    // console.log(source, target)
    if(source === target)
      return;
    else
      graphM.highlightLink(source,target,'green');

      // graphM.highlightLink(source,target,'green');

    await graphM.sleep(2000);
    graphM.expireLinkHighlight(source,target);
      // graph.
    // links.push({source: source, target: target, cost: cost});
  });
  // links.shift();
  // return links;
} 
//covnerts file type for graphing to 
const convert = (links) => {
  const graph = {};
  for (const link of links) {
    const {source, target, cost} = link;
    if (!graph[source]) graph[source] = {};
    graph[source][target] = cost;
    if (!graph[target]) graph[target] = {};
    graph[target][source] = cost;
  }
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
  
const dijkstra = async (graph, start, end) => {
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
  var last = "AA";
  //runs through all unvisited nodes
  while ((vertex = unvisited.shift())) {
    // check unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));
    // console.log(vertex);
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
    // console.log(shrtDist[vertex].vertex);
    console.log(last + " " + vertex+shrtDist[vertex].vertex);
    // if (last != vertex+shrtDist[vertex].vertex)
      await convertNew(vertex, shrtDist[vertex].vertex)
    last = vertex+shrtDist[vertex].vertex;
    // console.log(last)
    // if(vertex != shrtDist[vertex].vertex){
    //   graphM.highlightLink(vertex,shrtDist[vertex].vertex,'green');
    //   await graphM.sleep(2000);
    //   graphM.expireLinkHighlight(vertex,shrtDist[vertex].vertex);
    // }
      
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

    
    // convertText(toPrint);
    
    // formatted output
    console.log("Table of costs:");
    console.log(toPrint);
    visited.push(vertex);
    // break;
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
  const output = "Shortest path" + " "+ path.join(" -> ") + " using a cost of" + " "+ shrtDist[end].cost;
  console.log(output);
  // console.log(
  //   "Shortest path",
  //   path.join(" -> "),
  //   "using a cost of",
  //   shrtDist[end].cost
  // );
  convertNew2(output);
  // return convertText(toPrint);
};
