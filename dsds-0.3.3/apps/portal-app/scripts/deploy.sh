#!/bin/bash
cd /project/dsds/packages/react/radix-ui
pnpm build
cd /project/dsds/apps/portal-app/
pnpm build
pm2 update
pm2 restart ecosystem.config.js --env production
