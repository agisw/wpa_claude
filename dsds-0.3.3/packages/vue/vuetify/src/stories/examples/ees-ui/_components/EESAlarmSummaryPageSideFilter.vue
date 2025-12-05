<template>
  <PageFilter class="h-full">
    <PageFilterSection>
      <VBtn variant="secondary">Load Bookmark</VBtn>
    </PageFilterSection>
    <PageFilterDivider />
    <ScrollArea style="height: calc(100vh - 176px);">
      <Loader v-model="isLoading" contained hideMessage size="small" />
      <PageFilter>
        <PageFilterSection class="grid grid-cols-2">

          <FormField label="Line" required>
            <VAutocomplete :items="searchParams.lineList" v-bind="selectProps" v-model="searchParams.selectedLine" />
          </FormField>

          <FormField label="Area" required>
            <VAutocomplete :items="searchParams.areaList" v-bind="selectProps" v-model="searchParams.selectedArea" />
          </FormField>

          <FormField label="SDWT" required>
            <VAutocomplete :items="searchParams.sdwtList" v-bind="selectProps" v-model="searchParams.selectedSdwt" />
          </FormField>

          <FormField label="EQP Model">
            <VAutocomplete :items="searchParams.eqpModelList" v-bind="selectProps"
              v-model="searchParams.selectedEqpModel" />
          </FormField>

          <FormField label="FDC Model">
            <VAutocomplete :items="searchParams.fdcModelList" v-bind="selectProps"
              v-model="searchParams.selectedFdcModel" />
          </FormField>

          <FormField label="CHAMBER" required>
            <VAutocomplete :items="searchParams.unitList" v-bind="selectProps" v-model="searchParams.selectedUnit" />
          </FormField>

          <FormField label="Period" class="col-span-2">
            <template #tools>
              <VTabs v-model="activePeriodTypeTab" variant="button" size="small">
                <VTab value="datepicker">Ranged</VTab>
                <VTab value="relative">Relative</VTab>
              </VTabs>
            </template>

            <VTabsWindow v-model="activePeriodTypeTab">
              <VTabsWindowItem value="datepicker">
                <VueDatePicker range v-model="selectedPeriod" enableTimePicker position="left" />
              </VTabsWindowItem>
              <VTabsWindowItem value="relative">
                <div class="grid grid-cols-2 gap-x-3">
                  <VSelect :items="[
                    { title: 'Day', value: 'Day' },
                    { title: 'Hour', value: 'Hour' },
                  ]" v-model="searchParams.periodUnit" placeholder="Select unit" />
                  <VSelect :items="relativeAmountItems" v-model="searchParams.periodValue" placeholder="Select days" />
                </div>
              </VTabsWindowItem>
            </VTabsWindow>
          </FormField>

          <PageFilterSectionFooter class="col-span-2">
            <VBtn @click="onSearchCommand">Search</VBtn>
            <VBtn variant="secondary" @click="handleResetSearch">Reset</VBtn>
            <VDivider vertical />
            <VBtn variant="secondary" iconOption="before" :icon="HistoryIcon">History</VBtn>
          </PageFilterSectionFooter>
        </PageFilterSection>

        <PageFilterDivider doubleLine />

        <PageFilterSection class="grid grid-cols-2">
          <FormField label="Search List" class="col-span-2 h-48 max-h-48">
            <template #tools>
              <VSelect size="small" class="w-28" :items="SEARCH_LIST_ITEMS" v-model="selectedSearchListType" />
            </template>
            <RealGrid checkBar hideIndicator :columns="searchListColumns" ref="searchListGridRef"
              :fields="SEARCH_LIST_FIELDS" />
          </FormField>

          <div class="col-span-2 flex items-center justify-center">
            <VBtn variant="secondary" size="small" iconOnly :icon="ChevronDownIcon" @click="handleAddButton"
              :disabled="selectedRows.length === 0" />
          </div>

          <!-- page tab -->
          <VTabsContainer class="col-span-2 h-40 max-h-40">
            <VTabs :items="selectedFilterTabs" v-model="activeFilterTab" variant="compact" />
            <VTabsContent>
              <RealGrid hideIndicator :columns="selectedFiltersColumns" ref="selectedFilterValuesGridRef"
                :fields="SEARCH_LIST_FIELDS" />
            </VTabsContent>
          </VTabsContainer>

          <FormField label="Category 1">
            <VSelect :items="category1Options" v-bind="selectProps" v-model="selectedCategory1" />
          </FormField>

          <FormField label="Category 2">
            <VSelect :items="category2Options" v-bind="selectProps" v-model="selectedCategory2" />
          </FormField>

          <PageFilterSectionFooter class="col-span-2">
            <VBtn @click="handleExecute" :disabled="!selectedSearchFilters.EQPID?.length">Execute</VBtn>
            <VBtn variant="secondary" @click="handleResetFilters">Reset</VBtn>
            <VDivider vertical />
            <VBtn variant="secondary">Save Bookmark</VBtn>
          </PageFilterSectionFooter>
        </PageFilterSection>

        <SearchHistory ref="searchHistory" :HISTORY_KEY="HISTORY_KEY"
          :visibleKeys="['Line', 'Area', 'EQPModel', 'EQPID', 'FDCModel']"
          @select="(selections) => setParamInfo(selections, true)" />
      </PageFilter>
    </ScrollArea>
  </PageFilter>
