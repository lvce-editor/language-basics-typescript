#!/bin/bash

cd $(dirname "$0")
cd ..

REPO=https://github.com/microsoft/TypeScript-TmLanguage
COMMIT="f1ba5b72cfe1845fb1f6b05050074cf1f5d723af"

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