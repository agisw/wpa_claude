#!/bin/bash
pnpm build-only

# get current version from package.json
VERSION=$(node -p "require('./package.json').version")
rm -f ~/.local/share/verdaccio/storage/@dsds/vue-vuetify/vue-vuetify-${VERSION}.tgz

pnpm unpublish --force @dsds/vue-vuetify@${VERSION}
pnpm publish --no-git-checks --force
