#!/usr/bin/env sh

# Exit on error.
set -e

yarn scully --project marmicode --removeStaticDist --prod

# `index.html` will serve as the index of the PWA. Let's not prerender it.
# This will avoid blinking effect where the pre-rendered /index.html is displayed first for all routes.
# We could also generate a prerendered app-shell.html but as this index file only serves once the PWA is installed,
# the performance gain isn't crazy.
# First, we had another index file called `index.pristine.html`, but due to 
# the following issue https://github.com/angular/angular/issues/41085
# we'll be using index.html.
cp dist/apps/marmicode/browser/index.html dist/apps/marmicode/static/index.html
