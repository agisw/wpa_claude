<template>
  <div class="data-table-area">
    <div class="toolbar">
      <div class="info-text">※EQP ID를 클릭하면 YMS ECO Analysis로 이동합니다</div>
      <div class="divider-vertical"></div>
      <div class="legends">
        <div class="legend-item">
          <div class="color-indicator white"></div>
          <span>표준등록설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator blue"></div>
          <span>표준등록설비(타라인)</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator purple"></div>
          <span>HCCB진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator green"></div>
          <span>ECO진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator yellow"></div>
          <span>ECO만료/표준가능 설비</span>
        </div>
        <div class="legend-item">
          <div class="color-indicator red"></div>
          <span>미확산 설비</span>
        </div>
      </div>
      <div class="divider-vertical"></div>
      <v-btn variant="outlined" size="small" class="btn-column">칼럼 설정</v-btn>
    </div>

    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 36px;">No.</th>
            <th style="width: 75px;">Sub area</th>
            <th style="width: 100px;">Step Seq</th>
            <th style="width: 140px;">Step Desc</th>
            <th style="width: 80px;">RCP ID</th>
            <th style="width: 90px;">RCP group</th>
            <th style="width: 90px;">RM Model</th>
            <th style="width: 120px;">EC Model</th>
            <th style="width: 76px;">EQP ID 1</th>
            <th style="width: 76px;">EQP ID 2</th>
            <th style="width: 76px;">EQP ID 3</th>
            <th style="width: 76px;">EQP ID 4</th>
            <th style="width: 76px;">EQP ID 5</th>
            <th style="width: 76px;">EQP ID 6</th>
            <th style="width: 76px;">EQP ID 7</th>
            <th style="width: 76px;">EQP ID 8</th>
            <th style="width: 76px;">EQP ID 9</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.subArea }}</td>
            <td>{{ item.stepSeq }}</td>
            <td>{{ item.stepDesc }}</td>
            <td>{{ item.rcpId }}</td>
            <td>{{ item.rcpGroup }}</td>
            <td>{{ item.rmModel }}</td>
            <td>{{ item.ecModel }}</td>
            <td v-for="eqp in item.eqps" :key="eqp" :class="getEqpClass(eqp)">
              {{ eqp }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TableRow {
  subArea: string
  stepSeq: string
  stepDesc: string
  rcpId: string
  rcpGroup: string
  rmModel: string
  ecModel: string
  eqps: string[]
}

const tableData = ref<TableRow[]>([
  {
    subArea: 'CVD',
    stepSeq: 'ABC0123',
    stepDesc: 'STEP DESCRIPTION 1',
    rcpId: 'RCP001',
    rcpGroup: 'GROUP-A',
    rmModel: 'RM-MODEL1',
    ecModel: 'EC-MODEL1',
    eqps: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    subArea: 'CVD',
    stepSeq: 'ABC0124',
    stepDesc: 'STEP DESCRIPTION 2',
    rcpId: 'RCP002',
    rcpGroup: 'GROUP-B',
    rmModel: 'RM-MODEL2',
    ecModel: 'EC-MODEL2',
    eqps: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    subArea: 'CVD',
    stepSeq: 'ABC0125',
    stepDesc: 'STEP DESCRIPTION 3',
    rcpId: 'RCP003',
    rcpGroup: 'GROUP-C',
    rmModel: 'RM-MODEL3',
    ecModel: 'EC-MODEL3',
    eqps: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    subArea: 'CVD',
    stepSeq: 'ABC0126',
    stepDesc: 'STEP DESCRIPTION 4',
    rcpId: 'RCP004',
    rcpGroup: 'GROUP-D',
    rmModel: 'RM-MODEL4',
    ecModel: 'EC-MODEL4',
    eqps: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    subArea: 'CVD',
    stepSeq: 'ABC0127',
    stepDesc: 'STEP DESCRIPTION 5',
    rcpId: 'RCP005',
    rcpGroup: 'GROUP-E',
    rmModel: 'RM-MODEL5',
    ecModel: 'EC-MODEL5',
    eqps: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  }
])

const getEqpClass = (_eqp: string) => {
  return ''
}
</script>

<style scoped>
.data-table-area {
  padding: 0 12px;
  margin-top: 12px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1px;
  height: 20px;
  margin-bottom: 8px;
}

.info-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
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
  gap: 8px;
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.color-indicator {
  width: 10px;
  height: 10px;
  border: 1px solid #dadfe4;
}

.color-indicator.white {
  background-color: #ffffff;
}

.color-indicator.blue {
  background-color: #ccf0f9;
}

.color-indicator.purple {
  background-color: #ccd3f1;
}

.color-indicator.green {
  background-color: #d4f1d7;
}

.color-indicator.yellow {
  background-color: #ffe9c8;
}

.color-indicator.red {
  background-color: #ffd9d7;
}

.legend-item span {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.8px;
  color: #565e66;
}

.btn-column {
  text-transform: none;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  letter-spacing: 0.8px;
  height: 20px !important;
  border-radius: 2px;
}

.table-container {
  overflow-x: auto;
  border: 1px solid #dadfe4;
  border-radius: 2px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
}

.custom-table thead {
  background-color: #fafbfc;
}

.custom-table th {
  padding: 6px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #283037;
  text-align: left;
  border-bottom: 1px solid #dadfe4;
  border-right: 1px solid #dadfe4;
  height: 29px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-table th:last-child {
  border-right: none;
}

.custom-table tbody tr {
  background-color: #ffffff;
}

.custom-table td {
  padding: 6px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #283037;
  border-bottom: 1px solid #e4e9ed;
  border-right: 1px solid #dadfe4;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-table td:last-child {
  border-right: none;
}

.custom-table tbody tr:hover {
  background-color: #f9fafb;
}
</style>
