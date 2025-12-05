<template>
  <button type="button"
          role="switch"
          data-slot="toggle"
          :aria-checked="checked"
          :aria-disabled="props.disabled || undefined"
          :disabled="props.disabled"
          :data-state="checked ? 'checked' : 'unchecked'"
          :data-disabled="props.disabled ? '' : undefined"
          class="dsds-toggle"
          :class="[
            sizeClassMap[props.size],
            checked ? 'dsds-toggle-checked' : 'dsds-toggle-unchecked'
          ]"
          @click="handleToggle">
    <span data-slot="toggle-thumb"
          class="dsds-toggle-thumb"
          :class="[
            thumbSizeClassMap[props.size],
            checked ? 'dsds-toggle-thumb-checked' : 'dsds-toggle-thumb-unchecked'
          ]"
          :data-state="checked ? 'checked' : 'unchecked'"
          :data-disabled="props.disabled ? '' : undefined">
      <span class="icon [&>svg]:stroke-toggle-thumb-stroke size-3">
        <svg fill="none">
          <path d="M2 5L5 8L10 3"
                stroke-width="1.7" />
        </svg>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  /** Toggle의 크기 */
  size?: "large" | "medium" | "small"
  /** 비활성화 여부 */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  disabled: false,
})

const checked = defineModel<boolean>("checked", { default: false })

const emit = defineEmits<{
  "checked-change": [boolean]
  change: [boolean]
}>()

const sizeClassMap = {
  large: "dsds-toggle-large",
  medium: "dsds-toggle-medium",
  small: "dsds-toggle-small",
} as const

const thumbSizeClassMap = {
  large: "dsds-toggle-thumb-large",
  medium: "dsds-toggle-thumb-medium",
  small: "dsds-toggle-thumb-small",
} as const

const handleToggle = () => {
  if (props.disabled) return

  const next = !checked.value
  checked.value = next
  emit("checked-change", next)
  emit("change", next)
}

defineOptions({
  name: "Toggle",
})
</script>
