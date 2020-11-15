(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{28:function(e,t,a){e.exports=a.p+"static/media/uploadIcon.3d5ac450.png"},32:function(e,t,a){e.exports=a(65)},37:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},38:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(10),r=a.n(i),l=(a(37),a(38),a(2)),c=a.n(l),o=a(4),u=a(1),f=function(e,t,a){return function(n){n({type:"SET_WAIT",payload:{fileName:e,done:t,total:a}})}},E=function(){return function(e){e({type:"UNSET_WAIT",payload:{}})}},d=function(e){return function(t){t({type:"UPDATE_PROGRESS",payload:e})}},h=function(){return function(e){return e({type:"UNSET_PROGRESS",payload:{}})}},p=a(67),v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"danger",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3;return function(){var n=Object(o.a)(c.a.mark((function n(s){var i;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:i=Object(p.a)(),e&&(s({type:"SET_ALERT",payload:{message:e,level:t,id:i}}),setTimeout((function(){return s({type:"REMOVE_ALERT",payload:i})}),a));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},m=a(7),_=a.n(m),g=function(e,t){return function(){var a=Object(o.a)(c.a.mark((function a(n){var s;return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e||(e=1),t||(t=7),a.next=5,_.a.get("/fs/getPaginated?pageNo=".concat(e,"&pageSize=").concat(t));case 5:(s=a.sent).data&&n({type:"GET_FILES_PAGINATED",payload:{pageNo:e,pageSize:t,files:s.data}}),a.next=11;break;case 9:a.prev=9,a.t0=a.catch(0);case 11:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e){return a.apply(this,arguments)}}()},T=function(e){return function(){var t=Object(o.a)(c.a.mark((function t(a){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=4,_.a.get("/fs/deleteFileById?id=".concat(e));case 4:200===t.sent.status&&a(g()),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0),a(v("err"));case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},N=a(26),O=a(27),y=function(){var e=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.get("/fs/localIp");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(o.a)(c.a.mark((function e(t,a,n,s,i){var r,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y();case 2:r=e.sent,console.log(a),console.log(n),l=new WebSocket("ws://"+r+"/fs/PartUpload"),new b(t,l,a,n,s,i).transition();case 7:case"end":return e.stop()}}),e)})));return function(t,a,n,s,i){return e.apply(this,arguments)}}(),b=function(){function e(t,a,n,s,i,r){Object(N.a)(this,e),this.states={READY:"READY",OPEN_WEBSOCKET:"OPEN_WEBSOCKET",READ_META:"READ_META",WRITE_META:"WRITE_META",READ_FILE_META:"READ_FILE_META",WRITE_FILE_META:"WRITE_FILE_META",READ_WRITE_CONTINUE_CHECK:"READ_WRITE_CONTINUE_CHECK",READ_NEXT_FILE:"READ_NEXT_FILE",ALL_FILES_WRITTEN_CHECK:"ALL_FILES_WRITTEN_CHECK",READ_BYTES:"READ_BYTES",WRITE_BYTES:"WRITE_BYTES",FILE_WRITE_COMPLETE:"FILE_WRITE_COMPLETE",END:"END"},this.events={NO_EVENT:"NO_EVENT",READ_MORE:"READ_MORE"},this.parentID=r,this.before_func=n,this.after_func=s,this.progress_func=i,this.websocket=a,this.files=t,this.currentFileIndex=0,this.currentFile=this.files[0],this.filemeta={},this.websocket.onmessage=I(this,this.transition),this.event=this.events.NO_EVENT,this.funcMap={},this.current_state=this.states.READY,this.fileReader=new FileReader,this.offset=0,this.PACKET_SIZE=20971520,this.setTransitionFunctions()}return Object(O.a)(e,[{key:"print",value:function(){console.log("state:".concat(this.current_state,";event").concat(this.event))}},{key:"transition",value:function(e){this.print();var t=this.getNextTransitionFunc();t||console.log("transitionKey is",this.transitionKey()),t.call(this,e)}},{key:"transitionKey",value:function(){return console.log("".concat(this.current_state,":").concat(this.event)),"".concat(this.current_state,":").concat(this.event)}},{key:"getNextTransitionFunc",value:function(){return this.funcMap[this.transitionKey()]}},{key:"setTransitionFunctions",value:function(){this.funcMap[this.createTransitionKey(this.states.READY,this.events.NO_EVENT)]=this.readMeta,this.funcMap[this.createTransitionKey(this.states.OPEN_WEBSOCKET,this.events.NO_EVENT)]=this.openWebSocket,this.funcMap[this.createTransitionKey(this.states.WRITE_META,this.events.NO_EVENT)]=this.writeMeta,this.funcMap[this.createTransitionKey(this.states.READ_FILE_META,this.events.NO_EVENT)]=this.readFileMeta,this.funcMap[this.createTransitionKey(this.states.WRITE_FILE_META,this.events.NO_EVENT)]=this.writeFileMeta,this.funcMap[this.createTransitionKey(this.states.READ_BYTES,this.events.NO_EVENT)]=this.readBytes,this.funcMap[this.createTransitionKey(this.states.WRITE_BYTES,this.events.NO_EVENT)]=this.writeBytes,this.funcMap[this.createTransitionKey(this.states.READ_WRITE_CONTINUE_CHECK,this.events.NO_EVENT)]=this.continueCheck,this.funcMap[this.createTransitionKey(this.states.ALL_FILES_WRITTEN_CHECK,this.events.NO_EVENT)]=this.allFilesWrittenCheck,this.funcMap[this.createTransitionKey(this.states.END,this.events.NO_EVENT)]=this.end,this.funcMap[this.createTransitionKey(this.states.WRITE_BYTES,this.events.NO_EVENT)]=this.writeBytes}},{key:"createTransitionKey",value:function(e,t){return"".concat(e,":").concat(t)}},{key:"openWebSocket",value:function(){this.current_state=this.states.WRITE_META,this.event=this.events.NO_EVENT,this.websocket.onopen=I(this,this.transition)}},{key:"readFileMeta",value:function(){this.after_func(),this.offset=0,this.before_func(this.currentFile.name,this.currentFileIndex),this.progress_func(0),this.current_state=this.states.WRITE_FILE_META,this.event=this.events.NO_EVENT,this.filemeta={name:this.currentFile.name,size:this.currentFile.size},this.transition()}},{key:"readMeta",value:function(){this.current_state=this.states.OPEN_WEBSOCKET,this.allFilesData={parentID:this.parentID,noOfFiles:this.files.length},this.transition()}},{key:"writeMeta",value:function(){this.current_state=this.states.READ_FILE_META,this.websocket.send(JSON.stringify(this.allFilesData))}},{key:"writeFileMeta",value:function(){this.current_state=this.states.READ_BYTES,this.event=this.events.NO_EVENT,this.websocket.send(JSON.stringify(this.filemeta))}},{key:"continueCheck",value:function(){this.offset>=this.filemeta.size?(this.current_state=this.states.ALL_FILES_WRITTEN_CHECK,this.event=this.events.NO_EVENT):(this.current_state=this.states.READ_BYTES,this.event=this.events.NO_EVENT),this.transition()}},{key:"readBytes",value:function(){this.current_state=this.states.WRITE_BYTES,this.event=this.events.NO_EVENT;var e=100*this.offset/this.filemeta.size;this.progress_func(e),this.fileReader.onload=I(this,this.transition);var t=this.currentFile.slice(this.offset,this.PACKET_SIZE+this.offset);this.fileReader.readAsArrayBuffer(t)}},{key:"allFilesWrittenCheck",value:function(){this.currentFileIndex>=this.files.length-1?(this.current_state=this.states.END,this.event=this.events.NO_EVENT):(this.currentFileIndex++,this.currentFile=this.files[this.currentFileIndex],console.log("ATTENTION, WILL NOW SEND ",this.currentFileIndex),this.current_state=this.states.READ_FILE_META,this.event=this.events.NO_EVENT),this.transition()}},{key:"writeBytes",value:function(e){this.current_state=this.states.READ_WRITE_CONTINUE_CHECK,this.event=this.events.NO_EVENT;var t=this.fileReader.result;this.websocket.onmessage=I(this,this.transition),this.offset+=this.PACKET_SIZE,this.websocket.send(t)}},{key:"end",value:function(){this.current_state=this.states.END,this.event=this.events.NO_EVENT,this.websocket.close(),this.after_func()}}]),e}();function I(e,t,a){console.log("aruments of closureTransition",arguments);var n=e;return function(){t.call(n,a)}}var D=F,w=a(28),R=a.n(w);var A=function(e){var t=e.size,a=200,n=200;return t&&"small"==t&&(a=50,n=50),s.a.createElement("div",null,s.a.createElement("img",{src:R.a,alt:"upload",style:{width:a,height:n}}))},S={setWait:f,unsetWait:E,updateProgress:d,unsetProgress:h,getPaginatedFiles:g},k=Object(u.b)((function(e){return{}}),S)((function(e){var t=e.setWait,a=e.unsetWait,n=e.updateProgress,i=e.unsetProgress,r=e.getPaginatedFiles,l=function(){var e=Object(o.a)(c.a.mark((function e(s){var l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l=s.target.files){e.next=3;break}return e.abrupt("return");case 3:l=Array.from(l),D(l,(function(e,a){t(e,a,l.length)}),(function(){a(),i(),r()}),(function(e){n(e)}),-1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return s.a.createElement("div",{class:"add"},s.a.createElement("label",{class:"label-upload"},s.a.createElement(A,null),s.a.createElement("input",{type:"file",class:" hide",onChange:l,multiple:!0})))})),C=a(3),L=a(8),W=a(29),M=a.n(W),j=function(e){return function(){var t=Object(o.a)(c.a.mark((function t(a){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("got folder at selectFolderAction",e),a({type:"SELECT_FOLDER"}),t.next=4,_.a.get("/fs/getFilesByParentId?parentID=".concat(e.Id));case 4:200===(n=t.sent).status?a({type:"FOLDER_LOADED",payload:{folderData:e,childrenFiles:n.data}}):a({type:"FOLDER_LOADED",payload:{folderData:e,childrenFiles:[]}});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},P={pageNo:0,pageSize:0,files:[]},x=Object(u.b)(null,{deleteFileById:T,selectFolder:j})((function(e){var t=e.file,a=e.deleteFileById,n=e.selectFolder,i=null===t?{}:t,r=i.FileName,l=i.CreatedAt,c=i.Id,o=i.IsDir;i.ParentID;return s.a.createElement("tr",{class:"filerow"},s.a.createElement("td",{class:"cell filename",onClick:function(){o&&(console.log("opening folder ",t),n(t))}},r),s.a.createElement("td",{class:"cell uploadeddate"},s.a.createElement(M.a,{format:"DD/MM/YYYY"},l)),s.a.createElement("td",{class:"cell actions"},s.a.createElement("div",{className:"downloaddiv"},s.a.createElement("a",{href:"/fs/downloadFileById?id=".concat(c),target:"_blank",class:" fa fa-download",download:"".concat(r)})),s.a.createElement("div",{onClick:function(e){window.confirm("Do you want to delete file "+r+"?")&&a(c)},class:"deletediv fa fa-trash"})))})),B=Object(u.b)((function(e){return{fileData:e.files}}),{getPaginatedFiles:g})((function(e){var t=e.fileData,a=e.getPaginatedFiles,i=Object(n.useState)({pageSize:7,pageNo:1,files:[]}),r=Object(L.a)(i,2),l=r[0],c=r[1],o=l.files;if(Object(n.useEffect)((function(){a(0,7)}),[]),t&&t.files&&t.files.length>0){var u=!1;if(l.files.length===t.files.length){u=!0;for(var f=0;f<l.files.length;f++)if(l.files[f].Id!==t.files[f].Id){u=!1;break}}u||c(Object(C.a)(Object(C.a)({},l),{},{files:t.files}))}return s.a.createElement("div",{class:"filelist"},l.files.length>0?s.a.createElement("table",{class:"filelisttable"},s.a.createElement("thead",{class:"filelistheader"},s.a.createElement("td",{class:"filelistheader cell"},"filename"),s.a.createElement("td",{class:"filelistheader cell"},"uploaded on"),s.a.createElement("td",{class:"filelistheader cell"},"actions")),s.a.createElement("tbody",null,o.map((function(e){return s.a.createElement(x,{key:e.Id,file:Object(C.a)({},e)})})))):"NO FILES FOUND")})),K={getPaginatedFiles:g},V=Object(u.b)((function(e){return{fileData:e.files}}),K)((function(e){var t=e.fileData,a=e.getPaginatedFiles,i=Object(n.useState)({pageNo:1,pageSize:7}),r=Object(L.a)(i,2),l=r[0],c=r[1],o=l.pageNo,u=l.pageSize;return 0!==t.pageNo&&t.pageNo!==o&&c({pageNo:t.pageNo,pageSize:t.pageSize}),s.a.createElement("div",{class:"paginationicons"},o>1?s.a.createElement("div",{class:"prev"},s.a.createElement("i",{class:"fa fa-arrow-left fa-2x",onClick:function(e){e.preventDefault(),a(o-1,u)}})):s.a.createElement("div",{class:"prev"},s.a.createElement("i",{class:"fa fa-arrow-left fa-2x disabled"})),s.a.createElement("div",{class:"pageno"},o),s.a.createElement("div",{class:"next"},s.a.createElement("i",{class:"fa fa-arrow-right fa-2x",onClick:function(e){e.preventDefault(),a(o+1,u)}})))})),Y=function(e){var t=e.fileData,a=e.deleteFileById,n=e.refreshFolder;console.log("fileData is ",t);return s.a.createElement("div",{className:"folderfile"},s.a.createElement("div",{className:"filename"},t.FileName),s.a.createElement("div",{className:"filetype"},t.IsDir?"folder":"file"),!t.IsDir&&s.a.createElement("div",{className:"filedownload"},s.a.createElement("a",{href:"/fs/downloadFileById?id=".concat(t.Id),target:"_blank",className:" fa fa-download",download:"".concat(t.FileName)},"Download")),!t.isDir&&s.a.createElement("div",{onClick:function(){window.confirm("Do you want to delete file "+t.FileName+"?")&&window.confirm("Do you want to delete file "+t.FileName+"?")&&(a(t.Id),n())},className:"filedelete fa fa-trash"},"delete"))},z={closeFolder:function(){return function(e){e({type:"CLOSE_FOLDER"})}},selectFolder:j,setWait:f,unsetWait:E,updateProgress:d,unsetProgress:h,deleteFileById:T},U=Object(u.b)((function(e){return{folderDataState:e.folderData}}),z)((function(e){var t=e.folderDataState,a=e.closeFolder,n=e.setWait,i=e.unsetWait,r=e.updateProgress,l=e.unsetProgress,c=e.deleteFileById,o=e.selectFolder,u=null==t?{}:t,f=(u.showFolderContainer,u.folderData),E=u.childrenFiles,d=u.loading;console.log("folderDataState is ",t);var h=function(){o(f)};return s.a.createElement("div",{className:"folder-container"}," ",s.a.createElement("div",{className:"folder-subcontainer"},s.a.createElement("div",{className:"foldername"},s.a.createElement("label",{className:"addtofolder"},s.a.createElement(A,{size:"small"}),s.a.createElement("input",{type:"file",class:" hide",onChange:function(e){console.log("clickeed add files");var t=e.target.files;t&&(t=Array.from(t),D(t,(function(e,a){n(e,a,t.length)}),(function(){i(),l()}),(function(e){r(e)}),f.Id))},multiple:!0})),s.a.createElement("div",{className:"foldernamevalue"},s.a.createElement("p",null,f.FileName)),s.a.createElement("div",{className:"closefolder",onClick:function(){a()}},s.a.createElement("p",null,"x"))),s.a.createElement("div",{className:"folderfiles"},f&&d?s.a.createElement("p",null,"Loading"):E.map((function(e){return s.a.createElement(Y,{fileData:e,deleteFileById:c,refreshFolder:h,key:e.Id})})))))})),G=Object(u.b)(null,{createFolder:function(e){return function(){var t=Object(o.a)(c.a.mark((function t(a){var n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.get("/fs/createfolder?folderName=".concat(e));case 2:200==(n=t.sent).status?a({type:"FOLDER_LOADED",payload:{folderData:n.data,childrenFiles:[]}}):alert(n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.createFolder;return s.a.createElement("div",{className:"createfolder",onClick:function(){console.log("createfolder pressed");var e=window.prompt("please enter folder name");t(e)}},s.a.createElement("p",null,"New folder"))})),H=Object(u.b)((function(e){return{showFolderContainer:e.folderData.showFolderContainer}}),{getPaginatedFiles:g})((function(e){e.getPaginatedFiles;var t=e.showFolderContainer;return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"subContiner"},s.a.createElement(k,null),s.a.createElement(G,null),s.a.createElement(B,null),s.a.createElement(V,null)),t&&s.a.createElement(U,null))})),J=(Object(u.b)((function(e){return{alerts:e.alert}}),{})((function(e){var t=e.alerts;return s.a.createElement(n.Fragment,null,s.a.createElement("div",{class:"alertcontainer ".concat(t&&0===t.length&&"hide")},s.a.createElement("div",{class:"alertsubcontainer"},t&&t.map((function(e){return s.a.createElement("span",{class:"alertmessage alert-".concat(e.level)}," ",e.message)})))))})),Object(u.b)((function(e){return{progress:e.wait.progress}}),{})((function(e){var t=e.progress,a=Object(n.useState)(0),i=Object(L.a)(a,2),r=i[0],l=i[1];return t&&r!=t&&l(t),s.a.createElement("div",{className:"statusbar"},s.a.createElement("div",{className:"statusCompleted",style:{width:"".concat(Math.floor(r),"%")}}),s.a.createElement("div",{className:"statusPending"}))}))),Z=Object(u.b)((function(e){return{isWaiting:e.wait.isWaiting,fileName:e.wait.fileName,done:e.wait.done,total:e.wait.total}}),{})((function(e){var t=e.isWaiting,a=e.fileName,n=e.done,i=e.total;return s.a.createElement("div",{class:"waitcontiainer ".concat(t?"":"hide"," ")},s.a.createElement("div",{class:"waitsubcontianer"},s.a.createElement("div",{class:"lds-dual-ring"}),s.a.createElement("span",{class:"waitMessage",style:{color:"white"}},"PLEASE WAIT"),s.a.createElement("span",{class:"waitMessage",style:{color:"white"}},"uploading file ",a),s.a.createElement("span",{class:"waitMessage",style:{color:"white"}},n+1," of ",i),s.a.createElement(J,null)))})),X=a(6),q=a(30),Q=a(31),$=a(12),ee=[],te={isWaiting:!1,done:0,total:0,fileName:"",progress:0},ae={showFolderContainer:!1,folderData:null,childrenFiles:[],loading:!0},ne=Object(X.combineReducers)({alert:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_ALERT":return[].concat(Object($.a)(e),[n]);case"REMOVE_ALERT":return Object($.a)(e).filter((function(e){return e.id!==n}));default:return Object($.a)(e)}},files:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"GET_FILES_PAGINATED":return{pageNo:n.pageNo,pageSize:n.pageSize,files:n.files};default:return e}},wait:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_WAIT":return Object(C.a)(Object(C.a)({},e),{},{fileName:n.fileName,done:n.done,total:n.total,isWaiting:!0});case"UNSET_WAIT":return Object(C.a)(Object(C.a)({},e),{},{isWaiting:!1});case"UPDATE_PROGRESS":return Object(C.a)(Object(C.a)({},e),{},{progress:n});case"UNSET_PROGRESS":return Object(C.a)(Object(C.a)({},e),{},{progress:0});default:return e}},folderData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"CLOSE_FOLDER":return{showFolderContainer:!1,folderData:null,childrenFiles:[],loading:!0};case"SELECT_FOLDER":return Object(C.a)(Object(C.a)({},e),{},{loading:!0});case"FOLDER_LOADED":return Object(C.a)(Object(C.a)({},e),{},{loading:!1,folderData:n.folderData,childrenFiles:n.childrenFiles,showFolderContainer:!0});default:return e}}}),se=[Q.a],ie=Object(X.createStore)(ne,{},Object(q.composeWithDevTools)(X.applyMiddleware.apply(void 0,se)));var re=function(){return s.a.createElement(u.a,{store:ie},s.a.createElement(n.Fragment,null,s.a.createElement(H,null),s.a.createElement(Z,null)))};r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(re,null)),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.0f0846ab.chunk.js.map