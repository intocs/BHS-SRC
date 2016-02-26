#!/bin/sh
# build.sh - Cover-all script to build all the things.
# "building" is what happens when preprocessed files (in this case written in JSX/es6 ) are converted into JS
#  which the browser can understand.

cd $(dirname $0)/..

echo "[build.sh] Generating JS Bundle..."
sh scripts/generateJSBundle.sh

echo "[build.sh] Done!"
