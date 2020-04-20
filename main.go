package main

import (
	"fileServer/dao"
	"fileServer/router"
	"fmt"
)

func init() {
	fmt.Println("init done")
}

func main() {

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in f", r)
		}
	}()
	fmt.Println("main done")
	dao.ReadyDb()
	router.Start()
}
