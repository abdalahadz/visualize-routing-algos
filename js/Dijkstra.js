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


async function LightPath(source, target){
  if(source != target && source != undefined && target != undefined){
    // highlights path
    graphM.highlightLink(source,target,'green');
    // waits 2 seconds
    await graphM.sleep(2000);
    // expires the highlight, still leaves residue
    graphM.expireLinkHighlight(source,target);
  }
}

async function LightFinal(text){
  // removes all preivious highlighting 
  graphM.resetLinkHighlights();
  // splits output text so to get nodes of final path
  const letters = text.split(" ").filter(word => word.length === 1);
  // loop lights path in order, waiting 2 seconds between each step for visualisation purposes
  for (let i = 0; i < letters.length - 1; i++) {
    graphM.highlightLink(letters[i+1],letters[i],'green');
    await graphM.sleep(2000);
  }
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


const dijkstra = async (graph, start, end) => {
  const visited = new Set();
  const distances = {};
  const previous = {};

  // initialize distances to infinity and previous nodes to null
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  // helper function to get the smallest distance node
  function getSmallestNode() {
    let smallestDistance = Infinity;
    let smallestNode = null;
    for (const node in distances) {
      if (!visited.has(node) && distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        smallestNode = node;
      }
    }
    return smallestNode;
  }

  let currentNode = getSmallestNode();
  while (currentNode !== null) {
    // finds distances to neighbors of current node
    for (const neighbor in graph[currentNode]) {
      const distance = graph[currentNode][neighbor];
      const totalDistance = distances[currentNode] + distance;
      if (totalDistance < distances[neighbor]) {
        // call function to light path
        await LightPath(currentNode, neighbor)
        distances[neighbor] = totalDistance;
        previous[neighbor] = currentNode;
      }
    }

    // mark current node as visited
    visited.add(currentNode);

    // get the next smallest unvisited node
    currentNode = getSmallestNode();

    // print the cost table
    console.log("Table of costs:");
    for (const node in distances) {
      console.log(`${node}-> ${distances[node]} through ${previous[node]}`);
    }
  }

  // build the path from start to end
  const path = [];
  let node = end;
  while (node !== null) {
    path.unshift(node);
    node = previous[node];
  }

  // print the shortest path and its total weight
  const weight = distances[end];
  const output = `Shortest path: ${path.join(" -> ")} with weight ${weight}`;
  console.log(output);
  // call function to highlight final path
  LightFinal(output);
}
