#!/usr/bin/env sh

COMMAND="yarn percy exec --parallel"

# Add `--partial` option if we're running on a PR,
# because we will be using `nx affected` so not all snapshots will be uploaded.
if [ "$(git branch --show-current)" != "main" ];
then
  COMMAND="$COMMAND --partial"
fi

PROJECT_PATH=$1

$COMMAND -- ts-node tools/upload-percy-snapshots.ts $PROJECT_PATH
