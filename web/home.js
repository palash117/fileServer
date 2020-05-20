var wrapperPage;
var PACKET_LIMIT = 1024 * 1024 * 10;
function paintFiles() {
  fetchFiles(updateFiles);
}
function fetchFiles(func) {
  fetch("/fs/getPaginated")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      func(json);
    });
}
function updateFiles(files) {
  var newFilesDiv = "";
  for (var i = 0; i < files.length; i++) {
    newFilesDiv +=
      "<tr>" +
      '<td><a href="/fs/downloadFileById?id=' +
      files[i].Id +
      '" target="_blank">' +
      files[i].FileName +
      "</a></td>" +
      "<td>" +
      //+'<a href="/fs/deleteFileById?id=' + files[i].Id + '">'
      '<img src="./resources/delete_icon.png" width="25" height="25" onclick="deleteFileById(' +
      files[i].Id +
      ')"></td>' +
      "</tr>";
  }
  document.getElementById("filesTable").innerHTML = newFilesDiv;
}
function getOriginIp(func, filestruct) {
  fetch("/fs/localIp")
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      console.log(text);
      func(text, filestruct);
    });
}
function deleteFileById(id) {
  console.log("deleting file with id " + id);
  fetch("/fs/deleteFileById?id=" + id)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      console.log(text);
      fetchFiles(updateFiles);
    });
}
function fileUpload() {
  wrapperPage.style.visibility = "hidden";
  var file = document.getElementById("uploadFile").files[0];
  var formData = new FormData();

  formData.append("file", file);
  fetch("/fs/uploadFile", { method: "POST", body: formData })
    .then((response) => response.text())
    .then((text) => {
      wrapperPage.style.visibility = "visible";
      refreshPage();
    })
    .catch((error) => console.log("error " + error));
}
function refreshPage() {
  paintFiles();
}
window.onload = init;
function init() {
  wrapperPage = document.querySelector("#wrapperDiv");
  refreshPage();
  document.getElementById("inputfile").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      document.getElementById("output").textContent = fr.result;
      console.log(fr.result);
      console.log(fr.result.length);
      filestruct.size = fr.result.byteLength;
      filestruct.content = fr.result;
      getOriginIp(fileTransferByParts, filestruct);
    };
    filestruct = {
      name: this.files[0].name,
      size: 0,
    };
    fr.readAsArrayBuffer(this.files[0]);
  });
}

function fileTransferByParts(origin, filestruct) {
  console.log("sending file by parts");
  console.log(filestruct);
  var exampleSocket = new WebSocket("ws://" + origin + "/fs/PartUpload");
  metaInfoSent = false;
  index = 0;

  exampleSocket.onopen = function () {
    // if()
    exampleSocket.send(JSON.stringify(filestruct));
    // exampleSocket.
  };
  exampleSocket.onmessage = function (event) {
    switch (event.data) {
      case "SEND_DATA":
        sendData(filestruct, exampleSocket, index);
        index++;
        break;
    }
  };
}
function sendData(filestruct, websocketConn, index) {
  size = 0;
  if ((index + 1) * PACKET_LIMIT < filestruct.size) {
    size = PACKET_LIMIT;
  } else {
    size = filestruct.size - index * PACKET_LIMIT;
  }
  messagePart = filestruct.content.slice(
    index * PACKET_LIMIT,
    index * PACKET_LIMIT + size
  );
  websocketConn.send(messagePart);
}
/*
for i := 0; i <= len(message)/limit; i++ {
		size := 0
		if (i+1)*limit < len(message) {
			size = limit
		} else {
			size = len(message) - (i * limit)
		}
		messagePart := make([]byte, size)
		for j := i * limit; j < (i*limit + size); j++ {
			messagePart[j-(i*limit)] = message[j]
		}
		AppendToFile(messagePart, filename)
	}
*/
