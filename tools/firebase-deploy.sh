#!/usr/bin/env sh

set -e

# Check args
if [ $# -lt 2 ]; then
  echo "Usage: $0 <project> <firebase-project>"
  exit 1
fi

PROJECT="$1"
FIREBASE_PROJECT="$2"

echo "GITHUB_HEAD_REF: $GITHUB_HEAD_REF"
echo "GITHUB_REF_NAME: $GITHUB_REF_NAME"
BRANCH="${GITHUB_HEAD_REF:-$GITHUB_REF_NAME}"
if [ -z "$BRANCH" ]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi

CHANNEL=$(echo "$BRANCH" | tr '/' '-')

if [ "$BRANCH" = "main" ]; then
  echo "🚀 Deploying to production channel..."
  firebase deploy --only "hosting:$PROJECT" --project "$FIREBASE_PROJECT"
else
  echo "🚀 Deploying to preview channel: $CHANNEL..."
  firebase hosting:channel:deploy "$CHANNEL" --expires 7d --only "$PROJECT" --project "$FIREBASE_PROJECT"
fi
