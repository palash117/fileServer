package dto

import "time"

type AddFileDto struct {
	name string
}

type BaseDto struct {
	Value string
}

type Filestruct struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
}

type FilesResponse struct {
	DisplayName string
	FileName    string
	Id          int
	CreatedAt   string
	IsDir       bool
	ParentID    int
	HlsPath     string
}

type MultipleFilesData struct {
	ParentID  int `json:"parentID"`
	NoOfFiles int `json:"noOfFiles"`
}

type FileInfoResponse struct {
	Err      string    `json:"error"`
	FileInfo *FileInfo `json:"fileInfo"`
}

type FileInfo struct {
	Id            int        `json:"id"`
	CreatedAt     time.Time  `json:"createdAt"`
	DeletedAt     *time.Time `json:"deletedAt"`
	FileName      string     `json:"fileName"`
	Path          string     `json:"path"`
	IsDir         bool       `json:"isDir"`
	ParentId      int        `json:"parentId"`
	IsVideo       bool       `json:"isVideo"`
	IsChunked     bool       `json:"isChunked"`
	ChunkRootPath string     `json:"chunkRootPath"`
	HlsPath       string     `json:"hlsPath"`
}
