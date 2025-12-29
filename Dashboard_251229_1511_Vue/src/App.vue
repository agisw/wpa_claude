<template>
  <v-app>
    <AppHeader />

    <v-main>
      <div class="dashboard-container">
        <!-- Filter Area -->
        <FilterArea />

        <!-- Page Tabs -->
        <PageTabs />

        <!-- Dashboard Table -->
        <DashboardTable />
      </div>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import FilterArea from './components/features/Dashboard/FilterArea.vue'
import PageTabs from './components/features/Dashboard/PageTabs.vue'
import DashboardTable from './components/features/Dashboard/DashboardTable.vue'
</script>

<style scoped>
.dashboard-container {
  background-color: #edf2f4;
  min-height: calc(100vh - 60px);
  padding-bottom: 20px;
}
</style>
