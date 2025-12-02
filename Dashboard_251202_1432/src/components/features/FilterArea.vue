<template>
  <div class="filter-area">
    <!-- Page Header -->
    <div class="page-header mb-2">
      <h1 class="page-title">동종확산 Dashboard</h1>
    </div>

    <v-divider class="mb-2"></v-divider>

    <!-- Filters -->
    <div class="d-flex align-end justify-space-between">
      <div class="d-flex align-end" style="gap: 8px;">
        <!-- Line -->
        <div class="filter-field">
          <label class="filter-label">Line<span class="required">*</span></label>
          <v-select
            v-model="filters.line"
            :items="lineItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- Sub area -->
        <div class="filter-field">
          <label class="filter-label">Sub area</label>
          <v-select
            v-model="filters.subArea"
            :items="subAreaItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- Design rule -->
        <div class="filter-field">
          <label class="filter-label">Design rule<span class="required">*</span></label>
          <v-select
            v-model="filters.designRule"
            :items="designRuleItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- Process ID -->
        <div class="filter-field">
          <label class="filter-label">Process ID<span class="required">*</span></label>
          <v-select
            v-model="filters.processId"
            :items="processIdItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
            style="width: 120px;"
          ></v-select>
        </div>

        <!-- PRC group -->
        <div class="filter-field">
          <label class="filter-label">PRC group<span class="required">*</span></label>
          <v-select
            v-model="filters.prcGroup"
            :items="prcGroupItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
            style="width: 250px;"
          ></v-select>
        </div>

        <!-- Step seq -->
        <div class="filter-field">
          <label class="filter-label">Step seq</label>
          <v-select
            v-model="filters.stepSeq"
            :items="stepSeqItems"
            variant="outlined"
            density="compact"
            hide-details
            class="filter-select"
            style="width: 332px;"
          ></v-select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="d-flex align-center" style="gap: 6px;">
        <div class="divider-vertical"></div>
        <v-btn
          color="#3392d3"
          variant="flat"
          size="small"
          class="action-btn primary-btn"
        >
          검색
        </v-btn>
        <v-btn
          variant="outlined"
          size="small"
          class="action-btn secondary-btn"
        >
          조건 저장
        </v-btn>
        <v-btn
          variant="outlined"
          size="small"
          class="action-btn secondary-btn"
        >
          조건 불러오기
        </v-btn>
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

const lineItems = ['A1_ABCD', 'A2_EFGH', 'B1_IJKL']
const subAreaItems = ['CVD', 'PVD', 'ETCH']
const designRuleItems = ['ABC12', 'DEF34', 'GHI56']
const processIdItems = ['EFGH', 'IJKL', 'MNOP']
const prcGroupItems = ['AB12345CD:EFGHJKLMNOPR25', 'XY67890ZZ:ABCDEFGHIJK12']
const stepSeqItems = ['AB12345CD:EFGHIJKLMNOPQRSTUV123435', 'CD67890EF:GHIJKLMNOPQRSTUV789012']
</script>

<style scoped>
.filter-area {
  padding: 12px;
  background-color: #ffffff;
}

.page-header {
  padding-top: 12px;
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

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  background-color: #ffffff;
  border-color: #dadfe4;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #384047;
}

.filter-select :deep(.v-field__input) {
  padding: 2px 6px;
  min-height: 24px;
}

.divider-vertical {
  width: 1px;
  height: 10px;
  background-color: #ccd1d6;
}

.action-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  text-transform: none;
  height: 24px;
}

.primary-btn {
  font-weight: 700;
  color: #ffffff !important;
}

.secondary-btn {
  font-weight: 400;
  color: #384047 !important;
  border-color: #dadfe4;
  background-color: #ffffff;
}
</style>
