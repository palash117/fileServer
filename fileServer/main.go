package main

import (
	"fmt"
	"prv/fileServer/dao"
	"prv/fileServer/router"
)

func init(){
	fmt.Println("init done")
}

func main(){
	fmt.Println("main done")
	dao.ReadyDb()
	router.Start()
}