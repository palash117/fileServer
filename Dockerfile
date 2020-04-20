# BASE IMAGE
FROM golang


# Move to working directory /build
WORKDIR /build

# RESOLVE DEPENDENCIES
RUN go get github.com/go-sql-driver/mysql
RUN go get github.com/jinzhu/gorm

# COPY ALL LOCAL PACKAGES FILES TO CONTAINER'S WORKSPACE.
ADD . /go/src/fileServer

# BUILD FILESERVER COMMAND INSIDE CONTIANER
RUN go install fileServer/


# ENVIRONMENT VARIABLES
ENV FS_PORT=8082

# DOCUMENT THAT THE SERVICE LISTENS ON PORT 8080
EXPOSE 8082

# SET DIR TO THAT OF FILESERVER
WORKDIR /go/src/fileServer

# Command to run when starting the container
CMD ["fileServer"]