<template>
  <div class="dashboard-table-container">
    <DataTableToolbar />
    <div class="table-wrapper">
      <table class="dashboard-table">
        <thead>
          <tr>
            <th class="header-cell" style="width: 36px;">No.</th>
            <th class="header-cell" style="width: 75px;">Sub area</th>
            <th class="header-cell" style="width: 100px;">Step Seq</th>
            <th class="header-cell" style="width: 140px;">Step Desc</th>
            <th class="header-cell" style="width: 80px;">RCP ID</th>
            <th class="header-cell" style="width: 90px;">RCP group</th>
            <th class="header-cell" style="width: 90px;">RM Model</th>
            <th class="header-cell" style="width: 120px;">EC Model</th>
            <th class="header-cell" style="width: 76px;">EQP ID 1</th>
            <th class="header-cell" style="width: 76px;">EQP ID 2</th>
            <th class="header-cell" style="width: 76px;">EQP ID 3</th>
            <th class="header-cell" style="width: 76px;">EQP ID 4</th>
            <th class="header-cell" style="width: 76px;">EQP ID 5</th>
            <th class="header-cell" style="width: 76px;">EQP ID 6</th>
            <th class="header-cell" style="width: 76px;">EQP ID 7</th>
            <th class="header-cell" style="width: 76px;">EQP ID 8</th>
            <th class="header-cell" style="width: 76px;">EQP ID 9</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td class="data-cell" style="width: 36px;">{{ row.no }}</td>
            <td class="data-cell" style="width: 75px;">{{ row.subArea }}</td>
            <td class="data-cell" style="width: 100px;">{{ row.stepSeq }}</td>
            <td class="data-cell" style="width: 140px;">{{ row.stepDesc }}</td>
            <td class="data-cell" style="width: 80px;">{{ row.rcpId }}</td>
            <td class="data-cell" style="width: 90px;">{{ row.rcpGroup }}</td>
            <td class="data-cell" style="width: 90px;">{{ row.rmModel }}</td>
            <td class="data-cell" style="width: 120px;">{{ row.ecModel }}</td>
            <td
              v-for="(eqp, eqpIndex) in row.eqpIds"
              :key="`eqp-${index}-${eqpIndex}`"
              class="data-cell eqp-cell"
              :class="getCellClass(eqp)"
              style="width: 76px;"
            >
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
import DataTableToolbar from './DataTableToolbar.vue'

interface TableRow {
  no: number
  subArea: string
  stepSeq: string
  stepDesc: string
  rcpId: string
  rcpGroup: string
  rmModel: string
  ecModel: string
  eqpIds: string[]
}

const tableData = ref<TableRow[]>([
  {
    no: 1,
    subArea: 'CVD',
    stepSeq: 'CD043210',
    stepDesc: '1.2 ABC QWE DCD',
    rcpId: 'ABCDE321',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqpIds: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    no: 2,
    subArea: 'CVD',
    stepSeq: 'CD063231',
    stepDesc: '1.3 DEF QWE VRE',
    rcpId: 'ABCDE322',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqpIds: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    no: 3,
    subArea: 'CVD',
    stepSeq: 'CD043212',
    stepDesc: '1.4 GHI XYZ ABC',
    rcpId: 'ABCDE323',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqpIds: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    no: 4,
    subArea: 'CVD',
    stepSeq: 'CD043213',
    stepDesc: '1.5 JKL MNO PQR',
    rcpId: 'ABCDE324',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqpIds: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  },
  {
    no: 5,
    subArea: 'CVD',
    stepSeq: 'CD043214',
    stepDesc: '1.6 STU VWX YZA',
    rcpId: 'ABCDE325',
    rcpGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ABC_ABCDEF_A',
    eqpIds: ['ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123', 'ABCD123']
  }
])

const getCellClass = (_eqp: string) => {
  // This would normally have logic to determine cell background color
  return ''
}
</script>

<style scoped>
.dashboard-table-container {
  padding: 0 12px;
  background-color: #ffffff;
}

.table-wrapper {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 714px;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
}

.header-cell {
  background-color: #fafbfc;
  border: 1px solid #dadfe4;
  border-top: 1px solid #dadfe4;
  border-bottom: 1px solid #dadfe4;
  padding: 6px;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #283037;
  height: 29px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-cell {
  background-color: #ffffff;
  border-left: 1px solid #dadfe4;
  border-right: 1px solid #dadfe4;
  border-bottom: 1px solid #e4e9ed;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #283037;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eqp-cell {
  cursor: pointer;
}

.eqp-cell:hover {
  background-color: #f3f6f8;
}

/* Color variations for different cell states */
.cell-standard {
  background-color: #ffffff;
}

.cell-standard-other {
  background-color: #ccf0f9;
}

.cell-hccb {
  background-color: #ccd3f1;
}

.cell-eco {
  background-color: #d4f1d7;
}

.cell-eco-expired {
  background-color: #ffe9c8;
}

.cell-not-spread {
  background-color: #ffd9d7;
}
</style>
