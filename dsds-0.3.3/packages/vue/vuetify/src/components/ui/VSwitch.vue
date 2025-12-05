<template>
  <Toggle v-bind="$attrs"
          :disabled="disabled"
          :size="size"
          v-model:checked="checked" />
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue"
import Toggle from "./Toggle.vue"

defineOptions({
  name: "VSwitch",
  inheritAttrs: false,
})

type SwitchSize = "large" | "medium" | "small"

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    size?: SwitchSize
  }>(),
  {
    modelValue: false,
    disabled: false,
    size: "medium" as SwitchSize,
  }
)

const emit = defineEmits<{
  "update:modelValue": [boolean]
  change: [boolean]
}>()

const checked = ref(props.modelValue ?? false)
const isSyncingFromProps = ref(false)

watch(
  () => props.modelValue,
  (value) => {
    const next = value ?? false
    if (next !== checked.value) {
      isSyncingFromProps.value = true
      checked.value = next
    }
  }
)

watch(
  checked,
  (value) => {
    if (isSyncingFromProps.value) {
      isSyncingFromProps.value = false
      return
    }

    emit("update:modelValue", value)
    emit("change", value)
  }
)

const { disabled, size } = toRefs(props)
</script>
