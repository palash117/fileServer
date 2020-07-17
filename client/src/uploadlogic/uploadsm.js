import getOriginIp from "./uploadOrigin";
import {
  setWait,
  unsetWait,
  updateProgress,
  unsetProgress,
} from "../actions/wait";

const createAndRunSm = async (file, before_func, after_func, progress_func) => {
  let ip = await getOriginIp();
  console.log(before_func);
  console.log(after_func);
  var exampleSocket = new WebSocket("ws://" + ip + "/fs/PartUpload");
  new Sm(
    file,
    exampleSocket,
    before_func,
    after_func,
    progress_func
  ).transition();
};
class Sm {
  // methods
  constructor(file, websocket, before_func, after_func, progress_func) {
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
    this.progress_func = progress_func;
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
    let progressAmount = (this.offset * 100) / this.filemeta.size;
    this.progress_func(progressAmount);
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

export default createAndRunSm;
