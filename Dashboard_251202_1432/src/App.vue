<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import FilterArea from './components/features/FilterArea.vue'
import DataTableArea from './components/features/DataTableArea.vue'
</script>

<template>
  <v-app>
    <AppHeader />

    <v-main>
      <div class="dashboard-container">
        <FilterArea />
        <DataTableArea />
      </div>
    </v-main>

    <!-- Footer -->
    <v-footer
      height="20"
      color="#f8f9fa"
      class="footer"
    >
      <div class="footer-content"></div>
    </v-footer>
  </v-app>
</template>

<style scoped>
.dashboard-container {
  background-color: #f8f9fa;
  min-height: calc(100vh - 60px);
}

.footer {
  border-top: 1px solid #e8ecef;
}

.footer-content {
  width: 100%;
  height: 100%;
}
</style>
