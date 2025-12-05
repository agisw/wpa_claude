#!/bin/bash
export STORYBOOK_BASE_URL=https://dsds.mwebdev.samsungds.net/storybooks/vue-vuetify
pnpm build:storybook
rm -rf /appdata/mwebdev/shared/www/storybooks/vue-vuetify
cp -rf storybook-static /appdata/mwebdev/shared/www/storybooks/vue-vuetify
