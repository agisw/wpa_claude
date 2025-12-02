<template>
  <v-app-bar
    color="#384047"
    density="compact"
    flat
    class="app-header"
  >
    <div class="header-content">
      <div class="header-left">
        <div class="logo-section">
          <div class="logo-text">MBP</div>
        </div>
        <v-divider vertical class="header-divider" />
        <div class="navigation">
          <v-btn variant="text" class="nav-btn">CONTENTS</v-btn>
          <v-btn variant="text" class="nav-btn">WIDGET STORE</v-btn>
          <v-btn variant="text" class="nav-btn">DASHBOARD</v-btn>
        </div>
      </div>

      <div class="header-right">
        <div class="utility-section">
          <div class="search-box">
            <div class="search-input">Search</div>
          </div>
          <v-divider vertical class="header-divider" />
          <v-btn variant="text" size="small" icon="mdi-menu" class="icon-btn" />
          <v-btn variant="text" size="small" icon="mdi-menu" class="icon-btn" />
          <v-divider vertical class="header-divider" />
          <v-btn variant="text" size="small" class="time-btn">접속 시간 (03:57)</v-btn>
        </div>
        <v-divider vertical class="header-divider" />
        <v-btn variant="text" size="small" icon="mdi-account-circle" class="icon-btn" />
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  box-shadow: 0px 0px 2px 0px rgba(40, 48, 55, 0.12), 0px 1px 2px 0px rgba(40, 48, 55, 0.12);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 12px;
  height: 40px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0;
}

.logo-section {
  padding: 0 8px 0 0;
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
  opacity: 0.2;
  background-color: #ffffff;
  height: 10px;
  margin: 0 4px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 0;
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
}

.utility-section {
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
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8;
}

.icon-btn {
  color: #f3f6f8 !important;
}

.time-btn {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8 !important;
  text-transform: none;
}
</style>
