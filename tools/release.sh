#!/usr/bin/env sh

# Exit on error.
set -e

git checkout master
git tag -f latest
git push -f --tag
