#!/bin/bash
set -euv
BUILD_APP_NAME="close-your-issues"
TEST_PATH=$(pwd)
CLEAN_PATH="${TEST_PATH}/../clean-env"

if [[ "${TRAVIS_TAG}" ]]; then
  ./bin/git-new-workdir "${TEST_PATH}" "${CLEAN_PATH}"
  cd "${CLEAN_PATH}"
  npm install --production
  cd "${TEST_PATH}"
  $(npm bin)/nwbuild -p 'win32,win64,osx32,osx64,linux32,linux64' "${CLEAN_PATH}" -o "${CLEAN_PATH}/build"
  BUILD_TARGETS=(osx32 osx64 win32 win64 linux32 linux64)
  for BUILD_TARGET in ${BUILD_TARGETS[@]}; do
    cd "${CLEAN_PATH}/build/${BUILD_APP_NAME}/${BUILD_TARGET}"
    zip -r "${CLEAN_PATH}/build/${BUILD_APP_NAME}-${BUILD_TARGET}.zip" .
  done
  cd "${TEST_PATH}"
  ls -a "${CLEAN_PATH}/build/"
  echo "ziped!"
else
  echo "Not Release"
fi
