<template>
  <Page>
    <PageHeader :title="page.label" :favorite="page.isFavorite ?? false" showFavorite
      @update:favorite="handleFavoriteUpdate">
      <template #tools>
        <VBtn variant="secondary" size="small">매뉴얼</VBtn>
        <v-divider vertical />
        <Breadcrumb :items="[
          { title: 'FDC', type: 'text' },
          { title: 'Interlock', type: 'text' },
          { title: 'Alarm Summary', type: 'text' },
        ]" ellipsis />
      </template>
    </PageHeader>
    <PageBody class="p-0!">
      <Splitter direction="horizontal" @layout="handleLayout" :layoutDebounce="100">
        <SplitterPanel :defaultWidth="300" :minWidth="280" :maxWidth="420">
          <EESAlarmSummaryPageSideFilter
            ref="pageFilterRef"
            @getLotList="getLotList"
            @execute="handleExecute"
            :loading="isPageFilterLoading"
          />
        </SplitterPanel>
        <SplitterHandle class="bg-page-panel-bg" />
        <SplitterPanel>
          <Splitter direction="vertical" @layout="handleLayout" :layoutDebounce="100">
            <SplitterPanel :defaultSize="50">
              <PagePanel>
                <PagePanelHeader>
                  Alarm History

                  <template #title-tools>
                    <ToggleButton size="small" v-model="setAndClearChecked">Set & Clear</ToggleButton>
                  </template>

                  <template #tools>
                    <VBtn variant="secondary" iconOnly size="small">
                      <ColumnSettingIcon />
                    </VBtn>
                    <VDivider vertical />
                    <VBtn variant="secondary" size="small">Excel Export</VBtn>
                    <VBtn variant="secondary" size="small">Xls Export</VBtn>
                  </template>
                </PagePanelHeader>
                <RealGrid class="flex-1" ref="resultGridRef" :columns="columns" :fields="fields" />
              </PagePanel>
            </SplitterPanel>

            <SplitterHandle />

            <SplitterPanel>
              <EESAlarmSummaryChart ref="alarmChartRef" :searchParams="pageFilterRef?.searchParams"/>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </PageBody>
  </Page>
</template>

<script setup lang="ts">
import {
  Breadcrumb, Page, PageBody,
  PageHeader,
  PagePanel,
  PagePanelHeader,
  RealGrid,
  Splitter, SplitterHandle, SplitterPanel, ToggleButton,
  VBtn,
  type PageTabItem
} from '@/components/ui'
import { nextTick, onMounted, ref, watch } from 'vue'
import ColumnSettingIcon from './ColumnSettingIcon.vue'

import { ValueType, type DataField } from 'realgrid'
import EESAlarmSummaryChart from './EESAlarmSummaryChart.vue'
import EESAlarmSummaryPageSideFilter from './EESAlarmSummaryPageSideFilter.vue'
import { fakeAlarmHistory, type AlarmHistoryRow } from './fake-data'

const props = defineProps<{
  page: PageTabItem
}>()

const emit = defineEmits<{
  (event: 'update:favorite', value: boolean): void
}>()

onMounted(() => {
  const gridView = resultGridRef?.value?.getGridView()
  if (gridView) {
    gridView.setFixedOptions({
      colCount: 2,
    })
  }
})

const favoriteInitialized = ref(false)
const setAndClearChecked = ref(false)
const isTimeSeries = ref(false)
const selectedChartType = ref('sidebar')
const pageFilterRef = ref<InstanceType<typeof EESAlarmSummaryPageSideFilter>>();
const resultGridRef = ref<InstanceType<typeof RealGrid>>();
const alarmChartRef = ref<InstanceType<typeof EESAlarmSummaryChart>>();
const isPageFilterLoading = ref(false)

type ExecutePayload = {
  eqpIndexes: (string | number)[]
  filters: Record<string, string[] | undefined>
}

const fakeEqpIndexes = ['A01', 'A02', 'B01', 'B02']

const handleLayout = (sizes: number[]) => {
  console.log('Splitter layout sizes:', sizes)
}

