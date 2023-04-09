const graph = {
    a: { b: 5, c: 2 },
    b: { a: 5, c: 7, d: 8 },
    c: { a: 2, b: 7, d: 4, e: 8 },
    d: { b: 8, c: 4, e: 6, f: 4 },
    e: { c: 8, d: 6, f: 3 },
    f: { e: 3, d: 4 },
  };
  
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

      const toPrint = Object.keys(shrtDist)
          .map((vertex) => {
            var { vertex: from, cost } = shrtDist[vertex];
            return `${vertex}-> ${cost} through ${from}`;
          })
          .join("\n");

      //formatted output
      console.log("Table of costs:");
      console.log(toPrint);
      visited.push(vertex);
    }

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
  };
  
  dijkstra(graph, "e", "c");
