mkdir database
sudo chown -R `id -u` database
mongod --dbpath database &
cd database
mongo --host 127.0.0.1:27017