</template>

<script lang="ts">

/* --------------------------- 상수 정의 --------------------------- */
const HISTORY_KEY = 'SearchedParamInfo4FDC';
const SEARCH_LIST_TITLES = {
  EQPID: "EQP ID",
  PPID: "PPID",
  RECIPE_ID: "Recipe ID",
  LOT_ID: "Lot ID",
  ALARM_ID: "Alarm ID",
  ALARM_TEXT: "Alarm Text",
  PROC_PLAN_ID: "Proc Plan ID",
  ALARM_ACTION: "Alarm Action",
};

const SEARCH_LIST_ITEMS = Object.entries(SEARCH_LIST_TITLES).map(([key, title]) => ({
  value: key,
  title,
}));

const SEARCH_LIST_FIELDS = [{ fieldName: 'value', dataType: ValueType.TEXT }]

const SEARCH_LIST_MOCK_DATA: Record<SearchListType, string[]> = {
  EQPID: ['EQP-A01', 'EQP-A02', 'EQP-B01', 'EQP-B02', 'EQP-C03'],
  PPID: ['PP-1001', 'PP-2001', 'PP-3209'],
  RECIPE_ID: ['REC-ETCH-01', 'REC-CMP-07', 'REC-PVD-22'],
  LOT_ID: ['LOT-2401', 'LOT-2412', 'LOT-2420', 'LOT-2530'],
  ALARM_ID: ['ALM-1001', 'ALM-2020', 'ALM-3050'],
  ALARM_TEXT: ['Pressure High Warning', 'Temperature Over Limit', 'Flow Rate Drop'],
  PROC_PLAN_ID: ['PLAN-007', 'PLAN-010', 'PLAN-055'],
  ALARM_ACTION: ['Reset Equipment', 'Notify Supervisor', 'Log Maintenance Ticket'],
}

export type SearchListType = keyof typeof SEARCH_LIST_TITLES;
</script>

<script setup lang="ts">
import { ChevronDownIcon, HistoryIcon } from '@/components/icons'
import type { PageTabItem } from '@/components/ui'
import { FormField, PageFilter, PageFilterDivider, PageFilterSection, PageFilterSectionFooter, RealGrid, ScrollArea, VAutocomplete, VBtn, VSelect, VTab, VTabs, VTabsContainer, VTabsContent, VTabsWindow, VTabsWindowItem, VueDatePicker } from '@/components/ui'
import { LocalDataProvider, ValueType, type GridColumn } from 'realgrid'
import { computed, nextTick, onMounted, reactive, ref, toValue, watch } from 'vue'
import { fakeAlarmHistory } from './fake-data'
import SearchHistory from './SearchHistory.vue'
import type { SearchParam } from './types'

/* --------------------------- Props & Types --------------------------- */
const props = defineProps<{
  loading?: boolean,
  setClearChecked?: boolean
}>();

const emit = defineEmits<{
  getLotList: [searchParams: SearchParam],
  execute: [getRowData: Promise<Record<string, any>[] | undefined> | null]
}>()

/* --------------------------- Ref (reactive state) --------------------------- */
const searchParams = reactive<SearchParam>({
  lineList: [],
  selectedLine: { key: '', value: '' },
  areaList: [],
  selectedArea: { key: '', value: '' },
  sdwtList: [],
  selectedSdwt: { key: '', value: '' },
  eqpModelList: [],
  selectedEqpModel: { key: '', value: '' },
  fdcModelList: [],
  selectedFdcModel: { key: '', value: '' },
  eqpIdList: [],
  selectedEqpId: { key: '', value: '' },
  unitList: [],
  selectedUnit: { key: '', value: '' },
  checkPeriod: true,
  periodUnit: 'Day',
  periodValue: 1,
  periodMaxValue: 31,
  fromDate: new Date(),
  toDate: new Date(),
  searchData: ['', ''],
});