const loadAlarmHistory = (rows: AlarmHistoryRow[] = fakeAlarmHistory) => {
  if (!resultGridRef.value) return
  const gridView = resultGridRef.value?.getGridView()!

  gridView.showLoading();
  resultGridRef.value.setData(rows)

  setTimeout(() => {
    if (gridView) {
      gridView.closeLoading();
      gridView.fitLayoutWidth();
    }
  }, 2000)
}

const togglePageFilterLoading = (state: boolean) => {
  isPageFilterLoading.value = state
}

const getLotList = async () => {
  togglePageFilterLoading(true)
  await new Promise((resolve) => setTimeout(resolve, 400))

  if (pageFilterRef.value?.searchParams) {
    pageFilterRef.value.searchParams.eqpIdList = fakeEqpIndexes.map((index, idx) => ({
      key: `${idx + 1}`,
      value: `EQP-${index}`
    }))
    const firstEqp = pageFilterRef.value.searchParams.eqpIdList[0]
    if (firstEqp) {
      pageFilterRef.value.searchParams.selectedEqpId = firstEqp
    }
  }

  togglePageFilterLoading(false)
}

async function handleExecute(getRows: Promise<Record<string, any>[] | undefined> | null) {
  if (!resultGridRef.value) return;
  const gridView = resultGridRef.value.getGridView()!;
  try {
    gridView.showLoading();
    const rows = (await getRows) || [];
    resultGridRef.value.setData(rows);
    nextTick(() => {
      gridView.fitLayoutWidth();
    })
  } finally {
    gridView.closeLoading();
  }
}

const columns = [
  {name: 'actTime', fieldName: 'ACT_TIME', header: { text: 'Time'}},
  {name: 'actType', fieldName: 'IS_RUNNING', autoFilter: true, header: { text: 'Type'}},
  {name: 'line', fieldName: 'LINE', autoFilter: true, header: { text: 'Line'}},
  {name: 'eqpModel', fieldName: 'EQP_MODEL', autoFilter: true, header: { text: 'EQP Model'}},
  {name: 'eqpType', fieldName: 'EQP_TYPE', autoFilter: true, header: { text: 'EQP Type'}},
  {name: 'eqpId', fieldName: 'EQP_ID', autoFilter: true, header: { text: 'EQP ID'}},
  {name: 'chamberId',fieldName: 'CH_ID', autoFilter: true, header: { text: 'CHB ID',}},
  {name: 'chamberName',fieldName: 'CH_NAME', autoFilter: true, header: { text: 'CHB Name',}},
  {name: 'alarmCode',fieldName: 'ALARM_CODE', autoFilter: true, header: { text: 'Alarm Code',}},
  {name: 'alarmId',fieldName: 'ALARM_ID', autoFilter: true, header: { text: 'Alarm ID',}},
  {name: 'alarmText',fieldName: 'ALARM_TEXT', autoFilter: true, header: { text: 'Alarm Text',}},
  {name: 'lotId',fieldName: 'LOT_ID', autoFilter: true, header: { text: 'Lot ID',}},
  {name: 'lotType',fieldName: 'LOT_TYPE', autoFilter: true, header: { text: 'Lot Type',}},
  {name: 'procPlanId',fieldName: 'PROC_PLAN_ID', autoFilter: true, header: { text: 'Process Plan',}},
  {name: 'partId',fieldName: 'PART_ID', autoFilter: true, header: { text: 'Part ID',}},
  {name: 'ppid',fieldName: 'PPID', autoFilter: true, header: { text: 'PPID',}},
  {name: 'recipeId',fieldName: 'RECIPEID', autoFilter: true, header: { text: 'Recipe ID',}},
  {name: 'stepSeq',fieldName: 'STEPSEQ', autoFilter: true, header: { text: 'Step SEQ',}},
  {name: 'slotNo',fieldName: 'SLOT_NO', autoFilter: true, header: { text: 'Slot No',}},
  {name: 'waferNo',fieldName: 'WAFER_NO', autoFilter: true, header: { text: 'Wafer No',}},
  {name: 'alarmType',fieldName: 'ALARM_TYPE', autoFilter: true, header: { text: 'Alarm Type',}},
  {name: 'eqpStatus',fieldName: 'EQP_STATUS_CODE', autoFilter: true, header: { text: 'EQP Status(Critical)',}},
  {name: 'module',fieldName: 'ALARM_GROUP_1', autoFilter: true, header: { text: 'Module',}},
  {name: 'unit',fieldName: 'ALARM_GROUP_2', autoFilter: true, header: { text: 'Unit',}},
]


