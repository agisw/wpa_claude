<template>
  <DropdownMenu class="dsds-header-menu"
                :items="menuItems"
                v-model:selected="selectedValue"
                @select="handleDropdownSelect">
    <template #activator="{ props: activatorProps }">
      <VBtn variant="ghost"
            :class="buttonClasses"
            v-bind="activatorProps"
            @click="handleActivatorClick">
        <div :class="[
          'header-button-label',
          isInTabs && 'header-menu-tab'
        ]">
          <slot>{{ content }}</slot>
        </div>
        <ChevronDownIcon class="header-menu-icon ml-1"
                         v-if="hasMenuItems" />
      </VBtn>
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@/components/icons'
import { VBtn } from '@/components/ui'
import { computed, inject, ref, unref, watch } from 'vue'
import DropdownMenu from '../DropdownMenu.vue'

interface HeaderMenuItem {
  content: string
  value: string
  disabled?: boolean
  description?: string
}

interface Props {
  items?: HeaderMenuItem[]
  onSelect?: (value: string) => void
  selected?: string
  value?: string
  content?: string
  /** 필요: VBtn 으로 전달될 class */
  class?: string | string[] | Record<string, boolean>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [value: string]
  click: [event: MouseEvent]
  'update:selected': [value: string | undefined]
}>()

const internalSelected = ref(props.selected)
watch(() => props.selected, (value) => {
  internalSelected.value = value
})

const selectedValue = computed({
  get: () => internalSelected.value,
  set: (value) => {
    internalSelected.value = value
    emit('update:selected', value)
  }
})

const menuItems = computed(() => props.items ?? [])
const hasMenuItems = computed(() => menuItems.value.length > 0)

const HeaderTabsKey = Symbol('HeaderTabs')
const tabsContext = inject(HeaderTabsKey, { isInTabs: false, onTabSelect: (v: string) => { }, activeTab: '' })

const isInTabs = computed(() => Boolean(unref(tabsContext.isInTabs)))
const activeTabValue = computed(() => unref(tabsContext.activeTab) ?? '')

const isTabActive = computed(() => {
  if (!isInTabs.value) return false
  if (!hasMenuItems.value) {
    return props.value !== undefined && props.value === activeTabValue.value
  }
  return menuItems.value.some((item) => item.value === activeTabValue.value)
})

const buttonClasses = computed(() => [
  'dsds-header-button',
  isInTabs.value && 'header-tab-item',
  isTabActive.value && 'header-tab-active',
  (!hasMenuItems.value && isTabActive.value) && 'pointer-events-none',
  props.class
].filter(Boolean) as string[])

const handleActivatorClick = (e: MouseEvent) => {
  if (!hasMenuItems.value && isInTabs.value && tabsContext.onTabSelect && props.value) {
    tabsContext.onTabSelect(props.value)
  }
  emit('click', e)
}

const handleDropdownSelect = (value: string) => {
  props.onSelect?.(value)
  emit('select', value)

  if (isInTabs.value && tabsContext.onTabSelect) {
    tabsContext.onTabSelect(value)
  }
}
</script>
