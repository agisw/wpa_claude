<template>
  <v-app-bar
    color="#384047"
    elevation="1"
    height="40"
    class="app-header"
  >
    <div class="d-flex align-center justify-space-between w-100 px-3">
      <!-- Logo, Navigation -->
      <div class="d-flex align-center">
        <!-- Logo -->
        <div class="pr-2">
          <div class="logo-text">MBP</div>
        </div>

        <!-- Divider -->
        <div class="header-divider mx-1"></div>

        <!-- Navigation -->
        <div class="d-flex align-center pl-1">
          <v-btn
            variant="text"
            class="nav-btn"
            height="40"
          >
            CONTENTS
          </v-btn>
          <v-btn
            variant="text"
            class="nav-btn"
            height="40"
          >
            WIDGET STORE
          </v-btn>
          <v-btn
            variant="text"
            class="nav-btn"
            height="40"
          >
            DASHBOARD
          </v-btn>
        </div>
      </div>

      <!-- Utility Area -->
      <div class="d-flex align-center">
        <!-- Search -->
        <div class="d-flex align-center">
          <div class="search-box">
            <span class="search-text">Search</span>
          </div>
          <div class="header-divider-small mx-2"></div>
        </div>

        <!-- Menu buttons -->
        <v-btn
          variant="text"
          size="small"
          class="utility-btn"
        >
          button
        </v-btn>
        <v-btn
          variant="text"
          size="small"
          class="utility-btn"
        >
          button
        </v-btn>

        <div class="header-divider-small mx-2"></div>

        <!-- Date/Time -->
        <v-btn
          variant="text"
          size="small"
          class="utility-btn"
        >
          접속 시간 (03:57)
        </v-btn>

        <div class="header-divider-small mx-2"></div>

        <!-- Profile -->
        <v-btn
          variant="text"
          size="small"
          class="utility-btn"
        >
          button
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  box-shadow: 0px 0px 2px 0px rgba(40, 48, 55, 0.12), 0px 1px 2px 0px rgba(40, 48, 55, 0.12) !important;
}

.logo-text {
  font-family: 'Samsung Sharp Sans', sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #ffffff;
}

.header-divider {
  width: 1px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.header-divider-small {
  width: 1px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #ffffff !important;
  text-transform: none;
  padding: 8px 6px;
}

.search-box {
  background-color: rgba(40, 48, 55, 0.32);
  border-radius: 2px;
  padding: 2px 6px;
  min-width: 108px;
}

.search-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8;
}

.utility-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8 !important;
  text-transform: none;
  min-width: auto;
}
</style>
