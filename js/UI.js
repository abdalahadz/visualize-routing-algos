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
    
    var Nodes = await graph.getAllNodesAsList()
    var Links = await graph.getAllLinksAsList()
    // console.log("[AddNode]" + Links)
    Nodes.push({"id": document.getElementById("New-Node-Name").value});
    // Nodes.push({"id": document.getElementById("New-Node-Link-Name").value});

    
    Links.push({"source": document.getElementById("New-Node-Link-Name").value, "target": document.getElementById("New-Node-Name").value, "cost": document.getElementById("New-Node-Link-Value").value});


    // console.log("[AddNode]" + Links)


    graph.drawGraph(Nodes, Links)
    document.getElementById("New-Node-Name").value = '';

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
