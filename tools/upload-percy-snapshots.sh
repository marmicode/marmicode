#!/usr/bin/env sh

set -e

PROJECT_PATH=$1

ts-node -P tools/tsconfig.tools.json tools/upload-percy-snapshots.ts $PROJECT_PATH
