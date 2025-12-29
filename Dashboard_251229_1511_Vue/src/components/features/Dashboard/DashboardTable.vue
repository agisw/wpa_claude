<template>
  <div class="table-container">
    <!-- Toolbar -->
    <div class="table-toolbar">
      <div class="notice-text">※EQP ID를 클릭하면 YMS ECO Analysis로 이동합니다</div>

      <div class="divider-vertical"></div>

      <!-- Legends -->
      <div class="legends">
        <div class="legend-item">
          <div class="color-indicator" style="background-color: white; border: 1px solid #dadfe4;"></div>
          <span>표준등록설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator" style="background-color: #ccf0f9; border: 1px solid #dadfe4;"></div>
          <span>표준등록설비(타라인)</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator" style="background-color: #ccd3f1; border: 1px solid #dadfe4;"></div>
          <span>HCCB진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator" style="background-color: #d4f1d7; border: 1px solid #dadfe4;"></div>
          <span>ECO진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator" style="background-color: #ffe9c8; border: 1px solid #dadfe4;"></div>
          <span>ECO만료/표준가능 설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator" style="background-color: #ffd9d7; border: 1px solid #dadfe4;"></div>
          <span>미확산 설비</span>
        </div>
      </div>

      <div class="divider-vertical"></div>

      <v-btn variant="outlined" size="small" class="column-btn">칼럼 설정</v-btn>
    </div>

    <!-- Data Table -->
    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 36px;">No.</th>
            <th style="width: 75px;">Subarea</th>
            <th style="width: 100px;">Step Seq</th>
            <th style="width: 140px;">Step Desc</th>
            <th style="width: 80px;">RCP ID</th>
            <th style="width: 90px;">RCP group</th>
            <th style="width: 90px;">RM Model</th>
            <th style="width: 120px;">EC Model</th>
            <th style="width: 76px;">ABC0123</th>
            <th style="width: 76px;">CD043210</th>
            <th style="width: 76px;">EFG34567</th>
            <th style="width: 76px;">HIJ89012</th>
            <th style="width: 76px;">KLM45678</th>
            <th style="width: 76px;">NOP90123</th>
            <th style="width: 76px;">QRS56789</th>
            <th style="width: 76px;">TUV01234</th>
            <th style="width: 76px;">WXY67890</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.no }}</td>
            <td>{{ row.subarea }}</td>
            <td>{{ row.stepSeq }}</td>
            <td>{{ row.stepDesc }}</td>
            <td>{{ row.rcpId }}</td>
            <td>{{ row.rcpGroup }}</td>
            <td>{{ row.rmModel }}</td>
            <td>{{ row.ecModel }}</td>
            <td v-for="(eqp, eqpIndex) in row.eqps" :key="eqpIndex" :style="{ backgroundColor: eqp.bgColor }">
              {{ eqp.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface EqpData {
  value: string
  bgColor: string
}

interface TableRow {
  no: number
  subarea: string
  stepSeq: string
  stepDesc: string
  rcpId: string
  rcpGroup: string
  rmModel: string
  ecModel: string
  eqps: EqpData[]
}

const tableData = ref<TableRow[]>([
  {
    no: 1,
    subarea: 'CVD',
    stepSeq: 'AB01234CD',
    stepDesc: 'Step description 1',
    rcpId: 'RCP001',
    rcpGroup: 'Group A',
    rmModel: 'RM-001',
    ecModel: 'EC-MODEL-001',
    eqps: [
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ccf0f9' },
      { value: 'O', bgColor: '#ccd3f1' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#d4f1d7' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ffe9c8' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ffd9d7' },
    ]
  },
  {
    no: 2,
    subarea: 'ETCH',
    stepSeq: 'EF56789GH',
    stepDesc: 'Step description 2',
    rcpId: 'RCP002',
    rcpGroup: 'Group B',
    rmModel: 'RM-002',
    ecModel: 'EC-MODEL-002',
    eqps: [
      { value: 'O', bgColor: 'white' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ccf0f9' },
      { value: 'O', bgColor: '#ccd3f1' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#d4f1d7' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ffe9c8' },
      { value: '', bgColor: 'white' },
    ]
  },
  {
    no: 3,
    subarea: 'PHOTO',
    stepSeq: 'IJ90123KL',
    stepDesc: 'Step description 3',
    rcpId: 'RCP003',
    rcpGroup: 'Group C',
    rmModel: 'RM-003',
    ecModel: 'EC-MODEL-003',
    eqps: [
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: 'white' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ccf0f9' },
      { value: 'O', bgColor: '#ccd3f1' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#d4f1d7' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ffe9c8' },
    ]
  },
  {
    no: 4,
    subarea: 'CVD',
    stepSeq: 'MN45678OP',
    stepDesc: 'Step description 4',
    rcpId: 'RCP004',
    rcpGroup: 'Group D',
    rmModel: 'RM-004',
    ecModel: 'EC-MODEL-004',
    eqps: [
      { value: 'O', bgColor: '#ffd9d7' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: 'white' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ccf0f9' },
      { value: 'O', bgColor: '#ccd3f1' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#d4f1d7' },
      { value: '', bgColor: 'white' },
    ]
  },
  {
    no: 5,
    subarea: 'ETCH',
    stepSeq: 'QR23456ST',
    stepDesc: 'Step description 5',
    rcpId: 'RCP005',
    rcpGroup: 'Group E',
    rmModel: 'RM-005',
    ecModel: 'EC-MODEL-005',
    eqps: [
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ffe9c8' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ffd9d7' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: 'white' },
      { value: 'O', bgColor: '#ccf0f9' },
      { value: '', bgColor: 'white' },
      { value: 'O', bgColor: '#ccd3f1' },
    ]
  },
])
</script>

<style scoped>
.table-container {
  padding: 0 12px;
  background-color: white;
}

.table-toolbar {
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 3px 0;
  height: 20px;
}

.notice-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #767d84;
}

.divider-vertical {
  width: 1px;
  height: 10px;
  background-color: #ccd1d6;
  margin: 0 6px;
}

.legends {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.color-indicator {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}

.legend-item span {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.8px;
  color: #565e66;
}

.column-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #384047;
  text-transform: none;
  border-color: #dadfe4;
  padding: 3px 6px;
  height: 20px;
}

.data-table-wrapper {
  margin-top: 8px;
  overflow-x: auto;
  border: 1px solid #dadfe4;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
}

.data-table th {
  background-color: #fafbfc;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #283037;
  text-align: left;
  padding: 6px;
  height: 29px;
  border-right: 1px solid #dadfe4;
  border-bottom: 1px solid #dadfe4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-table td {
  background-color: white;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #283037;
  padding: 6px;
  height: 23px;
  border-right: 1px solid #dadfe4;
  border-bottom: 1px solid #e4e9ed;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-table tbody tr:hover {
  background-color: #f9fafb;
}
</style>
