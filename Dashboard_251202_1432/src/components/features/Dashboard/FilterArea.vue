<template>
  <div class="filter-area">
    <div class="page-header">
      <h1 class="page-title">동종확산 Dashboard</h1>
    </div>
    <v-divider class="divider" />

    <div class="filters-container">
      <div class="filters">
        <div class="filter-field">
          <label class="filter-label">Line<span class="required">*</span></label>
          <v-select
            v-model="filters.line"
            :items="lineItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          />
        </div>

        <div class="filter-field">
          <label class="filter-label">Sub area</label>
          <v-select
            v-model="filters.subArea"
            :items="subAreaItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          />
        </div>

        <div class="filter-field">
          <label class="filter-label">Design rule<span class="required">*</span></label>
          <v-select
            v-model="filters.designRule"
            :items="designRuleItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          />
        </div>

        <div class="filter-field">
          <label class="filter-label">Process ID<span class="required">*</span></label>
          <v-select
            v-model="filters.processId"
            :items="processIdItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          />
        </div>

        <div class="filter-field filter-field-wide">
          <label class="filter-label">PRC group<span class="required">*</span></label>
          <v-select
            v-model="filters.prcGroup"
            :items="prcGroupItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          />
        </div>

        <div class="filter-field filter-field-wider">
          <label class="filter-label">Step seq</label>
          <v-select
            v-model="filters.stepSeq"
            :items="stepSeqItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          />
        </div>
      </div>

      <div class="filter-buttons">
        <v-divider vertical class="button-divider" />
        <div class="button-group">
          <v-btn color="primary" size="small" class="search-btn">검색</v-btn>
          <v-btn variant="outlined" size="small" class="secondary-btn">조건 저장</v-btn>
          <v-btn variant="outlined" size="small" class="secondary-btn">조건 불러오기</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const filters = ref({
  line: 'A1_ABCD',
  subArea: 'CVD',
  designRule: 'ABC12',
  processId: 'EFGH',
  prcGroup: 'AB12345CD:EFGHJKLMNOPR25',
  stepSeq: 'AB12345CD:EFGHIJKLMNOPQRSTUV123435'
})

const lineItems = ['A1_ABCD', 'A2_ABCD', 'B1_ABCD']
const subAreaItems = ['CVD', 'PVD', 'ETCH']
const designRuleItems = ['ABC12', 'ABC13', 'ABC14']
const processIdItems = ['EFGH', 'IJKL', 'MNOP']
const prcGroupItems = ['AB12345CD:EFGHJKLMNOPR25', 'AB12345CD:EFGHJKLMNOPR26']
const stepSeqItems = ['AB12345CD:EFGHIJKLMNOPQRSTUV123435', 'AB12345CD:EFGHIJKLMNOPQRSTUV123436']
</script>

<style scoped>
.filter-area {
  padding: 0 12px;
  background-color: #ffffff;
}

.page-header {
  padding: 8px 0;
}

.page-title {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #384047;
  margin: 0;
}

.divider {
  margin: 8px 0;
  background-color: #dadfe4;
}

.filters-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px 0;
  gap: 8px;
}

.filters {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 120px;
}

.filter-field-wide {
  width: 250px;
}

.filter-field-wider {
  width: 332px;
}

.filter-label {
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

.filter-select :deep(.v-field) {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #384047;
  min-height: 24px;
  height: 24px;
}

.filter-select :deep(.v-field__input) {
  padding: 2px 6px;
  min-height: 24px;
}

.filter-select :deep(.v-field__append-inner) {
  padding: 4px 0;
}

.filter-buttons {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-left: auto;
}

.button-divider {
  height: 10px;
  background-color: #ccd1d6;
}

.button-group {
  display: flex;
  gap: 6px;
}

.search-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.8px;
  text-transform: none;
  height: 24px;
  background-color: #3392d3;
}

.secondary-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  letter-spacing: 0.8px;
  text-transform: none;
  height: 24px;
  border-color: #dadfe4;
  color: #384047;
}
</style>
