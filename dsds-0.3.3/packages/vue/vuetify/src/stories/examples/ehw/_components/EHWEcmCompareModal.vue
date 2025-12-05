<template>
  <EHWEcmFailCaseModal v-model="ecmFailCaseModelFlag" />
  <Modal size="xl" v-model="modelValue">
    <v-card>
      <v-card-title>
        <ModalHeader @close="modelValue = false">
          ECM 설비모델 일치율 비교 (설비 : {{ eqpIdList }} )
        </ModalHeader>
      </v-card-title>
      <div class="dsds-dialog-form-filter">
        <div class="dsds-dialog-form-filter-row">
          <FormField label="표준 설비 선택" class="w-30" required>
            <v-select v-model="stdEqpInfo.eqpId" :items="stdEqpIdList" placeholder="표준설비 선택"/>
          </FormField>
          <FormField>
            <FormTools>
              <v-divider vertical />
              <v-btn @click="callEcmApi" :disabled="ecmApiFlag">{{ecmRecipeCompareStr}}</v-btn>
            </FormTools>
          </FormField>
        </div>
      </div>
      <v-divider />
      <v-card-text class="overflow-hidden">
        <FormFieldContentRow class="mb-2">
            <span class="typo-sok-h5-16-700">비교 결과</span>
            <v-btn class="ml-auto" variant="secondary" @click="eesLinkOpen('ECM')">EES Line Compare</v-btn>
            <v-divider vertical />
            <v-btn variant="secondary" @click="ecmFailCaseModelFlag=!ecmFailCaseModelFlag">판정기준</v-btn>
        </FormFieldContentRow>
        <ScrollableTable class="dsds-table grid grid-cols-[60px_100px_100px_100px_100px_80px_80px_80px_auto] w-full!" :loading="ecmApiFlag">
          <template #empty>
            <span class="typo-body text-neutral-2nd">비교 버튼을 눌러 결과를 확인하세요</span>
          </template>
          <thead>
              <tr>
                  <th>Index</th>
                  <th>진행설비</th>
                  <th>표준설비</th>
                  <th>EC Model</th>
                  <th class="truncate">Model 일치여부</th>
                  <th>A등급</th>
                  <th>B등급</th>
                  <th>C등급</th>
                  <th class="truncate">Fail사유</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,index) in ecmApiResult" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.eqpSelect }}</td>
                  <td>{{ item.eqpStd }}</td>
                  <td class="truncate">{{ item.ecModel }}</td>
                  <td class="text-center py-px!">
                      <span :class="getModelChkClass(item.model_chk)">{{ item.model_chk }}</span>
                  </td>
                  <td>{{ item.a_rate }}</td>
                  <td>{{ item.b_rate }}</td>
                  <td>{{ item.c_rate }}</td>
                  <td class="truncate">{{ item.fail_message }}</td>
              </tr>
          </tbody>
        </ScrollableTable>
      </v-card-text>
      <v-card-actions class="d-flex justify-end mt-5">
          <v-btn variant="secondary" @click="handleComplete">완료</v-btn>
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
  return '';
}
</script>

<script setup lang="ts">
import { FormField, FormFieldContentRow, FormTools, Modal, ModalHeader, ScrollableTable, VBtn, VCard, VCardActions, VCardText, VCardTitle, VSelect } from "@/components/ui"
import { ref } from 'vue'
import type { EcmCompareRow, EhwSelectOption } from "./EHWCreateEcoPage.types"
import EHWEcmFailCaseModal from "./EHWEcmFailCaseModal.vue"

// Props
const props = withDefaults(defineProps<{
  eqpIdList: string;
  stdEqpIdList: Array<string | EhwSelectOption>;
  ecmApiFlag: boolean;
  ecmRecipeCompareStr: string;
  ecmApiResult: EcmCompareRow[];
  callEcmApi: () => void;
  eesLinkOpen: (type: "RMS" | "ECM") => void;
  ecmCheckResult: () => void;
}>(), {
  ecmApiFlag: false,
  ecmRecipeCompareStr: '비교',
  ecmApiResult: () => [],
});

// Models
const modelValue = defineModel<boolean>({ default: false });
const stdEqpInfo = defineModel<{ eqpId: string }>('stdEqpInfo', { default: () => ({ eqpId: '' }) });

// Local state
const ecmFailCaseModelFlag = ref(false);

function handleComplete() {
  props.ecmCheckResult();
}
</script>

<style scoped>
@import "tailwindcss";
@import "@/styles/dsds/tokens/variables/index.css";

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