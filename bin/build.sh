#!/bin/bash
set -ev

#if [[ "${TRAVIS_TAG}" ]]; then
if [[ true ]]; then
  npm install -g rimraf node-webkit-builder
  rimraf build
  rimraf node_modules
  npm install --production
  nwbuild -p 'win32,win64,osx32,osx64,linux32,linux64' ./
  BUILD_TARGETS=(osx32 osx64 win32 win64 linux32 linux64)
  for BUILD_TARGET in ${BUILD_TARGETS[@]}; do
    zip "close-your-issues-${BUILD_TARGET}.zip" -R "build/close-your-issues/${BUILD_TARGET}"
  done
  echo "ziped!"
else
  echo "Not Release"
fi
