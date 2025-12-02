<template>
  <div class="data-table-area">
    <!-- Toolbar with legends -->
    <div class="toolbar">
      <div class="info-text">
        ※EQP ID를 클릭하면 YMS ECO Analysis로 이동합니다
      </div>
      <div class="toolbar-divider"></div>
      <div class="legends">
        <div class="legend-item">
          <div class="legend-indicator legend-standard"></div>
          <span class="legend-text">표준등록설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-indicator legend-standard-other"></div>
          <span class="legend-text">표준등록설비(타라인)</span>
        </div>
        <div class="legend-item">
          <div class="legend-indicator legend-hccb"></div>
          <span class="legend-text">HCCB진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-indicator legend-eco"></div>
          <span class="legend-text">ECO진행중 설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-indicator legend-eco-expired"></div>
          <span class="legend-text">ECO만료/표준가능 설비</span>
        </div>
        <div class="legend-item">
          <div class="legend-indicator legend-not-spread"></div>
          <span class="legend-text">미확산 설비</span>
        </div>
      </div>
      <div class="toolbar-divider"></div>
      <v-btn
        variant="outlined"
        class="column-settings-btn"
        :elevation="0"
      >
        칼럼 설정
      </v-btn>
    </div>

    <!-- Data Table -->
    <div class="table-container">
      <v-data-table
        :headers="headers"
        :items="tableData"
        :items-per-page="5"
        hide-default-footer
        class="custom-data-table"
        density="compact"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.no }}</td>
            <td>{{ item.subArea }}</td>
            <td>{{ item.stepSeq }}</td>
            <td>{{ item.stepDesc }}</td>
            <td>{{ item.rcpId }}</td>
            <td>{{ item.prcGroup }}</td>
            <td>{{ item.rmModel }}</td>
            <td>{{ item.ecModel }}</td>
            <td v-for="(eqp, idx) in item.eqps" :key="idx" :class="getCellClass(eqp)">
              {{ eqp }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const headers = ref([
  { title: 'No.', key: 'no', width: '36px', sortable: false },
  { title: 'Sub area', key: 'subArea', width: '75px', sortable: false },
  { title: 'Step Seq', key: 'stepSeq', width: '100px', sortable: false },
  { title: 'Step Desc', key: 'stepDesc', width: '140px', sortable: false },
  { title: 'Recipe ID', key: 'rcpId', width: '80px', sortable: false },
  { title: 'PRC group', key: 'prcGroup', width: '90px', sortable: false },
  { title: 'RM Model', key: 'rmModel', width: '90px', sortable: false },
  { title: 'EC Model', key: 'ecModel', width: '120px', sortable: false },
  { title: 'EQP ID 1', key: 'eqp1', width: '76px', sortable: false },
  { title: 'EQP ID 2', key: 'eqp2', width: '76px', sortable: false },
  { title: 'EQP ID 3', key: 'eqp3', width: '76px', sortable: false },
  { title: 'EQP ID 4', key: 'eqp4', width: '76px', sortable: false },
  { title: 'EQP ID 5', key: 'eqp5', width: '76px', sortable: false },
  { title: 'EQP ID 6', key: 'eqp6', width: '76px', sortable: false },
  { title: 'EQP ID 7', key: 'eqp7', width: '76px', sortable: false },
  { title: 'EQP ID 8', key: 'eqp8', width: '76px', sortable: false },
  { title: 'EQP ID 9', key: 'eqp9', width: '76px', sortable: false },
])

const tableData = ref([
  {
    no: 1,
    subArea: 'CVD',
    stepSeq: 'CD043210',
    stepDesc: '1.2 ABC QWE DCD',
    rcpId: 'ABCDE321',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: ['ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123'],
  },
  {
    no: 2,
    subArea: 'CVD',
    stepSeq: 'CD063231',
    stepDesc: '1.3 DEF MNO PQR',
    rcpId: 'ABCDE322',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: ['ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123'],
  },
  {
    no: 3,
    subArea: 'CVD',
    stepSeq: 'CD043212',
    stepDesc: '1.4 GHI XYZ ABC',
    rcpId: 'ABCDE323',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: ['ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123'],
  },
  {
    no: 4,
    subArea: 'CVD',
    stepSeq: 'CD043213',
    stepDesc: '1.5 JKL MNO PQR',
    rcpId: 'ABCDE324',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: ['ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123'],
  },
  {
    no: 5,
    subArea: 'CVD',
    stepSeq: 'CD043214',
    stepDesc: '1.6 STU VWX YZA',
    rcpId: 'ABCDE325',
    prcGroup: 'AB_EFGH',
    rmModel: 'ABCDEF_A',
    ecModel: 'ARC_ARCDEF_A',
    eqps: ['ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123', 'ABC0123'],
  },
])

const getCellClass = (_value: string) => {
  // Color logic based on Figma - some cells have different backgrounds
  // For now, returning default, but you can add conditional logic here
  return ''
}
</script>

<style scoped>
.data-table-area {
  background-color: #f3f6f8;
  padding: 12px;
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
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #767d84;
  white-space: nowrap;
}

.toolbar-divider {
  width: 1px;
  height: 10px;
  background-color: #ccd1d6;
  margin: 0 8px;
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

.legend-indicator {
  width: 10px;
  height: 10px;
  border: 1px solid #dadfe4;
}

.legend-standard {
  background-color: #ffffff;
}

.legend-standard-other {
  background-color: #ccf0f9;
}

.legend-hccb {
  background-color: #ccd3f1;
}

.legend-eco {
  background-color: #d4f1d7;
}

.legend-eco-expired {
  background-color: #ffe9c8;
}

.legend-not-spread {
  background-color: #ffd9d7;
}

.legend-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.8px;
  color: #565e66;
}

.column-settings-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  text-transform: none;
  height: 20px;
  padding: 3px 6px;
  border-color: #dadfe4;
  color: #384047;
}

.table-container {
  background-color: #ffffff;
}

.custom-data-table {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
}

:deep(.custom-data-table .v-data-table__thead) {
  background-color: #fafbfc;
}

:deep(.custom-data-table th) {
  font-family: 'SamsungOneKoreanNoF', sans-serif !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  letter-spacing: 0.8px !important;
  color: #283037 !important;
  background-color: #fafbfc !important;
  border-bottom: 1px solid #dadfe4 !important;
  padding: 6px !important;
  height: 29px !important;
}

:deep(.custom-data-table td) {
  font-family: 'SamsungOneKoreanNoF', sans-serif !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  letter-spacing: 0.8px !important;
  color: #384047 !important;
  border-bottom: 1px solid #dadfe4 !important;
  padding: 4px 6px !important;
  height: 23px !important;
}

:deep(.custom-data-table .v-data-table__tr:hover) {
  background-color: transparent !important;
}
</style>
