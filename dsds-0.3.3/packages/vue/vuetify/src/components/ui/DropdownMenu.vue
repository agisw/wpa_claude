<template>
  <VMenu v-bind="$attrs"
         :close-on-content-click="closeOnContentClick"
         :content-class="contentClasses"
         :origin="origin"
         :transition="transition"
         :max-height="maxHeight"
         :offset="offset"
         :location="location"
         class="dsds-dropdown-menu">
    <template #activator="{ props: activatorProps }">
      <slot name="activator"
            :props="activatorProps">
        <VBtn variant="ghost"
              v-bind="activatorProps">
          <div class="dropdown-activator-label">
            <slot />
          </div>
        </VBtn>
      </slot>
    </template>

    <slot v-if="hasMenuItems"
          name="list"
          :items="menuItems"
          :select="handleItemSelect"
          :selected="selectedValue">
      <VList class="min-w-48">
        <VListItem v-for="item in menuItems"
                   :key="item.value ?? item.content"
                   :value="item.value"
                   :disabled="item.disabled"
                   :active="selectedValue === item.value"
                   @click="handleItemSelect(item)">
          <template #title>
            {{ item.content }}
          </template>
        </VListItem>
      </VList>
    </slot>
    <slot v-else
          name="empty" />
  </VMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VList, VListItem, VMenu } from 'vuetify/components'
import type { Anchor } from 'vuetify/lib/util/index.mjs'
import VBtn from './VBtn.vue'

defineOptions({
  inheritAttrs: false
})

interface DropdownMenuItem {
  content: string
  value: string
  disabled?: boolean
  description?: string
}

interface Props {
  items?: DropdownMenuItem[]
  onSelect?: (value: string) => void
  closeOnContentClick?: boolean
  origin?: 'auto' | Anchor | 'overlap'
  transition?: string
  maxHeight?: number | string
  offset?: number | string | number[]
  location?: Anchor
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  closeOnContentClick: true,
  origin: 'auto',
  transition: 'scale-transition',
  maxHeight: 300,
  offset: 4,
  location: 'bottom',
  contentClass: ''
})

const emit = defineEmits<{
  select: [value: string]
  'update:selected': [value: string | undefined]
}>()

const selectedModel = defineModel<string | undefined>('selected')

const selectedValue = computed({
  get: () => selectedModel.value,
  set: (value) => {
    selectedModel.value = value
    emit('update:selected', value)
  }
})

const menuItems = computed(() => props.items ?? [])
const hasMenuItems = computed(() => menuItems.value.length > 0)

const contentClasses = computed(() => {
  const classes = ['dsds-dropdown-content-base']
  if (props.contentClass) {
    classes.push(props.contentClass)
  }
  return classes.join(' ')
})

const handleItemSelect = (item: DropdownMenuItem) => {
  if (item.disabled) return
  selectedValue.value = item.value
  props.onSelect?.(item.value)
  emit('select', item.value)
}

export type { DropdownMenuItem }
</script>

<style scoped>
.dropdown-activator-label {
  display: inline-flex;
  align-items: center;
}
</style>
