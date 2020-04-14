package dao

import (
	"fileServer/models"
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
)

var (
	dbInst *gorm.DB
)

func ReadyDb() {
	db, err := gorm.Open("mysql", "root:root@tcp(192.168.1.22:3306)/fs?charset=utf8&parseTime=True")
	if err != nil {
		log.Panic(err)
	}
	log.Println("Connection Established")
	//db.Debug().DropTableIfExists(&models.Item{})
	//////Drops table if already exists
	//db.Debug().AutoMigrate(&models.Item{})
	dbInst = db
	fmt.Println("dbname,", db.CommonDB())
}

func SaveItem(item *models.Item) {
	tx := dbInst.Begin()
	tx.Create(item)
	tx.Commit()

}

func GetItemsPaginated(pageNo int, pageSize int) []models.Item {
	data := []models.Item{}
	dbInst.Where("deleted_at is null").Find(&data)
	return data
}

func GetItemById(id int) *models.Item {
	item := models.Item{}
	dbInst.First(&item, id)
	return &item
}
