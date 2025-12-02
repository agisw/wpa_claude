<template>
  <v-app-bar
    :elevation="0"
    :height="40"
    class="app-header"
  >
    <div class="header-content">
      <!-- Logo & Navigation -->
      <div class="left-section">
        <div class="logo-area">
          <div class="logo-text">MBP</div>
        </div>
        <div class="divider"></div>
        <div class="navigation">
          <v-btn
            variant="text"
            class="nav-btn"
            :ripple="false"
          >
            CONTENTS
          </v-btn>
          <v-btn
            variant="text"
            class="nav-btn"
            :ripple="false"
          >
            WIDGET STORE
          </v-btn>
          <v-btn
            variant="text"
            class="nav-btn"
            :ripple="false"
          >
            DASHBOARD
          </v-btn>
        </div>
      </div>

      <!-- Right Utility -->
      <div class="right-section">
        <div class="search-box">
          <div class="search-input">
            <span class="search-text">Search</span>
            <v-icon size="16" class="search-icon">mdi-magnify</v-icon>
          </div>
        </div>
        <div class="divider-small"></div>
        <v-btn
          variant="text"
          size="small"
          class="utility-btn"
          :ripple="false"
        >
          Q&A
        </v-btn>
        <v-btn
          variant="text"
          size="small"
          class="utility-btn"
          :ripple="false"
        >
          알림
        </v-btn>
        <div class="divider-small"></div>
        <v-btn
          variant="text"
          size="small"
          class="utility-btn time-btn"
          :ripple="false"
        >
          접속 시간 (03:57)
        </v-btn>
        <div class="divider-small"></div>
        <v-btn
          variant="text"
          size="small"
          class="utility-btn"
          :ripple="false"
        >
          사용자
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  background-color: #384047 !important;
  box-shadow: 0px 0px 2px 0px rgba(40, 48, 55, 0.12), 0px 1px 2px 0px rgba(40, 48, 55, 0.12) !important;
}

.header-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 0;
}

.logo-area {
  padding-right: 8px;
}

.logo-text {
  font-family: 'Samsung Sharp Sans', sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #ffffff;
}

.divider {
  width: 1px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 4px;
}

.divider-small {
  width: 1px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 8px;
}

.navigation {
  display: flex;
  align-items: center;
  padding-left: 4px;
}

.nav-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #ffffff !important;
  text-transform: none;
  height: 40px;
  padding: 8px 6px;
  min-width: auto;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 0;
}

.search-box {
  background-color: rgba(40, 48, 55, 0.32);
  border-radius: 2px;
  padding: 2px 4px 2px 6px;
  min-width: 108px;
}

.search-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.search-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8;
}

.search-icon {
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
  height: 20px;
  padding: 3px 6px;
  min-width: auto;
}

.time-btn {
  white-space: nowrap;
}
</style>
