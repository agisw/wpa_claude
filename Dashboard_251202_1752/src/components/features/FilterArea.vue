<template>
  <div class="filter-area">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">동종확산 Dashboard</h1>
    </div>

    <v-divider class="header-divider"></v-divider>

    <!-- Filters -->
    <div class="filters-container">
      <div class="filter-row">
        <div class="filter-field">
          <label class="filter-label">
            Line<span class="required">*</span>
          </label>
          <v-select
            v-model="filters.line"
            :items="lineItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
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
          ></v-select>
        </div>

        <div class="filter-field">
          <label class="filter-label">
            Design rule<span class="required">*</span>
          </label>
          <v-select
            v-model="filters.designRule"
            :items="designRuleItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>

        <div class="filter-field">
          <label class="filter-label">
            Process ID<span class="required">*</span>
          </label>
          <v-select
            v-model="filters.processId"
            :items="processIdItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>

        <div class="filter-field-wide">
          <label class="filter-label">
            PRC group<span class="required">*</span>
          </label>
          <v-select
            v-model="filters.prcGroup"
            :items="prcGroupItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>

        <div class="filter-field-wider">
          <label class="filter-label">Step seq</label>
          <v-select
            v-model="filters.stepSeq"
            :items="stepSeqItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
          ></v-select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="button-group">
        <div class="button-divider"></div>
        <v-btn
          color="primary"
          class="search-btn"
          :elevation="0"
        >
          검색
        </v-btn>
        <v-btn
          variant="outlined"
          class="secondary-btn"
          :elevation="0"
        >
          조건 저장
        </v-btn>
        <v-btn
          variant="outlined"
          class="secondary-btn"
          :elevation="0"
        >
          조건 불러오기
        </v-btn>
      </div>
    </div>

    <!-- Collapse Button -->
    <div class="collapse-btn">
      <div class="collapse-content">
        <v-icon size="5">mdi-chevron-up</v-icon>
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
  stepSeq: 'AB12345CD:EFGHIJKLMNOPQRSTUV123435',
})

const lineItems = ['A1_ABCD', 'A2_EFGH', 'B1_IJKL']
const subAreaItems = ['CVD', 'ETCH', 'LITHO']
const designRuleItems = ['ABC12', 'DEF34', 'GHI56']
const processIdItems = ['EFGH', 'IJKL', 'MNOP']
const prcGroupItems = ['AB12345CD:EFGHJKLMNOPR25', 'AB12345CD:EFGHJKLMNOPR26']
const stepSeqItems = ['AB12345CD:EFGHIJKLMNOPQRSTUV123435', 'AB12345CD:EFGHIJKLMNOPQRSTUV123436']
</script>

<style scoped>
.filter-area {
  background-color: #ffffff;
  padding: 48px 12.34px 0;
  position: relative;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #384047;
}

.header-divider {
  background-color: #dadfe4;
  margin: 8px 0;
}

.filters-container {
  display: flex;
  align-items: flex-end;
  gap: 0;
  padding: 9px 0;
  position: relative;
}

.filter-row {
  display: flex;
  gap: 8px;
  flex: 1;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 120px;
}

.filter-field-wide {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 250px;
}

.filter-field-wider {
  display: flex;
  flex-direction: column;
  gap: 2px;
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

.filter-select {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
}

:deep(.v-select .v-field) {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
}

:deep(.v-select .v-field__input) {
  padding: 2px 6px;
  min-height: 24px;
}

:deep(.v-select .v-field__outline) {
  --v-field-border-width: 1px;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.button-divider {
  width: 1px;
  height: 10px;
  background-color: #ccd1d6;
  margin: 0 7px;
}

.search-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  text-transform: none;
  height: 24px;
  padding: 0 8px;
  min-width: 44px;
}

.secondary-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  text-transform: none;
  height: 24px;
  padding: 2px 8px;
  border-color: #dadfe4;
  color: #384047;
}

.collapse-btn {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 61.714px;
  height: 12px;
}

.collapse-content {
  width: 60px;
  height: 12px;
  background-color: #ffffff;
  border: 1px solid #e4e9ed;
  border-radius: 2px 2px 0 0;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.collapse-content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1px;
  width: 58px;
  height: 1px;
  background-color: #edf2f4;
}
</style>
