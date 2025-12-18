<template>
  <v-footer
    color="#f3f6f8"
    height="20"
    class="d-flex align-center px-3"
    elevation="0"
  >
    <div class="footer-content">
      <span class="footer-link">PEMS Main</span>
      <v-divider vertical class="mx-2" style="height: 10px;"></v-divider>
      <span class="footer-link">동종확산 ECO High...</span>
    </div>
    <v-spacer></v-spacer>
    <div class="footer-info">
      <span>개인정보취급방침</span>
      <span class="mx-2">|</span>
      <span>© 2025 Samsung</span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-content {
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #565e66;
}

.footer-link {
  cursor: pointer;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-info {
  font-size: 11px;
  color: #767d84;
}
</style>
