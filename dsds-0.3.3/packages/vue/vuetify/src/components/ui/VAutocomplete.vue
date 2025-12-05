<template>
  <VAutocompletePrimitive ref="autocompleteRef"
                          :variant="mappedVariant"
                          :disabled="disabled"
                          :class="['dsds-v-select', ...selectClasses,
                          multiple && badgePosition === 'after' && 'badge-after']"
                          :style="selectStyles"
                          :menu-props="{
                            contentClass: 'dsds-dropdown-content-base dsds-v-autocomplete-menu',
                            origin: 'auto',
                            transition: 'scale-transition',
                            maxHeight: 300,
                            offset: 4,
                            closeOnContentClick: false, // 항목 선택 시에도 메뉴 유지
                          }"
                          :autocomplete="autocomplete || 'off'"
                          :item-title="itemTitle"
                          :item-value="itemValue"
                          :items="items"
                          :model-value="modelValue"
                          :placeholder="placeholder"
                          :clearable="clearable"
                          :multiple="multiple"
                          :maxWidth="maxWidth || width ? String(width) + 'px' : undefined"
                          :auto-select-first="autoSelectFirst"
                          v-bind="$attrs"
                          @update:model-value="handleUpdateModelValue"
                          @update:search="handleSearchUpdate">
    <!-- Selection 영역 - 포커스 상태에 따라 조건부 렌더링 -->
    <template #selection="{ item, index }"
              v-if="multiple || itemSelection">
      <slot name="selection"
            :item="item"
            :index="index"
            v-if="multiple">
        <!-- 포커스되지 않았을 때만 selection 내용 표시 -->
        <template v-if="!autocompleteRef?.isFocused">
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
      </slot>
      <slot name="selection"
            :item="item"
            :index="index"
            v-else-if="itemSelection">
        <!-- 포커스되지 않았을 때만 selection 내용 표시 -->
        <slot name="selection"
              :item="item"
              :index="index">
          <!-- 기본 single selection 표시 - 실제 구현 -->
          <span v-if="autocompleteRef?.isFocused"><span class="chip"
                  v-if="getItemSelectionText(item)">{{
                    getItemSelectionText(item)
                  }}</span></span>
          <span v-else>{{ getItemSelectionText(item) }}</span>
        </slot>
      </slot>
    </template>


    <!-- 고정된 `All` 체크박스 헤더 (multiple && showAll일 때) -->
    <template #prepend-item
              v-if="multiple && showAll">
      <div class="sticky-all-header">
        <v-list-item :active="isAllSelected"
                     :class="{
                      'all-list-item': true,
                      'selected': isAllSelected
                    }"
                     @click="handleAllToggle">
          <template #prepend>
            <VCheckbox class="mr-1.5!"
                       tabindex="-1"
                       :model-value="isAllSelected"
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
    <template #item="{ item, index, props: itemProps }">
      <slot name="item"
            :item="item"
            :props="itemProps">
        <v-list-item v-bind="itemProps" :height="26"
                     :class="shouldAutoSelectFirst && index === 0 && 'dsds-auto-selected-item'"
                     :active="isActiveItem?.get(itemProps.value)">
          <template #prepend
                    v-if="multiple">
            <VCheckbox class="mr-1.5!"
                       :model-value="isActiveItem?.get(itemProps.value)"
                       tabindex="-1" />
          </template>
          <template #title>
            <v-list-item-title v-if="shouldHighlight && typeof itemProps.title === 'string'"
                               v-html="getHighlightedTitle(itemProps.title)" />
            <v-list-item-title v-else>
              {{ itemProps.title }}
            </v-list-item-title>
          </template>
        </v-list-item>
      </slot>
    </template>

    <!-- 화살표 아이콘 -->
    <template #append-inner>
      <div class="flex items-center gap-1">
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
              v-if="badgePosition === 'before' && multiple && isEmpty">
      <div class="selection-count-badge">
        {{ modelValue?.length || '0' }}
      </div>
    </template>
  </VAutocompletePrimitive>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@/components/icons"
import { VCheckbox } from "@/components/ui"
import { useDsdsSelectHelpers } from "@/components/ui/helpers"
import { computed, ref, watch } from 'vue'
import { VAutocomplete as VAutocompletePrimitive, VDivider, VListItem, VListItemTitle } from "vuetify/components"

defineOptions({
  name: "VAutocomplete",
  inheritAttrs: false
})

