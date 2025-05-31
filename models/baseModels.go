package models

import (
	"time"

	"github.com/go-sql-driver/mysql"
)

type Item struct {
	Id            int `gorm:"type:int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY""`
	CreatedAt     time.Time
	DeletedAt     mysql.NullTime
	FileName      string
	Path          string
	IsDir         bool
	ParentId      int
	IsVideo       bool
	IsChunked     bool
	ChunkRootPath string
	HlsPath       string `gorm:"column:hls_path"`
}

func MakeItem(fileName string, filePath string, createdAt time.Time, parentId int) *Item {
	return &Item{0, createdAt, mysql.NullTime{}, fileName, filePath, false, parentId,
		false,
		false,
		"", "",
	}
}

func MakeFolder(folderName string, folderPath string, createdAt time.Time, parentId int) *Item {
	return &Item{0, createdAt, mysql.NullTime{}, folderName, folderPath, true, parentId,
		false,
		false,
		"", "",
	}

}
