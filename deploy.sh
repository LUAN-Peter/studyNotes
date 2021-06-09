#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
npm run build
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io

git push -f git@github.com:LUAN-Peter/studyPages.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:LUAN-Peter/studyNotes.git master:gh-pages
cd -