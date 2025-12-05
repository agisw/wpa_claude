export * from "./components/ui"
export * from "./components/icons"

import type { DefaultsInstance, ThemeDefinition } from "vuetify"
import { createVuetify as originalCreateVuetify } from "vuetify"
// import "vuetify/styles"
import "./index.css"

import { defaults, theme } from "@/plugins/vuetify"
import {
  /** Vuetify 원본 컴포넌트 */
  VContainer,
  VApp,
  VMain,
  VImg,
  VCard,
  VCardTitle,
  VCardActions,
  VRow,
  VCol,
  VIcon,
  VFooter,
  VOverlay,
  VDivider,
  VSpacer,
  VFileInput,

  /** DSDS 커스텀 구현 */
  Modal,
  VBtn,
  VSelect,
  VAutocomplete,
  VCardText,
  VCheckbox,
  VDialog,
  VRadio,
  VRadioGroup,
  VTextField,
  VTooltip,
  VueDatePicker,
  VRating,
  VTabs,
  VTabsContainer,
  VTabsContent,
  VTabsWindow,
  VTabsWindowItem,
  VSwitch,
  PageTabs,
  Header,
  Footer,
  Splitter,
  SplitterHandle,
  SplitterPanel,
  LNB,
} from "./components/ui"

type Options = {
  defaults?: DefaultsInstance
  theme?: ThemeDefinition & { defaultTheme?: string }
  components?: Record<string, any>
}

// createVuetify 함수 재정의
export function createVuetify(options: Options = {}) {
  // 기본 옵션과 사용자 옵션 병합
  // 사용자 옵션으로 기본 옵션 덮어쓰기
  const mergedOptions = {
    ...options,
    defaults: {
      ...(options?.defaults || {}),
      ...defaults,
    },
    theme,
    components: {
      ...(options?.components || {}),
      /** Vuetify */
      VContainer,
      VApp,
      VMain,
      VImg,
      VCard,
      VCardTitle,
      VCardActions,
      VRow,
      VCol,
      VIcon,
      VFooter,
      VOverlay,
      VDivider,
      VSpacer,
      VFileInput,
      /** DSDS Custom */
      VBtn,
      VSelect,
      VAutocomplete,
      VCardText,
      VCheckbox,
      Modal,
      VDialog,
      VRadio,
      VRadioGroup,
      VTextField,
      VTooltip,
      VRating,
      VueDatePicker,
      VSwitch,
      VTabs,
      VTabsContainer,
      VTabsContent,
      VTabsWindow,
      VTabsWindowItem,
      PageTabs,
      Header,
      Footer,
      LNB,
      Splitter,
      SplitterHandle,
      SplitterPanel,
    },
  }

  // 원본 createVuetify 호출
  return originalCreateVuetify(mergedOptions)
}
