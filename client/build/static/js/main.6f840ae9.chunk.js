(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{28:function(e,t,a){e.exports=a.p+"static/media/uploadIcon.3d5ac450.png"},32:function(e,t,a){e.exports=a(65)},37:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},38:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(10),r=a.n(i),c=(a(37),a(38),a(2)),l=a.n(c),o=a(5),u=a(1),E=a(67),h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"danger",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;return function(){var n=Object(o.a)(l.a.mark((function n(s){var i;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:i=Object(E.a)(),e&&(s({type:"SET_ALERT",payload:{message:e,level:t,id:i}}),setTimeout((function(){return s({type:"REMOVE_ALERT",payload:i})}),a));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},f=a(8),d=a.n(f),p=function(e,t){return function(){var a=Object(o.a)(l.a.mark((function a(n){var s;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e||(e=1),t||(t=7),a.next=5,d.a.get("/fs/getPaginated?pageNo=".concat(e,"&pageSize=").concat(t));case 5:(s=a.sent).data&&n({type:"GET_FILES_PAGINATED",payload:{pageNo:e,pageSize:t,files:s.data}}),a.next=11;break;case 9:a.prev=9,a.t0=a.catch(0);case 11:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e){return a.apply(this,arguments)}}()},_=a(26),v=a(27),T=function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/fs/localIp");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Object(o.a)(l.a.mark((function e(t,a,n,s,i){var r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:r=e.sent,console.log(a),console.log(n),c=new WebSocket("ws://"+r+"/fs/PartUpload"),new N(t,c,a,n,s,i).transition();case 7:case"end":return e.stop()}}),e)})));return function(t,a,n,s,i){return e.apply(this,arguments)}}(),N=function(){function e(t,a,n,s,i,r){Object(_.a)(this,e),this.states={READY:"READY",OPEN_WEBSOCKET:"OPEN_WEBSOCKET",READ_META:"READ_META",WRITE_META:"WRITE_META",READ_FILE_META:"READ_FILE_META",WRITE_FILE_META:"WRITE_FILE_META",READ_WRITE_CONTINUE_CHECK:"READ_WRITE_CONTINUE_CHECK",READ_NEXT_FILE:"READ_NEXT_FILE",ALL_FILES_WRITTEN_CHECK:"ALL_FILES_WRITTEN_CHECK",READ_BYTES:"READ_BYTES",WRITE_BYTES:"WRITE_BYTES",FILE_WRITE_COMPLETE:"FILE_WRITE_COMPLETE",END:"END"},this.events={NO_EVENT:"NO_EVENT",READ_MORE:"READ_MORE"},this.parentID=r,this.before_func=n,this.after_func=s,this.progress_func=i,this.websocket=a,this.files=t,this.currentFileIndex=0,this.currentFile=this.files[0],this.filemeta={},this.websocket.onmessage=m(this,this.transition),this.event=this.events.NO_EVENT,this.funcMap={},this.current_state=this.states.READY,this.fileReader=new FileReader,this.offset=0,this.PACKET_SIZE=20971520,this.setTransitionFunctions()}return Object(v.a)(e,[{key:"print",value:function(){console.log("state:".concat(this.current_state,";event").concat(this.event))}},{key:"transition",value:function(e){this.print();var t=this.getNextTransitionFunc();t||console.log("transitionKey is",this.transitionKey()),t.call(this,e)}},{key:"transitionKey",value:function(){return console.log("".concat(this.current_state,":").concat(this.event)),"".concat(this.current_state,":").concat(this.event)}},{key:"getNextTransitionFunc",value:function(){return this.funcMap[this.transitionKey()]}},{key:"setTransitionFunctions",value:function(){this.funcMap[this.createTransitionKey(this.states.READY,this.events.NO_EVENT)]=this.readMeta,this.funcMap[this.createTransitionKey(this.states.OPEN_WEBSOCKET,this.events.NO_EVENT)]=this.openWebSocket,this.funcMap[this.createTransitionKey(this.states.WRITE_META,this.events.NO_EVENT)]=this.writeMeta,this.funcMap[this.createTransitionKey(this.states.READ_FILE_META,this.events.NO_EVENT)]=this.readFileMeta,this.funcMap[this.createTransitionKey(this.states.WRITE_FILE_META,this.events.NO_EVENT)]=this.writeFileMeta,this.funcMap[this.createTransitionKey(this.states.READ_BYTES,this.events.NO_EVENT)]=this.readBytes,this.funcMap[this.createTransitionKey(this.states.WRITE_BYTES,this.events.NO_EVENT)]=this.writeBytes,this.funcMap[this.createTransitionKey(this.states.READ_WRITE_CONTINUE_CHECK,this.events.NO_EVENT)]=this.continueCheck,this.funcMap[this.createTransitionKey(this.states.ALL_FILES_WRITTEN_CHECK,this.events.NO_EVENT)]=this.allFilesWrittenCheck,this.funcMap[this.createTransitionKey(this.states.END,this.events.NO_EVENT)]=this.end,this.funcMap[this.createTransitionKey(this.states.WRITE_BYTES,this.events.NO_EVENT)]=this.writeBytes}},{key:"createTransitionKey",value:function(e,t){return"".concat(e,":").concat(t)}},{key:"openWebSocket",value:function(){this.current_state=this.states.WRITE_META,this.event=this.events.NO_EVENT,this.websocket.onopen=m(this,this.transition)}},{key:"readFileMeta",value:function(){this.after_func(),this.offset=0,this.before_func(this.currentFile.name,this.currentFileIndex),this.progress_func(0),this.current_state=this.states.WRITE_FILE_META,this.event=this.events.NO_EVENT,this.filemeta={name:this.currentFile.name,size:this.currentFile.size},this.transition()}},{key:"readMeta",value:function(){this.current_state=this.states.OPEN_WEBSOCKET,this.allFilesData={parentID:this.parentID,noOfFiles:this.files.length},this.transition()}},{key:"writeMeta",value:function(){this.current_state=this.states.READ_FILE_META,this.websocket.send(JSON.stringify(this.allFilesData))}},{key:"writeFileMeta",value:function(){this.current_state=this.states.READ_BYTES,this.event=this.events.NO_EVENT,this.websocket.send(JSON.stringify(this.filemeta))}},{key:"continueCheck",value:function(){this.offset>=this.filemeta.size?(this.current_state=this.states.ALL_FILES_WRITTEN_CHECK,this.event=this.events.NO_EVENT):(this.current_state=this.states.READ_BYTES,this.event=this.events.NO_EVENT),this.transition()}},{key:"readBytes",value:function(){this.current_state=this.states.WRITE_BYTES,this.event=this.events.NO_EVENT;var e=100*this.offset/this.filemeta.size;this.progress_func(e),this.fileReader.onload=m(this,this.transition);var t=this.currentFile.slice(this.offset,this.PACKET_SIZE+this.offset);this.fileReader.readAsArrayBuffer(t)}},{key:"allFilesWrittenCheck",value:function(){this.currentFileIndex>=this.files.length-1?(this.current_state=this.states.END,this.event=this.events.NO_EVENT):(this.currentFileIndex++,this.currentFile=this.files[this.currentFileIndex],console.log("ATTENTION, WILL NOW SEND ",this.currentFileIndex),this.current_state=this.states.READ_FILE_META,this.event=this.events.NO_EVENT),this.transition()}},{key:"writeBytes",value:function(e){this.current_state=this.states.READ_WRITE_CONTINUE_CHECK,this.event=this.events.NO_EVENT;var t=this.fileReader.result;this.websocket.onmessage=m(this,this.transition),this.offset+=this.PACKET_SIZE,this.websocket.send(t)}},{key:"end",value:function(){this.current_state=this.states.END,this.event=this.events.NO_EVENT,this.websocket.close(),this.after_func()}}]),e}();function m(e,t,a){console.log("aruments of closureTransition",arguments);var n=e;return function(){t.call(n,a)}}var O=g,b=a(28),y=a.n(b);var I=function(){return s.a.createElement("div",null,s.a.createElement("img",{src:y.a,alt:"upload",style:{width:200,height:200}}))},R={setWait:function(e,t,a){return function(n){n({type:"SET_WAIT",payload:{fileName:e,done:t,total:a}})}},unsetWait:function(){return function(e){e({type:"UNSET_WAIT",payload:{}})}},updateProgress:function(e){return function(t){t({type:"UPDATE_PROGRESS",payload:e})}},unsetProgress:function(){return function(e){return e({type:"UNSET_PROGRESS",payload:{}})}},getPaginatedFiles:p},A=Object(u.b)((function(e){return{}}),R)((function(e){var t=e.setWait,a=e.unsetWait,n=e.updateProgress,i=e.unsetProgress,r=e.getPaginatedFiles,c=function(){var e=Object(o.a)(l.a.mark((function e(s){var c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=s.target.files){e.next=3;break}return e.abrupt("return");case 3:c=Array.from(c),O(c,(function(e,a){t(e,a,c.length)}),(function(){a(),i(),r()}),(function(e){n(e)}),-1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return s.a.createElement("div",{class:"add"},s.a.createElement("label",{class:"label-upload"},s.a.createElement(I,null),s.a.createElement("input",{type:"file",class:" hide",onChange:c,multiple:!0})))})),F=function(){return s.a.createElement("div",{class:"searchbar"},s.a.createElement("input",{type:"text",class:"searchtext"}),s.a.createElement("i",{class:"fa fa-search"}))},S=a(4),w=a(7),M=a(29),W=a.n(M),D=Object(u.b)(null,{deleteFileById:function(e){return function(){var t=Object(o.a)(l.a.mark((function t(a){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=4,d.a.get("/fs/deleteFileById?id=".concat(e));case 4:200===t.sent.status&&a(p()),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0),a(h("err"));case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.file,a=t.FileName,n=t.CreatedAt,i=t.Id,r=e.deleteFileById;return s.a.createElement("tr",{class:"filerow"},s.a.createElement("td",{class:"cell filename"},a),s.a.createElement("td",{class:"cell uploadeddate"},s.a.createElement(W.a,{format:"DD/MM/YYYY"},n)),s.a.createElement("td",{class:"cell actions"},s.a.createElement("div",{className:"downloaddiv"},s.a.createElement("a",{href:"/fs/downloadFileById?id=".concat(i),target:"_blank",class:" fa fa-download",download:"".concat(a)})),s.a.createElement("div",{onClick:function(e){r(i)},class:"deletediv fa fa-trash"})))})),k=Object(u.b)((function(e){return{fileData:e.files}}),{getPaginatedFiles:p})((function(e){var t=e.fileData,a=e.getPaginatedFiles,i=Object(n.useState)({pageSize:7,pageNo:1,files:[]}),r=Object(w.a)(i,2),c=r[0],l=r[1],o=c.files;if(Object(n.useEffect)((function(){a(0,7)}),[]),t&&t.files&&t.files.length>0){var u=!1;if(c.files.length===t.files.length){u=!0;for(var E=0;E<c.files.length;E++)if(c.files[E].Id!==t.files[E].Id){u=!1;break}}u||l(Object(S.a)(Object(S.a)({},c),{},{files:t.files}))}return s.a.createElement("div",{class:"filelist"},c.files.length>0?s.a.createElement("table",{class:"filelisttable"},s.a.createElement("thead",{class:"filelistheader"},s.a.createElement("th",{class:"filelistheader cell"},"filename"),s.a.createElement("td",{class:"filelistheader cell"},"uploaded on"),s.a.createElement("td",{class:"filelistheader cell"},"actions")),s.a.createElement("tbody",null,o.map((function(e){return s.a.createElement(D,{key:e.Id,file:Object(S.a)({},e)})})))):"NO FILES FOUND")})),j={getPaginatedFiles:p},C=Object(u.b)((function(e){return{fileData:e.files}}),j)((function(e){var t=e.fileData,a=e.getPaginatedFiles,i=Object(n.useState)({pageNo:1,pageSize:7}),r=Object(w.a)(i,2),c=r[0],l=r[1],o=c.pageNo,u=c.pageSize;return 0!==t.pageNo&&t.pageNo!==o&&l({pageNo:t.pageNo,pageSize:t.pageSize}),s.a.createElement("div",{class:"paginationicons"},o>1?s.a.createElement("div",{class:"prev"},s.a.createElement("i",{class:"fa fa-arrow-left fa-2x",onClick:function(e){e.preventDefault(),a(o-1,u)}})):s.a.createElement("div",{class:"prev"},s.a.createElement("i",{class:"fa fa-arrow-left fa-2x disabled"})),s.a.createElement("div",{class:"pageno"},o),s.a.createElement("div",{class:"next"},s.a.createElement("i",{class:"fa fa-arrow-right fa-2x",onClick:function(e){e.preventDefault(),a(o+1,u)}})))})),L=Object(u.b)(null,{getPaginatedFiles:p})((function(e){e.getPaginatedFiles;return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"subContiner"},s.a.createElement(A,null),s.a.createElement(F,null),s.a.createElement(k,null),s.a.createElement(C,null)))})),P=Object(u.b)((function(e){return{alerts:e.alert}}),{})((function(e){var t=e.alerts;return s.a.createElement(n.Fragment,null,s.a.createElement("div",{class:"alertcontainer ".concat(t&&0===t.length&&"hide")},s.a.createElement("div",{class:"alertsubcontainer"},t&&t.map((function(e){return s.a.createElement("span",{class:"alertmessage alert-".concat(e.level)}," ",e.message)})))))})),K=Object(u.b)((function(e){return{progress:e.wait.progress}}),{})((function(e){var t=e.progress,a=Object(n.useState)(0),i=Object(w.a)(a,2),r=i[0],c=i[1];return t&&r!=t&&c(t),s.a.createElement("div",{className:"statusbar"},s.a.createElement("div",{className:"statusCompleted",style:{width:"".concat(Math.floor(r),"%")}}),s.a.createElement("div",{className:"statusPending"}))})),x=Object(u.b)((function(e){return{isWaiting:e.wait.isWaiting,fileName:e.wait.fileName,done:e.wait.done,total:e.wait.total}}),{})((function(e){var t=e.isWaiting,a=e.fileName,n=e.done,i=e.total;return s.a.createElement("div",{class:"waitcontiainer ".concat(t?"":"hide"," ")},s.a.createElement("div",{class:"waitsubcontianer"},s.a.createElement("div",{class:"lds-dual-ring"}),s.a.createElement("span",{class:"waitMessage",style:{color:"white"}},"PLEASE WAIT"),s.a.createElement("span",{class:"waitMessage",style:{color:"white"}},"uploading file ",a),s.a.createElement("span",{class:"waitMessage",style:{color:"white"}},n+1," of ",i),s.a.createElement(K,null)))})),V=a(6),B=a(30),Y=a(31),z=a(12),U=[],G={pageNo:0,pageSize:0,files:[]},H={isWaiting:!1,done:0,total:0,fileName:"",progress:0},J=Object(V.combineReducers)({alert:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_ALERT":return[].concat(Object(z.a)(e),[n]);case"REMOVE_ALERT":return Object(z.a)(e).filter((function(e){return e.id!==n}));default:return Object(z.a)(e)}},files:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"GET_FILES_PAGINATED":return{pageNo:n.pageNo,pageSize:n.pageSize,files:n.files};default:return e}},wait:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_WAIT":return Object(S.a)(Object(S.a)({},e),{},{fileName:n.fileName,done:n.done,total:n.total,isWaiting:!0});case"UNSET_WAIT":return Object(S.a)(Object(S.a)({},e),{},{isWaiting:!1});case"UPDATE_PROGRESS":return Object(S.a)(Object(S.a)({},e),{},{progress:n});case"UNSET_PROGRESS":return Object(S.a)(Object(S.a)({},e),{},{progress:0});default:return e}}}),Z=[Y.a],X=Object(V.createStore)(J,{},Object(B.composeWithDevTools)(V.applyMiddleware.apply(void 0,Z)));var q=function(){return s.a.createElement(u.a,{store:X},s.a.createElement(n.Fragment,null,s.a.createElement(P,null),s.a.createElement(L,null),s.a.createElement(x,null)))};r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(q,null)),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.6f840ae9.chunk.js.map