<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import FilterArea from './components/features/Dashboard/FilterArea.vue'
import DashboardTable from './components/features/Dashboard/DashboardTable.vue'
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main class="main-content">
      <div class="content-container">
        <FilterArea />
        <div class="table-section">
          <DashboardTable />
        </div>
      </div>
    </v-main>
    <footer class="app-footer">
      <div class="footer-content"></div>
    </footer>
  </v-app>
</template>

<style scoped>
.main-content {
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
}

.content-container {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}

.table-section {
  padding: 12px 0;
}

.app-footer {
  background-color: #f3f6f8;
  height: 20px;
  border-top: 1px solid #e4e9ed;
}

.footer-content {
  height: 100%;
}
</style>
