import * as graph from './graph.js';

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

graph.drawGraph(nodes, links);

console.log(await graph.getAllNodesAsList());
console.log(await graph.getAllLinksAsList());

graph.resetLinkHighlights();
graph.highlightLink('A','B','green');
await graph.sleep(2000);
graph.expireLinkHighlight('A','B');
graph.highlightLink('B','C','green');


