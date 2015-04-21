#!/bin/bash
set -euv
BUILD_APP_NAME="close-your-issues"
TEST_PATH=$(pwd)

if [[ "${TRAVIS_TAG}" ]]; then
  grunt build
  $(npm bin)/rimraf "${TEST_PATH}/build"
  $(npm bin)/nwbuild -p 'win32,win64,osx32,osx64,linux32,linux64' "${TEST_PATH}/dist" -o "${TEST_PATH}/build"
  BUILD_TARGETS=(osx32 osx64 win32 win64 linux32 linux64)
  for BUILD_TARGET in ${BUILD_TARGETS[@]}; do
    cd "${TEST_PATH}/build/${BUILD_APP_NAME}/${BUILD_TARGET}"
    zip -r "${TEST_PATH}/build/${BUILD_APP_NAME}-${BUILD_TARGET}.zip" .
  done
  cd "${TEST_PATH}"
  ls -a "${TEST_PATH}/build/"
  echo "ziped!"
else
  echo "Not Release"
fi
