#!/bin/bash

cd $(dirname "$0")
cd ..

REPO=https://github.com/microsoft/TypeScript-TmLanguage
COMMIT="f1a26c31af488eb06284a5a7b7a0d7f34b9134a3"

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