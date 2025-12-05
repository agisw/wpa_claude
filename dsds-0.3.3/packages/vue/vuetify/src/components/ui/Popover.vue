<template>
  <VMenu v-model:model-value="open"
         v-bind="$attrs"
         :close-on-content-click="closeOnContentClick"
         :content-class="['dsds-dropdown-content-base', props.contentClass].filter(Boolean).join(' ')"
         :origin="origin"
         :transition="transition"
         :max-height="maxHeight"
         :offset="offset"
         :location="location"
         class="dsds-popover-menu">
    <template #activator="{ props: activatorProps }">
      <slot name="activator"
            :props="activatorProps">
        <VBtn variant="secondary"
              size="large"
              v-bind="activatorProps">
          <slot name="trigger">
            {{ triggerLabel }}
          </slot>
        </VBtn>
      </slot>
    </template>

    <div class="dsds-popover-container">
      <div class="dsds-popover-header">
        <slot name="title">
          <div v-if="title"
               :class="[
                'dsds-popover-title',
                props.titleClass
              ]">
            {{ title }}
          </div>
        </slot>
        <button type="button"
                class="dsds-popover-button"
                :aria-label="closeButtonLabel"
                @click="handleClose">
          <slot name="close-icon">
            <CloseIcon :size="18" />
          </slot>
        </button>
      </div>
      <div class="dsds-popover-divider"
           aria-hidden="true" />
      <div :class="[
        'dsds-popover-content',
        props.bodyClass
      ]">
        <slot />
      </div>
    </div>
  </VMenu>
</template>

<script setup lang="ts">
import { CloseIcon } from '@/components/icons'
import { watch } from 'vue'
import { VMenu } from 'vuetify/components'
import type { Anchor } from 'vuetify/lib/util/index.mjs'
import VBtn from './VBtn.vue'

defineOptions({
  inheritAttrs: false
})

interface Props {
  title?: string
  triggerLabel?: string
  closeButtonLabel?: string
  headerClass?: string | string[] | Record<string, boolean>
  titleClass?: string | string[] | Record<string, boolean>
  bodyClass?: string | string[] | Record<string, boolean>
  contentClass?: string
  index?: number
  display?: (value: boolean, index?: number) => void
  closeOnContentClick?: boolean
  origin?: 'auto' | Anchor | 'overlap'
  transition?: string
  maxHeight?: string | number | undefined
  offset?: number | string | number[]
  location?: Anchor
}

const props = withDefaults(defineProps<Props>(), {
  triggerLabel: 'Open popover',
  closeButtonLabel: '팝오버 닫기',
  closeOnContentClick: false,
  origin: 'auto',
  transition: 'scale-transition',
  maxHeight: undefined,
  offset: 4,
  location: 'bottom',
  contentClass: ''
})

const emit = defineEmits<{
  close: []
}>()

const open = defineModel<boolean>('open', { default: false })

watch(open, (value, oldValue) => {
  if (value === oldValue) {
    return
  }

  props.display?.(value, props.index ?? 0)

  if (!value && oldValue) {
    emit('close')
  }
})
const handleClose = () => {
  if (!open.value) {
    return
  }
  open.value = false
}
</script>