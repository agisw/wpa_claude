<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import FilterArea from './components/features/Dashboard/FilterArea.vue'
import DataTableToolbar from './components/features/Dashboard/DataTableToolbar.vue'
import DashboardTable from './components/features/Dashboard/DashboardTable.vue'
import PageTabs from './components/features/Dashboard/PageTabs.vue'
</script>

<template>
  <v-app>
    <AppHeader />

    <v-main class="pa-0 ma-0">
      <FilterArea />
      <DataTableToolbar />
      <DashboardTable />
      <PageTabs />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style scoped>
:deep(.v-main) {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
