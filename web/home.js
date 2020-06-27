var wrapperPage;
var PACKET_LIMIT = 1024 * 1024 * 10;
var progresCompletedBar;
var progressCompletedPercentage = 1;
var progressCheckEnabled;

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
      '<td>'+
      // <span class="fileItem">
      '<a href="/fs/downloadFileById?id=' +
      files[i].Id +
      '" target="_blank">' +
      files[i].FileName +
      "</a></td>" +
      "<td>" +
      `<a href="/fs/downloadFileById?id=${files[i].Id}" class="fa fa-download" download="${files[i].FileName}"></a>` +
      "</td><td>"+
      '<img src="./resources/delete_icon.png" width="25" height="25" onclick="deleteFileById(' +
      files[i].Id +
      ')"></td>' +
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
  getOriginIp((ip)=>{
    sm = createSm(event.files[0],setWaitPage, removeWaitPage, ip);
    sm.transition();
    });
}

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
  // pageRefresher();
}

var download = ()=>{

}

function updateProgressPercentage(val){
  progressCompletedPercentage = val
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

//------------------------------------------------------------------------SM-CODE------------------------------------------------------------------------//
function createSm(file, before_func, after_func, ip) {
  var exampleSocket = new WebSocket("ws://" + ip + "/fs/PartUpload");
  return new Sm(file, exampleSocket, before_func, after_func);
}
class Sm {
  // methods
  constructor(file, websocket, before_func, after_func) {
    this.states = {
      READY: "READY",
      OPEN_WEBSOCKET: "OPEN_WEBSOCKET",
      READ_META: "READ_META",
      WRITE_META: "WRITE_META",
      READ_WRITE_CONTINUE_CHECK: "READ_WRITE_CONTINUE_CHECK",
      READ_BYTES: "READ_BYTES",
      WRITE_BYTES: "WRITE_BYTES",
      END: "END",
    };
    this.events = {
      NO_EVENT: "NO_EVENT",
      READ_MORE: "READ_MORE",
    };
    this.before_func = before_func;
    this.after_func = after_func;
    //test
    //test over
    this.websocket = websocket;
    this.file = file;
    this.filemeta = {};
    this.websocket.onmessage = closureTransition(this, this.transition);
    this.event = this.events.NO_EVENT;
    this.funcMap = {};
    this.current_state = this.states.READY;
    this.fileReader = new FileReader();
    this.offset = 0;
    this.PACKET_SIZE = 20 * 1024 * 1024;
    this.setTransitionFunctions();
  }
  print() {
    console.log(`state:${this.current_state};event${this.event}`);
  }
  transition(data) {
    this.print();
    var nextFunction = this.getNextTransitionFunc();
    nextFunction.call(this, data);
  }
  // transitionKey generates a string key using which the next transition function can be identified
  transitionKey() {
    console.log(`${this.current_state}:${this.event}`);
    return `${this.current_state}:${this.event}`;
  }
  getNextTransitionFunc() {
    return this.funcMap[this.transitionKey()];
  }
  setTransitionFunctions() {
    this.funcMap[
      this.createTransitionKey(this.states.READY, this.events.NO_EVENT)
    ] = this.readMeta;
    this.funcMap[
      this.createTransitionKey(this.states.OPEN_WEBSOCKET, this.events.NO_EVENT)
    ] = this.openWebSocket; //todo
    this.funcMap[
      this.createTransitionKey(this.states.READ_META, this.events.NO_EVENT)
    ] = this.writeMeta;
    this.funcMap[
      this.createTransitionKey(this.states.WRITE_META, this.events.NO_EVENT)
    ] = this.readBytes;
    this.funcMap[
      this.createTransitionKey(this.states.WRITE_BYTES, this.events.NO_EVENT)
    ] = this.continueCheck;
    this.funcMap[
      this.createTransitionKey(
        this.states.READ_WRITE_CONTINUE_CHECK,
        this.events.READ_MORE
      )
    ] = this.readBytes;
    this.funcMap[
      this.createTransitionKey(
        this.states.READ_WRITE_CONTINUE_CHECK,
        this.events.NO_EVENT
      )
    ] = this.end;
    this.funcMap[
      this.createTransitionKey(this.states.READ_BYTES, this.events.NO_EVENT)
    ] = this.writeBytes;
  }
  createTransitionKey(_state, _event) {
    return `${_state}:${_event}`;
  }
  openWebSocket() {
    this.current_state = this.states.READ_META;
    this.event = this.events.NO_EVENT;
    this.websocket.onopen = closureTransition(this, this.transition);
  }
  readMeta(that) {
    this.before_func();
    this.current_state = this.states.OPEN_WEBSOCKET;
    this.event = this.events.NO_EVENT;
    this.filemeta = { name: this.file.name, size: this.file.size };
    this.transition();
  }
  writeMeta() {
    this.current_state = this.states.WRITE_META;
    this.event = this.events.NO_EVENT;
    this.websocket.send(JSON.stringify(this.filemeta));
    // this.onmessage = closureTransition(this, this.transition);
  }
  continueCheck() {
    if (this.offset >= this.filemeta.size) {
      this.current_state = this.states.READ_WRITE_CONTINUE_CHECK;
      this.event = this.events.NO_EVENT;
    } else {
      this.current_state = this.states.READ_WRITE_CONTINUE_CHECK;
      this.event = this.events.READ_MORE;
    }
    this.transition();
  }
  readBytes() {
    this.current_state = this.states.READ_BYTES;
    this.event = this.events.NO_EVENT;
    updateProgressPercentage((this.offset*100)/this.filemeta.size)
    this.fileReader.onload = closureTransition(this, this.transition);
    var blob = this.file.slice(this.offset, this.PACKET_SIZE + this.offset);
    this.fileReader.readAsArrayBuffer(blob);
  }

  writeBytes(data) {
    this.current_state = this.states.WRITE_BYTES;
    this.event = this.events.NO_EVENT;

    var byteData = this.fileReader.result;
    // this.websocket.onmessage = closureTransition(this, this.transition);
    this.offset += this.PACKET_SIZE;
    this.websocket.send(byteData);
  }
  end() {
    this.current_state = this.states.END;
    this.event = this.events.NO_EVENT;
    this.websocket.close();
    this.after_func();
  }
}
function closureTransition(ref, func, data) {
  let obj = ref;
  return function apply() {
    func.call(obj, data);
  };
}
