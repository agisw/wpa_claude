<template>
  <Page class="min-w-[1400px]! w-[1400px]! max-w-[1400px]!">
    <PageHeader :title="t('ecoh.create_highway.title')" />
    <PageBody>
      <FormContents>
        <!-- PEMS 폼 -->
        <FormContent>
          <FormTitle>PEMS</FormTitle>
          <div class="flex flex-col">
            <table class="dsds-table dsds-table-medium grid grid-cols-[140px_200px_140px_200px_140px_200px_140px_200px]">
              <tbody>
                <tr>
                  <th>Line ID</th>
                  <td>{{ insertParams.lineId }}</td>
                  <th>EQPID</th>
                  <td class="truncate">{{ insertParams.eqpIdList }}</td>
                  <th>ProcID</th>
                  <td>{{ insertParams.procId }}</td>
                  <th>StepSeq</th>
                  <td>{{ insertParams.stepSeqList }}</td>
                </tr>
                <tr>
                  <th>구분</th>
                  <td>{{ insertParams.ecoType }}</td>
                  <th>작성 Case</th>
                  <td>{{ insertParams.caseType }}</td>
                  <th>Lot Select Rule</th>
                  <td class="col-span-3">자동지정</td>
                </tr>
                <tr>
                  <th>Title</th>
                  <td class="col-span-3">
                      <v-text-field v-model="insertParams.reqTitle" placeholder="제목"/>
                  </td>
                  <th>Comment</th>
                  <td class="col-span-3">
                      <v-text-field v-model="insertParams.userComment" placeholder="사용자 입력(PEMS Comment)"/>
                  </td>
                </tr>
                <tr>
                  <th>Lot Count(0:기간ECO)</th>
                  <td>
                    <FormFieldContentRow>
                      <v-text-field v-model="insertParams.lotQty" placeholder="사용자 입력(Lot Count)" @change="filterNonNumeric"/>
                      <v-btn variant="secondary" @click="lotCountSync">일괄 반영</v-btn>
                    </FormFieldContentRow>
                  </td>
                  <th>Period</th>
                  <td>
                      <v-select v-model="insertParams.periodType" :items="periodItems" item-title="label" item-value="value" @update:modelValue="checkPeriod"></v-select>
                  </td>
                  <th>Inlock Flag</th>
                  <td>
                      <v-select v-model="insertParams.intlkType" :items="['L1','L2','L3','N']"></v-select>
                  </td>
                  <th>No SOP Flag</th>
                  <td>
                      <v-select v-model="insertParams.nonSopYn" :items="['Y','N']"></v-select>
                  </td>
                </tr>
                <tr>
                  <th class="col-span-8 py-5px!">
                    <FormFieldContentRow>
                      <div class="select-none bg-transparent rounded-xs flex items-center typo-sok-h7-12-700 gap-1 cursor-pointer hover:bg-icon-default-hover-bg" @click="toggleMultiDisplay">
                        <template v-if="multiRegionVisible">
                          <ChevronUpIcon />
                        </template>
                        <template v-else>
                          <ChevronDownIcon />
                        </template>
                        <div>Multi Proc/Step</div>
                      </div>
                      <v-divider vertical />
                      {{ multiSelectStr }}
                      <v-divider vertical />
                      <v-checkbox v-if="insertParams.logicType == 'ECO_CREATE'" v-model="einConnectEcoFlag" @change="getSelectedMultiList" label="Connect ECO" />
                    </FormFieldContentRow>
                  </th>
                </tr>
              </tbody>
            </table>
            <table id="multiRegion" v-show="multiRegionVisible" class="dsds-table dsds-table-medium -mt-px">
              <tbody>
                <tr v-if="insertParams.logicType == 'ECO_CREATE'">
                  <th class="w-[140px]!">Multi PRC조회</th>
                  <td>
                    <FormFieldContentRow>
                      <label>Process ID</label>
                      <v-select size="small" class="max-w-50" v-model="multiPrcSelectCond.procId" :items="processIdItemsMultiPrc" item-title="PROCESS_ID" item-value="PROCESS_ID" placeholder="Select Process ID" multiple />
                      <label>PRC Group</label>
                      <v-select size="small" class="max-w-50" v-model="multiPrcSelectCond.prcGroup" :items="prcGroupItemsMultiPrc" item-title="PROCESS_GROUP_NAME" item-value="PROCESS_GROUP_NAME" placeholder="Select PRC Group" multiple />
                      <v-divider vertical />
                      <v-btn size="small" variant="secondary" @click="getMultiPrcStepData">검색</v-btn>
                    </FormFieldContentRow>
                  </td>
                </tr>
                <tr class="fluid">
                  <th class="w-[140px]!">Multi Step</th>
                  <td class="min-h-30! h-30!">
                    <FakeRealGrid checkBar :columns="createColumnsFromNames(['id', 'name', 'email'])" :rowCount="13" class="w-full h-full" :displayOptions="{ syncGridHeight: SyncGridHeight.ALWAYS }"/>
                  </td>
                </tr>
                <tr>
                  <th class="min-h-25!">선택된<br/>Multi Proc/Step List</th>
                  <td class="min-h-25!">
                    <span>[Total Lot Count : {{procLotCntTotal}}] {{procLotCntSum}}</span>
                    <div id="selectedMultiProcessGrid" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </FormContent>
        <!-- EES 모델 비교: 일반 설비 -->
        <FormContent v-if="insertParams.logicType == 'ECO_CREATE'">
          <FormTitle>EES 모델 비교</FormTitle>
          <table class="dsds-table dsds-table-medium grid grid-cols-[140px_540px_140px_540px]" v-if="!isInlineEqpFlag">
            <tbody>
              <tr>
                <th>ECM설비모델 비교</th>
                <td>
                  <FormFieldContentRow>
                    <v-text-field v-show="!ecmCompareChkFlag" v-model="ecModelSelectStr" disabled/>
                    <v-text-field v-show="ecmCompareChkFlag" disabled>ECM 미지원</v-text-field>
                    <v-btn variant="secondary" @click="ecmModalFlag=true" :disabled="popupButtonFlag" aria-label="ECM설비모델 검색">검색</v-btn>
                  </FormFieldContentRow>
                </td>
                <th>RMS모델 비교</th>
                <td>
                  <FormFieldContentRow>
                    <v-text-field v-model="rmModelSelectStr" disabled/>
                    <v-btn variant="secondary" @click="rmsModalFlag=!rmsModalFlag" :disabled="popupButtonFlag">검색</v-btn>
                  </FormFieldContentRow>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- INLINE 설비일 경우 -->
          <table class="dsds-table dsds-table-medium grid grid-cols-[140px_1220px]" v-else>
            <tbody>
              <tr>
                <th class="row-span-2">Main EQP <br/> (Spinner)</th>
                <td>
                  <FormFieldContentRow>
                    <label>ECM설비모델 비교</label>
                    <v-text-field class="max-w-90" v-show="!ecmCompareChkFlag" v-model="ecModelSelectStr" disabled/>
                    <v-text-field class="max-w-90" v-show="ecmCompareChkFlag" disabled>ECM 미지원</v-text-field>
                    <v-btn variant="secondary" @click="ecmModalFlag=!ecmModalFlag" v-bind:disabled="popupButtonFlag">검색</v-btn>
                  </FormFieldContentRow>
                </td>
                <td>
                  <FormFieldContentRow>
                    <label style="min-width: 95px">RMS모델 비교</label>
                    <v-text-field class="max-w-90" v-model="rmModelSelectStr" disabled/>
                    <v-btn variant="secondary" @click="rmsModalFlag=!rmsModalFlag" v-bind:disabled="popupButtonFlag">검색</v-btn>
                  </FormFieldContentRow>
                </td>
              </tr>
              <tr>
                <th class="row-span-2">In-line EQP <br/> (Scanner)</th>
                <td>
                  <FormFieldContentRow>
                    <label>ECM설비모델 비교</label>
                    <v-text-field class="max-w-90" v-model="ecModelSelectStrInline" disabled/>
                    <v-btn variant="secondary" @click="ecmModalFlagInline=!ecmModalFlagInline" v-bind:disabled="popupButtonFlag">검색</v-btn>
                  </FormFieldContentRow>
                </td>
                <td>
                  <FormFieldContentRow>
                    <label style="min-width: 95px">RMS모델 비교</label>
                    <v-text-field class="max-w-90" v-model="rmModelSelectStrInline" disabled/>
                    <v-btn variant="secondary" @click="rmsModalFlagInline=!rmsModalFlagInline" v-bind:disabled="popupButtonFlag">검색</v-btn>
                  </FormFieldContentRow>
                </td>
              </tr>
            </tbody>
          </table>
        </FormContent>
        <!-- ESPEC 폼 -->
        <FormContent>
          <FormTitle>ESPEC</FormTitle>
          <table class="dsds-table dsds-table-medium grid grid-rows-[auto,1fr,auto,auto,auto,1fr] grid-cols-[140px_200px_140px_200px_140px_540px]">
            <tbody>
              <tr>
                <th>표준종류</th>
                <td>{{ insertParams.stdType }}</td>
                <th>모표준제목</th>
                <td>{{ insertParams.stdTitle }}</td>
                <th>모표준번호</th>
                <td>{{ insertParams.stdNo }}</td>
              </tr>
              <tr>
                <th>PCCB/HCCB 선택</th>
                <td class="col-span-5">
                    <v-select class="max-w-40" v-model="insertParams.mtgProgrsType" :items="['PCCB','HCCB']" placeholder="선택하세요" />
                </td>
              </tr>
              <tr>
                <th>Check Sheet</th>
                <td class="col-span-5">
                    <FormFieldContentRow>
                      <v-btn variant="secondary" @click="linkIspecChecklist" v-bind:disabled="popupButtonFlag">작성</v-btn>
                      <v-divider vertical />
                      <span class="typo-caption text-neutral-3rd">※작성 완료 (2025-00-00 00:00:00)</span>
                    </FormFieldContentRow>
                </td>
              </tr>
              <tr class="fluid">
                <th>
                    근거자료
                </th>
                <td class="col-span-5" :class="attachFileUploadNameList.length ? 'pb-2!' : 'py-5px!'">
                  <FormFieldContentRows>
                    <FormFieldContentRow>
                        <v-btn size="small" variant="secondary" @click="attachFileInput?.$el.querySelector('input').click()">파일 첨부</v-btn>
                        <v-file-input accept="*" multiple v-model="attachFileArr" @change="chkFileUploadSubmit('eco/add')" ref="attachFileInput" style="display: none;"/>
                        <v-btn size="small" variant="secondary" @click="deleteAttachFiles('eco/add')">삭제</v-btn>
                        <v-divider vertical />
                        <v-checkbox v-model="attachFileChkFlag" label="첨부 불필요" />
                    </FormFieldContentRow>
                    <table class="dsds-table max-w-270" v-if="attachFileUploadNameList.length">
                      <thead>
                      <tr>
                        <th class="border-x-0!">
                          <FormFieldContentRow>
                            <v-checkbox :modelValue="attachFileUploadCheckInfo.every(item => item)"
                              :indeterminate="attachFileUploadCheckInfo.some(item => item) && !attachFileUploadCheckInfo.every(item => item)"
                              @click="handleClickAttachFileUploadCheckAllToggle"/>
                              파일명
                            </FormFieldContentRow>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in attachFileUploadNameList">
                          <td class="border-x-0!">
                            <FormFieldContentRow>
                              <v-checkbox  v-model="attachFileUploadCheckInfo[index]"/> {{ item }} ({{ attachFileUploadSizeList[index] }}KB)
                            </FormFieldContentRow>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </FormFieldContentRows>
                </td>
              </tr>
              <tr class="fluid">
                <th>HCCB 회의록</th>
                <td class="col-span-5" :class="mtgFileUploadCheckInfo.length ? 'pb-2!' : 'py-5px!'">
                  <FormFieldContentRows class="max-w-270">
                    <FormFieldContentRow>
                      <v-btn size="small" variant="secondary" @click="mtgFileInput?.$el.querySelector('input').click()">파일 첨부</v-btn>
                      <v-file-input accept="*" multiple v-model="mtgFileArr" @change="chkFileUploadSubmit('eco/hccb_attach')" ref="mtgFileInput" style="display: none;" />
                      <v-btn size="small" variant="secondary" @click="deleteAttachFiles('eco/hccb_attach')">삭제</v-btn>
                    </FormFieldContentRow>
                    <table class="dsds-table" v-if="mtgFileUploadCheckInfo.length">
                      <thead>
                      <tr>
                        <th class="border-x-0!">
                          <FormFieldContentRow>
                            <v-checkbox :modelValue="mtgFileUploadCheckInfo.every(item => item)"
                              :indeterminate="mtgFileUploadCheckInfo.some(item => item) && !mtgFileUploadCheckInfo.every(item => item)"
                              @click="handleClickMtgFileUploadCheckAllToggle"/>
                              파일명
                            </FormFieldContentRow>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in mtgFileUploadNameList">
                          <td class="border-x-0!">
                            <FormFieldContentRow>
                              <v-checkbox v-model="mtgFileUploadCheckInfo[index]"/> {{ item }} ({{ mtgFileUploadSizeList[index] }}KB)
                            </FormFieldContentRow>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </FormFieldContentRows>
                </td>
              </tr>
              <tr class="fluid">
                <th>결재 경로</th>
                <td class="col-span-5" :class="selectedApprPath.length ? 'pb-2!' : 'py-5px!'">
                  <FormFieldContentRows class="max-w-150">
                    <FormFieldContentRow>
                      <v-btn size="small" class="w-21" variant="secondary" @click="openDeptApprModal">결재 경로 추가</v-btn>
                      <span class="ml-auto typo-caption text-neutral-3rd">전체 {{ selectedApprPath.length }}명</span>
                    </FormFieldContentRow>
                    <table class="dsds-table grid grid-cols-[40px_60px_80px_120px_300px] border-x-0!" v-if="selectedApprPath.length">
                      <thead>
                        <tr>
                          <th>순번</th>
                          <th>구분</th>
                          <th>성명</th>
                          <th>Knox ID</th>
                          <th class="border-r-0!">부서명</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in selectedApprPath.slice(0, apprPathViewSize)">
                          <td>{{item.taskOrder}}</td>
                          <td class="truncate">{{parseTaskKind(item.taskKind)}}</td>
                          <td class="truncate">{{item.taskEmpName}}</td>
                          <td class="truncate">{{item.userId}}</td>
                          <td class="truncate border-r-0!">{{item.task_DeptName}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <v-btn variant="secondary" @click="apprPathExpand()" v-if="apprPathViewSize < selectedApprPath.length">더보기 + ({{ apprPathViewSize }}/{{selectedApprPath.length}})</v-btn>
                  </FormFieldContentRows>
                </td>
              </tr>
            </tbody>
          </table>
        </FormContent>
      </FormContents>
      <div class="dsds-page-footer flex flex-col items-center py-5">
        <v-btn size="large" @click="setEhwData" v-bind:disabled="confirmButtonFlag">저장</v-btn>
      </div>
    </PageBody>
  </Page>
</template>

<script setup lang="ts">

import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons"
import { FormContent, FormContents, FormFieldContentRow, FormFieldContentRows, FormTitle, Page, PageBody, PageHeader, VBtn, VCheckbox, VFileInput, VSelect, VTextField } from "@/components/ui"
import { FakeRealGrid, createColumnsFromNames } from "@/faker"
import { SyncGridHeight } from "realgrid"
import { ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import type { EhwCreateEcoPageComputed, EhwCreateEcoPageHandlers, EhwCreateEcoPageState } from "./EHWCreateEcoPage.types"

const props = defineProps<{
  state: EhwCreateEcoPageState
  computed: EhwCreateEcoPageComputed
  handlers: EhwCreateEcoPageHandlers
}>()

const { t } = useI18n()

const state = props.state
const derived = props.computed
const handlers = props.handlers

const apprPathViewSize = ref(12);
const attachFileInput = ref<InstanceType<typeof VFileInput> | null>(null);
const mtgFileInput = ref<InstanceType<typeof VFileInput> | null>(null);

const handleClickAttachFileUploadCheckAllToggle = () => {
  const allChecked = attachFileUploadCheckInfo.value.every(item => item);
  if (allChecked) {
    for (let i = 0; i < attachFileUploadCheckInfo.value.length; i++) {
      attachFileUploadCheckInfo.value[i] = false;
    }
    return;
  }
  attachFileUploadCheckInfo.value = attachFileUploadCheckInfo.value.map(() => true)
}

const handleClickMtgFileUploadCheckAllToggle = () => {
  const allChecked = mtgFileUploadCheckInfo.value.every(item => item);
  if (allChecked) {
    for (let i = 0; i < mtgFileUploadCheckInfo.value.length; i++) {
      mtgFileUploadCheckInfo.value[i] = false;
    }
    return;
  }
  mtgFileUploadCheckInfo.value = mtgFileUploadCheckInfo.value.map(() => true)
};

const {
  multiRegionVisible,
  insertParams,
  periodItems,
  multiPrcSelectCond,
  processIdItemsMultiPrc,
  prcGroupItemsMultiPrc,
  multiProcessCandidates,
  selectedMultiProcess,
  einConnectEcoFlag,
  isInlineEqpFlag,
  confirmButtonFlag,
  attachFileArr,
  attachFileUploadNameList,
  attachFileUploadSizeList,
  attachFileUploadCheckInfo,
  attachFileChkFlag,
  mtgFileArr,
  mtgFileUploadNameList,
  mtgFileUploadSizeList,
  mtgFileUploadCheckInfo,
  personalApprList,
  deptApprList,
  selectedApprPath,
  personalApprSearch,
  deptApprSearch,
  activeApprTab,
  apprModalFlag,
  tempApprParams,
  stdEqpIdList,
  stdEqpIdListInline,
  stdEqpInfo,
  stdEqpInfoInline,
  rmsApiCallParamsStd,
  rmsApiCallParamsManual,
  rmsApiCallParamsStdInline,
  rmsApiCallParamsManualInline,
  selectEqpInfoInline,
  rmModelSelectStr,
  rmModelSelectStrInline,
  ecModelSelectStr,
  ecModelSelectStrInline,
  manualRmsCheckList,
  manualRmsCheckListStdOnly,
  manualRmsCheckListStdOnlyChkInfo,
  manualRecipeAllChk,
  manualRmsCheckListInline,
  manualRmsCheckListStdOnlyInline,
  manualRmsCheckListStdOnlyChkInfoInline,
  manualRecipeAllChkInline,
  defaultRmsCheckList,
  defaultRmsCheckListInline,
  rmsRecipeCompareStr,
  rmsRecipeCompareStrInline,
  rmsApiFlag,
  rmsApiFlagInline,
  rmsModalFlag,
  rmsModalFlagInline,
  ecmCompareChkFlag,
  popupButtonFlag,
  ecmModalFlag,
  ecmModalFlagInline,
  ecmApiFlag,
  ecmApiFlagInline,
  ecmRecipeCompareStr,
  ecmRecipeCompareStrInline,
  ecmApiResult,
  ecmApiResultInline,
  rmsFailCaseModelFlag,
  ecmFailCaseModelFlag,
} = state

const { multiSelectStr, procLotCntTotal, procLotCntSum } = derived

const {
  toggleMultiDisplay,
  filterNonNumeric,
  lotCountSync,
  checkPeriod,
  getMultiPrcStepData,
  getSelectedMultiList,
  chkFileUploadSubmit,
  deleteAttachFiles,
  linkIspecChecklist,
  setEhwData,
  openDeptApprModal,
  openApprTab,
  ispecApprClickEvent,
  manualRmsCheckFlagChangeInline,
  addRmsCheckList,
  addRmsCheckListInline,
  deleteRmsCheckList,
  deleteRmsCheckListInline,
  initRmsApiCallList,
  initRmsApiCallListInline,
  getStandardRmsApiCallList,
  getStandardRmsApiCallListInline,
  getManualRmsApiCallList,
  getManualRmsApiCallListInline,
  callRmsApiList,
  callRmsApiListInline,
  callCopyRmsRecipe,
  callCopyRmsRecipeInline,
  rmsEqpIdParamMapping,
  rmsEqpIdParamMappingInline,
  eesLinkOpen,
  rmsCheckResult,
  rmsCheckResultInline,
  callEcmApi,
  callEcmApiInline,
  ecmCheckResult,
  ecmCheckResultInline,
} = handlers

const TASK_KIND_LABELS: Record<string, string> = {
  DRAFT: "기안",
  APPROVE: "결재",
  AGREE: "합의",
  NOTICE: "통보",
}

function apprPathExpand() {
  if (selectedApprPath.value.length === 0) {
    return
  }

  if (apprPathViewSize.value <= 0) {
    apprPathViewSize.value = Math.min(12, selectedApprPath.value.length)
    return
  }

  if (apprPathViewSize.value < selectedApprPath.value.length) {
    apprPathViewSize.value = selectedApprPath.value.length
  }
}

watch(selectedApprPath, () => {
  apprPathViewSize.value = Math.min(12, selectedApprPath.value.length || 12)
})

function parseTaskKind(kind: string) {
  return TASK_KIND_LABELS[kind] ?? kind
}
</script>
