<template>
  <div class="toolbar">
    <div class="info-text">
      ※EQP ID를 클릭하면 YMS ECO Analysis로 이동합니다
    </div>

    <v-divider vertical class="mx-2" style="height: 10px;"></v-divider>

    <div class="legends">
      <div class="legend-item">
        <div class="color-indicator" style="background: white; border: 1px solid #dadfe4;"></div>
        <span>표준등록설비</span>
      </div>
      <div class="legend-item">
        <div class="color-indicator" style="background: #ccf0f9; border: 1px solid #dadfe4;"></div>
        <span>표준등록설비(타라인)</span>
      </div>
      <div class="legend-item">
        <div class="color-indicator" style="background: #ccd3f1; border: 1px solid #dadfe4;"></div>
        <span>HCCB진행중 설비</span>
      </div>
      <div class="legend-item">
        <div class="color-indicator" style="background: #d4f1d7; border: 1px solid #dadfe4;"></div>
        <span>ECO진행중 설비</span>
      </div>
      <div class="legend-item">
        <div class="color-indicator" style="background: #ffe9c8; border: 1px solid #dadfe4;"></div>
        <span>ECO만료/표준가능 설비</span>
      </div>
      <div class="legend-item">
        <div class="color-indicator" style="background: #ffd9d7; border: 1px solid #dadfe4;"></div>
        <span>미확산 설비</span>
      </div>
    </div>

    <v-divider vertical class="mx-2" style="height: 10px;"></v-divider>

    <v-btn variant="outlined" size="small">칼럼 설정</v-btn>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: white;
  height: 20px;
}

.info-text {
  font-size: 12px;
  color: #767d84;
  letter-spacing: 0.8px;
  line-height: 14px;
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
}

.legend-item span {
  font-size: 11px;
  color: #565e66;
  letter-spacing: 0.8px;
  line-height: 12px;
}

:deep(.v-btn) {
  text-transform: none !important;
  letter-spacing: 0.8px;
  font-size: 12px;
}
</style>