/**
 * VAutocomplete 컴포넌트의 Props 인터페이스
 * DSDS 디자인 시스템 스타일의 자동완성 컴포넌트 설정을 정의합니다.
 *
 * @warning 슬롯 커스터마이징 권장하지 않음
 * DSDS 디자인 시스템의 일관성을 위해 selection 및 item 슬롯을 통한 커스터마이징을 권장하지 않습니다.
 * 필요한 경우 상위 컴포넌트 레벨에서 별도의 구현을 고려해주세요.
 */
interface VAutocompleteProps {
  /** Select의 변형 스타일 - 'default'는 기본 스타일, 'ghost'는 투명 배경 스타일 */
  variant?: "default" | "ghost"
  /** Select의 크기 - small, medium, large 중 선택 */
  size?: "small" | "medium" | "large"
  /** 컴포넌트 비활성화 상태 */
  disabled?: boolean
  /** 선택 가능한 항목들의 배열 */
  items?: any[]
  /** 현재 선택된 값 (v-model) */
  modelValue?: any
  /** 플레이스홀더 텍스트 */
  placeholder?: string
  /** 선택값 클리어 가능 여부 */
  clearable?: boolean
  /** 다중 선택 가능 여부 */
  multiple?: boolean
  /** 아이템 객체에서 표시할 텍스트 속성명 (기본값: 'title') */
  itemTitle?: string
  /** 아이템 객체에서 값으로 사용할 속성명 (기본값: 'value') */
  itemValue?: string
  /** 단일 선택 시 선택된 아이템 표시 텍스트 속성명 */
  itemSelection?: string
  /** Select의 너비 (px 단위) */
  width?: number | string
  /** Select의 최대 너비 */
  maxWidth?: number
  /** 전체 선택 옵션 표시 여부 (multiple일 때) */
  showAll?: boolean
  /** 항목 필터링 함수 */
  filter?: Function
  /** 자동완성 기능 활성화 여부 */
  autocomplete?: string;
  /** 뱃지 위치 설정 */
  badgePosition?: "before" | "after"
  /** 필터링된 첫번째 항목을 자동 선택 */
  autoSelectFirst?: boolean
}

const props = withDefaults(defineProps<VAutocompleteProps>(), {
  variant: "default",
  size: "medium",
  disabled: false,
  clearable: false,
  autocomplete: 'off',
  multiple: false,
  itemTitle: "title",
  itemValue: "value",
  showAll: false,
  badgePosition: "after",
  placeholder: "Select",
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'update:focused': [focused: boolean]
  'update:menu': [open: boolean]
  'update:search': [value: string]
}>()

const autocompleteRef = ref()
const searchValue = ref('')

// 공통 helper 함수들
const {
  mappedVariant,
  selectClasses,
  selectStyles,
  allItemValues,
  isAllSelected,
  selectedTitles,
  isActiveItem,
  isEmpty,
} = useDsdsSelectHelpers(props)


const shouldHighlight = computed(() =>
  searchValue.value &&
  autocompleteRef?.value.isPristine === false)

const shouldAutoSelectFirst = computed(() =>
  props.autoSelectFirst &&
  searchValue.value &&
  autocompleteRef.value?.filteredItems.length > 0)

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getHighlightedTitle = (title: unknown) => {
  const text = (title ?? '').toString()

  const pattern = new RegExp(`(${escapeRegExp(searchValue.value)})`, 'gi')
  return text.replace(pattern, '<mark class="dsds-mark-highlight">$1</mark>')
}

const handleSearchUpdate = (value: string) => {
  searchValue.value = value
  emit('update:search', value)
}

const handleUpdateModelValue = (value: any) => {
  emit('update:modelValue', value)
}

/**
 * 아이템 선택 텍스트 추출 함수
 * 주어진 아이템에서 표시할 텍스트를 추출합니다.
 * @param item - 선택된 아이템 객체
 * @returns 표시할 텍스트
 */
const getItemSelectionText = (item: any) => item.raw[props.itemSelection!] || item.title


// `All` 토글 핸들러
/**
 * 전체 선택 토글 핸들러
 * `All` 옵션을 클릭했을 때 호출되며, 모든 항목을 선택하거나 선택 해제합니다.
 * 이미 전체가 선택된 상태라면 모든 선택을 해제하고, 그렇지 않다면 모든 항목을 선택합니다.
 */
const handleAllToggle = () => {
  if (isAllSelected.value) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', [...allItemValues.value])
  }
}

watch(() => props.modelValue, (nextVal) => {
  // modelValue 변경 시 검색어 초기화 (Vuetify 버그 대응)
  if (!nextVal) {
    autocompleteRef?.value?.reset()
  }
})


defineExpose<{
  focus: () => void
}>({
  focus: () => {
    autocompleteRef.value?.focus()
  }
})
</script>
