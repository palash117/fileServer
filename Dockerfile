# BASE IMAGE
FROM golang:1.23.0-alpine



# Move to working directory /build
WORKDIR /build

# SET GO_MODULE OFF
#RUN go env -w GO111MODULE=off

# RESOLVE DEPENDENCIES
# BUILD REACT BUNDLE

# RUN npm run build --prefix client

# COPY ALL LOCAL PACKAGES FILES TO CONTAINER'S WORKSPACE.
COPY . /go/src/fileserver

# BUILD FILESERVER COMMAND INSIDE CONTIANER
WORKDIR /go/src/fileserver
RUN go mod vendor
#WORKDIR /go/src
#RUN go install fileserver/@latest
RUN go build  -o fileserver .



# ENVIRONMENT VARIABLES
ENV FS_PORT=9010
ENV FS_IP=192.168.1.12
ENV AMQP_IP=192.168.1.12
#ENV FS_IP=192.168.1.17
#ENV FS_IP=192.168.29.138
#ENV FS_IP=192.168.1.27
ENV FS_GO_BASE_PATH=/go/src/fileserver/fileserver

# DOCUMENT THAT THE SERVICE LISTENS ON PORT 8080
EXPOSE 9010

# SET DIR TO THAT OF FILESERVER
WORKDIR /go/src/fileserver

# Command to run when starting the container
CMD ["./fileserver"]

#docker run -p 9010:9010 --name fsl -v /media/pi/sgt3/fileserver:/go/src/fileserver/fileserver c5df71a9f255
