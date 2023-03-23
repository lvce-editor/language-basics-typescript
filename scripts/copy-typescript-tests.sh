#!/bin/bash

cd $(dirname "$0")
cd ..

rm -rf .tmp

COMMIT="3e973af7b51f939e07624f7002a668e54e6220b6"

git clone https://github.com/microsoft/TypeScript-TmLanguage .tmp/typescript-tm-language

cd .tmp/typescript-tm-language

git checkout $COMMIT

cd ../../

cp -r .tmp/typescript-tm-language/tests/cases .tmp/cases

cd .tmp/cases

for filename in *.ts; do mv $filename typescript-${filename%.*}.ts; done;
for filename in *.tsx; do mv $filename typescript-${filename%.*}.tsx; done;

cd ../../

cp -a .tmp/cases/. test/cases/