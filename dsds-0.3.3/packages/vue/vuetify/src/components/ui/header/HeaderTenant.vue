<template>
  <HeaderMenu v-bind="$attrs"
              class="dsds-header-tenant"
              :buttonClasses="['typo-sss-h5-13-700!']"
              :items="items"
              :on-select="onSelect"
              :selected="selected">
    <slot>{{ content }}</slot>
  </HeaderMenu>
</template>

<script setup lang="ts">
import HeaderMenu from './HeaderMenu.vue'

defineOptions({
  inheritAttrs: false
})

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
  content?: string
}

defineProps<Props>()

const emit = defineEmits<{
  select: [value: string]
}>()
</script>
