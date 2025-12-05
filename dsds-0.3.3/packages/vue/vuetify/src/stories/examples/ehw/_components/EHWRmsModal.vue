<template>
  <Modal size="large" v-model="rmsModalFlag" :contentProps="{style: 'min-height: 553px !important;'}">
    <v-card>
      <v-card-title>
        <ModalHeader @close="rmsModalFlag = false">
          RMS
          <span>&nbsp;</span>
          <span class="font-bold text-neutral-3rd">(EQP:{{ esopParams.eqpId }})</span>
        </ModalHeader>
      </v-card-title>
      <VTabsContainer defaultValue="tab1_rms" asChild>
        <VTabs class="border-b border-outer px-5 mt-3"
            v-if="esopParams.area=='PHOTO' && rmsSummaryInfo != null && rmsSummaryInfo.selectEqpIdInline != null && rmsSummaryInfo.selectEqpIdInline.length > 4">
            <VTab value="tab1_rms">
              <span v-if="esopParams.area=='PHOTO' && (compareEqpInfo.prcGroup.indexOf('SOH') != -1 || compareEqpInfo.prcGroup.indexOf('CRC') != -1)">SOH</span>
              <span v-if="esopParams.area=='PHOTO' && (compareEqpInfo.prcGroup.indexOf('SOH') == -1 && compareEqpInfo.prcGroup.indexOf('CRC') == -1)">Spinner</span>
            </VTab>
            <VTab value="tab2_rms" >Scanner</VTab>
        </VTabs>
        <VTabsWindow asChild>
          <VTabsWindowItem value="tab1_rms">
            <div class="dsds-dialog-form-filter-row">
              <FormField label="표준 설비" required class="w-30">
                <v-select v-model="selectedGpmStdEqpId" :items="stdEqpIdList"  placeholder="표준설비 선택"/>
              </FormField>
              <FormField label="PPID">
                <div class="flex items-center gap-1">
                  <v-text-field class="w-30" v-model="manualPpidInput" clearable  :disabled="copyRecipeManualPpidChk"/>
                  <v-checkbox color="#85898d" v-model="copyRecipeManualPpidChk"
                    label="Recipe ID 동일"
                  />
                </div>
              </FormField>
              <FormField label="With SEQUENCE" class="w-30">
                <v-select v-model="copyRecipeSequenceChk" :items="selectSequenceItems" @update:modelValue="rmsViewFlagChange()" item-title="label" item-value="value" />
              </FormField>
              <FormField>
                <FormTools>
                  <v-divider vertical />
                  <v-btn @click="changeRmsStdEqpId">Compare</v-btn>
                </FormTools>
              </FormField>
            </div>
            <v-divider />
            <v-card-text class="dsds-dialog-form-body">
              <div class="dsds-form-item">
                <div class="dsds-form-item-title">
                  <b>비교 결과</b>
                  <span class="dsds-form-item-hint-text">※Recipeid가 포함된 모든 Data를 가져옵니다.</span>
                </div>
                <table class="dsds-table grid grid-cols-[64px_120px_120px_200px]!">
                  <tbody>
                    <tr>
                      <th class="align-top row-span-2">조회 기준</th>
                      <th>Reference EQP</th>
                      <th>Compare EQP</th>
                      <th>Recipe ID</th>
                    </tr>
                    <tr>
                      <td>{{rmsSummaryInfo.stdEqpId}}</td>
                      <td>{{rmsSummaryInfo.selectEqpId}}</td>
                      <td class="truncate">{{rmsSummaryInfo.recipeId}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="dsds-form-item flex-1">
                <div class="dsds-form-item-title">
                  세부 결과 리스트
                  <div class="ml-auto flex items-center gap-1">
                    <div class="typo-caption">결과 내 검색</div>
                    <Searchbox size="small" class="w-27" v-model="copyRecipeSearchText" @input="rmsViewFlagChange()" @click:clear="rmsViewFlagChange()" />
                  </div>
                </div>
                <ScrollableTable wrapperClass="flex-1 min-h-0 h-full!" class="dsds-table grid grid-cols-[300px_160px_160px_100px_39px]!">
                  <thead>
                    <tr>
                      <th style="width: 300px">
                          표준설비에 등록된 Recipe List
                      </th>
                      <th>Chamber</th>
                      <th>Recipe Type</th>
                      <th>Status</th>
                      <th class="text-center!">
                        <v-checkbox v-model="copyRecipeAllChk" @change="rmsCheckFlagChange()" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in eqpRecipeCompareList.data" :key="index">
                      <td v-if='item.VIEWFLAG=="Y"' style="text-decoration: underline; color:#515E94">{{ item.RCP_ID }}</td>
                      <td v-if='item.VIEWFLAG=="Y"'>{{ item.CHAMBERID }}</td>
                      <td v-if='item.VIEWFLAG=="Y"'>{{ item.RCP_TYPE }}</td>
                      <td class="py-0.5!" v-if='item.VIEWFLAG=="Y" && item.STATUS=="등록"'>
                        <div class="py-0.5 rounded-xs" style="background-color:#D4F1D7; color:#145C1C; text-align:center">
                        {{ item.STATUS }}
                        </div>
                      </td>
                      <td class="py-0.5!" v-if='item.VIEWFLAG=="Y" && item.STATUS!="등록"'>
                        <div class="py-0.5 rounded-xs" style="background-color:#FFE9C8; color:#80591C; text-align:center">
                          <a @click.prevent="callCopyRmsRecipe('SINGLE',index)">{{ item.STATUS }}</a>
                        </div>
                      </td>
                      <td class="text-center!" v-if='item.VIEWFLAG=="Y"'>
                        <v-checkbox v-if='item.STATUS!="등록"' v-model="item.CHKINFO"></v-checkbox>
                      </td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end gap-2">
              <v-btn size="large" @click="callCopyRmsRecipe('BULK',0)">Tool Recipe 등록</v-btn>
              <v-btn size="large" variant="secondary" @click="rmsModalFlag = false">닫기</v-btn>
            </v-card-actions>
          </VTabsWindowItem>
          <VTabsWindowItem value="tab2_rms">
            <div class="dsds-dialog-form-filter-row">
              <FormField label="표준 설비" required class="w-30">
                <v-select  v-model="selectedRmsStdEqpIdInline" :items="stdEqpIdListInline"  placeholder="표준설비 선택"/>
              </FormField>
              <FormField label="PPID">
                <div class="flex items-center gap-1">
                  <v-text-field class="w-30" v-model="manualPpidInputInline" clearable  :disabled="copyRecipeManualPpidChkInline"/>
                  <v-checkbox v-model="copyRecipeManualPpidChkInline" label="Recipe ID 동일" />
                </div>
              </FormField>
              <FormField label="With SEQUENCE" class="w-30">
                <v-select v-model="copyRecipeSequenceChkInline" :items="selectSequenceItems" @update:modelValue="rmsViewFlagChangeInline()" item-title="label" item-value="value" />
              </FormField>
              <FormField>
                <FormTools>
                  <v-divider vertical />
                  <v-btn @click="changeRmsStdEqpIdInline">Compare</v-btn>
                </FormTools>
              </FormField>
            </div>
            <v-divider />
            <v-card-text class="dsds-dialog-form-body">
              <div class="dsds-form-item">
                <div class="dsds-form-item-title">
                  <b>비교 결과</b>
                  <span class="dsds-form-item-hint-text">※Recipeid가 포함된 모든 Data를 가져옵니다.</span>
                </div>
                <table class="dsds-table grid grid-cols-[64px_120px_120px_auto]!">
                  <tbody>
                    <tr>
                      <th class="align-top row-span-2!">조회 기준</th>
                      <th>Reference EQP</th>
                      <th>Compare EQP</th>
                      <th class="truncate">Recipe ID</th>
                    </tr>
                    <tr>
                      <td>{{rmsSummaryInfo.stdEqpIdInline}}</td>
                      <td>{{rmsSummaryInfo.selectEqpIdInline}}</td>
                      <td>{{rmsSummaryInfo.recipeIdInline}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="dsds-form-item flex-1">
                <div class="dsds-form-item-title">
                  세부 결과 리스트
                  <div class="ml-auto flex items-center gap-1">
                    <div class="typo-caption">결과 내 검색</div>
                    <Searchbox size="small" class="w-27" v-model="copyRecipeSearchTextInline" @input="rmsViewFlagChangeInline()" @click:clear="rmsViewFlagChangeInline()"/>
                  </div>
                </div>
                <ScrollableTable class="dsds-table grid grid-cols-[300px_160px_160px_100px_39px]!">
                  <thead>
                    <tr>
                      <th style="width: 300px">
                          표준설비에 등록된 Recipe List
                      </th>
                      <th>Chamber</th>
                      <th>Recipe Type</th>
                      <th>Status</th>
                      <th class="text-center!">
                        <v-checkbox v-model="copyRecipeAllChkInline" @change="rmsCheckFlagChangeInline()"/>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in eqpRecipeCompareListInline.data" :key="index">
                      <td v-if='item.VIEWFLAG=="Y"' style="text-decoration: underline; color:#515E94">{{ item.RCP_ID }}</td>
                      <td v-if='item.VIEWFLAG=="Y"'>{{ item.CHAMBERID }}</td>
                      <td v-if='item.VIEWFLAG=="Y"'>{{ item.RCP_TYPE }}</td>
                      <td class="py-0.5!" v-if='item.VIEWFLAG=="Y" && item.STATUS=="등록"'>
                        <div class="py-0.5 rounded-xs" style="background-color:#D4F1D7; color:#145C1C; text-align:center">
                          {{ item.STATUS }}
                        </div>
                      </td>
                      <td class="py-0.5!" v-if='item.VIEWFLAG=="Y" && item.STATUS!="등록"'>
                        <div class="py-0.5 rounded-xs" style="background-color:#FFE9C8; color:#80591C; text-align:center">
                          <a @click.prevent="callCopyRmsRecipeInline('SINGLE',index)">{{ item.STATUS }}</a>
                        </div>
                      </td>
                      <td v-if='item.VIEWFLAG=="Y"' class="text-center!">
                        <v-checkbox v-if='item.STATUS!="등록"' v-model="item.CHKINFO"/>
                      </td>
                    </tr>
                  </tbody>
                </ScrollableTable>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end gap-2">
              <v-btn size="large" @click="callCopyRmsRecipeInline('BULK',0)">Tool Recipe 등록</v-btn>
              <v-btn size="large" variant="secondary" @click="rmsModalFlag = false">닫기</v-btn>
            </v-card-actions>
          </VTabsWindowItem>
        </VTabsWindow>
      </VTabsContainer>
    </v-card>
  </Modal>
</template>

<script setup lang="ts">
import {
  FormField,
  FormTools,
  Modal,
  ModalHeader,
  ScrollableTable,
  Searchbox,
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VCheckbox,
  VDivider,
  VSelect,
  VTab,
  VTabs,
  VTabsContainer,
  VTabsWindow,
  VTabsWindowItem,
  VTextField
} from "@/components/ui"
import { reactive, ref, watch } from "vue"
import {
  createEqpOptions,
  createRmsSummaryInfo,
  createSequenceFilterOptions,
  generateRmsRecipeRows,
  type RmsRecipeRow,
  type RmsSummaryInfo,
  type SequenceFilter,
} from "../faker"

const emit = defineEmits<{
  close: []
  'update:modelValue': [value: boolean]
}>()

const props = withDefaults(defineProps<{
  area?: string
  modelValue: boolean
}>(), {
  area: "PHOTO",
})

interface EsopParams {
  area: string
  eqpId: string
}

interface CompareEqpInfo {
  prcGroup: string
}

type RecipeCompareRow = RmsRecipeRow

const esopParams = reactive<EsopParams>({
  area: props.area,
  eqpId: "EQP-1701",
})

const rmsSummaryInfo = reactive<RmsSummaryInfo>(createRmsSummaryInfo())

const compareEqpInfo = reactive<CompareEqpInfo>({
  prcGroup: "SOH",
})

const stdEqpIdList = createEqpOptions(["STD-EQP-01", "STD-EQP-02", "STD-EQP-03"])

const stdEqpIdListInline = createEqpOptions(["STD-EQP-02", "STD-EQP-04", "STD-EQP-05"])

const selectSequenceItems = createSequenceFilterOptions()

const rmsModalFlag = ref(props.modelValue);
watch(rmsModalFlag, (nextOpen) => {
  console.log("[Storybook][RMS] Modal open state changed:", nextOpen);
  emit('update:modelValue', nextOpen);
})
const selectedGpmStdEqpId = ref<string>(stdEqpIdList[0]?.value ?? "STD-EQP-01")
const manualPpidInput = ref<string>(rmsSummaryInfo.recipeId)
const copyRecipeManualPpidChk = ref<boolean>(true)
const copyRecipeSequenceChk = ref<SequenceFilter>("ALL")
const copyRecipeAllChk = ref<boolean>(false)
const copyRecipeSearchText = ref<string>("")

const selectedRmsStdEqpIdInline = ref<string>(stdEqpIdListInline[0]?.value ?? "STD-EQP-02")
const manualPpidInputInline = ref<string>(rmsSummaryInfo.recipeIdInline)
const copyRecipeManualPpidChkInline = ref<boolean>(true)
const copyRecipeSequenceChkInline = ref<SequenceFilter>("ALL")
const copyRecipeAllChkInline = ref<boolean>(false)
const copyRecipeSearchTextInline = ref<string>("")

watch(() => props.area, (area) => {
  esopParams.area = area
})

const eqpRecipeCompareList = reactive<{ data: RecipeCompareRow[] }>({
  data: generateRmsRecipeRows(4, { variant: "sequence" }),
})

const eqpRecipeCompareListInline = reactive<{ data: RecipeCompareRow[] }>({
  data: generateRmsRecipeRows(4, { variant: "scanner" }),
})

function matchesSequenceFilter(item: RecipeCompareRow) {
  if (copyRecipeSequenceChk.value === "ALL") return true
  const isSequence = item.RCP_TYPE.toLowerCase().includes("seq")
  return copyRecipeSequenceChk.value === "WITH" ? isSequence : !isSequence
}

function matchesSearchFilter(item: RecipeCompareRow) {
  const query = copyRecipeSearchText.value.trim().toLowerCase()
  if (!query) return true
  return (
    item.RCP_ID.toLowerCase().includes(query) ||
    item.CHAMBERID.toLowerCase().includes(query) ||
    item.RCP_TYPE.toLowerCase().includes(query)
  )
}

function applyRecipeFilters() {
  eqpRecipeCompareList.data.forEach((item) => {
    item.VIEWFLAG = matchesSequenceFilter(item) && matchesSearchFilter(item) ? "Y" : "N"
  })
}

function syncAllCheckState() {
  const selectableItems = eqpRecipeCompareList.data.filter((item) => item.STATUS !== "등록" && item.VIEWFLAG === "Y")
  copyRecipeAllChk.value = selectableItems.length > 0 && selectableItems.every((item) => item.CHKINFO)
}

function rmsViewFlagChange() {
  applyRecipeFilters()
  syncAllCheckState()
}

function rmsCheckFlagChange() {
  eqpRecipeCompareList.data.forEach((item) => {
    if (item.STATUS !== "등록") {
      item.CHKINFO = copyRecipeAllChk.value
    }
  })
  syncAllCheckState()
}

function registerRecipes(list: RecipeCompareRow[], mode: "SINGLE" | "MULTI", index?: number) {
  const targets: RecipeCompareRow[] = []

  if (mode === "SINGLE" && typeof index === "number") {
    const candidate = list[index]
    if (candidate && candidate.STATUS !== "등록") {
      targets.push(candidate)
    }
  }

  if (mode === "MULTI") {
    targets.push(
      ...list.filter((item) => item.STATUS !== "등록" && item.CHKINFO)
    )

    if (!targets.length && typeof index === "number") {
      const fallback = list.find((item, i) => item.STATUS !== "등록" && (i === index || index === 0))
      if (fallback) {
        targets.push(fallback)
      }
    }
  }

  targets.forEach((item) => {
    item.STATUS = "등록"
    item.CHKINFO = false
  })

  return targets.length
}

function callCopyRmsRecipe(_mode: "SINGLE" | "BULK", index: number) {
  const mode = _mode === "BULK" ? "MULTI" : _mode
  const count = registerRecipes(eqpRecipeCompareList.data, mode, index)
  if (count === 0) {
    console.info("[Storybook][RMS] 등록할 Recipe가 선택되지 않았습니다.")
    return
  }
  copyRecipeAllChk.value = false
  rmsViewFlagChange()
  console.info(`[Storybook][RMS] ${count}건의 Recipe가 등록된 상태로 표시됩니다.`)
}

function changeRmsStdEqpId() {
  rmsSummaryInfo.stdEqpId = selectedGpmStdEqpId.value
  rmsSummaryInfo.selectEqpId = `CMP-${selectedGpmStdEqpId.value.slice(-2)}`
  if (copyRecipeManualPpidChk.value) {
    manualPpidInput.value = `${selectedGpmStdEqpId.value}-SEQ`
  }
  rmsSummaryInfo.recipeId = manualPpidInput.value
}

function matchesSequenceFilterInline(item: RecipeCompareRow) {
  if (copyRecipeSequenceChkInline.value === "ALL") return true
  const isSequence = item.RCP_TYPE.toLowerCase().includes("seq") || item.RCP_TYPE.toLowerCase().includes("scan")
  return copyRecipeSequenceChkInline.value === "WITH" ? isSequence : !isSequence
}

function matchesSearchFilterInline(item: RecipeCompareRow) {
  const query = copyRecipeSearchTextInline.value.trim().toLowerCase()
  if (!query) return true
  return (
    item.RCP_ID.toLowerCase().includes(query) ||
    item.CHAMBERID.toLowerCase().includes(query) ||
    item.RCP_TYPE.toLowerCase().includes(query)
  )
}

function applyRecipeFiltersInline() {
  eqpRecipeCompareListInline.data.forEach((item) => {
    item.VIEWFLAG = matchesSequenceFilterInline(item) && matchesSearchFilterInline(item) ? "Y" : "N"
  })
}

function syncAllCheckStateInline() {
  const selectableItems = eqpRecipeCompareListInline.data.filter((item) => item.STATUS !== "등록" && item.VIEWFLAG === "Y")
  copyRecipeAllChkInline.value = selectableItems.length > 0 && selectableItems.every((item) => item.CHKINFO)
}

function rmsViewFlagChangeInline() {
  applyRecipeFiltersInline()
  syncAllCheckStateInline()
}

function rmsCheckFlagChangeInline() {
  eqpRecipeCompareListInline.data.forEach((item) => {
    if (item.STATUS !== "등록") {
      item.CHKINFO = copyRecipeAllChkInline.value
    }
  })
  syncAllCheckStateInline()
}

function callCopyRmsRecipeInline(_mode: "SINGLE" | "BULK", index: number) {
  const mode = _mode === "BULK" ? "MULTI" : _mode
  const count = registerRecipes(eqpRecipeCompareListInline.data, mode, index)
  if (count === 0) {
    console.info("[Storybook][RMS] 등록할 Scanner Recipe가 선택되지 않았습니다.")
    return
  }
  copyRecipeAllChkInline.value = false
  rmsViewFlagChangeInline()
  console.info(`[Storybook][RMS] ${count}건의 Scanner Recipe가 등록된 상태로 표시됩니다.`)
}

function changeRmsStdEqpIdInline() {
  rmsSummaryInfo.stdEqpIdInline = selectedRmsStdEqpIdInline.value
  rmsSummaryInfo.selectEqpIdInline = `SCAN-${selectedRmsStdEqpIdInline.value.slice(-2)}`
  if (copyRecipeManualPpidChkInline.value) {
    manualPpidInputInline.value = `${selectedRmsStdEqpIdInline.value}-SCAN`
  }
  rmsSummaryInfo.recipeIdInline = manualPpidInputInline.value
}

watch(manualPpidInput, (value) => {
  rmsSummaryInfo.recipeId = value || "RCP-SEQ-001"
})

watch(copyRecipeManualPpidChk, (checked) => {
  if (checked) {
    manualPpidInput.value = `${selectedGpmStdEqpId.value}-SEQ`
  }
})

watch(manualPpidInputInline, (value) => {
  rmsSummaryInfo.recipeIdInline = value || "RCP-SCN-010"
})

watch(copyRecipeManualPpidChkInline, (checked) => {
  if (checked) {
    manualPpidInputInline.value = `${selectedRmsStdEqpIdInline.value}-SCAN`
  }
})

watch(
  () => eqpRecipeCompareList.data,
  () => {
    syncAllCheckState()
  },
  { deep: true }
)

watch(
  () => eqpRecipeCompareListInline.data,
  () => {
    syncAllCheckStateInline()
  },
  { deep: true }
)

// Initialize filters so mock data respects defaults in Storybook
rmsViewFlagChange()
rmsViewFlagChangeInline()
</script>