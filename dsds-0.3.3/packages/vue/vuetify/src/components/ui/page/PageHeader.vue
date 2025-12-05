<template>
  <div :class="['dsds-page-header', {
    'with-border': props.bordered,
    'with-filter': hasFilterSlot
  }]">
    <div class="flex w-full flex-row items-center gap-12px">
      <div class="flex shrink-0 flex-row items-center">
        <span v-if="title"
              class="typo-sok-h4-20-700 ">{{ title }}</span>
        <VRating v-if="showFavorite"
                 :model-value="isFavorite ? 1 : 0"
                 length="1"
                 :aria-label="favoriteAriaLabel"
                 clearable
                 @update:model-value="handleFavoriteUpdate" />

        <!-- Tooltip 사용이 가능한 경우에만 렌더링 -->
        <v-tooltip v-if="tooltipContent"
                   location="bottom start"
                   class="ml-8px">
          <template #activator="{ props }">
            <div v-bind="props"
                 class="flex h-6 w-6 items-center justify-center">
              <InformationIcon />
            </div>
          </template>

          <!-- string 또는 VNode/slot 형태를 모두 지원 -->
          <div v-if="tooltipIsString"
               class="text-xs text-balance px-2 py-1">
            {{ tooltipContent }}
          </div>
          <component v-else
                     :is="tooltipVNode" />
        </v-tooltip>
      </div>

      <!-- children slot -->
      <slot />

      <!-- tools slot: place right-aligned tools (e.g., buttons) here -->
      <div class="ml-auto flex flex-row items-center gap-6px">
        <slot name="tools" />
      </div>
    </div>
  </div>
  <PageHeaderFilter v-if="hasFilterSlot">
    <slot name="filter" />
  </PageHeaderFilter>
</template>

<script setup lang="ts">
import { InformationIcon } from "@/components/icons"
import type { PageHeaderFilter, PageTabItem } from "@/components/ui"
import { VRating } from "@/components/ui"
import { hasSlotContent } from "@/lib/utils"
import { computed, ref, useSlots, type VNode } from "vue"

type TooltipProp = string | VNode | null

const props = withDefaults(
  defineProps<{
    title: string
    tooltipContent?: TooltipProp
    showFavorite?: boolean
    favorite?: boolean
    bordered?: boolean
  }>(),
  {
    showFavorite: false,
  }
)

const slots = useSlots()
const hasFilterSlot = computed(() => hasSlotContent(slots.filter))

const tooltipContent = props.tooltipContent ?? null
const tooltipIsString = typeof tooltipContent === "string" || tooltipContent == null
// 만약 VNode를 직접 전달받는 경우를 위한 변수 (사용자 필요시 slot 활용 권장)
const tooltipVNode = (tooltipContent as unknown as VNode) ?? null

const pageTabModel = defineModel<PageTabItem | null>("pageTab", { default: null })
const emit = defineEmits<{
  (event: "update:favorite", value: boolean): void
}>()

const uncontrolledFavorite = ref(props.favorite ?? false)

const isFavorite = computed(() => {
  const tab = pageTabModel.value
  if (tab) return Boolean(tab.isFavorite)
  if (props.favorite !== undefined) return Boolean(props.favorite)
  return uncontrolledFavorite.value
})

const favoriteAriaLabel = computed(() => (isFavorite.value ? "즐겨찾기 해제" : "즐겨찾기 설정"))

const updateFavorite = (value: boolean) => {
  if (pageTabModel.value) {
    const tab = pageTabModel.value
    pageTabModel.value = { ...tab, isFavorite: value }
  } else if (props.favorite === undefined) {
    uncontrolledFavorite.value = value
  }

  emit("update:favorite", value)
}

const handleFavoriteUpdate = (value: number | string) => {
  const numericValue = Number(value)
  const next = Number.isNaN(numericValue) ? Boolean(value) : numericValue > 0
  updateFavorite(next)
}
</script>

<style scoped>
/* 필요 시 추가적인 스타일 보완*/
</style>