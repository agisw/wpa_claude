<template>
  <div class="data-table-toolbar">
    <div class="notice-text">
      ※EQP ID를 클릭하면 YMS ECO Analysis로 이동합니다
    </div>
    <v-divider vertical class="toolbar-divider" />
    <div class="legends">
      <div class="legend-item">
        <div class="legend-indicator" style="background-color: #ffffff; border: 1px solid #dadfe4;"></div>
        <span class="legend-label">표준등록설비</span>
      </div>
      <div class="legend-item">
        <div class="legend-indicator" style="background-color: #ccf0f9; border: 1px solid #dadfe4;"></div>
        <span class="legend-label">표준등록설비(타라인)</span>
      </div>
      <div class="legend-item">
        <div class="legend-indicator" style="background-color: #ccd3f1; border: 1px solid #dadfe4;"></div>
        <span class="legend-label">HCCB진행중 설비</span>
      </div>
      <div class="legend-item">
        <div class="legend-indicator" style="background-color: #d4f1d7; border: 1px solid #dadfe4;"></div>
        <span class="legend-label">ECO진행중 설비</span>
      </div>
      <div class="legend-item">
        <div class="legend-indicator" style="background-color: #ffe9c8; border: 1px solid #dadfe4;"></div>
        <span class="legend-label">ECO만료/표준가능 설비</span>
      </div>
      <div class="legend-item">
        <div class="legend-indicator" style="background-color: #ffd9d7; border: 1px solid #dadfe4;"></div>
        <span class="legend-label">미확산 설비</span>
      </div>
    </div>
    <v-divider vertical class="toolbar-divider" />
    <v-btn variant="outlined" size="small" class="column-settings-btn">칼럼 설정</v-btn>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.data-table-toolbar {
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 3px 0;
  background-color: #ffffff;
}

.notice-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #767d84;
  white-space: nowrap;
}

.toolbar-divider {
  height: 10px;
  margin: 0 5px;
  background-color: #ccd1d6;
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

.legend-indicator {
  width: 10px;
  height: 10px;
}

.legend-label {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.8px;
  color: #565e66;
}

.column-settings-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  text-transform: none;
  height: 20px;
  border-color: #dadfe4;
  color: #384047;
  padding: 3px 6px;
}
</style>