const isLoading = ref(false);
const selectProps = { itemTitle: "value", itemValue: "key", placeholder: "선택하세요", returnObject: true };
const selectedPeriod = ref<[Date, Date] | null>(
  searchParams.fromDate && searchParams.toDate ? [searchParams.fromDate, searchParams.toDate] : null
);

const searchListGridRef = ref<InstanceType<typeof RealGrid> | null>(null);
const selectedFilterValuesGridRef = ref<InstanceType<typeof RealGrid> | null>(null);
const searchHistory = ref<InstanceType<typeof SearchHistory> | null>(null);
const searchListRowData = ref<{ type: SearchListType; item: string }[]>([]);

const activePeriodTypeTab = ref('datepicker');
const activeFilterTab = ref<'EQPID' | keyof typeof SEARCH_LIST_TITLES>('EQPID');

const selectedSearchListType = ref<keyof typeof SEARCH_LIST_TITLES>('EQPID');
const selectedRows = ref<number[]>([]);
const selectedSearchFilters = ref<Record<keyof typeof SEARCH_LIST_TITLES, string[] | undefined>>({} as any);


// Category 1, 2 세팅
const selectedCategory1 = ref("ALL");
const category1Options = [
    { key: "ALL", value: "ALL" },
    { key: "Registerd Alarm", value: "R" },
    { key: "UnRegisterd Alarm", value: "U" }
];
const selectedCategory2 = ref("ALL");

/* --------------------------- Lifecycle --------------------------- */
onMounted(() => {
  hydrateSearchParams()
  loadMockSearchList()
  updateSelectedFilterGrid()
  applyLoaderState(props.loading)

  // 최초 선택값 초기화
  selectedSearchListType.value = "EQPID";


  // Search List 그리드 설정
  if (searchListGridRef.value) {
    const gridView = searchListGridRef.value.getGridView()!;

    gridView.onItemAllChecked = (grid, checked) => {
      selectedRows.value = checked ? gridView.getCheckedRows() : [];
    };

    gridView.setFilteringOptions({
      selector: { searchIgnoreCase: true }
    })

    gridView.onItemChecked = () => {
      selectedRows.value = gridView.getCheckedRows();
    };

    gridView.onSelectionCleared = () => {
      selectedRows.value = [];
    }

    gridView.onSelectionChanged = (grid, selection) => {
      gridView.checkAll(false, false, false);
      const range: [number, number] =  [selection.startRow!, selection.endRow!];
      // 범위 수 range 로 부터 숫자 배열 생성
      const rangeNumbers = Array.from({ length: range[1] - range[0] + 1 })
        .map((_, i) => i + range[0]);
      // 선택된 행
      gridView.checkItems(rangeNumbers, true, false);
      selectedRows.value = gridView.getCheckedRows();
    }
  }

  // 선택된 필터 그리드 설정
  if (selectedFilterValuesGridRef.value) {
    const gridView = selectedFilterValuesGridRef.value.getGridView()!;

    // 상세 그리드의 행마다 있는 [X] 버튼 클릭 시
    gridView.onCellButtonClicked = (grid, index, column) => {
      const value = gridView.getDataSource().getJsonRow(index.dataRow!).value;
      selectedSearchFilters.value = {
        ...selectedSearchFilters.value,
        [activeFilterTab.value]: selectedSearchFilters.value[activeFilterTab.value]?.filter(it => it !== value)
      }
    }
  }

});

/* --------------------------- Computed --------------------------- */
// 선택된 EQPID 의 index 추출
const selectedEqpIndex = computed(() => selectedSearchFilters.value.EQPID?.map(eqpId => {
  return searchParams.eqpIdList.find(it => it.value === eqpId)?.key;
}).filter(it => it !== undefined) ?? [])

const pageTabItems = computed(() => {
  // EQPID 를 제외하고 동적으로 탭 아이템 생성
  return Object.keys(selectedSearchFilters.value)
    .filter(it => it !== 'EQPID')
    .map(it => ({
      value: it,
      label: SEARCH_LIST_TITLES[it as keyof typeof SEARCH_LIST_TITLES],
      closable: false,
    }) as PageTabItem);
});

