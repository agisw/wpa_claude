<template>
  <v-app-bar
    color="#384047"
    elevation="1"
    height="40"
    class="px-3"
  >
    <div class="d-flex align-center ga-2">
      <div class="logo-text">MBP</div>
      <v-divider vertical class="mx-1 opacity-20" style="height: 10px;"></v-divider>
      <v-btn variant="text" size="small" class="text-white font-weight-bold">CONTENTS</v-btn>
      <v-btn variant="text" size="small" class="text-white font-weight-bold">WIDGET STORE</v-btn>
      <v-btn variant="text" size="small" class="text-white font-weight-bold">DASHBOARD</v-btn>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center ga-2">
      <div class="search-box">
        <span class="search-text">Search</span>
        <v-icon size="16" color="white">mdi-magnify</v-icon>
      </div>
      <v-divider vertical class="opacity-20" style="height: 10px;"></v-divider>
      <v-btn variant="text" size="small" class="text-white text-caption">S-VOC</v-btn>
      <v-btn variant="text" size="small" class="text-white text-caption">Q&A</v-btn>
      <v-divider vertical class="opacity-20" style="height: 10px;"></v-divider>
      <v-btn variant="text" size="small" class="text-white text-caption">접속 시간 (03:57)</v-btn>
      <v-divider vertical class="opacity-20" style="height: 10px;"></v-divider>
      <v-btn variant="text" size="small" class="text-white text-caption">
        이삼성
        <v-icon size="16" class="ml-1">mdi-cog</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.logo-text {
  font-family: 'Samsung Sharp Sans', sans-serif;
  font-size: 19px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.8px;
  line-height: 24px;
}

.search-box {
  background-color: rgba(40, 48, 55, 0.32);
  border-radius: 2px;
  padding: 2px 4px 2px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 108px;
}

.search-text {
  font-size: 12px;
  color: #f3f6f8;
  letter-spacing: 0.8px;
  line-height: 14px;
  flex: 1;
}

:deep(.v-btn) {
  text-transform: none !important;
  letter-spacing: 0.8px;
}
</style>
