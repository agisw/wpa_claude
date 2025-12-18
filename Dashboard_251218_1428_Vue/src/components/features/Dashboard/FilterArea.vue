<template>
  <div class="filter-area">
    <div class="page-header">
      <h1 class="page-title">동종확산 Dashboard</h1>
    </div>

    <v-divider class="my-2"></v-divider>

    <div class="filters-container">
      <div class="filters-row">
        <div class="filter-field">
          <label class="filter-label">Line<span class="required">*</span></label>
          <v-select
            v-model="selectedLine"
            :items="lineItems"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <div class="filter-field">
          <label class="filter-label">Sub area</label>
          <v-select
            v-model="selectedSubArea"
            :items="subAreaItems"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <div class="filter-field">
          <label class="filter-label">Design rule<span class="required">*</span></label>
          <v-select
            v-model="selectedDesignRule"
            :items="designRuleItems"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <div class="filter-field">
          <label class="filter-label">Process ID<span class="required">*</span></label>
          <v-select
            v-model="selectedProcessId"
            :items="processIdItems"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 120px;"
          ></v-select>
        </div>

        <div class="filter-field">
          <label class="filter-label">PRC group<span class="required">*</span></label>
          <v-select
            v-model="selectedPrcGroup"
            :items="prcGroupItems"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 250px;"
          ></v-select>
        </div>

        <div class="filter-field">
          <label class="filter-label">Step seq</label>
          <v-select
            v-model="selectedStepSeq"
            :items="stepSeqItems"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 332px;"
          ></v-select>
        </div>
      </div>

      <div class="button-group">
        <v-divider vertical class="mr-2" style="height: 10px;"></v-divider>
        <v-btn color="#3392d3" size="small" class="text-white font-weight-bold">검색</v-btn>
        <v-btn variant="outlined" size="small" class="ml-2">조건 저장</v-btn>
        <v-btn variant="outlined" size="small" class="ml-2">조건 불러오기</v-btn>
      </div>
    </div>

    <div class="collapse-btn">
      <v-icon size="5">mdi-menu-up</v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedLine = ref('A1_ABCD')
const selectedSubArea = ref('CVD')
const selectedDesignRule = ref('ABC12')
const selectedProcessId = ref('EFGH')
const selectedPrcGroup = ref('AB12345CD:EFGHJKLMNOPR25')
const selectedStepSeq = ref('AB12345CD:EFGHIJKLMNOPQRSTUV123435')

const lineItems = ['A1_ABCD', 'A2_EFGH', 'B1_IJKL']
const subAreaItems = ['CVD', 'ETCH', 'PHOTO']
const designRuleItems = ['ABC12', 'DEF34', 'GHI56']
const processIdItems = ['EFGH', 'IJKL', 'MNOP']
const prcGroupItems = ['AB12345CD:EFGHJKLMNOPR25']
const stepSeqItems = ['AB12345CD:EFGHIJKLMNOPQRSTUV123435']
</script>

<style scoped>
.filter-area {
  background: white;
  padding: 12px;
  position: relative;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: #283037;
  letter-spacing: 0.8px;
  line-height: 24px;
  margin: 0;
}

.filters-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.filters-row {
  display: flex;
  gap: 8px;
  flex: 1;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.filter-label {
  font-size: 12px;
  font-weight: 700;
  color: #565e66;
  letter-spacing: 0.8px;
  line-height: 20px;
}

.required {
  color: #ff4337;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.collapse-btn {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 12px;
  background: white;
  border: 1px solid #dadfe4;
  border-top: none;
  border-radius: 0 0 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

:deep(.v-select .v-field) {
  font-size: 14px;
  letter-spacing: 0.8px;
}

:deep(.v-btn) {
  text-transform: none !important;
  letter-spacing: 0.8px;
}
</style>
