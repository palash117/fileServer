var wrapperPage;
var PACKET_LIMIT = 1024 * 1024 * 10;
var progresCompletedBar;
var progressCompletedPercentage = 1;
var progressCheckEnabled;
import {createSm} from "./sm.js"
function paintFiles() {
  fetchFiles(updateFiles);
}
function fetchFiles(func) {
  fetch("/fs/getPaginated")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      func(json);
    });
}
function updateFiles(files) {
  var newFilesDiv = "";
  for (var i = 0; i < files.length; i++) {
    newFilesDiv +=
      "<tr>" +
      '<td><span class="fileItem"><a href="/fs/downloadFileById?id=' +
      files[i].Id +
      '" target="_blank">' +
      files[i].FileName +
      "</a></td>" +
      "<td>" +
      '<img src="./resources/delete_icon.png" width="25" height="25" onclick="deleteFileById(' +
      files[i].Id +
      ')"></span></td>' +
      "</tr>";
  }
  document.getElementById("filesTable").innerHTML = newFilesDiv;
}
function getOriginIp(func) {
  fetch("/fs/localIp")
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      console.log(text);
      func(text);
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
function fileUpload(event) {
  // console.log(event.files[0].name);
  // setWaitPage();
  // streamData(event, removeWaitPage);
  getOriginIp((ip)=>{
  sm = createSm(event.files[0],setWaitPage, removeWaitPage, ip);
  sm.transition;
  });
}
// function streamData(event, afterFunc) {
//   var fr = new FileReader();
//   fr.onload = function () {
//     console.log(fr.result);
//     console.log(fr.result.length);
//     filestruct.size = fr.result.byteLength;
//     filestruct.content = fr.result;
//     getOriginIp(fileTransferByParts, filestruct, afterFunc);
//   };
//   filestruct = {
//     name: event.files[0].name,
//     size: 0,
//   };
//   fr.readAsArrayBuffer(event.files[0]);
// }

function refreshPage() {
  paintFiles();
}
function setWaitPage() {
  wrapperPage.style.visibility = "hidden";
  resetProgress();
  progressCheckEnabled = true;
  progressCompletedPercentage = 1;
  startProgressCheck();
}
function removeWaitPage(func, event) {
  progressCheckEnabled = false;
  wrapperPage.style.visibility = "visible";
  refreshPage();
}
window.onload = init;
function init() {
  wrapperPage = document.querySelector("#wrapperDiv");
  progresCompletedBar = document.querySelector(".statusCompleted");
  refreshPage();
  document.getElementById("uploadFile").addEventListener("change", function () {
    fileUpload(this);
  });
  pageRefresher();
}

function fileTransferByParts(origin, filestruct, afterFunc) {
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
        progressCompletedPercentage =
          (index * PACKET_LIMIT * 100) / filestruct.size;
        progressCompletedPercentage = Math.floor(progressCompletedPercentage);
        index++;
        break;
    }
  };
  exampleSocket.onclose = function () {
    afterFunc();
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

function resetProgress() {
  progresCompletedBar.style.width = "1%";
}

function progressChecker() {
  progresCompletedBar.style.width = "" + progressCompletedPercentage + "%";
  if (progressCheckEnabled) {
    setTimeout(progressChecker, 100);
  }
}

function pageRefresher() {
  setTimeout(() => {
    refreshPage();
    pageRefresher();
  }, 1000);
}

function startProgressCheck() {
  setTimeout(progressChecker, 100);
}
