<template>
  <RealGrid ref="realGridRef"
            v-bind="attrs"
            v-model="gridRef"
            :columns="currentRealGridColumns"
            :fields="currentFields"
            :columnLayout="columnLayout"
            :checkBar="checkBar"
            :editable="editable"
            :fixedOptions="fixedOptions"
            :selectionStyle="selectionStyle"
            :displayOptions="displayOptions"
            :hideIndicator="hideIndicator" />
</template>

<script lang="ts" setup>
import { RealGrid } from "@/components/ui"
import { GridView, SelectionStyle, type DisplayOptions, type FixedOptions, type LayoutItem } from "realgrid"
import { computed, nextTick, ref, useAttrs, watch } from "vue"
import { defaultColumns } from "./column-presets"
import { createFields, createRealGridColumns, generateFakeData, type ExtendedColumn, type FakeDataSource } from "./fake-data-generator"

const gridRef = defineModel<GridView | null>()

defineOptions({ inheritAttrs: false })
const emit = defineEmits<{
  dataLoaded: [grid: GridView, data: any[]]
}>()

const props = withDefaults(defineProps<{
  columns: ExtendedColumn[]
  columnLayout?: (string | LayoutItem)[]
  fakeSource?: FakeDataSource
  rowCount?: number
  autoLoadData?: boolean
  autoFitLayout?: boolean
  checkBar?: boolean
  editable?: boolean
  emptyState?: boolean
  selectionStyle?: SelectionStyle
  hideIndicator?: boolean
  fixedOptions?: FixedOptions
  displayOptions?: DisplayOptions
}>(), {
  columns: defaultColumns as any,
  rowCount: 10,
  autoLoadData: true,
  autoFitLayout: false,
  editable: false,
  emptyState: false,
  selectionStyle: SelectionStyle.BLOCK,
  hideIndicator: false,
})

const realGridRef = ref<InstanceType<typeof RealGrid> | null>(null)
const attrs = useAttrs()

// 컬럼과 데이터 생성
const currentColumns = computed(() => props.columns)
const currentFields = computed(() => createFields(currentColumns.value))
const currentRealGridColumns = computed(() => createRealGridColumns(currentColumns.value))

const loadData = () => {
  if (realGridRef.value) {
    if (props.emptyState) {
      realGridRef.value.setData([])
    } else {
      const fakeData = generateFakeData(
        props.columns,
        props.rowCount,
        props.fakeSource
      )
      realGridRef.value.setData(fakeData)
      emit('dataLoaded', gridRef.value!, fakeData)
    }
  }
}

const generateNewData = (rowCount?: number) => {
  if (realGridRef.value) {
    if (props.emptyState) {
      realGridRef.value.setData([])
    } else {
      const count = rowCount || props.rowCount
      const fakeData = generateFakeData(
        props.columns || [],
        count,
        props.fakeSource
      )
      realGridRef.value.setData(fakeData)
      emit('dataLoaded', gridRef.value!, fakeData)
    }
  }
}

const clearData = () => {
  if (realGridRef.value) {
    realGridRef.value.clearData()
  }
}

const getGridView = () => {
  return realGridRef.value?.getGridView() || null
}

const getDataProvider = () => {
  return realGridRef.value?.getDataProvider() || null
}

// props 변경 감지
watch(() => props.emptyState, (emptyState) => {
  loadData()
})

watch(() => props.columns, () => {
  if (props.autoLoadData) {
    loadData()
  }
})

// 초기 데이터 로드
if (props.autoLoadData) {
  nextTick(() => {
    loadData()
    if (props.autoFitLayout && realGridRef.value?.getGridView()) {
      setTimeout(() => realGridRef.value!.getGridView()!.fitLayoutWidth())
    }
  })
}

// 외부에서 접근 가능한 메서드들을 expose
defineExpose({
  loadData,
  clearData,
  getGridView,
  getDataProvider,
  generateNewData
})
</script>