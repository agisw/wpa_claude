<template>
  <div class="app-footer">
    <div class="footer-content">
      <span class="footer-text">책임의한계와법적고지</span>
      <span class="footer-separator">|</span>
      <span class="footer-text">© 2025 Samsung</span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-footer {
  background-color: #f3f6f8;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #dadfe4;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.8px;
  color: #767d84;
}

.footer-separator {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: #767d84;
}
</style>
