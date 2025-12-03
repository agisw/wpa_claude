<template>
  <div class="app-header">
    <div class="logo-navigation">
      <div class="logo-tenant">
        <div class="logo">
          <div class="logo-text">
            <p class="logo-title">MBP</p>
          </div>
        </div>
      </div>
      <div class="divider-wrapper">
        <div class="divider"></div>
      </div>
      <div class="navigation">
        <button class="nav-button">CONTENTS</button>
        <button class="nav-button">WIDGET STORE</button>
        <button class="nav-button">DASHBOARD</button>
      </div>
    </div>

    <div class="utility-section">
      <div class="search-user-menu">
        <div class="searchbox">
          <div class="search-input">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div class="divider-icon"></div>
        <button class="menu-button">button</button>
        <button class="menu-button">button</button>
        <div class="divider-icon"></div>
        <button class="menu-button time-button">접속 시간 (03:57)</button>
      </div>
      <div class="divider-icon"></div>
      <div class="profile">
        <button class="profile-button">button</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 40px;
  background-color: #384047;
  box-shadow: 0px 0px 2px 0px rgba(40, 48, 55, 0.12), 0px 1px 2px 0px rgba(40, 48, 55, 0.12);
}

.logo-navigation {
  display: flex;
  align-items: center;
}

.logo-tenant {
  display: flex;
  align-items: center;
}

.logo {
  padding: 0 8px 0 0;
}

.logo-text {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 0 2px 0;
}

.logo-title {
  font-family: 'Samsung Sharp Sans', sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: #ffffff;
  margin: 0;
}

.divider-wrapper {
  padding: 0 4px;
}

.divider {
  width: 1px;
  height: 10px;
  background-color: #ffffff;
  opacity: 0.2;
}

.navigation {
  display: flex;
  align-items: center;
  padding-left: 4px;
}

.nav-button {
  background: transparent;
  border: none;
  border-radius: 2px;
  padding: 8px 6px;
  cursor: pointer;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.8px;
  color: #ffffff;
}

.utility-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.search-user-menu {
  display: flex;
  align-items: center;
}

.searchbox {
  display: flex;
  align-items: center;
}

.search-input {
  background-color: rgba(40, 48, 55, 0.32);
  border-radius: 2px;
  padding: 2px 4px 2px 6px;
  width: 108px;
}

.search-input input {
  background: transparent;
  border: none;
  outline: none;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #f3f6f8;
  width: 100%;
}

.search-input input::placeholder {
  color: #f3f6f8;
}

.divider-icon {
  width: 1px;
  height: 10px;
  background-color: #ffffff;
  opacity: 0.2;
  margin: 0 8px 0 2px;
}

.menu-button,
.profile-button {
  background: transparent;
  border: none;
  border-radius: 2px;
  padding: 3px 6px;
  cursor: pointer;
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #565e66;
}

.time-button {
  color: #f3f6f8;
}

.profile {
  padding: 0 4px 0 0;
}
</style>
