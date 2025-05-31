rm fs.tar.gz
tar -cvzf fs.tar.gz *
scp fs.tar.gz pi@192.168.1.12:/home/pi/dev
