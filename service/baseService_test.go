package service

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"strconv"
	"testing"
	"time"
)

const (
	sample_write_to_file = "sample write to file"
)

func Test_health(t *testing.T) {
	defer restoreValue(BASE_FILE_PATH, &BASE_FILE_PATH)
	var temperr error
	BASE_FILE_PATH, temperr = os.Getwd()
	filename := strconv.Itoa(int(time.Now().UnixNano()))
	if temperr != nil {
		fmt.Println(temperr)
	}
	fileCreationErr := createFile(filename)

	if fileCreationErr != nil {
		t.Errorf("Error in file creation %v", fileCreationErr)
	}
	fileDeletionErrr := deleteFileTest(filename)
	if fileDeletionErrr != nil {
		t.Errorf("Error in file deletion %v", fileDeletionErrr)
	}
}

func createFile(filename string) error {
	file, err := os.Create(BASE_FILE_PATH + (string)(os.PathSeparator) + filename)
	if err != nil {
		return err
	}
	_, writeErr := file.WriteString(sample_write_to_file)
	file.Close()
	return writeErr
}

func deleteFileTest(filename string) error {
	err := os.Remove(BASE_FILE_PATH + (string)(os.PathSeparator) + filename)
	return err
}

func restoreValue(value interface{}, reference interface{}) {
	reference = value
}

func TestAppendToFile(t *testing.T) {

	BASE_FILE_PATH, _ = os.Getwd()
	filename := BASE_FILE_PATH + (string)(os.PathSeparator) + strconv.Itoa(int(time.Now().UnixNano())) + ".webm"

	// message := []byte("Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun[31] had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.")
	message := []byte("hello world")
	message, err := ioutil.ReadFile(BASE_FILE_PATH + (string)(os.PathSeparator) + "got3min.webm")
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	//fmt.Println([]byte(message))
	limit := 1024 * 1024 * 10
	for i := 0; i <= len(message)/limit; i++ {
		size := 0
		if (i+1)*limit < len(message) {
			size = limit
		} else {
			size = len(message) - (i * limit)
		}
		messagePart := make([]byte, size)
		for j := i * limit; j < (i*limit + size); j++ {
			messagePart[j-(i*limit)] = message[j]
		}
		AppendToFile(&messagePart, filename)
	}
	// if err := AppendToFile(tt.args.message, tt.args.filepath); (err != nil) != tt.wantErr {
	// 	t.Errorf("AppendToFile() error = %v, wantErr %v", err, tt.wantErr)
	// }

}

func Test_createFolder(t *testing.T) {
	defer func(value *string) {
		BASE_FILE_PATH = *value

	}(&BASE_FILE_PATH)

	// rand.Seed(100000);
	randomName := "folderName" + strconv.Itoa(rand.Intn(1000000))
	err := createFolder(randomName)
	if err != nil {
		t.Error("error creating folder with name", randomName)
	}
	err = createFolder(randomName)
	if err == nil {
		t.Error("error; should fail as folder already present", randomName)
	}

}
