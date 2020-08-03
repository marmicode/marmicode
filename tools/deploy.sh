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

yarn build marmicode --prod

if [ "$PROJECT" = "marmicode-next" ]
then
  cp apps/marmicode/src/robots-next.txt dist/apps/marmicode/browser/robots.txt
fi

yarn prerender:scully

yarn firebase --project "$PROJECT" deploy
