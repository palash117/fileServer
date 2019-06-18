package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"prv/fileServer/dao"
	"prv/fileServer/dto"
	"prv/fileServer/models"
	"prv/fileServer/service"
)

const(
	BASE_FILE_PATH = "/Users/palash.sarkar/fsdownloads"
)
func AddFile(w http.ResponseWriter, req *http.Request)  {
	msg := "add file api"
	w.Header().Add("ContentType","Application/Json")
	w.WriteHeader(http.StatusOK)
	dto :=dto.BaseDto{msg}
	jsonDto,_ := json.Marshal(dto)
	w.Write(jsonDto)

}


func UploadFile(w http.ResponseWriter, r *http.Request){
	fmt.Println("File Upload Endpoint Hit")

	service.UploadFileAndsaveToDb(w,r)


}
func Health (w http.ResponseWriter, req *http.Request){
	io.WriteString(w, "file server is up")
}


func GetPaginatedItems(w http.ResponseWriter, r * http.Request){
	obj:= new(models.Item)
	fmt.Println(obj)
	data:= dao.GetItemsPaginated(0,0)
	w.Header().Add("ContentType","Application/Json")
	w.WriteHeader(http.StatusOK)
	jsonDto,_ := json.Marshal(data)
	w.Write(jsonDto)
}

func DownloadFileById(w http.ResponseWriter, r *http.Request){
	service.DownloadFileById(w , r)
}