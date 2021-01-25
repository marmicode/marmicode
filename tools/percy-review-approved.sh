#!/usr/bin/env sh

# Exit on error.
set -e

export PERCY_PROJECT=marmicode/marmicode
COMMIT_HASH=$(git rev-parse HEAD)
REVIEW_STATE=$(yarn --silent percy-poller --sha "$COMMIT_HASH" | yarn --silent json 'review-state')
echo "Percy Review State: $REVIEW_STATE"
test "$REVIEW_STATE" = "approved"
