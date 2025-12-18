<template>
  <div class="page-tabs">
    <div class="tabs-container">
      <div class="tab active">PEMS Main</div>
      <div class="tab">동종확산 ECO High...</div>
      <div class="tab inactive"></div>
    </div>
    <div class="tab-actions">
      <v-btn icon size="x-small" variant="text">
        <v-icon size="16">mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon size="x-small" variant="text">
        <v-icon size="16">mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn icon size="x-small" variant="text">
        <v-icon size="16">mdi-menu</v-icon>
      </v-btn>
      <v-btn icon size="x-small" variant="text">
        <v-icon size="16">mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f3f6f8;
  height: 24px;
  padding: 0 12px;
  border-bottom: 1px solid #e4e9ed;
}

.tabs-container {
  display: flex;
  gap: 0;
  flex: 1;
}

.tab {
  padding: 4px 12px;
  font-size: 12px;
  color: #565e66;
  letter-spacing: 0.8px;
  line-height: 14px;
  background: #e4e9ed;
  border-right: 1px solid #dadfe4;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab.active {
  background: white;
  color: #283037;
  font-weight: 700;
}

.tab.inactive {
  flex: 1;
  background: #f3f6f8;
  border: none;
}

.tab:hover:not(.inactive) {
  background: #f0f0f0;
}

.tab-actions {
  display: flex;
  gap: 2px;
  align-items: center;
}

:deep(.v-btn) {
  color: #565e66;
}
</style>