const selectedFilterTabs = computed<PageTabItem[]>(() => [
  { value: 'EQPID', label: 'EQP ID', closable: false },
  ...pageTabItems.value,
]);

const relativeAmountItems = computed(() => Array.from({
  length: searchParams.periodMaxValue,
}, (_, i) => ({ title: '-' + (i + 1), value: i + 1 })));

const searchListColumns = computed<GridColumn[]>(() => [
  { name: 'value', fieldName: 'value', autoFilter: true, header: { text: SEARCH_LIST_TITLES[selectedSearchListType.value], styleName: 'rg-header-focus-hidden' } },
]);

const selectedFiltersColumns = computed<GridColumn[]>(() => [
  {
    name: 'value',
    fieldName: 'value',
    styleName: "dsds-rg-icon dsds-rg-action-icon-close",
    button: "action",
    buttonVisibility: "always",
    header: {
      styleName: 'rg-header-align-left rg-header-focus-hidden',
      values: {
        headerText: SEARCH_LIST_TITLES[activeFilterTab.value],
      },
      template: `
        <div class='flex w-full items-center'>
          <span class='flex-1'>\${headerText}</span>
          <button class="dsds-icon cursor-pointer mr-0.5!">
            <i id='button1' class='dsds-rg-icon dsds-rg-icon-close'></i>
          </button>
        </div>
      `,
      templateEvents: [
        {
          selector: 'i.dsds-rg-icon-close',
          event: {
            onclick: () => {
              if (!selectedSearchFilters.value[activeFilterTab.value]?.length) return;
              selectedSearchFilters.value = {
                ...selectedSearchFilters.value,
                [activeFilterTab.value]: [],
              }
            },
          },
        },
      ]
    },
  },
]);

const category2Options = computed(() => {
    if (selectedCategory1.value === "R") {
        return [
            { key: "ALL", value: "ALL" },
            { key: "Normal", value: "R" },
            { key: "Critical", value: "C" },
            { key: "EOI", value: "O" },
            { key: "Instant Stop", value: "T" },
            { key: "IDLE", value: "F" },
        ];
    }
    else {
        return [
            { key: "ALL", value: "ALL" },
            { key: "Instant Stop", value: "T" },
            { key: "IDLE", value: "F" },
        ];
    }
});

/* --------------------------- Exposes --------------------------- */

defineExpose({
  searchParams,
});

const applyLoaderState = (nextLoading?: boolean) => {
  if (typeof nextLoading === 'boolean') {
    isLoading.value = nextLoading
    return
  }

  isLoading.value = props.loading ?? false
}

const buildKeyValueList = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => ({
    key: `${prefix}-${index + 1}`,
    value: `${prefix}-${index + 1}`,
  }))

const hydrateSearchParams = () => {
  searchParams.lineList = buildKeyValueList('Line', 4)
  searchParams.selectedLine = searchParams.lineList[0] ?? { key: '', value: '' }

  searchParams.areaList = buildKeyValueList('Area', 4)
  searchParams.selectedArea = searchParams.areaList[0] ?? { key: '', value: '' }

  searchParams.sdwtList = buildKeyValueList('SDWT', 3)
  searchParams.selectedSdwt = searchParams.sdwtList[0] ?? { key: '', value: '' }

  searchParams.eqpModelList = buildKeyValueList('EQP-Model', 3)
  searchParams.selectedEqpModel = searchParams.eqpModelList[0] ?? { key: '', value: '' }

  searchParams.fdcModelList = buildKeyValueList('FDC-Model', 2)
  searchParams.selectedFdcModel = searchParams.fdcModelList[0] ?? { key: '', value: '' }

  searchParams.unitList = buildKeyValueList('UNIT', 5)
  searchParams.selectedUnit = searchParams.unitList[0] ?? { key: '', value: '' }

  searchParams.eqpIdList = buildKeyValueList('EQP', 6)
  searchParams.selectedEqpId = searchParams.eqpIdList[0] ?? { key: '', value: '' }
}

const updateSelectedFilterGrid = () => {
  const rows = (selectedSearchFilters.value[activeFilterTab.value] ?? []).map((item) => ({ value: item }))
  selectedFilterValuesGridRef.value?.setData(rows)
}

const loadMockSearchList = () => {
  handleTypeChange(selectedSearchListType.value)
}

const handleResetSearch = () => {
  hydrateSearchParams()
  selectedPeriod.value = searchParams.fromDate && searchParams.toDate
    ? [searchParams.fromDate, searchParams.toDate]
    : null
}

