<template>
  <v-app class="dsds-app newEcoHighwayDashboardView">
    <v-main class="dsds-basic-layout">
  <Loader v-model="isLoading" :delay="600" />
      <Page>
        <PageHeader :title="t('ecoh.dashboard.homogeneous_spread') + ' Dashboard'">
          <template #filter>
            <PageHeaderFilterRow>
              <FormField class="w-30" label="Line" required> <!--Line 선택-->
                <v-select ref="lineSelectRef" v-model="searchParams.lineId" :items="lineIdItems" :placeholder="placeholders.lineId" @update:modelValue="changeLineId" item-title="lineTitle" item-value="lineId" />
              </FormField>
              <FormField class="w-30" label="SubArea">
                <v-select v-model="searchParams.subArea" :items="subAreaItems" :placeholder="placeholders.subArea" @update:modelValue="changeSubArea" item-title="SUB_AREA" item-value="SUB_AREA" multiple />
              </FormField>
              <FormField class="w-30" label="Design Rule" required>
                <v-select ref="designRuleSelectRef" v-model="searchParams.designRule" :items="designRuleItems" :placeholder="placeholders.designRule" @update:modelValue="changeDesignRule" item-title="Design_RULE" item-value="Design_RULE" />
              </FormField>
              <FormField class="w-30" label="Process ID" required>
                <v-select ref="processIdSelectRef" v-model="searchParams.processId" :items="processIdItems" :placeholder="placeholders.processId" @update:modelValue="changeProcessId" item-title="PROCESS_ID" item-value="PROCESS_ID" />
              </FormField>
              <FormField class="w-60" label="PRC Group" required>
                <v-autocomplete ref="prcGroupSelectRef" v-model="searchParams.prcGroup" :items="prcGroupItems" :placeholder="placeholders.prcGroup" @update:modelValue="changePRCGroup" item-title="PROCESS_GROUP_NAME" item-value="PROCESS_GROUP_NAME" auto-select-first />
              </FormField>
              <FormField class="w-100" label="Step seq">
                <v-autocomplete v-model="searchParams.stepSeq" :items="stepSeqItems" :placeholder="placeholders.stepSeq" item-title="stepTitle" item-value="stepSeq" auto-select-first />
              </FormField>
              <FormField>
                <FormTools>
                  <v-divider vertical />
                  <v-btn @click="getDashGridList">{{ t('ecoh.dashboard.search') }}</v-btn>
                  <v-btn @click="saveSearchSetting">{{ t('ecoh.dashboard.save_condition') }}</v-btn>
                  <v-btn @click="getSearchSetting">{{ t('ecoh.dashboard.load_condition') }}</v-btn>
                </FormTools>
              </FormField>
            </PageHeaderFilterRow>
          </template>
        </PageHeader>
        <PageBody class="flex flex-col justify-center items-center">
          <PageBodyTools>
            {{ t('ecoh.dashboard.text_message_1') }}
            <v-divider vertical />
            <div class="flex items-center gap-2 typo-footnote"
                 style="color: var(--colors-neutral-neutral-15)">
              <div class="flex items-center gap-1">
                <div class="size-2.5 border border-outer bg-white" />
                <span>{{ t('ecoh.dashboard.standard_eqp') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="size-2.5 border border-outer"
                     style="background-color: var(--colors-dioxide-film-blue-df-blue-04)" />
                <span>{{ t('ecoh.dashboard.standard_eqp_send') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="size-2.5 border border-outer"
                     style="background-color: var(--colors-gate-purple-gate-purple-06)" />
                <span>{{ t('ecoh.dashboard.hccb_eqp') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="size-2.5 border border-outer"
                     style="background-color: var(--colors-nitrogen-green-n-green-04)" />
                <span>{{ t('ecoh.dashboard.eco_eqp') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="size-2.5 border border-outer"
                     style="background-color: var(--colors-copper-yellow-cu-yellow-05)" />
                <span>{{ t('ecoh.dashboard.eco_end_eqp') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="size-2.5 border border-outer"
                     style="background-color: var(--colors-oxygen-red-o-red-04)" />
                <span>{{ t('ecoh.dashboard.non_setup_eqp') }}</span>
              </div>
            </div>
       <v-divider vertical />
       <v-btn variant="secondary"
         size="small"
         @click="selectColumnModalFlag = !selectColumnModalFlag">{{ t('ecoh.dashboard.column_setting')
        }}</v-btn>
          </PageBodyTools>
          <FakeRealGrid ref="gridRef"
                        class="dsds-page-body-content"
                        v-model="gridViewRef"
                        :columns="columns"
                        :rowCount="50"
                        :fixedOptions="{
                          colCount: 7,
                          resizable: true
                        }" />
        </PageBody>
      </Page>
      <EHWColumnSettingModal
        v-model="selectColumnModalFlag"
        v-model:column-visible-flag="columnVisibleFlag"
        @apply="columnFlagChange"
      />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {
  FormField,
  FormTools,
  Loader,
  Page,
  PageBody,
  PageBodyTools,
  PageHeader,
  PageHeaderFilterRow,
  RealGrid,
  VAutocomplete,
  VBtn,
  VSelect
} from "@/components/ui"
import { FakeRealGrid, createColumnsFromNames } from "@/faker"
import { sleep } from "@/stories/utils"
import type { GridView } from "realgrid"
import { computed, nextTick, onMounted, ref, shallowRef } from "vue"
import { useI18n } from "vue-i18n"
import type { ColumnVisibilityState } from "./_components/EHWColumnSettingModal.vue"
import EHWColumnSettingModal from "./_components/EHWColumnSettingModal.vue"

  type LineIdOption = {
    lineId: string
    lineTitle: string
  }

  type SubAreaOption = string

  type DesignRuleOption = {
    Design_RULE: string
  }

  type ProcessIdOption = {
    PROCESS_ID: string
  }

  type PrcGroupOption = {
    PROCESS_GROUP_NAME: string
  }

  type StepSeqOption = {
    stepSeq: string
    stepTitle: string
  }

  type DashSelectParams = {
    lineId?: string | null
  }

  type GlobalWithDashApis = Record<string, unknown>

  interface SearchParams {
    lineId?: string | null
    subArea?: string[] | null
    designRule?: string | null
    processId?: string[] | null
    prcGroup?: string | null
    stepSeq?: string[] | null
    empNo?: string | null
  }

  const mockSubAreaMap: Record<string, string[]> = {
    "1": [
      "CMP",
      "Lithography",
      "Diffusion",
    ],
    "2": [
      "Assembly",
      "Inspection",
    ],
  }

  const mockDesignRuleMap: Record<string, DesignRuleOption[]> = {
    "1": [
      { Design_RULE: "ECOH-L1" },
      { Design_RULE: "ECOH-L2" },
    ],
    "2": [
      { Design_RULE: "ECOH-LA" },
      { Design_RULE: "ECOH-LB" },
    ],
  }

  const mockProcessIdMap: Record<string, ProcessIdOption[]> = {
    "1": [
      { PROCESS_ID: "PRC-100" },
      { PROCESS_ID: "PRC-101" },
    ],
    "2": [
      { PROCESS_ID: "PRC-200" },
      { PROCESS_ID: "PRC-201" },
    ],
  }

  const mockPrcGroupMap: Record<string, PrcGroupOption[]> = {
    "1": [
      { PROCESS_GROUP_NAME: "Front-End" },
      { PROCESS_GROUP_NAME: "Etch" },
    ],
    "2": [
      { PROCESS_GROUP_NAME: "Back-End" },
      { PROCESS_GROUP_NAME: "Assembly Line" },
    ],
  }

  const mockStepSeqMap: Record<string, StepSeqOption[]> = {
    "1": [
      { stepSeq: "SEQ-01", stepTitle: "Initial Setup" },
      { stepSeq: "SEQ-02", stepTitle: "Calibration" },
      { stepSeq: "SEQ-03", stepTitle: "Deposition" },
      { stepSeq: "SEQ-04", stepTitle: "Etching" },
      { stepSeq: "SEQ-05", stepTitle: "Inspection" },
      { stepSeq: "SEQ-06", stepTitle: "Cleaning" },
      { stepSeq: "SEQ-07", stepTitle: "Doping" },
      { stepSeq: "SEQ-08", stepTitle: "Oxidation" },
      { stepSeq: "SEQ-09", stepTitle: "Polishing" },
      { stepSeq: "SEQ-10", stepTitle: "Final Review" },
    ],
    "2": [
      { stepSeq: "SEQ-11", stepTitle: "Routing" },
      { stepSeq: "SEQ-12", stepTitle: "Packaging" },
    ],
  }

  const fallbackSubAreaOptions: SubAreaOption[] = []
  const fallbackDesignRuleOptions: DesignRuleOption[] = [{ Design_RULE: "ALL" }]
  const fallbackProcessIdOptions: ProcessIdOption[] = [{ PROCESS_ID: "ALL" }]
  const fallbackPrcGroupOptions: PrcGroupOption[] = [{ PROCESS_GROUP_NAME: "ALL" }]
  const fallbackStepSeqOptions: StepSeqOption[] = [{ stepSeq: "ALL", stepTitle: "All" }]

  function ensureGlobalFunction<T extends (...args: any[]) => unknown>(
    key: string,
    fallback: T,
  ): T {
    const globalTarget = globalThis as GlobalWithDashApis
    const maybeFn = globalTarget[key]

    if (typeof maybeFn === "function") {
      return maybeFn as T
    }

    globalTarget[key] = fallback
    return fallback
  }

  const getDashLineIdList = ensureGlobalFunction<(
    params: DashSelectParams,
  ) => Promise<{ data: { lineId: string; lineTitle: string }[] }>>("getDashLineIdList", async () => {
    const options = [
      { lineId: '1', lineTitle: 'Line 1' },
      { lineId: '2', lineTitle: 'Line 2' },
    ]
    return { data: options }
  })

  const getDashSubAreaList = ensureGlobalFunction<(
    params: DashSelectParams,
  ) => Promise<{ data: SubAreaOption[] }>>("getDashSubAreaList", async ({ lineId }) => {
    const options = lineId ? mockSubAreaMap[lineId] ?? fallbackSubAreaOptions : fallbackSubAreaOptions
    return { data: options }
  })

  const getDashDesignRuleList = ensureGlobalFunction<(
    params: DashSelectParams,
  ) => Promise<{ data: DesignRuleOption[] }>>("getDashDesignRuleList", async ({ lineId }) => {
    const options = lineId ? mockDesignRuleMap[lineId] ?? fallbackDesignRuleOptions : fallbackDesignRuleOptions
    return { data: options }
  })

  const getDashProcessIdList = ensureGlobalFunction<(
    params: DashSelectParams,
  ) => Promise<{ data: ProcessIdOption[] }>>("getDashProcessIdList", async ({ lineId }) => {
    const options = lineId ? mockProcessIdMap[lineId] ?? fallbackProcessIdOptions : fallbackProcessIdOptions
    return { data: options }
  })

  const getDashPrcGroupList = ensureGlobalFunction<(
    params: DashSelectParams,
  ) => Promise<{ data: PrcGroupOption[] }>>("getDashPrcGroupList", async ({ lineId }) => {
    const options = lineId ? mockPrcGroupMap[lineId] ?? fallbackPrcGroupOptions : fallbackPrcGroupOptions
    return { data: options }
  })

  const getDashStepSeqList = ensureGlobalFunction<(
    params: DashSelectParams,
  ) => Promise<{ data: StepSeqOption[] }>>("getDashStepSeqList", async ({ lineId }) => {
    const options = lineId ? mockStepSeqMap[lineId] ?? fallbackStepSeqOptions : fallbackStepSeqOptions
    return { data: options }
  })

  const { t } = useI18n();

  const isLoading = ref(false);
  const gridRef = ref<InstanceType<typeof RealGrid> | null>(null)

  const lineSelectRef = ref<InstanceType<typeof VSelect> | null>(null)
  const designRuleSelectRef = ref<InstanceType<typeof VSelect> | null>(null)
  const processIdSelectRef = ref<InstanceType<typeof VSelect> | null>(null)
  const prcGroupSelectRef = ref<InstanceType<typeof VAutocomplete> | null>(null)

  const gridViewRef = shallowRef<GridView>()
  const selectColumnModalFlag = ref(false)

  const columnVisibleFlag = ref<ColumnVisibilityState>({
    gpmLine: true,
    processId: true,
    subArea: true,
    stepSeq: true,
    stepDesc: true,
    recipeId: true,
    processGroupName: true,
    rmModel: true,
    ecModel: true,
  });

  onMounted(() => {
    initSearchSetting();
    nextTick(() => {
      lineSelectRef.value?.focus?.()
    })
  })

  const columns = createColumnsFromNames([
    ["lineId", { fieldName: 'gpmLine', autoFilter: true, width: 65, header: { text: "Line ID" } }],
    ["procId", { fieldName: "processId", autoFilter: true, header: { text: "Process ID" } }],
    ["subArea", { autoFilter: true, width: 80 }],
    ["stepSeq", { autoFilter: true, width: 100 }],
    ["stepDesc", { autoFilter: true, width: 180 }],
    ["recipeId", { autoFilter: true }],
    ["procId", { fieldName: "processGroupName", autoFilter: true, header: { text: "Prc Group" } }],
    ["procId", { fieldName: "rmModel", autoFilter: true, header: { text: "RM Model" } }],
    ["procId", { fieldName: "ecModel", autoFilter: true, header: { text: "EC Model" } }],
    ["eqpId", { fieldName: "eqpId1", width: 90, autoFilter: false, header: { text: "EQP ID 1" } }],
    ["eqpId", { fieldName: "eqpId2", width: 90, autoFilter: false, header: { text: "EQP ID 2" } }],
    ["eqpId", { fieldName: "eqpId3", width: 90, autoFilter: false, header: { text: "EQP ID 3" } }],
    ["eqpId", { fieldName: "eqpId4", width: 90, autoFilter: false, header: { text: "EQP ID 4" } }],
    ["eqpId", { fieldName: "eqpId5", width: 90, autoFilter: false, header: { text: "EQP ID 5" } }],
    ["eqpId", { fieldName: "eqpId6", width: 90, autoFilter: false, header: { text: "EQP ID 6" } }],
    ["eqpId", { fieldName: "eqpId7", width: 90, autoFilter: false, header: { text: "EQP ID 7" } }],
    ["eqpId", { fieldName: "eqpId8", width: 90, autoFilter: false, header: { text: "EQP ID 8" } }],
    ["eqpId", { fieldName: "eqpId9", width: 90, autoFilter: false, header: { text: "EQP ID 9" } }],
    ["eqpId", { fieldName: "eqpId10", width: 90, autoFilter: false, header: { text: "EQP ID 10" } }],
    ["eqpId", { fieldName: "eqpId11", width: 90, autoFilter: false, header: { text: "EQP ID 11" } }],
    ["eqpId", { fieldName: "eqpId12", width: 90, autoFilter: false, header: { text: "EQP ID 12" } }],
    ["eqpId", { fieldName: "eqpId13", width: 90, autoFilter: false, header: { text: "EQP ID 13" } }],
    ["eqpId", { fieldName: "eqpId14", width: 90, autoFilter: false, header: { text: "EQP ID 14" } }],
    ["eqpId", { fieldName: "eqpId15", width: 90, autoFilter: false, header: { text: "EQP ID 15" } }],
    ["eqpId", { fieldName: "eqpId16", width: 90, autoFilter: false, header: { text: "EQP ID 16" } }],
    ["eqpId", { fieldName: "eqpId17", width: 90, autoFilter: false, header: { text: "EQP ID 17" } }],
  ])

  const searchParams = ref<SearchParams>({
    lineId: undefined,
    subArea: [],
    designRule: undefined,
    processId: undefined,
    prcGroup: undefined,
    stepSeq: [],
    empNo: undefined,
  })
  const lineIdItems = ref<LineIdOption[]>([])
  const subAreaItems = ref<SubAreaOption[]>([])
  const designRuleItems = ref<DesignRuleOption[]>([])
  const processIdItems = ref<ProcessIdOption[]>([])
  const prcGroupItems = ref<PrcGroupOption[]>([])
  const stepSeqItems = ref<StepSeqOption[]>([])

  const placeholders = computed(() => ({
    lineId: lineIdItems.value.length > 0 ? "Select" : "Loading...",
    subArea: subAreaItems.value.length > 0 ? "Select" : "Loading...",
    designRule: designRuleItems.value.length > 0 ? "Select" : "Loading...",
    processId: processIdItems.value.length > 0 ? "Select" : "Loading...",
    prcGroup: prcGroupItems.value.length > 0 ? "Select" : "Loading...",
    stepSeq: stepSeqItems.value.length > 0 ? "Select" : "Loading...",
  }))

  //검색조건 초기화 함수
  function initSearchSetting() {
    // LineID 리스트 조회
    getSelectLineIdList();
  };

  // LineID 리스트 검색함수
  async function getSelectLineIdList() {
    const idxcnt = undefined;
    const { data } = await getDashLineIdList(searchParams.value); // 기본
    if (data.length > 0) {
      lineIdItems.value = data;
    }
    //기본라인정보/검색조건정보가 없을시 리스트중 가장 0순위를 기본값으로 설정
    if (searchParams.value.lineId == undefined) {
      lineIdItems.value = data;
      searchParams.value.lineId = lineIdItems.value[0].lineId;
    } else {
    }
    searchParams.value.lineId = undefined;
  }

  //SubArea 리스트 검색 함수
  async function getSelectSubAreaList() {
    const params: DashSelectParams = {
      lineId: searchParams.value.lineId,
    };
    const { data } = await getDashSubAreaList(params); // 기본
    subAreaItems.value = data;
  }

  // DesignRule 리스트 검색 함수
  async function getSelectDesignRuleList() {
    const params: DashSelectParams = {
      lineId: searchParams.value.lineId,
    };

    const { data } = await getDashDesignRuleList(params);
    designRuleItems.value = data;
  }

  async function getSelectProcessIdList() {
    const params: DashSelectParams = {
      lineId: searchParams.value.lineId,
    };

    const { data } = await getDashProcessIdList(params);
    processIdItems.value = data;
  }

  async function getSelectPRCGroupList() {
    const params: DashSelectParams = {
      lineId: searchParams.value.lineId,
    };

    const { data } = await getDashPrcGroupList(params);
    prcGroupItems.value = data;
  }

  async function getSelectStepSeqList() {
    const params: DashSelectParams = {
      lineId: searchParams.value.lineId,
    };

    const { data } = await getDashStepSeqList(params);
    stepSeqItems.value = data;
  }


  //LineID 리스트 업데이트(변경/선택시) 함수
  async function changeLineId() {
    searchParams.value.subArea = undefined;
    searchParams.value.designRule = undefined;
    searchParams.value.processId = undefined;
    searchParams.value.prcGroup = undefined;
    searchParams.value.stepSeq = undefined;
    subAreaItems.value = [];
    designRuleItems.value = [];
    processIdItems.value = [];
    prcGroupItems.value = [];
    stepSeqItems.value = [];

    //subArea, DesignRule 라인ID 리스트 선택에 따른 각각 리스트업
    await getSelectSubAreaList();
    await getSelectDesignRuleList();

    setTimeout(() => designRuleSelectRef.value?.focus(), 120)
  }

  //SubArea 리스트 업데이트(다중변경/다중선택시) 함수
  async function changeSubArea() {
    searchParams.value.prcGroup = undefined;
    searchParams.value.stepSeq = undefined;
    prcGroupItems.value = [];
    stepSeqItems.value = [];
    if (searchParams.value.processId != undefined) {
      await getSelectPRCGroupList();
    }
  }

  async function changeDesignRule() {
    searchParams.value.processId = undefined;
    searchParams.value.prcGroup = undefined;
    searchParams.value.stepSeq = undefined;
    prcGroupItems.value = [];
    stepSeqItems.value = [];
    await getSelectProcessIdList();
    setTimeout(() => processIdSelectRef.value?.focus(), 120);
  }

  async function changeProcessId() {
    searchParams.value.prcGroup = undefined;
    searchParams.value.stepSeq = undefined;
    prcGroupItems.value = [];
    stepSeqItems.value = [];
    //ProcessId 리스트 선택에 따른 PRCGroup 조회
    await getSelectPRCGroupList();
    setTimeout(() => prcGroupSelectRef.value?.focus(), 120);
  }

  //PRCGroup 리스트 업데이트(변경/선택시) 함수
  async function changePRCGroup() {
    searchParams.value.stepSeq = undefined;
    stepSeqItems.value = [];
    //PRCGroup 리스트 선택에 따른 stepSeq 조회
    await getSelectStepSeqList();
  }

  async function getDashGridList(): Promise<void> {
    // Placeholder awaiting real integration
    await Promise.resolve();
  }

  async function saveSearchSetting(): Promise<void> {
    await Promise.resolve();
  }

  async function getSearchSetting(): Promise<void> {
    /* 3초간 sleep */
    isLoading.value = true;
    await sleep(3000);
    await Promise.resolve();
    isLoading.value = false;
  }

  defineProps<{
    args: any,
  }>()


function columnFlagChange(){
  var visibleCnt = 0;
  if(columnVisibleFlag.value.gpmLine==true)
    visibleCnt++;
  if(columnVisibleFlag.value.processId==true)
    visibleCnt++;
  if(columnVisibleFlag.value.subArea==true)
    visibleCnt++;
  if(columnVisibleFlag.value.stepSeq==true)
    visibleCnt++;
  if(columnVisibleFlag.value.stepDesc==true)
    visibleCnt++;
  if(columnVisibleFlag.value.recipeId==true)
    visibleCnt++;
  if(columnVisibleFlag.value.processGroupName==true)
    visibleCnt++;
  if(columnVisibleFlag.value.rmModel==true)
    visibleCnt++;
  if(columnVisibleFlag.value.ecModel==true)
    visibleCnt++;

  if (gridViewRef.value) {
    gridViewRef.value.columnByName("gpmLine").visible = columnVisibleFlag.value.gpmLine;
    gridViewRef.value.columnByName("processId").visible = columnVisibleFlag.value.processId;
    gridViewRef.value.columnByName("subArea").visible = columnVisibleFlag.value.subArea;
    gridViewRef.value.columnByName("stepSeq").visible = columnVisibleFlag.value.stepSeq;
    gridViewRef.value.columnByName("stepDesc").visible = columnVisibleFlag.value.stepDesc;
    gridViewRef.value.columnByName("recipeId").visible = columnVisibleFlag.value.recipeId;
    gridViewRef.value.columnByName("processGroupName").visible = columnVisibleFlag.value.processGroupName;
    gridViewRef.value.columnByName("rmModel").visible = columnVisibleFlag.value.rmModel;
    gridViewRef.value.columnByName("ecModel").visible = columnVisibleFlag.value.ecModel;
    gridViewRef.value.setFixedOptions({
      colCount: visibleCnt,
      resizable: true
    });
  }
}
</script>