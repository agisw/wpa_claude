<template>
  <v-overlay
    v-model="internalVisible"
    :scrim="scrim"
    persistent
    no-click-animation
    v-bind="$attrs"
    class="dsds-loader-overlay"
    :contained="contained"
  >
    <SpinnerIcon :size="size" />
    <div class="dsds-loader-message h-5 flex items-center justify-center typo-sss-h5-13-700" v-show="!hideMessage" v-html="message"></div>
  </v-overlay>
</template>

<script setup lang="ts">
import { SpinnerIcon } from '@/components/icons'
import { onBeforeUnmount, ref, watch } from 'vue'
import { VOverlay } from 'vuetify/components'

const props = withDefaults(defineProps<{
  message?: string;
  hideMessage?: boolean;
  /** Spinner 크기 */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  /** 오버레이 배경을 표시할지 여부 */
  scrim?: boolean;
  /** 부모 컨테이너에 포함될 오버레이로 표시할지 여부 */
  contained?: boolean;
  /** 스피너 노출까지 지연(ms) */
  delay?: number;
}>(), {
  message: 'Loading…',
  scrim: false,
  size: 'xl',
  delay: 0,
});

const modelValue = defineModel<boolean>({
  default: true,
})

const internalVisible = ref(false)
let delayTimer: ReturnType<typeof setTimeout> | null = null

const clearDelayTimer = () => {
  if (delayTimer) {
    clearTimeout(delayTimer)
    delayTimer = null
  }
}

watch(
  modelValue,
  (value) => {
    if (value) {
      if (internalVisible.value) {
        clearDelayTimer()
        return
      }

      const delayMs = Math.max(0, props.delay ?? 0)
      if (delayMs === 0) {
        internalVisible.value = true
        return
      }

      clearDelayTimer()
      delayTimer = setTimeout(() => {
        internalVisible.value = true
        delayTimer = null
      }, delayMs)
      return
    }

    clearDelayTimer()
    internalVisible.value = false
  },
  { immediate: true }
)

watch(
  internalVisible,
  (value) => {
    if (!value && modelValue.value) {
      modelValue.value = false
    }
  }
)

onBeforeUnmount(clearDelayTimer)
</script>

<style>
.dsds-loader-overlay {
  pointer-events: none !important;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*vuetify dialog z-index가 2400이라 더 높게 설정*/
  z-index: 2401;

  .v-overlay__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .dsds-spinner {
    --spinner-color: var(--color-brand);
  }

  .dsds-loader-message {
    color: var(--color-neutral-2nd);
    text-shadow: 0 0 8px #fff, 0px 0px 5px #fff;
    margin-top: -58px;
    user-select: none;
  }
}

</style>
