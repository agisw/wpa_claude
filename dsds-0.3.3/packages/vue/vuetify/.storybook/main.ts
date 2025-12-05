import { getVueStorybookConfig as getStorybookConfig } from "../docs/helpers/storybook.ts"

export default getStorybookConfig({
  prodUrlPrefix: process.env.STORYBOOK_BASE_URL,
  addons: ["@storybook/addon-vitest"],
})
