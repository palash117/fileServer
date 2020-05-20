package router

import (
	"fileServer/controller"
	"fmt"
	"net/http"
	"os"
)

var PORT = fmt.Sprint(":", os.Getenv("FS_PORT"))

const (
	BASE_PATH           = "/fs"
	ADD_FILE_PATH       = "/addFile"
	HEALTH              = "/health"
	UPLOAD_FILE_PATH    = "/uploadFile"
	GET_PAGINATED_PATH  = "/getPaginated"
	DOWNLOAD_FILE_BY_ID = "/downloadFileById"
	HOME                = "/home"
	SERVE               = "/serve/"
	DELETE_FILE_BY_ID   = "/deleteFileById"
	PART_FILE_UPLOAD    = "/PartUpload"
)

type handler struct {
	path        string
	handlerFunc func(http.ResponseWriter, *http.Request)
}

func (h handler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	h.handlerFunc(w, req)
}

// Start start server
func Start() {
	fmt.Println("started")

	http.Handle(BASE_PATH+ADD_FILE_PATH, handler{ADD_FILE_PATH, controller.AddFile})

	http.Handle(BASE_PATH+HEALTH, handler{HEALTH, controller.Health})

	http.Handle(BASE_PATH+UPLOAD_FILE_PATH, handler{UPLOAD_FILE_PATH, controller.UploadFile})

	http.Handle(BASE_PATH+GET_PAGINATED_PATH, handler{GET_PAGINATED_PATH, controller.GetPaginatedItems})

	http.Handle(BASE_PATH+DOWNLOAD_FILE_BY_ID, handler{DOWNLOAD_FILE_BY_ID, controller.DownloadFileById})

	http.Handle(BASE_PATH+DELETE_FILE_BY_ID, handler{DELETE_FILE_BY_ID, controller.DeleteFileById})

	http.Handle(BASE_PATH+PART_FILE_UPLOAD, handler{PART_FILE_UPLOAD, controller.PartUpload})

	http.Handle(SERVE, http.StripPrefix(SERVE, http.FileServer(http.Dir("./web"))))
	path, errx := os.Getwd()
	if errx != nil {
		fmt.Println(errx)
	}
	fmt.Println(path)
	err := http.ListenAndServe(PORT, nil)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("started 2 ")
}
