package deleteProcessor

var fileToDeleteChan chan string
const (workForce= 10)

func worker(){
	for{
		file<- fileToDeleteChan;
		deleteFileOrFolder(file)
	}

}

func initWorkers(){
	for i:=0;i<workForce;i++{
		go worker()
	}
}

func init(){
	fileToDeleteChan:= make(chan string, 50)
	initWorkers();
}

func AddToDeleteChan(fileName string){
	fileToDeleteChan<- fileName;
}

func deleteFileOrFolder(name string)  {
	if isFolder(name){
		go deleteFolder(name)
	}else{
		deleteFile(name)
	}
}

func deleteFolder(folderName string){

}
func deleteFile(fileName string){
	
}