package deleteProcessor

import (
	"fileServer/models"
	"fmt"
	"testing"
	"time"
)

func TestAddToDeleteChan(t *testing.T) {
	item := models.Item{Id: 1, IsDir: true}
	GetChilderenFiles = GetChilderenFilesDummy
	osDelete = osDeleteDummy
	dbDelete = dbDeleteDummy
	AddToDeleteChan(&item)
	<-time.After(time.Second * 5)
}
func GetChilderenFilesDummy(df Deletable) []models.Item {
	pid := df.GetItem().Id
	if pid == 1 {
		return []models.Item{
			models.Item{Id: 2, FileName: "file1"},
			models.Item{Id: 3, IsDir: true, FileName: "file2"},

			models.Item{Id: 4, IsDir: true},
		}
	} else if pid == 3 {

		return []models.Item{
			models.Item{Id: 5, FileName: "file1"},
			models.Item{Id: 6, FileName: "file2"},

			models.Item{Id: 7},
		}
	} else {
		return []models.Item{
			models.Item{Id: 8, FileName: "file1"},
			models.Item{Id: 9, FileName: "file2"},

			models.Item{Id: 10},
		}
	}
}
func osDeleteDummy(item *models.Item) {
	fmt.Println("os deleteing item with id", item.Id)
}
func dbDeleteDummy(item *models.Item) {

	// fmt.Println("db deleteing item with id", item.Id)
}
