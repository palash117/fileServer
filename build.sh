cd ~/dev/fileserver
echo "MOVING TO FILESERVER CODE DIRECTORY\n"

git pull
echo "PULLING LATEST CODE CHANGES\n"

docker kill fsa
docker container rm fsa
echo "KILLING LAST KNOWN FILESERVER CONTAINER\n"

docker rmi fsa
docker build . | tee  /tmp/dockerbuild.txt
echo "BUILDING LATEST DOCKER IMAGE"

temp=$(tail -1 /tmp/dockerbuild.txt)
IFS=' '
read -ra ADDR <<< "$temp"
for i in "${ADDR[@]}"; do
	dockerImageId="$i"
done
echo "$dockerImageId"

echo "RUNNING DOCKER IMAGE IN HEADLESS MODE"
docker run -d -p 9010:9010 --name fsa -v /media/pi/sgt1/fileserver:/go/src/fileServer/fileServer ${dockerImageId}
