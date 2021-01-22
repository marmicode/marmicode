#!/usr/bin/env sh

# Exit on error.
set -e

git checkout main
git tag -f latest
git push -f --tag
