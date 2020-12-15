#!/usr/bin/env sh

# Exit on error.
set -e

PROJECT=$1

if [ -z "$PROJECT" ]
then
  USAGE="
Usage: $(basename $0) PROJECT
"
  echo "$USAGE"
  exit 1
fi

IS_NEXT=$([ "$PROJECT" = "marmicode-next" ] && echo true || echo false)

# Use next environment variables.
# @todo replace -c=next with -c=production,next and remove duplicate configuration in angular.json
# once the following issue is solved: https://github.com/nrwl/nx/issues/4296
BUILD_OPTIONS=$([ "$IS_NEXT" = true ] && echo "-c=next" || echo "-c=production")

yarn build marmicode $BUILD_OPTIONS

if [ "$IS_NEXT" = true ]
then
  cp apps/marmicode/src/robots-next.txt dist/apps/marmicode/browser/robots.txt
fi

yarn prerender

yarn firebase --project "$PROJECT" deploy
