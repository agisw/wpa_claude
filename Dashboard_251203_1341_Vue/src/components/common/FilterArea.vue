<template>
  <div class="filter-area">
    <div class="page-header">
      <h1>동종확산 Dashboard</h1>
    </div>
    <div class="divider-line"></div>

    <div class="filters-section">
      <div class="filters">
        <div class="filter-field">
          <label>Line<span class="required">*</span></label>
          <v-select
            v-model="selectedLine"
            :items="lineItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>

        <div class="filter-field">
          <label>Sub area</label>
          <v-select
            v-model="selectedSubArea"
            :items="subAreaItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>

        <div class="filter-field">
          <label>Design rule<span class="required">*</span></label>
          <v-select
            v-model="selectedDesignRule"
            :items="designRuleItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>

        <div class="filter-field">
          <label>Process ID<span class="required">*</span></label>
          <v-select
            v-model="selectedProcessId"
            :items="processIdItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>

        <div class="filter-field wide">
          <label>PRC group<span class="required">*</span></label>
          <v-select
            v-model="selectedPrcGroup"
            :items="prcGroupItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select-wide"
          ></v-select>
        </div>

        <div class="filter-field extra-wide">
          <label>Step seq</label>
          <v-select
            v-model="selectedStepSeq"
            :items="stepSeqItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select-extra-wide"
          ></v-select>
        </div>
      </div>

      <div class="button-group">
        <div class="divider-vertical"></div>
        <v-btn color="primary" size="small" class="btn-search">검색</v-btn>
        <v-btn variant="outlined" size="small" class="btn-secondary">조건 저장</v-btn>
        <v-btn variant="outlined" size="small" class="btn-secondary">조건 불러오기</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedLine = ref('A1_ABCD')
const lineItems = ['A1_ABCD', 'B2_EFGH', 'C3_IJKL']

const selectedSubArea = ref('CVD')
const subAreaItems = ['CVD', 'PVD', 'ETCH']

const selectedDesignRule = ref('ABC12')
const designRuleItems = ['ABC12', 'DEF34', 'GHI56']

const selectedProcessId = ref('EFGH')
const processIdItems = ['EFGH', 'IJKL', 'MNOP']

const selectedPrcGroup = ref('AB12345CD:EFGHJKLMNOPR25')
const prcGroupItems = ['AB12345CD:EFGHJKLMNOPR25', 'XY67890AB:CDEFGHIJKLMNO12']

const selectedStepSeq = ref('AB12345CD:EFGHIJKLMNOPQRSTUV123435')
const stepSeqItems = ['AB12345CD:EFGHIJKLMNOPQRSTUV123435', 'CD67890EF:GHIJKLMNOPQRSTUV234567']
</script>

<style scoped>
.filter-area {
  padding: 48px 12px 0 12px;
}

.page-header h1 {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #384047;
  margin: 0;
}

.divider-line {
  height: 1px;
  background-color: #dadfe4;
  margin: 8px 0;
}

.filters-section {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-top: 9px;
}

.filters {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.filter-field label {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #565e66;
}

.required {
  color: #ff4337;
}

.filter-select {
  width: 120px;
}

.filter-field.wide .filter-select-wide {
  width: 250px;
}

.filter-field.extra-wide .filter-select-extra-wide {
  width: 332px;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.divider-vertical {
  width: 1px;
  height: 10px;
  background-color: #ccd1d6;
  margin-right: 7px;
}

.btn-search {
  text-transform: none;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.8px;
}

.btn-secondary {
  text-transform: none;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  letter-spacing: 0.8px;
}

:deep(.v-select .v-field) {
  border-radius: 2px;
  font-size: 14px;
  line-height: 20px;
}

:deep(.v-select .v-field__input) {
  padding: 2px 6px;
  min-height: 24px;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  letter-spacing: 0.8px;
}

:deep(.v-btn) {
  height: 24px;
  border-radius: 2px;
}
</style>
