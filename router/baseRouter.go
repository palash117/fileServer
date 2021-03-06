package router

import (
	"fileServer/controller"
	"fileServer/util/rate_limiter"
	"fileServer/util/wrappercontroller"
	"fmt"
	"net/http"
	"os"
)

var (
	PORT              = fmt.Sprint(":", os.Getenv("FS_PORT"))
	uploadRateLimiter = rate_limiter.CreateRateLimiter(11)
)

const (
	BASE_PATH              = "/fs"
	ADD_FILE_PATH          = "/addFile"
	HEALTH                 = "/health"
	UPLOAD_FILE_PATH       = "/uploadFile"
	GET_PAGINATED_PATH     = "/getPaginated"
	DOWNLOAD_FILE_BY_ID    = "/downloadFileById"
	HOME                   = "/home"
	SERVE                  = "/"
	DELETE_FILE_BY_ID      = "/deleteFileById"
	PART_FILE_UPLOAD       = "/PartUpload"
	LOCAL_IP               = "/localIp"
	FILE_SAVE_TEST         = "/fileSaveTest"
	CREATE_FOLDER          = "/createfolder"
	GET_FILES_BY_PARENT_ID = "/getFilesByParentId"
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

	http.Handle(BASE_PATH+CREATE_FOLDER, handler{CREATE_FOLDER, controller.CreateFolder})

	http.Handle(BASE_PATH+GET_FILES_BY_PARENT_ID, handler{GET_FILES_BY_PARENT_ID, controller.GetFilesByParentId})

	partUploadFunction := wrappercontroller.WrapWithConcurrencyLimiter(uploadRateLimiter, controller.PartUpload)
	http.Handle(BASE_PATH+PART_FILE_UPLOAD, handler{PART_FILE_UPLOAD, partUploadFunction})

	http.Handle(BASE_PATH+LOCAL_IP, handler{PART_FILE_UPLOAD, controller.GetLocalIP})

	http.Handle(BASE_PATH+FILE_SAVE_TEST, handler{FILE_SAVE_TEST, controller.FileSaveTest})

	http.Handle(SERVE,
		// http.StripPrefix(
		// SERVE,
		http.FileServer(http.Dir("./client/build")))
	// )
	path, errx := os.Getwd()
	if errx != nil {
		fmt.Printf("error getting working path, %v\n", errx)
	}
	fmt.Printf("working path, %v\n", path)
	fmt.Printf("listening on port %v", PORT)
	err := http.ListenAndServe(PORT, nil)
	if err != nil {
		fmt.Printf("error starting listenAndServe, %v\n", err)
	}

}
