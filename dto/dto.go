package dto

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
	FileName  string
	Id        int
	CreatedAt string
	IsDir     bool
	ParentID  int
}

type MultipleFilesData struct {
	ParentID  int `json:"parentID"`
	NoOfFiles int `json:"noOfFiles"`
}