const onSearchCommand = async () => {
  applyLoaderState(true)
  await new Promise((resolve) => setTimeout(resolve, 400))
  hydrateSearchParams()
  loadMockSearchList()
  emit('getLotList', searchParams)
  applyLoaderState(false)
}

const handleAddButton = () => {
  if (!searchListGridRef.value) return;
  const gridView = searchListGridRef.value.getGridView()!;
  const dataSource = gridView.getDataSource() as LocalDataProvider;
  const selectedValues = selectedRows.value.map(idx => dataSource.getJsonRow(idx)['value'] as string);

  const prevSelectedItems = selectedSearchFilters.value[selectedSearchListType.value] || [];

  selectedSearchFilters.value = {
    ...selectedSearchFilters.value,
    [selectedSearchListType.value]: prevSelectedItems.concat(selectedValues),
  };

  gridView.checkAll(false);
  gridView.clearSelection();
  selectedRows.value = []

  activeFilterTab.value = selectedSearchListType.value;
};

const handleResetFilters = () => {
  selectedSearchFilters.value = Object.keys(SEARCH_LIST_TITLES).reduce((acc, key) => {
    acc[key as keyof typeof SEARCH_LIST_TITLES] = []
    return acc
  }, {} as Record<keyof typeof SEARCH_LIST_TITLES, string[]>);

  updateSelectedFilterGrid()
}

const handleExecute = () => {
  const request = new Promise<Record<string, any>[] | undefined>((resolve) => {
    setTimeout(() => resolve(fakeAlarmHistory), 1000);
  });

  emit('execute', request);
};

const setParamInfo = (selections: Record<string, string>, autoExecute = false) => {
  Object.entries(selections).forEach(([key, value]) => {
    if (!(key in searchParams)) return
    const listKey = `${key}List` as keyof SearchParam
    if (Array.isArray((searchParams as any)[listKey])) {
      const option = (searchParams as any)[listKey].find((item: { value: string }) => item.value === value)
      if (option) {
        (searchParams as any)[`selected${key}`] = option
      }
    }
  })

  if (autoExecute) {
    handleExecute()
  }
}

watch(() => props.loading, (next) => applyLoaderState(next), { immediate: true })

watch(selectedPeriod, (period) => {
  if (!period) return
  const [from, to] = period
  searchParams.fromDate = from
  searchParams.toDate = to
})

watch(activeFilterTab, (next) => {
  const values = selectedSearchFilters.value[next] ?? [];
  nextTick(() => {
    selectedFilterValuesGridRef.value?.setData(toValue(values).map(v => ({ value: v })));
  });
});

watch(selectedSearchListType, (next) => {
  handleTypeChange(next);
});

watch(selectedCategory1, () => {
  selectedCategory2.value = category2Options.value[0]?.key ?? 'ALL'
})

watch(selectedSearchFilters, (next) => {
  // 현재 탭에 대응하는 filter 데이터를 grid에 반영
  const nextValues = next[activeFilterTab.value] ?? [];
  nextTick(() => {
    selectedFilterValuesGridRef.value?.setData(toValue(nextValues).map(v => ({ value: v })));
    refreshSearchListRowData(searchListRowData.value, nextValues);
  });
});

const refreshSearchListRowData = (searchListRows: {type: SearchListType, item: string}[], selectedSearchFilterValues: string[]) => {
  if (searchListGridRef.value) {
    const selectedValues = new Set(selectedSearchFilterValues)
    searchListGridRef.value.setData(toValue(searchListRows.filter(it => !selectedValues.has(String(it.item))).map(it => ({ value: it.item }))));
  }
}

const handleTypeChange = (type: SearchListType) => {
  // 다음 틱에 선택된 Type의 필터 조건이 있다면 해당 상세 탭을 활성화한다.
  nextTick(() => {
    if (selectedSearchFilters.value[activeFilterTab.value]?.length! > 0) {
      activeFilterTab.value = type;
    }
  })

  const dataSource = SEARCH_LIST_MOCK_DATA[type] ?? []
  const selectedValues = new Set(selectedSearchFilters.value[type] ?? [])

  searchListRowData.value = dataSource.map((item) => ({ type, item }))

  const rows = dataSource
    .filter((item) => !selectedValues.has(item))
    .map((item) => ({ value: item }))

  searchListGridRef.value?.setData(rows)
  selectedRows.value = []
}
</script>