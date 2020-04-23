function paintFiles() {
    fetchFiles(updateFiles)
}
var temp
function fetchFiles(func) {
    fetch('/fs/getPaginated')
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json)
            func(json)
        })
}
function updateFiles(files) {

    var newFilesDiv = ""
    for (var i = 0; i < files.length; i++) {
        newFilesDiv += '<tr>'
            +'<td><a href="/fs/downloadFileById?id=' + files[i].Id + '" target="_blank">' 
            + files[i].FileName + '</a></td>'
            +'<td>'
            +'<a href="/fs/deleteFileById?id=' + files[i].Id + '">'
            +'<img src="./resources/delete_icon.png" width="25" height="25"></td>'
            +'</a>'
            +'</tr>'
    }
    document.getElementById("filesTable").innerHTML = newFilesDiv
}


function fileUpload() {
    var photo = document.getElementById("uploadFile").files[0];
    var formData = new FormData();

    formData.append("photo", photo);
    fetch('/fs/uploadFile', { method: "POST", body: formData })
        .then(response => response.text())
        .then(text => {
            alert("file uploaded with " + text)
            fetchFiles(updateFiles)
        }
        )
        .catch(error => console.log("error " + error))
}