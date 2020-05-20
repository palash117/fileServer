package dto

type AddFileDto struct {
	name string
}

type BaseDto struct {
	Value string
}

type Filestruct struct {
	Name string `json:"name"`
	Size int    `json:"size"`
}
