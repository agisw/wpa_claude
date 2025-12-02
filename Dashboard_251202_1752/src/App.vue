<template>
  <v-app>
    <AppHeader />
    <v-main class="main-content">
      <FilterArea />
      <DataTableArea />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import FilterArea from './components/features/FilterArea.vue'
import DataTableArea from './components/features/DataTableArea.vue'
</script>

<style scoped>
.main-content {
  padding: 0 !important;
  background-color: #f3f6f8;
}
</style>
