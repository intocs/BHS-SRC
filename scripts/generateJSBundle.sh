#!/bin/sh
# generateJSBundle.sh - generate the JS bundle using Browserify w/ Babel for ES2015 and React integration
# run this to compile all of the frontend JS code into a single file
# IF you get an error message while running this file along the lines of "Permission denied", navigate to this file in terminal
#  and type "chmod +x generateJSBundle.sh", which will make this file executable.

cd $(dirname $0)/..

echo "[generateJSBundle.sh] Generating the frontend JS bundle..."

node_modules/.bin/browserify -t [ babelify --presets [ react ] ] frontend/js/main.js -o frontend/dist/bundle.js
