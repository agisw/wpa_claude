<template>
  <div class="data-table-area">
    <!-- Toolbar -->
    <div class="toolbar d-flex align-center" style="gap: 1px;">
      <div class="info-text">
        ※EQP ID를 클릭하면 YMS ECO Analysis로 이동합니다
      </div>
      <div class="toolbar-divider"></div>

      <!-- Legends -->
      <div class="legends d-flex align-center" style="gap: 8px;">
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ffffff; border: 1px solid #dadfe4;"></div>
          <span class="legend-text">표준등록설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ccf0f9; border: 1px solid #dadfe4;"></div>
          <span class="legend-text">표준등록설비(타라인)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ccd3f1; border: 1px solid #dadfe4;"></div>
          <span class="legend-text">HCCB진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #d4f1d7; border: 1px solid #dadfe4;"></div>
          <span class="legend-text">ECO진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ffe9c8; border: 1px solid #dadfe4;"></div>
          <span class="legend-text">ECO만료/표준가능 설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background-color: #ffd9d7; border: 1px solid #dadfe4;"></div>
          <span class="legend-text">미확산 설비</span>
        </div>
      </div>

      <div class="toolbar-divider"></div>

      <v-btn
        variant="outlined"
        size="small"
        class="column-btn"
      >
        칼럼 설정
      </v-btn>
    </div>

    <!-- Data Table -->
    <div class="table-wrapper">
      <v-table
        density="compact"
        class="custom-table"
        fixed-header
      >
        <thead>
          <tr class="table-header">
            <th style="width: 36px;">No.</th>
            <th style="width: 75px;">Sub area</th>
            <th style="width: 100px;">Step Seq</th>
            <th style="width: 140px;">Step Desc</th>
            <th style="width: 80px;">Recipe ID</th>
            <th style="width: 90px;">PRC group</th>
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
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.no }}</td>
            <td>{{ row.subArea }}</td>
            <td>{{ row.stepSeq }}</td>
            <td>{{ row.stepDesc }}</td>
            <td>{{ row.recipeId }}</td>
            <td>{{ row.prcGroup }}</td>
            <td>{{ row.rmModel }}</td>
            <td>{{ row.ecModel }}</td>
            <td :class="getCellClass(row.eqp1)">{{ row.eqp1 }}</td>
            <td :class="getCellClass(row.eqp2)">{{ row.eqp2 }}</td>
            <td :class="getCellClass(row.eqp3)">{{ row.eqp3 }}</td>
            <td :class="getCellClass(row.eqp4)">{{ row.eqp4 }}</td>
            <td :class="getCellClass(row.eqp5)">{{ row.eqp5 }}</td>
            <td :class="getCellClass(row.eqp6)">{{ row.eqp6 }}</td>
            <td :class="getCellClass(row.eqp7)">{{ row.eqp7 }}</td>
            <td :class="getCellClass(row.eqp8)">{{ row.eqp8 }}</td>
            <td :class="getCellClass(row.eqp9)">{{ row.eqp9 }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TableRow {
  no: number
  subArea: string
  stepSeq: string
  stepDesc: string
  recipeId: string
  prcGroup: string
  rmModel: string
  ecModel: string
  eqp1: string
  eqp2: string
  eqp3: string
  eqp4: string
  eqp5: string
  eqp6: string
  eqp7: string
  eqp8: string
  eqp9: string
}

const tableData = ref<TableRow[]>([
  {
    no: 1,
    subArea: 'CVD',
    stepSeq: 'CD043210',
    stepDesc: '1.2 ABC QWE DCD',
    recipeId: 'ABCDE321',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqp1: 'ABC0123',
    eqp2: 'ABC0123',
    eqp3: 'ABC0123',
    eqp4: 'ABC0123',
    eqp5: 'ABC0123',
    eqp6: 'ABC0123',
    eqp7: 'ABC0123',
    eqp8: 'ABC0123',
    eqp9: 'ABC0123'
  },
  {
    no: 2,
    subArea: 'CVD',
    stepSeq: 'CD043217',
    stepDesc: '1.5 DFG 5VC',
    recipeId: 'ABCDE322',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqp1: 'ABC0123',
    eqp2: 'ABC0123',
    eqp3: 'ABC0123',
    eqp4: 'ABC0123',
    eqp5: 'ABC0123',
    eqp6: 'ABC0123',
    eqp7: 'ABC0123',
    eqp8: 'ABC0123',
    eqp9: 'ABC0123'
  },
  {
    no: 3,
    subArea: 'CVD',
    stepSeq: 'CD043212',
    stepDesc: '1.4 GIJ XYZ ABC',
    recipeId: 'ABCDE323',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqp1: 'ABC0123',
    eqp2: 'ABC0123',
    eqp3: 'ABC0123',
    eqp4: 'ABC0123',
    eqp5: 'ABC0123',
    eqp6: 'ABC0123',
    eqp7: 'ABC0123',
    eqp8: 'ABC0123',
    eqp9: 'ABC0123'
  },
  {
    no: 4,
    subArea: 'CVD',
    stepSeq: 'CD043213',
    stepDesc: '1.5 JKL MNOP QR',
    recipeId: 'ABCDE324',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqp1: 'ABC0123',
    eqp2: 'ABC0123',
    eqp3: 'ABC0123',
    eqp4: 'ABC0123',
    eqp5: 'ABC0123',
    eqp6: 'ABC0123',
    eqp7: 'ABC0123',
    eqp8: 'ABC0123',
    eqp9: 'ABC0123'
  },
  {
    no: 5,
    subArea: 'CVD',
    stepSeq: 'CD043214',
    stepDesc: '1.6 STU VWX YZA',
    recipeId: 'ABCDE325',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqp1: 'ABC0123',
    eqp2: 'ABC0123',
    eqp3: 'ABC0123',
    eqp4: 'ABC0123',
    eqp5: 'ABC0123',
    eqp6: 'ABC0123',
    eqp7: 'ABC0123',
    eqp8: 'ABC0123',
    eqp9: 'ABC0123'
  }
])

const getCellClass = (_value: string) => {
  // Return empty class for now - can be extended based on business logic
  return ''
}
</script>

<style scoped>
.data-table-area {
  padding: 12px;
  background-color: #f8f9fa;
}

.toolbar {
  height: 20px;
  margin-bottom: 12px;
}

.info-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #767d84;
}

.toolbar-divider {
  width: 1px;
  height: 10px;
  background-color: #ccd1d6;
  margin: 0 6px;
}

.legends {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-color {
  width: 10px;
  height: 10px;
}

.legend-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.8px;
  color: #565e66;
  white-space: nowrap;
}

.column-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #384047 !important;
  text-transform: none;
  border-color: #dadfe4;
  background-color: #ffffff;
  height: 20px;
}

.table-wrapper {
  background-color: #ffffff;
  border-radius: 2px;
  overflow: auto;
}

.custom-table {
  background-color: #ffffff;
}

.custom-table :deep(thead) {
  background-color: #f3f6f8;
}

.custom-table :deep(th) {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #384047 !important;
  border: 1px solid #e8ecef;
  padding: 6px 8px;
  height: 29px;
  text-align: left;
}

.custom-table :deep(td) {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #384047;
  border: 1px solid #e8ecef;
  padding: 4px 8px;
  height: 23px;
}

.custom-table :deep(tbody tr:hover) {
  background-color: #f8f9fa !important;
}
</style>
