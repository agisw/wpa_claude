<template>
  <div class="dsds-header-searchbox">
    <Searchbox v-model="modelValue"
               :placeholder="placeholder || 'Search'"
               :class="wrapperClass"
               :width="props.width"
               size="small"
               clearable
               :disabled="disabled"
               v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import { Searchbox } from '@/components/ui'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

interface Props {
  placeholder?: string
  /* 필요: Searchbox 로 전달될 class */
  class?: string
  width?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 100,
})

const modelValue = defineModel<string>()

const wrapperClass = computed<string[]>(() =>
  ["dsds-header-searchbox header-searchbox-wrapper", props.class].filter(
    (value): value is string => Boolean(value)
  )
)

</script>
