package service

import (
	"fileServer/dao"
	"fileServer/dto"
	"fileServer/models"
	"fileServer/util"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
)

var (
	BASE_FILE_PATH = os.Getenv("FS_GO_BASE_PATH")
	SEND_DATA      = []byte("SEND_DATA")
)

func UploadFileAndsaveToDb(w http.ResponseWriter, r *http.Request) {
	fileName, filePath, err := saveDataToFile(w, r)
	if err != nil {
		fmt.Println(err)
		fmt.Fprint(w, []byte("failure"))
	} else {
		item := (models.MakeItem(fileName, filePath, time.Now()))
		dao.SaveItem(item)
		fmt.Fprint(w, []byte("success"))
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

func DeleteFileById(w http.ResponseWriter, r *http.Request) {
	id, idRequestError := strconv.Atoi(r.URL.Query()["id"][0])
	if idRequestError != nil {
		fmt.Fprint(w, []byte("file not found"))
	}
	item := dao.GetItemById(id)
	if item != nil {
		if !item.DeletedAt.Valid {
			dao.UpdateDeletedTime(item)
			deleteFile(item.Path)

		}
	} else {

		fmt.Fprint(w, []byte("file not found"))
	}
}

func deleteFile(path string) {
	// delete file
	var err = os.Remove(path)
	if err != nil {
		fmt.Println("error while deleting file " + path)
		return
	}

	fmt.Println("==> done deleting file")
}

func StreamUpload(c *websocket.Conn) {
	var fileData dto.Filestruct
	c.ReadJSON(&fileData)
	//defer close connection
	defer c.Close()
	// create db entry
	dao.SaveItem(models.MakeItem(fileData.Name, BASE_FILE_PATH+"/"+
		fileData.Name, time.Now()))
	fmt.Printf("recieved file struct: %v\n", fileData)
	// ask for data from client
	c.WriteMessage(1, []byte(SEND_DATA))
	// get bytes in batches
	byteCount := 0
	for byteCount < fileData.Size {
		_, message, messageRetrievalError := c.ReadMessage()
		if messageRetrievalError != nil {
			fmt.Printf("error :%v\n", messageRetrievalError)
		}
		filePath := BASE_FILE_PATH + string(os.PathSeparator) + fileData.Name
		fmt.Printf("recieved percentage %d\n", (byteCount*100)/fileData.Size)
		// save batches to file
		appendError := AppendToFile(message, filePath)
		if appendError != nil {
			fmt.Printf("error while appending data to file %v\n", appendError)
		}

		// update client to send more
		// time.Sleep(10 * time.Second)
		c.WriteMessage(websocket.TextMessage, SEND_DATA)
		byteCount += len(message)
	}
	fmt.Printf("file upload complete ")

	// on completion update db entry as completed
	// send message completed to client
}

// AppendToFile append data to file if exists else create new file and set data
// accepts message to be written and file name
func AppendToFile(message []byte, filepath string) error {
	f, err := os.OpenFile(filepath,
		os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer f.Close()
	seek, seekError := f.Seek(0, 2)
	if seekError != nil {

		return seekError
	}
	if _, writeErr := f.WriteAt(message, seek); writeErr != nil {
		return writeErr
	}
	return nil
}
