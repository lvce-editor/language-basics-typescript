#!/bin/bash

cd $(dirname "$0")
cd ..

rm -rf .tmp

COMMIT="b1ba1b2f8fb58805c3c8b2a3e337e4610340c0b5"

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