<template>
  <header class="dsds-header"
          :class="{
            'dsds-header-compact': size === 'compact',
            'dsds-header-cozy': size === 'cozy',
            'dsds-header-with-tabs': withTabs,
            'dsds-header-light': theme === 'light',
            'dsds-header-dark': theme === 'dark',
            'dsds-header-sticky': sticky
          }">
    <div class="dsds-header-wrapper">
      <!-- 커스텀 레이아웃 지원 -->
      <slot v-if="$slots.default" />
      <!-- 데이터 기반 레이아웃 -->
      <template v-else>
        <div v-if="withTabs"
             class="flex h-7 w-full items-center">
          <HeaderLogo v-if="logo"
                      :as="logoAs"
                      :home-url="homeUrl"
                      :on-logo-click="onLogoClick">
            {{ logo }}
          </HeaderLogo>
          <HeaderGNB v-if="gnb && gnb.length > 0">
            <component :is="getComponent(item.type)"
                       v-for="(item, index) in gnb"
                       :key="`${item.type}-${index}`"
                       v-bind="getProps(item)">
              <template v-if="(item as any).content">{{ (item as any).content }}</template>
            </component>
          </HeaderGNB>
          <HeaderUtility v-if="utility && utility.length > 0">
            <component :is="getComponent(item.type)"
                       v-for="(item, index) in utility"
                       :key="`${item.type}-${index}`"
                       v-bind="getProps(item)">
              <template v-if="(item as any).content">{{ (item as any).content }}</template>
            </component>
          </HeaderUtility>
        </div>
        <HeaderTabs v-if="withTabs && tabs && tabs.length > 0"
                    :on-tab-select="onTabSelect"
                    :active-tab="activeTab">
          <component :is="getTabComponent(item.type)"
                     v-for="(item, index) in tabs"
                     :key="`${item.type}-${index}`"
                     v-bind="getTabProps(item)">
            <template v-if="(item as any).content">{{ (item as any).content }}</template>
          </component>
        </HeaderTabs>
        <div v-else
             class="flex w-full items-center">
          <HeaderLogo v-if="logo"
                      :as="logoAs"
                      :home-url="homeUrl"
                      :on-logo-click="onLogoClick">
            {{ logo }}
          </HeaderLogo>
          <HeaderGNB v-if="gnb && gnb.length > 0">
            <component :is="getComponent(item.type)"
                       v-for="(item, index) in gnb"
                       :key="`${item.type}-${index}`"
                       v-bind="getProps(item)">
              <template v-if="(item as any).content">{{ (item as any).content }}</template>
            </component>
          </HeaderGNB>
          <HeaderUtility v-if="utility && utility.length > 0">
            <component :is="getComponent(item.type)"
                       v-for="(item, index) in utility"
                       :key="`${item.type}-${index}`"
                       v-bind="getProps(item)">
              <template v-if="(item as any).content">{{ (item as any).content }}</template>
            </component>
          </HeaderUtility>
        </div>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import HeaderButton from './HeaderButton.vue'
import HeaderDivider from './HeaderDivider.vue'
import HeaderGNB from './HeaderGNB.vue'
import HeaderHamburgerMenu from './HeaderHamburgerMenu.vue'
import HeaderImage from './HeaderImage.vue'
import HeaderLink from './HeaderLink.vue'
import HeaderLogo from './HeaderLogo.vue'
import HeaderMenu from './HeaderMenu.vue'
import HeaderSearchbox from './HeaderSearchbox.vue'
import HeaderTabs from './HeaderTabs.vue'
import HeaderTenant from './HeaderTenant.vue'
import HeaderUtility from './HeaderUtility.vue'

// Context keys
const HeaderThemeKey = Symbol('HeaderTheme')
const HeaderTabsKey = Symbol('HeaderTabs')

// Types
export type HeaderMenuItem = {
  content: string
  value: string
  disabled?: boolean
  description?: string
}

export type HeaderTabItem = {
  content: string
  value: string
  disabled?: boolean
  active?: boolean
}

export type HeaderItem =
  | { type: 'tenant'; content: string; items: HeaderMenuItem[]; onSelect?: (value: string) => void; selected?: string; value?: string }
  | { type: 'menu'; content: string; onSelect?: (value: string) => void; selected?: string; items?: HeaderMenuItem[]; value?: string }
  | { type: 'link'; href: string; content: string; value?: string }
  | { type: 'button'; content?: string; badge?: boolean; notiCount?: number; value?: string }
  | { type: 'divider'; value?: string }
  | { type: 'image'; src: string; alt?: string; value?: string }
  | { type: 'custom'; content: string; value?: string }
  | { type: 'hamburger'; content?: string; value?: string }
  | { type: 'searchbox'; placeholder?: string; value?: string }

// Props
const props = withDefaults(defineProps<{
  logo?: string
  logoAs?: 'a' | 'h1' | 'div'
  homeUrl?: string
  onLogoClick?: (event: MouseEvent) => void
  gnb?: HeaderItem[]
  utility?: HeaderItem[]
  tabs?: HeaderItem[]
  theme?: string
  size?: 'compact' | 'cozy'
  withTabs?: boolean
  sticky?: boolean
}>(), {
  logoAs: 'a',
  homeUrl: '/',
  theme: 'light',
  size: 'compact',
  sticky: false
})

// Emits
const emit = defineEmits<{
  tabSelect: [value: string]
}>()

// Model for activeTab
const activeTab = defineModel<string>()

// Provide theme
provide(HeaderThemeKey, props.theme)

// Provide tabs context
provide(HeaderTabsKey, {
  isInTabs: computed(() => props.withTabs),
  onTabSelect: (value: string) => {
    activeTab.value = value
    emit('tabSelect', value)
  },
  activeTab: activeTab
})

// Component mapping
const getComponent = (type: string) => {
  switch (type) {
    case 'tenant': return HeaderTenant
    case 'menu': return HeaderMenu
    case 'link': return HeaderLink
    case 'button': return HeaderButton
    case 'divider': return HeaderDivider
    case 'image': return HeaderImage
    case 'custom': return 'div'
    case 'hamburger': return HeaderHamburgerMenu
    case 'searchbox': return HeaderSearchbox
    default: return 'div'
  }
}

const getTabComponent = (type: string) => {
  switch (type) {
    case 'menu': return HeaderMenu
    case 'button': return HeaderButton
    case 'link': return HeaderLink
    default: return getComponent(type)
  }
}

// Props mapping
const getProps = (item: HeaderItem) => {
  switch (item.type) {
    case 'tenant':
    case 'menu':
      return {
        items: item.items,
        onSelect: item.onSelect,
        selected: item.selected,
        value: item.value
      }
    case 'link':
      return { href: item.href }
    case 'button':
      return {
        badge: item.badge,
        notiCount: item.notiCount
      }
    case 'image':
      return { src: item.src, alt: item.alt }
    case 'searchbox':
      return { placeholder: item.placeholder }
    default:
      return {}
  }
}

const getTabProps = (item: HeaderItem) => {
  const baseProps = getProps(item)
  if (item.type === 'button' || item.type === 'link') {
    return {
      ...baseProps,
      value: (item as any).value
    }
  }
  return baseProps
}

// Sub-components are now imported from separate files
</script>
