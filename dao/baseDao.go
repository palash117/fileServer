package dao

import (
	"fileServer/models"
	"fmt"
	"log"
	"testing"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var (
	dbInst *gorm.DB
)

func ReadyDb() {
	db, err := gorm.Open("mysql", "root:root@tcp(192.168.1.27:3306)/fs?charset=utf8&parseTime=True")
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

func GetItemsPaginated(pageNo int64, pageSize int64) []models.Item {
	data := []models.Item{}
	dbInst.Where("deleted_at is null").Offset((pageNo - 1) * pageSize).Limit(pageSize).Find(&data)
	return data
}

func GetItemById(id int) *models.Item {

	item := models.Item{}
	dbInst.First(&item, id)
	return &item
}

func UpdateDeletedTime(item *models.Item) {
	deletedAt := mysql.NullTime{
		Valid: true,
		Time:  time.Now(),
	}
	dbInst.Model(&item).Updates(models.Item{DeletedAt: deletedAt})
}

func TestUpdateDeletedTime(t *testing.T) {
	ReadyDb()
	item := GetItemById(21)
	UpdateDeletedTime(item)
	item = GetItemById(21)
	if !item.DeletedAt.Valid {
		t.Fail()
	}
}
