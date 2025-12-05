<template>
  <VSelectPrimitive ref="selectRef"
                    :variant="mappedVariant"
                    :disabled="disabled"
                    :class="[...selectClasses, multiple && badgePosition === 'after' && 'badge-after']"
                    :style="selectStyles"
                    :maxWidth="maxWidth || width ? parseInt(String(width)) + 'px' : undefined"
                    :menu-props="{
                      contentClass: 'dsds-dropdown-content-base',
                      origin: 'auto',
                      transition: 'scale-transition',
                      maxHeight: 300,
                      offset: 4,
                    }"
                    :autocomplete="autocomplete || 'off'"
                    :item-title="itemTitle"
                    :item-value="itemValue"
                    :items="items"
                    :model-value="modelValue"
                    :placeholder="placeholder"
                    :clearable="clearable"
                    :multiple="multiple"
                    v-bind="$attrs"
                    @update:model-value="handleUpdateModel">

    <!-- Selection 영역 - 조건부 slot 처리 -->
    <template #selection="{ item, index }">
      <!-- 1) Single mode: 기존 Vuetify slot 그대로 전달 -->
      <template v-if="!multiple">
        <slot name="selection"
              :item="item"
              :index="index">
          <!-- 기본 single selection 표시 - 실제 구현 -->
          <span>{{ item.title }}</span>
        </slot>
      </template>

      <!-- 2) Multiple mode: 선택 갯수 뱃지 표시 -->
      <!-- 3) Multiple mode & `All` 선택되지 않은 경우: 사용자 slot 허용 -->
      <template v-else-if="multiple">
        <template v-if="index === 0">
          <!-- 선택된 항목 수 뱃지와 첫 번째 항목을 함께 표시 -->
          <div class="flex items-center gap-2 w-full overflow-hidden">
            <div v-if="badgePosition === 'before'"
                 :class="['selection-count-badge', showAll && isAllSelected && 'all-selected']">
              {{ showAll && isAllSelected ? 'All' : selectedTitles?.length || '0' }}
            </div>
            <slot name="selection"
                  :item="item"
                  :index="index"
                  :selectedTitles="selectedTitles">
              <!-- 기본 multiple selection 표시 -->
              <span class="multi-selection-text flex-1 min-w-0"
                    :title="selectedTitles?.join(', ')">
                <span class="truncate">{{ selectedTitles?.join(', ') }}</span>
              </span>
            </slot>
          </div>
        </template>
      </template>
    </template>

    <!-- 고정된 `All` 체크박스 헤더 (multiple && showAll일 때) -->
    <template #prepend-item
              v-if="multiple && showAll">
      <div class="sticky-all-header">
        <v-list-item :active="isAllSelected"
                     tabindex="-1"
                     :class="{
                      'all-list-item': true,
                      'selected': isAllSelected
                    }"
                     @click="handleAllToggle">
          <template #prepend>
            <VCheckbox class="mr-1.5!"
                       tabindex="-1"
                       :model-value="isAllSelected"
                       :indeterminate="isIndeterminate"
                       @click.stop="handleAllToggle" />
          </template>
          <v-list-item-title class="font-medium">
            All
          </v-list-item-title>
        </v-list-item>
        <v-divider class="all-divider" />
      </div>
    </template>

    <!-- 스크롤 가능한 항목들 -->
    <template #item="{ item, props: itemProps }">
      <slot name="item"
            :item="item"
            :props="itemProps">
        <v-list-item v-bind="itemProps" :height="26"
                     :active="isActiveItem?.get(itemProps.value)">
          <template #prepend
                    v-if="multiple">
            <VCheckbox class="mr-1.5"
                       :model-value="isActiveItem?.get(itemProps.value)"
                       tabindex="-1" />
          </template>
        </v-list-item>
      </slot>
    </template>

    <!-- 화살표 아이콘 -->
    <template #append-inner>
      <div :class="['flex items-center gap-1']">
        <!-- badgePosition이 "after"일 때 뱃지 표시 -->
        <template v-if="badgePosition === 'after' && multiple">
          <div class="selection-count-badge">
            {{ showAll && isAllSelected ? 'All' : selectedTitles?.length || '0' }}
          </div>
        </template>
        <slot name="append-inner">
          <ChevronDownIcon class="cursor-pointer" />
        </slot>
      </div>
    </template>

    <!-- prepend-inner: badgePosition이 "before"이고 multiple 모드에서 선택된 항목이 없을 때 [0] 뱃지 표시 -->
    <template #prepend-inner
              v-if="badgePosition === 'before' && multiple && (!modelValue || modelValue.length === 0)">
      <div class="selection-count-badge">
        {{ modelValue?.length || '0' }}
      </div>
    </template>

  </VSelectPrimitive>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@/components/icons"
import { VCheckbox } from "@/components/ui"
import { useDsdsSelectHelpers } from "@/components/ui/helpers"
import { ref } from 'vue'
import { VDivider, VListItem, VListItemTitle, VSelect as VSelectPrimitive } from "vuetify/components"

defineOptions({
  name: "VSelect",
  inheritAttrs: false
})

/**
 * VSelect 컴포넌트의 Props 인터페이스
 * DSDS 디자인 시스템 스타일의 셀렉트 컴포넌트 설정을 정의합니다.
 *
 * @warning 슬롯 커스터마이징 권장하지 않음
 * DSDS 디자인 시스템의 일관성을 위해 selection 및 item 슬롯을 통한 커스터마이징을 권장하지 않습니다.
 * 필요한 경우 상위 컴포넌트 레벨에서 별도의 구현을 고려해주세요.
 */
interface VSelectProps {
  /** Select의 스타일 변형 */
  variant?: "default" | "ghost"
  /** Select의 크기 */
  size?: "small" | "medium" | "large"
  /** Select 비활성화 상태 */
  disabled?: boolean
  /** Select 항목 배열 */
  items?: any[]
  /** 선택된 값 */
  modelValue?: any
  /** 플레이스홀더 텍스트 */
  placeholder?: string
  /** 선택값 클리어 가능 여부 */
  clearable?: boolean
  /** 다중 선택 가능 여부 */
  multiple?: boolean
  /** 아이템 표시 텍스트 속성명 */
  itemTitle?: string
  /** 아이템 값 속성명 */
  itemValue?: string
  /** Select 너비 */
  width?: number | string
  /** Select 최대 너비 */
  maxWidth?: number
  /** 전체 선택 표시 여부 */
  showAll?: boolean
  /** 필터링 함수 */
  filter?: Function
  /** 자동완성 설정 */
  autocomplete?: string
  /** 뱃지 위치 설정 */
  badgePosition?: "before" | "after"
}

const props = withDefaults(defineProps<VSelectProps>(), {
  variant: "default",
  size: "medium",
  disabled: false,
  clearable: false,
  autocomplete: "off",
  multiple: false,
  itemTitle: "title",
  itemValue: "value",
  showAll: false,
  badgePosition: "after",
  placeholder: "Select",
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const selectRef = ref()

// 공통 helper 함수들
const {
  mappedVariant,
  selectClasses,
  selectStyles,
  allItemValues,
  isAllSelected,
  isIndeterminate,
  selectedTitles,
  isActiveItem,
} = useDsdsSelectHelpers(props)

const handleUpdateModel = (value: any) => {
  emit('update:modelValue', value)
}

/**
 * 전체 선택/해제 토글 핸들러
 */
const handleAllToggle = () => {
  if (isAllSelected.value) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', [...allItemValues.value])
  }
}

defineExpose<{
  focus: () => void
}>({
  focus: () => {
    selectRef.value?.focus()
  }
})
</script>
