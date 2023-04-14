import * as graph from './graph.js';

async function OutputLog(title,inputText) {
    
    const chat = document.createElement("p");

    const chatLog = document.getElementById("chat");
    console.log(chatLog);
    title = "[" + title + "]: "
    chat.innerHTML =  title.bold() + inputText;
    chatLog.append(chat);  
    chatLog.scrollTop = chatLog.scrollHeight;
}

document.getElementById("New-Node-Button").addEventListener("click", AddNode);

async function AddNode(){
    const Node1 = document.getElementById("New-Node-Name").value;
    const Node2 = document.getElementById("New-Node-Link-Name").value;
    const Value = document.getElementById("New-Node-Link-Value").value;

    if(!Node1 || !Node2 || !Value) {
        alert("please fill out all of the fields before adding a node")
        return;
    }

    var Nodes = await graph.getAllNodesAsList()
    var Links = await graph.getAllLinksAsList()

    const hasId1 = Nodes.some(obj => obj.hasOwnProperty('id') && obj.id === Node1);
    const hasId2 = Nodes.some(obj => obj.hasOwnProperty('id') && obj.id === Node2);

    if (!hasId1 && !hasId2){
        alert("one of your nodes needs to currently exist in graph")
        return;
    }

    else if (!hasId1) {
        Nodes.push({"id": Node1});
        console.log("Added Node: " + Node1)
    }
    else if (!hasId2) {
        Nodes.push({"id": Node2});
        console.log("Added Node: " + Node2)
    }
    
    Links.push({"source": Node1, "target": Node2, "cost": Value});


    graph.drawGraph(Nodes, Links)
    document.getElementById("New-Node-Name").value = '';
    document.getElementById("New-Node-Link-Name").value = '';
    document.getElementById("New-Node-Link-Value").value.value = '';

}
//OutputLog("Link-State", "from A to C")
//OutputLog("Distance-Vector", "from A to B")

//OutputLog("Link-State", "from A to C")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
//OutputLog("Distance-Vector", "from A to B")
