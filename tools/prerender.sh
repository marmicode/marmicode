#!/usr/bin/env sh

# Exit on error.
set -e

yarn scully --project marmicode --removeStaticDist --prod

# `index.pristine.html` will serve as the index of the PWA.
# This will avoid blinking effect where the pre-rendered /index.html is displayed first for all routes.
# We could also generate a prerendered app-shell.html but as this index file only serves once the PWA is installed,
# the performance gain isn't crazy.
cp dist/apps/marmicode/browser/index.html dist/apps/marmicode/static/index.pristine.html

# Update `ngsw-config.json` with the right hashes.
yarn ngsw-config dist/apps/marmicode/static apps/marmicode/ngsw-config.json
