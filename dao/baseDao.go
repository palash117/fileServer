package dao

import (
	"fileServer/models"
	"fmt"
	"log"
	"testing"
	"time"
	"os"

	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var (
	dbInst *gorm.DB
	PORT = os.Getenv("FS_PORT")
	IP   = os.Getenv("FS_IP")
)


func ReadyDb() {
	db, err := gorm.Open("mysql", fmt.Sprintf("root:root@tcp(%s:3306)/fs?charset=utf8&parseTime=True",IP))
	if err != nil {
		log.Panic(err)
	}
	log.Println("Connection Established")
	//db.Debug().DropTableIfExists(&models.Item{})
	//////Drops table if already exists
	// db.Debug().AutoMigrate(&models.Item{})
	dbInst = db
	fmt.Println("dbname,", db.CommonDB())
}

func SaveItem(item *models.Item) {
	tx := dbInst.Begin()
	tx.Create(item)
	tx.Commit()

}

func GetItemsByParentID(parentID int) []models.Item {
	data := []models.Item{}
	dbInst.Where("deleted_at is null AND parent_id = ?", parentID).Find(&data)
	return data
}

func GetItemsPaginated(pageNo int64, pageSize int64) []models.Item {
	data := []models.Item{}
	dbInst.Where("deleted_at is null AND parent_id = ?", -1).Offset((pageNo - 1) * pageSize).Limit(pageSize).Find(&data)
	return data
}

func GetItemById(id int) *models.Item {

	item := models.Item{}
	dbInst.Where("id=?", id).First(&item)
	return &item
}

func UpdateDeletedTime(item *models.Item) {
	deletedAt := mysql.NullTime{
		Valid: true,
		Time:  time.Now(),
	}
	dbInst.Model(item).Update("deleted_at", deletedAt)
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
