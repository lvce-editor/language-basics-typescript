#!/bin/bash

cd $(dirname "$0")
cd ..

REPO=https://github.com/microsoft/TypeScript-TmLanguage
COMMIT="e657f4cc262fb5f76c1375fc501675d71b42d568"

rm -rf .tmp

git clone $REPO .tmp/typescript-tm-language

cd .tmp/typescript-tm-language

git checkout $COMMIT

cd ../../

cp -r .tmp/typescript-tm-language/tests/cases .tmp/cases

cd .tmp/cases

for filename in *.ts; do mv $filename typescript-${filename%.*}.ts; done;
for filename in *.tsx; do mv $filename typescript-${filename%.*}.tsx; done;

cd ../../

cp -a .tmp/cases/. test/cases/