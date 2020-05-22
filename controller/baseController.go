package controller

import (
	"encoding/json"
	"fileServer/dao"
	"fileServer/dto"
	"fileServer/models"
	"fileServer/service"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gorilla/websocket"
)

const ()

var (
	PORT = os.Getenv("FS_PORT")
	IP   = os.Getenv("FS_IP")
)

func AddFile(w http.ResponseWriter, req *http.Request) {
	msg := "add file api"
	w.Header().Add("ContentType", "Application/Json")
	w.WriteHeader(http.StatusOK)
	dto := dto.BaseDto{msg}
	jsonDto, _ := json.Marshal(dto)
	w.Write(jsonDto)

}

func UploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("File Upload Endpoint Hit")
	service.UploadFileAndsaveToDb(w, r)
}

func Health(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "file server is up")
}

func GetPaginatedItems(w http.ResponseWriter, r *http.Request) {
	obj := new(models.Item)
	fmt.Println(obj)
	data := dao.GetItemsPaginated(0, 0)
	w.Header().Add("ContentType", "Application/Json")
	w.WriteHeader(http.StatusOK)
	jsonDto, _ := json.Marshal(data)
	w.Write(jsonDto)
}

func DownloadFileById(w http.ResponseWriter, r *http.Request) {
	service.DownloadFileById(w, r)
}

func DeleteFileById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Delete file endpoint hit")
	service.DeleteFileById(w, r)
}

func PartUpload(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("attempting to open websocket\n")
	u := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
	c, upgradeErr := u.Upgrade(w, r, nil)
	if upgradeErr != nil {
		// handle error
		fmt.Printf("error while opening websocket %v\n", upgradeErr)
	}
	defer c.Close()
	service.StreamUpload(c)
}

func GetLocalIP(w http.ResponseWriter, r *http.Request) {

	w.Write([]byte(IP + ":" + PORT))
}

func FileSaveTest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(service.FileSaveTest()))
}
