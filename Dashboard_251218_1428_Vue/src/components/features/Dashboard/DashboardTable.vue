<template>
  <div class="table-container">
    <div class="table-wrapper">
      <table class="dashboard-table">
        <thead>
          <tr>
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
            <td>{{ index + 1 }}</td>
            <td>{{ row.subArea }}</td>
            <td>{{ row.stepSeq }}</td>
            <td>{{ row.stepDesc }}</td>
            <td>{{ row.recipeId }}</td>
            <td>{{ row.prcGroup }}</td>
            <td>{{ row.rmModel }}</td>
            <td>{{ row.ecModel }}</td>
            <td
              v-for="eqp in row.eqps"
              :key="eqp.id"
              :class="getCellClass(eqp.status)"
              class="eqp-cell"
            >
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
  id: number
  value: string
  status: string
}

interface TableRow {
  subArea: string
  stepSeq: string
  stepDesc: string
  recipeId: string
  prcGroup: string
  rmModel: string
  ecModel: string
  eqps: EqpData[]
}

const tableData = ref<TableRow[]>([
  {
    subArea: 'CVD',
    stepSeq: 'CD043210',
    stepDesc: '1.2 ABC GWE DCD',
    recipeId: 'ABCDE321',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ABCDEF_A',
    eqps: [
      { id: 1, value: 'ABCD123', status: 'standard' },
      { id: 2, value: 'ABCD123', status: 'standard' },
      { id: 3, value: 'ABCD123', status: 'standard' },
      { id: 4, value: 'ABCD123', status: 'hccb' },
      { id: 5, value: 'ABCD123', status: 'hccb' },
      { id: 6, value: 'ABCD123', status: 'hccb' },
      { id: 7, value: 'ABCD123', status: 'hccb' },
      { id: 8, value: 'ABCD123', status: 'hccb' },
      { id: 9, value: 'ABCD123', status: 'hccb' }
    ]
  },
  {
    subArea: 'CVD',
    stepSeq: 'CD063231',
    stepDesc: '1.3 DEF GHI JKLM',
    recipeId: 'ABCDE322',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ABCDEF_A',
    eqps: [
      { id: 1, value: 'ABCD123', status: 'other-line' },
      { id: 2, value: 'ABCD123', status: 'other-line' },
      { id: 3, value: 'ABCD123', status: 'other-line' },
      { id: 4, value: 'ABCD123', status: 'other-line' },
      { id: 5, value: 'ABCD123', status: 'other-line' },
      { id: 6, value: 'ABCD123', status: 'other-line' },
      { id: 7, value: 'ABCD123', status: 'other-line' },
      { id: 8, value: 'ABCD123', status: 'other-line' },
      { id: 9, value: 'ABCD123', status: 'other-line' }
    ]
  },
  {
    subArea: 'CVD',
    stepSeq: 'CD043212',
    stepDesc: '1.4 GHI XYZ ABC',
    recipeId: 'ABCDE323',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ABCDEF_A',
    eqps: [
      { id: 1, value: 'ABCD123', status: 'standard' },
      { id: 2, value: 'ABCD123', status: 'standard' },
      { id: 3, value: 'ABCD123', status: 'standard' },
      { id: 4, value: 'ABCD123', status: 'standard' },
      { id: 5, value: 'ABCD123', status: 'standard' },
      { id: 6, value: 'ABCD123', status: 'standard' },
      { id: 7, value: 'ABCD123', status: 'standard' },
      { id: 8, value: 'ABCD123', status: 'standard' },
      { id: 9, value: 'ABCD123', status: 'standard' }
    ]
  },
  {
    subArea: 'CVD',
    stepSeq: 'CD043213',
    stepDesc: '1.5 JKL MNO PQR',
    recipeId: 'ABCDE324',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ABCDEF_A',
    eqps: [
      { id: 1, value: 'ABCD123', status: 'eco' },
      { id: 2, value: 'ABCD123', status: 'eco' },
      { id: 3, value: 'ABCD123', status: 'eco' },
      { id: 4, value: 'ABCD123', status: 'eco' },
      { id: 5, value: 'ABCD123', status: 'eco' },
      { id: 6, value: 'ABCD123', status: 'eco' },
      { id: 7, value: 'ABCD123', status: 'eco' },
      { id: 8, value: 'ABCD123', status: 'eco' },
      { id: 9, value: 'ABCD123', status: 'eco' }
    ]
  },
  {
    subArea: 'CVD',
    stepSeq: 'CD043214',
    stepDesc: '1.6 STU VWX YZA',
    recipeId: 'ABCDE325',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ABCDEF_A',
    eqps: [
      { id: 1, value: 'ABCD123', status: 'standard' },
      { id: 2, value: 'ABCD123', status: 'standard' },
      { id: 3, value: 'ABCD123', status: 'standard' },
      { id: 4, value: 'ABCD123', status: 'standard' },
      { id: 5, value: 'ABCD123', status: 'standard' },
      { id: 6, value: 'ABCD123', status: 'standard' },
      { id: 7, value: 'ABCD123', status: 'standard' },
      { id: 8, value: 'ABCD123', status: 'standard' },
      { id: 9, value: 'ABCD123', status: 'standard' }
    ]
  }
])

const getCellClass = (status: string) => {
  switch (status) {
    case 'standard':
      return 'status-standard'
    case 'other-line':
      return 'status-other-line'
    case 'hccb':
      return 'status-hccb'
    case 'eco':
      return 'status-eco'
    case 'expired':
      return 'status-expired'
    case 'not-spread':
      return 'status-not-spread'
    default:
      return ''
  }
}
</script>

<style scoped>
.table-container {
  background: white;
  padding: 12px;
  overflow-x: auto;
}

.table-wrapper {
  overflow-x: auto;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  letter-spacing: 0.8px;
}

.dashboard-table th {
  background: #fafbfc;
  color: #283037;
  font-weight: 400;
  text-align: left;
  padding: 6px;
  border: 1px solid #dadfe4;
  border-bottom: 1px solid #dadfe4;
  line-height: 14px;
  height: 29px;
}

.dashboard-table td {
  background: white;
  color: #283037;
  padding: 6px;
  border: 1px solid #e4e9ed;
  line-height: 14px;
  height: 23px;
  font-weight: 400;
}

.eqp-cell {
  cursor: pointer;
  text-align: center;
}

.eqp-cell:hover {
  opacity: 0.8;
}

.status-standard {
  background: white !important;
}

.status-other-line {
  background: #ccf0f9 !important;
}

.status-hccb {
  background: #ccd3f1 !important;
}

.status-eco {
  background: #d4f1d7 !important;
}

.status-expired {
  background: #ffe9c8 !important;
}

.status-not-spread {
  background: #ffd9d7 !important;
}
</style>
