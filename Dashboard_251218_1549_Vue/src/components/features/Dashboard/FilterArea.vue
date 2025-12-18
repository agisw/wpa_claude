<template>
  <div class="filter-area">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">동종확산 Dashboard</h1>
    </div>

    <!-- Divider -->
    <v-divider class="my-2"></v-divider>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="d-flex gap-2 align-end">
        <!-- Filter 1: Line -->
        <div class="filter-field">
          <label class="filter-label">Line<span class="required">*</span></label>
          <v-select
            v-model="selectedLine"
            :items="lineItems"
            variant="outlined"
            density="compact"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- Filter 2: Sub area -->
        <div class="filter-field">
          <label class="filter-label">Sub area</label>
          <v-select
            v-model="selectedSubArea"
            :items="subAreaItems"
            variant="outlined"
            density="compact"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- Filter 3: Design rule -->
        <div class="filter-field">
          <label class="filter-label">Design rule<span class="required">*</span></label>
          <v-select
            v-model="selectedDesignRule"
            :items="designRuleItems"
            variant="outlined"
            density="compact"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- Filter 4: Process ID -->
        <div class="filter-field">
          <label class="filter-label">Process ID<span class="required">*</span></label>
          <v-select
            v-model="selectedProcessId"
            :items="processIdItems"
            variant="outlined"
            density="compact"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- Filter 5: PRC group -->
        <div class="filter-field">
          <label class="filter-label">PRC group<span class="required">*</span></label>
          <v-select
            v-model="selectedPrcGroup"
            :items="prcGroupItems"
            variant="outlined"
            density="compact"
            hide-details
            style="width: 250px;"
          ></v-select>
        </div>

        <!-- Filter 6: Step seq -->
        <div class="filter-field">
          <label class="filter-label">Step seq</label>
          <v-select
            v-model="selectedStepSeq"
            :items="stepSeqItems"
            variant="outlined"
            density="compact"
            hide-details
            style="width: 332px;"
          ></v-select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <div class="divider-vertical"></div>
        <v-btn color="#3392d3" variant="flat" size="small" class="action-btn">검색</v-btn>
        <v-btn variant="outlined" size="small" class="action-btn secondary">조건 저장</v-btn>
        <v-btn variant="outlined" size="small" class="action-btn secondary">조건 불러오기</v-btn>
      </div>
    </div>

    <!-- Collapse Button -->
    <div class="collapse-btn">
      <v-icon size="5" color="#565e66">mdi-menu-up</v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedLine = ref('A1_ABCD')
const lineItems = ['A1_ABCD', 'A2_EFGH', 'B1_IJKL']

const selectedSubArea = ref('CVD')
const subAreaItems = ['CVD', 'Etch', 'Photo']

const selectedDesignRule = ref('ABC12')
const designRuleItems = ['ABC12', 'DEF34', 'GHI56']

const selectedProcessId = ref('EFGH')
const processIdItems = ['EFGH', 'IJKL', 'MNOP']

const selectedPrcGroup = ref('AB12345CD:EFGHJKLMNOPR25')
const prcGroupItems = ['AB12345CD:EFGHJKLMNOPR25', 'AB12345CD:EFGHJKLMNOPR26']

const selectedStepSeq = ref('AB12345CD:EFGHIJKLMNOPQRSTUV123435')
const stepSeqItems = ['AB12345CD:EFGHIJKLMNOPQRSTUV123435', 'AB12345CD:EFGHIJKLMNOPQRSTUV123436']
</script>

<style scoped>
.filter-area {
  padding: 0 12px;
  background-color: white;
  position: relative;
}

.page-header {
  padding-top: 8px;
}

.page-title {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #384047;
  margin: 0;
}

.filters-section {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.filter-label {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #565e66;
}

.required {
  color: #ff4337;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.divider-vertical {
  width: 1px;
  height: 10px;
  background-color: #ccd1d6;
  margin: 0 7px;
}

.action-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  letter-spacing: 0.8px;
  text-transform: none;
}

.action-btn.secondary {
  border-color: #dadfe4;
  color: #384047;
}

.collapse-btn {
  position: absolute;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%);
  width: 60px;
  height: 12px;
  background-color: white;
  border: 1px solid #e4e9ed;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.collapse-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1px;
  right: 1px;
  height: 1px;
  background-color: #edf2f4;
}

:deep(.v-select .v-field) {
  background-color: white;
  border-color: #ccd1d6;
}

:deep(.v-select .v-field__input) {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #384047;
  padding: 2px 6px;
  min-height: 24px;
}

.gap-2 {
  gap: 8px;
}
</style>
