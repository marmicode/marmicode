#!/usr/bin/env sh

set -e

if [ -d .yarn/unplugged ];
then
  mkdir -p node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers
  ln -sf ../../../../../../../.yarn/unplugged/@babel-runtime-npm-7.21.5-7d058028a3/node_modules/@babel/runtime/helpers/esm/ node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helper
fi

