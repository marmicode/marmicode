#!/usr/bin/env sh

# Exit on error.
set -e

export PERCY_PROJECT=marmicode/marmicode
COMMIT_HASH=$(git rev-parse HEAD)
REVIEW_STATE=$(percy-poller --sha "$COMMIT_HASH" | npx json 'review-state')
test "$REVIEW_STATE" == "approved"
RESULT=$?

exit $RESULT
