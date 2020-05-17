package service

import (
	"fmt"
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
