#!/bin/bash

eslint --fix ./src/
git add -A
git commit -m $1
git pull
git push
