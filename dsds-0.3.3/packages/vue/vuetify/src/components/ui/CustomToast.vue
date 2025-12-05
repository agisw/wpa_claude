<template>
  <div class="dsds-custom-toast">
    <!-- Left border indicator -->
    <div :class="[
      'dsds-toast-border',
      type === 'success' && 'dsds-toast-border--success',
      type === 'fail' && 'dsds-toast-border--fail',
      type === 'warning' && 'dsds-toast-border--warning',
      type === 'inform' && 'dsds-toast-border--inform'
    ]" />

    <!-- Content -->
    <div :class="[
      'dsds-toast-content',
      type === 'success' && 'dsds-toast-content--success',
      type === 'fail' && 'dsds-toast-content--fail',
      type === 'warning' && 'dsds-toast-content--warning',
      type === 'inform' && 'dsds-toast-content--inform'
    ]">
      <!-- Icon -->
      <div class="dsds-toast-icon">
        <component :is="iconComponent"
                   v-if="iconComponent" />
      </div>

      <!-- Text content -->
      <div class="dsds-toast-text">
        <div v-if="title"
             class="dsds-toast-title">
          {{ title }}
        </div>
        <div v-if="body"
             class="dsds-toast-body">
          {{ body }}
        </div>
        <a v-if="link"
           :href="link"
           target="_blank"
           class="dsds-toast-link">
          Linked Text
        </a>
      </div>

      <!-- Close button -->
      <div class="dsds-toast-close">
        <button class="dsds-toast-close-button"
                @click="handleClose">
          <CloseIcon :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
export type CustomToastProps = {
  type?: 'success' | 'fail' | 'warning' | 'inform'
  title?: string
  body?: string
  link?: string
  duration?: number
  onClose?: () => void
}
</script>

<script setup lang="ts">
import { CloseIcon, ToastFailIcon, ToastInformIcon, ToastSuccessIcon, ToastWarningIcon } from '@/components/icons'
import { computed } from 'vue'

const props = withDefaults(defineProps<CustomToastProps>(), {
  type: 'inform',
});

const iconComponent = computed(() => {
  switch (props.type) {
    case 'success':
      return ToastSuccessIcon
    case 'fail':
      return ToastFailIcon
    case 'warning':
      return ToastWarningIcon
    case 'inform':
      return ToastInformIcon
    default:
      return ToastInformIcon
  }
})

const handleClose = () => {
  if (props.onClose) {
    props.onClose()
  }
  // Toast dismiss is handled in Toast.vue
}
</script>