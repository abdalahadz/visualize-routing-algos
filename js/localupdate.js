import * as graph from './graph.js';

var node1 = document.getElementById("n1");
var node2 = document.getElementById("n2");
var node3 = document.getElementById("n3");

var links1 = document.getElementById("l1");
var linkt1 = document.getElementById("l12");
var linkc1 = parseInt(document.getElementById("l13"));

var links2 = document.getElementById("l2");
var linkt2 = document.getElementById("l22");
var linkc2 = parseInt(document.getElementById("l23"));

var links3 = document.getElementById("l3");
var linkt3 = document.getElementById("l32");
var linkc3 = parseInt(document.getElementById("l33"));



localupdate.addEventListener("click", function(){
    var data = {
        "nodes": [
            {"id": node1.value},
            {"id": node2.value},
            {"id": node3.value}
        ],
        "links": [
            {"source": links1.value, "target": linkt1.value, "cost": linkc1.valueOf},
            {"source": links2.value, "target": linkt2.value, "cost": linkc2.valueOf},
            {"source": links3.value, "target": linkt3.value, "cost": linkc3.valueOf}
        ]
    }
    console.log(data)
    graph.drawGraph(data.nodes, data.links)
})



