import { createI18n, I18nOptions } from "vue-i18n"
import ko from "../src/stories/locales/ko.json"
import en from "../src/stories/locales/en.json"
import { setup } from "@storybook/vue3-vite"

const options: I18nOptions = {
  locale: "ko",
  fallbackLocale: "en",
  legacy: false,
  messages: {
    en: en,
    ko: ko,
  },
}

// Initialize vue-i18n instance
const i18n = createI18n<false, typeof options>(options)

setup((app) => {
  app.use(i18n)
})

export const i18nDecorator = (Story: any, context: any) => {
  const locale = context.globals.locale || "ko"

  if (i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale
  }

  return {
    components: { Story },
    template: "<story />",
  }
}
