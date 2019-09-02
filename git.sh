#!/bin/bash

eslint --fix ./src/
echo 'eslint --fix'
stylelint ./src/*.less --fix
echo 'stylelint --fix'

git add -A
git commit -m $1
git pull
git push
