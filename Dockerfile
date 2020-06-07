# BASE IMAGE
FROM golang


# Move to working directory /build
WORKDIR /build

# RESOLVE DEPENDENCIES
RUN go get github.com/go-sql-driver/mysql
RUN go get github.com/jinzhu/gorm
RUN go get github.com/gorilla/websocket


# COPY ALL LOCAL PACKAGES FILES TO CONTAINER'S WORKSPACE.
ADD . /go/src/fileServer

# BUILD FILESERVER COMMAND INSIDE CONTIANER
RUN go install fileServer/


# ENVIRONMENT VARIABLES
ENV FS_PORT=9010
ENV FS_IP=192.168.1.27
ENV FS_GO_BASE_PATH=/go/src/fileServer/fileServer

# DOCUMENT THAT THE SERVICE LISTENS ON PORT 8080
EXPOSE 9010

# SET DIR TO THAT OF FILESERVER
WORKDIR /go/src/fileServer

# Command to run when starting the container
CMD ["fileServer"]

#docker run -p 9010:9010 --name fsl -v /media/pi/sgt/fileserver:/go/src/fileServer/fileServer c5df71a9f255
