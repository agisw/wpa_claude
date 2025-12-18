<template>
  <div class="page-tabs">
    <!-- Tab 1: PEMS Main -->
    <div class="tab-item inactive">
      <div class="tab-border-top"></div>
      <div class="tab-content">
        <span class="tab-text">PEMS Main</span>
      </div>
      <div class="tab-border-bottom"></div>
    </div>

    <!-- Tab 2: 동종확산 ECO Highway (Active) -->
    <div class="tab-item active">
      <div class="tab-border-top active"></div>
      <div class="tab-content active">
        <span class="tab-text active">동종확산 ECO Highway</span>
      </div>
      <div class="tab-border-bottom"></div>
      <div class="tab-border-right"></div>
    </div>

    <!-- Empty Area -->
    <div class="tab-empty">
      <div class="tab-border-top"></div>
      <div class="empty-content"></div>
      <div class="tab-border-bottom"></div>
    </div>

    <!-- Navigation Buttons -->
    <div class="tab-nav-btn">
      <div class="tab-border-top"></div>
      <div class="nav-btn-content">
        <v-btn icon size="x-small" variant="text">
          <v-icon size="14" color="#b2b6bb">mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <div class="tab-border-bottom"></div>
    </div>

    <div class="tab-nav-btn">
      <div class="tab-border-top"></div>
      <div class="nav-btn-content">
        <v-btn icon size="x-small" variant="text">
          <v-icon size="14" color="#b2b6bb">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <div class="tab-border-bottom"></div>
    </div>

    <div class="tab-nav-btn">
      <div class="tab-border-top"></div>
      <div class="nav-btn-content">
        <v-btn icon size="x-small" variant="text">
          <v-icon size="14" color="#767d84">mdi-dots-horizontal</v-icon>
        </v-btn>
      </div>
      <div class="tab-border-bottom"></div>
    </div>

    <div class="tab-nav-btn">
      <div class="tab-border-top"></div>
      <div class="nav-btn-content">
        <v-btn icon size="x-small" variant="text">
          <v-icon size="14" color="#767d84">mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="tab-border-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-tabs {
  display: flex;
  align-items: stretch;
  height: 24px;
  background-color: #e4e9ed;
}

.tab-item {
  display: flex;
  flex-direction: column;
  min-width: 120px;
  max-width: 200px;
  border-left: 1px solid #dadfe4;
}

.tab-item.inactive {
  background-color: #e4e9ed;
}

.tab-item.active {
  background-color: white;
}

.tab-border-top {
  height: 1px;
  background-color: #dadfe4;
}

.tab-border-top.active {
  background-color: #e4e9ed;
}

.tab-border-bottom {
  height: 1px;
  background-color: #dadfe4;
}

.tab-border-right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #dadfe4;
}

.tab-content {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 1px 11px 1px 11px;
  gap: 8px;
}

.tab-content.active {
  background-color: white;
}

.tab-text {
  font-family: 'SamsungOneKoreanNoF', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.8px;
  color: #767d84;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-text.active {
  font-weight: 700;
  color: #3392d3;
}

.tab-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 3px;
}

.empty-content {
  flex: 1;
  background-color: #e4e9ed;
}

.tab-nav-btn {
  display: flex;
  flex-direction: column;
  width: 22px;
  border-left: 1px solid #dadfe4;
}

.nav-btn-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  background-color: #e4e9ed;
}

:deep(.v-btn) {
  min-width: 16px;
  min-height: 16px;
  width: 16px;
  height: 16px;
  padding: 2px;
}
</style>
