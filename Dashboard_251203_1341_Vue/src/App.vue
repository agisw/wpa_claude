<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import FilterArea from './components/common/FilterArea.vue'
import DataTable from './components/common/DataTable.vue'
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main class="main-content">
      <FilterArea />
      <DataTable />
    </v-main>
    <footer class="app-footer">
      <!-- Footer content -->
    </footer>
  </v-app>
</template>

<style scoped>
.main-content {
  background-color: #f0f3f5;
  min-height: calc(100vh - 60px);
}

.app-footer {
  height: 20px;
  background-color: #f0f3f5;
  border-top: 1px solid #dadfe4;
}
</style>
