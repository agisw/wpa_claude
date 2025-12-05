<template>
  <button v-for="item in items"
          :key="item.id"
          type="button"
          :tabindex="item.disabled ? -1 : 0"
          :disabled="item.disabled"
          :class="itemClasses(item)"
          @click="() => onSelect(item)">
    <div v-if="!item.disabled && isItemSelected(item)"
         class="lnb-item-active-indicator" />
    <div v-if="item.depth && item.depth != 0">
      <!-- Bullet 사용 시 -->
      <div v-if="showBullet"
           :style="{ marginLeft: `${getMargin(item)}px` }"
           class="lnb-item-bullet">
        <LNBBulletIcon class="lnb-item-bullet-icon" />
      </div>
      <!-- Bullet 미사용 시 -->
      <div v-else>
        <!-- Accordion 바로 밑에 item이 붙는 경우 -->
        <div v-if="!onlyTree && item.depth == 1"
             class="w-12px flex h-full shrink-0" />
        <!-- Tree 밑에 item이 붙는 경우 -->
        <div v-else
             :style="{ width: `${9 + 16 * (item.depth - 1)}px` }"
             class="flex h-full shrink-0"></div>
      </div>
    </div>
    <!-- 평면 구조인 경우 -->
    <div v-else
         class="lnb-item-bullet-placeholder" />
    <span class="lnb-item-label">
      <LNBHighlightedText :text="item.content"
                          :search-text="searchText" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import LNBBulletIcon from "./LNBBulletIcon.vue"
import LNBHighlightedText from "./LNBHighlightedText.vue"
import { useLNBContext } from "./context"
import type { LNBContentItem } from "./types"

interface LNBContentProps {
  items: LNBContentItem[]
}

defineProps<LNBContentProps>()

const {
  maxDepth,
  selectedItem,
  selectedItemId,
  handleSelectionChange,
  onlyTree,
  searchText,
} = useLNBContext()

const showBullet = computed(() => {
  /* 불릿 표시 규칙: 최대 깊이가 3단계를 초과하는 경우에만 불릿 표시
     3단계 이하에서는 손자 메뉴(3단계 항목)에 불릿을 표시하지 않음 */
  const depth = maxDepth.value

  return typeof depth === "number" && ((!onlyTree.value && depth > 3) || (onlyTree.value && depth > 2))
})

const getMargin = (item: LNBContentItem) => {
  if (!item.depth) return 8
  const base = item.depth * 16 + 8
  return onlyTree.value ? base : base - 16
}

const isItemSelected = (item: LNBContentItem) => {
  return selectedItem.value?.id === item.id || selectedItemId.value === item.id
}

const itemClasses = (item: LNBContentItem) =>
  [
    "lnb-item",
    {
      "lnb-item-selected": isItemSelected(item),
      "lnb-item-disabled": item.disabled,
    },
  ]

const onSelect = (item: LNBContentItem) => {
  if (item.disabled) return
  handleSelectionChange(item)
}
</script>
