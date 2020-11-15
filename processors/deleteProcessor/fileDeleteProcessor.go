package deleteProcessor

import "fileServer/models"

var fileToDeleteChan chan *models.Item

const (
	workForce = 10
)

func worker() {
	for {
		file := <-fileToDeleteChan
		deleteFileOrFolder(file)
	}

}

func initWorkers() {
	for i := 0; i < workForce; i++ {
		go worker()
	}
}

func init() {
	fileToDeleteChan = make(chan *models.Item, 50)
	initWorkers()
}

func AddToDeleteChan(file *models.Item) {
	fileToDeleteChan <- file
}

func deleteFileOrFolder(file *models.Item) {
	if file.IsDir {
		deleteFile(file)
	} else {
		deleteFolder(file)
	}
}

func deleteFolder(file *models.Item) {

}
func deleteFile(file *models.Item) {

}
