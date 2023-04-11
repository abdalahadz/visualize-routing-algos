import * as graphM from './graph.js';

window.runDV = async function runDV() {
    graphM.resetLinkHighlights();
  
    const links = await graphM.getAllLinksAsList();
    const nodes = await graphM.getAllNodesAsList();

    const start = nodes[0];
    const end = nodes[-1];
  
    shortestPath(nodes, links);
  }

export async function shortestPath(nodeList, linkList) {
    const logl = document.getElementById("logleft");
    const INF = Number.MAX_SAFE_INTEGER;
    const nodes = nodeList.map(node => node.id);
    const distance = {};
    const path = {};
  
  
    console.log = function(...messages) {
        for (let i = 0; i < messages.length; i++) {
        logl.value += messages[i] + "\n";
        }
        logl.focus();
        logl.scrollTop = logr.scrollHeight;
    };
  
  
    
    for (let i = 0; i < nodes.length; i++) {
      distance[nodes[i]] = {};
      path[nodes[i]] = {};
      
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) {
          distance[nodes[i]][nodes[j]] = 0;
          path[nodes[i]][nodes[j]] = [nodes[i]];
        } else {
          distance[nodes[i]][nodes[j]] = INF;
          path[nodes[i]][nodes[j]] = [];
        }
      }
    }
    
    linkList.forEach(link => {
      const { source, target, cost } = link;
      distance[source][target] = cost;
      distance[target][source] = cost;
      path[source][target] = [source, target];
      path[target][source] = [target, source];
    });
    
    for (let k = 0; k < nodes.length; k++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (distance[nodes[i]][nodes[j]] > distance[nodes[i]][nodes[k]] + distance[nodes[k]][nodes[j]]) {
            distance[nodes[i]][nodes[j]] = distance[nodes[i]][nodes[k]] + distance[nodes[k]][nodes[j]];
            path[nodes[i]][nodes[j]] = path[nodes[i]][nodes[k]].concat(path[nodes[k]][nodes[j]].slice(1));
            
            graphM.highlightLink(nodes[i], nodes[k], 'green');
            await graphM.sleep(1000);
            graphM.expireLinkHighlight(nodes[i],nodes[k]);
          }
        }
      }
      await graphM.sleep(1000)
      graphM.resetLinkHighlights();  
    }
    
    graphM.resetLinkHighlights();
    // Print the shortest paths as formatted strings
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        const fromNode = nodes[i];
        const toNode = nodes[j];
        const shortestDistance = distance[fromNode][toNode];
        const shortestPath = path[fromNode][toNode].join(' -> ');

        
        graphM.highlightLink(fromNode, toNode, 'green');
        await graphM.sleep(1000);
        console.log(`shortest path from node ${fromNode} to ${toNode} is ${shortestPath} with distance ${shortestDistance}`);
        // graphM.resetLinkHighlights();
      }
    }
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