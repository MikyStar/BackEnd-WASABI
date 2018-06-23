#/bin/bash

# Description : Run the image
# Usage : ./launch.sh <name of the docker machine>

if [[ $1 == "-h" ]];
then
	echo "Usage : ./launch.sh <name of the docker machine>"
	exit
else
	docker-machine start $1
	eval $(docker-machine env)
	docker-compose build
	docker-compose up
fi