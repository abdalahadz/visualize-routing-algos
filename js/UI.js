async function OutputLog(title,inputText) {
    
    const chat = document.createElement("p");

    const chatLog = document.getElementById("chat");
    console.log(chatLog);
    title = "[" + title + "]: "
    chat.innerHTML =  title.bold() + inputText;
    chatLog.append(chat);  
    chatLog.scrollTop = chatLog.scrollHeight;
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
