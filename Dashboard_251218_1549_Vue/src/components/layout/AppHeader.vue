<template>
  <v-app-bar height="40" color="#384047" elevation="0">
    <div class="d-flex align-center px-3 w-100" style="height: 100%;">
      <!-- Logo & Navigation -->
      <div class="d-flex align-center">
        <!-- Logo -->
        <div class="logo-text">MBP</div>

        <!-- Divider -->
        <div class="divider mx-2"></div>

        <!-- Navigation Buttons -->
        <v-btn variant="text" class="nav-btn">CONTENTS</v-btn>
        <v-btn variant="text" class="nav-btn">WIDGET STORE</v-btn>
        <v-btn variant="text" class="nav-btn">DASHBOARD</v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Right Side Utility -->
      <div class="d-flex align-center">
        <!-- Search Box -->
        <div class="search-box">
          <span class="search-text">Search</span>
          <v-icon size="14" color="#f3f6f8">mdi-magnify</v-icon>
        </div>

        <div class="divider mx-2"></div>

        <!-- Utility Buttons -->
        <v-btn variant="text" class="utility-btn" size="small">S-VOC</v-btn>
        <v-btn variant="text" class="utility-btn" size="small">Q&A</v-btn>

        <div class="divider mx-2"></div>

        <!-- Clock -->
        <v-btn variant="text" class="utility-btn" size="small">접속 시간 (03:57)</v-btn>

        <div class="divider mx-2"></div>

        <!-- User Profile -->
        <v-btn variant="text" class="utility-btn" size="small">
          이삼성
          <v-icon size="14" class="ml-1">mdi-cog</v-icon>
        </v-btn>
      </div>
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
  line-height: 24px;
  letter-spacing: 0.8px;
  color: white;
}

.divider {
  width: 1px;
  height: 10px;
  background-color: white;
  opacity: 0.2;
}

.nav-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: white !important;
  text-transform: none;
  height: 40px;
}

.search-box {
  background-color: rgba(40, 48, 55, 0.32);
  border-radius: 2px;
  padding: 2px 4px 2px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 108px;
  max-width: 160px;
}

.search-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.utility-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8 !important;
  text-transform: none;
  padding: 3px 6px;
}

:deep(.v-app-bar) {
  box-shadow: 0px 0px 2px 0px rgba(40, 48, 55, 0.12), 0px 1px 2px 0px rgba(40, 48, 55, 0.12) !important;
}
</style>
