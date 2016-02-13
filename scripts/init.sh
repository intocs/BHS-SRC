#!/bin/sh
# init.sh - Do all of the things that need to be done when this repo is first cloned

cd $(dirname $0)/..

echo "[init.sh] Installing Dependencies"
npm install

echo "[init.sh] Generating JS Bundle..."
sh scripts/generateJSBundle.sh

echo "[init.sh] Done!"
