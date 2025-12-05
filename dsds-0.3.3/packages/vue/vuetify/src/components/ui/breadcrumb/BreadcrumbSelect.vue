<!-- filepath: /project/dsds/packages/react/radix-ui/src/components/ui/BreadcrumbSelect.vue -->
<template>
  <div :class="['dsds-breadcrumb-select-v-wrapper', disabled && 'cursor-not-allowed']"
       v-bind="$attrs">
    <VTooltip v-model="showTooltip"
              :disabled="!shouldShowTooltip || disabled"
              location="top">
      <template #activator="{ props: tooltipProps }">
        <VSelect v-bind="tooltipProps"
                 size="small"
                 variant="ghost"
                 class="dsds-breadcrumb-select"
                 :model-value="selectedValue"
                 :items="selectItems"
                 :disabled="disabled"
                 :class="selectClass"
                 @update:model-value="handleSelect">
          <template #selection="{ item }">
            <div ref="textRef"
                 :class="['truncate pr-[5px]', disabled && disabledStyle]">
              {{ item.title }}
            </div>
          </template>

          <template #append-inner>
            <BreadcrumbSelectboxDisabledIcon v-if="disabled" />
            <BreadcrumbSelectboxIcon v-else />
          </template>

          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps"
                         :title="item.title" />
          </template>
        </VSelect>
      </template>

      <span>
        <slot>{{ selectedItemTitle }}</slot>
      </span>
    </VTooltip>
  </div>
</template>

<script setup lang="ts">
import { BreadcrumbSelectboxDisabledIcon, BreadcrumbSelectboxIcon } from "@/components/icons"
import { VSelect } from "@/components/ui"
import { computed, nextTick, onMounted, ref, useSlots, watch } from "vue"

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  text?: string  // 백업용 prop
  selected?: boolean
  disabled?: boolean
  dropdownItems?: Array<{ title: string; value: string }>
}>()

const emit = defineEmits<{
  select: [value: string]
}>()

const slots = useSlots()
const textRef = ref<HTMLDivElement>()
const showTooltip = ref(false)
const shouldShowTooltip = ref(false)
const selectedValue = ref<string | null>(null)

// slot 내용을 문자열로 추출
const slotContent = computed(() => {
  const slotNodes = slots.default?.(undefined)
  if (slotNodes && slotNodes[0] && typeof slotNodes[0].children === 'string') {
    return slotNodes[0].children
  }
  return props.text || ''
})

const disabledStyle = "pointer-events-none text-[var(--color-text-on-btn-ghost-on-ghost-disabled)]"

const selectClass = computed(() => [
  "flex h-5 max-w-[110px] flex-row items-center rounded-xs px-1.5",
  "hover:cursor-pointer hover:bg-[var(--color-bg-on-ghost-box-ghost-box-hover)]",
  props.selected && !props.disabled && "bg-[var(--color-bg-on-ghost-box-ghost-box-hover)]",
  props.disabled && "pointer-events-none text-[var(--color-text-on-btn-ghost-on-ghost-disabled)]",
  !props.disabled && "focus-visible:outline-ring"
])

const selectItems = computed(() => props.dropdownItems || [])

const selectedItemTitle = computed(() => {
  const item = selectItems.value.find(item => item.value === selectedValue.value)
  return item?.title || slotContent.value
})

const checkTextOverflow = async () => {
  await nextTick()
  if (textRef.value) {
    shouldShowTooltip.value = textRef.value.scrollWidth > textRef.value.clientWidth
  }
}

const handleSelect = (value: string) => {
  selectedValue.value = value
  emit('select', value)
}

const setDefaultSelection = () => {
  if (!selectedValue.value && selectItems.value.length > 0) {
    selectedValue.value = selectItems.value[0].value
  }
}

onMounted(() => {
  checkTextOverflow()
  setDefaultSelection()
})

watch(selectItems, () => {
  setDefaultSelection()
})
</script>

<style>
.dsds-v-select.dropdown-select-ghost.dsds-breadcrumb-select {
  padding-inline: 0px;

  .v-field {
    @apply bg-transparent;
  }

  &:hover .v-input {
    @apply bg-[var(--color-bg-on-ghost-box-ghost-box-hover)];
  }
}
</style>