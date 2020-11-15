package models

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

type Item struct {
	Id        int `gorm:"type:int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY""`
	CreatedAt time.Time
	DeletedAt mysql.NullTime
	FileName  string
	Path      string
	IsDir     bool
	ParentId  int
}

func MakeItem(fileName string, filePath string, createdAt time.Time, parentId int) *Item {
	return &Item{0, createdAt, mysql.NullTime{}, fileName, filePath, false, parentId}
}

func MakeFolder(folderName string, folderPath string, createdAt time.Time) *Item {
	return &Item{0, createdAt, mysql.NullTime{}, folderName, folderPath, true, -1}

}