const fields: DataField[] = [
  { fieldName: 'IS_RUNNING', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_TYPE', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_TYPE_CODE', dataType: ValueType.TEXT },
  { fieldName: 'LINE', dataType: ValueType.TEXT },
  { fieldName: 'EQP_MODEL', dataType: ValueType.TEXT },
  { fieldName: 'EQP_TYPE', dataType: ValueType.TEXT },
  { fieldName: 'EQP_ID', dataType: ValueType.TEXT },
  { fieldName: 'EQP_INDEX', dataType: ValueType.TEXT },
  { fieldName: 'CH_ID', dataType: ValueType.TEXT },
  { fieldName: 'CH_NAME', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_GROUP_1', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_GROUP_2', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_GROUP_3', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_CODE', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_ID', dataType: ValueType.TEXT },
  { fieldName: 'ALARM_TEXT', dataType: ValueType.TEXT },
  { fieldName: 'LOT_ID', dataType: ValueType.TEXT },
  { fieldName: 'LOT_TYPE', dataType: ValueType.TEXT },
  { fieldName: 'STEPSEQ', dataType: ValueType.TEXT },
  { fieldName: 'SLOT_NO', dataType: ValueType.TEXT },
  { fieldName: 'WAFER_NO', dataType: ValueType.TEXT },
  { fieldName: 'PART_ID', dataType: ValueType.TEXT },
  { fieldName: 'PROC_PLAN_ID', dataType: ValueType.TEXT },
  { fieldName: 'PPID', dataType: ValueType.TEXT },
  { fieldName: 'RECIPEID', dataType: ValueType.TEXT },
  { fieldName: 'OCCUR_DATE', dataType: ValueType.TEXT },
  { fieldName: 'ACT_TIME', dataType: ValueType.TEXT},
  { fieldName: 'SET_TIME', dataType: ValueType.TEXT },
  { fieldName: 'PROCESSING_TIME', dataType: ValueType.NUMBER },
  { fieldName: 'IS_EQHOLD', dataType: ValueType.BOOLEAN },
  { fieldName: 'IS_LOTHOLD', dataType: ValueType.BOOLEAN },
  { fieldName: 'PATIENT', dataType: ValueType.TEXT },
  { fieldName: 'IS_EIS', dataType: ValueType.BOOLEAN },
  { fieldName: 'IS_AEGIS', dataType: ValueType.BOOLEAN },
  { fieldName: 'IS_MEASURE', dataType: ValueType.BOOLEAN },
  { fieldName: 'IS_APC', dataType: ValueType.BOOLEAN },
  { fieldName: 'IS_RCMD', dataType: ValueType.BOOLEAN },
  { fieldName: 'ACTION_COMMENT', dataType: ValueType.TEXT },
  { fieldName: 'IS_PATIENT', dataType: ValueType.BOOLEAN },
  { fieldName: 'EQP_STATUS_CODE', dataType: ValueType.TEXT }
];


watch(isTimeSeries, (nextChecked, oldVal) => {
  if (nextChecked !== oldVal) {
    if (nextChecked) {
      selectedChartType.value = 'cumulative'
    } else {
      selectedChartType.value = 'sidebar'
    }
  }
})

watch(setAndClearChecked, () => {
  console.log('Set & Clear filter toggled:', setAndClearChecked.value)
})

const handleFavoriteUpdate = (value: boolean) => {
  if (!favoriteInitialized.value) {
    favoriteInitialized.value = true
    if (value === Boolean(props.page?.isFavorite)) {
      return
    }
  }

  emit('update:favorite', value)
}

</script>