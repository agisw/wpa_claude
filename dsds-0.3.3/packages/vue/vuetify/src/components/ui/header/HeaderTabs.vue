<template>
  <div class="header-tabs"
       role="tablist"
       v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'

defineOptions({
  inheritAttrs: false
})

interface Props {
  onTabSelect?: (value: string) => void
  activeTab?: string
}

const props = defineProps<Props>()

const HeaderTabsKey = Symbol('HeaderTabs')

provide(HeaderTabsKey, {
  isInTabs: true,
  onTabSelect: props.onTabSelect,
  activeTab: props.activeTab
})

</script>

<style scoped>
.header-tabs {
  display: flex;
  align-items: center;
}
</style>
