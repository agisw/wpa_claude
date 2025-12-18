// @ts-ignore
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
// @ts-ignore
import { createVuetify } from 'vuetify'
// @ts-ignore
import * as components from 'vuetify/components'
// @ts-ignore
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
  },
})

export default vuetify
