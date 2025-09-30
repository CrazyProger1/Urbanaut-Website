#!/bin/bash

set -e

cd /home/admin/urbanaut/website || exit

git checkout -- deploy.sh

git stash

git pull

npm install

npm run build

pm2 restart urbanaut-frontend-website