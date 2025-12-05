<template>
  <VBtn variant="secondary"
    :size="props.size"
    iconOption="before"
    :icon="toggleButtonIcon"
    :active="isChecked"
    @click="isChecked = !isChecked"
    v-bind="$attrs">
    <slot />
  </VBtn>
</template>

<script setup lang="ts">
import { VBtn, VCheckbox } from "@/components/ui"
import { computed, defineComponent, h } from 'vue'

defineOptions({
  name: "ToggleButton",
  inheritAttrs: false
})

const isChecked = defineModel<boolean>()

const props = withDefaults(defineProps<{
  size?: "small" | "medium" | "large"
}>(), {
  size: "medium"
})

const createCheckboxIcon = (isChecked: boolean) =>
  defineComponent({
    name: isChecked ? 'CheckedIcon' : 'NotCheckedIcon',
    setup() {
      return () =>
        h(VCheckbox, {
          modelValue: isChecked,
          readonly: true,
          tabindex: -1,
          class: 'focus-within:outline-ring-0!',
          'aria-hidden': 'true'
        } as any)
    }
  })

const CheckedIcon = createCheckboxIcon(true)
const NotCheckedIcon = createCheckboxIcon(false)

const toggleButtonIcon = computed(() => (isChecked.value ? CheckedIcon : NotCheckedIcon))

</script>