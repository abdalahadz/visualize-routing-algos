import * as graph from './graph.js';

//JSON uploader
let fileInput = document.createElement('input');
fileInput.setAttribute('type', 'file');
fileInput.setAttribute('accept', '.json');
fileInput.id = "fileInput";
fileInput.onchange = (event) => {
    const file = event.target.files[0];

    if (file.type !== 'application/json') {
      alert('File must be in JSON format.');
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
  
    reader.onload = (event) => {
      processJSON(event.target.result);

    };
};

//JSON processor
async function processJSON(fileContents) {
  const data = JSON.parse(fileContents);
  graph.shortestPath(data);
  graph.drawGraph(data.nodes, data.links);
}

//Display Controls
importControls()

async function importControls() {
  const importContainer = document.getElementById("import");
  const importButton = document.createElement("input");
  importButton.setAttribute("type","button");
  importButton.setAttribute("value","Import");
  importButton.setAttribute("onclick","upload()");
  importContainer.append(importButton);

}

window.upload = function upload() {
  fileInput.click();
  return false;
}