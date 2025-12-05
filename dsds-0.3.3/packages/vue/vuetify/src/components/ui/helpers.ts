/**
 * DSDS 스타일의 VSelect/VAutocomplete 공통 helper
 */
import { computed } from "vue"

export function useDsdsSelectHelpers(props: {
  itemTitle: string
  itemValue: string
  size: string
  variant: string
  items?: any[]
  modelValue?: any
  width?: number | string
  multiple?: boolean
}) {
  // Variant 매핑
  const mappedVariant = computed<"outlined" | "solo" | undefined>(() => {
    const variantMap: Record<string, "outlined" | "solo"> = {
      default: "outlined",
      ghost: "solo",
    }
    return variantMap[props.variant] ?? "outlined"
  })

  // 클래스
  const selectClasses = computed(() => [
    "dsds-v-select",
    `dsds-size-${props.size}`,
    {
      "!dsds-v-select-small": props.size === "small",
      "!dsds-v-select-medium": props.size === "medium",
      "!dsds-v-select-large": props.size === "large",
      "!dsds-v-select-multiple": props.multiple,
      "dropdown-select-default": props.variant === "default",
      "dropdown-select-ghost": props.variant === "ghost",
    },
  ])

  // 스타일
  const selectStyles = computed(() => {
    if (!props.width) return {}
    return { width: `${props.width}px`, minWidth: `${props.width}px` }
  })

  // item title 추출
  const getItemTitle = (item: any): string => {
    if (typeof item === "object" && item !== null) return item[props.itemTitle] || item.title || String(item)
    return String(item)
  }

  const selectionMeta = computed(() => {
    const items = Array.isArray(props.items) ? props.items : []
    const multiple = props.multiple ?? false
    const modelValue = props.modelValue

    const allValues: any[] = []
    const activeMap = new Map<any, boolean>()
    const selectedTitles: string[] = []

    const modelArray = Array.isArray(modelValue) ? modelValue : []
    const modelSet = multiple && Array.isArray(modelValue) ? new Set(modelArray) : undefined

    items.forEach((entry) => {
      if (!entry) return
      if (!["object", "string", "number"].includes(typeof entry)) {
        throw new Error(`Invalid item type in items array: ${typeof entry}`)
      }
      const value = typeof entry === "object" ? (entry[props.itemValue] ?? entry?.value) : entry
      allValues.push(value)

      const isSelected = multiple ? Boolean(modelSet?.has(value)) : modelValue === value

      activeMap.set(value, isSelected)

      if (multiple && isSelected) {
        selectedTitles.push(getItemTitle(entry))
      }
    })

    const isAllSelected =
      multiple && !!modelSet && allValues.length > 0 && allValues.every((value) => modelSet.has(value))
    const isIndeterminate = multiple && !!modelSet && modelSet.size > 0 && !isAllSelected

    return {
      isEmpty: items.length === 0,
      allValues,
      selectedTitles: multiple ? selectedTitles : undefined,
      isAllSelected,
      isIndeterminate,
      isActiveItem: activeMap as Map<any, boolean>,
    }
  })

  const allItemValues = computed(() => selectionMeta.value.allValues)
  const selectedTitles = computed(() => selectionMeta.value.selectedTitles)
  const isAllSelected = computed(() => selectionMeta.value.isAllSelected)
  const isIndeterminate = computed(() => selectionMeta.value.isIndeterminate)
  const isActiveItem = computed(() => selectionMeta.value.isActiveItem)
  const isEmpty = computed(() => selectionMeta.value.isEmpty)

  return {
    mappedVariant,
    selectClasses,
    selectStyles,
    getItemTitle,
    allItemValues,
    isAllSelected,
    isIndeterminate,
    selectedTitles,
    isActiveItem,
    isEmpty,
  }
}
