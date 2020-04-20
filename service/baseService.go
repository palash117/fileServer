package service

import (
	"fileServer/dao"
	"fileServer/models"
	"fileServer/util"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"
)

var (
	BASE_FILE_PATH = os.Getenv("FS_GO_BASE_PATH")
)

func UploadFileAndsaveToDb(w http.ResponseWriter, r *http.Request) {
	fileName, filePath, err := saveDataToFile(w, r)
	if err != nil {

		fmt.Println(err)
	} else {
		item := (models.MakeItem(fileName, filePath, time.Now()))
		dao.SaveItem(item)
	}

}

func saveDataToFile(w http.ResponseWriter, r *http.Request) (fileName string, filePath string, retErr error) {
	// Parse our multipart form, 10 << 20 specifies a maximum
	// upload of 10 MB files.
	r.ParseMultipartForm(10 << 20)
	// FormFile returns the first file for the given key `myFile`
	// it also returns the FileHeader so we can get the Filename,
	// the Header and the size of the file
	keys := make([]string, 0)

	for key := range r.MultipartForm.File {
		keys = append(keys, key)
	}

	file, handler, err := r.FormFile(keys[0])
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern

	// read all of the contents of our uploaded file into a
	// byte array
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}

	err = ioutil.WriteFile(BASE_FILE_PATH+"/"+
		handler.Filename, fileBytes, 0644)
	if err != nil {
		fmt.Println(err)
		retErr = err
	} else {
		fileName = handler.Filename
		filePath = BASE_FILE_PATH + "/" +
			handler.Filename
	}
	// write this byte array to our temporary file
	// return that we have successfully uploaded our file!
	fmt.Fprintf(w, "Successfully Uploaded File\n")
	return
}

func DownloadFileById(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.URL.Query()["id"][0])
	item := new(models.Item)
	if err != nil {
		io.WriteString(w, err.Error())
		return
	} else {
		item = dao.GetItemById(id)
	}
	r.URL.Path = item.Path
	file, err2 := os.Open(item.Path)
	if err2 != nil {

	}
	fileExtn, fileExntError := util.GetFileExtn(item.Path)
	if fileExntError != nil {

		io.WriteString(w, fileExntError.Error())
		return
	}
	w.Header().Add("ContentType", util.MIME_MAP[fileExtn])
	io.Copy(w, file)

}
