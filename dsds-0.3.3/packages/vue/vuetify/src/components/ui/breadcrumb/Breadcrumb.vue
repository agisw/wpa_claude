<!-- filepath: /project/dsds/packages/react/radix-ui/src/components/ui/Breadcrumb.vue -->
<template>
  <div class="dsds-breadcrumb"
       v-bind="$attrs">
    <!--
      Breadcrumb 컴포넌트 슬롯 설명:
      - default: 기본 슬롯 - BreadcrumbElement 컴포넌트들을 포함
      - first: ellipsis가 true일 때 첫 번째 요소를 위한 슬롯
      - lastThree: ellipsis가 true일 때 마지막 3개 요소를 위한 슬롯
    -->
    <!-- items prop이 제공된 경우 (우선순위 1) -->
    <template v-if="items && items.length > 0">
      <template v-if="items.length <= 5 || !ellipsis">
        <template v-for="(entry, idx) in normalizedItems"
                  :key="entry.key">
          <BreadcrumbElement :is-last="idx === normalizedItems.length - 1">
            <BreadcrumbText :href="typeof entry.item === 'string' ? undefined : entry.item.href"
                            :selected="typeof entry.item === 'string' ? false : entry.item.selected"
                            :disabled="typeof entry.item === 'string' ? false : entry.item.disabled">
              {{ typeof entry.item === 'string' ? entry.item : entry.item.title }}
            </BreadcrumbText>
          </BreadcrumbElement>
        </template>
      </template>

      <template v-else>
        <!-- first -->
        <BreadcrumbElement>
          <BreadcrumbText :href="typeof firstItem?.item === 'string' ? undefined : firstItem?.item.href"
                          :selected="typeof firstItem?.item === 'string' ? false : firstItem?.item.selected"
                          :disabled="typeof firstItem?.item === 'string' ? false : firstItem?.item.disabled">
            {{ typeof firstItem?.item === 'string' ? firstItem?.item : firstItem?.item.title }}
          </BreadcrumbText>
        </BreadcrumbElement>

        <!-- ellipsis -->
        <BreadcrumbElement>
          <div class="pointer-events-none px-1.5 pl-0">...</div>
        </BreadcrumbElement>

        <!-- last three -->
        <template v-for="(entry, i) in lastThreeItems"
                  :key="entry.key">
          <BreadcrumbElement :is-last="i === lastThreeItems.length - 1">
            <BreadcrumbText :href="typeof entry.item === 'string' ? undefined : entry.item.href"
                            :selected="typeof entry.item === 'string' ? false : entry.item.selected"
                            :disabled="typeof entry.item === 'string' ? false : entry.item.disabled">
              {{ typeof entry.item === 'string' ? entry.item : entry.item.title }}
            </BreadcrumbText>
          </BreadcrumbElement>
        </template>
      </template>
    </template>

    <!-- 슬롯이 제공된 경우 기존 슬롯 기반 렌더링 (우선순위 2) -->
    <template v-else-if="hasDefaultSlot">
      <!-- 5개 미만이거나 ellipsis가 false인 경우 전체 표시 -->
      <template v-if="childrenCount <= 5 || !ellipsis">
        <slot />
      </template>

      <!-- 5개 이상이고 ellipsis가 true인 경우 생략 표시 -->
      <template v-else>
        <slot name="first" />
        <BreadcrumbElement>
          <div class="pointer-events-none px-1.5 pl-0">...</div>
        </BreadcrumbElement>
        <slot name="lastThree" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
/**
 * Breadcrumb 아이템 타입 정의
 * @typedef {Object} BreadcrumbItem
 * @property {'text'|'select'} [type] - 아이템 타입 (기본값: 'text')
 * @property {string} title - 표시될 텍스트
 * @property {string} [href] - 링크 URL (text 타입에서만 사용)
 * @property {boolean} [selected] - 선택된 상태
 * @property {boolean} [disabled] - 비활성화 상태
 * @property {Array<{title: string, value: string}>} [dropdownItems] - 드롭다운 메뉴 아이템들 (select 타입에서만 사용)
 */
export type BreadcrumbItem = {
  type?: 'text' | 'select'
  title: string
  href?: string
  selected?: boolean
  disabled?: boolean
  dropdownItems?: Array<{ title: string; value: string }>
}
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue"
import BreadcrumbElement from "./BreadcrumbElement.vue"
import BreadcrumbText from "./BreadcrumbText.vue"

defineOptions({
  inheritAttrs: false
})

/**
 * Breadcrumb 컴포넌트 Props
 * @typedef {Object} BreadcrumbProps
 * @property {boolean} [ellipsis] - 5개 이상의 아이템에서 중간을 생략할지 여부
 * @property {BreadcrumbItem[] | string[]} [items] - 데이터 기반으로 브레드크럼을 구성할 때 사용하는 아이템 배열 (문자열 배열 또는 객체 배열)
 */
const props = defineProps<{
  /** 5개 이상의 아이템에서 중간을 생략할지 여부 */
  ellipsis?: boolean
  /** 데이터 기반으로 브레드크럼을 구성할 때 사용하는 아이템 배열 (문자열 배열 또는 객체 배열) */
  items?: BreadcrumbItem[] | string[]
}>()

const slots = useSlots()

// 슬롯의 자식 개수 계산 (슬롯이 제공되면 기존 동작 유지)
const childrenCount = computed(() => {
  const defaultSlot = slots.default?.(undefined)
  return defaultSlot?.length || 0
})

const hasDefaultSlot = computed(() => !!slots.default && childrenCount.value > 0)

const createItemKey = (item: BreadcrumbItem | string, index: number) => {
  if (typeof item === "string") {
    return item || `breadcrumb-item-${index}`
  }

  const parts = [
    item.type,
    item.title,
    item.href,
    item.selected,
    item.disabled,
    item.dropdownItems ? JSON.stringify(item.dropdownItems) : undefined
  ]
  const key = parts
    .map((part) => part === undefined ? "" : String(part))
    .filter((part) => part !== "")
    .join("|")

  return key || `breadcrumb-item-${index}`
}

const normalizedItems = computed(() =>
  (props.items ?? []).map((item, index) => ({
    item,
    key: createItemKey(item, index)
  }))
)

const firstItem = computed(() => normalizedItems.value[0])
const lastThreeItems = computed(() => normalizedItems.value.slice(-3))
</script>
