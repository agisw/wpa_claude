declare module 'vuetify/styles' {
  const styles: any
  export = styles
}

declare module 'vuetify' {
  import { App } from 'vue'
  export function createVuetify(options?: any): {
    install(app: App): void
  }
  export * from 'vuetify/components'
  export * from 'vuetify/directives'
}

declare module 'vuetify/components' {
  export const VApp: any
  export const VAppBar: any
  export const VMain: any
  export const VBtn: any
  export const VIcon: any
  export const VSelect: any
  export const VDivider: any
  export const VSpacer: any
}

declare module 'vuetify/directives' {
  export const Ripple: any
}
