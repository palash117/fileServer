package models

import (
	"github.com/go-sql-driver/mysql"
	"time"
)
type Item struct {
	Id int `gorm:"type:int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY""`
	CreatedAt time.Time
	DeletedAt mysql.NullTime
	FileName string
	Path	string

}



func MakeItem(fileName string, filePath string, createdAt time.Time) *Item{
	return &Item{0, createdAt, mysql.NullTime{},fileName, filePath}
}
