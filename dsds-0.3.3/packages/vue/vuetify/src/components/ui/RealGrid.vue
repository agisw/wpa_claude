<template>
  <div ref="gridContainer"
       :class="mergedClass"
       :style="mergedStyle"
       v-bind="forwardedAttrs"></div>
</template>

<script lang="ts">
export interface RealGridProps {
  columns: GridColumn[]
  fields: DataField[]
  fixedOptions?: FixedOptions
  columnLayout?: (string | LayoutItem)[],
  checkBar?: boolean
  editable?: boolean
  selectionStyle?: SelectionStyle
  initialData?: any[] | null
  hideIndicator?: boolean
  loading?: boolean;
  displayOptions?: DisplayOptions
}

export interface RealGridExpose {
  loadData: (data?: any[]) => void
  clearData: () => void
  getGridView: () => GridView | null
  getDataProvider: () => LocalDataProvider | null
  setData: (data: any[]) => void
}
</script>

<script lang="ts" setup>
import { GridFitStyle, GridView, LocalDataProvider, RowMaskType, SelectionStyle, type DataField, type DisplayOptions, type FixedOptions, type GridColumn, type LayoutItem } from "realgrid"
import { computed, onMounted, onUnmounted, ref, useAttrs, watch } from "vue"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<RealGridProps>(), {
  editable: false,
  selectionStyle: SelectionStyle.BLOCK,
  hideIndicator: false,
})

const modelValue = defineModel<GridView | null>()
const attrs = useAttrs()

const gridContainer = ref<HTMLDivElement>()
let gridView: GridView | null = null
let dataProvider: LocalDataProvider | null = null

const mergedClass = computed(() => {
  const classAttr = attrs.class
  if (!classAttr) return ["dsds-realgrid"]
  return ["dsds-realgrid", classAttr as any]
})

const baseStyle = { display: 'table', width: "100%", height: '100%' }
const mergedStyle = computed(() => {
  const styleAttr = attrs.style
  if (!styleAttr) return baseStyle
  return [baseStyle, styleAttr as any]
})

const forwardedAttrs = computed(() => {
  const rest: Record<string, unknown> = { ...attrs }
  delete rest.class
  delete rest.style
  return rest
})

const loadData = (data?: any[]) => {
  if (dataProvider && data) {
    dataProvider.setRows(data)
  }
}

const setData = (data: any[]) => {
  if (dataProvider) {
    dataProvider.setRows(data)
  }
}

const clearData = () => {
  if (dataProvider) {
    dataProvider.clearRows()
  }
}

const getGridView = () => gridView
const getDataProvider = () => dataProvider

onMounted(() => {
  if (gridContainer.value) {
    dataProvider = new LocalDataProvider(false)
    gridView = new GridView(gridContainer.value)
    gridView.setDisplayOptions({
      showEmptyMessage: true,
      emptyMessage: "데이터가 없습니다.",
      fitStyle: props.fixedOptions ? GridFitStyle.NONE : GridFitStyle.FILL,
      ...props.displayOptions,
    })
    gridView.scrollBarWidth = 11
    gridView.scrollBarHeight = 11
    gridView.checkBar.syncHeadCheck = true // 체크 상태와 헤더 체크박스 동기화

    gridView.setDataSource(dataProvider)
    dataProvider.setFields(props.fields)
    gridView.setColumns(props.columns)

    if (props.fixedOptions) {
      gridView.setFixedOptions(props.fixedOptions)
    }
    if (props.columnLayout) {
      gridView.setColumnLayout(props.columnLayout)
    }

    // DSDS 표준 스타일 적용
    if (gridView.displayOptions) {
      gridView.displayOptions.rowHeight = 23 // DSDS 표준 rowHeight
      gridView.displayOptions.columnMovable = false
      gridView.displayOptions.selectionStyle = props.selectionStyle
      gridView.displayOptions.rowFocusType = RowMaskType.FILL
    }
    gridView.sortingOptions.enabled = false;
    gridView.header.height = 29 // DSDS 표준 headerHeight
    gridView.footer.visible = false;
    gridView.setEditOptions({
      appendable: true,
      insertable: true,
      updatable: true,
      editable: props.editable || false,
    });

    // row와 check바 사이의 state바 미사용.
    gridView.setStateBar({
      visible: false,
    });

    // check bar 사용.
    gridView.setCheckBar({
      visible: props.checkBar || false,
      exclusive: false,
      width: 23,
    });

    // row indicator 설정
    gridView.setRowIndicator({
      visible: !props.hideIndicator,
    });

    gridView.setFilteringOptions({
      enabled: true,
    });

    gridView.setCopyOptions({ enabled: true });

    if (props.initialData) {
      dataProvider.setRows(props.initialData)
    }

    // Assign gridView to modelValue
    modelValue.value = gridView
  }
})

watch(() => props.loading, (nextLoading) => {
  if (!gridView) return;

  if (nextLoading) {
    gridView.showLoading();
  } else {
    gridView.closeLoading();
  }
})

watch(() => props.checkBar, (checkBar) => {
  if (!gridView) return;

  gridView.setCheckBar({
    visible: checkBar || false,
    exclusive: false,
    width: 30,
  });
})

watch(() => props.columns, () => {
  if (!(gridView && dataProvider)) return;

  gridView.setColumns(props.columns)
  if (props.columnLayout) {
    gridView.setColumnLayout(props.columnLayout)
  }
})

watch(() => props.editable, (editable) => {
  if (!gridView) return;

  gridView.setEditOptions({
    editable: editable || false,
  });
})

watch(() => props.hideIndicator, (hideIndicator) => {
  if (!gridView) return;
  gridView.setRowIndicator({
    visible: !hideIndicator,
  });
})

onUnmounted(() => {
  if (!gridView) return;
  gridView.destroy()
  gridView = null

  if (dataProvider) {
    dataProvider.destroy()
    dataProvider = null
  }
  modelValue.value = null  // 그리드 해제 시 modelValue도 null로 설정
})

// 외부에서 접근 가능한 메서드들을 expose
defineExpose<RealGridExpose>({
  loadData,
  clearData,
  getGridView,
  getDataProvider,
  setData
})
</script>