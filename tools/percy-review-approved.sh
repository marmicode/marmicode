#!/usr/bin/env sh

# Exit on error.
set -e

export PERCY_PROJECT=marmicode/marmicode
COMMIT_HASH=$(git rev-parse HEAD)
REVIEW_STATE=$(yarn --silent percy-poller --sha "$COMMIT_HASH" | yarn json 'review-state')
test "$REVIEW_STATE" = "approved"
