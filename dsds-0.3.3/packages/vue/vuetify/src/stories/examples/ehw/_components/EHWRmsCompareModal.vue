<template>
  <EHWRmsFailCaseModal v-model="rmsFailCaseModelFlag" />
  <Modal size="2xl" v-model="modelValue" :contentProps="{style: 'height: 751px'}">
    <v-card>
      <v-card-title>
  <ModalHeader @close="modelValue = false">RMS 일치율 비교 (설비 : {{ eqpIdList }} )</ModalHeader>
      </v-card-title>
      <div class="dsds-dialog-form-filter">
        <div class="dsds-dialog-form-filter-row">
          <FormField label="표준 설비 선택" class="w-30" required>
            <v-select v-model="rmsApiCallParamsStd.stdEqpId" :items="stdEqpIdList" placeholder="표준설비 선택" @update:modelValue="rmsEqpIdParamMapping"/>
          </FormField>
          <FormField>
            <FormTools>
              <v-divider vertical />
              <v-btn @click="getStandardRmsApiCallList" :disabled="rmsApiFlag">표준 Recipe 추가</v-btn>
            </FormTools>
          </FormField>
        </div>
        <v-divider />
        <FormFieldContentRow>
          Recipe Manual 추가
          <Searchbox class="max-w-40" v-on:keyup.enter="getManualRmsApiCallList" @click:append-inner="getManualRmsApiCallList" v-model="rmsApiCallParamsManual.recipeId" placeholder="Recipe ID 입력" />
          <v-btn variant="secondary" class="ml-auto" :disabled="!manualRmsCheckList?.length" @click="callCopyRmsRecipe('MULTI',0)">복사</v-btn>
        </FormFieldContentRow>
        <ScrollableTable wrapperClass="h-[162px]!" class="dsds-table grid grid-cols-[28px_30px_100px_100px_80px_200px_48px_48px_60px_auto] w-full!">
          <template #empty>
              Manual로 추가할 Recipe ID를 검색하세요
          </template>
          <thead>
            <tr>
              <th>
                  <v-checkbox v-model="manualRecipeAllChk" @change="manualRmsCheckFlagChange"/>
              </th>
              <th>No</th>
              <th>진행설비</th>
              <th>표준설비</th>
              <th>CH_ID</th>
              <th>RCP_ID</th>
              <th>추가</th>
              <th>복사</th>
              <th>RCP유무</th>
              <th>USED_TIME</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in manualRmsCheckList" :key="index">
              <td><v-checkbox :model-value="false" disabled /></td>
              <td>{{ index+1 }}</td>
              <td>{{ item.eqpSelect }}</td>
              <td>{{ item.eqpStd }}</td>
              <td>{{ item.chamberId }}</td>
              <td class="truncate">{{ item.rcpId }}</td>
              <td class="text-center py-px!">
                  <v-btn size="small" variant="secondary" @click="addRmsCheckList(index)" :disabled="isRmsCheckAdded(item)">추가</v-btn>
              </td>
              <td></td>
              <td>있음</td>
              <td></td>
            </tr>
            <tr v-for="(item,index) in manualRmsCheckListStdOnly" :key="index">
              <td>
                <v-checkbox :disabled="item.usedTime>180" v-model="manualRmsCheckListStdOnlyChkInfo[index]"></v-checkbox>
              </td>
              <td>{{ manualRmsCheckList.length+index+1 }}</td>
              <td>{{ item.eqpSelect }}</td>
              <td>{{ item.eqpStd }}</td>
              <td>{{ item.chamberId }}</td>
              <td class="truncate">{{ item.rcpId }}</td>
              <td></td>
              <td class="text-center py-px!">
                <v-btn size="small" variant="secondary"@click="callCopyRmsRecipe('SINGLE',index)" v-if="item.usedTime <= 180" >복사</v-btn>
              </td>
              <td><span class="text-red">없음</span></td>
              <td v-if="item.usedTime>180"><span class="text-red">{{ item.usedTime }} Days</span></td>
              <td v-else>{{ item.usedTime }} Days</td>
            </tr>
          </tbody>
        </ScrollableTable>
      </div>
      <v-divider />
      <v-card-text class="overflow-hidden">
        <FormFieldContentRow class="mb-2">
          <span class="typo-sok-h5-16-700">RMS Recipe 비교</span>
          <div class="flex items-center ml-auto gap-2 typo-footnote">
            <div class="flex items-center gap-1">
              <div class="bg-white size-[13px] border border-outer" />
              <span class="text-neutral-2nd">표준 Recipe</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="bg-manual-recipe size-[13px] border border-outer"/>
              <span class="text-neutral-2nd">Manual</span>
            </div>
          </div>
          <v-divider vertical />
          <v-btn variant="secondary" @click="eesLinkOpen('RMS')">EES Line Compare</v-btn>
          <v-divider vertical />
          <v-btn variant="secondary" @click="rmsFailCaseModelFlag=true">판정기준</v-btn>
          <v-btn variant="secondary" :disabled="defaultRmsCheckList.length<=0" @click="deleteRmsCheckList">삭제</v-btn>
          <v-btn variant="secondary" :disabled="defaultRmsCheckList.length<=0" @click="initRmsApiCallList">전체 삭제</v-btn>
          <v-divider vertical />
          <v-btn class="min-w-20!" @click="callRmsApiList" :disabled="rmsApiFlag">{{rmsRecipeCompareStr}}</v-btn>
        </FormFieldContentRow>
        <ScrollableTable class="dsds-table grid grid-cols-[28px_30px_100px_100px_80px_200px_100px_60px_60px_60px_auto] w-full!" :loading="rmsApiFlag">
          <template #empty>
            <span class="typo-body text-neutral-2nd">Recipe 비교를 위해 표준/Manual Recipe를 추가하세요</span>
          </template>
          <thead>
            <tr>
              <th>
                <v-checkbox v-model="compareRecipeAllChk" @change="compareRmsCheckFlagChange" :indeterminate="compareRecipeCheckedCount > 0 && !compareRecipeAllChecked"/>
              </th>
              <th>No</th>
              <th>진행설비</th>
              <th>표준설비</th>
              <th>CH_ID</th>
              <th>RCP_ID</th>
              <th>Model 일치여부</th>
              <th>A등급</th>
              <th>B등급</th>
              <th>C등급</th>
              <th>Fail 사유</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in defaultRmsCheckList" :key="index">
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">
                <v-checkbox v-model="item.chkInfo"></v-checkbox>
              </td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">{{ index+1 }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">{{ item.eqpSelect }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">{{ item.eqpStd }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">{{ item.chamberId }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'" class="truncate">{{ item.rcpId }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'" class="typo-caption text-center! py-0.5!">
                <span :class="getModelChkClass(item.model_chk)">{{ item.model_chk }}</span>
              </td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">{{ item.a_rate }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">{{ item.b_rate }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'">{{ item.c_rate }}</td>
              <td :class="!item.isStdEqp && 'bg-manual-recipe'" class="truncate">{{ item.fail_message }}</td>
            </tr>
          </tbody>
        </ScrollableTable>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mt-5">
        <v-btn variant="secondary" @click="modelValue = false">완료</v-btn>
      </v-card-actions>
    </v-card>
  </Modal>
</template>

<script lang="ts">
function getModelChkClass(value: string) {
  if (value === '일치') {
    return 'model-chk model-chk-true';
  } else if (value === '불일치') {
    return 'model-chk model-chk-false';
  }
}
</script>

<script setup lang="ts">
import { FormField, FormFieldContentRow, FormTools, Modal, ModalHeader, ScrollableTable, Searchbox, VBtn, VCardActions, VCardText, VCardTitle, VCheckbox, VSelect } from "@/components/ui"
import { computed, reactive, ref, watch } from 'vue'
import type { EhwSelectOption, ManualRmsRow } from "./EHWCreateEcoPage.types"
import EHWRmsFailCaseModal from "./EHWRmsFailCaseModal.vue"

type RmsStdParams = { stdEqpId: string }
type RmsManualParams = { recipeId: string }

// Props (부모로부터 받은 읽기 전용 값)
const props = withDefaults(defineProps<{
  eqpIdList: string;
  stdEqpIdList: Array<string | EhwSelectOption>;
  rmsEqpIdParamMapping: () => void;
  getStandardRmsApiCallList: () => void;
  callCopyRmsRecipe: (mode: "MULTI" | "SINGLE", idx: number) => void;
  getManualRmsApiCallList: () => void;
  eesLinkOpen: (type: "RMS" | "ECM") => void;
  deleteRmsCheckList: () => void;
  initRmsApiCallList: () => void;
  callRmsApiList: () => void;
  addRmsCheckList: (index: number) => void;
  defaultRmsCheckList: Array<any>;
  rmsApiFlag: boolean;
  rmsRecipeCompareStr: string;
}>(), {
  eqpIdList: "",
  defaultRmsCheckList: () => [],
  rmsApiFlag: false,
  rmsRecipeCompareStr: 'RMS Recipe 비교',
});

// Model (다이얼로그 표시 여부를 위한 양방향 바인딩)
const modelValue = defineModel<boolean>({ default: false });

// 컴포넌트 내부에서 사용되는 상태
const rmsApiCallParamsStdModel = defineModel<RmsStdParams>('stdParams', {
  default: () => ({ stdEqpId: '' }),
})
const rmsApiCallParamsManualModel = defineModel<RmsManualParams>('manualParams', {
  default: () => ({ recipeId: '' }),
})

const rmsApiCallParamsStd = reactive<RmsStdParams>({ ...rmsApiCallParamsStdModel.value })
const rmsApiCallParamsManual = reactive<RmsManualParams>({ ...rmsApiCallParamsManualModel.value })

let syncingStdFromModel = false
let syncingStdFromLocal = false
watch(
  () => rmsApiCallParamsStdModel.value,
  (payload) => {
    if (syncingStdFromLocal) return
    syncingStdFromModel = true
    Object.assign(rmsApiCallParamsStd, payload ?? { stdEqpId: '' })
    syncingStdFromModel = false
  },
  { deep: true, immediate: true }
)

watch(
  rmsApiCallParamsStd,
  (payload) => {
    if (syncingStdFromModel) return
    syncingStdFromLocal = true
    rmsApiCallParamsStdModel.value = { ...payload }
    syncingStdFromLocal = false
  },
  { deep: true }
)

let syncingManualFromModel = false
let syncingManualFromLocal = false
watch(
  () => rmsApiCallParamsManualModel.value,
  (payload) => {
    if (syncingManualFromLocal) return
    syncingManualFromModel = true
    Object.assign(rmsApiCallParamsManual, payload ?? { recipeId: '' })
    syncingManualFromModel = false
  },
  { deep: true, immediate: true }
)

watch(
  rmsApiCallParamsManual,
  (payload) => {
    if (syncingManualFromModel) return
    syncingManualFromLocal = true
    rmsApiCallParamsManualModel.value = { ...payload }
    syncingManualFromLocal = false
  },
  { deep: true }
)

const manualRmsCheckList = defineModel<ManualRmsRow[]>('manualRmsCheckList', { default: () => [] });
const manualRmsCheckListStdOnly = defineModel<ManualRmsRow[]>('manualRmsCheckListStdOnly', { default: () => [] });
const manualRmsCheckListStdOnlyChkInfo = defineModel<boolean[]>('manualRmsCheckListStdOnlyChkInfo', { default: () => [] });
const compareRecipeAllChk = defineModel<boolean>('compareRecipeAllChk', { default: false }  );

const manualRecipeAllChk = ref(false);

const rmsApiFlag = computed(() => props.rmsApiFlag);
const rmsRecipeCompareStr = computed(() => props.rmsRecipeCompareStr);
const defaultRmsCheckList = ref(props.defaultRmsCheckList);
const compareRecipeCheckedCount = computed(() => defaultRmsCheckList.value.filter(it => it.chkInfo).length)
const compareRecipeAllChecked = computed(() => compareRecipeCheckedCount.value === defaultRmsCheckList.value.length)

const addedRmsCheckKeys = computed(() => {
  const keys = new Set<string>();
  defaultRmsCheckList.value.forEach(item => {
    keys.add(`${item.eqpSelect}|${item.eqpStd}|${item.chamberId}|${item.rcpId}`);
  });
  return keys;
});

function isRmsCheckAdded(item: ManualRmsRow) {
  const key = `${item.eqpSelect}|${item.eqpStd}|${item.chamberId}|${item.rcpId}`;
  return addedRmsCheckKeys.value.has(key);
}

const rmsFailCaseModelFlag = ref(false);

watch(() => props.defaultRmsCheckList, nextValue => {
  defaultRmsCheckList.value = nextValue;
})

watch(defaultRmsCheckList, nextValue => {
  compareRecipeAllChk.value = nextValue.some(it => it.chkInfo)
}, { deep: true })

function compareRmsCheckFlagChange(checked: boolean){
  defaultRmsCheckList.value.forEach(it => {
    // Deep Reference 업데이트 위해 .value 덮어쓰는 대신 forEach 로 각각 Assign
    it.chkInfo = checked ? true: false
  })
}

function manualRmsCheckFlagChange(checked: boolean){
  manualRmsCheckListStdOnlyChkInfo.value = manualRmsCheckListStdOnly.value.map(it => it.usedTime <= 180 && checked ? true : false)
}


// 함수 참조를 위해 props 사용
const {
  rmsEqpIdParamMapping,
  getStandardRmsApiCallList,
  callCopyRmsRecipe,
  getManualRmsApiCallList,
  eesLinkOpen,
  deleteRmsCheckList,
  initRmsApiCallList,
  callRmsApiList,
  addRmsCheckList
} = props;

// 부모 컴포넌트에 쓰기 가능한 참조 및 함수 노출
defineExpose({
  rmsApiCallParamsStd,
  rmsApiCallParamsManual,
  manualRecipeAllChk,
  compareRecipeAllChk,
  rmsFailCaseModelFlag,
});
</script>

<style scoped>
@import "tailwindcss";
@import "@/styles/dsds/tokens/variables/index.css";

.bg-manual-recipe {
  background-color: var(--colors-copper-yellow-cu-yellow-03);
}

.model-chk {
  @apply block py-px border-1 rounded-xs;
  height: 18px;
}

.model-chk-true {
  color: var(--colors-nitrogen-green-n-green-14);
  background-color: var(--colors-nitrogen-green-n-green-04);
  border-color: var(--colors-nitrogen-green-n-green-05);
}

.model-chk-false {
  color: var(--colors-oxygen-red-o-red-11);
  background-color: var(--colors-oxygen-red-o-red-04);
  border-color: var(--colors-oxygen-red-o-red-06);
}
</style>