# Production de la lib proj4 optimisée
cd node_modules/proj4
npm install
node_modules/.bin/grunt build:somerc,tmerc,utm,lcc
cd ../..

