/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// import "vuetify/styles"

// Composables
import { createVuetify, type VuetifyOptions } from "vuetify"
import type { DefaultsInstance, ThemeDefinition } from "vuetify/lib/framework.mjs"

export const lightTheme: ThemeDefinition = {
  dark: false,
}

export const theme = {
  themes: {
    light: lightTheme,
    dark: {},
  },
}

export const defaults: DefaultsInstance = {
  global: {
    ripple: false,
  },
}

export const defaultOptions: VuetifyOptions = {
  theme,
  aliases: {},
  defaults,
  components: {},
}

export default createVuetify(defaultOptions)
