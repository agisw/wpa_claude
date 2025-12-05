<template>
  <div v-bind="$attrs"
       :class="['dsds-form-field',
        { 'dsds-form-field-large': size === 'large' },
        { 'no-label': !label, 'with-tools': hasToolsSlot }]">
    <FormLabel :required="required"
               class="dsds-form-field-label">
      {{ label || '&nbsp;' }}
      <div v-if="hasToolsSlot"
           class="dsds-form-field-tools">
        <slot name="tools" />
      </div>
    </FormLabel>
    <slot />
  </div>

</template>

<script setup lang="ts">

import { computed, useSlots } from "vue"
import FormLabel from "./FormLabel.vue"

defineOptions({
  inheritAttrs: false
})

type Props = {
  label?: string
  required?: boolean
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  required: false,
  size: 'medium'
})

const slots = useSlots()

const hasToolsSlot = computed(() => Boolean(slots.tools))
</script>
