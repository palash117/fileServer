package main

import (
	"fileServer/dao"
	"fileServer/router"
	"fmt"
)

func init(){
	fmt.Println("init done")
}

func main(){
	fmt.Println("main done")
	dao.ReadyDb()
	router.Start()
}