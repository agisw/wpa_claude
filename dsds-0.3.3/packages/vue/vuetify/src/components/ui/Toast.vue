<template>
  <div class="dsds-toast-container">
    <Toaster :position="position"
             :expand="expand"
             :duration="duration"
             :visible-toasts="visibleToasts"
             :gap="gap"
             :offset="offset"
             class="dsds-toaster max-h-[280px]! max-w-[288px]! no-animation" />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Toaster, toast } from 'vue-sonner'
import CustomToast, { type CustomToastProps } from './CustomToast.vue'

const props = withDefaults(defineProps<ToastProps>(), {
  position: 'top-right',
  expand: true,
  duration: 2000,
  visibleToasts: 4,
  gap: 12,
  offset: '20px',
})

</script>

<script lang="ts">

export interface ToastProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  expand?: boolean
  duration?: number
  visibleToasts?: number
  gap?: number
  offset?: string
}

type ToastOptions = Partial<CustomToastProps> & {
  duration?: number;
}

// Custom toast function
export const showToast = (message: string, options?: ToastOptions) => {
  const CustomToastComponent = (t: any) => h(CustomToast, {
    ...(options || {}),
    body: message,
    onClose: () => {
      options?.onClose?.()
      t.onCloseToast()
    }
  })

  toast.custom(CustomToastComponent, {
    duration: options?.duration,
  })
}
</script>

<style>
.dsds-toast-container {
  z-index: 99999 !important;
  ol > li {
    list-style: none !important;
  }
}
</style>