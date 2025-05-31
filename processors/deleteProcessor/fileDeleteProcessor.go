package deleteProcessor

import (
	"fileServer/dao"
	"fileServer/models"
	"fmt"
	"os"
	"sync"
)

type Deletable interface {
	GetItem() *models.Item
	MarkDone()
}

type DeleteItem struct {
	item *models.Item
	wg   *sync.WaitGroup
}

func (d *DeleteItem) GetItem() *models.Item {
	return d.item
}

func (d *DeleteItem) MarkDone() {
	if d.wg != nil {
		d.wg.Done()
	}
}

var fileToDeleteChan chan Deletable

const (
	workForce = 10
)

func worker(id int) {
	for {
		file := <-fileToDeleteChan
		// fmt.Printf("worker %d picked item %+v, wg %+v\n", id, file.(*DeleteItem).item.Id, file.(*DeleteItem).wg)
		// fmt.Printf("worker %d picked item %+v,\n", id, file.(*DeleteItem).item.Id)
		go deleteFileOrFolder(file)
	}

}

func initWorkers() {
	for i := 0; i < workForce; i++ {
		go worker(i)
	}
}

func init() {
	fileToDeleteChan = make(chan Deletable, 50)
	initWorkers()

}

func AddToDeleteChan(item *models.Item) {

	if item == nil {
		return
	}

	df := &DeleteItem{item, nil}
	fileToDeleteChan <- df
}

func deleteFileOrFolder(df Deletable) {
	if df == nil {
		return
	}

	if df.GetItem().IsDir {
		deleteFolder(df)
	} else {
		deleteFile(df)
	}
}

func deleteFolder(df Deletable) {
	if df == nil {
		return
	}

	children := GetChilderenFiles(df)
	if children != nil && len(children) != 0 {

		cwg := &sync.WaitGroup{}
		cwg.Add(len(children))
		for _, child := range children {
			cp := *&child
			fileToDeleteChan <- &DeleteItem{item: &cp, wg: cwg}
		}
		cwg.Wait()
	}
	dbDelete(df.GetItem())
	osDelete(df.GetItem())
	df.MarkDone()
}
func deleteFile(df Deletable) {
	if df == nil {
		return
	}
	dbDelete(df.GetItem())
	osDelete(df.GetItem())
	df.MarkDone()
}

var dbDelete = func(item *models.Item) {

	if item == nil {
		return
	}
	dao.UpdateDeletedTime(item)
}

var osDelete = func(item *models.Item) {
	if item == nil {
		return
	}
	path := item.Path
	var err = os.Remove(path)
	if err != nil {
		fmt.Println("error while deleting file " + path)
		return
	}

	fmt.Println("==> done deleting file")
}

var GetChilderenFiles = func(df Deletable) []models.Item {
	return dao.GetItemsByParentID(df.GetItem().Id)
}
